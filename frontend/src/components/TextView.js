import React from 'react';
import { useEffect, useState } from 'react';
import { Input } from 'antd';

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
        </div>
    );
};

export default TextView;