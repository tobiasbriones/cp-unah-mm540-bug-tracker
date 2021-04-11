/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository, DevTeamRepository, SoftwareProjectRepository } from '../js/repository.mjs';
import 'bootstrap';
import '../css/bootstrap.min.css';
import './developer.html';
import '../css/default.css';
import '../admin/admin.css';

const devRepository = new DevTeamRepository();
const projectRepository = new SoftwareProjectRepository();
const bugRepository = new BugRepository();
const devs = devRepository.getAll();
let currentDev = null;

init();

function init() {
  document.querySelector('header > h2').addEventListener('click', onHeaderClick);
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

function onHeaderClick() {
  window.location.href = './index.html';
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
  const projects = projectRepository.getByDeveloper(devCode);

  emptyEl.classList.remove('visible');
  emptyEl.classList.add('invisible');
  panelEl.classList.remove('invisible');
  panelEl.classList.add('visible');
  setProjects(projects);
  setBugs();
}

function setProjects(projects) {
  const bodyEl = document.querySelector('#swProjects table tbody');
  const addRow = p => {
    const rowEl = document.createElement('tr');
    const thEl = document.createElement('th');
    const nameEl = document.createElement('td');
    const startDateEl = document.createElement('td');
    const endDateEl = document.createElement('td');

    thEl.setAttribute('scope', 'row');
    thEl.innerText = p.code;

    nameEl.innerText = p.name;
    startDateEl.innerText = p.startDate;
    endDateEl.innerText = p.endDate;

    rowEl.appendChild(thEl);
    rowEl.appendChild(nameEl);
    rowEl.appendChild(startDateEl);
    rowEl.appendChild(endDateEl);
    bodyEl.appendChild(rowEl);
  };

  bodyEl.innerHTML = '';
  projects.forEach(p => addRow(p));
}

function setBugs() {
  const bugsEl = document.querySelector('#bugList');
  const bugs = bugRepository.getByDeveloper(currentDev.code);
  const addRow = bug => {
    const text = `#${ bug.code } - ${ bug.description }`;
    const labelEl = document.createElement('label');
    const inputEl = document.createElement('input');
    const textNode = document.createTextNode(text);

    inputEl.classList.add('form-check-input');
    inputEl.classList.add('me-1');
    inputEl.dataset.code = bug.code;
    inputEl.setAttribute('type', 'checkbox');
    inputEl.addEventListener('change', onItemClick);

    labelEl.classList.add('list-group-item');
    labelEl.appendChild(inputEl);
    labelEl.appendChild(textNode);
    if (bug.state === 'Finished') {
      setFinished(labelEl);
    }
    else {
      setUnfinished(labelEl);
    }

    bugsEl.appendChild(labelEl);
  };

  bugsEl.innerHTML = '';
  bugs.forEach(b => addRow(b));

  function onItemClick(e) {
    const el = e.target;
    const isChecked = el.checked;
    const parentEl = el.parentElement;
    const code = parseInt(el.dataset.code);
    const bug = bugRepository.get(code);

    if (isChecked) {
      setFinished(parentEl);
      bug.state = 'Finished';
      bug.finishDate = new Date(Date.now()).toDateString();
    }
    else {
      setUnfinished(parentEl);
      bug.state = 'Assigned';
    }
    bugRepository.set(bug);
  }

  function setUnfinished(labelEl) {
    const checkboxEl = labelEl.querySelector('input');

    checkboxEl.checked = false;
    labelEl.classList.remove('list-group-item-secondary');
  }

  function setFinished(labelEl) {
    const checkboxEl = labelEl.querySelector('input');

    checkboxEl.checked = true;
    labelEl.classList.add('list-group-item-secondary');
  }
}

function setEmptyPage() {
  const emptyEl = document.getElementById('empty');
  const panelEl = document.getElementById('panel');

  emptyEl.classList.remove('invisible');
  emptyEl.classList.add('visible');
  panelEl.classList.remove('visible');
  panelEl.classList.add('invisible');
}
