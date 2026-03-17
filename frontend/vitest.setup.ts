import 'whatwg-fetch';
import { vi } from "vitest";
import '@testing-library/jest-dom'

// Mock CSS imports
vi.mock('./AddResource.css', () => ({}));
vi.mock('../styles/landing.css', () => ({}));
vi.mock('../styles/navbar.css', () => ({}));
vi.mock('../styles/swim-theme.css', () => ({}));