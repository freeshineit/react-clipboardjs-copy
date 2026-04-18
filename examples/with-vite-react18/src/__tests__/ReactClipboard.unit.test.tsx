import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ReactClipboard from "react-clipboardjs-copy";
import { resetClipboardMock } from "../../../test-utils/clipboardMock";

vi.mock("clipboard", async () => {
  const module = await import("../../../test-utils/clipboardMock");
  return { default: module.default };
});

describe("ReactClipboard unit", () => {
  beforeEach(() => {
    resetClipboardMock();
  });

  it("adds clipboard attributes and fires success callback", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(
      <ReactClipboard text="copy text" onSuccess={onSuccess}>
        <button>Copy Text</button>
      </ReactClipboard>,
    );

    const button = screen.getByRole("button", { name: "Copy Text" });

    expect(button).toHaveAttribute("data-clipboard-text", "copy text");

    await user.click(button);

    expect(onSuccess).toHaveBeenCalledWith(expect.objectContaining({ action: "copy", text: "copy text" }));
  });

  it("unmounts cleanly after initialization", async () => {
    const { unmount } = render(
      <ReactClipboard text="copy text">
        <button>Copy Text</button>
      </ReactClipboard>,
    );

    expect(() => unmount()).not.toThrow();
  });
});
