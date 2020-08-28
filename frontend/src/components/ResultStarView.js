import React from 'react';
import { useEffect, useState } from 'react';
import { getRatingAverage } from '../api/apiCalls';

const ResultStarView = (props) => {
    const [question, setQuestion] = useState({});
    const [average, setAverage] = useState(0);

    useEffect( () => {
        setQuestion(props.question);

        const loadResult = async () => {
            try {
              const response = await getRatingAverage(props.question.id);
              setAverage(response.data.average);
            } catch (error) {

            }
          };
    
          loadResult();
    },[props.question]);

    return (
        <div className="container">
            You asked: {question.name}
            <div>The average of rating is: {average}</div>
        </div>
    );
};

export default ResultStarView;