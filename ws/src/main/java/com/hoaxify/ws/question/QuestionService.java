package com.hoaxify.ws.question;

import org.springframework.stereotype.Service;

import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.user.User;

@Service
public class QuestionService {
	
	QuestionRepository qrepository;

	public QuestionService(QuestionRepository qrepository) {
		super();
		this.qrepository = qrepository;
	}
	
	public void save(Question question, Survey survey) {
		question.setSurvey(survey);
		qrepository.save(question);	
	}

}
