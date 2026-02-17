export default function Header({ filter, setFilter, onClear, taskCount }) {
  const filters = ['all', 'active', 'completed']

  return (
    <header className="header">
      <h1>Things I Wanna Do Today</h1>
      <div className="header-meta">
        <div className="filter-group">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {taskCount > 0 && (
          <button className="clear-btn" onClick={onClear}>
            Reset All
          </button>
        )}
      </div>
    </header>
  )
}
