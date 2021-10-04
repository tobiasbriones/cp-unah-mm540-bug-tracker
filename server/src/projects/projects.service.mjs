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

import { ProjectModel } from './project.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';

export class ProjectsService {
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
    const result = await ProjectModel.findOne({ code: projectCode }, '_id');
    const _projectId = result._id;
    await BugModel.updateOne({ code: bugCode }, { project: _projectId });
  }

  async readBugs(projectCode) {
    const result = await ProjectModel.findOne({ code: projectCode }, '_id');
    const _projectId = result._id;
    return BugModel.find({ project: _projectId });
  }

  async readTeams(projectCode) {
    const result = await ProjectModel.findOne({ code: projectCode }, 'teams').populate('teams');
    return result.teams;
  }
}
