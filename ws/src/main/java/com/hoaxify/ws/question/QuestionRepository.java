package com.hoaxify.ws.question;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.user.User;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	
	Page <Question> findBySurvey(Survey survey, Pageable page);
	
	Page <Question> findByIdLessThanAndSurvey(long id, Survey survey, Pageable page);
	
	List <Question> findByIdGreaterThanAndSurvey(long id, Survey survey, Sort sort);
	
	long countByIdGreaterThanAndSurvey(long id, Survey survey);
	
	Question findById(long id);

}
