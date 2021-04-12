/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import passport from 'passport';
import jwt from 'jsonwebtoken';
import { UserModel } from '../admin/user.model.mjs';
import { JWT_PRIVATE_KEY } from './auth.secret.mjs';

export async function login(req, res, next) {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(401).send(err);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) {
              return next(error);
            }

            const body = { _id: user._id, email: user.email };
            req.token = jwt.sign({ user: body }, JWT_PRIVATE_KEY);
            next();
          }
        );
      }
      catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
}

export const signUp = passport.authenticate('signup', { session: false });

export const jwtGuard = passport.authenticate('jwt', { session: false });

export async function adminGuard(req, res, next) {
  if (!req.user || !req.user._id) {
    res.status(401).send('Unauthorized');
    return;
  }
  const user = await UserModel.findById(req.user._id);

  if (!user || user.rol !== 'admin') {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
}
