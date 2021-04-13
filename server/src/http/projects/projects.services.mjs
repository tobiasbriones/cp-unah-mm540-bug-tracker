/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectModel } from './project.model.mjs';
import { ProjectBugModel } from './project-bug.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';
import { TeamProjectModel } from '../teams/team-project.model.mjs';
import { TeamModel } from '../teams/team.model.mjs';

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
    const bugs = [];

    for (const code of bugCodes) {
      const bug = await BugModel.findOne({ code: code.bugCode });
      bugs.push(bug);
    }
    return bugs;
  }

  async readTeams(projectCode) {
    const teamCodes = await TeamProjectModel.find({ projectCode: projectCode });
    const teams = [];

    for (const code of teamCodes) {
      const team = await TeamModel.findOne({ code: code.teamCode });
      teams.push(team);
    }
    return teams;
  }
}
