package com.hoaxify.ws.survey;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.answer.Answer;
import com.hoaxify.ws.answer.vm.AnswerVM;
import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.survey.vm.SurveyUpdateVM;
import com.hoaxify.ws.survey.vm.SurveyVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.vm.UserVM;

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
	
	@GetMapping("/surveys")
	Page<SurveyVM> getUserSurveys(@CurrentUser User user, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return surveyService.getSurveysOfUser(user.getUsername(), page).map(SurveyVM::new);
	}
	
	//for draft
	@GetMapping("/surveys/{id}")
	SurveyVM getSurvey(@PathVariable long id, @CurrentUser User user) {
		Survey inDB = surveyService.getById(id);
		
		if(inDB != null && inDB.getUser().getUsername().equals(user.getUsername())) {
			return new SurveyVM(inDB);
		}
		else {
			throw new NotFoundException();
		}
	}
	
	//for answering
	@GetMapping("/surveys/answer/{id}")
	SurveyVM getSurveyToAnswer(@PathVariable long id) {
		Survey inDB = surveyService.getById(id);
		
		if(inDB != null && inDB.isPublished()) {
			return new SurveyVM(inDB);
		}
		else {
			throw new NotFoundException();
		}
	}
	
	
	@GetMapping("/survey/{surveyName}")
	SurveyVM getSurveyByName(@PathVariable String surveyName, @CurrentUser User user) {
		Survey inDB = surveyService.getBySurveyNameAndUsername(surveyName, user);
		if(inDB==null) {
			throw new NotFoundException();
		}
		else {
			return new SurveyVM(inDB);
		}
	}
	
	//get published single survey
	@GetMapping("/survey/{id}/admin")
	SurveyVM getPublishedSurvey(@PathVariable long id, @CurrentUser User user) {
		Survey inDB = surveyService.getById(id);
		
		if(inDB != null && inDB.isPublished() && inDB.getUser().getUsername().equals(user.getUsername())) {
			return new SurveyVM(inDB);
		}
		else {
			throw new NotFoundException();
		}
	}
	
	@GetMapping("/survey/{id}/answered")
	List<UserVM> getAnsweredUsers(@PathVariable long id){
		List<UserVM> users = surveyService.getAnsweredUsers(id);
		if(users.size()==0) {
			throw new NotFoundException();
		}
		return users;
	}
	
	@PutMapping("/survey/{id}")
	SurveyVM updateSurvey(@RequestBody SurveyUpdateVM updatedS, @PathVariable long id) {
		Survey survey = surveyService.updateSurvey(id, updatedS);
		return new SurveyVM(survey);
	}
	
}
