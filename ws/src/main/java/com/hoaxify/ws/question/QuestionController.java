package com.hoaxify.ws.question;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.survey.Survey;
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

}
