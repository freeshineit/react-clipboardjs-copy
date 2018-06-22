import React from 'react';
import ReactClipboard from '../src';
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
                    <div className="app-item-desc">copy target</div>
                    <div className="app-item-desc copy-target">`text` `target` 同时存在时面板选择 `text`中的值</div>
                    <ReactClipboard
                        target={'.copy-target'}
                        onSuccess={(e) => console.log(e)}
                        onError={(e) => console.log(e)}
                    >
                        <button>Copy</button>
                    </ReactClipboard>
                    <ReactClipboard
                        target={'.copy-target'}
                        selection={true}
                        onSuccess={(e) => console.log(e)}
                        onError={(e) => console.log(e)}
                    >
                        <button>Copy</button>
                    </ReactClipboard>
                </section>
            </div>
        );
    }
}