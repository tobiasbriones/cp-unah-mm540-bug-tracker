/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { DevTeamModel } from '../dev-team/dev-team.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';
import { UserModel } from '../users/user.model.mjs';

export class AdminService {
  constructor() {
  }

  async assignBug(bugId, devTeamId) {

  }

  async readAllBugStats() {
  }

  async createProject(project) {
    await ProjectModel.create(project);
  }

  async readAllProjects() {
    return ProjectModel.find();
  }

  async readProject(id) {
    const project = await ProjectModel.findOne({ code: id });

    if (!project) {
      throw new Error('Software Project not found');
    }
    return project;
  }

  async updateProject(id, project) {
    await ProjectModel.updateOne({ code: id }, project);
  }

  async deleteProject(id) {
    await ProjectModel.deleteOne({ code: id });
  }
}
