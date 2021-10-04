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
    const teamResult = await TeamModel.findOne({ code: teamCode }, '_id, projects')
                                      .populate('projects');
    const projectResult = await ProjectModel.findOne({ code: projectCode }, '_id, teams')
                                            .populate('teams');
    const _teamId = teamResult._id;
    const _projectId = projectResult._id;
    const existingTeamProjects = teamResult.projects;
    const existingProjectTeams = projectResult.teams;

    if (existingTeamProjects.includes(_projectId)) {
      return;
    }
    await TeamModel.updateOne(
      { code: teamCode },
      { projects: [...existingTeamProjects, _projectId] }
    );
    await ProjectModel.updateOne(
      { code: projectCode },
      { teams: [...existingProjectTeams, _teamId] }
    );
  }

  async readProjects(teamCode) {
    const result = await TeamModel.findOne({ code: teamCode }, 'projects').populate('projects');
    return result.projects;
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
