import React from 'react';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { submitAnswer } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';

const AnswerStarView = (props) => {
    const [question, setQuestion] = useState({});
    const [value, setValue] = useState();
    const [submitted, setSubmitted] =useState(false);

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);


    const handleChange = (value) => {
        setValue(value);
        console.log(value);
    }

    const onClickSave = async () => {
        const answer = {
            choices: value,
            question
        }

        try {
            await submitAnswer(answer);
            setSubmitted(true);

        } catch (error) {

        }
    }

    const pendingApiCall = useApiProgress('post', '/api/1.0/answers');
    return (
        <div>
            {question.name}
            <Rate onChange={handleChange} value={value}/>
            <ButtonWithProgress onClick = {onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall || submitted}
        text="Save" />
        </div>
    );
};

export default AnswerStarView;