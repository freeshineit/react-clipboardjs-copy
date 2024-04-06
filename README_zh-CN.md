# react-clipboardjs-copy

![build](https://github.com/freeshineit/react-clipboardjs-copy/workflows/build/badge.svg) ![Download](https://img.shields.io/npm/dm/react-clipboardjs-copy.svg) ![Version](https://img.shields.io/npm/v/react-clipboardjs-copy.svg) ![License](https://img.shields.io/npm/l/react-clipboardjs-copy.svg)

一个基于`clipboard.js`的 React 复制组件

[English](./README.md)

## 安装

```sh
npm install --save react-clipboardjs-copy
```

## 配置

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 命令（`cut` 或 `copy`），对应于 clipboard.js 属性 data-clipboard-action。 | `cut` \| `copy` | `copy` |
| target | React 组件将复制目标元素内容。 对应于`clipboard.js`属性`data-clipboard-target`。 | string \| function(elem: Element): Element | - |
| text | React 组件将复制内容。 对应`clipboard.js`属性`data-clipboard-text` | string \| function(elem: Element): string |  |
| container | 为了在任何其他改变焦点的库中使用，您需要将焦点元素设置为容器值。 | Element | `body` |
| selection | 设置是否清除所选的副本或剪切 | boolean | false |
| onSuccess | 操作成功回调 | function(event?: ClipboardJS.Event): void | - |
| onError | 操作错误回调 | function(event?: ClipboardJS.Event): void | - |

## 参考资料

[clipboard.js](https://clipboardjs.com/)

## 开发

```sh
git clone git@github.com:freeshineit/react-clipboardjs-copy.git

cd react-clipboardjs-copy

pnpm install

## development
pnpm run dev

## test
pnpm run test

## production
pnpm run build
```

## License

MIT © [Shine Shao](https://github.com/freeshineit)
