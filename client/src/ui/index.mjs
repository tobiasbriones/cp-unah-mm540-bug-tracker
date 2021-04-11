/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import './bootstrap/bootstrap.min.css';
import './index.html';
import './default.css';
import './index.css';
import { AuthService } from './auth/auth.service.mjs';

init();

function init() {
  document.querySelectorAll('.options > div')
          .forEach(el => el.addEventListener('click', onOptionClick));
  document.getElementById('logoutAction').addEventListener('click', onLogout);
  checkLogin().then();
}

function onOptionClick(e) {
  window.location = e.target.dataset.page;
}

function onLogout() {
  const authService = new AuthService();
  const loginEl = document.querySelector('#loginAction > a');
  const logoutEl = document.getElementById('logoutAction');

  authService.deleteLogin();
  loginEl.href = './login.html';
  loginEl.textContent = 'Login';
  logoutEl.classList.add('d-none');
}

async function checkLogin() {
  const authService = new AuthService();
  const login = authService.getLogin();

  if (login) {
    try {
      await authService.verify(login);

      setLogin(login);
    }
    catch (e) {
      console.log(e);
      authService.deleteLogin();
      window.location.href = './login.html';
    }
  }
}

function setLogin(login) {
  const { name } = login;
  const el = document.querySelector('#loginAction > a');
  const logoutEl = document.getElementById('logoutAction');

  el.href = '#';
  el.textContent = name;
  logoutEl.classList.remove('d-none');
}
