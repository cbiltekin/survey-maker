package com.hoaxify.ws.question;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.question.vm.QuestionUpdateVM;
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

	public Page <Question> getOldQuestionsOfSurvey(long id, long qId, Pageable page) {
		Survey inDB = surveyService.getById(id);
		return qrepository.findByIdLessThanAndSurvey(qId, inDB, page);
	}

	public List<Question> getNewQuestions(long id, long qId, Sort sort) {
		Survey inDB = surveyService.getById(id);
		return qrepository.findByIdGreaterThanAndSurvey(qId, inDB, sort);
	}

	public long getNewQuestionsCount(long id, long qId) {
		Survey inDB = surveyService.getById(id);
		return qrepository.countByIdGreaterThanAndSurvey(qId, inDB);
	}

	public Question updateQuestion(long qId, QuestionUpdateVM updatedQ) {
		Question q = qrepository.findById(qId);
		if(q==null) {
			throw new NotFoundException();
		}
		q.setName(updatedQ.getName());
		return qrepository.save(q);
	}

}
