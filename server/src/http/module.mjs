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

import express from 'express';

export class Module {
  #path;
  #middlewares;
  #router;

  constructor({ path = '/', middlewares = [] }) {
    this.#path = path;
    this.#middlewares = middlewares;
    this.#router = express.Router();
  }

  get path() {
    return this.#path;
  }

  get middlewares() {
    return this.#middlewares;
  }

  get router() {
    return this.#router;
  }
}
