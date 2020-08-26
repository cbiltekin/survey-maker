package com.hoaxify.ws.survey.vm;

import lombok.Data;

@Data
public class SurveyUpdateVM {

	private boolean isPublished;

	public boolean getPublished() {
		return isPublished;
	}
}
