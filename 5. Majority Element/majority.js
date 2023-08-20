/**
 * @param {number[]} nums
 * @return {number}
 */

var majorityElement = function (nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  return candidate;
};

const testCases = [
  [3, 2, 3], // Expectede Output: 3
  [2, 2, 1, 1, 1, 2, 2], // Expectede Output: 2
  [1, 2, 2, 2, 3, 4, 2, 2, 2], // Expectede Output: 2
  [5, 5, 5, 5, 2, 2, 2], // Expectede Output: 5
  [-1, -1, -1, 2, 2, 2, -1], // Expectede Output: -1
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    console.log("Test Case", count++ + ":");
    console.log("Input:", testCase);
    console.log("Majority Element:", majorityElement(testCase));
    console.log("\n");
  }
};

executeDriverCode(testCases);
