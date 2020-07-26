package com.hoaxify.ws.survey.vm;

import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.user.vm.UserVM;

import lombok.Data;

@Data
public class SurveyVM {
	
	private long id;
	
	private String surveyName;
	
	private UserVM user;
	
	public SurveyVM(Survey survey) {
		this.setId(survey.getId());
		this.setSurveyName(survey.getSurveyName());
		this.setUser(new UserVM(survey.getUser()));
	}

}
