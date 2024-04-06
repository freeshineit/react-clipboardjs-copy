import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactClipboard from './';

test('renders learn click ReactClipboard component', async () => {
  const handleClick = jest.fn();
  render(
    <ReactClipboard text="copy text">
      <button onClick={handleClick}>Copy Text</button>
    </ReactClipboard>,
  );
  fireEvent.click(screen.getByText(/Copy Text/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('component copy text', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  const copyText = 'copy text';

  await render(
    <ReactClipboard
      text={copyText}
      onSuccess={(e) => {
        expect(e?.text).toBe(copyText);
      }}
      onError={() => {
        expect('fail').toBe('fail');
      }}
    >
      <button onClick={handleClick} data-testid="button">
        Copy Text
      </button>
    </ReactClipboard>,
  );
  const copyButton = screen.getByTestId('button');

  await user.click(copyButton);
  // await navigator.clipboard.writeText('copy text');
  // const clipboardText = await navigator.clipboard.readText();
  // expect(clipboardText).toBe('copy text');
});

test('component cut text', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  const cutText = 'this is textarea';

  await render(
    <section className="app-item">
      <div className="app-item-desc">
        <textarea id="textarea" defaultValue={cutText}></textarea>
        <div />
      </div>
      <ReactClipboard
        action="cut"
        target="#textarea"
        onSuccess={(e) => {
          expect(e?.text).toBe(cutText);
        }}
        onError={() => {
          expect('fail').toBe('fail');
        }}
      >
        <button onClick={handleClick} data-testid="button">
          Cut
        </button>
      </ReactClipboard>
    </section>,
  );
  const copyButton = screen.getByTestId('button');

  await user.click(copyButton);
});
