/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { UserModel } from './user.model.mjs';

export class UsersService {
  constructor() {}

  async readAllUsers() {
    return UserModel.find();
  }

  async readUser(id) {
    const user = UserModel.findOne({ id: id });

    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    return user;
  }

  async updateUser(id, user) {
    await UserModel.updateOne({ id: id }, user);
  }

  async deleteUser(id) {
    await UserModel.deleteOne({ id: id });
  }
}
