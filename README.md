# react-clipboardjs-copy

A react copy component that based on `clipboard.js`


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
            </div>
        )
    }
}
```

## Options(props)

+   `text` - *string* React component will copy content. Corresponding to `clipboard.js` attribut `data-clipboard-text`.

+   `target` - *string* React component will copy target element content. Corresponding to `clipboard.js` attribut `data-clipboard-target`.

+   `action` - *string* React component action. Corresponding to `clipboard.js` attribut `data-clipboard-action`. But only support copy(default: 'copy').

+   `selection` - *boolean*  Setting whether to clear the copy selected. Corresponding to `clipboard.js` event `e.clearSelection()`. (default: true)

+   `onSuccess` - *function* Copy success callback.

+   `onError` - *function* Copy error callback.


## Developing

```sh
git clone git@github.com:freeshineit/react-clipboardjs-copy.git

cd react-clipboardjs-copy

npm install

npm run dev
```

## License

MIT © [Shine Shao](https://github.com/freeshineit)
