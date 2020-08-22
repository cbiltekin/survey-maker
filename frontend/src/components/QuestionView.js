import React from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import {useState, useEffect} from 'react';

const SurveyView = (props) => {
    const { question } = props;
    const [isComplete, setComplete] = useState(false);

    const onCompleteQ = () =>{
        setComplete(true);  
    };

      var surv = <Survey.Survey json = {json}
      onComplete = {onCompleteQ}/>

    var json = {
        elements: [
          { type: question.type, name: question.name}
        ]
      }


    return (
        <div>{question.id}</div>
    );
};

export default SurveyView;