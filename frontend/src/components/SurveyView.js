import React from 'react';

const SurveyView = (props) => {
    const {survey} = props;
    return (
        <div className = "card p-1">
            {survey.surveyName}
        </div>
    );
};

export default SurveyView;