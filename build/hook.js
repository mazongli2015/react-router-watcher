"use strict";

var _interopRequireDefault = require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _reactRouter = require("react-router");

var useWatcher = function useWatcher() {
  var location = (0, _reactRouter.useLocation)();
  var history = (0, _reactRouter.useHistory)();
  var match = (0, _reactRouter.useRouteMatch)();

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
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