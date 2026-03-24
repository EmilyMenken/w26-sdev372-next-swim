import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  window.alert = vi.fn();
  window.confirm = vi.fn();
  window.scrollTo = vi.fn(); // sometimes needed for testing-library
}