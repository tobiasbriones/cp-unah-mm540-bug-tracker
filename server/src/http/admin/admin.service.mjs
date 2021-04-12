/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { DevTeamModel } from '../dev-team/dev-team.model.mjs';
import { SoftwareProjectModel } from './software-project.model.mjs';
import { UserModel } from '../users/user.model.mjs';

export class AdminService {
  constructor() {
  }

  async assignBug(bugId, devTeamId) {

  }

  async readAllBugStats() {
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
