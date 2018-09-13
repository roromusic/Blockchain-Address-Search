import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { convertToUSD } from "./utils/helper";

import User from "./components/User";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import Transactions from "./components/Transactions";
import Summary from "./components/Summary";
import DisplayTransactions from "./components/DisplayTransactions";
import Pagination from "./components/Pagination";

function App() {
  return (
    <Router>
      <Route path="/users/:id">
        {({ match }) => (
          <User match={match}>
            {({
              user,
              n_tx,
              final_balance,
              txs,
              loading,
              page,
              error,
              fetchUser,
              changePage
            }) => (
              <React.Fragment>
                <SearchBar fetchUser={fetchUser} />
                {loading ? <Spinner /> : null}
                {error ? (
                  <pre>{JSON.stringify(error.statusText, null, 2)}</pre>
                ) : null}
                {user ? (
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
                            user={user}
                            n_tx={n_tx}
                            final_balance={
                              displaySatoshi
                                ? final_balance
                                : convertToUSD(final_balance, usd)
                            }
                          />
                          <DisplayTransactions
                            txs={txs}
                            user={user}
                            displaySatoshi={displaySatoshi}
                            usd={usd}
                            toggleDetails={toggleDetails}
                            expanded={expanded}
                          />
                          <Pagination
                            page={page}
                            n_tx={n_tx}
                            changePage={changePage}
                            resetExpanded={resetExpanded}
                          />
                        </React.Fragment>
                      )}
                    </Transactions.Consumer>
                  </Transactions>
                ) : null}
              </React.Fragment>
            )}
          </User>
        )}
      </Route>
    </Router>
  );
}

export default App;
