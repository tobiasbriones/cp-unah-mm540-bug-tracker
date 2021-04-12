/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { API_BASE_URL } from '../../app.config.mjs';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = API_BASE_URL + '/auth';
const UAT_KEY = 'uat';
const NAME_KEY = 'name';
const ROLE_KEY = 'role';
const UID_KEY = 'uid';

export class AuthService {
  constructor() {}

  getLogin() {
    const login = {
      uid: Cookies.get(UID_KEY),
      name: Cookies.get(NAME_KEY),
      role: Cookies.get(ROLE_KEY),
      uat: Cookies.get(UAT_KEY)
    };
    const isSet = login.uid && login.name && login.uat && login.role;
    return isSet ? login : null;
  }

  saveLogin(login) {
    Cookies.set(UID_KEY, login.uid);
    Cookies.set(NAME_KEY, login.name);
    Cookies.set(ROLE_KEY, login.role);
    Cookies.set(UAT_KEY, login.uat);
  }

  deleteLogin() {
    Cookies.remove(UID_KEY);
    Cookies.remove(NAME_KEY);
    Cookies.remove(ROLE_KEY);
    Cookies.remove(UAT_KEY);
  }

  async authenticate(login, password) {
    const url = BASE_URL + '/login';
    const data = { login, password };
    return await axios.post(url, data);
  }

  async verify(login) {
    if (!login || !login.uat) {
      return false;
    }
    const url = BASE_URL + '/verify-token';
    const config = {
      headers: { Authorization: `Bearer ${ login.uat }` }
    };
    return await axios.post(url, {}, config);
  }
}
