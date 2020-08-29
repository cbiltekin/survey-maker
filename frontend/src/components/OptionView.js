import React from 'react';
import {useState, useEffect} from 'react';

const OptionView = (props) => {
    const [option, setOption] = useState({});
    useEffect( () => {
        setOption(props.option);
    },[props.option]);

    return (
        <div className="container">
        {option}   
        </div>
    );
};

export default OptionView;