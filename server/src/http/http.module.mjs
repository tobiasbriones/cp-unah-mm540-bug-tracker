/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsModule } from './bugs/bugs.module.mjs';
import { HttpRouter } from './http.router.mjs';

export class HttpModule {
  #router;
  #bugsModule;

  constructor() {
    this.#router = new HttpRouter();
    this.#bugsModule = new BugsModule();
  }

  init(app) {
    this.#router.init(app);
    this.#bugsModule.init(this.#router.bugsRouter);
  }
}
