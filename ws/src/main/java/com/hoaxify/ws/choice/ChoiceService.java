package com.hoaxify.ws.choice;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import com.hoaxify.ws.answer.Answer;
import com.hoaxify.ws.answer.AnswerRepository;
import com.hoaxify.ws.choice.vm.ChoiceUpdateVM;
import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.question.QuestionService;
import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.user.User;

@Service
public class ChoiceService {

	ChoiceRepository choiceRepository;
	QuestionService qService;
	
	
	public ChoiceService(ChoiceRepository choiceRepository, QuestionService qService) {
		super();
		this.choiceRepository = choiceRepository;
		this.qService = qService;
	}


	public void save(@Valid Choice choice) {
		choiceRepository.save(choice);
	}


	public Page<Choice> getChoicesOfQuestion(long qId, Pageable page) {
		Question inDB = qService.getById(qId);
		return choiceRepository.findByQuestion(inDB, page);
	}
	
	public Page <Choice> getOldChoicesOfQuestion(long qId, long cId, Pageable page) {
		Question inDB = qService.getById(qId);
		return choiceRepository.findByIdLessThanAndQuestion(cId, inDB, page);
	}

	public List<Choice> getNewChoices(long qId, long cId, Sort sort) {
		Question inDB = qService.getById(qId);
		return choiceRepository.findByIdGreaterThanAndQuestion(cId, inDB, sort);
	}

	public long getNewChoicesCount(long qId, long cId) {
		Question inDB = qService.getById(qId);
		return choiceRepository.countByIdGreaterThanAndQuestion(cId, inDB);
	}


	public Choice updateChoice(long cId, ChoiceUpdateVM updatedC) {
		Choice choice = choiceRepository.findById(cId);
		if(choice==null) {
			throw new NotFoundException();
		}
		choice.setName(updatedC.getName());
		return choiceRepository.save(choice);
	}

}
