import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { TaskStatusEnum, type Task } from "../../types/tasks.types";
import { useTaskContext } from "../../contexts/TaskContextProvider";

const useStyles = createUseStyles({
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#242424",
    borderRadius: 10,
    padding: 32,
    minWidth: 340,
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 95 + "%",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 16,
    background: "transparent",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    color: "#888",
    "&:hover": {
      color: "#d32f2f",
    },
  },
  input: {
    width: "100%",
    padding: "8px 8px",
    borderRadius: 5,
    boxSizing: "border-box",
    border: "1px solid #ccc",
    fontSize: 16,
    marginBottom: 4,
    "&:focus": {
      borderColor: "#1976d2",
      outline: "none",
    },
  },
  label: {
    fontWeight: 500,
    marginBottom: 2,
    fontSize: 15,
    color: "#222",
  },
  error: {
    color: "#d32f2f",
    fontSize: 12,
    marginBottom: 4,
  },
  addBtn: {
    marginTop: 8,
    padding: "10px 0",
    border: "none",
    borderRadius: 5,
    background: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "background 0.2s",
    "&:hover": {
      background: "#1565c0",
    },
  },
  openBtn: {
    width: "100px",
    padding: "5px 10px",
    border: "none",
    borderRadius: 5,
    background: "#1976d2",
    color: "#fff",
    fontWeight: 600,
    fontSize: 12,
    cursor: "pointer",
    transition: "background 0.2s",
    "&:hover": {
      background: "#1565c0",
    },
  },
});

const TaskForm = ({ task, edit }: { task?: Task, edit?: boolean }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const { addOrUpdateTask } = useTaskContext();

  const [taskForm, setTaskForm] = useState<Task>(task || {
    id: "",
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setTaskForm(task || {
      id: "",
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
    });
  }, [task]);

  // Validate only a single field by name and value
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "title":
        if (!value.trim()) {
          return "Title is required";
        }
        break;
      case "status":
        if (!value) {
          return "Status is required";
        }
        break;
      case "dueDate":
        if (!value) {
          return "Due date is required";
        } else if (isNaN(Date.parse(value))) {
          return "Due date is invalid";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  // Validate all fields (for submit)
  const validateAll = (form: Task) => {
    const newErrors: { [key: string]: string } = {};
    const titleError = validateField("title", form.title);
    if (titleError) newErrors.title = titleError;
    const descriptionError = validateField("description", form.description);
    if (descriptionError) newErrors.description = descriptionError;
    const dueDateError = validateField("dueDate", form.dueDate);
    if (dueDateError) newErrors.dueDate = dueDateError;
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setTaskForm(prev => ({ ...prev, [name]: value }));

    // Validate only the changed field
    const errorMsg = validateField(name, value);
    setErrors(prevErrors => {
      if (errorMsg) {
        return { ...prevErrors, [name]: errorMsg };
      } else {
        // Remove error for this field if valid
        const { [name]: removed, ...rest } = prevErrors;
        return rest;
      }
    });
  };

  const handleAddTask = () => {
    const validationErrors = validateAll(taskForm);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    addOrUpdateTask(taskForm);
    setTaskForm({
      id: "",
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
    });
    setErrors({});
    setShowModal(false);
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setErrors({});
  };

  return (
    <>
      <button className={classes.openBtn} onClick={handleOpen}>{edit ? "Edit Task" : "Add Task"}</button>
      {showModal && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <button className={classes.closeBtn} onClick={handleClose} aria-label="Close">&times;</button>
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>{edit ? "Edit Task" : "Add Task"}</h2>
            <div>
              <div className={classes.label}>Title</div>
              <input
                className={classes.input}
                type="text"
                placeholder="Title"
                onChange={handleChange}
                name="title"
                value={taskForm.title}
                autoFocus
                required
              />
              {errors.title && (
                <div className={classes.error}>{errors.title}</div>
              )}
            </div>
            <div>
              <div className={classes.label}>Description</div>
              <input
                className={classes.input}
                type="text"
                placeholder="Description"
                onChange={handleChange}
                name="description"
                value={taskForm.description}
              />
              {errors.description && (
                <div className={classes.error}>{errors.description}</div>
              )}
            </div>
            <div>
              <div className={classes.label}>Status</div>
              <select
                className={classes.input}
                name="status"
                value={taskForm.status || ""}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value={TaskStatusEnum.Pending}>Pending</option>
                <option value={TaskStatusEnum.InProgress}>In Progress</option>
                <option value={TaskStatusEnum.Completed}>Completed</option>
              </select>
              {errors.status && (
                <div className={classes.error}>{errors.status}</div>
              )}
            </div>
            <div>
              <div className={classes.label}>Due Date</div>
              <input
                className={classes.input}
                type="date"
                placeholder="Due Date"
                onChange={handleChange}
                name="dueDate"
                value={taskForm.dueDate}
                required
              />
              {errors.dueDate && (
                <div className={classes.error}>{errors.dueDate}</div>
              )}
            </div>
            <button className={classes.addBtn} disabled={Object.keys(errors).length > 0} onClick={handleAddTask}>{edit ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskForm;