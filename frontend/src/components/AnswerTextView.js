import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { submitAnswer } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';

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

    const onClickSave = async () => {
        const answer = {
            choices: value,
            question
        }

        try {
            await submitAnswer(answer);

        } catch (error) {

        }
    }

    const pendingApiCall = useApiProgress('post', '/api/1.0/answers');

    return (
        <div>
        {question.name}
        <div><TextArea rows={4} onChange={handleChange} value={value} /></div>
        <ButtonWithProgress onClick = {onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall}
        text="Save My Answer" />
        </div>
    );
};

export default AnswerTextView;