import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { Task, Priority, Status } from '../types';

interface StatCard {
  label: string;
  value: number;
  color: string;
  bg: string;
  icon: string;
  description: string;
}

function isOverdue(task: Task): boolean {
  if (task.status === 'done') return false;
  const due = new Date(task.dueDate);
  due.setHours(23, 59, 59, 999);
  return due < new Date();
}

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
const priorityColors: Record<Priority, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};
const statusColors: Record<Status, string> = {
  'todo': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  'done': 'bg-green-100 text-green-700',
};

export default function Dashboard() {
  const { tasks } = useTaskContext();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const pending = tasks.filter((t) => t.status !== 'done').length;
    const overdue = tasks.filter(isOverdue).length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  const cards: StatCard[] = [
    {
      label: 'Total Tasks',
      value: stats.total,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200',
      icon: '📋',
      description: 'All tasks in the system',
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'text-green-600',
      bg: 'bg-green-50 border-green-200',
      icon: '✅',
      description: 'Tasks marked as done',
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
      icon: '⏳',
      description: 'Tasks not yet complete',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200',
      icon: '🚨',
      description: 'Past due date, not done',
    },
  ];

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [tasks]
  );

  const urgentTasks = useMemo(
    () =>
      tasks
        .filter((t) => t.status !== 'done')
        .sort((a, b) => {
          const pa = priorityOrder[a.priority];
          const pb = priorityOrder[b.priority];
          if (pa !== pb) return pa - pb;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        })
        .slice(0, 5),
    [tasks]
  );

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your tasks.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border p-6 shadow-sm ${card.bg} flex items-start gap-4`}
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className={`text-4xl font-bold mt-1 ${card.color}`}>{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Overall Progress</h2>
          <span className="text-sm font-medium text-gray-500">{completionRate}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {stats.completed} of {stats.total} tasks completed
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
            <Link to="/tasks" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          {recentTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No tasks yet</p>
          ) : (
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <span className="mt-0.5 text-lg">
                    {task.status === 'done' ? '✅' : task.status === 'in-progress' ? '🔄' : '📌'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400">Due {task.dueDate}</p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Urgent Tasks</h2>
            <Link to="/tasks" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View all →
            </Link>
          </div>
          {urgentTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No pending tasks</p>
          ) : (
            <ul className="space-y-3">
              {urgentTasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColors[task.status]}`}
                  >
                    {task.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                    <p className={`text-xs ${isOverdue(task) ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                      {isOverdue(task) ? '⚠️ Overdue · ' : ''}Due {task.dueDate}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
