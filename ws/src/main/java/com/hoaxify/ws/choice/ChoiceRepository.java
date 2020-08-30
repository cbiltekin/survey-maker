package com.hoaxify.ws.choice;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hoaxify.ws.question.Question;

public interface ChoiceRepository extends JpaRepository<Choice, Long>  {

	Page<Choice> findByQuestion(Question question, Pageable page);

	Page<Choice> findByIdLessThanAndQuestion(long id, Question question, Pageable page);

	List<Choice> findByIdGreaterThanAndQuestion(long id, Question question, Sort sort);

	long countByIdGreaterThanAndQuestion(long id, Question question);
	
	Choice findById(long id);

}
