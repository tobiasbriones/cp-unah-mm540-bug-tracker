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

import React from 'react';

class ProjectSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mapItem = item =>
      <option value={ item.code } key={ item.name }>
        { item.name }
      </option>;
    return (
      <div className="row g-3 my-4 mx-4 my-xl-0">
        <p className="text-center font-weight-bold">
          <strong>Proyecto:</strong>
        </p>
        <div>
          <select
            className="form-select form-select-lg mb-3"
            aria-label="Select project"
            onChange={ this.onChange.bind(this) }
          >
            <option value="-1">Seleccionar proyecto</option>
            { this.props.items.map(mapItem) }
          </select>
        </div>
      </div>
    );
  }

  onChange(e) {
    const projectCode = e.target.value;

    if (this.props.onChange) {
      this.props.onChange(parseInt(projectCode));
    }
  }
}

export default ProjectSelect;

ProjectSelect.defaultProps = {
  items: []
};
