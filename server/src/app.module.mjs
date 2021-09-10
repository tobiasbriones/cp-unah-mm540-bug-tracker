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

import { BugsModule } from './bugs/bugs.module.mjs';
import { AdminModule } from './admin/admin.module.mjs';
import { AuthModule } from './auth/auth.module.mjs';
import { QaModule } from './qa/qa.module.mjs';
import { ProjectsModule } from './projects/projects.module.mjs';
import { TeamsModule } from './teams/teams.module.mjs';

const PATH = '';

export class AppModule {
  #modules;

  constructor() {
    this.#modules = [
      new AdminModule(),
      new AuthModule(),
      new BugsModule(),
      new QaModule(),
      new ProjectsModule(),
      new TeamsModule()
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
