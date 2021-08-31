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
