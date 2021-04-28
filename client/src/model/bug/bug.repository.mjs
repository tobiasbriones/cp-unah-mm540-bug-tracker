/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import axios from 'axios';
import { API_BASE_URL } from '../../app.config.mjs';
import { AuthService } from '../auth/auth.service.mjs';

const BASE_URL = API_BASE_URL + '/bugs';

export class BugRepository {
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

  async getStatistics() {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const res = await axios.get(API_BASE_URL + '/admin/stats/bugs', config);
    return res.data;
  }

  async add(bug) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(BASE_URL, bug, config);
  }

  async setFinished(bugCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(BASE_URL + `/${ bugCode }/set-finished`, {}, config);
  }

  async setAssigned(bugCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(BASE_URL + `/${ bugCode }/set-assigned`, {}, config);
  }
}
