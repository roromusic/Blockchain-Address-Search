import React from "react";
import { render, cleanup } from "react-testing-library";
import Summary from "../components/Summary";

afterEach(cleanup);

test("Summary component renders user, n_tx, and final_balance props", () => {
  const fakeUser = "lol";
  const fake_n_tx = "10000";
  const fake_final_balance = "1337";
  const { getByText } = render(
    <Summary
      user={fakeUser}
      n_tx={fake_n_tx}
      final_balance={fake_final_balance}
    />
  );
  const address = getByText(/address/i);
  const transactions = getByText(/transactions/i);
  const balance = getByText(/final balance/i);

  expect(address.nextSibling.innerHTML).toBe(fakeUser);
  expect(transactions.nextSibling.innerHTML).toEqual(fake_n_tx);
  expect(balance.nextSibling.innerHTML).toEqual(fake_final_balance);
});
