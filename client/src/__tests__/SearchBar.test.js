import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import historyMock from "../utils/history";
import { render, fireEvent, cleanup } from "react-testing-library";
import SearchBar from "../components/SearchBar";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock("../utils/history");

test("clicking on Bitcoin Genesis button fetches genesis address", () => {
  const genesisAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  const genesisPath = "/users/" + genesisAddress;
  const fakeFetchUser = jest.fn();
  const { getByText } = render(
    <Router>
      <SearchBar fetchUser={fakeFetchUser} />
    </Router>
  );

  const genesisButton = getByText(/Genesis of Bitcoin/i);
  fireEvent.click(genesisButton);

  expect(historyMock.push).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledWith(genesisPath);
  expect(fakeFetchUser).toHaveBeenCalledTimes(1);
  expect(fakeFetchUser).toHaveBeenCalledWith(genesisAddress, 0);
});

test("submitting search pushes to history and calls fetchUser", () => {
  const fakeAddress = "lol";
  const fakeFetchUser = jest.fn();
  const { getByPlaceholderText } = render(
    <Router>
      <SearchBar fetchUser={fakeFetchUser} />
    </Router>
  );
  const textfield = getByPlaceholderText(/account address/i);
  const form = document.querySelector("form");

  fireEvent.change(textfield, { target: { value: fakeAddress } });
  fireEvent.submit(form);

  expect(historyMock.push).toHaveBeenCalledTimes(1);
  expect(historyMock.push).toHaveBeenCalledWith("/users/" + fakeAddress);
  expect(fakeFetchUser).toHaveBeenCalledTimes(1);
  expect(fakeFetchUser).toHaveBeenCalledWith(fakeAddress, 0);
});
