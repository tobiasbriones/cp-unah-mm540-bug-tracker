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

import { TeamsService } from './teams.service.mjs';

export class TeamsController {
  #service;

  constructor() {
    this.#service = new TeamsService();
  }

  async readAll(req, res) {
    try {
      const teams = await this.#service.readAllTeams();

      res.json(teams);
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  async read(req, res) {
    try {
      const id = req.params['teamId'];
      const team = await this.#service.readTeam(id);

      res.json(team);
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  async createProject(req, res) {
    try {
      const teamCode = req.params['teamId'];
      const projectCode = req.body.projectCode;
      await this.#service.assignProject(teamCode, projectCode);

      res.end();
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async readAllProjects(req, res) {
    try {
      const teamCode = req.params['teamId'];
      const projects = await this.#service.readProjects(teamCode);

      res.send(projects);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async assignBug(req, res) {
    try {
      const teamCode = req.params['teamId'];
      const bugCode = req.body.bugCode;
      const projects = await this.#service.assignBug(teamCode, bugCode);

      res.send(projects);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async readAllBugs(req, res) {
    try {
      const teamCode = req.params['teamId'];
      const projects = await this.#service.readBugs(teamCode);

      res.send(projects);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }
}
