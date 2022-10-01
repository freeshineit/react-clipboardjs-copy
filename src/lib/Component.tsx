import React, { useEffect, useRef } from 'react';
import Clipboard from 'clipboard';

export type ClipboardJSTarget = string | Element | NodeListOf<Element>;

export interface ReactClipboardProps {
  /**
   * Overwrites default command ('cut' or 'copy').
   * default copy
   */
  action?: 'cut' | 'copy' | ClipboardJS.Options['action'];
  /** Overwrites default target input element. */
  target?: string | ClipboardJS.Options['target'];
  /** cut or copy text */
  text?: string | ClipboardJS.Options['text'];
  /**
   * For use in Bootstrap Modals or with any
   * other library that changes the focus
   * you'll want to set the focused element
   * as the container value.
   */
  container?: ClipboardJS.Options['container'];
  /** 是否选择 默认是true选中的  如不需要选中 设置为false */
  selection?: boolean; // default true
  children: React.ReactElement;

  /** success operation callback */
  onSuccess?(event?: ClipboardJS.Event): void;
  /** error operation callback */
  onError?(event?: ClipboardJS.Event): void; //
}

export { Clipboard };

export const ReactClipboard: React.FC<ReactClipboardProps> = props => {
  const childrenRef = useRef<Element>();
  const clipboard = useRef<Clipboard>();

  useEffect(() => {
    //⚠️： useEffect Run Twice in React v18.0 https://blog.bitsrc.io/react-v18-0-useeffect-bug-why-do-effects-run-twice-39babecede93
    // https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    // https://github.com/facebook/react/issues/24502
    if (!clipboard.current && childrenRef.current) {
      console.log(childrenRef.current);
      clipboard.current = new Clipboard(childrenRef.current, {
        action:
          typeof props.action === 'function'
            ? props.action || 'copy'
            : undefined,
        target: typeof props.target === 'function' ? props.target : undefined,
        text: typeof props.text === 'function' ? props.text : undefined,
        container: props.container,
      });

      // listen success
      clipboard.current.on('success', function (e: ClipboardJS.Event) {
        !props.selection && e.clearSelection(); // clear selection
        if (typeof props.onSuccess === 'function') {
          props.onSuccess(e);
        }
      });

      // listen error
      clipboard.current.on('error', function (e: ClipboardJS.Event) {
        if (typeof props.onError === 'function') {
          props.onError(e);
        }
      });
    }

    return () => {
      if (clipboard.current) {
        clipboard.current.destroy();
      }
    };
  }, [props]);

  // 用来约束子组件的个数
  if (!React.Children.only(props.children)) {
    console.error('');
    return null;
  }

  return React.cloneElement(props.children, {
    'data-clipboard-action':
      typeof props.action === 'string' ? props.action || 'copy' : undefined,
    'data-clipboard-text':
      typeof props.text === 'string' ? props.text : undefined,
    'data-clipboard-target':
      typeof props.target === 'string' ? props.target : undefined,
    ref: childrenRef,
  });
};
