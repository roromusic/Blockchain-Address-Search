import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import User from "./components/User";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import Transactions from "./components/Transactions";

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
              fetchUser
            }) => (
              <React.Fragment>
                <SearchBar fetchUser={fetchUser} />
                {loading ? <Spinner /> : null}
                {error ? (
                  <pre>{JSON.stringify(error.statusText, null, 2)}</pre>
                ) : null}
                {user ? (
                  <Transactions
                    user={user}
                    n_tx={n_tx}
                    final_balance={final_balance}
                    txs={txs}
                  />
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
