/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsController } from './bugs.controller.mjs';

export class BugsModule {

  constructor() {}

  init(router) {
    router.post('/bugs', async (req, res) => {
      const controller = new BugsController();

      await controller.create(req, res);
    });
    router.get('/bugs', async (req, res) => {
      const controller = new BugsController();

      await controller.readAll(req, res);
    });
  }
}
