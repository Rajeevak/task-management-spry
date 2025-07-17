import { TaskStatusLabels, type TaskStatus } from "../../types/tasks.types";

const TaskStatusBadge = ({ status }: { status: TaskStatus }) => (
    <div
      style={{
        display: "inline-block",
        background: status === "pending" ? "#fff8e1" : status === "inprogress" ? "#e3f2fd" : "#e8f5e9",
        color: status === "pending" ? "#fbc02d" : status === "inprogress" ? "#1976d2" : "#388e3c",
        borderRadius: "999px",
        padding: "2px 12px",
        fontSize: 13,
        fontWeight: 500,
        marginBottom: 12,
      }}
    >
      {TaskStatusLabels[status]}
    </div>
  );

  export default TaskStatusBadge;