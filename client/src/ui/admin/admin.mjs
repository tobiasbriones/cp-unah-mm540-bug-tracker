/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import 'chart.js';
import '../bootstrap/bootstrap.min.css';
import '../default.css';
import './admin.html';
import './admin.css';
import { Modal } from 'bootstrap/dist/js/bootstrap.esm.js';
import { BugRepository, DevTeamRepository, SoftwareProjectRepository } from '../../repository.mjs';
import { UserRepository } from '../../repository/user.repository.mjs';

const userRepository = new UserRepository();
const devRepository = new DevTeamRepository();
const bugsRepository = new BugRepository();
const projectRepository = new SoftwareProjectRepository();
const devs = devRepository.getAll();
const bugs = bugsRepository.getAll();
const statistics = bugsRepository.getStatistics();
const modal = new Modal(document.getElementById('modal'));
const bugsEl = document.getElementById('bugsSelect');
const devsEl = document.getElementById('devsSelect');
const ctx = document.getElementById('chart').getContext('2d');
const datasets = getDatasets(statistics);
const chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Bugs nuevos', 'Bugs asignados', 'Bugs finalizados'],
    datasets: datasets
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});
const pages = ['bugsPage', 'devsPage', 'projectsPage', 'usersPage'];

init();

function init() {
  bugsEl.addEventListener('change', onBugSelectChange);
  document.querySelector('header > h2').addEventListener('click', onHeaderClick);
  document.getElementById('userUpdateForm').addEventListener('submit', onCreateUserSubmit);
  document.getElementById('bugForm').addEventListener('submit', onAssignBugFormSubmit);
  document.getElementById('dismissModalBtn').addEventListener('click', onDismissModal);
  document.getElementById('actionUsers').addEventListener('click', onActionUsersClick);
  document.getElementById('actionBugs').addEventListener('click', onActionBugsClick);
  document.getElementById('actionDevelopers').addEventListener('click', onActionDevsClick);
  document.getElementById('actionProjects').addEventListener('click', onActionProjectsClick);
  document.getElementById('addNewUserBtn').addEventListener('click', onAddNewUserButtonClick);
  document.getElementById('addNewDevBtn').addEventListener('click', onAddNewDevButtonClick);
  document.getElementById('addNewProjectBtn').addEventListener('click', onAddNewProjectButtonClick);

  updateAssignBugsForm();
  setPage('bugsPage');
}

