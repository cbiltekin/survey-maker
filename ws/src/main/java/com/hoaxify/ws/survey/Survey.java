package com.hoaxify.ws.survey;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.hoaxify.ws.user.User;

import lombok.Data;

@Data
@Entity
public class Survey {
	
	@Id @GeneratedValue
	private long id;
	
	@NotNull
	@Size(min = 4, max=255)
	private String surveyName;
	
	private User user;
}
