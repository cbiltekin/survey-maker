package com.hoaxify.ws.answer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.user.User;

import lombok.Data;

@Data
@Entity
public class Answer {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String choices;
	
	@ManyToOne
	private Question question;
	
	@ManyToOne
	private User user;

}
