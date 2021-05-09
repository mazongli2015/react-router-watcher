"use strict";

require("core-js/modules/es6.object.assign.js");

require("core-js/modules/es6.weak-map.js");

require("core-js/modules/es6.string.iterator.js");

require("core-js/modules/es6.object.to-string.js");

require("core-js/modules/es6.array.iterator.js");

require("core-js/modules/web.dom.iterable.js");

require("core-js/modules/es6.object.get-own-property-descriptor.js");

exports.__esModule = true;
exports.withWatcher = exports.default = void 0;

require("core-js/modules/es6.array.find-index.js");

require("core-js/modules/es6.regexp.match.js");

require("core-js/modules/es6.object.set-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ReactRouterWatcher = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ReactRouterWatcher, _Component);

  function ReactRouterWatcher() {
    var _this;

    _this = _Component.call(this) || this;
    _this.listeners = [];
    _this.addRouteChangeListener = _this.addRouteChangeListener.bind(_assertThisInitialized(_this));
    _this.removeRouteChangeListener = _this.removeRouteChangeListener.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ReactRouterWatcher.prototype;

  _proto.addRouteChangeListener = function addRouteChangeListener(listener) {
    this.listeners.push(listener);
  };

  _proto.removeRouteChangeListener = function removeRouteChangeListener(listener) {
    var index = this.listeners.findIndex(function (item) {
      return item === listener;
    });

    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.execListeners();
  };

  _proto.componentDidMount = function componentDidMount() {
    this.execListeners();
  };

  _proto.execListeners = function execListeners() {
    var _this2 = this;

    this.listeners.forEach(function (func) {
      func({
        history: _this2.props.history,
        match: _this2.props.match,
        location: _this2.props.location
      });
    });
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.location.pathname !== this.props.location.pathname;
  };

  _proto.render = function render() {
    return this.props.children({
      addRouteChangeListener: this.addRouteChangeListener,
      removeRouteChangeListener: this.removeRouteChangeListener
    });
  };

  return ReactRouterWatcher;
}(_react.Component);

var Watcher = (0, _reactRouter.withRouter)(ReactRouterWatcher);
var _default = Watcher;
exports.default = _default;

var withWatcher = function withWatcher(TargetComponent) {
  return function (props) {
    return /*#__PURE__*/_react.default.createElement(Watcher, null, function (_ref) {
      var addRouteChangeListener = _ref.addRouteChangeListener,
          removeRouteChangeListener = _ref.removeRouteChangeListener;
      return /*#__PURE__*/_react.default.createElement(TargetComponent, _extends({
        addRouteChangeListener: addRouteChangeListener,
        removeRouteChangeListener: removeRouteChangeListener
      }, props));
    });
  };
};

exports.withWatcher = withWatcher;