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
    res.json({
      uid: req.user.login,
      name: req.user.full_name,
      role: req.user.role,
      uat: req.token
    });
  }

  async verifyToken(req, res) {
    res.end()
  }
}
