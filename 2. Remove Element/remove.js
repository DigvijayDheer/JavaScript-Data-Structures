/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

var removeElement = function (nums, val) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow++] = nums[fast];
    }
  }

  return slow;
};

// Example 1:
console.log(removeElement([3, 2, 2, 3], 3));
// Expected output: 2, nums = [2, 2, _, _]

// Example 2:
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
// Expected output: 5, nums = [0, 1, 4, 0, 3, _, _, _]

// Example 3:
console.log(removeElement([], 5));
// Expected output: 0, nums = []

// Example 4:
console.log(removeElement([5, 5, 5, 5, 5], 5));
// Expected output: 0, nums = [_, _, _, _, _]

// Example 5:
console.log(removeElement([1, 2, 3, 4, 5], 6));
// Expected output: 5, nums = [1, 2, 3, 4, 5]
