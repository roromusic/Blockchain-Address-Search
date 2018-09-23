import React from "react";
import { render, cleanup } from "react-testing-library";
import * as helper from "../utils/helper";
import TransactionDetails from "../components/TransactionDetails";

afterEach(() => {
  cleanup();
});

jest.mock("../utils/helper", () => {
  return {
    convertToUSD: jest.fn(() => "$ 0.00")
  };
});

const fakeInputs = [{ addr: "foo", value: 1337 }];
const fakeOutputs = [
  { addr: "bar", value: 1338 },
  { addr: "baz", value: 1339 }
];
const fakeWeight = 1331;
const fakeSize = 1332;
const fakeUSD = 1333;

test("TransactionDetails component renders inputs, outputs, fees, size, and weight", () => {
  const { getByText } = render(
    <TransactionDetails
      inputs={fakeInputs}
      outputs={fakeOutputs}
      weight={fakeWeight}
      size={fakeSize}
      usd={fakeUSD}
      displaySatoshi={true}
    />
  );

  const input1_addr = getByText(fakeInputs[0].addr);
  const output1_addr = getByText(fakeOutputs[0].addr);
  const output2_addr = getByText(fakeOutputs[1].addr);
  const weight = getByText(/weight/i);
  const size = getByText(/size/i);

  expect(Number(input1_addr.nextSibling.innerHTML)).toBe(fakeInputs[0].value);
  expect(Number(output1_addr.nextSibling.innerHTML)).toBe(fakeOutputs[0].value);
  expect(Number(output2_addr.nextSibling.innerHTML)).toBe(fakeOutputs[1].value);
  expect(Number(weight.nextSibling.innerHTML)).toBe(fakeWeight);
  expect(Number(size.nextSibling.innerHTML)).toBe(fakeSize);
  expect(helper.convertToUSD).not.toHaveBeenCalled();
});

test("satoshi values get converted to USD when displaySatoshi is false", () => {
  const { getByText } = render(
    <TransactionDetails
      inputs={fakeInputs}
      outputs={fakeOutputs}
      weight={fakeWeight}
      size={fakeSize}
      usd={fakeUSD}
      displaySatoshi={false}
    />
  );

  const input1_addr = getByText(fakeInputs[0].addr);
  const output1_addr = getByText(fakeOutputs[0].addr);
  const output2_addr = getByText(fakeOutputs[1].addr);
  const weight = getByText(/weight/i);
  const size = getByText(/size/i);

  expect(helper.convertToUSD).toHaveBeenCalledTimes(6);
  expect(input1_addr.nextSibling.innerHTML).toMatch(/^\$\s\d+.\d{2}/);
  expect(output1_addr.nextSibling.innerHTML).toMatch(/^\$\s\d+.\d{2}/);
  expect(output2_addr.nextSibling.innerHTML).toMatch(/^\$\s\d+.\d{2}/);
  expect(Number(weight.nextSibling.innerHTML)).toBe(fakeWeight);
  expect(Number(size.nextSibling.innerHTML)).toBe(fakeSize);
});
