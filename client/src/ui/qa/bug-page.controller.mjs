/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository } from '../../repository/bug.repository.mjs';
import { ProjectRepository } from '../../repository/project.repository.mjs';

export class BugPageController {
  constructor() {
    this.pageEl = document.getElementById('bugsPage');
    this.bugRepository = new BugRepository();
    this.projectRepository = new ProjectRepository();
  }

  get bugForCreate() {
    return {
      code: parseInt(document.getElementById('bugCreateIdInput').value),
      description: document.getElementById('bugCreateDescriptionInput').value,
      priority: document.getElementById('bugCreatePriorityInput').value,
      state: document.getElementById('bugCreateStateInput').value
    };
  }

  init() {
    document.getElementById('bugCreateForm')
            .addEventListener('submit', e => this.onCreateBugSubmit(e));

    document.getElementById('addNewBugBtn')
            .addEventListener('click', () => this.onAddNewBugButtonClick());

  }

  async resume() {
    const createEl = document.getElementById('bugCreateContainer');

    createEl.classList.add('gone');
    try {
      const bugs = await this.bugRepository.getAll();

      await this.onLoad(bugs);
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

  async onLoad(bugs) {
    const bodyEl = document.querySelector('#bugListContainer tbody');
    const projects = await this.projectRepository.getAll();

    bodyEl.innerHTML = '';

    bugs.forEach(bug => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const descriptionEl = document.createElement('td');
      const priorityEl = document.createElement('td');
      const stateEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = bug.code;

      descriptionEl.innerText = bug.description;
      priorityEl.innerText = bug.priority;
      stateEl.innerText = bug.state;

      rowEl.dataset.code = bug.code;
      rowEl.appendChild(thEl);
      rowEl.appendChild(descriptionEl);
      rowEl.appendChild(priorityEl);
      rowEl.appendChild(stateEl);
      bodyEl.appendChild(rowEl);
    });

    const selectEl = document.getElementById('bugCreateProjectInput');
    const noneEl = document.createElement('option');

    selectEl.innerHTML = '';
    noneEl.value = 'none';
    noneEl.innerText = 'Seleccionar el proyecto';
    selectEl.appendChild(noneEl);

    projects.forEach(project => {
      const noneEl = document.createElement('option');

      noneEl.value = project.code;
      noneEl.innerText = project.name;
      selectEl.appendChild(noneEl);
    });
  }

  async onCreateBugSubmit(e) {
    e.preventDefault();
    const bug = this.bugForCreate;
    let projectCode = document.getElementById('bugCreateProjectInput').value;

    if (isNaN(projectCode)) {
      return;
    }
    projectCode = parseInt(projectCode);

    try {
      await this.bugRepository.add(bug);
      await this.projectRepository.assignBug(projectCode, bug.code);
      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('bugCreateError').innerText = msg;
    }
  }

  onAddNewBugButtonClick() {
    document.getElementById('bugCreateContainer').classList.remove('gone');
  }
}
