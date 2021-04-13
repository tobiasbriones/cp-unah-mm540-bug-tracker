/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
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
    this.router.post('/', qaGuard, validateBug, (req, res) => this.#controller.create(req, res));
    this.router.get('/', (req, res) => this.#controller.readAll(req, res));
    this.router.post('/:id/set-finished', (req, res) => this.#controller.setFinished(req, res))
    this.router.post('/:id/set-assigned', (req, res) => this.#controller.setAssigned(req, res))
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
