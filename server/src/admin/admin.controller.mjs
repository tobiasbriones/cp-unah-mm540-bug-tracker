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

import { AdminService } from './admin.service.mjs';
import { UsersService } from '../users/users.service.mjs';
import { TeamsService } from '../teams/teams.service.mjs';
import { ProjectsService } from '../projects/projects.service.mjs';
import { Status } from '../http.mjs';

export class AdminController {
  #service;
  #usersService;
  #teamsService;
  #projectsService;

  constructor() {
    this.#service = new AdminService();
    this.#usersService = new UsersService();
    this.#teamsService = new TeamsService();
    this.#projectsService = new ProjectsService();
  }

  async assignBug(req, res) {
    try {
      const bugId = req.params['bugId'];
      const teamId = req.body['teamId'];

      await this.#service.assignBug(bugId, teamId);
      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readAllBugStats(req, res) {
    try {
      const stats = await this.#service.readAllBugStats();

      res.json(stats);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async createTeam(req, res) {
    try {
      const team = {
        code: req.body['code'],
        name: req.body['name'],
        languages: req.body['languages'],
        tech: req.body['tech']
      };
      await this.#teamsService.createTeam(team);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readAllTeams(req, res) {
    try {
      const teams = await this.#teamsService.readAllTeams();

      res.json(teams);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readTeam(req, res) {
    try {
      const id = req.params['teamId'];
      const team = await this.#teamsService.readTeam(id);

      res.json(team);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async updateTeam(req, res) {
    try {
      const id = req.params['teamId'];
      const team = {
        name: req.body['name'],
        languages: req.body['languages'],
        tech: req.body['tech']
      };
      await this.#teamsService.updateTeam(id, team);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async deleteTeam(req, res) {
    try {
      const id = req.params['teamId'];
      await this.#teamsService.deleteTeam(id);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async createProject(req, res) {
    try {
      const project = {
        code: req.body['code'],
        name: req.body['name'],
        startDate: req.body['startDate'],
        endDate: req.body['endDate']
      };
      await this.#projectsService.createProject(project);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readAllProjects(req, res) {
    try {
      const projects = await this.#projectsService.readAllProjects();

      res.json(projects);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readProject(req, res) {
    try {
      const id = req.params['projectId'];
      const project = await this.#projectsService.readProject(id);

      res.json(project);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async updateProject(req, res) {
    try {
      const id = req.params['projectId'];
      const project = {
        name: req.body['name'],
        startDate: req.body['startDate'],
        endDate: req.body['endDate']
      };
      await this.#projectsService.updateProject(id, project);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const id = req.params['projectId'];
      await this.#projectsService.deleteProject(id);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readAllUsers(req, res) {
    try {
      const users = await this.#usersService.readAllUsers();

      res.json(users);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readUser(req, res) {
    try {
      const id = req.params['userId'];
      const user = await this.#usersService.readUser(id);

      res.json(user);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params['userId'];
      const user = {
        id: req.body['id'],
        full_name: req.body['full_name'],
        login: req.body['login'],
        role: req.body['role']
      };
      await this.#usersService.updateUser(id, user);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params['userId'];
      await this.#usersService.deleteUser(id);

      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}
