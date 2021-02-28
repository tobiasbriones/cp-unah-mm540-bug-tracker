/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { SoftwareProjectRepository } from './repository.mjs';

const projectRepository = new SoftwareProjectRepository();

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

}
