/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function (prices) {
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }
  return maxProfit;
};

const testCases = [
  [7, 1, 5, 3, 6, 4], // 7
  [1, 2, 3, 4, 5], // 4
  [7, 6, 4, 3, 1], // 0
  [3, 3, 5, 0, 0, 3, 1, 4], // 8
  [1, 2, 3, 4, 5], // 4
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    console.log(`\n---- Executing test case: ${count++} ----`);
    console.log("Input:", testCase);
    const result = maxProfit(testCase);
    console.log("Maximum profit:", result);
  }
};

executeDriverCode(testCases);
