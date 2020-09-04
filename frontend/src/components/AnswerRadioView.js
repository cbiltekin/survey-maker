import React from 'react';
import { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { submitAnswer, getChoices } from '../api/apiCalls';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import AnswerChoiceView from '../components/AnswerChoiceView';

const AnswerRadioView = (props) => {
    const [question, setQuestion] = useState({});
    const [choicePage, setChoicePage] = useState({ content: [], last: true, number: 0});
    const [value, setValue] = useState(1);
    const [submitted, setSubmitted] =useState(false);
    const {t} = useTranslation();

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    useEffect(() =>{

        if(question.id){
            loadChoices();
        }
    },[question.id]);

    const loadChoices = async (page) => {
        try {
            console.log(question.id);
            const response = await getChoices(question.id, page);
            setChoicePage(previousChoicePage=>({
                ...response.data,
                content: [...previousChoicePage.content, ...response.data.content]
            }));
        }catch(error){

        }
    
    };

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

    const onChangeRadio = event => {
        console.log('radio checked', event.target.value);
        setValue(event.target.value);
      };

    const {content, last, number} = choicePage;

    const pendingApiCall = useApiProgress('post', '/api/1.0/answers');
   
    return (
        <div><div>{question.name}</div>
            <Radio.Group onChange={onChangeRadio} value={value}>
            {content.map(choice => {
                return <AnswerChoiceView key ={choice.id} choice={choice} value ={value} />;
            })}</Radio.Group>
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}
             onClick={pendingApiCall ? () => {} : ()=> loadChoices(number + 1)}>
                {pendingApiCall ? <Spinner /> : t('Load More Choices')}</div>}
            <div><ButtonWithProgress onClick = {onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall || submitted}
        text="Save Answer" /></div>
        </div>
    );
};

export default AnswerRadioView;