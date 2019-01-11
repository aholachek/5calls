'use strict';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// using include in the callback selection requires a polyfill for ie
require('string.prototype.includes');

// some older browsers don't support Set, which apparently something compiles to
require('core-js/fn/set');
// ie 11 and old android don't have find
require('core-js/fn/array/find');

// seriously, not even map???
require('core-js/es6/map');

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');
