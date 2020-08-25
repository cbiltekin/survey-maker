import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';

const TextView = (props) => {
const { question } = props;
const [value, setValue] = useState();

const { TextArea } = Input;

const onChange = (e) => {
    setValue(e.target.value);
}

    return (
        <div>
        <Input placeholder={question.name} onChange={onChange} value={value}/>
        <div><TextArea rows={4} /></div>
        <ButtonWithProgress 
        text="Save" />
        </div>

    );
};

export default TextView;