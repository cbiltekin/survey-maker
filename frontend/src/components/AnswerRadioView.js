import React from 'react';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { submitAnswer } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';

const AnswerRadioView = (props) => {
    const [question, setQuestion] = useState({});
    const [value, setValue] = useState(1);
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
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
   
    return (
        <div>
            {question.name}
            {question && userContent.map(user => {
                return <UserView key ={user.id} user={user} />;
            })}
            <ButtonWithProgress onClick = {onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall || submitted}
        text="Save" />
        </div>
    );
};

export default AnswerRadioView;