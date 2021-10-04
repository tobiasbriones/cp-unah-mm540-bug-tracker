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
import { TeamRepository } from '../../model/team/team.repository.mjs';
import { BugRepository } from '../../model/bug/bug.repository.mjs';

class TeamPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      bugs: []
    };
    this.repository = new TeamRepository();
    this.bugRepository = new BugRepository();
  }

  get show() {
    return this.props.teamCode >= 1;
  }

  render() {
    if (!this.show) {
      return <div />;
    }
    return (
      <div>
        <TeamProjects
          values={ this.state.projects }
        />
        <TeamBugs
          values={ this.state.bugs }
          onChange={ this.onBugStatusChange.bind(this) }
        />
      </div>
    );
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.teamCode !== prevProps.teamCode) {
      await this.load();
    }
  }

  async onBugStatusChange(state) {
    try {
      if (state.checked) {
        await this.bugRepository.setFinished(state.bugCode);
      }
      else {
        await this.bugRepository.setAssigned(state.bugCode);
      }
      await this.loadBugs(this.props.teamCode);
    }
    catch (e) {
      console.log(e);
    }
  }

  async load() {
    const teamCode = this.props.teamCode;

    if (teamCode <= 0) {
      this.setState({ projects: [], bugs: [] });
    }
    else {
      await this.loadProjects(teamCode);
      await this.loadBugs(teamCode);
    }
  }

  async loadProjects(teamCode) {
    try {
      const projects = await this.repository.getAllProjects(teamCode);

      this.setState({ projects: projects });
    }
    catch (e) {
      console.log(e);
    }
  }

  async loadBugs(teamCode) {
    try {
      const bugs = await this.repository.getAllBugs(teamCode);

      this.setState({ bugs: bugs });
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default TeamPane;

TeamPane.defaultProps = {
  teamCode: -1
};
