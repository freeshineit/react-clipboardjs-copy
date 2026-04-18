import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactClipboard from "react-clipboardjs-copy";
import { getLastClipboardMock, resetClipboardMock } from "../../../test-utils/clipboardMock";

jest.mock("clipboard", () => require("../../../test-utils/clipboardMock").default);

describe("ReactClipboard unit", () => {
  beforeEach(() => {
    resetClipboardMock();
  });

  test("adds clipboard attributes and fires success callback", async () => {
    const user = userEvent.setup();
    const onSuccess = jest.fn();

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

  test("destroys the clipboard instance on unmount", async () => {
    const { unmount } = render(
      <ReactClipboard text="copy text">
        <button>Copy Text</button>
      </ReactClipboard>,
    );

    await waitFor(() => {
      expect(getLastClipboardMock()).not.toBeNull();
    });

    const clipboard = getLastClipboardMock();

    expect(clipboard).not.toBeNull();

    unmount();

    expect(clipboard?.destroyed).toBe(true);
  });
});
