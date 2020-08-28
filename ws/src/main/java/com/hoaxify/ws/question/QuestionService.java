package com.hoaxify.ws.question;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.answer.Answer;
import com.hoaxify.ws.answer.vm.AnswerVM;
import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.question.vm.QuestionUpdateVM;
import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.survey.SurveyService;
import com.hoaxify.ws.user.User;

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

	public long getAverage(long qId) {
		Question q = qrepository.findById(qId);
		long av = 0;
		long rate; 
		if(q==null) {
			throw new NotFoundException();
		}
		List<Answer> answers = q.getAnswers();
		for (Answer answer : answers ) {
			rate = Long.parseLong(answer.getChoices());
			av = av + rate;
		}
		av = av / (long) answers.size();
		return av;
	}

	public List<AnswerVM> getTextAnswers(long qId) {
		Question q = qrepository.findById(qId);
		List<AnswerVM> texts = new ArrayList<AnswerVM>();
		if(q==null|| !(q.getSurvey().isPublished())) {
			throw new NotFoundException();
		}
		List<Answer> answers = q.getAnswers();
		for (Answer answer : answers ) {
			texts.add(new AnswerVM(answer));	
		}
		return texts;
	}

	public Question getQuestion(long qId, User user) {
		Question q = qrepository.findById(qId);
		if(q==null || q.getSurvey().getUser().getUsername()!=user.getUsername()) {
			throw new NotFoundException();
		}
		return q;
	}

	public Question addChoices(long qId, QuestionUpdateVM updatedQ) {
		Question q = qrepository.findById(qId);
		if(q==null) {
			throw new NotFoundException();
		}
		q.getChoices().add(updatedQ.getChoices());
		return qrepository.save(q);
	}
}
