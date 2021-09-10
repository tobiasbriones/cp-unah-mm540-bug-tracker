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
import { TeamModel } from '../teams/team.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';

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
      setTeamId,
      controller.createTeam.bind(c)
    );
    router.get('/teams', controller.readAllTeams.bind(c));
    router.get('/teams/:devTeamId', controller.readTeam.bind(c));
    router.put('/teams/:devTeamId', controller.updateTeam.bind(c));
    router.delete('/teams/:devTeamId', controller.deleteTeam.bind(c));

    router.post(
      '/projects',
      projectValidate,
      setProjectId,
      controller.createProject.bind(c)
    );
    router.get('/projects', controller.readAllProjects.bind(c));
    router.get('/projects/:projectId', controller.readProject.bind(c));
    router.put('/projects/:projectId', controller.updateProject.bind(c));
    router.delete('/projects/:projectId', controller.deleteProject.bind(c));

    router.post(
      '/users',
      checkUser,
      checkPassword,
      checkUserExists,
      signUp,
      controller.updateUser.bind(c)
    );
    router.get('/users', controller.readAllUsers.bind(c));
    router.get('/users/:userId', controller.readUser.bind(c));
    router.put('/users/:userId', checkUserPut, controller.updateUser.bind(c));
    router.delete('/users/:userId', controller.deleteUser.bind(c));
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

async function setTeamId(req, res, next) {
  req.body.code = await getNewTeamCode();
  next();
}

async function setProjectId(req, res, next) {
  req.body.code = await getNewProjectCode();
  next();
}

// Temporal way of generating unique user IDs
async function getNewUserId() {
  const users = await UserModel.find();
  const user = users.sort((a, b) => (a.id < b.id ? 1 : -1))[0];
  const max = user.id;
  return max + 1;
}

async function getNewTeamCode() {
  const teams = await TeamModel.find();
  const team = teams.sort((a, b) => (a.code < b.code ? 1 : -1))[0];
  const max = team.code;
  return max + 1;
}

async function getNewProjectCode() {
  const projects = await ProjectModel.find();
  const project = projects.sort((a, b) => (a.code < b.code ? 1 : -1))[0];
  const max = project.code;
  return max + 1;
}
