import React from 'react';
import { Link } from 'react-router-dom';

const ResultTextView = (props) => {
    const {question} = props;
    return (
        <div className="card p-1">
            <Link
                to={{
                    pathname: `/textboxresults/${question.id}`,
                }}
            >You asked: {question.name}</Link>
        </div>
    );
};

export default ResultTextView;