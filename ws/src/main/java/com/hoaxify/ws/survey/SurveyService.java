package com.hoaxify.ws.survey;

import org.springframework.stereotype.Service;

@Service
public class SurveyService {
	
	SurveyRepository surveyRepository;

	public SurveyService(SurveyRepository surveyRepository) {
		super();
		this.surveyRepository = surveyRepository;
	}

	public void save(Survey survey) {
		surveyRepository.save(survey);	
	}
	
	

}
