import React from 'react';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

const SurveyView = (props) => {
    const { survey } = props;

    if(survey.published){
        return(
            <div className="card p-1">
            <Link
                to={{
                    pathname: `/surveyadmin/${survey.id}`,
                    data: survey.surveyName
                }}
            >{survey.surveyName}</Link><CheckOutlined/>
        </div>
        );
    }
    
    return (
        <div className="card p-1">
            <Link
                to={{
                    pathname: `/create/${survey.id}`,
                    data: survey.surveyName
                }}
            >{survey.surveyName}</Link>
        </div>
    );
};

export default SurveyView;