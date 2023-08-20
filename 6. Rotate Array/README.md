## Rotate Array

Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

#### Example 1:

```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

#### Example 2:

```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```

#### Constraints:

- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

#### Follow up:

- Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.
- Could you do it in-place with `O(1)` extra space?

#### Hint:

1. The easiest solution would use additional memory and that is perfectly fine.
2. The actual trick comes when trying to solve this problem without using any additional memory. This means you need to use the original array somehow to move the elements around. Now, we can place each element in its original location and shift all the elements around it to adjust as that would be too costly and most likely will time out on larger input arrays.
3. One line of thought is based on reversing the array (or parts of it) to obtain the desired result. Think about how reversal might potentially help us out by using an example.
4. The other line of thought is a tad bit complicated but essentially it builds on the idea of placing each element in its original position while keeping track of the element originally in that position. Basically, at every step, we place an element in its rightful position and keep track of the element already there or the one being overwritten in an additional variable. We can't do this in one linear pass and the idea here is based on **cyclic-dependencies** between elements.

## Solution

### Overview:

The "Rotate Array" problem involves rotating the elements of an integer array to the right by a given number of steps. This rotation effectively shifts the elements to the right, with elements that "fall off" the right end being moved to the left end. The goal is to perform this rotation in various ways while adhering to the constraints of the problem.

#### Approaches:

Three main approaches were discussed to solve this problem:

1.  **Using Extra Array:**

    - Create a new array to store rotated elements.
    - Calculate new indices for each element after rotation.
    - Copy elements from the new array back to the original array.

2.  **Reversing Subarrays:**

    - Calculate the effective rotation (adjust for large `k`).
    - Reverse the entire array.
    - Reverse the first `k` elements.
    - Reverse the remaining elements.

3.  **Cyclic Replacements:**

    - Calculate the effective rotation (adjust for large `k`).
    - Initialize a count to track rotated elements.
    - Iterate through the array, performing cyclic replacements.

### Approach 1: Using Extra Array

The simplest solution involves using an extra array to store the rotated elements. We can calculate the new position of each element after rotation and copy them to the new array. Finally, we copy the new array back to the original array.

#### Approach:

1.  Create a new array called `rotated` of the same length as `nums`.
2.  Loop through each element in `nums` and calculate its new index after rotation (`(i + k) % n`) and store the element in the `rotated` array at the new index.
3.  Copy the elements from the `rotated` array back to the `nums` array.

#### Pseudo-code:

```
function rotate(nums, k):
    n = length of nums
    create rotated array of length n

    for i = 0 to n - 1:
        new_index = (i + k) % n
        rotated[new_index] = nums[i]

    for i = 0 to n - 1:
        nums[i] = rotated[i]
```

#### Implementation:

```javascript
var rotate = function (nums, k) {
  const n = nums.length;
  const rotated = Array(n);
  for (let i = 0; i < n; i++) {
    rotated[(i + k) % n] = nums[i];
  }
  for (let i = 0; i < n; i++) {
    nums[i] = rotated[i];
  }
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` where n is the length of the input array `nums`.
- **Space Complexity:** `O(n)` since we are using an additional array of the same size as `nums`.

#### Pros:

- Simple and straightforward to understand.
- Does not require in-place modification of the input array.

#### Cons:

- Uses extra space to store the rotated array.

#### Real-Life Usage:

This approach is useful when you want a clear and easy-to-understand solution and when memory usage is not a critical concern.

### Approach 2: Reversing Subarrays

This approach involves reversing subarrays to achieve the rotation effect. We reverse the entire array, then reverse the first `k` elements, and finally reverse the remaining elements.

#### Approach:

1.  Calculate the effective rotation (`k = k % n`) to handle cases where `k` is larger than the array length.
2.  Reverse the entire array.
3.  Reverse the first `k` elements.
4.  Reverse the remaining `n - k` elements.

#### Pseudo-code:

```
function rotate(nums, k):
    n = length of nums
    k = k % n

    reverse(nums, 0, n - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, n - 1)

function reverse(nums, start, end):
    while start < end:
        swap nums[start] and nums[end]
        increment start and decrement end
```

#### Implementation:

```javascript
var rotate = function (nums, k) {
  const n = nums.length;
  k %= n; // In case k is larger than n
  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
};

function reverse(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` where n is the length of the input array `nums`.
- **Space Complexity:** `O(1)` as it only uses a constant amount of extra space.

#### Pros:

- In-place solution that doesn't require extra space proportional to the array size.
- Efficient space complexity.

#### Cons:

- Requires multiple array reverse operations, which can be slightly complex to understand initially.

#### Real-Life Usage:

This approach is suitable when you need an in-place solution with better space efficiency. It's commonly used in scenarios where memory is limited or when working with embedded systems.

### Approach 3: Cyclic Replacements

This approach is based on the idea of cyclic replacements. We keep track of the count of elements that have been rotated and perform cyclic replacements until all elements have been rotated.

#### Approach:

1.  Calculate the effective rotation (`k = k % n`) to handle cases where `k` is larger than the array length.
2.  Initialize a variable `count` to keep track of the number of elements rotated.
3.  Start a loop that goes through each index in the array. a. Initialize `current` to the current index and `prev` to the value at that index. b. Use a `do-while` loop to perform cyclic replacements until we return to the starting index. c. Calculate the `next` index by `(current + k) % n`. d. Swap the values of `prev` and `nums[next]`, and update `current` with `next`. e. Increment the `count` variable.
4.  Continue the outer loop until all elements have been rotated.

#### Pseudo-code:

```
function rotate(nums, k):
    n = length of nums
    k = k % n
    count = 0

    for start = 0 to n - 1:
        current = start
        prev = nums[start]

        do:
            next = (current + k) % n
            swap prev and nums[next]
            current = next
            increment count
        while start != current
```

#### Implementation:

```javascript
var rotate = function (nums, k) {
  const n = nums.length;
  k %= n;
  let count = 0;

  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];

    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count++;
    } while (start !== current);
  }
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` where n is the length of the input array `nums`.
- **Space Complexity:** `O(1)` as it only uses a constant amount of extra space.

#### Pros:

- In-place solution with minimal space complexity.
- Elegant cyclic-replacement concept.

#### Cons:

- The cyclic-replacement concept might be slightly harder to grasp initially.

#### Real-Life Usage:

This approach is particularly useful when memory usage is critical and you need an efficient in-place rotation algorithm. It's used in various systems where memory is constrained and performance is crucial.

> **Note:** All three of these approaches solve the problem, but the second and third approaches use `O(1)` extra space, which is a more efficient solution in terms of space complexity. The third approach, in particular, is known as the "cycle-reversal" algorithm and is quite elegant.

### Conclusion:

The "Rotate Array" problem presents multiple ways to perform array rotation, each with its own trade-offs. The choice of approach depends on factors like memory constraints and the need for in-place solutions. Understanding these approaches equips you with valuable problem-solving skills for similar scenarios.
