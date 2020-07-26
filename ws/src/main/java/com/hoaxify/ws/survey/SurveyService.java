package com.hoaxify.ws.survey;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@Service
public class SurveyService {
	
	SurveyRepository surveyRepository;
	UserService userService;

	public SurveyService(SurveyRepository surveyRepository, UserService userService) {
		super();
		this.surveyRepository = surveyRepository;
		this.userService = userService;
	}

	public void save(Survey survey, User user) {
		survey.setUser(user);
		surveyRepository.save(survey);	
	}

	public Page<Survey> getSurveys(Pageable page) {
		return surveyRepository.findAll(page);
	}

	public Page<Survey> getSurveysOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return surveyRepository.findByUser(inDB, page);
	}

}
