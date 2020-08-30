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
    const [value, setValue] = useState();
    const [inEditMode, setInEditMode] = useState(false);

    const [choice, setChoice] = useState({});

    useEffect( () => {
        setChoice(props.choice);
    },[props.choice]);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onClickEdit = async () => {
        setInEditMode(true);
    }

    const onClickSave = async () => {
        const body = {
            name: value
        };
    
        try {
            const response = await updateChoice(choice.id, body);
            setInEditMode(false);
            setChoice(response.data);
        } catch (error) {
    
        }
    
    };

    const pendingApiCall = useApiProgress('put', `/api/1.0/choices/${choice.id}`);
    
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      };
    return (
        <div>
        <Radio style={radioStyle}>
          {!inEditMode && choice.name}
          {!inEditMode && <Tooltip title="search">
        <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
    </Tooltip>}
        {inEditMode && <Input placeholder= "Write your option here." onChange={onChange} value={value}/>}
        {inEditMode && <ButtonWithProgress onClick={onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall}
        text="Save Option" />}
        </Radio>
        </div>
    );
};

export default ChoiceView;