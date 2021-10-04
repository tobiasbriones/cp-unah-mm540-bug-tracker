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

export const CATEGORIES = [
  'Todas',
  'Estudios',
  'Juegos',
  'Otros',
  'Trabajo',
  'Compras',
  'Ocio',
  'Vacaciones',
];

export const NOTES = [
  {
    id: 1,
    title: 'Prueba de prog comercial',
    content: 'El viernes 16 es la prueba de programacion comercial',
    category: 'Estudios',
  },
  {
    id: 2,
    title: 'Nota #2',
    content:
      'Note that the Coconut option is initially selected, because of the selected attribute.',
    category: 'Compras',
  },
  {
    id: 3,
    title: 'Nota #3',
    content:
      'This is more convenient in a controlled component because you only need to update it in one place.',
    category: 'Ocio',
  },
  {
    id: 4,
    title: 'Nota #4',
    content:
      'You can pass an array into the value attribute, allowing you to select multiple options in a select tag',
    category: 'Trabajo',
  },
];
