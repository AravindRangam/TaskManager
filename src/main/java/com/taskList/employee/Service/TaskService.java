package com.taskList.employee.Service;

import java.util.List;
import java.util.Optional;

import com.taskList.employee.entity.Task;

public interface TaskService {
	List<Task> getAllTasks();

	Optional<Task> getTaskById(Long id);

	Task createTask(Task task);

	Task updateTask(Long id, Task task);

	void deleteTask(Long id);

}
