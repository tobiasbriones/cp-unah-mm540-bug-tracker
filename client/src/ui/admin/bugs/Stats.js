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
import Chart from './Chart';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.bugRepository = new BugRepository();
    this.teamRepository = new TeamRepository();
  }

  render() {
    return (
      <div className="col-xl-8 mx-4 p-4 card">
        <p className="text-center font-weight-bold">
          <strong>Estadísticas de bugs</strong>
        </p>
        <div className="col-sm-8 col-md-6 m-auto card-body">
          <Chart />
        </div>
      </div>
    );
  }
}

export default Stats;
