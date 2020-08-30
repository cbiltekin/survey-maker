import React from 'react';
import {useState, useEffect} from 'react';
import TextView from './TextView';
import StarView from './StarView';
import RadioView from './RadioView';

const QuestionView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <TextView key ={question.id} question={question}/>
    } else if(question.type == "rating"){
      return <StarView key ={question.id} question={question}/>
    } else if(question.type == "radiogroup"){
      return <RadioView key = {question.id} question = {question}/>
    }
};

export default QuestionView;