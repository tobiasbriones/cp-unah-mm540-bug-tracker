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
      id_usuario: parseInt(document.getElementById('userCreateIdInput').value),
      nombre_completo: document.getElementById('userCreateNameInput').value,
      login: document.getElementById('userCreateLoginInput').value,
      rol: document.getElementById('userCreateRoleInput').value,
      password: document.getElementById('userCreatePasswordInput').value
    };
  }

  get userForUpdate() {
    return {
      id_usuario: parseInt(document.getElementById('userUpdateIdInput').value),
      nombre_completo: document.getElementById('userUpdateNameInput').value,
      login: document.getElementById('userUpdateLoginInput').value,
      rol: document.getElementById('userUpdateRoleInput').value
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
      thEl.innerText = user.id_usuario;

      nameEl.innerText = user.nombre_completo;
      loginEl.innerText = user.login;
      roleEl.innerText = user.rol;

      rowEl.dataset.code = user.id_usuario;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(loginEl);
      rowEl.appendChild(roleEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });

    async function onItemClick(e) {
      const rowEl = e.target.parentElement;
      const userId = parseInt(rowEl.dataset.code);
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
      if (JSON.stringify(e).includes('500')) {
        e = 'Usuario ya existe';
      }
      document.getElementById('userCreateError').innerText = e;
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
      document.getElementById('userUpdateError').innerText = e;
    }
  }

  onUpdateUser(user) {
    const createEl = document.getElementById('userCreateContainer');
    const updateEl = document.getElementById('userUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.remove('gone');
    document.getElementById('userUpdateIdInput').value = user.id_usuario;
    document.getElementById('userUpdateNameInput').value = user.nombre_completo;
    document.getElementById('userUpdateLoginInput').value = user.login;
    document.getElementById('userUpdateRoleInput').value = user.rol;
  }

  async onUserDelete() {
    const userId = parseInt(document.getElementById('userUpdateIdInput').value);

    try {
      await this.userRepository.remove(userId);

      await this.resume();
    }
    catch (e) {
      document.getElementById('userUpdateError').innerText = e;
    }
  }

  reset() {
    document.getElementById('userCreateIdInput').value = '';
    document.getElementById('userCreateNameInput').value = '';
    document.getElementById('userCreateLoginInput').value = '';
    document.getElementById('userCreateRoleInput').value = '-1';
    document.getElementById('userCreatePasswordInput').value = '';
    document.getElementById('userCreateError').innerText = '';

    document.getElementById('userUpdateIdInput').value = '';
    document.getElementById('userUpdateNameInput').value = '';
    document.getElementById('userUpdateLoginInput').value = '';
    document.getElementById('userUpdateRoleInput').value = '-1';
    document.getElementById('userUpdateError').innerText = '';
  }

  checkUser(user) {
    return user.id_usuario && user.nombre_completo && user.login && user.rol;
  }
}
