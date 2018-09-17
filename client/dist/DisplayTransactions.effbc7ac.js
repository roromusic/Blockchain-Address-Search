// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"components\\TransactionDetails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _helper = require("../utils/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TransactionDetails(_ref) {
  var inputs = _ref.inputs,
      outputs = _ref.outputs,
      weight = _ref.weight,
      size = _ref.size,
      usd = _ref.usd,
      displaySatoshi = _ref.displaySatoshi;

  var totalInput = 0;
  var totalOutput = 0;

  return _react2.default.createElement(
    Details,
    null,
    _react2.default.createElement(
      IOContainer,
      null,
      _react2.default.createElement(
        IO,
        null,
        _react2.default.createElement(
          "h3",
          null,
          "Inputs"
        ),
        _react2.default.createElement(
          IOList,
          null,
          inputs.map(function (input, index) {
            totalInput += input.value;

            return _react2.default.createElement(
              IOItem,
              { key: index + input.value + input.addr },
              _react2.default.createElement(
                IOAddr,
                null,
                input.addr
              ),
              _react2.default.createElement(
                IOValue,
                null,
                displaySatoshi ? input.value : (0, _helper.convertToUSD)(input.value, usd)
              )
            );
          })
        ),
        _react2.default.createElement(
          "div",
          null,
          "Input Total: " + (displaySatoshi ? totalInput : (0, _helper.convertToUSD)(totalInput, usd))
        )
      ),
      _react2.default.createElement(
        IO,
        null,
        _react2.default.createElement(
          "h3",
          null,
          "Outputs"
        ),
        _react2.default.createElement(
          IOList,
          null,
          outputs.map(function (output, index) {
            totalOutput += output.value;

            return _react2.default.createElement(
              IOItem,
              { key: index + output.value + output.addr },
              _react2.default.createElement(
                IOAddr,
                null,
                output.addr
              ),
              _react2.default.createElement(
                IOValue,
                null,
                displaySatoshi ? output.value : (0, _helper.convertToUSD)(output.value, usd)
              )
            );
          })
        ),
        _react2.default.createElement(
          "div",
          null,
          "Output Total: " + (displaySatoshi ? totalOutput : (0, _helper.convertToUSD)(totalOutput, usd))
        )
      )
    ),
    _react2.default.createElement(
      Misc,
      null,
      _react2.default.createElement(
        "h3",
        null,
        "Details"
      ),
      _react2.default.createElement(
        Table,
        null,
        _react2.default.createElement(
          DT,
          null,
          "Fees"
        ),
        _react2.default.createElement(
          DD,
          null,
          displaySatoshi ? totalInput - totalOutput : (0, _helper.convertToUSD)(totalInput - totalOutput, usd)
        ),
        _react2.default.createElement(
          DT,
          null,
          "Size"
        ),
        _react2.default.createElement(
          DD,
          null,
          size
        ),
        _react2.default.createElement(
          DT,
          null,
          "Weight"
        ),
        _react2.default.createElement(
          DD,
          null,
          weight
        )
      )
    )
  );
}

var Details = (0, _reactEmotion2.default)("div")({
  marginBottom: "15px",
  backgroundColor: "var(--gray)",
  padding: "0 20px 20px 20px"
});

var IOContainer = (0, _reactEmotion2.default)("div")({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap"
});

var IO = (0, _reactEmotion2.default)("div")({
  flex: "1"
});

var IOList = (0, _reactEmotion2.default)("ul")({
  marginBottom: "20px"
});

var IOItem = (0, _reactEmotion2.default)("li")({
  display: "flex",
  flexWrap: "wrap",
  margin: "5px 0"
});

var IOAddr = (0, _reactEmotion2.default)("div")({
  paddingRight: "20px",
  marginBottom: "5px",

  "@media (max-width: 426px)": {
    fontSize: "14px"
  }
});

var IOValue = (0, _reactEmotion2.default)("div")({
  marginRight: "20px"
});

var Misc = (0, _reactEmotion2.default)("div")();

