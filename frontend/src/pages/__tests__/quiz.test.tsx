import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from '../quiz';
import * as api from '../../services/api';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('Quiz page', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('changes selects and triggers download', async () => {

  vi.spyOn(api, 'getResources').mockResolvedValue([]);
  const createObjectURLSpy = vi.fn();

  Object.defineProperty(global.URL, 'createObjectURL', {
    writable: true,
    value: createObjectURLSpy,
  });

  const clickSpy = vi.fn();
  const origCreateElement = document.createElement.bind(document);

  vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
    const el = origCreateElement(tagName as any);
    if (tagName === 'a') {
      // @ts-ignore
      el.click = clickSpy;
    }
    return el;
  });

  render(<Quiz />);

  const selects = screen.getAllByRole('combobox');

  fireEvent.change(selects[0], { target: { value: 'Advanced' } });
  fireEvent.change(selects[1], { target: { value: 'Confident' } });
  fireEvent.change(selects[2], { target: { value: 'Water-based' } });
  fireEvent.change(selects[3], { target: { value: 'Yes' } });
  fireEvent.change(selects[4], { target: { value: 'Strong' } });
  fireEvent.change(selects[5], { target: { value: 'Long' } });

  const submitBtn = screen.getByRole('button', { name: /Submit Quiz/i });

  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });

  });
});
