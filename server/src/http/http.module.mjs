/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugsModule } from './bugs/bugs.module.mjs';
import { HttpRouter } from './http.router.mjs';
import { AdminModule } from './admin/admin.module.mjs';
import { AuthModule } from './auth/auth.module.mjs';

export class HttpModule {
  #router;
  #adminModule;
  #authModule;
  #bugsModule;

  constructor() {
    this.#router = new HttpRouter();
    this.#adminModule = new AdminModule();
    this.#authModule = new AuthModule();
    this.#bugsModule = new BugsModule();
  }

  init(app) {
    this.#router.init(app);
    this.#adminModule.init(this.#router.adminRouter);
    this.#authModule.init(this.#router.authRouter);
    this.#bugsModule.init(this.#router.bugsRouter);
  }
}
