/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository } from '../../repository.mjs';
import { Modal } from 'bootstrap';
import { TeamRepository } from '../../repository/team.repository.mjs';

export class BugPageController {
  constructor() {
    this.bugRepository = new BugRepository();
    this.devTeamRepository = new TeamRepository();
  }

  init() {
    this.pageEl = document.getElementById('bugsPage');
    this.bugsEl = document.getElementById('bugsSelect');
    this.devTeamEl = document.getElementById('devsSelect');
    this.modal = new Modal(document.getElementById('modal'));

    this.setupChart();

    this.bugsEl.addEventListener('change', () =>this.onBugSelectChange());
    document.getElementById('bugForm').addEventListener('submit', () =>this.onAssignBugFormSubmit());
    document.getElementById('dismissModalBtn').addEventListener('click', () => this.onDismissModal());
    this.updateAssignBugsForm();
  }

  resume() {
    this.show();
  }

  show() {
    this.pageEl.classList.remove('gone');
  }

  hide() {
    this.pageEl.classList.add('gone');
  }

  setupChart() {
    const statistics = this.bugRepository.getStatistics();
    const datasets = this.getDatasets(statistics);
    const ctx = document.getElementById('chart').getContext('2d');
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
  }

  getDatasets(statistics) {
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

  onBugSelectChange() {
    const bugCode = parseInt(this.bugsEl.options[this.bugsEl.selectedIndex].value);

    if (!isNaN(bugCode)) {
      this.updateDevSelect(bugCode);
    }
  }

  onAssignBugFormSubmit(e) {
    e.preventDefault();
    const bugCode = parseInt(this.bugsEl.options[this.bugsEl.selectedIndex].value);
    const devCode = parseInt(this.devTeamEl.options[this.devTeamEl.selectedIndex].value);

    if (!isNaN(bugCode) && !isNaN(devCode)) {
      this.assignBug(bugCode, devCode);
    }
  }

  onDismissModal() {
    this.modal.hide();
  }

  updateAssignBugsForm() {
    this.updateBugSelect();
    this.updateDevSelect();
  }

  updateBugSelect() {
    const defEl = document.createElement('option');
    const bugs = this.bugRepository.getAll();

    this.bugsEl.innerHTML = '';
    defEl.selected = true;
    defEl.innerText = 'Seleccionar bug';
    this.bugsEl.appendChild(defEl);

    bugs.forEach(bug => {
      const el = document.createElement('option');

      el.setAttribute('value', bug.code);
      el.innerText = bug.code + ' ' + bug.description;
      this.bugsEl.appendChild(el);
    });
  }

  updateDevSelect(bugCode) {
    const defEl = document.createElement('option');
    const appendItem = dev => {
      const el = document.createElement('option');
      el.setAttribute('value', dev.code);
      el.innerText = dev.name;
      this.devTeamEl.appendChild(el);
    };
    const devs = this.devTeamRepository.getAll();

    this.devTeamEl.innerHTML = '';
    defEl.selected = true;
    defEl.innerText = 'Seleccionar desarrollador';
    this.devTeamEl.appendChild(defEl);

    if (bugCode) {
      const bug = this.bugRepository.get(bugCode);

      devs.filter(dev => !bug.developers.find(bugDev => bugDev.code === dev.code))
          .forEach(dev => appendItem(dev));
    }
  }

  async assignBug(bugCode, devCode) {
    const bug = this.bugRepository.get(bugCode);
    const dev = await this.devTeamRepository.get(devCode);
    const modalTextEl = document.getElementById('modalText');

    bug.developers.push(dev);
    this.bugRepository.set(bug);
    modalTextEl.innerText = `Bug ${ bug.code } asignado a ${ dev.name }`;
    this.modal.show();
    this.updateAssignBugsForm();
  }
}



