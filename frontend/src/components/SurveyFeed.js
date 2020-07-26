import React, { useEffect, useState } from 'react';
import {getSurveys} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import SurveyView from './SurveyView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const SurveyFeed = () => {
    const [surveyPage, setSurveyPage] = useState({ content: [], last: true, number: 0});
    const {t} = useTranslation();
    const {username} = useParams(); //to take current user
    

    const path = username ? `/api/1.0/users/${username}/surveys?page=` : '/api/1.0/surveys?page=';
    const pendingApiCall = useApiProgress('get', path);

    useEffect(() =>{
        loadSurveys();
    },[]);

    const loadSurveys = async (page) => {
        try {
            const response = await getSurveys(username, page);
            setSurveyPage(previousSurveyPage=>({
                ...response.data,
                content: [...previousSurveyPage.content, ...response.data.content]
            }));
        }catch(error){

        }
    
    };

    const {content, last, number} = surveyPage;

    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : t('There are no surveys!')}</div>
    }

    return (
        <div>
            {content.map(survey => {
                return <SurveyView key ={survey.id} survey={survey} />;
            })}
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}
             onClick={pendingApiCall ? () => {} : ()=> loadSurveys(number + 1)}>
                {pendingApiCall ? <Spinner /> : t('Load More Surveys')}</div>}
        </div>
    );
};

export default SurveyFeed;