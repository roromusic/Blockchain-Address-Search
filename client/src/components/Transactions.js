import React from "react";
import styled, { css as emoCSS } from "react-emotion";
import * as api from "../utils/api";

const css = (...args) => ({ className: emoCSS(...args) });

const TransactionsContext = React.createContext({
  displaySatoshi: false,
  usd: null,
  expanded: [],
  toggleDetails: () => {},
  resetExpanded: () => {}
});

class Transactions extends React.Component {
  static Consumer = TransactionsContext.Consumer;

  toggleDetails = id => {
    let expanded = this.state.expanded.concat();
    if (expanded.includes(id)) expanded = expanded.filter(item => item !== id);
    else expanded.push(id);
    this.setState({ expanded });
  };
  resetExpanded = () => {
    this.setState({ expanded: [] });
  };

  initialState = {
    displaySatoshi: false,
    usd: null,
    expanded: [],
    toggleDetails: this.toggleDetails,
    resetExpanded: this.resetExpanded
  };
  state = this.initialState;

  timeOut = null;

  componentDidMount() {
    this.fetchUSD();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  toggleCurrency = () => {
    this.setState({ displaySatoshi: !this.state.displaySatoshi });
  };
  fetchUSD() {
    api.usd().then(usd => {
      this.setState({ usd });
    });

    this.timeOut = setTimeout(() => {
      this.fetchUSD();
    }, 10000);
  }

  render() {
    return (
      <TransactionsContext.Provider value={this.state}>
        <TxWrapper>
          <CurrencyDisplay
            displaySatoshi={this.state.displaySatoshi}
            toggleCurrency={this.toggleCurrency}
          />
          {this.props.children}
        </TxWrapper>
      </TransactionsContext.Provider>
    );
  }
}
const TxWrapper = styled("div")({
  padding: "20px"
});

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

function CurrencySelection(props) {
  return (
    <div
      data-testid="currency_selection"
      {...css({
        height: "100%",
        width: "25px",
        backgroundColor: "var(--green)",
        border: "2px solid black",
        float: props.displaySatoshi ? "left" : "right"
      })}
    />
  );
}

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

export default Transactions;
