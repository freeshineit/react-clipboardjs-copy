import React, { useCallback } from 'react';
import ReactClipboard from 'react-clipboardjs-copy';
import './Page.scss';

function Page() {
  const handleSuccess = useCallback((e: any) => {
    console.log('Copy Success: ', e);
  }, []);

  const handleError = useCallback((e: any) => {
    console.log('Copy Error: ', e);
  }, []);

  return (
    <div className='container-center'>
      <div className='App'>
        <section className='app-item'>
          <div className='app-item-desc'>Copy text</div>
          <ReactClipboard
            text='copy text'
            onSuccess={handleSuccess}
            onError={handleError}
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
            <input
              id='input'
              value='git@github.com:freeshineit/react-clipboardjs-copy.git'
            />
          </div>
          <ReactClipboard
            target='#input'
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy Input value</button>
          </ReactClipboard>
        </section>
        <section className='app-item'>
          <div className='app-item-desc'>Copy target</div>
          <div className='app-item-desc copy-target'>
            Default copy target and clear selection content
          </div>
          <ReactClipboard
            target='.copy-target'
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy Text By Target ClassName</button>
          </ReactClipboard>
        </section>
        <section className='app-item'>
          <div className='app-item-desc'>Copy target</div>
          <div className='app-item-desc copy-target-selection'>
            Copy target and selection content, selection=true
          </div>
          <ReactClipboard
            target={'.copy-target-selection'}
            selection={true}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy Text By Target ClassName and Selection </button>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc'>
            Copy element attribute value: aria-label='this is an element attr
            aria-label'
          </div>
          <ReactClipboard
            text={trigger => {
              console.log(trigger, trigger.getAttribute('aria-label'));
              return trigger.getAttribute('aria-label') as string;
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button aria-label='this is an element attr aria-label'>
              Copy Html Attribute Value
            </button>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc' id='modal'>
            Changes the focus you'll want to set the focused element as the
            container value
          </div>
          <ReactClipboard
            container={document.getElementById('modal') as Element}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy</button>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc'>
            <div />
            <div id='dynamically_id'>
              This is a dynamically target element, click copy button
            </div>
          </div>
          <ReactClipboard
            text={trigger => {
              console.log(trigger);
              return document.getElementById('dynamically_id')
                ?.innerText as string;
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Dynamically Copy</button>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc'>
            <div />
            <p id='multiple_grandson_element'>Multiple grandson element</p>
          </div>
          <ReactClipboard
            target={trigger => {
              console.log(trigger);
              return document.getElementById(
                'multiple_grandson_element'
              ) as Element;
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <div>
              <button>Copy</button>
              <button>Copy1</button>
              <button>Copy2</button>
              <button>Copy3</button>
              <img
                src='https://avatars2.githubusercontent.com/u/16034259?s=88&v=4'
                alt='ShineShao'
              />
              <span>span</span>
            </div>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc'>
            <textarea id='textarea'>Mussum ipsum cacilds...</textarea>
            <div />
          </div>
          <ReactClipboard
            action='cut'
            target='#textarea'
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Cut</button>
          </ReactClipboard>
        </section>
      </div>
    </div>
  );
}

export default Page;
