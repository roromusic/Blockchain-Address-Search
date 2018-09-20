import React from "react";
import { render, cleanup } from "react-testing-library";
import Spinner from "../components/Spinner";

afterEach(cleanup);

test("Spinner is rendered when mounted, and removed on unmount", () => {
  const spinnerRoot = document.createElement("div");
  spinnerRoot.id = "modal";
  document.body.appendChild(spinnerRoot);

  const { unmount } = render(<Spinner />);
  expect(Object.keys(spinnerRoot.children).length).toBeGreaterThan(0);
  unmount();
  expect(Object.keys(spinnerRoot.children).length).toBe(0);
});
