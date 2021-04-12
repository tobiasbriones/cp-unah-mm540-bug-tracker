/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { TeamModel } from './team.model.mjs';

export class TeamsService {
  constructor() {}

  async createDevTeam(devTeam) {
    await TeamModel.create(devTeam);
  }

  async readAllDevTeams() {
    return TeamModel.find();
  }

  async readDevTeam(id) {
    const devTeam = await TeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error(`DevTeam ${id} not found`);
    }
    return devTeam;
  }

  async updateDevTeam(id, devTeam) {
    await TeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteDevTeam(id) {
    await TeamModel.deleteOne({ code: id });
  }
}
