package com.hoaxify.ws.survey;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
public class Survey {
	
	@Id @GeneratedValue
	private long id;
	
	private String surveyName;
}
