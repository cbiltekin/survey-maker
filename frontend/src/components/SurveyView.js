import React from 'react';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';

const SurveyView = (props) => {
    const { survey } = props;
    
    return (
        <div className="card p-1">
            <Link
                to={{
                    pathname: `/create/${survey.id}`,
                    data: survey.surveyName
                }}
            >{survey.surveyName}</Link>{survey.published && <CheckOutlined />}
        </div>
    );
};

export default SurveyView;