package com.hoaxify.ws.survey;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.hoaxify.ws.user.User;

import lombok.Data;

@Data
@Entity
public class Survey {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@Size(min = 4, max=255)
	@UniqueSurveyName
	private String surveyName;
	
	@ManyToOne
	private User user;
}
