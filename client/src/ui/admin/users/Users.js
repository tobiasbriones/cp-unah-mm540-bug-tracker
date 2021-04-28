/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Users.css';
import React from 'react';
import { UserRepository } from '../../../model/user/user.repository.mjs';
import { getCreateForm, getTable, getUpdateForm } from '../../crud';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: '',
      values: [],
      createFormDisplayClass: 'd-none',
      updateFormDisplayClass: 'd-none',
      createError: '',
      createFullName: '',
      createLogin: '',
      createRole: '',
      createPassword: '',
      updateError: '',
      updateId: -1,
      updateFullName: '',
      updateLogin: '',
      updateRole: ''
    };
    this.userRepository = new UserRepository();
  }

  render() {
    const getUserRow = user => {
      return (
        <tr key={ user.id } data-key={ user.id } onClick={ this.onUserRowClick.bind(this) }>
          <th scope="col">{ user.id }</th>
          <th scope="col">{ user.full_name }</th>
          <th scope="col">{ user.login }</th>
          <th scope="col">{ user.role }</th>
        </tr>
      );
    };

    const getCreateGroups = () => {
      return [
        (
          <div className="form-group" key="createName">
            <label htmlFor="userCreateNameInput">Nombre Completo</label>
            <input id="userCreateNameInput"
                   className="form-control"
                   type="text"
                   placeholder="Nombre"
                   onChange={ this.onCreateNameChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="createLogin">
            <label htmlFor="userCreateLoginInput">Login</label>
            <input id="userCreateLoginInput"
                   className="form-control"
                   type="text"
                   placeholder="Login"
                   onChange={ this.onCreateLoginChange.bind(this) } />
            <small id="userCreateLoginHelp" className="form-text text-muted">
              Nombre de usuario para iniciar sesión
            </small>
          </div>
        ),
        (
          <div className="form-group" key="createRole">
            <select id="userCreateRoleInput"
                    className="form-select form-select mb-3"
                    aria-label=".form-select-lg example"
                    value={ this.state.createRole }
                    onChange={ this.onCreateRoleChange.bind(this) }>
              <option value="none">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="dev">Desarrollador</option>
              <option value="qa">QA</option>
            </select>
          </div>
        ),
        (
          <div className="form-group" key="createPassword">
            <label htmlFor="userCreatePasswordInput">Password</label>
            <input id="userCreatePasswordInput"
                   className="form-control"
                   type="password"
                   placeholder="Password"
                   onChange={ this.onCreatePasswordChange.bind(this) } />
          </div>
        )
      ];
    };

    const getUpdateGroups = () => {
      return [
        (
          <div className="form-group" key="updateId">
            <label htmlFor="userUpdateIdInput">Id de Usuario</label>
            <input id="userUpdateIdInput"
                   className="form-control"
                   type="number"
                   disabled
                   aria-describedby="userUpdateIdHelp"
                   placeholder="Ingresar id"
                   value={ this.state.updateId } />
          </div>
        ),
        (
          <div className="form-group" key="updateName">
            <label htmlFor="userUpdateNameInput">Nombre Completo</label>
            <input id="userUpdateNameInput"
                   className="form-control"
                   type="text"
                   placeholder="Nombre Completo"
                   value={ this.state.updateFullName }
                   onChange={ this.onUpdateNameChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="updateLogin">
            <label htmlFor="userUpdateLoginInput">Login</label>
            <input id="userUpdateLoginInput" className="form-control" type="text"
                   placeholder="Login"
                   value={ this.state.updateLogin }
                   onChange={ this.onUpdateLoginChange.bind(this) } />
            <small id="userUpdateLoginHelp" className="form-text text-muted">
              Nombre de usuario para iniciar sesión
            </small>
          </div>
        ),
        (
          <div className="form-group" key="updateRole">
            <select id="userUpdateRoleInput"
                    className="form-select form-select mb-3"
                    aria-label=".form-select-lg example"
                    value={ this.state.updateRole }
                    onChange={ this.onUpdateRoleChange.bind(this) }>
              <option value="none">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="dev">Desarrollador</option>
              <option value="qa">QA</option>
            </select>
          </div>
        )
      ];
    };

    const users = getTable({
      ctx: this,
      title: 'Usuarios',
      cols: ['Id de Usuario', 'Nombre Completo', 'Login', 'Rol'],
      getRow: getUserRow
    });
    const create = getCreateForm({
      ctx: this,
      title: 'Crear usuario',
      groups: getCreateGroups()
    });
    const update = getUpdateForm({
      ctx: this,
      title: 'Actualizar usuario',
      groups: getUpdateGroups()
    });
    return (
      <div className={ `row page ${ this.state.displayClass }` }>
        { users }
        { create }
        { update }
      </div>
    );
  }

  async componentDidMount() {
    await this.loadUsers();
  }

  async onPageShowed() {
    await this.loadUsers();
  }

  async onUserRowClick(e) {
    const id = e.target.parentElement.getAttribute('data-key');
    const user = await this.userRepository.get(id);
    this.setState({
      updateFormDisplayClass: '',
      createFormDisplayClass: 'd-none',
      updateId: user.id,
      updateFullName: user.full_name,
      updateLogin: user.login,
      updateRole: user.role
    });
  }

  onAddButtonClick() {
    const value = this.state.createFormDisplayClass ? '' : 'd-none';
    this.setState({ createFormDisplayClass: value, updateFormDisplayClass: 'd-none' });
  }

  onCreateNameChange(e) {
    this.setState({ createFullName: e.target.value });
  }

  onCreateLoginChange(e) {
    this.setState({ createLogin: e.target.value });
  }

  onCreateRoleChange(e) {
    this.setState({ createRole: e.target.value });
  }

  onCreatePasswordChange(e) {
    this.setState({ createPassword: e.target.value });
  }

  onUpdateNameChange(e) {
    this.setState({ updateFullName: e.target.value });
  }

  onUpdateLoginChange(e) {
    this.setState({ updateLogin: e.target.value });
  }

  onUpdateRoleChange(e) {
    this.setState({ updateRole: e.target.value });
  }

  async onCreateFormSubmit(e) {
    e.preventDefault();
    const user = {
      full_name: this.state.createFullName,
      login: this.state.createLogin,
      role: this.state.createRole,
      password: this.state.createPassword
    };
    await this.createUser(user);
  }

  async onUpdateFormSubmit(e) {
    e.preventDefault();
    const user = {
      id: this.state.updateId,
      full_name: this.state.updateFullName,
      login: this.state.updateLogin,
      role: this.state.updateRole
    };
    await this.updateUser(user);
  }

  async onDelete() {
    const id = this.state.updateId;
    await this.deleteUser(id);
  }

  async loadUsers() {
    try {
      const users = await this.userRepository.getAll();
      this.setState({
        values: users,
        createFormDisplayClass: 'd-none',
        updateFormDisplayClass: 'd-none',
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      alert(msg);
    }
  }

  async createUser(user) {
    try {
      await this.userRepository.add(user);
      await this.loadUsers();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ createError: msg });
    }
  }

  async updateUser(user) {
    try {
      await this.userRepository.set(user);
      await this.loadUsers();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ updateError: msg });
    }
  }

  async deleteUser(id) {
    try {
      await this.userRepository.remove(id);
      await this.loadUsers();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ updateError: msg });
    }
  }
}

export default Users;
