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

import { TeamModel } from './team.model.mjs';
import { TeamProjectModel } from './team-project.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';

export class TeamsService {
  constructor() {}

  async createTeam(devTeam) {
    await TeamModel.create(devTeam);
  }

  async readAllTeams() {
    return TeamModel.find();
  }

  async readTeam(id) {
    const devTeam = await TeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error(`Team ${ id } not found`);
    }
    return devTeam;
  }

  async updateTeam(id, devTeam) {
    await TeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteTeam(id) {
    await TeamModel.deleteOne({ code: id });
  }

  async assignProject(teamCode, projectCode) {
    await TeamProjectModel.create({ teamCode: teamCode, projectCode: projectCode });
  }

  async readProjects(teamCode) {
    const projectCodes = await TeamProjectModel.find({ teamCode: teamCode });
    const projects = [];

    for (const code of projectCodes) {
      const project = await ProjectModel.findOne({ code: code.projectCode });
      projects.push(project);
    }
    return projects;
  }

  async assignBug(teamCode, bugCode) {
    const teamIdResult = await TeamModel.findOne({ code: teamCode }, '_id');
    const _teamId = teamIdResult._id;

    await BugModel.updateOne({ code: bugCode }, { team: _teamId });
  }

  async readBugs(teamCode) {
    const teamIdResult = await TeamModel.findOne({ code: teamCode }, '_id');
    const _teamId = teamIdResult._id;
    return BugModel.find({ team: _teamId });
  }
}
