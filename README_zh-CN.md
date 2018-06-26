# react-clipboardjs-copy

一个基于`clipboard.js`的React辅助组件

## 安装

```sh
npm install --save react-clipboardjs-copy
```

## 基本使用

```jsx
import React from 'react';
import {ReactClipboard} from 'react-clipboardjs-copy'
import './App.css';
export default class App extends React.Component {
    render () {
        return (
            <div className="App">
                <section className="app-item">
                    <div className="app-item-desc">copy text</div>
                    <ReactClipboard text='copy text'
                        onSuccess={(e) => console.log(e)}
                        onError={(e) => console.log(e)}>
                        <button>Copy</button>
                    </ReactClipboard>
                </section>
            </div>
        )
    }
}
```

```jsx
<ReactClipboard
    target={'.copy-target'}
    selection={true}
    onSuccess={(e) => console.log(e)}
    onError={(e) => console.log(e)}
>
    <button>Copy</button>
</ReactClipboard>
```

## 配置

+   `text` - *string* React组件要复制的内容，其对应 `clipboard.js` 的 `data-clipboard-text`属性。

+   `target` - *string* React组件要复制的目标元素. 其对应 `clipboard.js` 的 `data-clipboard-target`属性。

+   `action` - *string*  React组件的行为. 其对应 `clipboard.js` 的 `data-clipboard-action`属性。但是目前只支持复制(默认: 'copy')。

+   `selection` - *boolean*  设置是否清除复制的选中. 其对应 `clipboard.js` 的事件 `e.clearSelection()`. (默认: true，不清除)

+   `onSuccess` - *function* 复制成功回调.

+   `onError` - *function* 复制出错回调.


## 开发

```sh
git clone git@github.com:freeshineit/react-clipboardjs-copy.git

cd react-clipboardjs-copy

npm install

npm run dev
```

## License

MIT © [Shine Shao](https://github.com/freeshineit)
