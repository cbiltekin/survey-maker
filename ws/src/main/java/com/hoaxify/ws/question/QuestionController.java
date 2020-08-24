package com.hoaxify.ws.question;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.question.vm.QuestionVM;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.survey.Survey;
import com.hoaxify.ws.survey.vm.SurveyVM;
import com.hoaxify.ws.user.User;

@RestController
@RequestMapping("/api/1.0")
public class QuestionController {
	
	@Autowired
	QuestionService qservice;
	
	@PostMapping("/questions")
	public GenericResponse saveQuestion(@Valid @RequestBody Question question) {
		qservice.save(question);
		return new GenericResponse("Question is saved.");
		
	}
	
	@GetMapping("/surveys/{id}/questions")
	Page<QuestionVM> getSurveyQuestions(@PathVariable long id, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return qservice.getQuestionsOfSurvey(id, page).map(QuestionVM::new);
	}
	
	@GetMapping("/surveys/{id}/questions/{qId}")
	ResponseEntity<?> getSurveyQuestions(@PathVariable long id, @PathVariable long qId, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page,
										@RequestParam(name="count", required = false, defaultValue = "false") boolean count,
										@RequestParam(name="direction", defaultValue = "before") String direction){
		
		if(count) {
			long newQuestionCount = qservice.getNewQuestionsCount(id, qId);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newQuestionCount);
			return ResponseEntity.ok(response);
		}
		
		if(direction.equals("after")) {
			List<Question> newQuestions = qservice.getNewQuestions(id, qId, page.getSort());
			List<QuestionVM> newQuestionsVM = newQuestions.stream().map(QuestionVM::new).collect(Collectors.toList());
			return ResponseEntity.ok(newQuestionsVM);
		}
		
		return ResponseEntity.ok(qservice.getOldQuestionsOfSurvey(id, qId, page).map(QuestionVM::new));
	}
	
	

}
