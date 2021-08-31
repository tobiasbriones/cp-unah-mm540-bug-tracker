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

import './Projects.css';
import React from 'react';
import { ProjectRepository } from '../../../model/project/project.repository.mjs';
import { TeamRepository } from '../../../model/team/team.repository.mjs';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.projectRepository = new ProjectRepository();
    this.teamRepository = new TeamRepository();
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Projects</div>
    );
  }

  onPageShowed() {

  }
}

export default Projects;
