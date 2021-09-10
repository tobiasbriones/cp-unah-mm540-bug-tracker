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

import passport from 'passport';
import { AuthController } from './auth.controller.mjs';
import { Module } from '../module.mjs';
import { jwtGuard, login } from './auth.middleware.mjs';
import { jwtStrategy, loginStrategy, signupStrategy } from './auth.strategy.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/auth'
});

export class AuthModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new AuthController();
  }

  init() {
    const router = this.router;
    const controller = this.#controller;

    router.post(
      '/login',
      login,
      controller.login.bind(controller)
    );
    router.post(
      '/verify-token',
      jwtGuard,
      controller.verifyToken.bind(controller)
    );

    setupPassport();
  }
}

function setupPassport() {
  passport.use('signup', signupStrategy);
  passport.use('login', loginStrategy);
  passport.use('jwt', jwtStrategy);
}
