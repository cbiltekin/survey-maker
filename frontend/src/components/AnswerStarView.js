import React from 'react';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';

const AnswerStarView = (props) => {
    const [question, setQuestion] = useState({});
    const [value, setValue] = useState();

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    const handleChange = (value) => {
        setValue(value);
        console.log(value);
    }

    return (
        <div>
            {question.name}
            <Rate onChange={handleChange} value={value}/>
        </div>
    );
};

export default AnswerStarView;