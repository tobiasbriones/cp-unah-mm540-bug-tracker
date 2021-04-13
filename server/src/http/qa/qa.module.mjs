/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Module } from '../module.mjs';
import { QaController } from './qa.controller.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/qa'
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
