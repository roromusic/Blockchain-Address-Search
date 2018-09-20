import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Pagination from "../components/Pagination";

afterEach(cleanup);

test("calls resetExpanded and changePage with page number when button is clicked", () => {
  const fakeChangePage = jest.fn();
  const fakeResetExpanded = jest.fn();
  const { getByText } = render(
    <Pagination
      page={1}
      n_tx={100}
      changePage={fakeChangePage}
      resetExpanded={fakeResetExpanded}
    />
  );
  const nextButton = getByText(/next/i);
  fireEvent.click(nextButton);

  expect(fakeResetExpanded).toHaveBeenCalledTimes(1);
  expect(fakeChangePage).toHaveBeenCalledTimes(1);
  expect(fakeChangePage).toHaveBeenCalledWith(2);
});

test("Component should create at most 12 buttons - prev, next, and 10 page buttons", () => {
  const fakeChangePage = jest.fn();
  const fakeResetExpanded = jest.fn();
  const { container } = render(
    <Pagination
      page={1}
      n_tx={10000}
      changePage={fakeChangePage}
      resetExpanded={fakeResetExpanded}
    />
  );
  const buttons = container.querySelectorAll("li");
  expect(buttons[0].innerHTML).toBe("Previous");
  expect(buttons[buttons.length - 1].innerHTML).toBe("Next");
  expect(buttons.length).toBe(12);
});
