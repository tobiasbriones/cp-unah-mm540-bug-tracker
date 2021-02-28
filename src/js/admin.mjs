/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugRepository } from './repository.mjs';

const bugsRepository = new BugRepository();
const statistics = bugsRepository.getStatistics();
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
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    }
  ];
}
