/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { TeamRepository } from '../../repository/team.repository.mjs';
import { setSelected } from './table.mjs';

export class TeamPageController {
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  get teamForCreate() {
    return {
      code: parseInt(document.getElementById('devCreateCodeInput').value),
      name: document.getElementById('devCreateNameInput').value,
      languages: parseString(document.getElementById('devCreateLanguagesInput').value),
      tech: parseString(document.getElementById('devCreateTechInput').value)
    };
  }

  get teamForUpdate() {
    return {
      code: parseInt(document.getElementById('devUpdateCodeInput').value),
      name: document.getElementById('devUpdateNameInput').value,
      languages: parseString(document.getElementById('devUpdateLanguagesInput').value),
      tech: parseString(document.getElementById('devUpdateTechInput').value)
    };
  }

  init() {
    this.pageEl = document.getElementById('devsPage');

    document.getElementById('developerCreateForm')
            .addEventListener('submit', e => this.onCreateTeamSubmit(e));
    document.getElementById('developerUpdateForm')
            .addEventListener('submit', e => this.onUpdateTeamSubmit(e));
    document.getElementById('developerDeleteBtn')
            .addEventListener('click', () => this.onDevTeamDelete());
    document.getElementById('addNewDevBtn')
            .addEventListener('click', () => this.onAddNewTeamButtonClick());
  }

  async resume() {
    const createEl = document.getElementById('developerCreateContainer');
    const updateEl = document.getElementById('developerUpdateContainer');

    this.reset();
    createEl.classList.add('gone');
    updateEl.classList.add('gone');

    try {
      const devTeam = await this.teamRepository.getAll();

      this.onLoad(devTeam);
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

  onLoad(team) {
    const bodyEl = document.querySelector('#developerListContainer tbody');
    const ctx = this;

    bodyEl.innerHTML = '';

    team.forEach(dev => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const nameEl = document.createElement('td');
      const languagesEl = document.createElement('td');
      const techEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = dev.code;

      nameEl.innerText = dev.name;
      languagesEl.innerText = parseArray(dev.languages);
      techEl.innerText = parseArray(dev.tech);

      rowEl.dataset.code = dev.code;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(languagesEl);
      rowEl.appendChild(techEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });

    async function onItemClick(e) {
      const rowEl = e.target.parentElement;
      const devCode = parseInt(rowEl.dataset.code);
      const dev = await ctx.teamRepository.get(devCode);

      setSelected(rowEl);
      ctx.onUpdateDev(dev);
    }
  }

  onAddNewTeamButtonClick() {
    document.getElementById('developerCreateContainer').classList.remove('gone');
    document.getElementById('developerUpdateContainer').classList.add('gone');
  }

  async onCreateTeamSubmit(e) {
    e.preventDefault();
    const team = this.teamForCreate;

    try {
      await this.teamRepository.add(team);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('devCreateError').innerText = msg;
    }
  }

  async onUpdateTeamSubmit(e) {
    e.preventDefault();
    const team = this.teamForUpdate;

    try {
      await this.teamRepository.set(team);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('devUpdateError').innerText = msg;
    }
  }

  async onDevTeamDelete() {
    const id = parseInt(document.getElementById('devUpdateCodeInput').value);

    try {
      await this.teamRepository.remove(id);

      await this.resume();
    }
    catch (e) {
      const msg = e.response.data ? e.response.data : e;
      document.getElementById('devUpdateError').innerText = msg;
    }
  }

  onUpdateDev(dev) {
    const createEl = document.getElementById('developerCreateContainer');
    const updateEl = document.getElementById('developerUpdateContainer');

    createEl.classList.add('gone');
    updateEl.classList.remove('gone');
    document.getElementById('devUpdateCodeInput').value = dev.code;
    document.getElementById('devUpdateNameInput').value = dev.name;
    document.getElementById('devUpdateLanguagesInput').value = parseArray(dev.languages);
    document.getElementById('devUpdateTechInput').value = parseArray(dev.tech);
  }

  reset() {
    document.getElementById('devCreateCodeInput').value = '';
    document.getElementById('devCreateNameInput').value = '';
    document.getElementById('devCreateLanguagesInput').value = '';
    document.getElementById('devCreateTechInput').value = '';
    document.getElementById('devCreateError').value = '';

    document.getElementById('devUpdateCodeInput').value = '';
    document.getElementById('devUpdateNameInput').value = '';
    document.getElementById('devUpdateLanguagesInput').value = '';
    document.getElementById('devUpdateTechInput').value = '';
    document.getElementById('devUpdateError').value = '';
  }
}

function parseString(str) {
  return str.split(',').map(v => v.trim());
}

function parseArray(array) {
  return array.reduce((acc, cur) => acc + ', ' + cur);
}
