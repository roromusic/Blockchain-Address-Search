import React from "react";
import styled, { keyframes } from "react-emotion";
import { createPortal } from "react-dom";

const spinnerRoot = document.getElementById("modal");

const smallBoxKeyframes = keyframes({
  "0%": {
    transform: "scale(0.2)"
  },
  "100%": {
    transform: "scale(0.75)"
  }
});

const smallBoxAnim = {
  animation: `${smallBoxKeyframes} 1.25s alternate infinite ease-in-out`
};

const loaderKeyframes = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(90deg)"
  }
});

const loaderAnim = {
  animation: `${loaderKeyframes} 1.25s infinite ease-in-out`
};

const SpinnerOuter = styled("div")({
  position: "fixed",
  top: "0",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw"
});

const SpinnerInner = styled("div")(
  {
    width: "3em",
    height: "3em",
    outline: "1px solid transparent"
  },
  loaderAnim
);

const Spinner_LargeBox = styled("div")({
  height: "3em",
  width: "3em",
  backgroundColor: "var(--green)",
  outline: "1px solid transparent",
  position: "fixed"
});

const Spinner_SmallBox = styled("div")(
  {
    height: "3em",
    width: "3em",
    backgroundColor: "black",
    position: "fixed",
    zIndex: "1",
    outline: "1px solid transparent"
  },
  smallBoxAnim
);

function SpinnerContainer() {
  return (
    <SpinnerOuter>
      <SpinnerInner>
        <Spinner_LargeBox />
        <Spinner_SmallBox />
      </SpinnerInner>
    </SpinnerOuter>
  );
}

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    spinnerRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    spinnerRoot.removeChild(this.el);
  }

  render() {
    return createPortal(<SpinnerContainer />, this.el);
  }
}

export default Spinner;
