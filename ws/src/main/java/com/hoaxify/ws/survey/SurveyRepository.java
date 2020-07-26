package com.hoaxify.ws.survey;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.user.User;

public interface SurveyRepository extends JpaRepository<Survey, Long>{
	
	Page <Survey> findByUser(User user, Pageable page);
	
//	List<Survey> findBySurveyName(String surveyName);
	
	List<Survey> findBySurveyName(String surveyName);
	

}
