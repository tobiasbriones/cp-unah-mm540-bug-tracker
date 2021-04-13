/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { ProjectRepository } from '../../repository/project.repository.mjs';
import { TeamRepository } from '../../repository/team.repository.mjs';
import { setSelected } from './table.mjs';

export class ProjectPageController {
  constructor() {
    this.projectRepository = new ProjectRepository();
    this.teamRepository = new TeamRepository();
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
      startDateEl.innerText = toDate(project.startDate);
      endDateEl.innerText = toDate(project.endDate);

      rowEl.dataset.code = project.code;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(startDateEl);
      rowEl.appendChild(endDateEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });

    async function onItemClick(e) {
      const rowEl = e.target.parentElement;
      const projectCode = parseInt(rowEl.dataset.code);
      const project = await ctx.projectRepository.get(projectCode);

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
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('projectCreateError').innerText = msg;
    }
  }

  async onProjectUpdateSubmit(e) {
    e.preventDefault();
    const project = this.projectForUpdate;

    try {
      await this.projectRepository.set(project);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('projectUpdateError').innerText = msg;
    }
  }

  async onProjectDelete() {
    const project = this.projectForUpdate;

    try {
      await this.projectRepository.remove(project.code);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('projectUpdateError').innerText = msg;
    }
  }

  onUpdateProject(project) {
    const createEl = document.getElementById('projectCreateContainer');
    const updateEl = document.getElementById('projectUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.remove('gone');
    document.getElementById('projectUpdateCodeInput').value = project.code;
    document.getElementById('projectUpdateNameInput').value = project.name;
    document.getElementById('projectUpdateStartDateInput').value = toDate(project.startDate);
    document.getElementById('projectUpdateEndDateInput').value = toDate(project.endDate);
  }

  onAddNewProjectButtonClick() {
    document.getElementById('projectCreateContainer').classList.remove('gone');
    document.getElementById('projectUpdateContainer').classList.add('gone');
  }

  reset() {
    document.getElementById('projectCreateCodeInput').value = '';
    document.getElementById('projectCreateNameInput').value = '';
    document.getElementById('projectCreateStartDateInput').value = '';
    document.getElementById('projectCreateEndDateInput').value = '';
    document.getElementById('projectCreateError').value = '';

    document.getElementById('projectUpdateCodeInput').value = '';
    document.getElementById('projectUpdateNameInput').value = '';
    document.getElementById('projectUpdateStartDateInput').value = '';
    document.getElementById('projectUpdateEndDateInput').value = '';
    document.getElementById('projectUpdateError').value = '';
  }
}

function toDate(str) {
  const date = new Date(str);
  return getFormattedDate(date);
}

function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return year + '-' + month + '-' + day;
}
