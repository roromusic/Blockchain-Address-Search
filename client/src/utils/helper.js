function convertToUSD(satoshi, usd) {
  let num = (satoshi / 100000000) * usd;
  return `$ ${num.toFixed(2)}`;
}

function getSum(inputs, outputs, user) {
  let sum = 0;
  inputs.forEach(input => {
    if (input.addr === user) sum -= input.value;
  });
  outputs.forEach(output => {
    if (output.addr === user) sum += output.value;
  });

  return sum;
}

export { convertToUSD, getSum };
