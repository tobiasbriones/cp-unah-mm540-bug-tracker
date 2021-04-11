/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { API_BASE_URL } from '../app.config.mjs';
import axios from 'axios';
import Cookies from 'js-cookie'

const BASE_URL = API_BASE_URL + '/auth';
const UAT_KEY = 'uat';

export class AuthService {
  constructor() {
  }

  getLogin() {
    return Cookies.get(UAT_KEY);
  }

  saveLogin(jwt) {
    Cookies.set(UAT_KEY, jwt);
  }

  deleteLogin() {
    Cookies.remote(UAT_KEY);
  }

  async authenticate(login, password) {
    const url = BASE_URL + '/login';
    const data = { login, password };
    return await axios.post(url, data);
  }
}
