import TaskItem from './TaskItem'

export default function TaskList({ tasks, onDelete, onToggle, onEdit, onReorder, selectedId, onSelect }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">Nothing here. Add a task above.</div>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          onReorder={onReorder}
          isSelected={selectedId === task.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
