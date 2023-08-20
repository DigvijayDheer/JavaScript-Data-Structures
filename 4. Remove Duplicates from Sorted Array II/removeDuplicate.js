/**
 * Removes excess duplicate occurrences from a sorted array while maintaining relative order.
 * Each unique element should appear at most twice.
 * @param {number[]} nums - The sorted integer array.
 * @return {number} - The length of the modified array.
 */

var removeDuplicates = function (nums) {
  if (nums.length <= 2) {
    return nums.length; // No need to remove duplicates
  }

  let index = 2; // Start from the third element

  for (let current = 2; current < nums.length; current++) {
    if (
      nums[current] !== nums[index - 2] ||
      nums[current] !== nums[index - 1]
    ) {
      nums[index] = nums[current];
      index++;
    }
  }

  return index;
};

const testCases = [
  [1, 1, 1, 2, 2, 3],
  [0, 0, 1, 1, 1, 1, 2, 3, 3],
  [1, 1, 1],
  [1, 2, 3, 4],
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    console.log("Test Case", count++ + ":");
    console.log("Input:", testCase);
    const output = removeDuplicates(testCase);
    console.log("Output:", output);
    console.log("Modified Array:", testCase.slice(0, output));
    console.log("\n");
  }
};

executeDriverCode(testCases);
