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

const testCases = [
  {
    nums1: [1, 2, 3, 0, 0, 0],
    m: 3,
    nums2: [2, 5, 6],
    n: 3,
  },
  {
    nums1: [1, 2, 4, 5, 6, 0],
    m: 5,
    nums2: [3],
    n: 1,
  },
  {
    nums1: [0],
    m: 0,
    nums2: [1],
    n: 1,
  },
  {
    nums1: [4, 5, 6, 0, 0, 0],
    m: 3,
    nums2: [1, 2, 3],
    n: 3,
  },
];

const executeDriverCode = (testCases) => {
  let count = 1;
  for (const testCase of testCases) {
    const { nums1, m, nums2, n } = testCase;
    console.log("Case", count++ + ":");
    console.log("nums1:", nums1);
    console.log("m:", m);
    console.log("nums2:", nums2);
    console.log("n:", n);
    merge(nums1, m, nums2, n);
    console.log("Merged Array is:", nums1);
    console.log("\n");
  }
};

executeDriverCode(testCases);
