package com.hoaxify.ws.survey;

import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;

@Service
public class SurveyService {
	
	SurveyRepository surveyRepository;

	public SurveyService(SurveyRepository surveyRepository) {
		super();
		this.surveyRepository = surveyRepository;
	}

	public void save(Survey survey, User user) {
		survey.setUser(user);
		surveyRepository.save(survey);	
	}

}
