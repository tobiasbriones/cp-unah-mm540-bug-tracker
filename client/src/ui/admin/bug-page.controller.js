/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Modal } from 'bootstrap';
import { TeamRepository } from '../../repository/team.repository.mjs';
import { BugRepository } from '../../repository/bug.repository.mjs';

export class BugPageController {
  constructor() {
    this.bugRepository = new BugRepository();
    this.devTeamRepository = new TeamRepository();
  }

  async init() {
    this.pageEl = document.getElementById('bugsPage');
    this.bugsEl = document.getElementById('bugsSelect');
    this.devTeamEl = document.getElementById('devsSelect');
    this.modal = new Modal(document.getElementById('modal'));

    await this.setupChart();

    this.bugsEl.addEventListener('change', () => this.onBugSelectChange());
    document.getElementById('bugForm')
            .addEventListener('submit', e => this.onAssignBugFormSubmit(e));
    document.getElementById('dismissModalBtn')
            .addEventListener('click', () => this.onDismissModal());
    await this.updateAssignBugsForm();
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

  async setupChart() {
    const statistics = await this.bugRepository.getStatistics();
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
          statistics.new,
          statistics.assigned,
          statistics.finished
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

  async onBugSelectChange() {
    const bugCode = parseInt(this.bugsEl.options[this.bugsEl.selectedIndex].value);

    if (!isNaN(bugCode)) {
      await this.updateDevSelect(bugCode);
    }
  }

  async onAssignBugFormSubmit(e) {
    e.preventDefault();
    const bugCode = parseInt(this.bugsEl.options[this.bugsEl.selectedIndex].value);
    const devCode = parseInt(this.devTeamEl.options[this.devTeamEl.selectedIndex].value);

    if (!isNaN(bugCode) && !isNaN(devCode)) {
      await this.assignBug(bugCode, devCode);
    }
  }

  onDismissModal() {
    this.modal.hide();
  }

  async updateAssignBugsForm() {
    await this.updateBugSelect();
    await this.updateDevSelect();
  }

  async updateBugSelect() {
    const defEl = document.createElement('option');
    const bugs = await this.bugRepository.getAll();

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

  async updateDevSelect(bugCode) {
    const defEl = document.createElement('option');
    const appendItem = dev => {
      const el = document.createElement('option');
      el.setAttribute('value', dev.code);
      el.innerText = dev.name;
      this.devTeamEl.appendChild(el);
    };
    const devs = await this.devTeamRepository.getAll();

    this.devTeamEl.innerHTML = '';
    defEl.selected = true;
    defEl.innerText = 'Seleccionar equipo';
    this.devTeamEl.appendChild(defEl);

    devs.forEach(dev => appendItem(dev));
  }

  async assignBug(bugCode, devCode) {
    const modalTextEl = document.getElementById('modalText');
    const dev = await this.devTeamRepository.get(devCode);

    await this.devTeamRepository.assignBug(devCode, bugCode);
    modalTextEl.innerText = `Bug ${ bugCode } asignado a ${ dev.name }`;
    this.modal.show();
    //await this.updateAssignBugsForm();
  }
}



