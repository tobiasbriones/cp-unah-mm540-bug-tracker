/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository, DevTeamRepository } from './repository.mjs';

const devRepository = new DevTeamRepository();
const bugsRepository = new BugRepository();
const devs = devRepository.getAll();
const bugs = bugsRepository.getAll();
const statistics = bugsRepository.getStatistics();
const modal = new bootstrap.Modal(document.getElementById('modal'));
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

bugsEl.addEventListener('change', onBugSelectChange);
document.getElementById('bugForm').addEventListener('submit', onAssignBugFormSubmit);
document.getElementById('dismissModalBtn').addEventListener('click', onDismissModal);

bugs.forEach(bug => {
  const el = document.createElement('option');

  el.setAttribute('value', bug.code);
  el.innerText = bug.code + ' ' + bug.description;
  bugsEl.appendChild(el);
});

updateDevSelect();

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

function onBugSelectChange(e) {
  const bugCode = parseInt(bugsEl.options[bugsEl.selectedIndex].value);

  if (!isNaN(bugCode)) {
    updateDevSelect(bugCode);
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

function updateDevSelect(bugCode) {
  const appendItem = dev => {
    const el = document.createElement('option');
    el.setAttribute('value', dev.code);
    el.innerText = dev.name;
    devsEl.appendChild(el);
  };

  devsEl.innerHTML = '';
  devs.forEach(dev => {
    if (!bugCode || dev.assignedBugs.filter(b => b.code === bugCode).length === 0) {
      appendItem(dev);
    }
  });
}

function assignBug(bugCode, devCode) {
  const bug = bugsRepository.get(bugCode);
  const dev = devRepository.get(devCode);
  const modalTextEl = document.getElementById('modalText');

  dev.assignedBugs.push(bug);
  modalTextEl.innerText = `Bug ${ bug.code } asignado a ${ dev.name }`;
  modal.show();
}
