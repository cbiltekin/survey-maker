import React from 'react';
import { useEffect, useState } from 'react';
import { getAnsweredChoices } from '../api/apiCalls';
import ResultChoiceView from './ResultChoiceView';


const ResultRadioView = (props) => {
    const [question, setQuestion] = useState({});
    const[choices, setChoices] = useState({ choiceContent: []});

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    useEffect(()=>{

        const loadChoices = async () => {
          try {
            const response = await getAnsweredChoices(question.id);
            setChoices(({choiceContent: response.data}));
          } catch (error) {
          }
        };

        if(question.id){
            loadChoices();
        }
      }, [question]);

      const {choiceContent} = choices;

    return (
        <div className="container">
            You asked: {question.name}
            {question && choiceContent.map(choice => {
                return <ResultChoiceView key ={choice.id} choice={choice} />;
            })}
        </div>
    );
};

export default ResultRadioView;