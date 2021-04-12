/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: { type: Number, unique: true },
  full_name: { type: String },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'dev', 'qa']
  }
});

UserSchema.pre(
  'save',
  async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);