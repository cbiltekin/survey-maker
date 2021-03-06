import React from 'react';
import { useEffect, useState } from 'react';
import { Input, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateQuestion } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';
import { useApiProgress } from '../shared/ApiProgress';

const TextView = (props) => {
const [value, setValue] = useState();
const [inEditMode, setInEditMode] = useState(false);
const [question, setQuestion] = useState({});

const { TextArea } = Input;

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

const pendingApiCall = useApiProgress('put', `/api/1.0/question/${question.id}`);

    return (
        <div>
        <div>{!inEditMode && question.name}
        {!inEditMode && <Tooltip title="search">
        <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
    </Tooltip>}</div>
    {inEditMode && <Input placeholder= "Write your question here." onChange={onChange} value={value}/>}
        <div><TextArea rows={4} /></div>
        <ButtonWithProgress onClick = {onClickSave} pendingApiCall={pendingApiCall} disabled={pendingApiCall || !value || !inEditMode}
        text="Save" />
        </div>

    );
};

export default TextView;