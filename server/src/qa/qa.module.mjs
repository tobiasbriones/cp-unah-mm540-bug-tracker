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
import { QaController } from './qa.controller.mjs';
import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/qa',
  middlewares: [
    jwtGuard,
    qaGuard
  ]
});

export class QaModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new QaController();
  }

  init() {
    this.router.post(
      '/projects/:projectId/bugs',
      (req, res) => this.#controller.assignBug(req, res)
    );
    this.router.get(
      '/projects/:projectId/bugs',
      (req, res) => this.#controller.readAllProjectBugs(req, res)
    );
  }
}
