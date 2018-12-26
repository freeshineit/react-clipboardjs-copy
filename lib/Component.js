'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactClipboard = function (_React$Component) {
    _inherits(ReactClipboard, _React$Component);

    function ReactClipboard(props) {
        _classCallCheck(this, ReactClipboard);

        var _this = _possibleConstructorReturn(this, (ReactClipboard.__proto__ || Object.getPrototypeOf(ReactClipboard)).call(this, props));

        _this.clipboard = null;
        return _this;
    }

    _createClass(ReactClipboard, [{
        key: 'onClick',
        value: function onClick(e) {
            var _props = this.props,
                onSuccess = _props.onSuccess,
                onError = _props.onError,
                selection = _props.selection,
                options = _props.options;

            var target = this.getTarget(e.target);

            if (!this.clipboard) {
                this.clipboard = new _clipboard2.default(target, options);
                this.clipboard.on('success', function (e) {
                    !selection && e.clearSelection(); // 是否清除选中
                    onSuccess && onSuccess(e);
                });
                this.clipboard.on('error', function (e) {
                    onError && onError(e);
                });

                this.clipboard.onClick(e);
            }
        }
    }, {
        key: 'getTarget',
        value: function getTarget(target) {

            if (target.getAttribute("data-clipboard-action")) {
                return target;
            }

            if (target.parentNode.getAttribute("data-clipboard-action")) {
                return target.parentNode;
            }

            this.getParentNodeTarget(target.parentNode);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            // destroy clipboard
            var destroy = this.props.destroy;

            destroy && destroy();
            this.clipboard && this.clipboard.destroy();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                target = _props2.target,
                onSuccess = _props2.onSuccess,
                onError = _props2.onError,
                text = _props2.text,
                action = _props2.action,
                selection = _props2.selection,
                children = _props2.children,
                other = _objectWithoutProperties(_props2, ['target', 'onSuccess', 'onError', 'text', 'action', 'selection', 'children']);

            var elem = _react2.default.Children.only(children);

            return _react2.default.cloneElement(children, _extends({}, other, {
                'data-clipboard-action': action,
                'data-clipboard-text': text,
                'data-clipboard-target': target,
                'onClick': this.onClick.bind(this)
            }));
        }
    }]);

    return ReactClipboard;
}(_react2.default.Component);

ReactClipboard.defaultProps = {
    action: 'copy',
    selection: true
};

ReactClipboard.propTypes = {
    target: _propTypes2.default.string, // 操作的目标
    action: _propTypes2.default.oneOf(['copy']),
    text: _propTypes2.default.string, //  操作的文本
    onSuccess: _propTypes2.default.func, // 操作成功回调
    onError: _propTypes2.default.func, // 操作失败回调
    selection: _propTypes2.default.bool, // 是否选择 默认是选中的  如不需要选中 设置为false
    options: _propTypes2.default.object // options
};

exports.default = ReactClipboard;