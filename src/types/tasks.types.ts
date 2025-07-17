

export const TaskStatusEnum = {
  Pending: "pending",
  InProgress: "inprogress",
  Completed: "completed"
} as const;

export type TaskStatus = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];

export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatusEnum.Pending]: "Pending",
  [TaskStatusEnum.InProgress]: "In Progress",
  [TaskStatusEnum.Completed]: "Completed"
};

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}