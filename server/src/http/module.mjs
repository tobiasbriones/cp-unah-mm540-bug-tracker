/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
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
