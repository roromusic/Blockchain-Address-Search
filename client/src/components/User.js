import React, { Component } from "react";
import * as api from "../utils/api";

class User extends Component {
  initialState = {
    user: null,
    n_tx: undefined,
    final_balance: undefined,
    txs: [],
    loading: false,
    page: 1,
    error: null
  };
  state = this.initialState;
  timeOut = null;
  reset(overrides) {
    const newState = { ...this.initialState, ...overrides };
    this.setState(newState);
    return newState;
  }
  componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      this.fetchUser(this.props.match.params.id, this.state.page - 1);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      clearTimeout(this.timeOut);
      if (this.props.match.params.id)
        this.fetchUser(this.props.match.params.id, this.state.page - 1);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  fetchUser = (id, offset, stale = false) => {
    !stale && this.setState({ loading: true });
    return api.user(id, offset).then(
      ({ n_tx, final_balance, txs, address }) => {
        this.reset({
          n_tx,
          final_balance,
          txs,
          user: address,
          page: offset + 1
        });
        this.timeOut = setTimeout(() => {
          this.fetchUser(this.state.user, this.state.page - 1, true);
          console.log("refetched");
        }, 10000);
      },
      error => {
        clearTimeout(this.timeOut);
        this.reset({ error });
      }
    );
  };
  changePage = page => {
    if (page === this.state.page) return;

    clearTimeout(this.timeOut);
    this.setState({ page }, () => this.fetchUser(this.state.user, page - 1));
  };

  render() {
    return this.props.children({
      ...this.state,
      fetchUser: this.fetchUser,
      changePage: this.changePage
    });
  }
}

export default User;
