/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { UserRepository } from '../../repository/user.repository.mjs';
import { setSelected } from './table.mjs';

export class UserPageController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  get userForCreate() {
    return {
      id: parseInt(document.getElementById('userCreateIdInput').value),
      full_name: document.getElementById('userCreateNameInput').value,
      login: document.getElementById('userCreateLoginInput').value,
      role: document.getElementById('userCreateRoleInput').value,
      password: document.getElementById('userCreatePasswordInput').value
    };
  }

  get userForUpdate() {
    return {
      id: parseInt(document.getElementById('userUpdateIdInput').value),
      full_name: document.getElementById('userUpdateNameInput').value,
      login: document.getElementById('userUpdateLoginInput').value,
      role: document.getElementById('userUpdateRoleInput').value
    }
  }

  init() {
    this.pageEl = document.getElementById('usersPage');

    document.getElementById('userCreateForm')
            .addEventListener('submit', e => this.onCreateUserSubmit(e));
    document.getElementById('userUpdateForm')
            .addEventListener('submit', e => this.onUpdateUserSubmit(e));
    document.getElementById('userDeleteBtn').addEventListener('click', () => this.onUserDelete());
    document.getElementById('addNewUserBtn')
            .addEventListener('click', () => this.onAddNewUserButtonClick());
  }

  async resume() {
    const createEl = document.getElementById('userCreateContainer');
    const updateEl = document.getElementById('userUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.add('gone');

    this.reset();

    try {
      const users = await this.userRepository.getAll();

      this.onLoad(users);
      this.show();
    }
    catch (e) {
      alert(e);
    }
  }

  show() {
    this.pageEl.classList.remove('gone');
  }

  hide() {
    this.pageEl.classList.add('gone');
  }

  onAddNewUserButtonClick() {
    document.getElementById('userCreateContainer').classList.remove('gone');
    document.getElementById('userUpdateContainer').classList.add('gone');
  }

  onLoad(users) {
    const bodyEl = document.querySelector('#userListContainer tbody');
    const ctx = this;

    bodyEl.innerHTML = '';

    users.forEach(user => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const nameEl = document.createElement('td');
      const loginEl = document.createElement('td');
      const roleEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = user.id;

      nameEl.innerText = user.full_name;
      loginEl.innerText = user.login;
      roleEl.innerText = user.role;

      rowEl.dataset.id = user.id;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(loginEl);
      rowEl.appendChild(roleEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });

    async function onItemClick(e) {
      const rowEl = e.target.parentElement;
      const userId = parseInt(rowEl.dataset.id);
      const user = await ctx.userRepository.get(userId);

      setSelected(rowEl);
      ctx.onUpdateUser(user);
    }
  }

  async onCreateUserSubmit(e) {
    e.preventDefault();
    const user = this.userForCreate;

    if (!this.checkUser(user) || !user.password) {
      document.getElementById('userCreateError').innerText = 'Llenar todos los campos';
      return;
    }

    try {
      await this.userRepository.add(user);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('userCreateError').innerText = msg;
    }
  }

  async onUpdateUserSubmit(e) {
    e.preventDefault();
    const user = this.userForUpdate;

    if (!this.checkUser(user)) {
      document.getElementById('userUpdateError').innerText = 'Llenar todos los campos';
      return;
    }
    try {
      await this.userRepository.set(user);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('userUpdateError').innerText = msg;
    }
  }

  onUpdateUser(user) {
    const createEl = document.getElementById('userCreateContainer');
    const updateEl = document.getElementById('userUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.remove('gone');
    document.getElementById('userUpdateIdInput').value = user.id;
    document.getElementById('userUpdateNameInput').value = user.full_name;
    document.getElementById('userUpdateLoginInput').value = user.login;
    document.getElementById('userUpdateRoleInput').value = user.role;
  }

  async onUserDelete() {
    const userId = parseInt(document.getElementById('userUpdateIdInput').value);

    try {
      await this.userRepository.remove(userId);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('userUpdateError').innerText = msg;
    }
  }

  reset() {
    document.getElementById('userCreateIdInput').value = '';
    document.getElementById('userCreateNameInput').value = '';
    document.getElementById('userCreateLoginInput').value = '';
    document.getElementById('userCreateRoleInput').value = 'none';
    document.getElementById('userCreatePasswordInput').value = '';
    document.getElementById('userCreateError').innerText = '';

    document.getElementById('userUpdateIdInput').value = '';
    document.getElementById('userUpdateNameInput').value = '';
    document.getElementById('userUpdateLoginInput').value = '';
    document.getElementById('userUpdateRoleInput').value = 'none';
    document.getElementById('userUpdateError').innerText = '';
  }

  checkUser(user) {
    return user.id && user.full_name && user.login && user.role;
  }
}
