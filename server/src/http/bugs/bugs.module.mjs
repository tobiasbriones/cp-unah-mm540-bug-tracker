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
    router.post('/', this.#controller.create);
    router.get('/', this.#controller.readAll);
  }
}
