/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import express from 'express';

export class HttpRouter {
  #adminRouter;
  #authRouter;
  #bugsRouter;

  constructor() {
    this.#adminRouter = express.Router();
    this.#authRouter = express.Router();
    this.#bugsRouter = express.Router();
  }

  get adminRouter() {
    return this.#adminRouter;
  }

  get authRouter() {
    return this.#authRouter;
  }

  get bugsRouter() {
    return this.#bugsRouter;
  }

  init(app) {
    app.use('/admin', this.#adminRouter);
    app.use('/auth', this.#authRouter);
    app.use('/bugs', this.#bugsRouter);
  }
}
