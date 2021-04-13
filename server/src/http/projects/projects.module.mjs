/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Module } from '../module.mjs';
import { ProjectsServices } from './projects.services.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/projects'
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
  }
}
