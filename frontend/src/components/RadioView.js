import React from 'react';
import {useState, useEffect} from 'react';
import { Input, Rate, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateQuestion, addChoice, updateChoices } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';
import { useApiProgress } from '../shared/ApiProgress';
import ChoiceFeed from '../components/ChoiceFeed';

const RadioView = (props) => {
    const [question, setQuestion] = useState({});
    const [value, setValue] = useState();
    const [inEditMode, setInEditMode] = useState(false);
    const[name, setName] = useState("Sample Option.");
    const [errors, setErrors] = useState({});

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

        const choice = {
            name,
            question
        };
  
        try{
          console.log(name);
            await addChoice(choice);
        } catch (error){
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }
    
    return (
        <div>
        <div>{!inEditMode && question.name}
        {!inEditMode && <Tooltip title="search">
        <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
    </Tooltip>}</div>
        {inEditMode && <Input placeholder= "Write your question here." onChange={onChange} value={value}/>}
        <Button
                type="primary" onClick={onClickAddChoice}>
                Add Choice
          </Button>
          <ChoiceFeed question={question}/>
        <ButtonWithProgress onClick={onClickSave}
        text="Save" />
        </div>
    );
};

export default RadioView;