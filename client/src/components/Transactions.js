import React from "react";
import styled from "react-emotion";
import * as api from "../utils/api";

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
    console.log(expanded);
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
      console.log("fetch usd");
    }, 10000);
  }

  render() {
    return (
      <TransactionsContext.Provider value={this.state}>
        <React.Fragment>
          <CurrencyDisplay
            displaySatoshi={this.state.displaySatoshi}
            toggleCurrency={this.toggleCurrency}
          />
          {this.props.children}
        </React.Fragment>
      </TransactionsContext.Provider>
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

export default Transactions;
