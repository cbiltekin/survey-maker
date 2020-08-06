package com.hoaxify.ws.survey;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	public List<Survey> findAll(String surveyName) {
	    return surveyRepository.findBySurveyName(surveyName);
	}

	public Survey getById(long id) {
		return surveyRepository.findById(id);
	}

	public Survey getBySurveyNameAndUsername(String surveyName, User user) {
		List<Survey> surveyByName = surveyRepository.findBySurveyName(surveyName);
		for(Survey surv: surveyByName) {
			if (surv.getUser().getUsername() == user.getUsername()) {
				return surv;
			}
		}
		return null;
	}
}
