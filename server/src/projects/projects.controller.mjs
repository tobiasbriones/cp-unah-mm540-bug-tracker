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

import { ProjectsService } from './projects.service.mjs';

export class ProjectsController {
  #service;

  constructor() {
    this.#service = new ProjectsService();
  }

  async readAll(req, res) {
    try {
      const projects = await this.#service.readAllProjects();

      res.json(projects);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async read(req, res) {
    try {
      const code = req.params['id'];
      const project = await this.#service.readProject(code);

      res.json(project);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async readAllBugs(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugs = await this.#service.readBugs(projectId);

      res.json(bugs);
    }
    catch (e) {
      res.status(500).send(e.message);
    }

  }

  async assignBug(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugCode = req.body.bugCode;
      await this.#service.assignBug(projectId, bugCode);

      res.end();
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }

  async readAllTeams(req, res) {
    try {
      const projectId = req.params['projectId'];
      const teams = await this.#service.readTeams(projectId);

      res.json(teams);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }
}
