import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Page from "../Page";
import { resetClipboardMock } from "../../../test-utils/clipboardMock";

vi.mock("clipboard", async () => {
  const module = await import("../../../test-utils/clipboardMock");
  return { default: module.default };
});

describe("Page integration", () => {
  beforeEach(() => {
    resetClipboardMock();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the static text example", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    render(<Page />);

    await user.click(screen.getByRole("button", { name: "Copy Text" }));

    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ text: "copy text" }));
  });

  it("copies input content and cuts textarea content", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    render(<Page />);

    await user.click(screen.getByRole("button", { name: "Copy Input value" }));
    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ text: "git@github.com:freeshineit/react-clipboardjs-copy.git" }));

    await user.click(screen.getByRole("button", { name: "Cut" }));
    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ action: "cut", text: "Mussum ipsum cacilds..." }));
  });
});
