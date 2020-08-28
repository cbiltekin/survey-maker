package com.hoaxify.ws.answer.vm;

import com.hoaxify.ws.answer.Answer;
import com.hoaxify.ws.question.vm.QuestionVM;
import com.hoaxify.ws.user.vm.UserVM;
import lombok.Data;

@Data
public class AnswerVM {
	
	private long id;
	
	private String choices;
	
	private QuestionVM question;
	
	private UserVM user;

	public AnswerVM(Answer answer) {

		this.setId(answer.getId());
		this.setChoices(answer.getChoices());;
		this.setQuestion(new QuestionVM(answer.getQuestion()));;
		this.setUser(new UserVM(answer.getUser()));;
	}
	
	

}
