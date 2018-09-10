import React, { Component } from "react";

const api =
  "http://localhost:1337/api/https://blockchain.info/rawaddr/3Ed62sPENkraPwpovPty9YMFGJ8FtTyv63?offset=0";

class User extends Component {
  initialState = { data: null };
  state = this.initialState;

  componentDidMount() {
    fetch(api, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    return (
      <pre>
        <code>{JSON.stringify(this.state, null, 2)}</code>
      </pre>
    );
  }
}

export default User;
