import React, {useState, useEffect} from 'react';
import { getSurveyToAnswer, addAnsweredUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import AnswerQuestionFeed from '../components/AnswerQuestionFeed';
import ButtonWithProgress from '../components/ButtonWithProgress';

const AnswerSurveyPage = (props) => {

    const [survey, setSurvey] = useState();
    const [notFound, setNotFound] = useState(false);
    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const {id} = useParams();
    const history = useHistory();
    const [indicator, setIndicator] = useState(false);


    useEffect(()=>{

        const loadSurvey = async () => {
          try {
            const response = await getSurveyToAnswer(id);
            setSurvey(response.data);
            setNotFound(false);
            setIndicator(true);
          } catch (error) {
            setNotFound(true);
          }
        };
  
        loadSurvey();
      }, [id]);

useEffect(()=>{
  if (survey && !notFound && loggedInUsername === survey.user.username){
        history.push(`/surveyadmin/${survey.id}`);
    }
}, [survey, id, indicator]);

const onClickSave = async () => {

  try {
    await addAnsweredUser(id);
    history.push(`/mysurveys`);
} catch (error) {

}

}

if(notFound){
    return(
      <div className ="container">
        <div className ="alert alert-danger">
        Survey not found
        </div>
      </div>
    );
  }

    return (
        <div className ="container">
        {survey && <div>You are answering the survey: {survey.surveyName}</div>}
        {survey && <div>This survey was made by: {survey.user.displayName}</div>}
        <AnswerQuestionFeed/>
        <ButtonWithProgress onClick={onClickSave}
        text="Save My Answers" />

            
        </div>
    );
};

export default AnswerSurveyPage;