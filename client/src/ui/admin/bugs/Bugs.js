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

import './Bugs.css';
import React from 'react';
import { BugRepository } from '../../../model/bug/bug.repository.mjs';
import { TeamRepository } from '../../../model/team/team.repository.mjs';

class Bugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.bugRepository = new BugRepository();
    this.devTeamRepository = new TeamRepository();
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Bugs</div>
    );
  }

  onPageShowed() {

  }
}

export default Bugs;
