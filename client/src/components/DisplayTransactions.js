import React from "react";
import styled from "react-emotion";
import { convertToUSD, getSum } from "../utils/helper";
import TransactionDetails from "./TransactionDetails";

function DisplayTransactions({
  txs,
  user,
  displaySatoshi,
  usd,
  toggleDetails,
  expanded
}) {
  return (
    <TransactionsWrapper>
      <h3>Transactions</h3>
      <ul>
        {txs.map(tx => {
          const inputs = tx.inputs.map(input => {
            if (input.prev_out) {
              let { addr, value } = input.prev_out;
              return { addr, value };
            } else {
              return { addr: "Newly Mined", value: null };
            }
          });

          const outputs = tx.out.map(output => {
            let { spent, addr, value } = output;
            return { spent, addr, value };
          });

          const sum = getSum(inputs, outputs, user);
          const item = (
            <TransactionItem
              onClick={() => {
                toggleDetails(tx.tx_index);
              }}
            >
              <TransactionDate>
                {new Date(tx.time * 1000).toDateString().slice(4)}
              </TransactionDate>
              <TransactionId>{`Tx ID: ${tx.tx_index}`}</TransactionId>
              <TransactionSum sum={sum}>
                {displaySatoshi ? sum : convertToUSD(sum, usd)}
              </TransactionSum>
            </TransactionItem>
          );

          const details = (
            <TransactionDetails
              inputs={inputs}
              outputs={outputs}
              weight={tx.weight}
              size={tx.size}
              displaySatoshi={displaySatoshi}
              expanded={expanded}
              usd={usd}
            />
          );

          return (
            <Transaction key={tx.tx_index} /*details={details}*/>
              {item}
              {expanded.includes(tx.tx_index) && details}
            </Transaction>
          );
        })}
      </ul>
    </TransactionsWrapper>
  );
}

const TransactionsWrapper = styled("div")({
  width: "100%",
  margin: "40px 0"
});

const TransactionItem = styled("div")({
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  marginTop: "5px"
});

const TransactionDate = styled("div")();
const TransactionId = styled("div")({ flex: "1", textAlign: "center" });
const TransactionSum = styled("div")(props => ({
  textAlign: "right",
  color: props.sum > 0 ? "#1DB954" : "red"
}));

const Transaction = styled("li")({
  listStyle: "none"
});

export default DisplayTransactions;
