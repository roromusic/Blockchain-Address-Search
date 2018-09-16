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
  state = {
    input: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    history.push(`/users/${this.state.input}`);
    this.props.fetchUser(this.state.input, 0);
  };

  fetchGenesis = () => {
    history.push(`/users/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`);
    this.props.fetchUser("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", 0);
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

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
        <div
          {...css({
            display: "flex",
            justifyContent: "space-between"
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
          <button
            {...css({
              height: "20px",
              border: "1px solid var(--green)",
              backgroundColor: "transparent",
              color: "var(--green)",
              cursor: "pointer",
              outline: "none",
              borderRadius: "5px",
              boxShadow: "var(--shadow)",
              transition: "all 0.5s ease 0s",
              ":hover": {
                boxShadow: "var(--shadowHover)"
              }
            })}
            onClick={this.fetchGenesis}
          >
            Genesis of Bitcoin
          </button>
        </div>
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
