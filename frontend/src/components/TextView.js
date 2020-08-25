import React from 'react';
import { useEffect, useState } from 'react';
import { Input, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateQuestion } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';

const TextView = (props) => {
const { question } = props;
const [value, setValue] = useState();
const [inEditMode, setInEditMode] = useState(false);

const { TextArea } = Input;

const onChange = (e) => {
    setValue(e.target.value);
}

const onClickSave = async () => {
    const body = {
        name: value
    };

    try {
        await updateQuestion(question.id, body);
        setInEditMode(false);
    } catch (error) {

    }

}

const onClickEdit = async () => {
    setInEditMode(true);
}
    return (
        <div>
        <div>{!inEditMode && question.name}
        {!inEditMode && <Tooltip title="search">
        <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
    </Tooltip>}</div>
    {inEditMode && <Input placeholder= "Write your question here." onChange={onChange} value={value}/>}
        <div><TextArea rows={4} /></div>
        <ButtonWithProgress onClick = {onClickSave}
        text="Save" />
        </div>

    );
};

export default TextView;