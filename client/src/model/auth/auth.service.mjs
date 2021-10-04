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

import { API_BASE_URL } from '../../app.config.mjs';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = API_BASE_URL + '/auth';
const UAT_KEY = 'uat';
const NAME_KEY = 'name';
const ROLE_KEY = 'role';
const UID_KEY = 'uid';
const EMPTY_LOGIN = Object.freeze({
  uid: '',
  name: '',
  role: '',
  uat: ''
});

export class AuthService {
  getLogin() {
    const login = {
      uid: Cookies.get(UID_KEY),
      name: Cookies.get(NAME_KEY),
      role: Cookies.get(ROLE_KEY),
      uat: Cookies.get(UAT_KEY)
    };
    const isSet = login.uid && login.name && login.uat && login.role;
    return isSet ? login : EMPTY_LOGIN;
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
