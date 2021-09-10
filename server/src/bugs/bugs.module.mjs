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
import { BugsController } from './bugs.controller.mjs';
import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/bugs',
  middlewares: [
    jwtGuard
  ]
});

export class BugsModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new BugsController();
  }

  init() {
    const router = this.router;
    const controller = this.#controller;

    router.post('/', qaGuard, validateBug, controller.create.bind(controller));
    router.get('/', controller.readAll.bind(controller));
    router.post('/:id/set-finished', controller.setFinished.bind(controller));
    router.post('/:id/set-assigned', controller.setAssigned.bind(controller));
  }
}

function validateBug(req, res, next) {
  const bug = req.body;

  if (!bug) {
    return res.status(400).send('Fill all the fields');
  }
  if (!bug.code || !bug.description || !bug.priority || !bug.state) {
    return res.status(400).send('Fill all the fields');
  }
  next();
}
