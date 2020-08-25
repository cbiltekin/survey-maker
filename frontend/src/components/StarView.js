import React from 'react';
import { useEffect, useState } from 'react';
import { Input, Rate } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';

const StarView = (props) => {
const { question } = props;
const [value, setValue] = useState();

const onChange = (e) => {
    setValue(e.target.value);
}

    return (
        <div>
        <Input placeholder={question.name} onChange={onChange} value={value}/>
        <div><Rate/></div>
        <ButtonWithProgress 
        text="Save" />
        </div>
    );
};

export default StarView;