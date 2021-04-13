/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import '../bootstrap/bootstrap.min.css';
import '../default.css';
import './qa.html';
import './qa.css';
import { BugRepository } from '../../repository.mjs';
import { ProjectRepository } from '../../repository/project.repository.mjs';
import { setSelected } from '../admin/table.mjs';

const projectRepository = new ProjectRepository();
const bugRepository = new BugRepository();
let currentProject = null;

init();

function init() {
  document.querySelector('header > h2').addEventListener('click', onHeaderClick);
  document.getElementById('projectSelect').addEventListener('change', onProjectSelectChange);
  initProjectsSelect();
}

function initProjectsSelect() {
  projectRepository.getAll().then(onLoad);
}

function onHeaderClick() {
  window.location.href = './index.html';
}

function onLoad(projects) {
  const el = document.getElementById('projectSelect');

  projects.forEach(project => {
    const opEl = document.createElement('option');

    opEl.setAttribute('value', project.code);
    opEl.innerText = project.name;
    el.appendChild(opEl);
  });
}

async function onProjectSelectChange() {
  const el = document.getElementById('projectSelect');
  const projectCode = parseInt(el.options[el.selectedIndex].value);

  if (isNaN(projectCode)) {
    document.querySelector('#bugs table tbody').innerHTML = '';
    document.getElementById('assignedDevelopers').innerHTML = '';
  }
  else {
    await setProject(projectCode);
  }
}

async function setProject(projectCode) {
  currentProject = await projectRepository.get(projectCode);
  const bugs = bugRepository.getByProject(currentProject.code);
  const bodyEl = document.querySelector('#bugs table tbody');
  const devEl = document.getElementById('assignedDevelopers');
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

    rowEl.dataset.code = bug.code;
    rowEl.appendChild(thEl);
    rowEl.appendChild(descriptionEl);
    rowEl.appendChild(stateEl);
    rowEl.appendChild(priorityEl);
    rowEl.appendChild(finishDateEl);
    bodyEl.appendChild(rowEl);

    rowEl.addEventListener('click', onItemClick);
  };

  bodyEl.innerHTML = '';
  devEl.innerHTML = '';
  bugs.forEach(b => addRow(b));

  function onItemClick(e) {
    const rowEl = e.target.parentElement;
    const bugCode = parseInt(rowEl.dataset.code);
    const bug = bugRepository.get(bugCode);
    const developers = bug.developers;

    setSelected(rowEl);
    devEl.innerHTML = '';
    developers.forEach(dev => {
      const liEl = document.createElement('li');

      liEl.classList.add('list-group-item');
      liEl.innerText = dev.name;
      devEl.appendChild(liEl);
    });
  }
}
