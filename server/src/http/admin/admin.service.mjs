/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { DevTeamModel } from './dev-team.model.mjs';
import { SoftwareProjectModel } from './software-project.model.mjs';
import { UserModel } from './user.model.mjs';

export class AdminService {
  constructor() {
  }

  async assignBug(bugId, devTeamId) {

  }

  async readAllBugStats() {
  }

  async createDevTeam(devTeam) {
    await DevTeamModel.create(devTeam);
  }

  async readAllDevTeams() {
    return DevTeamModel.find();
  }

  async readDevTeam(id) {
    const devTeam = await DevTeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error('DevTeam not found');
    }
    return devTeam;
  }

  async updateDevTeam(id, devTeam) {
    await DevTeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteDevTeam(id) {
    await DevTeamModel.deleteOne({ code: id });
  }

  async createProject(project) {
    await SoftwareProjectModel.create(project);
  }

  async readAllProjects() {
    return SoftwareProjectModel.find();
  }

  async readProject(id) {
    const project = await SoftwareProjectModel.findOne({ code: id });

    if (!project) {
      throw new Error('Software Project not found');
    }
    return project;
  }

  async updateProject(id, project) {
    await SoftwareProjectModel.updateOne({ code: id }, project);
  }

  async deleteProject(id) {
    await SoftwareProjectModel.deleteOne({ code: id });
  }
}
