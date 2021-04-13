/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectModel } from './project.model.mjs';
import { ProjectBugModel } from './project-bug.model.mjs';

export class ProjectsServices {
  constructor() {
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
      throw new Error(`Project ${ id } not found`);
    }
    return project;
  }

  async updateProject(id, project) {
    await ProjectModel.updateOne({ code: id }, project);
  }

  async deleteProject(id) {
    await ProjectModel.deleteOne({ code: id });
  }

  async assignBug(projectCode, bugCode) {
    await ProjectBugModel.create({ projectCode: projectCode, bugCode: bugCode });
  }

  async readBugs(projectCode) {
    const bugCodes = await ProjectBugModel.find({ projectCode: projectCode });

    return bugCodes;
  }
}
