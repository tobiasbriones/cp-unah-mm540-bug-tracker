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

class BugTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const size = this.props.items.length;
    const mapItem = item =>
      <li key={ item.code } className="list-group-item">{ item.name }</li>;

    if (this.props.projectCode === -1) {
      return <div />;
    }
    return (
      <div className="col-0 col-xl-4 mt-5 mt-xl-0 align-self-center">
        <p className="text-center font-weight-bold">
          <strong>Desarrolladores asignados ({ size })</strong>
        </p>
        <ul className="list-group">
          { this.props.items.map(mapItem) }
        </ul>
      </div>
    );
  }
}

export default BugTeams;

BugTeams.defaultProps = {
  items: []
};
