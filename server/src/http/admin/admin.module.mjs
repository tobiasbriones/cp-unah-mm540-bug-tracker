/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AdminController } from './admin.controller.mjs';

export class AdminModule {
  #controller;

  constructor() {
    this.#controller = new AdminController();
  }

  init(router) {
    router.patch('/bugs/:bugId/assign', this.#controller.assignBug);

    router.get('/stats/bugs', this.#controller.readAllBugStats);

    router.post('/dev-team', this.#controller.createDevTeam);
    router.get('/dev-team', this.#controller.readAllDevTeams);
    router.get('/dev-team/:devId', this.#controller.readDevTeam);
    router.put('/dev-team', this.#controller.updateDevTeam);
    router.delete('/dev-team', this.#controller.deleteDevTeam);

    router.post('/projects', this.#controller.createProject);
    router.get('/projects', this.#controller.readAllProjects);
    router.get('/projects/:projectId', this.#controller.readProject);
    router.put('/projects', this.#controller.updateProject);
    router.delete('/projects', this.#controller.deleteProject);

    router.post('/users', this.#controller.createUser);
    router.get('/users', this.#controller.readAllUsers);
    router.get('/users/:userId', this.#controller.readUser);
    router.put('/users', this.#controller.updateUser);
    router.delete('/users', this.#controller.deleteUser);
  }
}
