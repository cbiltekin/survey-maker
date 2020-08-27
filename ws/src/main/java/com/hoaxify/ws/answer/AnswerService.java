package com.hoaxify.ws.answer;

import org.springframework.stereotype.Service;

import com.hoaxify.ws.question.QuestionService;
import com.hoaxify.ws.user.User;

@Service
public class AnswerService {
	
	AnswerRepository answerRepository;
	QuestionService qService;
	
	public AnswerService(AnswerRepository answerRepository, QuestionService qService) {
		super();
		this.answerRepository = answerRepository;
		this.qService = qService;
	}
	
	public void save(Answer answer, User user) {
		answer.setUser(user);
		answerRepository.save(answer);	
	}
	
}
