import React, { useEffect, useState } from 'react';
import {getQuestions, getOldQuestions, getNewQuestionCount, getNewQuestions} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import QuestionView from './QuestionView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const QuestionFeed = () => {
    const [questionPage, setQuestionPage] = useState({ content: [], last: true, number: 0});
    const [newQCount, setQCount] = useState(0);
    const {t} = useTranslation();
    const {id} = useParams(); //to take current survey id

    let lastQuestionId = 0;
    let firstQId = 0;
    if( questionPage.content.length > 0){
        firstQId = questionPage.content[0].id;
        const lastQuestionIndex = questionPage.content.length - 1;
        lastQuestionId = questionPage.content[lastQuestionIndex].id;
    }
    
    const path = `/api/1.0/surveys/${id}/questions?page=`;
    const initialProgress = useApiProgress('get', path);
    const laterProgress = useApiProgress('get', `/api/1.0/surveys/${id}/questions/${lastQuestionId}`, true);

    //polling
    useEffect(() =>{
        const getCount = async () => {
            const response = await getNewQuestionCount(id, firstQId);
            setQCount(response.data.count);
        };

        let looper = setInterval(() =>{
            getCount();
        }, 5000);
        return function cleanup() {
            clearInterval(looper);
        };
    },[firstQId, id]);

    useEffect(() =>{

        const loadQuestions = async (page) => {
            try {
                console.log(id);
                const response = await getQuestions(id, page);
                setQuestionPage(previousQuestionPage=>({
                    ...response.data,
                    content: [...previousQuestionPage.content, ...response.data.content]
                }));
            }catch(error){
    
            }
        
        };


        loadQuestions();
    },[id]);

    useEffect(()=>{
        if(newQCount>0){
            loadNewQuestions();
        }

    },[newQCount]);

    const loadOldQuestions = async () => {
        const response = await getOldQuestions(id, lastQuestionId);
        setQuestionPage(previousQuestionPage=>({
            ...response.data,
            content: [...previousQuestionPage.content, ...response.data.content]
        }));
    }

    const loadNewQuestions = async () => {
        const response = await getNewQuestions(id, firstQId);
        setQuestionPage(previousQuestionPage=>({
            ...previousQuestionPage,
            content: [...response.data, ...previousQuestionPage.content]
        }));
        setQCount(0);
    }


    const {content, last} = questionPage;

    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{initialProgress ? <Spinner /> : t('There are no questions! Would you like to add?')}</div>
    }

    return (
        <div>
            {content.map(question => {
                return <QuestionView key ={question.id} question={question} />;
            })}
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: laterProgress ? 'not-allowed' : 'pointer'}}
             onClick={laterProgress ? () => {} : ()=> loadOldQuestions()}>
                {laterProgress ? <Spinner /> : t('Load More Questions')}</div>}
        </div>
    );
};

export default QuestionFeed;