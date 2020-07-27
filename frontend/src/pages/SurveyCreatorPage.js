import React from 'react';
import ProfileCard from '../components/SurveySubmit';

const SurveyCreatorPage = (props) => {
    const { data } = props.location;

    return (
        <div className ="container">
            Survey Name: {data}
        </div>
    );
};

export default SurveyCreatorPage;