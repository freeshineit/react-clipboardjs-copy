# react-clipboardjs-copy

A react copy component that based on `clipboard.js`

[中文](./README_zh-CN.md)

## Installing

```sh
npm install --save react-clipboardjs-copy
```

## Basic usage

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
                <section className="app-item">
                    <div className="app-item-desc">copy element attr value: aria-label='this is an element attr aria-label'</div>
                    <ReactClipboard options= {{
                        text: function(trigger) {
                            return trigger.getAttribute('aria-label');
                        }
                    }}
                    aria-label='this is an element attr aria-label'
                    >
                        <button>Copy</button>
                    </ReactClipboard>
                </section>

                <section className="app-item">
                    <div className="app-item-desc">changes the focus you'll want to set the focused element as the container value</div>
                    <ReactClipboard options= {{
                        container: document.getElementById('modal')
                    }}
                    >
                        <button>Copy</button>
                    </ReactClipboard>
                </section>

                <section className="app-item">
                    <div className="app-item-desc">
                        <div></div>
                        <div id='dynamically_id'>this is a dynamically target element, click copy button</div>
                    </div>
                    <ReactClipboard options= {{
                        target: function(trigger) {
                            return document.getElementById('dynamically_id');
                        }
                    }}
                    >
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

## Options(props)

+   `text` - *string* React component will copy content. Corresponding to `clipboard.js` attribut `data-clipboard-text`.

+   `target` - *string* React component will copy target element content. Corresponding to `clipboard.js` attribut `data-clipboard-target`.

+   `action` - *string* React component action. Corresponding to `clipboard.js` attribut `data-clipboard-action`. But only support copy(default: 'copy').

+   `selection` - *boolean*  Setting whether to clear the copy selected. Corresponding to `clipboard.js` event `e.clearSelection()`. (default: true)

+   `onSuccess` - *function* Copy success callback.

+   `onError` - *function* Copy error callback.

+   `options` - *object* Copy object options, value {text, target, container}.




## Developing

```sh
git clone git@github.com:freeshineit/react-clipboardjs-copy.git

cd react-clipboardjs-copy

npm install

npm run dev
```

## reference material

[clipboard.js](https://clipboardjs.com/)

## License

MIT © [Shine Shao](https://github.com/freeshineit)
