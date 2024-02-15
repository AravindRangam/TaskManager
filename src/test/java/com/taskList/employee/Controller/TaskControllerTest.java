package com.taskList.employee.Controller;

import com.taskList.employee.Service.TaskService;
import com.taskList.employee.entity.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TaskControllerTest {

	@Mock
	private TaskService taskService;

	@InjectMocks
	private TaskController taskController;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	void getAllTasks() {

		List<Task> tasks = Arrays.asList(new Task(), new Task());
		when(taskService.getAllTasks()).thenReturn(tasks);

		ResponseEntity<List<Task>> response = taskController.getAllTasks();

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(tasks, response.getBody());
	}

	@Test
	void getTaskById() {
		Long id = 1L;
		Task task = new Task();
		when(taskService.getTaskById(id)).thenReturn(Optional.of(task));

		ResponseEntity<Task> response = taskController.getTaskById(id);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(task, response.getBody());
	}

	@Test
	void createTask() {

		Task task = new Task();
		when(taskService.createTask(any(Task.class))).thenReturn(task);

		ResponseEntity<Task> response = taskController.createTask(task);

		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		assertEquals(task, response.getBody());
	}

	@Test
	void updateTask() {

		Long id = 1L;
		Task task = new Task();
		when(taskService.updateTask(eq(id), any(Task.class))).thenReturn(task);

		ResponseEntity<Task> response = taskController.updateTask(id, task);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(task, response.getBody());
	}

	@Test
	void deleteTask() {

		Long id = 1L;

		ResponseEntity<Void> response = taskController.deleteTask(id);

		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
		verify(taskService, times(1)).deleteTask(id);
	}
}
