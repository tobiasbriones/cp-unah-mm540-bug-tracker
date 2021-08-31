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
import { getCreateForm, getTable, getUpdateForm } from '../../../crud';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: '',
      values: [],
      createFormDisplayClass: 'd-none',
      updateFormDisplayClass: 'd-none',
      createError: '',
      createName: '',
      createLanguages: '',
      createTech: '',
      updateError: '',
      updateCode: '',
      updateName: '',
      updateLanguages: '',
      updateTech: ''
    };
    this.teamRepository = new TeamRepository();
  }

  render() {
    const getTeamRow = team => {
      return (
        <tr key={ team.code } data-key={ team.code } onClick={ this.onTeamRowClick.bind(this) }>
          <th scope="col">{ team.code }</th>
          <th scope="col">{ team.name }</th>
          <th scope="col">{ team.languages }</th>
          <th scope="col">{ team.tech }</th>
        </tr>
      );
    };

    const getCreateGroups = () => {
      return [
        (
          <div className="form-group" key="createName">
            <label htmlFor="userCreateNameInput">Nombre</label>
            <input id="userCreateNameInput"
                   className="form-control"
                   type="text"
                   placeholder="Nombre"
                   onChange={ this.onCreateNameChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="createLogin">
            <label htmlFor="userCreateLoginInput">Languages</label>
            <input id="userCreateLoginInput"
                   className="form-control"
                   type="text"
                   placeholder="Languages"
                   onChange={ this.onCreateLanguagesChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="createLogin">
            <label htmlFor="userCreateLoginInput">Tecnologías</label>
            <input id="userCreateLoginInput"
                   className="form-control"
                   type="text"
                   placeholder="Lenguajes"
                   onChange={ this.onCreateTechChange.bind(this) } />
          </div>
        )
      ];
    };

    const getUpdateGroups = () => {
      return [
        (
          <div className="form-group" key="updateId">
            <label htmlFor="userUpdateIdInput">Código</label>
            <input id="userUpdateIdInput"
                   className="form-control"
                   type="number"
                   disabled
                   aria-describedby="userUpdateIdHelp"
                   value={ this.state.updateCode } />
          </div>
        ),
        (
          <div className="form-group" key="updateName">
            <label htmlFor="userUpdateNameInput">Nombre</label>
            <input id="userUpdateNameInput"
                   className="form-control"
                   type="text"
                   placeholder="Nombre"
                   value={ this.state.updateName }
                   onChange={ this.onUpdateNameChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="updateLogin">
            <label htmlFor="userUpdateLoginInput">Lenguajes</label>
            <input id="userUpdateLoginInput" className="form-control" type="text"
                   placeholder="Lenguajes"
                   value={ this.state.updateLanguages }
                   onChange={ this.onUpdateLanguagesChange.bind(this) } />
          </div>
        ),
        (
          <div className="form-group" key="updateLogin">
            <label htmlFor="userUpdateLoginInput">Tecnologías</label>
            <input id="userUpdateLoginInput" className="form-control" type="text"
                   placeholder="Lenguajes"
                   value={ this.state.updateTech }
                   onChange={ this.onUpdateTechChange.bind(this) } />
          </div>
        )
      ];
    };

    const teams = getTable({
      ctx: this,
      title: 'Equipos de Desarrollo',
      cols: ['Código', 'Nombre', 'Lenguajes', 'Tecnologías'],
      getRow: getTeamRow
    });
    const create = getCreateForm({
      ctx: this,
      title: 'Crear equipo',
      groups: getCreateGroups()
    });
    const update = getUpdateForm({
      ctx: this,
      title: 'Actualizar equipo',
      groups: getUpdateGroups()
    });
    return (
      <div className={ `row page ${ this.state.displayClass }` }>
        { teams }
        { create }
        { update }
      </div>
    );
  }

  async onPageShowed() {
    await this.loadTeams();
  }

  onAddButtonClick() {
    const value = this.state.createFormDisplayClass ? '' : 'd-none';
    this.setState({ createFormDisplayClass: value, updateFormDisplayClass: 'd-none' });
  }

  async onTeamRowClick(e) {
    const id = e.target.parentElement.getAttribute('data-key');
    const team = await this.teamRepository.get(id);
    this.setState({
      updateFormDisplayClass: '',
      createFormDisplayClass: 'd-none',
      updateCode: team.code,
      updateName: team.name,
      updateLanguages: team.languages,
      updateTech: team.tech
    });
  }

  onCreateNameChange(e) {
    this.setState({ createName: e.target.value });
  }

  onCreateLanguagesChange(e) {
    this.setState({ createLanguages: e.target.value });
  }

  onCreateTechChange(e) {
    this.setState({ createTech: e.target.value });
  }

  onUpdateNameChange(e) {
    this.setState({ updateName: e.target.value });
  }

  onUpdateLanguagesChange(e) {
    this.setState({ updateLanguages: e.target.value });
  }

  onUpdateTechChange(e) {
    this.setState({ updateTech: e.target.value });
  }

  async onCreateFormSubmit(e) {
    e.preventDefault();
    const team = {
      name: this.state.createName,
      languages: this.state.createLanguages,
      tech: this.state.createTech
    };
    await this.createTeam(team);
  }

  async onUpdateFormSubmit(e) {
    e.preventDefault();
    const team = {
      code: this.state.updateCode,
      name: this.state.updateName,
      languages: this.state.updateLanguages,
      tech: this.state.updateTech
    };
    await this.updateTeam(team);
  }

  async onDelete() {
    const code = this.state.updateCode;
    await this.deleteTeam(code);
  }

  async loadTeams() {
    try {
      const teams = await this.teamRepository.getAll();
      this.setState({
        values: teams,
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

  async createTeam(team) {
    try {
      await this.teamRepository.add(team);
      await this.loadTeams();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ createError: msg });
    }
  }

  async updateTeam(team) {
    try {
      await this.teamRepository.set(team);
      await this.loadTeams();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ updateError: msg });
    }
  }

  async deleteTeam(id) {
    try {
      await this.teamRepository.remove(id);
      await this.loadTeams();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      this.setState({ updateError: msg });
    }
  }
}

export default Teams;
