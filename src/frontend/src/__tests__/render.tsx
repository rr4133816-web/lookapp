import { AppProvider } from "@/context/AppContext";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

/** Renders the current router location so tests can assert navigation. */
function LocationProbe() {
  const location = useLocation();
  return (
    <div data-testid="location">
      {location.pathname}
      {location.search}
    </div>
  );
}

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Initial URL entries for the MemoryRouter. */
  route?: string;
  /** Route path pattern to mount the element at. Defaults to a catch-all. */
  path?: string;
}

/**
 * Render a component inside the app's real providers (AppProvider + router).
 * The router is a MemoryRouter so tests can assert navigation without a browser.
 */
export function renderWithProviders(
  ui: ReactElement,
  { route = "/", path = "*", ...options }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <AppProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
          <LocationProbe />
        </MemoryRouter>
      </AppProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
