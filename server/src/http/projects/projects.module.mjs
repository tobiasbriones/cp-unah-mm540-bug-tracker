/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Module } from '../module.mjs';
import { ProjectsServices } from './projects.services.mjs';
import { jwtGuard, qaGuard } from '../auth/auth.middleware.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/projects',
  middlewares: [jwtGuard]
});

export class ProjectsModule extends Module {
  constructor() {
    super(ROUTER_CONFIG);
  }

  init() {
    this.router.get('/', async (req, res) => {
      try {
        const projectsService = new ProjectsServices();
        const projects = await projectsService.readAllProjects();

        res.json(projects);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.get('/:projectId/bugs', qaGuard, async (req, res) => {
      try {
        const projectId = req.params['projectId'];
        const projectsService = new ProjectsServices();
        const bugs = await projectsService.readBugs(projectId);

        res.json(bugs);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.post('/:projectId/bugs', qaGuard, async (req, res) => {
      try {
        const projectId = req.params['projectId'];
        const bugCode = req.body.bugCode;
        const projectsService = new ProjectsServices();
        await projectsService.assignBug(projectId, bugCode);

        res.end();
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.router.get('/:projectId/teams', qaGuard, async (req, res) => {
      try {
        const projectId = req.params['projectId'];
        const projectsService = new ProjectsServices();
        const teams = await projectsService.readTeams(projectId);

        res.json(teams);
      }
      catch (e) {
        res.status(500).send(e.message);
      }
    });
  }
}
