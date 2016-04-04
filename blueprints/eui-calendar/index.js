'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var packages = ['ember-cli-moment-shim', 'ember-lodash'];
    return this.addAddonsToProject({ packages: packages });
  }
};
