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
import { getErrorMessage } from '../../../crud/errors';
import { BugRepository } from '../../../model/bug/bug.repository.mjs';
import { ProjectRepository } from '../../../model/project/project.repository.mjs';

class Bugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: '',
      values: [],
      projects: [],
      createError: '',
      updateError: ''
    };
    this.repository = new BugRepository();
    this.projectRepository = new ProjectRepository();
    this.crudRef = React.createRef();
  }

  get displayClass() {
    return this.props.visiblePage === 'bugs' ? '' : 'd-none';
  }

  render() {
    const commonInputs = [
      {
        name: 'description',
        type: 'text',
        label: 'Descripción',
        placeholder: 'Descripción',
        value: ''
      },
      {
        name: 'priority',
        type: 'select',
        label: 'Prioridad',
        options: [
          {
            value: '1',
            label: 'Muy baja'
          },
          {
            value: '2',
            label: 'Baja'
          },
          {
            value: '3',
            label: 'Normal'
          },
          {
            value: '4',
            label: 'Alta'
          },
          {
            value: '5',
            label: 'Muy alta'
          }
        ],
        value: '3'
      },
      {
        name: 'projectCode',
        type: 'select',
        label: 'Proyecto',
        options: this.state.projects,
        value: '-1'
      }
    ];
    const readAllTable = {
      cols: [
        {
          name: 'code',
          value: 'Código'
        },
        {
          name: 'description',
          value: 'Descripción'
        },
        {
          name: 'priority',
          value: 'Prioridad'
        },
        {
          name: 'state',
          value: 'Estado'
        }
      ],
      items: this.state.values
    };
    const createForm = {
      title: 'Crear Bug',
      error: this.state.createError,
      inputs: commonInputs
    };
    const updateForm = {
      title: 'Actualizar Bug',
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
          name="bugs"
          title="Bugs"
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
    await this.load();
  }

  async onCreate(bug) {
    try {
      await this.repository.add(bug);
      await this.loadBugs();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ createError: msg });
    }
  }

  async onUpdate(bug) {
    try {
      await this.repository.set(bug);
      await this.loadBugs();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async onDelete(bug) {
    const { code } = bug;
    await this.deleteBug(code);
  }

  async deleteBug(code) {
    try {
      await this.repository.remove(code);
      await this.loadBugs();
      this.crudRef.current.collapse();
    }
    catch (e) {
      const msg = getErrorMessage(e);
      this.setState({ updateError: msg });
    }
  }

  async load() {
    await this.loadBugs();
    await this.loadProjects();
  }

  async loadBugs() {
    const flatten = bug => {
      const project = bug.project || {};
      const projectCode = project.code || -1;
      return ({ ...bug, projectCode: projectCode });
    };

    try {
      const bugs = await this.repository.getAll();
      const flattenedBugs = bugs.map(flatten);

      this.setState({
        values: flattenedBugs,
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = getErrorMessage(e);
      alert(msg);
    }
  }

  async loadProjects() {
    const noProject = { value: -1, label: 'Seleccionar un proyecto' };
    const mapProject = project => ({
      value: project.code,
      label: project.name
    });

    try {
      const projectList = await this.projectRepository.getAll();
      const projects = [noProject, ...projectList.map(mapProject)];

      this.setState({
        projects: projects,
        createError: '',
        updateError: ''
      });
    }
    catch (e) {
      const msg = getErrorMessage(e);
      alert(msg);
    }
  }
}

export default Bugs;
