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
      if (this.props.match.params.id)
        this.fetchUser(this.props.match.params.id, this.state.page - 1);
    }
  }
  fetchUser = (...args) => {
    this.reset({ loading: true });
    return api.user(...args).then(
      ({ n_tx, final_balance, txs, address }) => {
        this.reset({ n_tx, final_balance, txs, user: address });
      },
      error => {
        this.reset({ error });
      }
    );
  };
  render() {
    return this.props.children({
      ...this.state,
      fetchUser: this.fetchUser
    });
  }
}

export default User;
