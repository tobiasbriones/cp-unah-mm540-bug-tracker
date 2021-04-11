/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id_usuario: { type: Number, unique: true },
  nombre_completo: { type: String },
  login: { type: String, unique: true },
  password: String,
  rol: {
    type: String,
    enum: ['admin', 'dev', 'qa']
  }
});
export const UserModel = mongoose.model('User', UserSchema);
