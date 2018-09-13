import React from "react";
import styled from "react-emotion";

const SummaryTable = styled("dl")({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridGap: "5px",
  margin: "1em",
  lineHeight: "1.4",

  "@media (max-width: 426px)": {
    margin: "0"
  }
});

const DT = styled("dt")({
  gridColumn: "1",
  fontWeight: "bold"
});
const DD = styled("dd")({
  gridColumn: "2",
  marginLeft: "40px",
  overflow: "hidden",

  "@media (max-width: 426px)": {
    gridColumn: "1",
    margin: "0 0 10px"
  }
});

function Summary({ user, n_tx, final_balance }) {
  return (
    <React.Fragment>
      <h3>Account Summary</h3>
      <SummaryTable>
        <DT>Address</DT>
        <DD>{user}</DD>
        <DT>Transactions</DT>
        <DD>{n_tx}</DD>
        <DT>Final Balance</DT>
        <DD>{final_balance}</DD>
      </SummaryTable>
    </React.Fragment>
  );
}

export default Summary;
