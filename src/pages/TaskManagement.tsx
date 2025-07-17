import { useState, useMemo, useEffect } from "react";
import { createUseStyles } from "react-jss";
import TaskCard from "../components/task-management/TaskCard";
import TaskForm from "../components/task-management/TaskForm";
import { useTaskContext } from "../contexts/TaskContextProvider";
import { TaskStatusEnum, TaskStatusLabels, type TaskStatus } from "../types/tasks.types";

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: "80vw",
    "@media (max-width: 600px)": {
      height: "auto",
      minHeight: "100vh",
      padding: [0, 4],
    },
    padding: [0, 16],
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 600px)": {
      flex: "unset",
    },
  },
  tasksGrid: {
    flex: 1,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    padding: "8px 0",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
      gap: 10,
      padding: "4px 0",
    },
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    "@media (max-width: 600px)": {
      flexDirection: "column",
      alignItems: "stretch",
      gap: 8,
      marginBottom: 10,
    },
  },
  filterLabel: {
    fontWeight: 500,
    fontSize: 15,
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
  filterSelect: {
    padding: "6px 10px",
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 15,
    background: "#232323",
    "@media (max-width: 600px)": {
      fontSize: 14,
      width: "100%",
    },
  },
  sortLabel: {
    fontWeight: 500,
    fontSize: 15,
    "@media (max-width: 600px)": {
      fontSize: 14,
    },
  },
  sortSelect: {
    padding: "6px 10px",
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 15,
    background: "#232323",
    "@media (max-width: 600px)": {
      fontSize: 14,
      width: "100%",
    },
  },
  tasksHeader: {
    "@media (max-width: 600px)": {
      fontSize: 18,
      margin: "8px 0 4px 0",
    },
  },
  noTasks: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    "@media (max-width: 600px)": {
      fontSize: 14,
      padding: "12px 0",
    },
  },
  addTask: {
    display: "flex",
    marginBottom: 16,
    justifyContent: "flex-end",
  },
});

type DueDateSortOrder = "asc" | "desc";

const TaskManagement = ({completedTask}: {completedTask: boolean}) => {
  const { tasks } = useTaskContext();
  const classes = useStyles();

  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">(completedTask ? "completed" : "all");
  const [dueDateSort, setDueDateSort] = useState<DueDateSortOrder>("asc");

  useEffect(() => {
    setStatusFilter(completedTask ? "completed" : "all");
  }, [completedTask]);

  // Filter and sort tasks
  const filteredSortedTasks = useMemo(() => {
    let filtered = tasks;
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    // Sort by dueDate
    return [...filtered].sort((a, b) => {
      const aTime = Date.parse(a.dueDate);
      const bTime = Date.parse(b.dueDate);
      if (isNaN(aTime) && isNaN(bTime)) return 0;
      if (isNaN(aTime)) return 1;
      if (isNaN(bTime)) return -1;
      return dueDateSort === "asc" ? aTime - bTime : bTime - aTime;
    });
  }, [tasks, statusFilter, dueDateSort]);

  return (
    <div className={classes.root}>
      <h1 style={{ marginBottom: 8, fontSize: 28, textAlign: "left" }}>Task Management</h1>
      <div className={classes.addTask}>
        <TaskForm />
      </div>
      <div className={classes.content}>
        <div className={classes.filterBar}>
          <span className={classes.filterLabel}>Filter by status:</span>
          <select
            className={classes.filterSelect}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as TaskStatus | "all")}
          >
            <option value="all">All</option>
            <option value={TaskStatusEnum.Pending}>{TaskStatusLabels[TaskStatusEnum.Pending]}</option>
            <option value={TaskStatusEnum.InProgress}>{TaskStatusLabels[TaskStatusEnum.InProgress]}</option>
            <option value={TaskStatusEnum.Completed}>{TaskStatusLabels[TaskStatusEnum.Completed]}</option>
          </select>
          <span className={classes.sortLabel}>Sort by due date:</span>
          <select
            className={classes.sortSelect}
            value={dueDateSort}
            onChange={e => setDueDateSort(e.target.value as DueDateSortOrder)}
          >
            <option value="asc">Earliest first</option>
            <option value="desc">Latest first</option>
          </select>
        </div>
        <h2 className={classes.tasksHeader}>Tasks</h2>
        <div className={classes.tasksGrid}>
          {filteredSortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {filteredSortedTasks.length === 0 && (
            <div className={classes.noTasks}>No tasks found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;