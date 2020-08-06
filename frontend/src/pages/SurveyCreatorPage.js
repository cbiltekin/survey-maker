import React, {useState, useEffect} from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { getSurvey } from '../api/apiCalls';
import { useParams } from 'react-router-dom';

const SurveyCreatorPage = (props) => {
    // const { data } = props.location;

    const [survey, setSurvey] = useState();
    const [isComplete, setComplete] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const {id} = useParams();

    useEffect(()=>{

      const loadSurvey = async () => {
        try {
          const response = await getSurvey(id);
          setSurvey(response.data);
          setNotFound(false);
        } catch (error) {
          setNotFound(true);

        }
      };

      loadSurvey();
    }, [id]);

    

    var json = {
        pages: [
          {
            name: "page1",
            elements: [
              { type: "text", name: "question1" }
            ]
          }
        ]
      }

      const onCompleteSurvey = () =>{
        setComplete(true);  
    };

      var surv = <Survey.Survey json = {json}
      onComplete = {onCompleteSurvey}/>

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
          {survey && <div>Survey Name: {survey.surveyName}</div>}
            {surv}
        </div>
    );

};

    

export default SurveyCreatorPage;