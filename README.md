Employee Task List REST API
This project implements a REST API for managing tasks of employees. It provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on tasks.

Technologies Used
Spring Boot: A powerful framework for building Java-based applications.
Spring Web: Provides basic web-related features such as routing and handling HTTP requests.
Spring Data JPA: Simplifies the implementation of data access layers by providing a repository abstraction.

JUnit: A unit testing framework for Java.
Mockito: A mocking framework used in unit tests to create mock objects.
Java 8: Utilized for its functional programming features.
Endpoints
Get All Tasks
URL: /api/tasks
Method: GET
Description: Retrieves a list of all tasks.
Response: Returns a JSON array containing task objects.
Get Task by ID
URL: /api/tasks/{id}
Method: GET
Description: Retrieves a task by its unique identifier.
Parameters:
{id}: The ID of the task to retrieve.
Response: Returns a JSON object representing the task if found, otherwise returns a 404 Not Found error.
Create Task
URL: /api/tasks
Method: POST
Description: Creates a new task.
Request Body: JSON object representing the task to be created.
Response: Returns a JSON object representing the created task along with a 201 Created status code.
Update Task
URL: /api/tasks/{id}
Method: PUT
Description: Updates an existing task.
Parameters:
{id}: The ID of the task to update.
Request Body: JSON object representing the updated task.
Response: Returns a JSON object representing the updated task along with a 200 OK status code.
Delete Task
URL: /api/tasks/{id}
Method: DELETE
Description: Deletes a task.
Parameters:
{id}: The ID of the task to delete.
Response: Returns a 204 No Content status code if the task was successfully deleted.
