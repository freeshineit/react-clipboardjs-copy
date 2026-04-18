type ClipboardEventType = "success" | "error";

type ClipboardHandler = (event: ClipboardMockEvent) => void;

interface ClipboardMockOptions {
  action?: (trigger: Element) => string;
  target?: (trigger: Element) => Element | null;
  text?: (trigger: Element) => string;
  container?: Element;
}

export interface ClipboardMockEvent {
  action: string;
  text: string;
  trigger: Element;
  clearSelection: () => void;
}

type ClipboardMockGlobal = typeof globalThis & {
  __reactClipboardMockInstances__?: ClipboardMock[];
};

function getClipboardMockInstances() {
  const clipboardGlobal = globalThis as ClipboardMockGlobal;

  if (!clipboardGlobal.__reactClipboardMockInstances__) {
    clipboardGlobal.__reactClipboardMockInstances__ = [];
  }

  return clipboardGlobal.__reactClipboardMockInstances__;
}

export default class ClipboardMock {
  static get instances() {
    return getClipboardMockInstances();
  }

  readonly trigger: Element;
  readonly options: ClipboardMockOptions;
  destroyed = false;

  private readonly listeners: Record<ClipboardEventType, ClipboardHandler[]> = {
    success: [],
    error: [],
  };

  constructor(trigger: Element, options: ClipboardMockOptions = {}) {
    this.trigger = trigger;
    this.options = options;
    getClipboardMockInstances().push(this);
    this.trigger.addEventListener("click", this.handleClick);
  }

  on(type: ClipboardEventType, handler: ClipboardHandler) {
    this.listeners[type].push(handler);
    return this;
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;
    this.trigger.removeEventListener("click", this.handleClick);
  }

  private emit(type: ClipboardEventType, text: string, action: string) {
    const event: ClipboardMockEvent = {
      action,
      text,
      trigger: this.trigger,
      clearSelection: () => undefined,
    };

    for (const listener of this.listeners[type]) {
      listener(event);
    }
  }

  private handleClick = () => {
    const action = this.resolveAction();
    const text = this.resolveText();

    if (text == null) {
      this.emit("error", "", action);
      return;
    }

    this.emit("success", text, action);
  };

  private resolveAction() {
    if (typeof this.options.action === "function") {
      return this.options.action(this.trigger);
    }

    return this.readAttribute("data-clipboard-action") ?? "copy";
  }

  private resolveText() {
    if (typeof this.options.text === "function") {
      return this.options.text(this.trigger);
    }

    const text = this.readAttribute("data-clipboard-text");
    if (text != null) {
      return text;
    }

    const target = this.resolveTarget();
    if (!target) {
      return null;
    }

    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      return target.value;
    }

    return target.textContent ?? "";
  }

  private resolveTarget() {
    if (typeof this.options.target === "function") {
      return this.options.target(this.trigger);
    }

    const selector = this.readAttribute("data-clipboard-target");
    return selector ? document.querySelector(selector) : null;
  }

  private readAttribute(name: string) {
    return this.trigger instanceof HTMLElement ? this.trigger.getAttribute(name) : null;
  }
}

export function resetClipboardMock() {
  getClipboardMockInstances().length = 0;
}

export function getLastClipboardMock() {
  return getClipboardMockInstances().at(-1) ?? null;
}
