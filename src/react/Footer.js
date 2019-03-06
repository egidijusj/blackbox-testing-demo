import React from "react"
import classnames from "classnames"

const filters = ["All", "Active", "Completed"]

export default ({ remainingItems, activeFilter, onFilterChange }) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{remainingItems}</strong>
      <span> </span>
      <span>items</span>
      <span> left</span>
    </span>
    <ul className="filters">
      {filters.map(filter => (
        <span key={filter}>
          <li>
            <span
              className={classnames({
                selected: activeFilter === filter,
                [`filter-${filter}`]: true,
                btn: true
              })}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </span>
          </li>
          <span> </span>
        </span>
      ))}
    </ul>
  </footer>
)
