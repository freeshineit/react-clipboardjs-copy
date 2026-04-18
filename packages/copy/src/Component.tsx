import React from "react";
import ClipboardJS from "clipboard";

/** Supported target shapes accepted by clipboard.js target resolution. */
export type ClipboardJSTarget = string | Element | NodeListOf<Element>;

/** Internal props injected into the single child element rendered by ReactClipboard. */
export interface ClipboardChildProps {
  /** Injected clipboard action passed through clipboard.js data attributes. */
  "data-clipboard-action"?: string;
  /** Injected clipboard text passed through clipboard.js data attributes. */
  "data-clipboard-text"?: string;
  /** Injected clipboard target selector passed through clipboard.js data attributes. */
  "data-clipboard-target"?: string;
  /** Ref used internally to bind clipboard.js to the rendered trigger element. */
  ref?: React.Ref<Element>;
}

/** Public props for the ReactClipboard component. */
export interface ReactClipboardProps {
  /**
   * Overwrites default command ('cut' or 'copy').
   * default copy
   */
  action?: "cut" | "copy" | ClipboardJS.Options["action"];
  /** Overwrites default target input element. */
  target?: string | ClipboardJS.Options["target"];
  /** cut or copy text */
  text?: string | ClipboardJS.Options["text"];
  /**
   * For use in Bootstrap Modals or with any
   * other library that changes the focus
   * you'll want to set the focused element
   * as the container value.
   */
  container?: ClipboardJS.Options["container"];
  /** Setting whether to clear the copy or cut selected, default为false */
  selection?: boolean; // default true
  /**
   * Only one child (a React element) is supported. The child element must be able to hold a ref, and will be used as the trigger for clipboard actions.
   */
  children: React.ReactElement<ClipboardChildProps>;

  /** success operation callback */
  onSuccess?: (event?: ClipboardJS.Event) => void;
  /** error operation callback */
  onError?: (event?: ClipboardJS.Event) => void; //
}

export { ClipboardJS };

/**
 * Clipboard.js wrapper component for React.
 *
 * @example
 * ```tsx
 * <ReactClipboard text="copy text" onSuccess={(event) => console.log(event)}>
 *   <button>Copy Text</button>
 * </ReactClipboard>
 * ```
 */
export function ReactClipboard(props: ReactClipboardProps): React.ReactElement | null {
  const childrenRef = React.useRef<Element>(null);
  const clipboard = React.useRef<ClipboardJS>(null);

  React.useEffect(() => {
    // ⚠️： useEffect Run Twice in React v18.0 https://blog.bitsrc.io/react-v18-0-useeffect-bug-why-do-effects-run-twice-39babecede93
    // https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
    // https://github.com/facebook/react/issues/24502
    if (!clipboard.current && childrenRef.current) {
      clipboard.current = new ClipboardJS(childrenRef.current, {
        action: typeof props.action === "function" ? props.action || "copy" : undefined,
        target: typeof props.target === "function" ? props.target : undefined,
        text: typeof props.text === "function" ? props.text : undefined,
        container: props.container,
      });

      // listen success
      clipboard.current.on("success", function (e: ClipboardJS.Event) {
        if (!props.selection) {
          e.clearSelection(); // clear selection
        }
        if (typeof props.onSuccess === "function") {
          props.onSuccess(e);
        }
      });

      // listen error
      clipboard.current.on("error", function (e: ClipboardJS.Event) {
        if (typeof props.onError === "function") {
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
  // Only one child is supported
  if (!React.Children.only(props.children)) {
    console.error("Only one child is supported");
    return null;
  }

  return React.cloneElement(props.children, {
    "data-clipboard-action": typeof props.action === "string" ? props.action || "copy" : undefined,
    "data-clipboard-text": typeof props.text === "string" ? props.text : undefined,
    "data-clipboard-target": typeof props.target === "string" ? props.target : undefined,
    ref: childrenRef,
  });
}
