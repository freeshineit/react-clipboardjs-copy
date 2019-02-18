import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class ReactClipboard extends React.Component {
    constructor(props) {
        super(props);
        this.clipboard = null;

        this.copyRef = React.createRef()
    }

    onClick(e) {
        const { onSuccess, onError, selection, options } = this.props;
        const target = this.copyRef.current

        if (!this.clipboard) {
            this.clipboard = new Clipboard(target, options);
            this.clipboard.on('success', function (e) {
                !selection && e.clearSelection(); // 是否清除选中
                onSuccess && onSuccess(target);
            });
            this.clipboard.on('error', function (e) {
                onError && onError(target);
            });

            this.clipboard.onClick(e)
        }
    }

    componentWillMount() {
        // destroy clipboard
        const {destroy} = this.props;
        destroy && destroy()
        this.clipboard && this.clipboard.destroy();
    }

    render() {
        const { target, onSuccess, onError, text, action, selection, children, ...other } = this.props;
        React.Children.only(children); // 用来约束子组件的个数
          
        return React.cloneElement(
            children,
            {
                ...other,
                'data-clipboard-action': action,
                'data-clipboard-text': text,
                'data-clipboard-target': target,
                'onClick': this.onClick.bind(this),
                ref: this.copyRef
            });
    }
}

ReactClipboard.defaultProps = {
    action: 'copy',
    selection: true
}

ReactClipboard.propTypes = {
    target: PropTypes.string, // 操作的目标
    action: PropTypes.oneOf(['copy']),
    text: PropTypes.string, //  操作的文本
    onSuccess: PropTypes.func, // 操作成功回调
    onError: PropTypes.func, // 操作失败回调
    selection: PropTypes.bool, // 是否选择 默认是选中的  如不需要选中 设置为false
    options: PropTypes.object // options
}

export default ReactClipboard;