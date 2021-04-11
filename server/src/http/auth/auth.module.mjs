/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AuthController } from './auth.controller.mjs';

export class AuthModule {
  #controller;

  constructor() {
    this.#controller = new AuthController();
  }

  init(router) {

  }
}
