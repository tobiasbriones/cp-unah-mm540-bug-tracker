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

import { Status } from '../http.mjs';
import { UserModel } from './user.model.mjs';
import { UsersService } from './users.service.mjs';
import { Logger } from '../logger.mjs';

export function userValidateSignUp(req, res, next) {
  const user = req.body;

  if (!user.full_name || !user.login || !user.role) {
    res.status(Status.BAD_REQUEST).send('User must be set');
    return;
  }
  if (user.role !== 'admin' && user.role !== 'dev' && user.role !== 'qa') {
    res.status(Status.BAD_REQUEST).send('Invalid role');
    return;
  }
  next();
}

export function userValidatePassword(req, res, next) {
  const user = req.body;

  if (!user.password) {
    res.status(Status.BAD_REQUEST).send('User password must be set');
    return;
  }
  next();
}

export async function userValidateExists(req, res, next) {
  try {
    const service = new UsersService();
    const exists = await service.exists(req.body);

    if (exists) {
      res.status(Status.BAD_REQUEST).send('User already exists');
    }
    else {
      next();
    }
  }
  catch (e) {
    Logger.internalError(e);
    res.status(Status.INTERNAL_SERVER_ERROR).send();
  }
}

export async function userValidateUpdate(req, res, next) {
  const user = req.body;

  if (!user.id || !user.full_name || !user.login || !user.role) {
    res.status(Status.BAD_REQUEST).send('User must be set');
    return;
  }
  if (user.role !== 'admin' && user.role !== 'dev' && user.role !== 'qa') {
    res.status(Status.BAD_REQUEST).send('Invalid role');
    return;
  }
  next();
}

export async function userAddNewId(req, res, next) {
  try {
    req.body.id = await getNewUserId();
  }
  catch (e) {
    console.log(e);
    res.status(Status.INTERNAL_SERVER_ERROR).send('Fail to generate user ID');
    return;
  }
  next();
}

// Temporal way of generating unique user IDs
async function getNewUserId() {
  const users = await UserModel.find();
  const user = users.sort((a, b) => (a.id < b.id ? 1 : -1))[0];
  const max = user.id;
  return max + 1;
}
