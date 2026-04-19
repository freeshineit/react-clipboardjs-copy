/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../Page";
import { resetClipboardMock } from "../../../test-utils/clipboardMock";

jest.mock("clipboard", () => require("../../../test-utils/clipboardMock").default);

describe("Page integration", () => {
  beforeEach(() => {
    resetClipboardMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("copies the static text example", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);

    render(<Page />);

    await user.click(screen.getByRole("button", { name: "Copy Text" }));

    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ text: "copy text" }));
  });

  test("copies input content and cuts textarea content", async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);

    render(<Page />);

    await user.click(screen.getByRole("button", { name: "Copy Input value" }));
    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ text: "git@github.com:freeshineit/react-clipboardjs-copy.git" }));

    await user.click(screen.getByRole("button", { name: "Cut" }));
    expect(consoleSpy).toHaveBeenCalledWith("Copy Success: ", expect.objectContaining({ action: "cut", text: "Mussum ipsum cacilds..." }));
  });
});
