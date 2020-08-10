import axios from 'axios';

export const signup = body => {
  return axios.post('/api/1.0/users', body);
};

export const login = creds => {
  return axios.post('/api/1.0/auth', {}, { auth: creds });
};

export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] = language;
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

export const createSurvey = survey => {
  return axios.post('/api/1.0/surveys', survey);
}

//for surveyfeed
export const getSurveys = (username, page = 0) => {
  const path = username ? `/api/1.0/users/${username}/surveys?page=` : '/api/1.0/surveys?page=';
  return axios.get( path + page);
}

//for single survey get
export const getSurvey = id => {
  return axios.get(`/api/1.0/surveys/${id}`);
}

//for single survey by name
export const getSurveyByName = surveyName => {
  return axios.get(`/api/1.0/survey/${surveyName}`);
}

export const addQuestion = (question) => {
  return axios.post('/api/1.0/questions', question);
}