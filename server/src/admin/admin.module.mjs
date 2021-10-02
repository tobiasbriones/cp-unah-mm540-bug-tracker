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

import { AdminController } from './admin.controller.mjs';
import { adminGuard, jwtGuard, signUp } from '../auth/auth.middleware.mjs';
import { Module } from '../module.mjs';
import { generateTeamCode, teamValidate } from '../teams/teams.middleware.mjs';
import { generateProjectCode, projectValidate } from '../projects/projects.middleware.mjs';
import { TeamModel } from '../teams/team.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';
import {
  generateUserId,
  userValidateExists,
  userValidatePassword,
  userValidateSignUp,
  userValidateUpdate
} from '../users/users.middleware.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/admin',
  middlewares: [
    jwtGuard,
    adminGuard
  ]
});

export class AdminModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new AdminController();
  }

  init() {
    const router = this.router;
    const controller = this.#controller;
    const c = controller;

    router.patch('/bugs/:bugId/assign', controller.assignBug.bind(c));

    router.get('/stats/bugs', controller.readAllBugStats.bind(c));

    router.post(
      '/teams',
      teamValidate,
      generateTeamCode,
      controller.createTeam.bind(c)
    );
    router.get('/teams', controller.readAllTeams.bind(c));
    router.get('/teams/:teamId', controller.readTeam.bind(c));
    router.put('/teams/:teamId', controller.updateTeam.bind(c));
    router.delete('/teams/:teamId', controller.deleteTeam.bind(c));

    router.post(
      '/projects',
      projectValidate,
      generateProjectCode,
      controller.createProject.bind(c)
    );
    router.get('/projects', controller.readAllProjects.bind(c));
    router.get('/projects/:projectId', controller.readProject.bind(c));
    router.put('/projects/:projectId', controller.updateProject.bind(c));
    router.delete('/projects/:projectId', controller.deleteProject.bind(c));

    router.post(
      '/users',
      userValidateSignUp,
      generateUserId,
      userValidatePassword,
      userValidateExists,
      signUp,
      controller.updateUser.bind(c)
    );
    router.get('/users', controller.readAllUsers.bind(c));
    router.get('/users/:userId', controller.readUser.bind(c));
    router.put('/users/:userId', userValidateUpdate, controller.updateUser.bind(c));
    router.delete('/users/:userId', controller.deleteUser.bind(c));
  }
}
