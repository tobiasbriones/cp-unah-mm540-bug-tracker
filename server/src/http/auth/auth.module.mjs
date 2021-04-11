/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import passport from 'passport';
import { AuthController } from './auth.controller.mjs';
import { Strategy } from 'passport-local';
import { UserModel } from '../../database/user.model.mjs';

export class AuthModule {
  #controller;

  constructor() {
    this.#controller = new AuthController();
  }

  init(router) {
    router.post('/login', (req, res) => this.#controller.login(req, res));

    passport.use(
      'signup',
      new Strategy(
        {
          usernameField: 'login',
          passwordField: 'password'
        },
        async (login, password, done) => {
          try {
            const user = await UserModel.create({ login, password });

            return done(null, user);
          }
          catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      'login',
      new Strategy(
        {
          usernameField: 'login',
          passwordField: 'password'
        },
        async (login, password, done) => {
          try {
            const user = await UserModel.findOne({ email: login });

            if (!user) {
              return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
              return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
          }
          catch (error) {
            return done(error);
          }
        }
      )
    );
  }
}

export const signUp = passport.authenticate('signup', { session: false })
