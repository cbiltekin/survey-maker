import React from 'react';
import {useState, useEffect} from 'react';
import ResultTextView from './ResultTextView';
import ResultStarView from './ResultStarView';
import ResultRadioView from './ResultRadioView';

const ResultView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <ResultTextView key ={question.id} question={question}/>
    } else if(question.type == "rating"){
      return <ResultStarView key ={question.id} question={question}/>
    } else if (question.type == "radiogroup"){
      return <ResultRadioView key = {question.id} question ={question}/>
    }
};

export default ResultView;