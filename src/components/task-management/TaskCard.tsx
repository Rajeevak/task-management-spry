import { createUseStyles } from "react-jss";
import TaskForm from "./TaskForm";
import { useTaskContext } from "../../contexts/TaskContextProvider";
import { type Task } from "../../types/tasks.types";
import TaskStatusBadge from "./TaskStatusBadge";

const useStyles = createUseStyles({
  card: {
    border: "1px solid #ddd",
    height: "180px",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  titleDesc: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1,
    marginBottom: 4,
  },
  title: {
    margin: [0, 0, 4, 0],
    fontSize: 20,
    fontWeight: 600,
    color: "#222",
    textAlign: "left",
  },
  description: {
    margin: [0, 0, 4, 0],
    fontSize: 16,
    color: "#555",
    textAlign: "left",
  },
  dueDate: {
    margin: [0, 0, 12, 0],
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  buttonRow: {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    marginTop: "auto",
  },
  button: {
    width: "100px",
    padding: "5px 10px",
    border: "none",
    borderRadius: 5,
    background: "#d32f2f",
    color: "#fff",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
    marginBottom: 0,
    transition: "background 0.2s",
    "&:hover": {
      background: "#1565c0",
    },
  },
  statusBadgeWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

const TaskCard = ({ task }: { task: Task }) => {
  const classes = useStyles();
  const { setTasks } = useTaskContext();
  const handleDelete = (id: string) => {
    const tasksJson = localStorage.getItem("tasks");
    let tasks: Task[] = [];
    if (tasksJson) {
      tasks = JSON.parse(tasksJson);
    }
    const updatedTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  return (
    <div className={classes.card}>
      <div className={classes.statusBadgeWrapper}>
        <TaskStatusBadge status={task.status} />
      </div>
      <div className={classes.titleDesc}>
        <h3 className={classes.title}>{task.title}</h3>
        <p className={classes.dueDate}>{task.dueDate}</p>
        <h4 className={classes.description}>{task.description}</h4>
      </div>
      <div className={classes.buttonRow}>
        <TaskForm task={task} edit={true}/>
        <button className={classes.button} onClick={() => handleDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;