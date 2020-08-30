import React, { useEffect, useState } from 'react';
import {getNewChoicesCount, getChoices, getOldChoices, getNewChoices} from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import ChoiceView from './ChoiceView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';

const ChoiceFeed = (props) => {
    const [question, setQuestion] = useState({});
    const [choicePage, setChoicePage] = useState({ content: [], last: true, number: 0});
    const [newCcount, setnewCCount] = useState(0);
    const {t} = useTranslation();

    useEffect( () => {
        setQuestion(props.question);
    },[props.question]);

    let lastChoiceId = 0;
    let firstChoiceId = 0;
    if( choicePage.content.length > 0){
        firstChoiceId = choicePage.content[0].id;
        const lastChoiceIndex = choicePage.content.length - 1;
        lastChoiceId = choicePage.content[lastChoiceIndex].id;
    }
    
    const path = `/api/1.0/questions/${question.id}/choices?page=`;
    const initialProgress = useApiProgress('get', path);
    const laterProgress = useApiProgress('get', `/api/1.0/questions/${question.id}/choices/${lastChoiceId}`, true);

    //polling
    useEffect(() =>{
        const getCount = async () => {
            const response = await getNewChoicesCount(question.id, firstChoiceId);
            setnewCCount(response.data.count);
        };

        let looper = setInterval(() =>{
            getCount();
        }, 5000);
        return function cleanup() {
            clearInterval(looper);
        };
    },[firstChoiceId, question.id]);

    useEffect(() =>{

        const loadChoices = async (page) => {
            try {
                console.log(question.id);
                const response = await getChoices(question.id, page);
                setChoicePage(previousChoicePage=>({
                    ...response.data,
                    content: [...previousChoicePage.content, ...response.data.content]
                }));
            }catch(error){
    
            }
        
        };

        if(question.id){
            loadChoices();
        }
    },[question.id]);

    useEffect(()=>{
        if(newCcount>0){
            loadNewChoices();
        }

    },[newCcount]);

    const loadOldChoices = async () => {
        const response = await getOldChoices(question.id, lastChoiceId);
        setChoicePage(previousChoicePage=>({
            ...response.data,
            content: [...previousChoicePage.content, ...response.data.content]
        }));
    }

    const loadNewChoices = async () => {
        const response = await getNewChoices(question.id, firstChoiceId);
        setChoicePage(previousChoicePage=>({
            ...previousChoicePage,
            content: [...response.data, ...previousChoicePage.content]
        }));
        setnewCCount(0);
    }


    const {content, last} = choicePage;

    if(content.length === 0){
        return <div className="alert alert-secondary text-center">{initialProgress ? <Spinner /> : t('There are no choices! Would you like to add?')}</div>
    }

    return (
        <div>
            {content.map(choice => {
                return <ChoiceView key ={choice.id} choice={choice} />;
            })}
            {!last && <div className="alert alert-secondary text-center"
            style={{ cursor: laterProgress ? 'not-allowed' : 'pointer'}}
             onClick={laterProgress ? () => {} : ()=> loadOldChoices()}>
                {laterProgress ? <Spinner /> : t('Load More Choices')}</div>}
        </div>
    );
};

export default ChoiceFeed;