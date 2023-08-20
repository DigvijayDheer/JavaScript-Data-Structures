/**
 * @param {number[]} nums
 * @return {number}
 */

var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0; // If the array is empty, no duplicates to remove
  }

  let uniqueIndex = 0; // Index for placing unique elements

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[i]; // Place the unique element at the next unique index
    }
  }

  return uniqueIndex + 1; // Return the count of unique elements
};

const testCases = [
  [1, 1, 2],
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
  [-2, -2, 0, 0, 2, 2, 3, 3, 5, 5],
  [10, 10, 10, 10, 10],
  [4, 7, 7, 10, 12, 18, 18, 18, 21],
  [1, 2, 3, 4, 5, 6],
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    console.log("Case", count++ + ":");
    console.log("Input:", testCase);
    const output = removeDuplicates(testCase);
    console.log("Output:", output);
    console.log("Modified Array:", testCase.slice(0, output));
    console.log("\n");
  }
};

executeDriverCode(testCases);
