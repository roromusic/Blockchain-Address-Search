import React from "react";
import { render, cleanup, wait, fireEvent } from "react-testing-library";
import Transactions from "../components/Transactions";
import * as apiMock from "../utils/api";

jest.mock("../utils/api", () => ({
  usd: jest.fn(() => Promise.resolve(1337))
}));
afterEach(cleanup);

test("attempts to get the current usd price on mount", async () => {
  await setup();
  expect(apiMock.usd).toHaveBeenCalledTimes(1);
});

test("clicking the currency selection switch toggles currency", async () => {
  const { children, getByTestId } = await setup();
  const currencySwitch = getByTestId("currency_selection");

  fireEvent.click(currencySwitch);

  expect(children).toHaveBeenCalledTimes(1);
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      displaySatoshi: true
    })
  );

  fireEvent.click(currencySwitch);

  expect(children).toHaveBeenCalledTimes(2);
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      displaySatoshi: false
    })
  );
});

test("toggling details and resetting details rerenders with correct expanded state", async () => {
  const { children, controller } = await setup();

  controller.toggleDetails("1337");
  controller.toggleDetails("1338");

  expect(children).toHaveBeenCalledTimes(2);
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      expanded: ["1337", "1338"]
    })
  );

  controller.toggleDetails("1337");

  expect(children).toHaveBeenCalledTimes(3);
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      expanded: ["1338"]
    })
  );

  controller.resetExpanded();

  expect(children).toHaveBeenCalledTimes(4);
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      expanded: []
    })
  );
});

async function setup() {
  let controller;
  const children = jest.fn(c => {
    controller = c;
    return null;
  });
  const div = document.createElement("div");
  const { getByTestId } = render(
    <Transactions>
      <Transactions.Consumer>{children}</Transactions.Consumer>
    </Transactions>,
    div
  );
  children.mockClear();
  await wait(() => expect(children).toHaveBeenCalledTimes(1));
  children.mockClear();
  return { controller, children, getByTestId };
}
