import { useState, useEffect } from "react";
import {
  getCollectionData,
  setCollectionData,
  updateCollectionData,
  deleteCollectionData,
} from "../fireAdapter";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksList = await getCollectionData("tasks");
      setTasks(tasksList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      await setCollectionData("tasks", { description: newTask });
      fetchTasks();
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleEditTask = async (task) => {
    const updatedTaskDescription = prompt("Edit task:", task.description);

    if (updatedTaskDescription) {
      try {
        await updateCollectionData("tasks", task.id, {
          description: updatedTaskDescription,
        });
        fetchTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      await deleteCollectionData("tasks", task.id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}{" "}
            <button onClick={() => handleEditTask(task)}>Edit</button>{" "}
            <button onClick={() => handleDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TodoList;
