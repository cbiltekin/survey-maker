import React from 'react';
import {useState, useEffect} from 'react';
import { Input, Rate, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateQuestion, addChoice } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';
import { useApiProgress } from '../shared/ApiProgress';

const RadioView = (props) => {
    const [question, setQuestion] = useState({});
    const [inEditMode, setInEditMode] = useState(false);
    const [value, setValue] = useState();

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    const onChange = (e) => {
        setValue(e.target.value);
    }
    
    const onClickSave = async () => {
        const body = {
            name: value
        };
    
        try {
            const response = await updateQuestion(question.id, body);
            setInEditMode(false);
            setQuestion(response.data);
        } catch (error) {
    
        }
    }
    
    const onClickEdit = async () => {
        setInEditMode(true);
    }

    const onClickAddChoice = async () => {
        const body2 = {
            choices: "Sample Option"
        };
        
        try {
            const response = await addChoice(question.id, body2);
            setQuestion(response.data);
        } catch (error) {

        }
    }
    
    return (
        <div>
            <div>{!inEditMode && question.name}
            {!inEditMode && <Tooltip title="search">
            <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
            </Tooltip>}</div>
            <Button type ="primary" onClick={onClickAddChoice}>Add Choices</Button>
            {inEditMode && <Input placeholder= "Write your question here." onChange={onChange} value={value}/>}
            <ButtonWithProgress onClick={onClickSave}
            text="Save" />
        </div>
    );
};

export default RadioView;