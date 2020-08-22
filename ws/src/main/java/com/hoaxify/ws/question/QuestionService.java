package com.hoaxify.ws.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.survey.SurveyService;

@Service
public class QuestionService {
	
	QuestionRepository qrepository;
	SurveyService surveyService;
	

	public QuestionService(QuestionRepository qrepository, SurveyService surveyService) {
		super();
		this.qrepository = qrepository;
		this.surveyService = surveyService;
	}
	
	public void save(Question question) {
		qrepository.save(question);	
	}

	public Page <Question> getQuestionsOfSurvey(long id, Pageable page) {
		Survey inDB = surveyService.getById(id);
		return qrepository.findBySurvey(inDB, page);
	}

}
