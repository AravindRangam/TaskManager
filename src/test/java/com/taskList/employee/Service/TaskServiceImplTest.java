package com.taskList.employee.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.taskList.employee.entity.Task;
import com.taskList.employee.repository.TaskRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllTasks() throws ParseException {
        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task(1L, "Task 1", "Description 1", parseDate("2024-02-14"), false));
        mockTasks.add(new Task(2L, "Task 2", "Description 2", parseDate("2024-02-15"), true));
        
        when(taskRepository.findAll()).thenReturn(mockTasks);
        
        List<Task> result = taskService.getAllTasks();
        
        assertEquals(2, result.size());
        assertEquals("Task 1", result.get(0).getTitle());
        assertEquals("Task 2", result.get(1).getTitle());
    }

    @Test
    void testGetTaskById() throws ParseException {
        Task mockTask = new Task(1L, "Task 1", "Description 1", parseDate("2024-02-14"), false);
        
        when(taskRepository.findById(1L)).thenReturn(Optional.of(mockTask));
        
        Optional<Task> result = taskService.getTaskById(1L);
        
        assertTrue(result.isPresent());
        assertEquals("Task 1", result.get().getTitle());
    }

    @Test
    void testCreateTask() throws ParseException {
        Task taskToSave = new Task(null, "Task 1", "Description 1", parseDate("2024-02-14"), false);
        Task savedTask = new Task(1L, "Task 1", "Description 1", parseDate("2024-02-14"), false);
        
        when(taskRepository.save(taskToSave)).thenReturn(savedTask);
        
        Task result = taskService.createTask(taskToSave);
        
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testUpdateTask() throws ParseException {
        Task taskToUpdate = new Task(1L, "Task 1", "Description 1", parseDate("2024-02-14"), false);
        
        when(taskRepository.existsById(1L)).thenReturn(true);
        when(taskRepository.save(taskToUpdate)).thenReturn(taskToUpdate);
        
        Task result = taskService.updateTask(1L, taskToUpdate);
        
        assertNotNull(result);
        assertEquals("Task 1", result.getTitle());
    }

    @Test
    void testDeleteTask() {
        Long taskId = 1L;
        
        taskService.deleteTask(taskId);
        
        verify(taskRepository, times(1)).deleteById(taskId);
    }

    private Date parseDate(String dateString) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.parse(dateString);
    }
}
