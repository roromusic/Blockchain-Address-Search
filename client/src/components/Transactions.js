import React from "react";
import styled from "react-emotion";
import * as api from "../utils/api";
import { convertToUSD, getSum } from "../utils/helper";

class Transactions extends React.Component {
  initialState = { displaySatoshi: false, usd: null, expanded: [] };
  state = this.initialState;
  reset(overrides) {
    const newState = { ...this.initialState, ...overrides };
    this.setState(newState);
    return newState;
  }
  componentDidMount() {
    this.fetchUSD();
  }
  fetchUSD() {
    api.usd().then(usd => {
      this.setState({ usd });
    });
  }
  toggleCurrency = () => {
    this.setState({ displaySatoshi: !this.state.displaySatoshi });
  };
  toggleDetails = id => {
    let expanded = this.state.expanded.concat();
    if (expanded.includes(id)) expanded = expanded.filter(item => item !== id);
    else expanded.push(id);
    console.log(expanded);
    this.setState({ expanded });
  };
  render() {
    return (
      <React.Fragment>
        <CurrencyDisplay
          displaySatoshi={this.state.displaySatoshi}
          toggleCurrency={this.toggleCurrency}
        />
        <Summary
          user={this.props.user}
          n_tx={this.props.n_tx}
          final_balance={
            this.state.displaySatoshi
              ? this.props.final_balance
              : convertToUSD(this.props.final_balance, this.state.usd)
          }
        />
        <DisplayTransactions
          txs={this.props.txs}
          user={this.props.user}
          displaySatoshi={this.state.displaySatoshi}
          usd={this.state.usd}
          toggleDetails={this.toggleDetails}
        />
      </React.Fragment>
    );
  }
}

const Currency = styled("div")({
  height: "42px",
  paddingTop: "5px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center"
});

const CurrencySwitch = styled("div")({
  width: "40px",
  height: "20px",
  margin: "0px 10px",
  backgroundColor: "black",
  cursor: "pointer"
});

const CurrencySelection = styled("div")(props => ({
  height: "100%",
  width: "25px",
  backgroundColor: "var(--green)",
  border: "2px solid black",
  float: props.displaySatoshi ? "left" : "right"
}));

function CurrencyDisplay({ displaySatoshi, toggleCurrency }) {
  return (
    <Currency>
      <div>Satoshi</div>
      <CurrencySwitch onClick={toggleCurrency}>
        <CurrencySelection displaySatoshi={displaySatoshi} />
      </CurrencySwitch>
      <div>USD</div>
    </Currency>
  );
}
const SummaryTable = styled("dl")({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridGap: "5px",
  margin: "1em",
  lineHeight: "1.4"
});

const DT = styled("dt")({
  gridColumn: "1",
  fontWeight: "bold"
});
const DD = styled("dd")({
  gridColumn: "2",
  marginLeft: "40px",
  overflow: "hidden"
});

function Summary({ user, n_tx, final_balance }) {
  return (
    <React.Fragment>
      <h3>Account Summary</h3>
      <SummaryTable>
        <DT>Address</DT>
        <DD>{user}</DD>
        <DT>Transactions</DT>
        <DD>{n_tx}</DD>
        <DT>Final Balance</DT>
        <DD>{final_balance}</DD>
      </SummaryTable>
    </React.Fragment>
  );
}

const TransactionsWrapper = styled("div")({
  width: "100%"
});

const TransactionItem = styled("div")({
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  marginTop: "5px"
});

const TransactionDate = styled("div")({ flex: "1" });
const TransactionId = styled("div")({ flex: "1" });
const TransactionSum = styled("div")(props => ({
  flex: "1 0",
  textAlign: "right",
  color: props.sum > 0 ? "#1DB954" : "red"
}));

const Transaction = styled("li")({
  listStyle: "none"
});

function DisplayTransactions({
  txs,
  user,
  displaySatoshi,
  usd,
  toggleDetails
}) {
  return (
    <TransactionsWrapper>
      <h3>Transactions</h3>
      <ul>
        {txs.map(tx => {
          const inputs = tx.inputs.map(input => {
            let { addr, value } = input.prev_out;
            return { addr, value };
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

          // const details = (
          //   <TransactionDetails
          //     txID={tx.tx_index}
          //     inputs={inputs}
          //     outputs={outputs}
          //     weight={tx.weight}
          //     size={tx.size}
          //     displaySatoshi={this.state.displaySatoshi}
          //     expanded={this.state.expanded}
          //     toUSD={this.convertToUSD}
          //   />
          // );

          return (
            <Transaction key={tx.tx_index} /*details={details}*/>
              {item}
            </Transaction>
          );
        })}
      </ul>
    </TransactionsWrapper>
  );
}
export default Transactions;
