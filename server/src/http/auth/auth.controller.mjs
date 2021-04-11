/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AuthService } from './auth.service.mjs';

export class AuthController {
  #service;

  constructor() {
    this.#service = new AuthService();
  }

  async login(req, res) {
    try {
      const username = req.body['username'];
      const password = req.body['password'];
      const jwt = await this.#service.login(username, password);

      res.send(jwt);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }
}
