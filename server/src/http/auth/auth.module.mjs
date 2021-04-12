/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import passport from 'passport';
import { AuthController } from './auth.controller.mjs';
import { Strategy } from 'passport-local';
import { UserModel } from '../admin/user.model.mjs';
import { ExtractJwt as ExtractJWT, Strategy as JwtStrategy } from 'passport-jwt';
import { Module } from '../module.mjs';
import { jwtGuard, login } from './auth.middleware.mjs';
import { JWT_PRIVATE_KEY } from './auth.secret.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/auth'
});

export class AuthModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new AuthController();
  }

  init() {
    this.router.post(
      '/login',
      login,
      (req, res) => res.json({
        uid: req.user.login,
        name: req.user.nombre_completo,
        rol: req.user.rol,
        uat: req.token
      })
    );
    this.router.post('/verify-token', jwtGuard, (req, res) => res.end());

    setupPassport();
  }
}

function setupPassport() {
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
    )
  );

  passport.use(
    new JwtStrategy(
      {
        secretOrKey: JWT_PRIVATE_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        }
        catch (error) {
          done(error);
        }
      }
    )
  );
}
