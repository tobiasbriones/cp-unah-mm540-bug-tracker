/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Strategy } from 'passport-local';
import { UserModel } from '../users/user.model.mjs';
import { ExtractJwt as ExtractJWT, Strategy as JwtStrategy } from 'passport-jwt';
import { JWT_PRIVATE_KEY } from './auth.secret.mjs';

export const loginStrategy = new Strategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },
  async (login, password, done) => {
    try {
      const user = await UserModel.findOne({ login: login });

      if (!user) {
        return done('User not found', false);
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        return done('Wrong Password', false);
      }
      return done(null, user, { message: 'Logged in Successfully' });
    }
    catch (error) {
      return done(error);
    }
  }
);

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_PRIVATE_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  },
  async (token, done) => {
    try {
      done(null, token.user);
    }
    catch (error) {
      done(error);
    }
  }
);

export const signupStrategy = new Strategy(
  {
    usernameField: 'login',
    passwordField: 'password'
  },
  async (login, password, done) => {
    try {
      const user = await UserModel.create({ login, password });

      done(null, user);
    }
    catch (err) {
      done(err.message);
    }
  }
);
