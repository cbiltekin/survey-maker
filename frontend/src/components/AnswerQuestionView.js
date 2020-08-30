import React from 'react';
import {useState, useEffect} from 'react';
import AnswerTextView from './AnswerTextView';
import AnswerStarView from './AnswerStarView';
import AnswerRadioView from './AnswerRadioView';

const AnswerQuestionView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <AnswerTextView key ={question.id} question={question}/>
    } else if (question.type == "rating"){
      return <AnswerStarView key ={question.id} question={question}/>
    } else if (question.type == "radiogroup"){
       return <AnswerRadioView key ={question.id} question={question}/>
     }
};

export default AnswerQuestionView;