package com.hoaxify.ws.answer;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class AnswerController {
	@Autowired
	AnswerService answerService;
	
	@PostMapping("/answers")
	public GenericResponse saveQuestion(@Valid @RequestBody Answer answer, @CurrentUser User user) {
		answerService.save(answer, user);
		return new GenericResponse("Answer is saved.");
		
	}
	

}
