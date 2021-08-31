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
import { UsersService } from '../users/users.service.mjs';
import { teamValidate } from '../teams/teams.middleware.mjs';
import { projectValidate } from '../projects/projects.middleware.mjs';
import { UserModel } from '../users/user.model.mjs';

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

    this.router.post('/teams', teamValidate, (req, res) => controller.createDevTeam(req, res));
    this.router.get('/teams', (req, res) => controller.readAllDevTeams(req, res));
    this.router.get('/teams/:devTeamId', (req, res) => controller.readDevTeam(req, res));
    this.router.put('/teams/:devTeamId', (req, res) => controller.updateDevTeam(req, res));
    this.router.delete('/teams/:devTeamId', (req, res) => controller.deleteDevTeam(req, res));

    this.router.post(
      '/projects',
      projectValidate,
      (req, res) => controller.createProject(req, res)
    );
    this.router.get('/projects', (req, res) => controller.readAllProjects(req, res));
    this.router.get('/projects/:projectId', (req, res) => controller.readProject(req, res));
    this.router.put('/projects/:projectId', (req, res) => controller.updateProject(req, res));
    this.router.delete('/projects/:projectId', (req, res) => controller.deleteProject(req, res));

    this.router.post(
      '/users',
      checkUser,
      checkPassword,
      checkUserExists,
      signUp,
      (req, res) => controller.updateUser(req, res)
    );
    this.router.get('/users', (req, res) => controller.readAllUsers(req, res));
    this.router.get('/users/:userId', (req, res) => controller.readUser(req, res));
    this.router.put('/users/:userId', checkUserPut, (req, res) => controller.updateUser(req, res));
    this.router.delete('/users/:userId', (req, res) => controller.deleteUser(req, res));
  }
}

async function checkUser(req, res, next) {
  const user = req.body;

  if (!user.full_name || !user.login || !user.role) {
    res.status(400).send('User must be set');
    return;
  }
  if (user.role !== 'admin' && user.role !== 'dev' && user.role !== 'qa') {
    res.status(400).send('Invalid role');
    return;
  }

  try {
    const uid = await getNewUserId();
    req.body.id = uid;
  }
  catch (e) {
    console.log(e);
    res.status(500).send('Fail to generate user ID');
    return;
  }
  next();
}

async function checkUserPut(req, res, next) {
  const user = req.body;

  if (!user.id || !user.full_name || !user.login || !user.role) {
    res.status(400).send('User must be set');
    return;
  }
  if (user.role !== 'admin' && user.role !== 'dev' && user.role !== 'qa') {
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

async function checkUserExists(req, res, next) {
  try {
    const usersService = new UsersService();
    const exists = await usersService.exists(req.body);

    if (exists) {
      res.status(400).send('User already exists');
    }
    else {
      next();
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
}

// Temporal way of generating unique user IDs
async function getNewUserId() {
  const users = await UserModel.find();
  const user = users.sort((a, b) => (a.id < b.id ? 1 : -1))[0];
  const max = user.id;
  return max + 1;
}
