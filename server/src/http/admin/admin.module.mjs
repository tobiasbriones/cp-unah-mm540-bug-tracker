/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AdminController } from './admin.controller.mjs';
import { adminGuard, jwtGuard, signUp } from '../auth/auth.module.mjs';

export class AdminModule {
  #controller;

  constructor() {
    this.#controller = new AdminController();
  }

  init(router) {
    const controller = this.#controller;

    router.patch('/bugs/:bugId/assign', (req, res) => controller.assignBug(req, res));

    router.get('/stats/bugs', (req, res) => controller.readAllBugStats(req, res));

    router.post('/dev-team', (req, res) => controller.createDevTeam(req, res));
    router.get('/dev-team', (req, res) => controller.readAllDevTeams(req, res));
    router.get('/dev-team/:devTeamId', (req, res) => controller.readDevTeam(req, res));
    router.put('/dev-team/:devTeamId', (req, res) => controller.updateDevTeam(req, res));
    router.delete('/dev-team/:devTeamId', (req, res) => controller.deleteDevTeam(req, res));

    router.post('/projects', (req, res) => controller.createProject(req, res));
    router.get('/projects', (req, res) => controller.readAllProjects(req, res));
    router.get('/projects/:projectId', (req, res) => controller.readProject(req, res));
    router.put('/projects/:projectId', (req, res) => controller.updateProject(req, res));
    router.delete('/projects/:projectId', (req, res) => controller.deleteProject(req, res));

    router.post(
      '/users',
      checkUser,
      checkPassword,
      jwtGuard,
      adminGuard,
      signUp,
      (req, res) => controller.updateUser(req, res)
    );
    router.get('/users', (req, res) => controller.readAllUsers(req, res));
    router.get('/users/:userId', (req, res) => controller.readUser(req, res));
    router.put('/users/:userId', checkUser, (req, res) => controller.updateUser(req, res));
    router.delete('/users/:userId', (req, res) => controller.deleteUser(req, res));
  }
}

function checkUser(req, res, next) {
  const user = req.body;

  if (!user.id_usuario || !user.nombre_completo || !user.login || !user.rol) {
    res.status(400).send('User must be set');
    return;
  }
  if (user.rol !== 'admin' && user.rol !== 'dev' && user.rol !== 'qa') {
    res.status(400).send('Invalid role');
    return;
  }
  next();
}

function checkPassword(req, res, next) {
  const user = req.body;

  if (!user.password) {
    res.status(400).send('User password must be set');
    return;
  }
  next();
}
