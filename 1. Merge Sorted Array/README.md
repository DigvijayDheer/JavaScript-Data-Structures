## Merge Sorted Array

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function, but instead be _stored inside the array_ `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

#### Example 1:

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
```

#### Example 2:

```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

#### Example 3:

```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
```

#### Constraints:

- `nums1.length == m + n`
- `nums2.length == n`
- `0 <= m, n <= 200`
- `1 <= m + n <= 200`
- `-109 <= nums1[i], nums2[j] <= 109`

> **Follow up:** Can you come up with an algorithm that runs in `O(m + n)` time?

#### Hint:

1. You can easily solve this problem if you simply think about two elements at a time rather than two arrays. We know that each of the individual arrays is sorted. What we don't know is how they will intertwine. Can we take a local decision and arrive at an optimal solution?
2. If you simply consider one element each at a time from the two arrays and make a decision and proceed accordingly, you will arrive at the optimal solution.

## Solution

### Overview:

You are given two sorted integer arrays `nums1` and `nums2`, where `nums1` has a size of `(m + n)` to accommodate additional elements from `nums2`. Merge `nums2` into `nums1` as one sorted array while ensuring that elements are modified in-place.

### Approach 1: Using Extra Space

One simple approach is to create a new array, copy elements from both arrays while maintaining the sorted order, and then copy the merged array back to `nums1`. This approach requires extra space proportional to the sum of the sizes of `nums1` and `nums2`.

#### Implementation:

```javascript
var merge = function (nums1, m, nums2, n) {
  const merged = [];
  let i = 0,
    j = 0;

  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }

  while (i < m) {
    merged.push(nums1[i]);
    i++;
  }

  while (j < n) {
    merged.push(nums2[j]);
    j++;
  }

  for (let k = 0; k < merged.length; k++) {
    nums1[k] = merged[k];
  }
};
```

#### Step-by-Step Explanation:

1. Initialize an empty array `merged` to hold the merged result.
2. Initialize two pointers `i` and `j` to 0, representing the current positions in `nums1` and `nums2` respectively.
3. Use a loop to compare elements from both arrays while neither pointer reaches its respective array's length:
   - If `nums1[i]` is smaller than `nums2[j]`, push `nums1[i]` into `merged` and increment `i`.
   - If `nums2[j]` is smaller than or equal to `nums1[i]`, push `nums2[j]` into `merged` and increment `j`.
4. After the loop, if there are remaining elements in `nums1` or `nums2`, add them to `merged`.
5. Copy the elements from `merged` back to `nums1` to complete the in-place modification.

#### Pros:

- This approach is straightforward to understand and implement.
- It produces the correct result with sorted elements.

#### Cons:

- It requires extra space proportional to the sum of the sizes of `nums1` and `nums2`, which can be inefficient if the arrays are large.

#### Real-Time Usage Scenarios:

- This approach might be suitable when memory usage is not a concern, and the arrays are relatively small.
- In scenarios where the memory overhead is manageable and the primary concern is code simplicity, this approach could be a good choice.

#### Complexity Analysis:

- **Time Complexity:** The loop runs for a maximum of `m + n` iterations, where `m` is the length of `nums1` and `n` is the length of `nums2`. Thus, the time complexity is **O(m + n)**.
- **Space Complexity:** The extra space used by the `merged` array is **O(m + n)**, as it holds the merged result.

### Approach 2: Using Insertion Sort

You can also consider using insertion sort logic, where you shift elements of `nums1` to the right to make space for elements from `nums2`. Then, insert elements from `nums2` at the appropriate positions in `nums1`.

#### Implementation:

```javascript
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
};
```

#### Step-by-Step Explanation:

1. Initialize three pointers `i`, `j`, and `k`. Pointer `i` starts at the last valid element in `nums1`, pointer `j` starts at the last element in `nums2`, and pointer `k` starts at the last position of the merged array.
2. Use a loop to compare elements from both arrays while `i` and `j` are within valid bounds:
   - If `nums1[i]` is greater than `nums2[j]`, move `nums1[i]` to position `k` and decrement `i`.
   - Otherwise, move `nums2[j]` to position `k` and decrement `j`.
   - Decrement `k` after each placement.
3. If there are remaining elements in `nums2` after the loop, copy them to the remaining positions in `nums1`.

#### Pros:

- It modifies `nums1` in-place without requiring extra space, which can be efficient in terms of memory usage.
- This approach directly utilizes the sorted property of `nums1` and `nums2`.

#### Cons:

- It involves shifting elements in `nums1`, which can be time-consuming for larger arrays.

#### Real-Time Usage Scenarios:

- This approach is beneficial when memory is a concern, and you want to minimize the use of extra space.
- It's a good choice when the input arrays are relatively small and the goal is to minimize memory usage while sorting in-place.

#### Complexity Analysis:

- **Time Complexity:** The loop runs for a maximum of `m + n` iterations, where `m` is the length of `nums1` and `n` is the length of `nums2`. The additional shifting of elements in `nums1` can contribute to a time complexity of **O(m + n)**.
- **Space Complexity:** The space complexity is constant **O(1)**, as no additional space is used except for a few pointers.

### Approach 3: Reverse Merging

This approach involves starting from the end of the merged array and comparing elements from both input arrays. You place the larger element at the end of `nums1`, and decrement the corresponding index. This way, you can avoid moving elements around as much.

#### Implementation:

```javascript
var merge = function (nums1, m, nums2, n) {
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
};
```

**Step-by-Step Explanation:**

1. Initialize three pointers `i`, `j`, and `k`. Pointer `i` starts at the last valid element in `nums1`, pointer `j` starts at the last element in `nums2`, and pointer `k` starts at the last position of the merged array.
2. Use a loop to compare elements from both arrays while `i` and `j` are within valid bounds:
   - If `nums1[i]` is greater than `nums2[j]`, move `nums1[i]` to position `k` and decrement `i`.
   - Otherwise, move `nums2[j]` to position `k` and decrement `j`.
   - Decrement `k` after each placement.
3. If there are remaining elements in `nums2` after the loop, copy them to the remaining positions in `nums1`.

#### Pros:

- Similar to Approach 2, it modifies `nums1` in-place without requiring extra space.
- It avoids shifting elements by starting from the end, which can be more efficient than Approach 2 for larger arrays.

#### Cons:

- As with Approach 2, it involves shifting elements, which can still be time-consuming for larger arrays.

#### Real-Time Usage Scenarios:

- - This approach is also useful when memory is a concern and you want to minimize the use of extra space.
- It's especially beneficial when you want to minimize memory usage while optimizing the time complexity compared to Approach 2.

#### Comlexity Analysis:

- **Time Complexity:** The loop runs for a maximum of `m + n` iterations, leading to a time complexity of **O(m + n)**.
- **Space Complexity:** The space complexity is constant **O(1)**, as no additional space is used except for pointers.

#### Conclusion:

Each of the three approaches provides a solution to merge two sorted arrays in-place. Approach 1 is simple but uses extra space. Approach 2 and Approach 3 are memory-efficient, with Approach 3 being preferred for larger arrays due to minimized element shifting. The choice of approach depends on the specific scenario and trade-offs between time complexity and space complexity.
