package com.hoaxify.ws.survey;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.user.User;

import javassist.SerialVersionUID;
import lombok.Data;

@Data
@Entity
public class Survey {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private boolean isPublished;
	
	@NotNull
	@Size(min = 4, max=255)
	@UniqueSurveyName
	private String surveyName;
	
	@ManyToOne
	private User user;
	
	@OneToMany(mappedBy = "survey")
	private List<Question> questions;
	
	@ElementCollection(targetClass=User.class)
	private List<User> answeredUsers;
	
	public boolean addAnsweredUser(User user) {
		answeredUsers.add(user);
		return true;
	}
}
