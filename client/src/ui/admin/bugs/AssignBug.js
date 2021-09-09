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
import { BugRepository } from '../../../model/bug/bug.repository.mjs';
import { TeamRepository } from '../../../model/team/team.repository.mjs';

class AssignBug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: [],
      teams: [],
      selectedBugCode: -1,
      selectedTeamCode: -1
    };
    this.bugRepository = new BugRepository();
    this.teamRepository = new TeamRepository();
  }

  render() {
    const getBugOptionComponent = bug =>
      <option value={ bug.code } key={ bug.code }>
        { bug.description }
      </option>;
    const getTeamOptionComponent = team =>
      <option value={ team.code } key={ team.code }>
        { team.name }
      </option>;

    return (
      <div className="col-xl-4 align-self-center">
        <form className="row g-3 my-4 mx-4 my-xl-0" onSubmit={ this.onSubmit.bind(this) }>
          <p className="text-center font-weight-bold">
            <strong>Asignar bug a desarrollador</strong>
          </p>
          <div>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Select bug"
              defaultValue="-1"
              onChange={ this.onBugChange.bind(this) }
            >
              <option value="-1">Seleccionar bug</option>
              { this.state.bugs.map(getBugOptionComponent) }
            </select>
          </div>
          <div>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Select developer"
              defaultValue="-1"
              onChange={ this.onTeamChange.bind(this) }
            >
              <option value="-1">Seleccionar desarrollador</option>
              { this.state.teams.map(getTeamOptionComponent) }
            </select>
          </div>
          <div>
            <button className="btn btn-primary mb-3 w-100" type="submit">
              Asignar bug
            </button>
          </div>
        </form>
      </div>
    );
  }

  async componentDidMount() {
    await this.loadBugs();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.onAssignBug) {
      this.props.onAssignBug(this.state.selectedBugCode, this.state.selectedTeamCode);
    }
  }

  async onBugChange(e) {
    this.setState({ selectedBugCode: e.target.value });
    await this.loadTeams();
  }

  onTeamChange(e) {
    this.setState({ selectedTeamCode: e.target.value });
  }

  async loadBugs() {
    try {
      const bugs = await this.bugRepository.getAll();
      this.setState({ bugs: bugs });
    }
    catch (e) {
      console.log(e);
    }
  }

  async loadTeams() {
    // TODO: should laod teams who are not assigned the selected bug
    try {
      const teams = await this.teamRepository.getAll();
      this.setState({ teams: teams });
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default AssignBug;
