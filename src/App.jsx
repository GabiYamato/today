import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

const STORAGE_KEY = 'tiwdt-tasks'

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Backspace' && selectedId) {
        setTasks((prev) => prev.filter((t) => t.id !== selectedId))
        setSelectedId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedId])

  const addTask = useCallback((title) => {
    if (!title.trim()) return
    setTasks((prev) => [
      ...prev,
      { id: generateId(), title: title.trim(), completed: false },
    ])
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  const editTask = useCallback((id, newTitle) => {
    if (!newTitle.trim()) return
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t))
    )
  }, [])

  const reorderTasks = useCallback((fromIndex, toIndex) => {
    setTasks((prev) => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return updated
    })
  }, [])

  const clearAll = useCallback(() => {
    setTasks([])
    setSelectedId(null)
  }, [])

  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <div className="app">
      <div className="container">
        <Header filter={filter} setFilter={setFilter} onClear={clearAll} taskCount={tasks.length} />
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={filtered}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
          onReorder={reorderTasks}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  )
}
