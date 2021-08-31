/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
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
