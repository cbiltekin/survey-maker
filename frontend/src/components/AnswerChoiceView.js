import React from 'react';
import {Radio} from 'antd';
import { useEffect, useState } from 'react';

const ChoiceView = (props) => {
    const [value, setValue] = useState({});
    const [choice, setChoice] = useState({});

    useEffect( () => {
        setChoice(props.choice);
        setValue(props.value);
    },[props.choice, props.value]);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
    return (
        <div>
        <Radio style={radioStyle} value={choice.id}>
           {choice.name}
        </Radio>
        </div>
    );
};

export default ChoiceView;