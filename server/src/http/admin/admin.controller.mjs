/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

export class AdminController {
  constructor() {
  }

  async assignBug(req, res) {
    const bugId = req.params['bugId'];

    res.send('');
  }

  async readAllBugStats(req, res) {

    res.end();
  }

  async createDevTeam(req, res) {

    res.send('');
  }

  async readAllDevTeams(req, res) {

    res.send('');
  }

  async readDevTeam(req, res) {

  }

  async updateDevTeam(req, res) {

  }

  async deleteDevTeam(req, res) {

  }

  async createProject(req, res) {

  }

  async readAllProjects(req, res) {

  }

  async readProject(req, res) {

  }

  async updateProject(req, res) {

  }

  async deleteProject(req, res) {

  }

  async createUser(req, res) {

  }

  async readAllUsers(req, res) {

  }

  async readUser(req, res) {

  }

  async updateUser(req, res) {

  }

  async deleteUser(req, res) {

  }
}
