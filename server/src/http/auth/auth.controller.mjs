/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AuthService } from './auth.service.mjs';

export class AuthController {
  #service;

  constructor() {
    this.#service = new AuthService();
  }
}
