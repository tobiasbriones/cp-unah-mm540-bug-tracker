/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { DevTeamRepository } from './repository.mjs';

const devRepository = new DevTeamRepository();
const devs = devRepository.getAll();
let currentDev = null;

init();

function init() {
  document.getElementById('devSelect').addEventListener('change', onDevSelectChange);
  initDeveloperSelect();
}

function initDeveloperSelect() {
  const el = document.getElementById('devSelect');

  devs.forEach(dev => {
    const opEl = document.createElement('option');

    opEl.setAttribute('value', dev.code);
    opEl.innerText = dev.name;
    el.appendChild(opEl);
  });
}

function onDevSelectChange() {
  const el = document.getElementById('devSelect');
  const devCode = parseInt(el.options[el.selectedIndex].value);

  if (isNaN(devCode)) {
    setEmptyPage();
  }
  else {
    setDevPage(devCode);
  }
}

function setDevPage(devCode) {
  currentDev = devRepository.get(devCode);
  const emptyEl = document.getElementById('empty');
  const panelEl = document.getElementById('panel');

  emptyEl.classList.remove('visible');
  emptyEl.classList.add('invisible');
  panelEl.classList.remove('invisible');
  panelEl.classList.add('visible');
}

function setEmptyPage() {
  const emptyEl = document.getElementById('empty');
  const panelEl = document.getElementById('panel');

  emptyEl.classList.remove('invisible');
  emptyEl.classList.add('visible');
  panelEl.classList.remove('visible');
  panelEl.classList.add('invisible');
}
