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

import './Users.css';
import React from 'react';
import Crud from '../../../crud/Crud';
import { getErrorMessage } from '../../../crud/errors';
import { UserRepository } from '../../../model/user/user.repository.mjs';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      createError: '',
      updateError: ''
    };
    this.userRepository = new UserRepository();
    this.crudRef = React.createRef();
  }

  get displayClass() {
    return this.props.visiblePage === 'users' ? '' : 'd-none';
  }

  render() {
    const commonInputs = [
      {
        name: 'full_name',
        type: 'text',
        label: 'Nombre Completo',
        placeholder: 'Nombre Completo',
        value: ''
      },
      {
        name: 'login',
        type: 'text',
        label: 'Login',
        placeholder: 'Login',
        smallText: 'Nombre de usuario para iniciar sesión',
        value: ''
      },
      {
        name: 'role',
        type: 'select',
        label: 'Role',
        options: [
          {
            value: 'admin',
            label: 'Administrador'
          },
          {
            value: 'dev',
            label: 'Desarrollador'
          },
          {
            value: 'qa',
            label: 'QA'
          }
        ],
        value: 'admin'
      }
    ];
    const readAllTable = {
      cols: [
        {
          name: 'id',
          value: 'Id de Usuario'
        },
        {
          name: 'full_name',
          value: 'Nombre Completo'
        },
        {
          name: 'login',
          value: 'Login'
        },
        {
          name: 'role',
          value: 'Rol'
        }
      ],
      items: this.state.values
    };
    const createForm = {
      title: 'Crear Usuario',
      error: this.state.createError,
      inputs: [
        ...commonInputs,
        {
          name: 'password',
          type: 'password',
          label: 'Contraseña',
          placeholder: 'Contraseña',
          value: ''
        }
      ]
    };
    const updateForm = {
      title: 'Actualizar Usuario',
      error: this.state.updateError,
      inputs: [
        {
          isId: true,
          name: 'id',
          type: 'number',
          label: 'Id de Usuario',
          value: -1
        },
        ...commonInputs
      ]
    };

    return (
      <div className={ `row page ${ this.displayClass }` }>
        <Crud
          name="users"
          title="Usuarios"
          readAllTable={ readAllTable }
          createForm={ createForm }
          updateForm={ updateForm }
          onCreate={ this.onCreate.bind(this) }
          onUpdate={ this.onUpdate.bind(this) }
          onDelete={ this.onDelete.bind(this) }
          ref={ this.crudRef }
        />
      </div>
    );
  }

  async componentDidMount() {
    await this.loadUsers();
  }

  async onCreate(user) {
    try {
      await this.userRepository.add(user);
      await this.loadUsers();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ createError: msg });
    }
  }

  async onUpdate(user) {
    try {
      await this.userRepository.set(user);
      await this.loadUsers();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async onDelete(user) {
    const { id } = user;
    await this.deleteUser(id);
  }

  async loadUsers() {
    try {
      const users = await this.userRepository.getAll();
      this.setState({
        values: users,
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = getErrorMessage(e);
      alert(msg);
    }
  }

  async deleteUser(id) {
    try {
      await this.userRepository.remove(id);
      await this.loadUsers();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }
}

export default Users;
