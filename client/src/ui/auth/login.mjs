/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import '../bootstrap/bootstrap.min.css';
import './login.html';
import '../default.css';
import '../index.css';
import { AuthService } from './auth.service.mjs';

init();

function init() {
  document.getElementById('form').addEventListener('submit', onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();
  const login = document.getElementById('loginInput').value;
  const password = document.getElementById('passwordInput').value;
  const authService = new AuthService();

  try {
    const res = await authService.authenticate(login, password);

    authService.saveLogin(res.data);
    onLoggedIn();
  }
  catch (err) {
    console.log(err);
    alert('Invalid credentials');
  }
}

function onLoggedIn() {
  window.location.href = '/';
}
