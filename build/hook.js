"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactRouter = require("react-router");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useWatcher = function useWatcher() {
  var location = (0, _reactRouter.useLocation)();
  var history = (0, _reactRouter.useHistory)();
  var match = (0, _reactRouter.useRouteMatch)();

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      pathname = _useState2[0],
      setPathname = _useState2[1];

  var listeners = (0, _react.useRef)([]);
  var addListener = (0, _react.useCallback)(function (listener) {
    listeners.current.push(listener);
  }, []);
  var removeListener = (0, _react.useCallback)(function (listener) {
    var index = listeners.current.findIndex(function (item) {
      return item === listener;
    });

    if (index >= 0) {
      listeners.current.splice(index, 1);
    }
  }, []);
  var execListeners = (0, _react.useCallback)(function () {
    listeners.current.forEach(function (func) {
      func({
        history: history,
        match: match,
        location: location
      });
    });
  }, [history, match, location]);
  (0, _react.useEffect)(function () {
    if (pathname !== location.pathname) {
      execListeners();
      setPathname(pathname);
    }
  }, [location, execListeners, pathname]);
  var watcher = (0, _react.useMemo)(function () {
    return {
      removeListener: removeListener,
      addListener: addListener
    };
  }, [removeListener, addListener]);
  return watcher;
};

var _default = useWatcher;
exports.default = _default;