import React from 'react';
import { Link } from 'react-router-dom';

const SurveyView = (props) => {
    const { survey } = props;
    return (
        <div className="card p-1">
            <Link
                to={{
                    pathname: '/create',
                    data: survey.surveyName
                }}
            >{survey.surveyName}</Link>
        </div>
    );
};

export default SurveyView;