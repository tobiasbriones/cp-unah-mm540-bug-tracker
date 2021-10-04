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
import { ProjectModel } from '../projects/project.model.mjs';

export function userValidateSignUp(req, res, next) {
  const user = req.body;

  if (!user.name || !user.login || !user.role) {
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

  if (!user.id || !user.name || !user.login || !user.role) {
    res.status(Status.BAD_REQUEST).send('User must be set');
    return;
  }
  if (user.role !== 'admin' && user.role !== 'dev' && user.role !== 'qa') {
    res.status(Status.BAD_REQUEST).send('Invalid role');
    return;
  }
  next();
}

export async function generateUserId(req, res, next) {
  try {
    const result = await UserModel.find({}).sort({ id: -1 });
    const maxId = result[0].id;
    req.body['id'] = maxId + 1;

    next();
  }
  catch (e) {
    Logger.internalError(e);
    res.sendStatus(Status.INTERNAL_SERVER_ERROR);
  }
}
