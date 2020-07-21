import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

const SurveyPage = (props) => {

    const history = useHistory();

    const routeSurvey = () =>{ 
        const path = '/create'; 
        history.push(path);
    }


    const { t } = useTranslation();

    return (
        <div className ="container">
            <button className="btn btn-primary" onClick={routeSurvey}>{t('New Survey')}</button>
        </div>
    );
};

export default SurveyPage;