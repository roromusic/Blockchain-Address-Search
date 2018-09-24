import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import DisplayTransactions from "../components/DisplayTransactions";

afterEach(cleanup);

test("toggles transaction details when item is clicked", () => {
  const fakeTxs = [
    {
      inputs: [{ prev_out: { addr: "lol", spent: true, value: 1337 } }],
      out: [{ addr: "lol", spent: false, value: 1337 }],
      size: 257,
      weight: 1337,
      tx_index: 12345
    }
  ];
  const mockToggleDetails = jest.fn();

  const { getByText } = render(
    <DisplayTransactions
      txs={fakeTxs}
      user={"Bob"}
      displaySatoshi={false}
      usd={1337}
      toggleDetails={mockToggleDetails}
      expanded={[]}
    />
  );
  const item = getByText(`Tx ID: ${fakeTxs[0].tx_index}`);

  fireEvent.click(item);

  expect(mockToggleDetails).toHaveBeenCalledTimes(1);
  expect(mockToggleDetails).toHaveBeenCalledWith(fakeTxs[0].tx_index);
});
