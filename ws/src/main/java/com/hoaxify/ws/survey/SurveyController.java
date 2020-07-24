package com.hoaxify.ws.survey;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.GenericResponse;

@RestController
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
	@PostMapping("/api/1.0/surveys")
	public GenericResponse saveSurvey(@Valid @RequestBody Survey survey) {
		surveyService.save(survey);
		return new GenericResponse("Survey is saved.");
		
	}
	

}
