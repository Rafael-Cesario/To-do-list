import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { sendError } from '../sendError';

const Component = () => {
  return (
    <div id="dummy">
      <label htmlFor="input-test" role="label">
        Email
      </label>
      <input type="text" id="input-test" />
    </div>
  );
};

describe('Send error', () => {
  it('Change a label text and give it a error class', async () => {
    render(<Component />);

    const label = screen.getByRole('label');
    const errorMessage = 'This is a error message';
    const errors = { dummy: errorMessage };

    sendError(errors);

    expect(label).toHaveTextContent(errorMessage);
    expect(label.className).toMatch(/error/);
  });
});
