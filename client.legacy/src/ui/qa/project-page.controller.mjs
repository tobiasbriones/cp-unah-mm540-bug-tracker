/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { setSelected } from '../admin/table.mjs';
import { ProjectRepository } from '../../repository/project.repository.mjs';

export class ProjectPageController {
  constructor() {
    this.pageEl = document.getElementById('projectsPage');
    this.projectRepository = new ProjectRepository();
  }

  init() {
    document.getElementById('projectSelect')
            .addEventListener('change', () => this.onProjectSelectChange());

    this.initProjectsSelect();
  }

  resume() {
    this.show();
  }

  show() {
    this.pageEl.classList.remove('gone');
  }

  hide() {
    this.pageEl.classList.add('gone');
  }

  initProjectsSelect() {
    this.projectRepository.getAll().then(this.onLoad);
  }

  onLoad(projects) {
    const el = document.getElementById('projectSelect');

    projects.forEach(project => {
      const opEl = document.createElement('option');

      opEl.setAttribute('value', project.code);
      opEl.innerText = project.name;
      el.appendChild(opEl);
    });
  }

  async onProjectSelectChange() {
    const el = document.getElementById('projectSelect');
    const projectCode = parseInt(el.options[el.selectedIndex].value);

    if (isNaN(projectCode)) {
      document.querySelector('#bugs table tbody').innerHTML = '';
      document.getElementById('assignedDevelopers').innerHTML = '';
    }
    else {
      await this.setProject(projectCode);
    }
  }

  async setProject(projectCode) {
    this.currentProject = await this.projectRepository.get(projectCode);
    const bugs = await this.projectRepository.getAllBugs(this.currentProject.code);
    const teams = await this.projectRepository.getAllTeams(this.currentProject.code);
    const bodyEl = document.querySelector('#bugs table tbody');
    const devEl = document.getElementById('assignedDevelopers');
    const addRow = bug => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const descriptionEl = document.createElement('td');
      const priorityEl = document.createElement('td');
      const stateEl = document.createElement('td');
      const finishDateEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = bug.code;

      descriptionEl.innerText = bug.description;
      priorityEl.innerText = bug.priority;
      stateEl.innerText = bug.state;
      finishDateEl.innerText = bug.finishDate || 'En proceso';

      rowEl.dataset.code = bug.code;
      rowEl.appendChild(thEl);
      rowEl.appendChild(descriptionEl);
      rowEl.appendChild(priorityEl);
      rowEl.appendChild(stateEl);
      rowEl.appendChild(finishDateEl);
      bodyEl.appendChild(rowEl);

      // rowEl.addEventListener('click', onItemClick);
    };

    bodyEl.innerHTML = '';
    devEl.innerHTML = '';
    bugs.forEach(b => addRow(b));

    teams.forEach(dev => {
      const liEl = document.createElement('li');

      liEl.classList.add('list-group-item');
      liEl.innerText = dev.name;
      devEl.appendChild(liEl);
    });
  }
}