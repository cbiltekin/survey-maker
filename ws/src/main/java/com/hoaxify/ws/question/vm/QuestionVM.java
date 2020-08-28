package com.hoaxify.ws.question.vm;

import java.util.List;

import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.survey.vm.SurveyVM;
import lombok.Data;

@Data
public class QuestionVM {
	
	private long id;
	
	private String type;
	
	private String name;
	
	private List<String> choices;
	
	private SurveyVM survey;

	public QuestionVM(Question question) {
		
		this.setId(question.getId());
		this.setType(question.getType());
		this.setName(question.getName());
		this.setChoices(question.getChoices());
		this.setSurvey(new SurveyVM(question.getSurvey()));
	}
}
