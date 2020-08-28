import React from 'react';
import UserSignupPage from '../pages/UserSignupPage';
import LoginPage from '../pages/LoginPage';
import LanguageSelector from '../components/LanguageSelector';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { useSelector } from 'react-redux';
import SurveyPage from '../pages/SurveyPage';
import AnswerSurveyPage from '../pages/AnswerSurveyPage';
import SurveyCreatorPage from '../pages/SurveyCreatorPage';
import AdminPage from '../pages/AdminPage';
import TextResultPage from '../pages/TextResultPage';


const App = () => {
  const { isLoggedIn } = useSelector(store => ({
    isLoggedIn: store.isLoggedIn
  }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/login" component={LoginPage} />}
          <Route path="/signup" component={UserSignupPage} />
          <Route path="/user/:username" component={UserPage} />
          {isLoggedIn && <Route path ="/mysurveys" component={SurveyPage} />}
          {isLoggedIn && <Route path ="/create/:id" component={SurveyCreatorPage} />}
          {isLoggedIn && <Route path ="/answer/:id" component={AnswerSurveyPage} />}
          {isLoggedIn && <Route path ="/surveyadmin/:id" component={AdminPage} />}
          {isLoggedIn && <Route path ="/textboxresults/:id" component={TextResultPage} />}
          <Redirect to="/" />
        </Switch>
      </Router>
      <LanguageSelector />
    </div>
  );
};

export default App;
