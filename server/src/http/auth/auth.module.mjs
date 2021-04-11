/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { AuthController } from './auth.controller.mjs';
import { Strategy } from 'passport-local';
import { UserModel } from '../../database/user.model.mjs';
import { ExtractJwt as ExtractJWT, Strategy as JwtStrategy } from 'passport-jwt';

const JWT_PRIVATE_KEY = ':D'; // Save it into a safe place

const login = async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      console.log(`err: ${ err }, user: ${ user }, info: ${ info }`);
      try {
        if (err || !user) {
          return res.send(err);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) {
              return next(error);
            }

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, JWT_PRIVATE_KEY);

            return res.json({ token });
          }
        );
      }
      catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
};

export class AuthModule {
  #controller;

  constructor() {
    this.#controller = new AuthController();
  }

  init(router) {
    router.post('/login', login);

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
          jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
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
}

export const signUp = passport.authenticate('signup', { session: false });

export const jwtGuard = passport.authenticate('jwt', { session: false });

export const adminGuard = async (req, res, next) => {
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
};
