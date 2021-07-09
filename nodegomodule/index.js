try {
  module.exports = require('./build/Release/gomodule_addon.node'); // eslint-disable-line global-require, import/no-unresolved
} catch (err) {
  module.exports = require('./build/Debug/gomodule_addon.node'); // eslint-disable-line global-require, import/no-unresolved
}
