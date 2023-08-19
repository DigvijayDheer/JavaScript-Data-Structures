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

// Example 1:
const nums1 = [1, 1, 2];
console.log(removeDuplicates(nums1));

// Example 2:
const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums2));

// Example 3:
const nums3 = [-2, -2, 0, 0, 2, 2, 3, 3, 5, 5];
console.log(removeDuplicates(nums3));

// Example 4:
const nums4 = [10, 10, 10, 10, 10];
console.log(removeDuplicates(nums4));

// Example 5:
const nums5 = [4, 7, 7, 10, 12, 18, 18, 18, 21];
console.log(removeDuplicates(nums5));

// Example 6:
const nums6 = [1, 2, 3, 4, 5, 6];
console.log(removeDuplicates(nums6));