function getDatasets(statistics) {
  return [
    {
      label: '#',
      data: [
        statistics.newBugs,
        statistics.assignedBugs,
        statistics.finishedBugs
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }
  ];
}

function onHeaderClick() {
  window.location.href = './index.html';
}

function onActionUsersClick() {
  setPage(pages[3]);
}

function onActionBugsClick() {
  setPage(pages[0]);
}

function onActionDevsClick() {
  setPage(pages[1]);
}

function onActionProjectsClick() {
  setPage(pages[2]);
}

function onBugSelectChange() {
  const bugCode = parseInt(bugsEl.options[bugsEl.selectedIndex].value);

  if (!isNaN(bugCode)) {
    updateDevSelect(bugCode);
  }
}

async function onCreateUserSubmit(e) {
  e.preventDefault();
  const user = {
    id_usuario: parseInt(document.getElementById('userUpdateIdInput').value),
    nombre_completo: document.getElementById('userUpdateNameInput').value,
    login: document.getElementById('userUpdateLoginInput').value,
    rol: document.getElementById('userUpdateRoleInput').value
  };

  try {
    await userRepository.set(user);

    document.getElementById('actionUsers').click();
  }
  catch (e) {
    alert(e);
  }
}

function onAssignBugFormSubmit(e) {
  e.preventDefault();
  const bugCode = parseInt(bugsEl.options[bugsEl.selectedIndex].value);
  const devCode = parseInt(devsEl.options[devsEl.selectedIndex].value);

  if (!isNaN(bugCode) && !isNaN(devCode)) {
    assignBug(bugCode, devCode);
  }
}

function onDismissModal() {
  modal.hide();
}

function onAddNewUserButtonClick() {
  document.getElementById('userCreateContainer').classList.remove('gone');
  document.getElementById('userUpdateContainer').classList.add('gone');
}

function onAddNewDevButtonClick() {
  document.getElementById('developerCreateContainer').classList.remove('gone');
  document.getElementById('developerUpdateContainer').classList.add('gone');
}

function onAddNewProjectButtonClick() {
  document.getElementById('projectCreateContainer').classList.remove('gone');
  document.getElementById('projectUpdateContainer').classList.add('gone');
}

function setPage(page) {
  const pageEl = document.getElementById(page);

  hideAllPages();
  initPage(page);
  pageEl.classList.remove('gone');
}

function hideAllPages() {
  pages.forEach(page => document.getElementById(page).classList.add('gone'));
}

function initPage(page) {
  switch (page) {
    case pages[0]:
      break;
    case pages[1]:
      initDevsPage();
      break;
    case pages[2]:
      initProjectsPage();
      break;
    case pages[3]:
      initUsersPage();
      break;
  }
}

function initDevsPage() {
  const createEl = document.getElementById('developerCreateContainer');
  const updateEl = document.getElementById('developerUpdateContainer');
  const bodyEl = document.querySelector('#developerListContainer tbody');

  createEl.classList.add('gone');
  updateEl.classList.add('gone');

  bodyEl.innerHTML = '';
  devRepository.getAll().forEach(dev => {
    const rowEl = document.createElement('tr');
    const thEl = document.createElement('th');
    const nameEl = document.createElement('td');
    const languagesEl = document.createElement('td');
    const techEl = document.createElement('td');

    thEl.setAttribute('scope', 'row');
    thEl.innerText = dev.code;

    nameEl.innerText = dev.name;
    languagesEl.innerText = JSON.stringify(dev.languages);
    techEl.innerText = JSON.stringify(dev.tech);

    rowEl.dataset.code = dev.code;
    rowEl.appendChild(thEl);
    rowEl.appendChild(nameEl);
    rowEl.appendChild(languagesEl);
    rowEl.appendChild(techEl);
    bodyEl.appendChild(rowEl);

    rowEl.addEventListener('click', onItemClick);
  });

  function onItemClick(e) {
    const rowEl = e.target.parentElement;
    const devCode = parseInt(rowEl.dataset.code);
    const dev = devRepository.get(devCode);

    setSelected(rowEl);
    onUpdateDev(dev);
  }

  function setSelected(rowEl) {
    document.querySelectorAll('table tr.selected')
            .forEach(rowEl => rowEl.classList.remove('selected'));
    rowEl.classList.add('selected');
  }
}

function onUpdateUser(user) {
  const createEl = document.getElementById('userCreateContainer');
  const updateEl = document.getElementById('userUpdateContainer');

  createEl.classList.add('gone');
  updateEl.classList.remove('gone');
  document.getElementById('userUpdateIdInput').value = user.id_usuario;
  document.getElementById('userUpdateNameInput').value = user.nombre_completo;
  document.getElementById('userUpdateLoginInput').value = user.login;
  document.getElementById('userUpdateRoleInput').value = user.rol;
}

function onUpdateDev(dev) {
  const createEl = document.getElementById('developerCreateContainer');
  const updateEl = document.getElementById('developerUpdateContainer');

  createEl.classList.add('gone');
  updateEl.classList.remove('gone');
  document.getElementById('devUpdateCodeInput').value = dev.code;
  document.getElementById('devUpdateNameInput').value = dev.name;
  document.getElementById('devUpdateLanguagesInput').value = JSON.stringify(dev.languages);
  document.getElementById('devUpdateTechInput').value = JSON.stringify(dev.tech);
}

function onUpdateProject(project) {
  const createEl = document.getElementById('projectCreateContainer');
  const updateEl = document.getElementById('projectUpdateContainer');

  createEl.classList.add('gone');
  updateEl.classList.remove('gone');
  document.getElementById('projectUpdateCodeInput').value = project.code;
  document.getElementById('projectUpdateNameInput').value = project.name;
  document.getElementById('projectUpdateStartDateInput').value = new Date().toISOString()
                                                                           .slice(
                                                                             0,
                                                                             10
                                                                           );
  document.getElementById('projectUpdateEndDateInput').value = new Date().toISOString()
                                                                         .slice(
                                                                           0,
                                                                           10
                                                                         );
  ;
}

function initProjectsPage() {
  const createEl = document.getElementById('projectCreateContainer');
  const updateEl = document.getElementById('projectUpdateContainer');
  const bodyEl = document.querySelector('#projectListContainer tbody');

  createEl.classList.add('gone');
  updateEl.classList.add('gone');

  bodyEl.innerHTML = '';
  projectRepository.getAll().forEach(project => {
    const rowEl = document.createElement('tr');
    const thEl = document.createElement('th');
    const nameEl = document.createElement('td');
    const startDateEl = document.createElement('td');
    const endDateEl = document.createElement('td');

    thEl.setAttribute('scope', 'row');
    thEl.innerText = project.code;

    nameEl.innerText = project.name;
    startDateEl.innerText = project.startDate;
    endDateEl.innerText = project.endDate;

    rowEl.dataset.code = project.code;
    rowEl.appendChild(thEl);
    rowEl.appendChild(nameEl);
    rowEl.appendChild(startDateEl);
    rowEl.appendChild(endDateEl);
    bodyEl.appendChild(rowEl);

    rowEl.addEventListener('click', onItemClick);
  });

  function onItemClick(e) {
    const rowEl = e.target.parentElement;
    const projectCode = parseInt(rowEl.dataset.code);
    const project = devRepository.get(projectCode);

    setSelected(rowEl);
    onUpdateProject(project);
  }

  function setSelected(rowEl) {
    document.querySelectorAll('table tr.selected')
            .forEach(rowEl => rowEl.classList.remove('selected'));
    rowEl.classList.add('selected');
  }
}

function initUsersPage() {
  const createEl = document.getElementById('userCreateContainer');
  const updateEl = document.getElementById('userUpdateContainer');
  const bodyEl = document.querySelector('#userListContainer tbody');

  createEl.classList.add('gone');
  updateEl.classList.add('gone');

  bodyEl.innerHTML = '';

  userRepository.getAll().then(load, error);

  function load(users) {
    users.forEach(user => {
      const rowEl = document.createElement('tr');
      const thEl = document.createElement('th');
      const nameEl = document.createElement('td');
      const loginEl = document.createElement('td');
      const roleEl = document.createElement('td');

      thEl.setAttribute('scope', 'row');
      thEl.innerText = user.id_usuario;

      nameEl.innerText = user.nombre_completo;
      loginEl.innerText = user.login;
      roleEl.innerText = user.rol;

      rowEl.dataset.code = user.id_usuario;
      rowEl.appendChild(thEl);
      rowEl.appendChild(nameEl);
      rowEl.appendChild(loginEl);
      rowEl.appendChild(roleEl);
      bodyEl.appendChild(rowEl);

      rowEl.addEventListener('click', onItemClick);
    });
  }

  function error(err) {
    console.log(err);
    alert(err);
  }

  async function onItemClick(e) {
    const rowEl = e.target.parentElement;
    const userId = parseInt(rowEl.dataset.code);
    const user = await userRepository.get(userId);

    setSelected(rowEl);
    onUpdateUser(user);
  }

  function setSelected(rowEl) {
    document.querySelectorAll('table tr.selected')
            .forEach(rowEl => rowEl.classList.remove('selected'));
    rowEl.classList.add('selected');
  }
}

function updateAssignBugsForm() {
  updateBugSelect();
  updateDevSelect();
}

function updateBugSelect() {
  const defEl = document.createElement('option');

  bugsEl.innerHTML = '';
  defEl.selected = true;
  defEl.innerText = 'Seleccionar bug';
  bugsEl.appendChild(defEl);

  bugs.forEach(bug => {
    const el = document.createElement('option');

    el.setAttribute('value', bug.code);
    el.innerText = bug.code + ' ' + bug.description;
    bugsEl.appendChild(el);
  });
}

function updateDevSelect(bugCode) {
  const defEl = document.createElement('option');
  const appendItem = dev => {
    const el = document.createElement('option');
    el.setAttribute('value', dev.code);
    el.innerText = dev.name;
    devsEl.appendChild(el);
  };

  devsEl.innerHTML = '';
  defEl.selected = true;
  defEl.innerText = 'Seleccionar desarrollador';
  devsEl.appendChild(defEl);

  if (bugCode) {
    const bug = bugsRepository.get(bugCode);

    devs.filter(dev => !bug.developers.find(bugDev => bugDev.code === dev.code))
        .forEach(dev => appendItem(dev));
  }
}

function assignBug(bugCode, devCode) {
  const bug = bugsRepository.get(bugCode);
  const dev = devRepository.get(devCode);
  const modalTextEl = document.getElementById('modalText');

  bug.developers.push(dev);
  bugsRepository.set(bug);
  modalTextEl.innerText = `Bug ${ bug.code } asignado a ${ dev.name }`;
  modal.show();
  updateAssignBugsForm();
}
