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

//get questions of survey in draft
export const getQuestions = (id, page = 0) => {
  const path = id ? `/api/1.0/surveys/${id}/questions?page=` : '/api/1.0/questions?page=';
  return axios.get( path + page);
}

//get old questions from given id
export const getOldQuestions = (id, qId) => {
  return axios.get(`/api/1.0/surveys/${id}/questions/${qId}`);
}

//new question count for specific survey
export const getNewQuestionCount = (id, qId) => {
  return axios.get(`/api/1.0/surveys/${id}/questions/${qId}?count=true`);
}

//get new questions for update
export const getNewQuestions = (id, qId) => {
  return axios.get(`/api/1.0/surveys/${id}/questions/${qId}?direction=after`);
}

//draft question put request
export const updateQuestion = (qId, body) => {
  return axios.put(`/api/1.0/question/${qId}`, body);
}

//change publish state of survey
export const publishSurvey = (id, body) => {
  return axios.put(`/api/1.0/survey/${id}`, body);
}

//get survey to answer
export const getSurveyToAnswer = (id) => {
  return axios.get(`/api/1.0/surveys/answer/${id}`);
}

//create answer/submit answer
export const submitAnswer = (answer) => {
  return axios.post('/api/1.0/answers', answer);
}