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
import AssignBug from './AssignBug';
import Stats from './Stats';

class Bugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.bugRepository = new BugRepository();
    this.teamRepository = new TeamRepository();
  }

  get displayClass() {
    return this.props.visiblePage === 'bugs' ? '' : 'd-none';
  }

  render() {
    return (
      <div className={ `row page ${ this.displayClass }` }>
        <div className="d-xl-flex col-xxl-9 m-auto">
          <Stats />
          <AssignBug onAssignBug={ this.onAssignBug.bind(this) } />
        </div>
      </div>
    );
  }

  async onAssignBug(bugCode, teamCode) {
    try {
      await this.teamRepository.assignBug(teamCode, bugCode);
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default Bugs;
