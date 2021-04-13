/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsModule } from './bugs/bugs.module.mjs';
import { AdminModule } from './admin/admin.module.mjs';
import { AuthModule } from './auth/auth.module.mjs';
import { QaModule } from './qa/qa.module.mjs';

const PATH = '';

export class HttpModule {
  #modules;

  constructor() {
    this.#modules = [
      new AdminModule(),
      new AuthModule(),
      new BugsModule(),
      new QaModule()
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

  app.use(path, middlewares, router);
  module.init();
}
