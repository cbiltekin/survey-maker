package com.hoaxify.ws.choice;

import java.text.DecimalFormat;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.answer.Answer;
import com.hoaxify.ws.answer.AnswerService;
import com.hoaxify.ws.choice.vm.ChoiceUpdateVM;
import com.hoaxify.ws.choice.vm.ChoiceVM;
import com.hoaxify.ws.error.NotFoundException;
import com.hoaxify.ws.question.Question;
import com.hoaxify.ws.question.vm.QuestionUpdateVM;
import com.hoaxify.ws.question.vm.QuestionVM;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.vm.UserVM;

@RestController
@RequestMapping("/api/1.0")
public class ChoiceController {
	
	@Autowired
	ChoiceService choiceService;
	
	@PostMapping("/choices")
	public GenericResponse saveChoice(@Valid @RequestBody Choice choice) {
		choiceService.save(choice);
		return new GenericResponse("Choice is saved.");
	}
	
	@GetMapping("/questions/{qId}/choices")
	Page<ChoiceVM> getQuestionChoices(@PathVariable long qId, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page){
		return choiceService.getChoicesOfQuestion(qId, page).map(ChoiceVM::new);
	}
	
	@GetMapping("/questions/{qId}/choices/{cId}")
	ResponseEntity<?> getQuestionChoices(@PathVariable long qId, @PathVariable long cId, @PageableDefault(sort="id", direction = Direction.DESC) Pageable page,
										@RequestParam(name="count", required = false, defaultValue = "false") boolean count,
										@RequestParam(name="direction", defaultValue = "before") String direction){
		
		if(count) {
			long newChoiceCount = choiceService.getNewChoicesCount(qId, cId);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newChoiceCount);
			return ResponseEntity.ok(response);
		}
		
		if(direction.equals("after")) {
			List<Choice> newChoices = choiceService.getNewChoices(qId, cId, page.getSort());
			List<ChoiceVM> newChoicesVM = newChoices.stream().map(ChoiceVM::new).collect(Collectors.toList());
			return ResponseEntity.ok(newChoicesVM);
		}
		
		return ResponseEntity.ok(choiceService.getOldChoicesOfQuestion(qId, cId, page).map(ChoiceVM::new));
	}
	
	@GetMapping("/choices/{qId}/answered")
	List<ChoiceVM> getChoicesList(@PathVariable long qId){
		List<Choice> choices = choiceService.getChoicesList(qId);
		List<ChoiceVM> choicesVM = new ArrayList<ChoiceVM>();
		if(choices.size()==0) {
			throw new NotFoundException();
		}
		for(Choice choice: choices) {
			choicesVM.add(new ChoiceVM(choice));
		}
		return choicesVM;
	}
	
	@GetMapping("/admin/question/{qId}/choice/{cId}")
	ResponseEntity<?> getChoiceRatio(@PathVariable long qId, @PathVariable String cId){
		double ratio = choiceService.getChoiceRatio(qId, cId);
		DecimalFormat df2 = new DecimalFormat("#.##");
		Map<String, String> response = new HashMap<>();
		response.put("ratio", df2.format(ratio));
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/choices/{cId}")
	ChoiceVM updateChoice(@RequestBody ChoiceUpdateVM updatedC, @PathVariable long cId) {
		Choice choice = choiceService.updateChoice(cId, updatedC);
		return new ChoiceVM(choice);
	}

}
