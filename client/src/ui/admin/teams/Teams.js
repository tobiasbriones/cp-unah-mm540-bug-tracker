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

import './Teams.css';
import React from 'react';
import { TeamRepository } from '../../../model/team/team.repository.mjs';
import Crud from '../../../crud/Crud';
import { getErrorMessage } from '../../../crud/errors';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: '',
      values: [],
      createError: '',
      updateError: ''
    };
    this.teamRepository = new TeamRepository();
    this.crudRef = React.createRef();
  }

  render() {
    const commonInputs = [
      {
        name: 'name',
        type: 'text',
        label: 'Nombre',
        placeholder: 'Nombre del equipo',
        value: ''
      },
      {
        name: 'languages',
        type: 'text',
        label: 'Lenguajes de programación',
        placeholder: 'Lenguajes de programación',
        smallText: 'Ingresa cada item separado por comas',
        value: ''
      },
      {
        name: 'tech',
        type: 'text',
        label: 'Tecnologías',
        placeholder: 'Tecnologías',
        smallText: 'Ingresa cada item separado por comas',
        value: ''
      }
    ];
    const readAllTable = {
      cols: [
        {
          name: 'code',
          value: 'Código'
        },
        {
          name: 'name',
          value: 'Nombre'
        },
        {
          name: 'languages',
          value: 'Lenguajes'
        },
        {
          name: 'tech',
          value: 'Tecnologías'
        }
      ],
      items: this.state.values
    };
    const createForm = {
      title: 'Crear Equipo',
      error: this.state.createError,
      inputs: [...commonInputs]
    };
    const updateForm = {
      title: 'Actualizar Equipo',
      error: this.state.updateError,
      inputs: [
        {
          isId: true,
          name: 'code',
          type: 'number',
          label: 'Código',
          value: -1
        },
        ...commonInputs
      ]
    };

    return (
      <div className={ `row page ${ this.state.displayClass }` }>
        <Crud
          name="teams"
          title="Desarrolladores"
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
    await this.loadTeams();
  }

  async onCreate(team) {
    this.fix(team);

    try {
      await this.teamRepository.add(team);
      await this.loadTeams();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ createError: msg });
    }
  }

  async onUpdate(team) {
    this.fix(team);

    try {
      await this.teamRepository.set(team);
      await this.loadTeams();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async onDelete(team) {
    const { code } = team;

    try {
      await this.teamRepository.remove(code);
      await this.loadTeams();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async loadTeams() {
    try {
      const teams = await this.teamRepository.getAll();
      this.setState({
        values: teams,
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = getErrorMessage(e);
      alert(msg);
    }
  }

  fix(team) {
    if (
      !team.languages ||
      !team.languages.split ||
      !team.tech ||
      !team.tech.split
    ) {
      return;
    }
    const languages = team.languages.split(',').map(s => s.trim());
    const tech = team.tech.split(',').map(s => s.trim());
    team.languages = languages;
    team.tech = tech;
  }
}

export default Teams;
