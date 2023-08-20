/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function (prices) {
  if (!prices.length) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    let potentialProfit = prices[i] - minPrice;

    if (potentialProfit > maxProfit) {
      maxProfit = potentialProfit;
    }

    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
  }

  return maxProfit;
};

const testCases = [
  [3, 8, 1, 9, 2, 5],
  [10, 7, 5, 8, 11, 9],
  [2, 2, 2, 2, 2, 2],
  [5, 4, 3, 2, 1],
  [2, 3, 4, 5, 6, 7],
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    console.log(`\n------- Test case ${count++}: -------`);
    console.log("Input:", testCase);
    console.log("Maximum Profit:", maxProfit(testCase));
  }
};

executeDriverCode(testCases);
