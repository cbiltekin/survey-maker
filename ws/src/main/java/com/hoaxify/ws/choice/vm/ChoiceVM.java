package com.hoaxify.ws.choice.vm;

import com.hoaxify.ws.choice.Choice;
import com.hoaxify.ws.question.vm.QuestionVM;

import lombok.Data;

@Data
public class ChoiceVM {
	
	private long id;
	
	private String name;
	
	private QuestionVM question;
	
	public ChoiceVM (Choice choice) {
		this.setId(choice.getId());
		this.setName(choice.getName());
		this.setQuestion(new QuestionVM(choice.getQuestion()));;
	}

}
