package com.hoaxify.ws.survey;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.survey.vm.SurveyVM;
import com.hoaxify.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class SurveyController {
	
	@Autowired
	SurveyService surveyService;
	
	@PostMapping("/surveys")
	public GenericResponse saveSurvey(@Valid @RequestBody Survey survey, @CurrentUser User user) {
		surveyService.save(survey, user);
		return new GenericResponse("Survey is saved.");
		
	}
	
	//the problem is the getmapping part!!!!
	@GetMapping("/surveys")
	Page<SurveyVM> getUserSurveys(@CurrentUser User user, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return surveyService.getSurveysOfUser(user.getUsername(), page).map(SurveyVM::new);
	}
	

}
