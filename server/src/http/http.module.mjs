/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsModule } from './bugs/bugs.module.mjs';

export class HttpModule {
  #bugsModule;

  constructor() {
    this.#bugsModule = new BugsModule();
  }

  init(router) {
    this.#bugsModule.init(router);
  }
}
