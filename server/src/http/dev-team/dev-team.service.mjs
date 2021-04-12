/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { DevTeamModel } from './dev-team.model.mjs';

export class DevTeamService {
  constructor() {}

  async createDevTeam(devTeam) {
    await DevTeamModel.create(devTeam);
  }

  async readAllDevTeams() {
    return DevTeamModel.find();
  }

  async readDevTeam(id) {
    const devTeam = await DevTeamModel.findOne({ code: id });

    if (!devTeam) {
      throw new Error(`DevTeam ${id} not found`);
    }
    return devTeam;
  }

  async updateDevTeam(id, devTeam) {
    await DevTeamModel.updateOne({ code: id }, devTeam);
  }

  async deleteDevTeam(id) {
    await DevTeamModel.deleteOne({ code: id });
  }
}
