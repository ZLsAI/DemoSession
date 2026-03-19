export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string; // ISO date string YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export type SortField = 'title' | 'priority' | 'status' | 'dueDate' | 'createdAt';
export type SortDirection = 'asc' | 'desc';
