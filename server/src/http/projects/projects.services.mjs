/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectModel } from './project.model.mjs';

export class ProjectsServices {
  constructor() {}

  async createProject(project) {
    await ProjectModel.create(project);
  }

  async readAllProjects() {
    return ProjectModel.find();
  }

  async readProject(id) {
    const project = await ProjectModel.findOne({ code: id });

    if (!project) {
      throw new Error(`Project ${id} not found`);
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
