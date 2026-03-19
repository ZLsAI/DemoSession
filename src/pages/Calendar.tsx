import { useState, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import type { Task, Priority } from '../types';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const priorityColors: Record<Priority, string> = {
  high: 'bg-red-500 text-white',
  medium: 'bg-yellow-400 text-white',
  low: 'bg-green-500 text-white',
};

function getMonthDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];

  // Padding before first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }
  // Fill month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  // Pad to complete last week
  while (days.length % 7 !== 0) {
    days.push(null);
  }
  return days;
}

function dateKey(d: Date): string {
  return d.toISOString().split('T')[0];
}

interface DayPopoverProps {
  date: Date;
  tasks: Task[];
  onClose: () => void;
}

function DayPopover({ date, tasks, onClose }: DayPopoverProps) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks due this day.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li key={t.id} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">{t.title}</p>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[t.priority]}`}>
                    {t.priority}
                  </span>
                </div>
                {t.description && (
                  <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1 capitalize">Status: {t.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Calendar() {
  const { tasks } = useTaskContext();
  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const task of tasks) {
      if (!task.dueDate) continue;
      const key = task.dueDate;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(task);
    }
    return map;
  }, [tasks]);

  const days = useMemo(() => getMonthDays(viewYear, viewMonth), [viewYear, viewMonth]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const todayKey = dateKey(today);
  const selectedTasks = selectedDay ? (tasksByDate.get(dateKey(selectedDay)) ?? []) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 mt-1">Tasks by due date</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-indigo-50">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-700 font-bold text-lg transition"
          >
            ←
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">{monthLabel}</h2>
            <button
              onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); }}
              className="text-xs text-indigo-600 hover:text-indigo-800 mt-0.5"
            >
              Today
            </button>
          </div>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-700 font-bold text-lg transition"
          >
            →
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-500 py-3 uppercase tracking-wide"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="min-h-[100px] bg-gray-50/50 border-b border-r border-gray-100" />;
            }
            const key = dateKey(day);
            const dayTasks = tasksByDate.get(key) ?? [];
            const isToday = key === todayKey;
            const isSelected = selectedDay ? dateKey(selectedDay) === key : false;

            return (
              <div
                key={key}
                onClick={() => setSelectedDay(day)}
                className={`min-h-[100px] border-b border-r border-gray-100 p-2 cursor-pointer transition-colors
                  ${isToday ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}
                  ${isSelected ? 'ring-2 ring-inset ring-indigo-400' : ''}
                `}
              >
                <div className="flex justify-end mb-1">
                  <span
                    className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full
                      ${isToday ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}
                  >
                    {day.getDate()}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs px-1.5 py-0.5 rounded truncate font-medium ${priorityColors[task.priority]}`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500 pl-1">+{dayTasks.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
          <span className="font-medium">Priority:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-500 inline-block" /> High
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green-500 inline-block" /> Low
          </span>
        </div>
      </div>

      {/* Day popover */}
      {selectedDay && (
        <DayPopover
          date={selectedDay}
          tasks={selectedTasks}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}
