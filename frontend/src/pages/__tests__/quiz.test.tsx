import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../quiz';
import { describe, it, expect, beforeEach, vi } from 'vitest'; // <- make sure vi is imported

beforeEach(() => {
  vi.restoreAllMocks();
});

// Properly typed fetch mock
const fetchMock: vi.MockedFunction<typeof fetch> = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]),
    headers: new Headers(),
    redirected: false,
    statusText: 'OK',
    clone: () => null,
    body: null,
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => '',
  } as unknown as Response)
);

global.fetch = fetchMock;

describe('Quiz page', () => {
  it('changes selects and triggers download', () => {
    const createObjectURLSpy = vi.fn(() => 'blob:mock');
    Object.defineProperty(window, 'URL', { value: { createObjectURL: createObjectURLSpy } });

    const clickSpy = vi.fn();
    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = origCreateElement(tagName as any);
      if (tagName === 'a') el.click = clickSpy;
      return el;
    });

    render(<Quiz />);

    const levelSelect = screen.getAllByRole('combobox')[0];
    const downloadBtn = screen.getByRole('button', { name: /Submit Quiz/i });

    fireEvent.change(levelSelect, { target: { value: 'Advanced' } });
    fireEvent.click(downloadBtn);

    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });
});