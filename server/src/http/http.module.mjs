/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsModule } from './bugs/bugs.module.mjs';

const PATH = '';

export class HttpModule {
  #modules;

  constructor() {
    this.#modules = [
      // new AdminModule(),
      //new AuthModule(),
      new BugsModule()
    ];
  }

  init(app) {
    this.#modules.forEach(module => initModule(module, app));
  }
}

function initModule(module, app) {
  const path = PATH + module.path;
  const middlewares = module.middlewares;
  const router = module.router;

  console.log('init module '+path);
  app.use(path, middlewares, router);
  module.init();
}
