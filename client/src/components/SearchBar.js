import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import history from "../utils/history";
import { css as emoCSS } from "emotion";
import styled from "react-emotion";

const css = (...args) => ({ className: emoCSS(...args) });

const Input = styled("input")({
  backgroundColor: "inherit",
  border: "none",
  width: "100%",
  color: "white",
  fontSize: "1.6em",
  fontWeight: "bold",
  outline: "non",
  caretColor: "var(--green)"
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    history.push(`/users/${this.state.input}`);
    this.props.fetchUser(this.state.input, 0);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <header
        {...css({
          padding: "20px",
          height: "100px",
          backgroundColor: "var(--gray)",
          color: "white"
        })}
      >
        <p
          {...css({
            fontSize: "0.8em",
            marginBottom: "10px"
          })}
        >
          Search a Bitcoin Address
        </p>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="account address"
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default withRouter(SearchBar);
