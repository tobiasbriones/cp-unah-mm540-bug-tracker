/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectRepository } from '../../repository/project.repository.mjs';
import { DevTeamRepository } from '../../repository/dev-team.repository.mjs';
import { setSelected } from './table.mjs';

export class ProjectPageController {
  constructor() {
    this.projectRepository = new ProjectRepository();
    this.devTeamRepository = new DevTeamRepository();
  }

  get projectForCreate() {
    return {
      code: parseInt(document.getElementById('projectCreateCodeInput').value),
      name: document.getElementById('projectCreateNameInput').value,
      startDate: document.getElementById('projectCreateStartDateInput').value,
      endDate: document.getElementById('projectCreateEndDateInput').value
    };
  }

  get projectForUpdate() {
    return {
      code: parseInt(document.getElementById('projectUpdateCodeInput').value),
      name: document.getElementById('projectUpdateNameInput').value,
      startDate: document.getElementById('projectUpdateStartDateInput').value,
      endDate: document.getElementById('projectUpdateEndDateInput').value
    };
  }

  init() {
    this.pageEl = document.getElementById('projectsPage');

    document.getElementById('addNewProjectBtn')
            .addEventListener('click', () => this.onAddNewProjectButtonClick());
    document.getElementById('projectCreateForm')
            .addEventListener('submit', e => this.onProjectCreateSubmit(e));
    document.getElementById('projectUpdateForm')
            .addEventListener('submit', e => this.onProjectUpdateSubmit(e));
    document.getElementById('projectDeleteBtn')
            .addEventListener('click', () => this.onProjectDelete());

  }

  async resume() {
    const createEl = document.getElementById('projectCreateContainer');
    const updateEl = document.getElementById('projectUpdateContainer');

    this.reset();
    createEl.classList.add('gone');
    updateEl.classList.add('gone');

    try {
      const projects = await this.projectRepository.getAll();

      this.onLoad(projects);
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

  onLoad(projects) {
    const bodyEl = document.querySelector('#projectListContainer tbody');
    const ctx = this;

    bodyEl.innerHTML = '';

    projects.forEach(project => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const nameEl = document.createElement('td');
      const startDateEl = document.createElement('td');
      const endDateEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = project.code;

      nameEl.innerText = project.name;
      startDateEl.innerText = project.startDate;
      endDateEl.innerText = project.endDate;

      rowEl.dataset.code = project.code;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(startDateEl);
      rowEl.appendChild(endDateEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });

    function onItemClick(e) {
      const rowEl = e.target.parentElement;
      const projectCode = parseInt(rowEl.dataset.code);
      const project = ctx.devTeamRepository.get(projectCode);

      setSelected(rowEl);
      ctx.onUpdateProject(project);
    }
  }

  async onProjectCreateSubmit(e) {
    e.preventDefault();
    const project = this.projectForCreate;

    try {
      await this.projectRepository.add(project);

      await this.resume();
    }
    catch (e) {
      alert(e);
    }
  }

  async onProjectUpdateSubmit(e) {
    e.preventDefault();
    const project = this.projectForUpdate;

    try {
      await this.projectRepository.add(project);

      await this.resume();
    }
    catch (e) {
      alert(e);
    }
  }

  async onProjectDelete() {
    const project = this.projectForUpdate;

    try {
      await this.projectRepository.remove(project.code);

      await this.resume();
    }
    catch (e) {
      alert(e);
    }
  }

  onUpdateProject(project) {
    const createEl = document.getElementById('projectCreateContainer');
    const updateEl = document.getElementById('projectUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.remove('gone');
    document.getElementById('projectUpdateCodeInput').value = project.code;
    document.getElementById('projectUpdateNameInput').value = project.name;
    document.getElementById('projectUpdateStartDateInput').value = project.startDate;
    document.getElementById('projectUpdateEndDateInput').value = project.endDate;
  }

  onAddNewProjectButtonClick() {
    document.getElementById('projectCreateContainer').classList.remove('gone');
    document.getElementById('projectUpdateContainer').classList.add('gone');
  }

  reset() {
    document.getElementById('projectUpdateCodeInput').value = '';
    document.getElementById('projectUpdateNameInput').value = '';
    document.getElementById('projectUpdateStartDateInput').value = '';
    document.getElementById('projectUpdateEndDateInput').value = '';
  }
}
