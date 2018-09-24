import React from "react";
import ReactDOM from "react-dom";
import { cleanup, wait } from "react-testing-library";
import * as apiMock from "../utils/api";
import User from "../components/User";

const fakeUser = {
  n_tx: 1,
  final_balance: 1337,
  address: "lol",
  txs: {
    inputs: [{ prev_out: { addr: "lol", spent: true, value: 1337 } }],
    out: [{ addr: "lol", spent: false, value: 1337 }],
    size: 257,
    weight: 1337,
    tx_index: 12345
  }
};
jest.mock("../utils/api", () => {
  const fakeUser = {
    n_tx: 1,
    final_balance: 1337,
    address: "lol",
    txs: {
      inputs: [{ prev_out: { addr: "lol", spent: true, value: 1337 } }],
      out: [{ addr: "lol", spent: false, value: 1337 }],
      size: 257,
      weight: 1337,
      tx_index: 12345
    }
  };
  return {
    user: jest.fn(() => Promise.resolve(fakeUser))
  };
});
afterEach(() => {
  cleanup();
  apiMock.user.mockClear();
});

test("attempts to get user on mount if there is a match.params.id", async () => {
  await setup({ params: { id: true } });
  expect(apiMock.user).toHaveBeenCalledTimes(1);
});

test("does not attempt to get user on mount if there is no match.params.id", async () => {
  await setup();
  expect(apiMock.user).not.toHaveBeenCalled();
});

test("fetching rerenders with retrieved user", async () => {
  const { children, controller } = await setup();

  controller.fetchUser();

  expect(apiMock.user).toHaveBeenCalledTimes(1);

  await wait(() => expect(children).toHaveBeenCalledTimes(2));

  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({ loading: true, error: null })
  );
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      loading: false,
      error: null,
      user: fakeUser.address,
      n_tx: fakeUser.n_tx,
      final_balance: fakeUser.final_balance,
      txs: fakeUser.txs
    })
  );
});

test("on fetch failure, rerenders with the error", async () => {
  const { children, controller } = await setup();
  const fakeError = { error: "error" };
  apiMock.user.mockImplementationOnce(() => Promise.reject(fakeError));

  controller.fetchUser().catch(i => i);

  expect(apiMock.user).toHaveBeenCalledTimes(1);
  await wait(() => expect(children).toHaveBeenCalledTimes(2));
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      error: null,
      loading: true
    })
  );
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({ error: fakeError, loading: false })
  );
});

test("on page change, rerenders with correct page", async () => {
  const { children, controller } = await setup({ params: { id: true } });

  expect(apiMock.user).toHaveBeenCalledTimes(1);
  controller.changePage(2);
  await wait(() => expect(children).toHaveBeenCalledTimes(3));
  expect(children).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
});

async function setup(match = { params: { id: null } }) {
  let controller;
  const children = jest.fn(c => {
    controller = c;
    return null;
  });
  const div = document.createElement("div");
  ReactDOM.render(<User match={match}>{children}</User>, div);
  if (match.params.id) children.mockClear();
  await wait(() => expect(children).toHaveBeenCalledTimes(1));
  children.mockClear();
  return { controller, children };
}
