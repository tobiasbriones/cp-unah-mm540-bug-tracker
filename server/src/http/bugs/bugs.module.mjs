/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsController } from './bugs.controller.mjs';

export class BugsModule {
  #controller;

  constructor() {
    this.#controller = new BugsController();
  }

  init(router) {
    router.post('/', (req, res) => this.#controller.create(req, res));
    router.get('/', (req, res) => this.#controller.readAll(req, res));
  }
}
