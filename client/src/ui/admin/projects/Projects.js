/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
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
