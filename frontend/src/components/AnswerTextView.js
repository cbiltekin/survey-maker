import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'antd';

const AnswerTextView = (props) => {
    const [question, setQuestion] = useState({});
    const { TextArea } = Input;
    const [value, setValue] = useState();

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(value); //bir adım geriden geliyor
    }

    return (
        <div>
        {question.name}
        <div><TextArea rows={4} onChange={handleChange} value={value} /></div>
        </div>
    );
};

export default AnswerTextView;