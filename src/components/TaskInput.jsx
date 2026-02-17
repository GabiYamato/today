import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAdd(value)
      setValue('')
    }
  }

  const handleAdd = () => {
    onAdd(value)
    setValue('')
  }

  return (
    <div className="task-input-wrapper">
      <input
        type="text"
        placeholder="What do you want to do today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button className="add-btn" onClick={handleAdd}>
        <Plus size={16} />
        Add
      </button>
    </div>
  )
}
