package com.hoaxify.ws.question;

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

import com.hoaxify.ws.question.vm.QuestionVM;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.survey.vm.SurveyVM;
import com.hoaxify.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class QuestionController {
	
	@Autowired
	QuestionService qservice;
	
	@PostMapping("/questions")
	public GenericResponse saveQuestion(@Valid @RequestBody Question question) {
		qservice.save(question);
		return new GenericResponse("Question is saved.");
		
	}
	
	@GetMapping("/surveys/{id}/questions")
	Page<QuestionVM> getSurveyQuestions(@PathVariable long id, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return qservice.getQuestionsOfSurvey(id, page).map(QuestionVM::new);
	}
	
	@GetMapping("/surveys/{id}/questions/{qId}")
	Page<QuestionVM> getSurveyQuestions(@PathVariable long id, @PathVariable long qId, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return qservice.getOldQuestionsOfSurvey(id, qId, page).map(QuestionVM::new);
	}
	
	

}
