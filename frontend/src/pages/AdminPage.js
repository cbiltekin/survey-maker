import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getAdminSurvey, getAnsweredUsers } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import UserView from '../components/UserView';
import ResultFeed from '../components/ResultFeed';


const AdminPage = (props) => {
    const [survey, setSurvey] = useState();
    const [notFound, setNotFound] = useState(false);
    const [notFound2, setNotFound2] = useState(false);
    const[users, setUsers] = useState({ userContent: []});
    const {id} = useParams();

    useEffect(()=>{

        const loadSurvey = async () => {
          try {
            const response = await getAdminSurvey(id);
            console.log("c1");
            setSurvey(response.data);
            setNotFound(false);
          } catch (error) {
            setNotFound(true);
          }
        };
  
        loadSurvey();
      }, [id]);

      useEffect(()=>{

        const loadUsers = async () => {
          try {
            const response = await getAnsweredUsers(id);
            console.log("c2");
            setUsers(({userContent: response.data}));
            setNotFound2(false);
          } catch (error) {
            setNotFound2(true);
          }
        };
  
        loadUsers();
      }, [survey]);

      const pendingApiCall = useApiProgress('get', `/api/1.0/survey/${id}/admin`);
      const {userContent} = users;



      if(notFound){
        return(
          <div className ="container">
            <div className ="alert alert-danger">
            Survey not found
            </div>
          </div>
        );
      }

      if(survey && notFound2){
        return (
        <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : 'There are no users that answered!'}</div>);
    }
    return (
        <div className="container">
            Survey Name: {survey && survey.surveyName}
            <div>{survey && "Your survey is answered by following users:"}</div>
            {survey && userContent.map(user => {
                return <UserView key ={user.id} user={user} />;
            })}
            {survey && <ResultFeed/>}
        </div>
    );
};

export default AdminPage;