import React from 'react';
import {useState, useEffect} from 'react';
import { Input, Rate, Tooltip, Button } from 'antd';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { updateQuestion, addChoice, updateChoices } from '../api/apiCalls';
import { EditOutlined } from '@ant-design/icons';
import { useApiProgress } from '../shared/ApiProgress';
import OptionView from '../components/OptionView';

const RadioView = (props) => {
    const [question, setQuestion] = useState({});
    const [inEditMode, setInEditMode] = useState(false);
    const [inEditMode2, setInEditMode2] = useState(false);
    const [value, setValue] = useState();
    const [choices, setChoices] = useState({ choiceContent: []});
    const [indicator, setIndicator] = useState(false);
    const [prop, setProp] = useState();
    const [index, setIndex] = useState(-1);
    const [optionName, setOptionName] = useState();

    useEffect( () => {
        setQuestion(props.question);
        setIndicator(true);
    },[props.question]);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onChangeOption = (e) => {
        setOptionName(e.target.value);
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
        
        setChoices(prevState => ({
            choiceContent: [...prevState.choiceContent, "Option"]
        }));
    }

    const onClickChoiceEdit = async () => {
        setInEditMode2(true);
    }

    const onClickChoiceSave = async (option) => {

        var indx = choiceContent.findIndex(function(e) {
            return e === option;
        });

        console.log(indx);
        let newArr = [...choiceContent]; // copying the old datas array
        newArr[indx] = optionName; // replace e.target.value with whatever you want to change it to
        console.log(newArr);
        setChoices(({
            choiceContent: [...newArr]
        }));
        console.log(choiceContent);
        setInEditMode2(false);
    }

    const onClickSaveAll = async () => {
        const body = {
            choices: [...choiceContent]
        }
        try {
            const response = await updateChoices(question.id, body);
            setQuestion(response.data);
        } catch (error) {
        }
    }

    useEffect( () => {
        console.log(choiceContent);
    },[choices]);


    const {choiceContent} = choices;
    
    return (
        <div>
            <div>{!inEditMode && question.name}
            {!inEditMode && <Tooltip title="search">
            <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickEdit}/>
            </Tooltip>}</div>
            <>{inEditMode && <Input placeholder= "Write your question here." onChange={onChange} value={value}/>}
                {inEditMode && <ButtonWithProgress onClick={onClickSave} text="Save" />}</>
            <>{choiceContent.length != 0 && choiceContent.map((option, i) => {
                return  <li key={i}>{option}<Tooltip title="search">
                {!inEditMode2 && <Button type="primary" shape="square" icon={<EditOutlined />} onClick = {onClickChoiceEdit}/>}
            </Tooltip><>
            {inEditMode2 && <Input placeholder= "Write your option here." onChange={onChangeOption} value={optionName}/>}
            {inEditMode2 && <ButtonWithProgress onClick={() => onClickChoiceSave(option)} text="Save" />}</></li>;
            })}</>
            <Button type ="primary" onClick={onClickAddChoice}>Add Choices</Button>
            <ButtonWithProgress onClick={onClickSaveAll}
            text="Save" />
        </div>
    );
};

export default RadioView;