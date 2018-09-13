import React from "react";
import styled from "react-emotion";
import { convertToUSD } from "../utils/helper";

function TransactionDetails({
  inputs,
  outputs,
  weight,
  size,
  usd,
  displaySatoshi
}) {
  let totalInput = 0;
  let totalOutput = 0;

  return (
    <Details>
      <IOContainer>
        <IO>
          <h3>Inputs</h3>
          <IOList>
            {inputs.map((input, index) => {
              totalInput += input.value;

              return (
                <IOItem key={index + input.value + input.addr}>
                  <IOAddr>{input.addr}</IOAddr>
                  <IOValue>
                    {displaySatoshi
                      ? input.value
                      : convertToUSD(input.value, usd)}
                  </IOValue>
                </IOItem>
              );
            })}
          </IOList>
          <div>{`Input Total: ${
            displaySatoshi ? totalInput : convertToUSD(totalInput, usd)
          }`}</div>
        </IO>
        <IO>
          <h3>Outputs</h3>
          <IOList>
            {outputs.map((output, index) => {
              totalOutput += output.value;

              return (
                <IOItem key={index + output.value + output.addr}>
                  <IOAddr>{output.addr}</IOAddr>
                  <IOValue>
                    {displaySatoshi
                      ? output.value
                      : convertToUSD(output.value, usd)}
                  </IOValue>
                </IOItem>
              );
            })}
          </IOList>
          <div>
            {`Output Total: ${
              displaySatoshi ? totalOutput : convertToUSD(totalOutput, usd)
            }`}
          </div>
        </IO>
      </IOContainer>
      <Misc>
        <h3>Details</h3>
        <Table>
          <DT>Fees</DT>
          <DD>
            {displaySatoshi
              ? totalInput - totalOutput
              : convertToUSD(totalInput - totalOutput, usd)}
          </DD>
          <DT>Size</DT>
          <DD>{size}</DD>
          <DT>Weight</DT>
          <DD>{weight}</DD>
        </Table>
      </Misc>
    </Details>
  );
}

const Details = styled("div")({
  marginBottom: "15px",
  backgroundColor: "var(--gray)",
  padding: "0 20px 20px 20px"
});

const IOContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap"
});

const IO = styled("div")({
  flex: "1"
});

const IOList = styled("ul")({
  marginBottom: "20px"
});

const IOItem = styled("li")({
  display: "flex",
  flexWrap: "wrap",
  margin: "5px 0"
});

const IOAddr = styled("div")({
  paddingRight: "20px",
  marginBottom: "5px",

  "@media (max-width: 426px)": {
    fontSize: "14px"
  }
});

const IOValue = styled("div")({
  marginRight: "20px"
});

const Misc = styled("div")();

const Table = styled("dl")({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridGap: "5px"
});

const DT = styled("dt")({
  gridColumn: 1
});

const DD = styled("dd")({
  gridColumn: "2",
  paddingLeft: "20px"
});
export default TransactionDetails;
