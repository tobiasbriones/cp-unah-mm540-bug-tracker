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
import ProjectBugsTable from './ProjectBugsTable';
import ProjectSelect from './ProjectSelect';
import BugTeams from './BugTeams';
import { ProjectRepository } from '../../../model/project/project.repository.mjs';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: '',
      projects: [],
      selectedProjectCode: -1,
      selectedProjectBugs: [],
      selectedProjectTeams: []
    };
    this.repository = new ProjectRepository();
  }

  get displayClass() {
    return this.props.visiblePage === 'projects' ? '' : 'd-none';
  }

  render() {
    return (
      <div className={ `row page ${ this.displayClass }` }>
        <div className="d-xl-flex col-xxl-9 m-auto">
          <div className="row">
            <div className="col align-self-center">
              <ProjectSelect
                items={ this.state.projects }
                onChange={ this.onProjectChange.bind(this) }
              />
            </div>
          </div>
          <div className="row">
            <ProjectBugsTable
              projectCode={ this.state.selectedProjectCode }
              items={ this.state.selectedProjectBugs }
            />
            <BugTeams
              projectCode={ this.state.selectedProjectCode }
              items={ this.state.selectedProjectTeams }
            />
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    await this.loadProjects();
  }

  async onProjectChange(projectCode) {
    this.setState({ selectedProjectCode: projectCode });

    if (projectCode === -1) {
      this.setState({ selectedProjectBugs: [], selectedProjectTeams: [] });
    }
    else {
      await this.loadProjectBugs(projectCode);
      await this.loadProjectTeams(projectCode);
    }
  }

  async loadProjects() {
    try {
      const projects = await this.repository.getAll();

      this.setState({ projects: projects });
    }
    catch (e) {
      console.log(e);
    }
  }

  async loadProjectBugs(projectCode) {
    try {
      const bugs = await this.repository.getAllBugs(projectCode);

      this.setState({ selectedProjectBugs: bugs });
    }
    catch (e) {
      console.log(e);
    }
  }

  async loadProjectTeams(projectCode) {
    try {
      const teams = await this.repository.getAllTeams(projectCode);

      this.setState({ selectedProjectTeams: teams });
    }
    catch (e) {
      console.log(e);
    }
  }
}

export default Projects;
