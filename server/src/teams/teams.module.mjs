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

import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';
import { Module } from '../module.mjs';
import { TeamsController } from './teams.controller.mjs';
import { teamValidateAssignBug } from './teams.middleware.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/teams',
  // middlewares: [jwtGuard]
});

export class TeamsModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new TeamsController();
  }

  init() {
    const router = this.router;
    const controller = this.#controller;

    router.get('/', controller.readAll.bind(controller));
    router.get('/:teamId', controller.read.bind(controller));

    router.post('/:teamId/projects', controller.createProject.bind(controller));
    router.get('/:teamId/projects', controller.readAllProjects.bind(controller));

    router.post(
      '/:teamId/bugs',
      teamValidateAssignBug,
      controller.assignBug.bind(controller)
    );
    router.get('/:teamId/bugs', controller.readAllBugs.bind(controller));
  }
}
