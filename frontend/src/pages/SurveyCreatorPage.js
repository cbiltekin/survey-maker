import React, {useState, useEffect} from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import { getSurvey, addQuestion } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import QuestionTypeBox from '../components/QuestionTypeBox';
import { Button} from 'antd';
import QuestionFeed from '../components/QuestionFeed';

const SurveyCreatorPage = (props) => {

    const [survey, setSurvey] = useState();
    const [isComplete, setComplete] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState(1);
    const [type, setType] = useState("radiogroup");
    const [errors, setErrors] = useState({});
    const[qVis, setQVis] = useState(false);
    const[name, setName] = useState("Enter your question here.");

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

    useEffect(() => {
      setErrors({});
  }, [type]);

    const onChangeRadio = event => {
      console.log('radio checked', event.target.value);
      setValue(event.target.value);

      if(event.target.value===1){
        setType("radiogroup");
      } else if (event.target.value===2){
        setType("checkbox");
      } else if(event.target.value===3){
        setType("rating");
      } else if(event.target.value==4){
        setType("text");
      }
    };

    const onClickQuestion = async () => {

      const question = {
          type,
          name,
          survey
      };

      try{
        console.log(type);
          await addQuestion(question);
          setVisible(false);
          setQVis(true);
      } catch (error){
          if (error.response.data.validationErrors) {
              setErrors(error.response.data.validationErrors);
          }
      }
  }

    

    //  var json = {
    //          elements: [
    //            { type, name}
    //          ]
    //        }

    //    const onCompleteSurvey = () =>{
    //      setComplete(true);  
    //  };

    //    var surv = <Survey.Survey json = {json}
    //    onComplete = {onCompleteSurvey}/>

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
          <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}>
                Add Question
          </Button>
            <QuestionTypeBox
            visible={visible}
            onClick={onClickQuestion}
            onCancel={() => {
              setVisible(false);
          }}
          onChange = {onChangeRadio}
          value = {value}
            />
            <QuestionFeed/>

        {/* {qVis && <div>{surv}</div>} */}
        </div>
    );

};

    

export default SurveyCreatorPage;