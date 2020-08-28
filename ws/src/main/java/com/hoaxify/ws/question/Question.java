package com.hoaxify.ws.question;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.hoaxify.ws.answer.Answer;
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
	
	@Column
    @ElementCollection(targetClass=String.class)
	private List<String> choices;
	
	@ManyToOne
	private Survey survey;
	
	@OneToMany(mappedBy = "question")
	private List<Answer> answers;

}
