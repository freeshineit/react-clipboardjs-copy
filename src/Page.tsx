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
          <div className='app-item-desc'>copy text</div>
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
          <div className='app-item-desc'>copy target</div>
          <div className='app-item-desc copy-target'>
            `text` `target` 同时存在时面板选择 `text`中的值
          </div>
          <ReactClipboard
            target='.copy-target'
            text='this is text'
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy Text By Target ClassName</button>
          </ReactClipboard>
          <div>attribute selection= true</div>
          <ReactClipboard
            target={'.copy-target'}
            text='this is text'
            selection={true}
            onSuccess={handleSuccess}
            onError={handleError}
          >
            <button>Copy Text By Target ClassName and Selection </button>
          </ReactClipboard>
        </section>

        <section className='app-item'>
          <div className='app-item-desc'>
            copy element attribute value: aria-label='this is an element attr
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
            changes the focus you'll want to set the focused element as the
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
              this is a dynamically target element, click copy button
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
            <p id='multiple_grandson_element'>
              修复当ReactClipboard组件的子元素中有多个子元素时，点击复制时部分区域没有反应(version1.2.1)
            </p>
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
      </div>
    </div>
  );
}

export default Page;
