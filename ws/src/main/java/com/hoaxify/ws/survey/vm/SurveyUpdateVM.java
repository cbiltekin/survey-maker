package com.hoaxify.ws.survey.vm;

import java.util.List;

import com.hoaxify.ws.user.User;

import lombok.Data;

@Data
public class SurveyUpdateVM {

	private boolean isPublished;
	
	private User answeredUser;

}
