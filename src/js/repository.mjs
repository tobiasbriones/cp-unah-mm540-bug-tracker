/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const BASE_URL = 'http://localhost:3000/api/v1';
const IN_MEMORY_DEV_TEAM = [
  {
    code: 1,
    name: 'Peter West',
    languages: [
      'Java', 'C++', 'Ruby'
    ],
    tech: [
      'Spring Boot', 'Spring MVC', 'Ruby on Rails', 'Unreal Engine'
    ]
  },
  {
    code: 2,
    name: 'Carolyn Fritz',
    languages: [
      'Java', 'JavaScript'
    ],
    tech: [
      'Spring Boot', 'Spring MVC', 'Express.js', 'Nest.js'
    ]
  },
  {
    code: 3,
    name: 'Aysha Bannister',
    languages: [
      'Java', 'PHP'
    ],
    tech: [
      'Laravel', 'Spring MVC', 'Symphony', 'JDBC'
    ]
  },
  {
    code: 4,
    name: 'Henri Nixon',
    languages: [
      'JavaScript'
    ],
    tech: [
      'Angular', 'React.js', 'Vue.js', 'Node.js'
    ]
  }
];
const IN_MEMORY_BUGS = [
  {
    code: 1,
    description: 'It crashes when X',
    swProjectCode: 1,
    priority: 1,
    state: 'Finished',
    finishData: new Date(Date.now()).toDateString()
  },
  {
    code: 2,
    description: 'It crashes when Y',
    swProjectCode: 1,
    priority: 4,
    state: 'Finished',
    finishData: new Date(Date.now()).toDateString()
  },
  {
    code: 3,
    description: 'It crashes when Z',
    swProjectCode: 2,
    priority: 2,
    state: 'New',
    finishData: new Date(Date.now()).toDateString()
  },
  {
    code: 4,
    description: 'It crashes when W',
    swProjectCode: 3,
    priority: 5,
    state: 'Assigned',
    finishData: new Date(Date.now()).toDateString()
  }
];
const IN_MEMORY_SW_PROJECTS = [
  {
    code: 1,
    name: 'Software Project #1',
    startDate: new Date(Date.now()).toDateString(),
    endDate: new Date(Date.now()).toDateString(),
    devTeam: [
      IN_MEMORY_DEV_TEAM[0],
      IN_MEMORY_DEV_TEAM[1]
    ],
    finishedBugs: [
      IN_MEMORY_BUGS[0],
      IN_MEMORY_BUGS[1]
    ]
  },
  {
    code: 2,
    name: 'Software Project #2',
    startDate: new Date(Date.now()).toDateString(),
    endDate: new Date(Date.now()).toDateString(),
    devTeam: [
      IN_MEMORY_DEV_TEAM[0],
      IN_MEMORY_DEV_TEAM[2]
    ],
    finishedBugs: [
      IN_MEMORY_BUGS[3]
    ]
  },
  {
    code: 3,
    name: 'Software Project #3',
    startDate: new Date(Date.now()).toDateString(),
    endDate: new Date(Date.now()).toDateString(),
    devTeam: [
      IN_MEMORY_DEV_TEAM[2],
      IN_MEMORY_DEV_TEAM[3]
    ],
    finishedBugs: [
      IN_MEMORY_BUGS[4]
    ]
  },
  {
    code: 4,
    name: 'Software Project #4',
    startDate: new Date(Date.now()).toDateString(),
    endDate: new Date(Date.now()).toDateString(),
    devTeam: [
      IN_MEMORY_DEV_TEAM[3]
    ],
    finishedBugs: []
  }
];

export class SoftwareProjectRepository {
  constructor() {
  }

  get(code) {
    return IN_MEMORY_SW_PROJECTS.find(p => p.code === code);
  }

  add(project) {
    IN_MEMORY_SW_PROJECTS.push(project);
  }

  set(project) {
    this.remove(project);
    this.add(project);
  }

  remove(project) {
    for (let i = 0; i < IN_MEMORY_SW_PROJECTS.length; i++) {
      if (IN_MEMORY_SW_PROJECTS[i].code === project.code) {
        IN_MEMORY_SW_PROJECTS.splice(i, 1);
        break;
      }
    }
  }
}

export class DevTeamRepository {
  constructor() {
  }

  get(code) {
    return IN_MEMORY_DEV_TEAM.find(p => p.code === code);
  }

  add(project) {
    IN_MEMORY_DEV_TEAM.push(project);
  }

  set(project) {
    this.remove(project);
    this.add(project);
  }

  remove(project) {
    for (let i = 0; i < IN_MEMORY_DEV_TEAM.length; i++) {
      if (IN_MEMORY_DEV_TEAM[i].code === project.code) {
        IN_MEMORY_DEV_TEAM.splice(i, 1);
        break;
      }
    }
  }
}

export class BugRepository {
  constructor() {
  }

  get(code) {
    return IN_MEMORY_BUGS.find(p => p.code === code);
  }

  add(project) {
    IN_MEMORY_BUGS.push(project);
  }

  set(project) {
    this.remove(project);
    this.add(project);
  }

  remove(project) {
    for (let i = 0; i < IN_MEMORY_BUGS.length; i++) {
      if (IN_MEMORY_BUGS[i].code === project.code) {
        IN_MEMORY_BUGS.splice(i, 1);
        break;
      }
    }
  }

  getStatistics() {
    let newBugs = 0;
    let assignedBugs = 0;
    let finishedBugs = 0;

    IN_MEMORY_BUGS.forEach(bug => {
      if (bug.state === 'New') {
        newBugs++;
      }
      else if (bug.state === 'Assigned') {
        assignedBugs++;
      }
      else if (bug.state === 'Finished') {
        finishedBugs++;
      }
    });
    return {
      newBugs: newBugs,
      assignedBugs: assignedBugs,
      finishedBugs: finishedBugs
    };
  }
}
