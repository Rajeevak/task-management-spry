import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types/tasks.types";

type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addOrUpdateTask: (taskForm: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    try {
      const tasksJson = localStorage.getItem("tasks");
      setTasks(tasksJson ? JSON.parse(tasksJson) : []);
    } catch {
      setTasks([]);
    }
  };

  // Function to add or update a task in localStorage and update context state
  const addOrUpdateTask = (taskForm: Task) => {
    const tasksJson = localStorage.getItem("tasks");
    let tasks: Task[] = [];
    if (tasksJson) {
      tasks = JSON.parse(tasksJson);
    }
    let updatedTasks: Task[];
    if (taskForm.id) {
      // If taskForm.id exists, update the existing task
      updatedTasks = tasks.map(t =>
        t.id === taskForm.id ? { ...taskForm } : t
      );
    } else {
      // Otherwise, add a new task with a new id
      updatedTasks = [...tasks, { ...taskForm, id: Date.now().toString() }];
    }
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addOrUpdateTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskContextProvider");
  }
  return context;
};

export default TaskContext;