var Table = (0, _reactEmotion2.default)("dl")({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridGap: "5px"
});

var DT = (0, _reactEmotion2.default)("dt")({
  gridColumn: 1
});

var DD = (0, _reactEmotion2.default)("dd")({
  gridColumn: "2",
  paddingLeft: "20px"
});
exports.default = TransactionDetails;
},{"react":"..\\node_modules\\react\\index.js","react-emotion":"..\\node_modules\\react-emotion\\dist\\index.esm.js","../utils/helper":"utils\\helper.js"}],"components\\DisplayTransactions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactEmotion = require("react-emotion");

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _helper = require("../utils/helper");

var _TransactionDetails = require("./TransactionDetails");

var _TransactionDetails2 = _interopRequireDefault(_TransactionDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DisplayTransactions(_ref) {
  var txs = _ref.txs,
      user = _ref.user,
      displaySatoshi = _ref.displaySatoshi,
      usd = _ref.usd,
      toggleDetails = _ref.toggleDetails,
      expanded = _ref.expanded;

  return _react2.default.createElement(
    TransactionsWrapper,
    null,
    _react2.default.createElement(
      "h3",
      null,
      "Transactions"
    ),
    _react2.default.createElement(
      "ul",
      null,
      txs.map(function (tx) {
        var inputs = tx.inputs.map(function (input) {
          if (input.prev_out) {
            var _input$prev_out = input.prev_out,
                addr = _input$prev_out.addr,
                value = _input$prev_out.value;

            return { addr: addr, value: value };
          } else {
            return { addr: "Newly Mined", value: null };
          }
        });

        var outputs = tx.out.map(function (output) {
          var spent = output.spent,
              addr = output.addr,
              value = output.value;

          return { spent: spent, addr: addr, value: value };
        });

        var sum = (0, _helper.getSum)(inputs, outputs, user);
        var item = _react2.default.createElement(
          TransactionItem,
          {
            onClick: function onClick() {
              toggleDetails(tx.tx_index);
            }
          },
          _react2.default.createElement(
            TransactionDate,
            null,
            new Date(tx.time * 1000).toDateString().slice(4)
          ),
          _react2.default.createElement(
            TransactionId,
            null,
            "Tx ID: " + tx.tx_index
          ),
          _react2.default.createElement(
            TransactionSum,
            { sum: sum },
            displaySatoshi ? sum : (0, _helper.convertToUSD)(sum, usd)
          )
        );

        var details = _react2.default.createElement(_TransactionDetails2.default, {
          inputs: inputs,
          outputs: outputs,
          weight: tx.weight,
          size: tx.size,
          displaySatoshi: displaySatoshi,
          expanded: expanded,
          usd: usd
        });

        return _react2.default.createElement(
          Transaction,
          { key: tx.tx_index /*details={details}*/ },
          item,
          expanded.includes(tx.tx_index) && details
        );
      })
    )
  );
}

var TransactionsWrapper = (0, _reactEmotion2.default)("div")({
  width: "100%",
  margin: "40px 0"
});

var TransactionItem = (0, _reactEmotion2.default)("div")({
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  marginTop: "5px"
});

var TransactionDate = (0, _reactEmotion2.default)("div")();
var TransactionId = (0, _reactEmotion2.default)("div")({ flex: "1", textAlign: "center" });
var TransactionSum = (0, _reactEmotion2.default)("div")(function (props) {
  return {
    textAlign: "right",
    color: props.sum > 0 ? "#1DB954" : "red"
  };
});

var Transaction = (0, _reactEmotion2.default)("li")({
  listStyle: "none"
});

exports.default = DisplayTransactions;
},{"react":"..\\node_modules\\react\\index.js","react-emotion":"..\\node_modules\\react-emotion\\dist\\index.esm.js","../utils/helper":"utils\\helper.js","./TransactionDetails":"components\\TransactionDetails.js"}],"..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58609' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["..\\node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","components\\DisplayTransactions.js"], null)
//# sourceMappingURL=/DisplayTransactions.effbc7ac.map