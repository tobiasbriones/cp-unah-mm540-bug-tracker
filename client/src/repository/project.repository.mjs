/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import axios from 'axios';
import { API_BASE_URL } from '../app.config.mjs';
import { AuthService } from '../ui/auth/auth.service.mjs';

const BASE_URL = API_BASE_URL + '/projects';
const ADMIN_BASE_URL = API_BASE_URL + '/admin/projects';

export class ProjectRepository {
  constructor() {
    this.authService = new AuthService();
  }

  async getAll() {
    const res = await axios.get(BASE_URL);
    return res.data;
  }

  async get(id) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ ADMIN_BASE_URL }/${ id }`;
    const res = await axios.get(url, config);
    return res.data;
  }

  async add(project) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(ADMIN_BASE_URL, project, config);
  }

  async set(project) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ ADMIN_BASE_URL }/${ project.code }`;
    await axios.put(url, project, config);
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
