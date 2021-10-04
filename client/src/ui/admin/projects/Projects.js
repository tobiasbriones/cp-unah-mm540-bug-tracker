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

import React from 'react';
import Crud from '../../../crud/Crud';
import { ProjectRepository } from '../../../model/project/project.repository.mjs';
import { getErrorMessage } from '../../../crud/errors';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      createError: '',
      updateError: ''
    };
    this.projectRepository = new ProjectRepository();
    this.crudRef = React.createRef();
  }

  get displayClass() {
    return this.props.visiblePage === 'projects' ? '' : 'd-none';
  }

  render() {
    const commonInputs = [
      {
        name: 'name',
        type: 'text',
        label: 'Nombre',
        placeholder: 'Nombre del proyecto',
        value: ''
      },
      {
        name: 'startDate',
        type: 'date',
        label: 'Fecha de Inicio',
        placeholder: 'Fecha de Inicio',
        value: ''
      },
      {
        name: 'endDate',
        type: 'date',
        label: 'Fecha de Finalización',
        placeholder: 'Fecha de Finalización',
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
          name: 'startDate',
          value: 'Fecha de Inicio'
        },
        {
          name: 'endDate',
          value: 'Fecha de Finalización'
        }
      ],
      items: this.state.values
    };
    const createForm = {
      title: 'Crear Proyecto',
      error: this.state.createError,
      inputs: commonInputs
    };
    const updateForm = {
      title: 'Actualizar Proyecto',
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
      <div className={ `row page ${ this.displayClass }` }>
        <Crud
          name="projects"
          title="Proyectos"
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
    await this.loadProjects();
  }

  async onCreate(project) {
    try {
      await this.projectRepository.add(project);
      await this.loadProjects();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ createError: msg });
    }
  }

  async onUpdate(project) {
    try {
      await this.projectRepository.set(project);
      await this.loadProjects();
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
      await this.projectRepository.remove(code);
      await this.loadProjects();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async loadProjects() {
    try {
      const projects = (await this.projectRepository.getAll()).map(this.fixDate);
      this.setState({
        values: projects,
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = getErrorMessage(e);
      alert(msg);
    }
  }

  fixDate(project) {
    project.startDate = project.startDate.substring(0, 10);
    project.endDate = project.endDate.substring(0, 10);
    return project;
  }
}

export default Projects;
