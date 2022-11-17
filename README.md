# react-clipboardjs-copy

![build](https://github.com/freeshineit/react-clipboardjs-copy/workflows/build/badge.svg)
![Download](https://img.shields.io/npm/dm/react-clipboardjs-copy.svg)
![Version](https://img.shields.io/npm/v/react-clipboardjs-copy.svg)
![License](https://img.shields.io/npm/l/react-clipboardjs-copy.svg)

A react copy component that based on `clipboard.js`

[中文](./README_zh-CN.md)

## Installing

```sh
npm install --save react-clipboardjs-copy
```

## Basic usage

```jsx
import React from 'react';
import ReactClipboard from 'react-clipboardjs-copy'
import './App.css';
export default class App extends React.Component {
    render () {
        return (
            <div className="App">
                <section className='app-item'>
                  <div className='app-item-desc'>Copy text</div>
                  <ReactClipboard
                    text='copy text'
                    onSuccess={() => {}}
                    onError={() => {}}
                  >
                    <button
                      onClick={() => {
                        console.log('click button');
                      }}
                    >
                      Copy Text
                    </button>
                  </ReactClipboard>
                </section>
                <section className='app-item'>
                  <div className='app-item-desc'>
                    <textarea id="textarea">Mussum ipsum cacilds...</textarea>
                  <div />
                  </div>
                  <ReactClipboard
                    action="cut"
                    target="#textarea"
                    onSuccess={() => {}}
                    onError={() => {}}
                  >
                    <button>Cut</button>
                  </ReactClipboard>
                </section>
            </div>
        )
    }
}
```

```jsx
<input id="input" value="git@github.com:freeshineit/react-clipboardjs-copy.git" />
<ReactClipboard
  target="#input"
  onSuccess={handleSuccess}
  onError={handleError}
>
  <button>
    Copy Input value
  </button>
</ReactClipboard>
```

## Options(props)

| Property  | Description                                                                                                                                 | Type                                       | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| action    | Overwrites default command (`cut` or `copy`) , Corresponding to clipboard.js attribute data-clipboard-action.                               | `cut` \| `copy`                            | `copy`  |
| target    | React component will copy target element content. Corresponding to `clipboard.js` attribute `data-clipboard-target`.                        | string \| function(elem: Element): Element | -       |
| text      | React component will copy content. Corresponding to `clipboard.js` attribute `data-clipboard-text`                                          | string \| function(elem: Element): string  |         |
| container | For use in Bootstrap Modals or with any other library that changes the focus you'll want to set the focused element as the container value. | Element                                    | `body`  |
| selection | Setting whether to clear the copy or cut selected                                                                                           | boolean                                    | false   |
| onSuccess | Operation success callback                                                                                                                  | function(event?: ClipboardJS.Event): void  | -       |
| onError   | Operation error callback                                                                                                                    | function(event?: ClipboardJS.Event): void  | -       |

## Developing

```sh
git clone git@github.com:freeshineit/react-clipboardjs-copy.git

cd react-clipboardjs-copy

npm install

npm run dev
```

## Reference material

[clipboard.js](https://clipboardjs.com/)

## License

MIT © [Shine Shao](https://github.com/freeshineit)
