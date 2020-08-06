package com.hoaxify.ws.question;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.hoaxify.ws.survey.Survey;

import lombok.Data;

@Data
@Entity
public class Question {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String type;
	
	@NotNull
	@Size(max=255)
	private String name;
	
	@NotNull
	private String [] answers;
	
	@ManyToOne
	private Survey survey;
		
}
