import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

// jsdom does not implement matchMedia, which framer-motion and the reduced-motion
// checks in the app rely on. Provide a minimal, controllable stub.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// jsdom does not implement ResizeObserver, used by recharts' ResponsiveContainer.
if (!("ResizeObserver" in window)) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver =
    ResizeObserverStub;
}

// jsdom does not implement IntersectionObserver, used by framer-motion's
// whileInView animations. A no-op stub keeps those elements mounted.
if (!("IntersectionObserver" in window)) {
  class IntersectionObserverStub {
    root = null;
    rootMargin = "";
    thresholds: number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  (
    window as unknown as { IntersectionObserver: unknown }
  ).IntersectionObserver = IntersectionObserverStub;
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "";
});

afterEach(() => {
  cleanup();
});
