import React from 'react';
import './todoStyle.css';

const FilterToolbar = ({ setFilterSelection }) => {
    // קומפוננטה שמציגה משימה אחת, מקבלת את המשימה ופונקציית מחיקה כ-props.

  return (
    <div class="filter-buttons">
        <button class="filter-button all" onClick={() => setFilterSelection("all")}>All</button>
        <button class="filter-button active" onClick={() => setFilterSelection("active")}>Active</button>
        <button class="filter-button completed"onClick={() => setFilterSelection("completed")}>Completed</button>
</div>

  ); 
  
}

export default FilterToolbar