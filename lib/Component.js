"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clipboard = _interopRequireDefault(require("clipboard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ReactClipboard = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactClipboard, _React$Component);

  var _super = _createSuper(ReactClipboard);

  function ReactClipboard(props) {
    var _this;

    _classCallCheck(this, ReactClipboard);

    _this = _super.call(this, props);
    _this.clipboard = null;
    _this.copyRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(ReactClipboard, [{
    key: "onClick",
    value: function onClick(e) {
      var _this$props = this.props,
          onSuccess = _this$props.onSuccess,
          onError = _this$props.onError,
          selection = _this$props.selection,
          options = _this$props.options;
      var target = this.copyRef.current;

      if (!this.clipboard) {
        this.clipboard = new _clipboard["default"](target, options);
        this.clipboard.on("success", function (e) {
          !selection && e.clearSelection(); // 是否清除选中

          onSuccess && onSuccess(target);
        });
        this.clipboard.on("error", function (e) {
          onError && onError(target);
        });
        this.clipboard.onClick(e);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // destroy clipboard
      this.clipboard && this.clipboard.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          target = _this$props2.target,
          onSuccess = _this$props2.onSuccess,
          onError = _this$props2.onError,
          text = _this$props2.text,
          action = _this$props2.action,
          selection = _this$props2.selection,
          children = _this$props2.children,
          other = _objectWithoutProperties(_this$props2, ["target", "onSuccess", "onError", "text", "action", "selection", "children"]);

      _react["default"].Children.only(children); // 用来约束子组件的个数


      return /*#__PURE__*/_react["default"].cloneElement(children, _objectSpread(_objectSpread({}, other), {}, {
        "data-clipboard-action": action,
        "data-clipboard-text": text,
        "data-clipboard-target": target,
        onClick: this.onClick.bind(this),
        ref: this.copyRef
      }));
    }
  }]);

  return ReactClipboard;
}(_react["default"].Component);

ReactClipboard.defaultProps = {
  action: "copy",
  selection: true
};
ReactClipboard.propTypes = {
  target: _propTypes["default"].string,
  // 操作的目标
  action: _propTypes["default"].oneOf(["copy"]),
  text: _propTypes["default"].string,
  //  操作的文本
  onSuccess: _propTypes["default"].func,
  // 操作成功回调
  onError: _propTypes["default"].func,
  // 操作失败回调
  selection: _propTypes["default"].bool,
  // 是否选择 默认是选中的  如不需要选中 设置为false
  options: _propTypes["default"].object // options

};
var _default = ReactClipboard;
exports["default"] = _default;