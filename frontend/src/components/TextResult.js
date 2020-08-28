import React from 'react';

const TextResult = (props) => {
    const {textAnswer} = props;
    return (
        <div className="card p-1">
            {textAnswer.user.displayName} said:
            <div>{textAnswer.choices}</div>
        </div>
    );
};

export default TextResult;