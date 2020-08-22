package com.hoaxify.ws.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.user.User;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	
	Page <Question> findBySurvey(Survey survey, Pageable page);

}
