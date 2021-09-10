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

import { Module } from '../module.mjs';
import { ProjectsService } from './projects.service.mjs';
import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';
import { ProjectsController } from './projects.controller.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/projects',
  middlewares: [jwtGuard]
});

export class ProjectsModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new ProjectsController();
  }

  init() {
    const router = this.router;
    const controller = this.#controller;

    router.get('/', controller.readAll.bind(controller));
    router.get('/:id', controller.read.bind(controller));

    router.get('/:projectId/bugs', qaGuard, controller.readAllBugs.bind(controller));
    router.post('/:projectId/bugs', qaGuard, controller.assignBug.bind(controller));

    router.get('/:projectId/teams', qaGuard, controller.readAllTeams.bind(controller));
  }
}
