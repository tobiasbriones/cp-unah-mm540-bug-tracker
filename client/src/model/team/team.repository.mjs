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

import axios from 'axios';
import { API_BASE_URL } from '../../app.config.mjs';
import { AuthService } from '../auth/auth.service.mjs';

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
    const res = await axios.get(BASE_URL + `/${ teamCode }/projects`, config);
    return res.data;
  }

  async getAllBugs(teamCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const res = await axios.get(BASE_URL + `/${ teamCode }/bugs`, config);
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

  async assignBug(teamCode, bugCode) {
    const login = this.authService.getLogin();
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    const data = {
      bugCode: bugCode
    };
    const res = await axios.post(BASE_URL + `/${ teamCode }/bugs`, data, config);
    return res.data;
  }
}
