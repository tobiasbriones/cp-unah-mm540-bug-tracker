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
import TeamSelect from './TeamSelect';
import TeamInfo from './TeamInfo';
import { TeamRepository } from '../../model/team/team.repository.mjs';
import TeamPane from './TeamPane';

class Dev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedTeamCode: -1
    };
    this.repository = new TeamRepository();
  }

  render() {
    return (
      <div className="col col-lg-8 col-xxl-6 p-4 m-auto bg-white">
        <div className="row">
          <div className="col align-self-center">
            <TeamSelect
              values={ this.state.teams }
              onChange={ this.onTeamChange.bind(this) }
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <TeamInfo show={ this.state.selectedTeamCode === -1 } />
            <TeamPane
              teamCode={ this.state.selectedTeamCode }
            />
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await this.loadTeams();
  }

  async onTeamChange(teamCode) {
    this.setState({ selectedTeamCode: teamCode });
  }

  async loadTeams() {
    try {
      const teams = await this.repository.getAll();

      this.setState({ teams: teams });
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default Dev;
