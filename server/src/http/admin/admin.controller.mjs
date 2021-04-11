/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { AdminService } from './admin.service.mjs';

export class AdminController {
  #service;

  constructor() {
    this.#service = new AdminService();
  }

  async assignBug(req, res) {
    try {
      const bugId = req.params['bugId'];
      const devTeamId = req.body['devTeamId'];

      await this.#service.assignBug(bugId, devTeamId);
      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readAllBugStats(req, res) {
    try {
      const stats = await this.#service.readAllBugStats();

      res.json(stats);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async createDevTeam(req, res) {
    try {
      const devTeam = {
        code: req.body['code'],
        name: req.body['name'],
        languages: req.body['languages'],
        tech: req.body['tech']
      };
      await this.#service.createDevTeam(devTeam);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readAllDevTeams(req, res) {
    try {
      const devTeams = await this.#service.readAllDevTeams();

      res.json(devTeams);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readDevTeam(req, res) {
    try {
      const id = req.params['devTeamId'];
      const devTeam = await this.#service.readDevTeam(id);

      res.json(devTeam);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateDevTeam(req, res) {
    try {
      const id = req.params['devTeamId'];
      const devTeam = {
        code: req.body['code'],
        name: req.body['name'],
        languages: req.body['languages'],
        tech: req.body['tech']
      };
      await this.#service.updateDevTeam(id, devTeam);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteDevTeam(req, res) {
    try {
      const id = req.params['devTeamId'];
      await this.#service.deleteDevTeam(id);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async createProject(req, res) {
    try {
      const project = {
        code: req.body['code'],
        name: req.body['name'],
        startDate: req.body['startDate'],
        endDate: req.body['endDate']
      };
      await this.#service.createProject(project);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readAllProjects(req, res) {
    try {
      const projects = await this.#service.readAllProjects();

      res.json(projects);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readProject(req, res) {
    try {
      const id = req.params['projectId'];
      const project = await this.#service.readProject(id);

      res.json(project);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateProject(req, res) {
    try {
      const id = req.params['projectId'];
      const project = {
        code: req.body['code'],
        name: req.body['name'],
        startDate: req.body['startDate'],
        endDate: req.body['endDate']
      };
      await this.#service.updateProject(id, project);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const id = req.params['projectId'];
      await this.#service.deleteProject(id);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async createUser(req, res) {
    try {
      const user = {
        id_usuario: req.body['id_usuario'],
        nombre_completo: req.body['nombre_completo'],
        login: req.body['login'],
        password: req.body['password'],
        rol: req.body['rol']
      };
      await this.#service.createUser(user);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readAllUsers(req, res) {
    try {
      const users = await this.#service.readAllUsers();

      res.json(users);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async readUser(req, res) {
    try {
      const id = req.params['userId'];
      const user = await this.#service.readUser(id);

      res.json(user);
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params['userId'];
      const user = {
        id_usuario: req.body['user_id'],
        nombre_completo: req.body['full_name'],
        login: req.body['login'],
        password: req.body['password'],
        rol: req.body['rol']
      };
      await this.#service.updateUser(id, user);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params['userId'];
      await this.#service.deleteUser(id);

      res.end();
    }
    catch (err) {
      res.status(400).send(err.message);
    }
  }
}
