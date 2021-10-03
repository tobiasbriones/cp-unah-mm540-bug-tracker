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

class TeamSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mapTeam = team =>
      <option value={ team.code } key={ team.code }>
        { team.name }
      </option>;

    return (
      <div className="row g-3 my-4 mx-4 my-xl-0">
        <p className="text-center font-weight-bold">
          <strong>Seleccionar equipo de desarrollo</strong>
        </p>
        <div>
          <select
            className="form-select form-select-lg mb-3"
            aria-label="Select bug"
            onChange={ this.onChange.bind(this) }
          >
            <option value="-1">Seleccionar equipo</option>
            { this.props.values.map(mapTeam) }
          </select>
        </div>
      </div>
    );
  }

  onChange(e) {
    if(this.props.onChange) {
      const value = parseInt(e.target.value);

      this.props.onChange(value);
    }
  }
}

export default TeamSelect;

TeamSelect.defaultProps = {
  values: []
};
