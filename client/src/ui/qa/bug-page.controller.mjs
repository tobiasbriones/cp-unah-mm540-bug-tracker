/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository } from '../../repository/bug.repository.mjs';

export class BugPageController {
  constructor() {
    this.pageEl = document.getElementById('bugsPage');
    this.bugRepository = new BugRepository();
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

      this.onLoad(bugs);
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

  onLoad(bugs) {
    const bodyEl = document.querySelector('#bugListContainer tbody');
    const ctx = this;

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
  }

  async onCreateBugSubmit(e) {
    e.preventDefault();
    const bug = this.bugForCreate;

    try {
      await this.bugRepository.add(bug);

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
