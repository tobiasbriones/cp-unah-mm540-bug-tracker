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

class TeamBugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mapBug = bug => (
      <label className="list-group-item  list-group-item-primary" key={ bug.code }>
        <input
          className="form-check-input me-1"
          type="checkbox"
          value={ bug.code }
          checked={ bug.state === 'Finished' }
          onChange={ this.onChange.bind(this) }
        />
        #{ bug.code } - { bug.description }
      </label>
    );

    return (
      <div>
        <p className="text-center font-weight-bold">
          <strong>Bugs asignados ({ this.props.values.length })</strong>
        </p>
        <div className="list-group">
          { this.props.values.map(mapBug) }
        </div>
      </div>
    );
  }

  onChange(e) {
    if (this.props.onChange) {
      const value = { bugCode: e.target.value, checked: e.target.checked };

      this.props.onChange(value);
    }
  }
}

export default TeamBugs;

TeamBugs.defaultProps = {
  values: []
};
