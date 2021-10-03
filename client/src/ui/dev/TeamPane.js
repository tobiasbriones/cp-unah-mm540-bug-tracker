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
import TeamProjects from './TeamProjects';
import TeamBugs from './TeamBugs';

class TeamPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.show) {
      return <div />;
    }
    return (
      <div>
        <TeamProjects
          values={ this.props.projects }
        />
        <TeamBugs
          values={ this.props.bugs }
        />
      </div>
    );
  }
}

export default TeamPane;

TeamPane.defaultProps = {
  projects: [],
  bugs: []
};
