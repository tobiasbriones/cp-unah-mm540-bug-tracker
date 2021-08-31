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

import { UserModel } from './user.model.mjs';

export class UsersService {
  constructor() {}

  async readAllUsers() {
    return UserModel.find();
  }

  async readUser(id) {
    const user = await UserModel.findOne({ id: id });

    if (!user) {
      throw new Error(`User ${ id } not found`);
    }
    return user;
  }

  async updateUser(id, user) {
    await UserModel.updateOne({ id: id }, user);
  }

  async deleteUser(id) {
    await UserModel.deleteOne({ id: id });
  }

  async exists(user) {
    const byId = await UserModel.findOne({ id: user.id });
    const byLogin = await UserModel.findOne({ login: user.login });
    return byId || byLogin;
  }
}
