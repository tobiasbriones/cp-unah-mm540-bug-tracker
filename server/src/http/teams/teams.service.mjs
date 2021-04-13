/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { TeamModel } from './team.model.mjs';
import { TeamProjectModel } from './team-project.model.mjs';
import { ProjectBugModel } from '../projects/project-bug.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';

export class TeamsService {
  constructor() {}

  async createDevTeam(devTeam) {
    await TeamModel.create(devTeam);
  }

  async readAllDevTeams() {
    return TeamModel.find();
  }

  async readDevTeam(id) {
    const devTeam = await TeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error(`Team ${ id } not found`);
    }
    return devTeam;
  }

  async updateDevTeam(id, devTeam) {
    await TeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteDevTeam(id) {
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
}
