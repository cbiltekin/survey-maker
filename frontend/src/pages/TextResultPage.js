import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getAdminSurvey, getAnsweredUsers, getTextResults, getAQuestion } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import UserView from '../components/UserView';
import ResultFeed from '../components/ResultFeed';
import TextResult from '../components/TextResult';


const TextResultPage = (props) => {
    const [notFound, setNotFound] = useState(false);
    const [notFound2, setNotFound2] = useState(false);
    const[texts, setTexts] = useState({ textContent: []});
    const [question, setQuestion] = useState();
    const {id} = useParams();

    useEffect(()=>{

        const loadQuestion = async () => {
          try {
            const response = await getAQuestion(id);
            console.log("c1");
            setQuestion(response.data);
            setNotFound(false);
          } catch (error) {
            setNotFound(true);
          }
        };
  
        loadQuestion();
      }, [id]);

      useEffect(()=>{

        const loadTexts = async () => {
          try {
            const response = await getTextResults(id);
            console.log("textcheck");
            setTexts(({textContent: response.data}));
            setNotFound2(false);
          } catch (error) {
            setNotFound2(true);
          }
        };
  
        loadTexts();
      }, [question]);

      const pendingApiCall = useApiProgress('get', `/api/1.0/questions/${id}`);
      const {textContent} = texts;



      if(notFound){
        return(
          <div className ="container">
            <div className ="alert alert-danger">
            Page not found
            </div>
          </div>
        );
      }

      if(question && notFound2){
        return (
        <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : 'There are no users that answered this question!'}</div>);
    }
    return (
        <div className="container">
            You asked: {question && question.name}
            <div>{question && "Your question is answered by following users like this:"}</div>
            {question && textContent.map(textAnswer => {
                 return <TextResult key ={textAnswer.id} textAnswer={textAnswer} />;
            })}
        </div>
    );
};

export default TextResultPage;