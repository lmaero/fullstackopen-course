/* eslint-disable no-console */

function info(...params) {
  console.info(...params);
}

function error(...params) {
  console.error(...params);
}

module.exports = { info, error };
