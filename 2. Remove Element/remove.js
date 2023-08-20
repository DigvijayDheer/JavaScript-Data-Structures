/**
 * Removes all occurrences of val from nums in-place.
 * @param {number[]} nums - The integer array.
 * @param {number} val - The value to remove.
 * @return {number} - The number of elements in nums which are not equal to val.
 * @param {number} length - The length up to which to print the array.
 */

var removeElement = function (nums, val) {
  var j = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[j++] = nums[i];
    }
  }
  return j;
};

const testCases = [
  { nums: [3, 2, 2, 3], val: 3 },
  { nums: [0, 1, 2, 2, 3, 0, 4, 2], val: 2 },
  { nums: [5, 5, 5, 5], val: 5 },
  { nums: [], val: 10 },
  { nums: [1, 2, 3, 4, 5], val: 10 },
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    const { nums, val } = testCase;
    console.log("Case", count++ + ":");
    console.log("Input:", nums);
    console.log("Value to be removed:", val);
    const output = removeElement(nums, val);
    console.log("Output:", output);
    console.log("Modified Array:", nums.slice(0, output));
    console.log("\n");
  }
};

executeDriverCode(testCases);
