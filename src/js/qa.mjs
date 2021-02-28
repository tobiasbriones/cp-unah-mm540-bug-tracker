/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository, SoftwareProjectRepository } from './repository.mjs';

const projectRepository = new SoftwareProjectRepository();
const bugRepository = new BugRepository();
let currentProject = null;

init();

function init() {
  document.getElementById('projectSelect').addEventListener('change', onProjectSelectChange);
  initProjectsSelect();
}

function initProjectsSelect() {
  const projects = projectRepository.getAll();
  const el = document.getElementById('projectSelect');

  projects.forEach(project => {
    const opEl = document.createElement('option');

    opEl.setAttribute('value', project.code);
    opEl.innerText = project.name;
    el.appendChild(opEl);
  });
}

function onProjectSelectChange() {
  const el = document.getElementById('projectSelect');
  const projectCode = parseInt(el.options[el.selectedIndex].value);

  if (!isNaN(projectCode)) {
    setProject(projectCode);
  }
}

function setProject(projectCode) {
  currentProject = projectRepository.get(projectCode);
  const bugs = bugRepository.getByProject(currentProject.code);
  const bodyEl = document.querySelector('#bugs table tbody');
  const addRow = bug => {
    const rowEl = document.createElement('tr');
    const thEl = document.createElement('th');
    const descriptionEl = document.createElement('td');
    const stateEl = document.createElement('td');
    const priorityEl = document.createElement('td');
    const finishDateEl = document.createElement('td');

    thEl.setAttribute('scope', 'row');
    thEl.innerText = bug.code;

    descriptionEl.innerText = bug.description;
    stateEl.innerText = bug.state;
    priorityEl.innerText = bug.priority;
    finishDateEl.innerText = bug.finishDate;

    rowEl.appendChild(thEl);
    rowEl.appendChild(descriptionEl);
    rowEl.appendChild(stateEl);
    rowEl.appendChild(priorityEl);
    rowEl.appendChild(finishDateEl);
    bodyEl.appendChild(rowEl);
  };

  bodyEl.innerHTML = '';
  bugs.forEach(b => addRow(b));
}
