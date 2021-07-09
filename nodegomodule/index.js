try {
  module.exports = require('./build/Release/addon.node'); // eslint-disable-line global-require, import/no-unresolved
} catch (err) {
  module.exports = require('./build/Debug/addon.node'); // eslint-disable-line global-require, import/no-unresolved
}
