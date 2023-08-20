/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var rotate = function (nums, k) {
  let len = nums.length;
  k = k % len; // Handle case where k is greater than len

  // Reverse the entire array
  reverse(nums, 0, len - 1);

  // Reverse the first k elements
  reverse(nums, 0, k - 1);

  // Reverse the remaining elements
  reverse(nums, k, len - 1);
};

// Helper function to reverse a portion of the array
function reverse(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}

const testCases = [
  { nums: [3, 8, 9, 1, 2], k: 2 },
  { nums: [0, 5, 7, 12, 20], k: 4 },
  { nums: [4, 2, 9, 6, 1], k: 0 },
  { nums: [10], k: 3 },
  { nums: [7, 4, 1, 8, 3], k: 7 },
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    const { nums, k } = testCase;
    console.log(`\n----- Test case ${count++}: -----`);
    console.log("Input:", nums);
    console.log("Steps to rotate (k):", k);
    rotate(nums, k);
    console.log("Rotated Array:", nums);
  }
};

executeDriverCode(testCases);
