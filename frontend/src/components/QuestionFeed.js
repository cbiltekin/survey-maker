import React, { useEffect, useState } from 'react';
import {getSurveys, getQuestions, getOldQuestions} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import QuestionView from './QuestionView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const QuestionFeed = () => {
    const [questionPage, setQuestionPage] = useState({ content: [], last: true, number: 0});
    const {t} = useTranslation();
    const {id} = useParams(); //to take current survey id
    

    const path = `/api/1.0/surveys/${id}/questions?page=`;
    const pendingApiCall = useApiProgress('get', path);

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

    

    const loadOldQuestions = async () => {
        const lastQuestionIndex = questionPage.content.length - 1;
        const lastQuestionId = questionPage.content[lastQuestionIndex].id;
        const response = await getOldQuestions(id, lastQuestionId);
        setQuestionPage(previousQuestionPage=>({
            ...response.data,
            content: [...previousQuestionPage.content, ...response.data.content]
        }));
    }

    const {content, last} = questionPage;

    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : t('There are no questions! Would you like to add?')}</div>
    }

    return (
        <div>
            {content.map(question => {
                return <QuestionView key ={question.id} question={question} />;
            })}
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}
             onClick={pendingApiCall ? () => {} : ()=> loadOldQuestions()}>
                {pendingApiCall ? <Spinner /> : t('Load More Questions')}</div>}
        </div>
    );
};

export default QuestionFeed;