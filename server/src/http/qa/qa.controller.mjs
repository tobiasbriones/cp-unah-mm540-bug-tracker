/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectsServices } from '../projects/projects.services.mjs';

export class QaController {
  #projectsService;

  constructor() {
    this.#projectsService = new ProjectsServices();
  }

  async assignBug(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugCode = req.body.bugCode;

      await this.#projectsService.assignBug(projectId, bugCode);
      res.end();
    }
    catch (e) {
      res.status(500).send(e);
    }
  }

  async readAllProjectBugs(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugs = await this.#projectsService.readBugs(projectId);

      res.json(bugs);
    }
    catch (e) {
      res.status(500).send(e);
    }
  }
}
