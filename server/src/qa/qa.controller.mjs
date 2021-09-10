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

import { ProjectsService } from '../projects/projects.service.mjs';
import { Status } from '../http.mjs';

export class QaController {
  #projectsService;

  constructor() {
    this.#projectsService = new ProjectsService();
  }

  async assignBug(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugCode = req.body.bugCode;

      await this.#projectsService.assignBug(projectId, bugCode);
      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  async readAllProjectBugs(req, res) {
    try {
      const projectId = req.params['projectId'];
      const bugs = await this.#projectsService.readBugs(projectId);

      res.json(bugs);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
