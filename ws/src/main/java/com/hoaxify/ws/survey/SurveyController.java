package com.hoaxify.ws.survey;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;

@RestController
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
	@PostMapping("/api/1.0/surveys")
	public GenericResponse saveSurvey(@Valid @RequestBody Survey survey, @CurrentUser User user) {
		surveyService.save(survey, user);
		return new GenericResponse("Survey is saved.");
		
	}
	

}
