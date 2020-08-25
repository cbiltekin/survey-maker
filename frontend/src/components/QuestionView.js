import React from 'react';
// import * as Survey from "survey-react";
// import "survey-react/survey.css";
import {useState, useEffect} from 'react';
import TextView from './TextView';
import StarView from './StarView';

const QuestionView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <TextView key ={question.id} question={question}/>
    } else if(question.type == "rating"){
      return <StarView key ={question.id} question={question}/>
    }


    return (
        <div>{question.id}</div>
    );
};

export default QuestionView;