import 'whatwg-fetch';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock CSS imports
vi.mock('./AddResource.css', () => ({}));
vi.mock('../styles/landing.css', () => ({}));
vi.mock('../styles/navbar.css', () => ({}));
vi.mock('../styles/swim-theme.css', () => ({}));

if (typeof globalThis.window === 'undefined') {
  (globalThis as unknown as { window?: Record<string, unknown> }).window = {};
}

if (typeof globalThis.document === 'undefined') {
  (globalThis as unknown as { document?: Record<string, unknown> }).document = {
    createElement: () => ({ style: {} }),
    querySelector: () => null,
    body: {},
  };
}

(window as { alert?: () => void; confirm?: () => void; scrollTo?: () => void }).alert = vi.fn();
window.confirm = vi.fn();
window.scrollTo = vi.fn();