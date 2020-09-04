import React from 'react';
import {Radio} from 'antd';
import { useEffect, useState } from 'react';
import { getChoiceRatio } from '../api/apiCalls';

const ResultChoiceView = (props) => {
    const [choice, setChoice] = useState({});
    const [ratio, setRatio] = useState();

    useEffect( () => {
        setChoice(props.choice);
    },[props.choice]);

    useEffect(()=>{

        const loadRatio = async () => {
          try {
            const response = await getChoiceRatio(choice.question.id, choice.id);
            console.log("ratio is"+response.data.ratio);
            setRatio(response.data.ratio);
          } catch (error) {
          }
        };
  if(choice.id && choice.question.id){
    loadRatio();
  }
      }, [choice]);
    
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
    return (
        <div>
        <Radio style={radioStyle}>
          {choice.name} : {ratio}
        </Radio>
        </div>
    );
};

export default ResultChoiceView;
