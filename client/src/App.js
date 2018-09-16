import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { convertToUSD } from "./utils/helper";

import User from "./components/User";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";

const LoadedTransactions = Loadable.Map({
  loader: {
    Transactions: () => import("./components/Transactions"),
    Summary: () => import("./components/Summary"),
    DisplayTransactions: () => import("./components/DisplayTransactions"),
    Pagination: () => import("./components/Pagination")
  },
  loading() {
    return <h1>LOading</h1>;
  },
  render(loaded, props) {
    let Transactions = loaded.Transactions.default;
    let Summary = loaded.Summary.default;
    let DisplayTransactions = loaded.DisplayTransactions.default;
    let Pagination = loaded.Pagination.default;

    return (
      <Transactions>
        <Transactions.Consumer>
          {({
            displaySatoshi,
            usd,
            toggleDetails,
            expanded,
            resetExpanded
          }) => (
            <React.Fragment>
              <Summary
                user={props.user}
                n_tx={props.n_tx}
                final_balance={
                  displaySatoshi
                    ? props.final_balance
                    : convertToUSD(props.final_balance, usd)
                }
              />
              <DisplayTransactions
                txs={props.txs}
                user={props.user}
                displaySatoshi={displaySatoshi}
                usd={usd}
                toggleDetails={toggleDetails}
                expanded={expanded}
              />
              <Pagination
                page={props.page}
                n_tx={props.n_tx}
                changePage={props.changePage}
                resetExpanded={resetExpanded}
              />
            </React.Fragment>
          )}
        </Transactions.Consumer>
      </Transactions>
    );
  }
});
function App() {
  return (
    <Router>
      <Route path="/users/:id">
        {({ match }) => (
          <User match={match}>
            {props => (
              <React.Fragment>
                <SearchBar fetchUser={props.fetchUser} />
                {props.loading ? <Spinner /> : null}
                {props.error ? (
                  <pre>{JSON.stringify(props.error.statusText, null, 2)}</pre>
                ) : null}
                {props.user ? <LoadedTransactions {...props} /> : null}
              </React.Fragment>
            )}
          </User>
        )}
      </Route>
    </Router>
  );
}

export default App;
