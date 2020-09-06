import React from "react";
// import ReactClipboard from "react-clipboardjs-copy";
import ReactClipboard from "./lib";
import "./App.css";
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <section className="app-item">
          <div className="app-item-desc">copy text</div>
          <ReactClipboard
            text="copy text"
            onSuccess={(e) => console.log(e)}
            onError={(e) => console.log(e)}
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>
        <section className="app-item">
          <div className="app-item-desc">copy target</div>
          <div className="app-item-desc copy-target">
            `text` `target` 同时存在时面板选择 `text`中的值
          </div>
          <ReactClipboard
            target={".copy-target"}
            onSuccess={(e) => console.log(e)}
            onError={(e) => console.log(e)}
          >
            <button>Copy</button>
          </ReactClipboard>
          <div>attribute selection= true</div>
          <ReactClipboard
            target={".copy-target"}
            selection={true}
            onSuccess={(e) => console.log(e)}
            onError={(e) => console.log(e)}
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>
        <section className="app-item">
          <div className="app-item-desc">copy text</div>
          <ReactClipboard
            text="copy text"
            onSuccess={(e) => {
              console.log(e);
            }}
            onError={(e) => console.log(e)}
          >
            <button ref={(node) => (this.button = node)}>Copy</button>
          </ReactClipboard>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            copy element attribute value: aria-label='this is an element attr
            aria-label'
          </div>
          <ReactClipboard
            options={{
              text: function (trigger) {
                console.log(trigger);
                return trigger.getAttribute("aria-label");
              },
            }}
            aria-label="this is an element attr aria-label"
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            changes the focus you'll want to set the focused element as the
            container value
          </div>
          <ReactClipboard
            options={{
              container: document.getElementById("modal"),
            }}
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            <div />
            <div id="dynamically_id">
              this is a dynamically target element, click copy button
            </div>
          </div>
          <ReactClipboard
            options={{
              target: function (trigger) {
                console.log(trigger);
                return document.getElementById("dynamically_id");
              },
            }}
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            <div />
            <p id="multiple_grandson_element">
              修复
              当ReactClipboard组件的子元素中有多个子元素时，点击复制时部分区域没有反应(version
              1.2.1)
            </p>
          </div>
          <ReactClipboard
            options={{
              target: function (trigger) {
                console.log(trigger);
                return document.getElementById("multiple_grandson_element");
              },
            }}
          >
            <div>
              <button>Copy</button>
              <button>Copy1</button>
              <button>Copy2</button>
              <button>Copy3</button>
              <img src="https://avatars2.githubusercontent.com/u/16034259?s=88&v=4" />
              <span>span</span>
            </div>
          </ReactClipboard>
        </section>
      </div>
    );
  }
}
