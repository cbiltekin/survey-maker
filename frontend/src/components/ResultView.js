import React from 'react';
import {useState, useEffect} from 'react';
import ResultTextView from './ResultTextView';
import ResultStarView from './ResultStarView';

const ResultView = (props) => {
    const { question } = props;

    if(question.type == "text"){
      return <ResultTextView key ={question.id} question={question}/>
    } else if(question.type == "rating"){
      return <ResultStarView key ={question.id} question={question}/>
    }
    return (
        <div>{question.id}</div>
    );
};

export default ResultView;