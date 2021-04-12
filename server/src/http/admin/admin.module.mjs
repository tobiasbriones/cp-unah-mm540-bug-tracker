/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AdminController } from './admin.controller.mjs';
import { adminGuard, jwtGuard, signUp } from '../auth/auth.middleware.mjs';
import { Module } from '../module.mjs';

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
    const controller = this.#controller;

    this.router.patch('/bugs/:bugId/assign', (req, res) => controller.assignBug(req, res));

    this.router.get('/stats/bugs', (req, res) => controller.readAllBugStats(req, res));

    this.router.post('/dev-team', (req, res) => controller.createDevTeam(req, res));
    this.router.get('/dev-team', (req, res) => controller.readAllDevTeams(req, res));
    this.router.get('/dev-team/:devTeamId', (req, res) => controller.readDevTeam(req, res));
    this.router.put('/dev-team/:devTeamId', (req, res) => controller.updateDevTeam(req, res));
    this.router.delete('/dev-team/:devTeamId', (req, res) => controller.deleteDevTeam(req, res));

    this.router.post('/projects', (req, res) => controller.createProject(req, res));
    this.router.get('/projects', (req, res) => controller.readAllProjects(req, res));
    this.router.get('/projects/:projectId', (req, res) => controller.readProject(req, res));
    this.router.put('/projects/:projectId', (req, res) => controller.updateProject(req, res));
    this.router.delete('/projects/:projectId', (req, res) => controller.deleteProject(req, res));

    this.router.post(
      '/users',
      checkUser,
      checkPassword,
      jwtGuard,
      adminGuard,
      signUp,
      (req, res) => controller.updateUser(req, res)
    );
    this.router.get('/users', (req, res) => controller.readAllUsers(req, res));
    this.router.get('/users/:userId', (req, res) => controller.readUser(req, res));
    this.router.put('/users/:userId', checkUser, (req, res) => controller.updateUser(req, res));
    this.router.delete('/users/:userId', (req, res) => controller.deleteUser(req, res));
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
