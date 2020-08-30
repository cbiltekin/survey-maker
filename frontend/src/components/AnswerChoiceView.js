import React from 'react';
import {Radio} from 'antd';
import { useEffect, useState } from 'react';
import { Input, Rate, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateChoice } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';
import { useApiProgress } from '../shared/ApiProgress';

const ChoiceView = (props) => {
    //const { choice } = props;
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