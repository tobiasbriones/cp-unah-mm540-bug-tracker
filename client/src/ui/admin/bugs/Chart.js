/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
 */

import React from 'react';
import { Pie } from 'react-chartjs-2';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  render() {
    return (
      <Pie
        data={ this.state.data }
      />
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stats !== prevProps.stats) {
      this.setState({ data: getData(this.props.stats) });
    }
  }
}

export default Chart;

function getData(statistics) {
  const datasets = getDatasets(statistics);
  return {
    labels: ['Bugs nuevos', 'Bugs asignados', 'Bugs finalizados'],
    datasets: datasets,
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
  };
}

function getDatasets(statistics) {
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
