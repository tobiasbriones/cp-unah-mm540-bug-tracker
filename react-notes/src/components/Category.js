/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Category.css';

function Category(props) {
  const newItem = value => {
    return (
      <option key={value} value={value}>
        {value}
      </option>
    );
  };
  return (
    <div className="Category">
      <select
        className="form-select"
        onChange={e => props.onUpdateCategory(e.target.value)}
      >
        {props.list.map(newItem)}
      </select>
    </div>
  );
}

export default Category;
