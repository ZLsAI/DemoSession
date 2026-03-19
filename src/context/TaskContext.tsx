import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Task, Priority, Status } from '../types';

interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

const STORAGE_KEY = 'task-manager-tasks';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function today(): string {
  return new Date().toISOString();
}

const SAMPLE_TASKS: Task[] = [
  {
    id: generateId(),
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the redesigned landing page',
    priority: 'high' as Priority,
    status: 'in-progress' as Status,
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
  {
    id: generateId(),
    title: 'Fix authentication bug',
    description: 'Users are getting logged out unexpectedly on mobile devices',
    priority: 'high' as Priority,
    status: 'todo' as Status,
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
  {
    id: generateId(),
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with request/response examples',
    priority: 'medium' as Priority,
    status: 'todo' as Status,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
  {
    id: generateId(),
    title: 'Update dependencies',
    description: 'Upgrade all npm packages to latest stable versions',
    priority: 'low' as Priority,
    status: 'done' as Status,
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
  {
    id: generateId(),
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'medium' as Priority,
    status: 'in-progress' as Status,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
  {
    id: generateId(),
    title: 'Code review for PR #42',
    description: 'Review and provide feedback on the new feature branch',
    priority: 'medium' as Priority,
    status: 'todo' as Status,
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: today(),
    updatedAt: today(),
  },
];

function loadFromStorage(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Task[];
    }
  } catch {
    // ignore
  }
  return SAMPLE_TASKS;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = today();
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    []
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, ...updates, updatedAt: today() } : t
        )
      );
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext must be used within TaskProvider');
  return ctx;
}
