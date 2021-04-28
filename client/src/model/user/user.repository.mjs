/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import axios from 'axios';
import { API_BASE_URL } from '../../app.config.mjs';
import { AuthService } from '../auth/auth.service.mjs';

const BASE_URL = API_BASE_URL + '/admin/users';

export class UserRepository {
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

  async get(id) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ BASE_URL }/${ id }`;
    const res = await axios.get(url, config);
    return res.data;
  }

  async add(user) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    await axios.post(BASE_URL, user, config);
  }

  async set(user) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ BASE_URL }/${ user.id }`;
    await axios.put(url, user, config);
  }

  async remove(id) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const url = `${ BASE_URL }/${ id }`;
    await axios.delete(url, config);
  }
}
