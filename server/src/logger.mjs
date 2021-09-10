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

export class Logger {
  /**
   * It logs an error message with the following format:
   *
   * `${msg} ${object || ''}: ${exception}`
   *
   * For example:
   *
   * "Failed to connect to the database { "username":"admin",
   * "host":"https://example.com", ... }: { "name":"DatabaseException",
   * "usingPassword":"YES", ... }"
   *
   * This is intended for server failures, for instance, before throwing
   * an `InternalServerErrorException` from a service or controller.
   *
   * @param exception exception that caused a server failure to respond to the
   *        client
   * @param message optional message about the underlying action
   * @param object optional object to give context to the message param
   */
  static internalError(exception, message, object) {
    console.log();

    if (message) {
      console.error(message, object || '', ': ', exception);
    }
    else {
      console.error(exception);
    }
    console.log();
  }
}
