package com.hoaxify.ws.survey;

import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.hoaxify.ws.user.User;


public class UniqueSurveyNameValidator implements ConstraintValidator<UniqueSurveyName, String>{
	
	@Autowired
	SurveyService serv;

	@Override
	public boolean isValid(String surveyName, ConstraintValidatorContext context) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		List<Survey> surv = serv.findAll(surveyName);
		if(surv.isEmpty()) {
			return true;
		} else {
			for(Survey sv:surv) {
				User user = (User) auth.getPrincipal();
				if(sv.getUser().getUsername() == user.getUsername()) {
					return false;
				}
			}
			return true;
		}
	}
}