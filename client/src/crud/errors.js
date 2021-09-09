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

export function getErrorMessage(e) {
  if (e.response) {
    return e.response.data ? e.response.data : e;
  }
  if (e.message) {
    return e.message;
  }
  return JSON.stringify(e);
}
