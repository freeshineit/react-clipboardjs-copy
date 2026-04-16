// import "./Page.scss";
import React, { useRef } from "react";
// import ReactClipboard from "react-clipboardjs-copy";

function Page() {
  const pageRef = useRef<HTMLDivElement>(null);
  // const handleSuccess = useCallback((e: any) => {
  //   console.log("Copy Success: ", e);
  // }, []);

  // const handleError = useCallback((e: any) => {
  //   console.log("Copy Error: ", e);
  // }, []);

  return (
    <div className="container-center" ref={pageRef}>
      <div className="App">
        <section className="app-item">
          <div className="app-item-desc">Copy text</div>
        </section>
        <section className="app-item">
          <div className="app-item-desc">
            <input id="input" defaultValue="git@github.com:freeshineit/react-clipboardjs-copy.git" />
          </div>
        </section>
        <section className="app-item">
          <div className="app-item-desc">Copy target</div>
          <div className="app-item-desc copy-target">Default copy target and clear selection content</div>
        </section>
        <section className="app-item">
          <div className="app-item-desc">Copy target</div>
          <div className="app-item-desc copy-target-selection">Copy target and selection content, selection=true</div>
        </section>

        <section className="app-item">
          <div className="app-item-desc">Copy element attribute value: aria-label=&apos;this is an element attr aria-label&apos;</div>
        </section>

        <section className="app-item">
          <div className="app-item-desc" id="modal">
            Changes the focus you&apos;ll want to set the focused element as the container value
          </div>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            <div />
            <div id="dynamically_id">This is a dynamically target element, click copy button</div>
          </div>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            <div />
            <p id="multiple_grandson_element">Multiple grandson element</p>
          </div>
        </section>

        <section className="app-item">
          <div className="app-item-desc">
            <textarea id="textarea" defaultValue="Mussum ipsum cacilds..." />
            <div />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
