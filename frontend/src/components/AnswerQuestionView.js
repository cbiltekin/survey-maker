import React from 'react';
import {useState, useEffect} from 'react';
import AnswerTextView from './AnswerTextView';
import AnswerStarView from './AnswerStarView';

const AnswerQuestionView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <AnswerTextView key ={question.id} question={question}/>
    } else if(question.type == "rating"){
      return <AnswerStarView key ={question.id} question={question}/>
    }
    return (
        <div>{question.id}</div>
    );
};

export default AnswerQuestionView;