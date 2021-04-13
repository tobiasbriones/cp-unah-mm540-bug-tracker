/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import axios from 'axios';
import { API_BASE_URL } from '../app.config.mjs';
import { AuthService } from '../ui/auth/auth.service.mjs';

const BASE_URL = API_BASE_URL + '/teams';
const ADMIN_BASE_URL = API_BASE_URL + '/admin/teams';

export class TeamRepository {
  constructor() {
    this.authService = new AuthService();
  }

  async getAll() {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const res = await axios.get(BASE_URL, config);
    return res.data;
  }

  async getAllProjects(teamCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const res = await axios.get(BASE_URL + `/${teamCode}/projects`, config);
    return res.data;
  }

  async getAllBugs(teamCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const res = await axios.get(BASE_URL + `/${teamCode}/bugs`, config);
    return res.data;
  }

  async get(id) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ BASE_URL }/${ id }`;
    const res = await axios.get(url, config);
    return res.data;
  }

  async add(devTeam) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(ADMIN_BASE_URL, devTeam, config);
  }

  async set(devTeam) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ ADMIN_BASE_URL }/${ devTeam.code }`;
    await axios.put(url, devTeam, config);
  }

  async remove(id) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ ADMIN_BASE_URL }/${ id }`;
    await axios.delete(url, config);
  }
}
