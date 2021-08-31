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

import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';
import { Module } from '../module.mjs';
import { TeamsService } from './teams.service.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/teams',
  middlewares: [jwtGuard]
});

export class TeamsModule extends Module {
  constructor() {
    super(ROUTER_CONFIG);
  }

  init() {
    this.router.get('/', async (req, res) => {
      try {
        const devTeamService = new TeamsService();
        const devTeams = await devTeamService.readAllDevTeams();

        res.json(devTeams);
      }
      catch (err) {
        res.status(400).send(err.message);
      }
    });
    this.router.get('/:devTeamId', async (req, res) => {
      try {
        const id = req.params['devTeamId'];
        const devTeamService = new TeamsService();
        const devTeam = await devTeamService.readDevTeam(id);

        res.json(devTeam);
      }
      catch (err) {
        res.status(400).send(err.message);
      }
    });

    this.router.post('/:teamId/projects', qaGuard, async (req, res) => {
      try {
        const teamCode = req.params['teamId'];
        const projectCode = req.body.projectCode;
        const service = new TeamsService();
        await service.assignProject(teamCode, projectCode);

        res.end();
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.get('/:teamId/projects', async (req, res) => {
      try {
        const teamCode = req.params['teamId'];
        const service = new TeamsService();
        const projects = await service.readProjects(teamCode);

        res.send(projects);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.post('/:teamId/bugs', async (req, res) => {
      try {
        const teamCode = req.params['teamId'];
        const bugCode = req.body.bugCode;
        const service = new TeamsService();
        const projects = await service.assignBug(teamCode, bugCode);

        res.send(projects);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.get('/:teamId/bugs', async (req, res) => {
      try {
        const teamCode = req.params['teamId'];
        const service = new TeamsService();
        const projects = await service.readBugs(teamCode);

        res.send(projects);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });
  }
}
