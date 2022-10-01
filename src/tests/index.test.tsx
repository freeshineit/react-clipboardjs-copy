import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactClipboard from '../lib/index';

test('renders learn click ReactClipboard component', async () => {
  const handleClick = jest.fn();
  render(
    <ReactClipboard text='copy text'>
      <button onClick={handleClick}>Copy Text</button>
    </ReactClipboard>
  );
  fireEvent.click(screen.getByText(/Copy Text/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
