"use strict";

var _interopRequireDefault = require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWatcher = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/home/laoma/study-space/react-router-watcher/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ReactRouterWatcher = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ReactRouterWatcher, _Component);

  var _super = (0, _createSuper2.default)(ReactRouterWatcher);

  function ReactRouterWatcher() {
    var _this;

    (0, _classCallCheck2.default)(this, ReactRouterWatcher);
    _this = _super.call(this);
    _this.listeners = [];
    _this.addRouteChangeListener = _this.addRouteChangeListener.bind((0, _assertThisInitialized2.default)(_this));
    _this.removeRouteChangeListener = _this.removeRouteChangeListener.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ReactRouterWatcher, [{
    key: "addRouteChangeListener",
    value: function addRouteChangeListener(listener) {
      this.listeners.push(listener);
    }
  }, {
    key: "removeRouteChangeListener",
    value: function removeRouteChangeListener(listener) {
      var index = this.listeners.findIndex(function (item) {
        return item === listener;
      });

      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.execListeners();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.execListeners();
    }
  }, {
    key: "execListeners",
    value: function execListeners() {
      var _this2 = this;

      this.listeners.forEach(function (func) {
        func({
          history: _this2.props.history,
          match: _this2.props.match,
          location: _this2.props.location
        });
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.location.pathname !== this.props.location.pathname;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children({
        addRouteChangeListener: this.addRouteChangeListener,
        removeRouteChangeListener: this.removeRouteChangeListener
      });
    }
  }]);
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
      return /*#__PURE__*/_react.default.createElement(TargetComponent, Object.assign({
        addRouteChangeListener: addRouteChangeListener,
        removeRouteChangeListener: removeRouteChangeListener
      }, props));
    });
  };
};

exports.withWatcher = withWatcher;