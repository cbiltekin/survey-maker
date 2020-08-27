import React, { useEffect, useState } from 'react';
import {getQuestions} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import SurveyView from './SurveyView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
import AnswerQuestionView from './AnswerQuestionView';

const AnswerQuestionFeed = () => {
    const [answerPage, setAnswerPage] = useState({ content: [], last: true, number: 0});
    const {t} = useTranslation();
    const {id} = useParams(); //to take current survey id
    

    const path = `/api/1.0/surveys/${id}/questions?page=`;
    const initialProgress = useApiProgress('get', path);

    useEffect(() =>{
        loadQuestions();
    },[]);

    const loadQuestions = async (page) => {
        try {
            console.log(id);
            const response = await getQuestions(id, page);
            setAnswerPage(previousAnswerPage=>({
                ...response.data,
                content: [...previousAnswerPage.content, ...response.data.content]
            }));
        }catch(error){

        }
    
    };

    const {content, last, number} = answerPage;

    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{initialProgress ? <Spinner /> : t('There are no questions!')}</div>
    }

    return (
        <div>
            {content.map(question => {
                return <AnswerQuestionView key ={question.id} question={question} />;
            })}
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: initialProgress ? 'not-allowed' : 'pointer'}}
             onClick={initialProgress ? () => {} : ()=> loadQuestions(number + 1)}>
                {initialProgress ? <Spinner /> : t('Load More Questions From Survey')}</div>}
        </div>
    );
};

export default AnswerQuestionFeed;