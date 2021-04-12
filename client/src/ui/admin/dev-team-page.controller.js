/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { TeamRepository } from '../../repository/team.repository.mjs';
import { setSelected } from './table.mjs';

export class DevTeamPageController {
  constructor() {
    this.devTeamRepository = new TeamRepository();
  }

  get devTeamForCreate() {
    return {
      code: parseInt(document.getElementById('devCreateCodeInput').value),
      name: document.getElementById('devCreateNameInput').value,
      languages: parseString(document.getElementById('devCreateLanguagesInput').value),
      tech: parseString(document.getElementById('devCreateTechInput').value)
    };
  }

  get devTeamForUpdate() {
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
            .addEventListener('submit', e => this.onCreateDevTeamSubmit(e));
    document.getElementById('developerUpdateForm')
            .addEventListener('submit', e => this.onUpdateDevTeamSubmit(e));
    document.getElementById('developerDeleteBtn')
            .addEventListener('click', () => this.onDevTeamDelete());
    document.getElementById('addNewDevBtn')
            .addEventListener('click', () => this.onAddNewDevTeamButtonClick());
  }

  async resume() {
    const createEl = document.getElementById('developerCreateContainer');
    const updateEl = document.getElementById('developerUpdateContainer');

    this.reset();
    createEl.classList.add('gone');
    updateEl.classList.add('gone');

    try {
      const devTeam = await this.devTeamRepository.getAll();

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

  onLoad(devTeam) {
    const bodyEl = document.querySelector('#developerListContainer tbody');
    const ctx = this;

    bodyEl.innerHTML = '';

    devTeam.forEach(dev => {
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
      const dev = await ctx.devTeamRepository.get(devCode);

      setSelected(rowEl);
      ctx.onUpdateDev(dev);
    }
  }

  onAddNewDevTeamButtonClick() {
    document.getElementById('developerCreateContainer').classList.remove('gone');
    document.getElementById('developerUpdateContainer').classList.add('gone');
  }

  async onCreateDevTeamSubmit(e) {
    e.preventDefault();
    const devTeam = this.devTeamForCreate;

    try {
      await this.devTeamRepository.add(devTeam);

      await this.resume();
    }
    catch (e) {
      document.getElementById('devCreateError').innerText = e;
    }
  }

  async onUpdateDevTeamSubmit(e) {
    e.preventDefault();
    const devTeam = this.devTeamForUpdate;

    try {
      await this.devTeamRepository.set(devTeam);

      await this.resume();
    }
    catch (e) {
      alert(e);
    }
  }

  async onDevTeamDelete() {
    const id = parseInt(document.getElementById('devUpdateCodeInput').value);

    try {
      await this.devTeamRepository.remove(id);

      await this.resume();
    }
    catch (e) {
      alert(e);
    }
  }

  onUpdateDev(dev) {
    const createEl = document.getElementById('developerCreateContainer');
    const updateEl = document.getElementById('developerUpdateContainer');
    console.log(dev);
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

    document.getElementById('devUpdateCodeInput').value = '';
    document.getElementById('devUpdateNameInput').value = '';
    document.getElementById('devUpdateLanguagesInput').value = '';
    document.getElementById('devUpdateTechInput').value = '';
  }
}

function parseString(str) {
  return str.split(',').map(v => v.trim());
}

function parseArray(array) {
  return array.reduce((acc, cur) => acc + ', ' + cur);
}
