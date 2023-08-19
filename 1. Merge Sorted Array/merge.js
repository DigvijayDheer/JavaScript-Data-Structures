/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
};

// Example 1:
var mergeExample1 = function () {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const m = 3;
  const nums2 = [2, 5, 6];
  const n = 3;

  merge(nums1, m, nums2, n);
  console.log(nums1); // Output: [1, 2, 2, 3, 5, 6]
};

mergeExample1();

// Example 2:
var mergeExample2 = function () {
  const nums1 = [1, 2, 4, 5, 6, 0];
  const m = 5;
  const nums2 = [3];
  const n = 1;

  merge(nums1, m, nums2, n);
  console.log(nums1); // Output: [1, 2, 3, 4, 5, 6]
};

mergeExample2();

// Example 3:
var mergeExample3 = function () {
  const nums1 = [0];
  const m = 0;
  const nums2 = [1];
  const n = 1;

  merge(nums1, m, nums2, n);
  console.log(nums1); // Output: [1]
};

mergeExample3();

// Example 4:
var mergeExample4 = function () {
  const nums1 = [4, 5, 6, 0, 0, 0];
  const m = 3;
  const nums2 = [1, 2, 3];
  const n = 3;

  merge(nums1, m, nums2, n);
  console.log(nums1); // Output: [1, 2, 3, 4, 5, 6]
};

mergeExample4();
