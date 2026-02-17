import { useRef, useState } from 'react'
import { CheckCheck, Trash2, GripVertical } from 'lucide-react'

export default function TaskItem({ task, index, onDelete, onToggle, onEdit, onReorder, isSelected, onSelect }) {
  const titleRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleTitleBlur = (e) => {
    onEdit(task.id, e.target.innerText)
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      titleRef.current.blur()
    }
    e.stopPropagation()
  }

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', String(index))
    e.dataTransfer.effectAllowed = 'move'
    setDragging(true)
  }

  const handleDragEnd = () => {
    setDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    if (fromIndex !== index) {
      onReorder(fromIndex, index)
    }
  }

  return (
    <div
      className={[
        'task-item',
        task.completed ? 'completed' : '',
        isSelected ? 'selected' : '',
        dragging ? 'dragging' : '',
        dragOver ? 'drag-over' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => onSelect(task.id)}
    >
      <span className="task-icon">
        <GripVertical size={16} />
      </span>

      <button
        className="toggle-btn"
        onClick={(e) => {
          e.stopPropagation()
          onToggle(task.id)
        }}
        title={task.completed ? 'Mark active' : 'Mark complete'}
      >
        {task.completed && <CheckCheck size={16} />}
      </button>

      <span
        ref={titleRef}
        className="task-title"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleTitleBlur}
        onKeyDown={handleTitleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {task.title}
      </span>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(task.id)
        }}
        title="Delete task"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}
