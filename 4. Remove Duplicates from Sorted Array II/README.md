## Remove Duplicates from Sorted Array II

Given an integer array `nums` sorted in **non-decreasing order**, remove some duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` _after placing the final result in the first_ `k` _slots of_ `nums`.

Do **not** allocate extra space for another array. You must do this by **modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with O(1) extra memory.

#### Custom Judge:

```
The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}

If all assertions pass, then your solution will be  **accepted**.
```

#### Example 1:

```
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

#### Example 2:

```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation:** Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

#### Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` is sorted in **non-decreasing** order.

## Solution

### Overview:

The problem revolves around efficiently handling duplicates in a sorted array while adhering to a strict occurrence limit. Given a sorted integer array, the goal is to modify it in-place to retain each unique element at most twice. The relative order of the elements must be preserved, and the function should return the length of the modified array.

### Problem Details

Given:

- A sorted integer array `nums`.
- The array contains both positive and negative integers.
- Each unique element must appear at most twice in the modified array.

The task is to:

1.  Remove excess duplicate occurrences beyond the limit of two.
2.  Retain the relative order of the elements.
3.  Return the length of the modified array.

### Approach Overview

Several strategies can be employed to solve this problem efficiently:

1.  **Two Pointers (In-Place):**

    - Use two pointers to track the position for the next non-duplicate element.
    - Iterate through the array and compare the current element with the element two positions before the pointer.
    - If it's a new element, place it at the appropriate position and move the pointers accordingly.
    - This approach ensures the modified array maintains the relative order of the elements and meets the occurrence constraint.

2.  **Counting Duplicates (In-Place):**

    - Utilize two pointers and an additional counter to track duplicate occurrences.
    - Iterate through the array and update the counter based on duplicate conditions.
    - Place the element at the next position if it adheres to the occurrence constraint.
    - Maintain the non-duplicate relative order by shifting elements in-place.
    - This approach provides a direct solution by incrementing the pointers and counters as needed.

3.  **Using a Set (Not In-Place):**

    - Create a map or set to count the occurrences of each element.
    - Iterate through the input array, updating the count in the map.
    - Create a new array to store the result, considering occurrence limits.
    - Add elements to the new array based on their counts.
    - This approach doesn't modify the input array in-place but provides a simple way to handle arbitrary occurrence limits.

### Considerations

Each approach has its strengths and weaknesses. The choice of approach depends on the specific requirements and constraints of the problem. For instance:

- If the goal is to minimize memory usage and the array is already sorted, the Two Pointers (In-Place) approach is a strong choice.
- If the input array might not be sorted, or if the duplicate limit could change, the Counting Duplicates (In-Place) approach is suitable.
- The Using a Set approach is useful when a flexible occurrence limit is desired, and memory usage is not a primary concern.

Ultimately, the selected approach should align with the problem's constraints and the desired trade-offs between efficiency, memory usage, and code complexity.

### Approach 1: Two Pointers (In-Place)

Use two pointers, one to keep track of the position where the next non-duplicate element should be placed and another to iterate through the array.

1. Initialize two pointers: `index` (to keep track of the position for the next non-duplicate element) and `current` (to iterate through the array).
2. Iterate through the array using the `current` pointer:
   - If `nums[current]` is not equal to `nums[index - 2]`, then it's a non-duplicate element. Place it at the `index` position and increment both pointers.
   - Otherwise, skip the duplicate element by just incrementing the `current` pointer.
3. After iterating through the array, return the value of `index` as the length of the modified array.

#### Implementation

```javascript
var removeDuplicates = function (nums) {
  if (nums.length <= 2) {
    return nums.length;
  }

  let index = 2;

  for (let current = 2; current < nums.length; current++) {
    if (nums[current] !== nums[index - 2]) {
      nums[index] = nums[current];
      index++;
    }
  }

  return index;
};
```

#### Complexity Analysis:

- **Time Complexity:** The algorithm iterates through the array once, which takes **O(n)** time, where n is the length of the input array.

- **Space Complexity:** The algorithm modifies the input array in-place, using only a constant amount of extra space **O(1)**.

#### Pros:

- In-place modification: The algorithm modifies the input array directly, saving memory.
- Linear time complexity: The algorithm iterates through the array once, providing efficient performance.

#### Cons:

- Not suitable for non-sorted arrays: This approach specifically relies on the input array being sorted.

#### Real-Life Usage:

- This approach is commonly used when you need to remove duplicates from a sorted array while maintaining relative order. For example, it can be useful in scenarios where you're dealing with sorted data and need to optimize memory usage.

### Approach 2: Counting Duplicates (In-Place)

Count the occurrences of each element and modify the array in-place to include each element at most twice.

1. Initialize variables: `index` (to keep track of the position for the next non-duplicate element), `count` (to count occurrences of the current element), and `current` (to iterate through the array).
2. Iterate through the array using the `current` pointer:
   - If `nums[current]` is not equal to the previous element (or if it's the first element), reset the `count` to 1.
   - Otherwise, increment the `count`.
   - If the `count` is less than or equal to 2, place the element at the `index` position and increment both `index` and `current`.
3. After iterating through the array, return the value of `index` as the length of the modified array.

#### Implementation

```javascript
var removeDuplicates = function (nums) {
  if (nums.length <= 2) {
    return nums.length;
  }

  let index = 2;
  let count = 1;

  for (let current = 1; current < nums.length; current++) {
    if (nums[current] !== nums[current - 1]) {
      count = 1;
    } else {
      count++;
    }

    if (count <= 2) {
      nums[index] = nums[current];
      index++;
    }
  }

  return index;
};
```

#### Complexity Analysis:

- **Time Complexity:** The algorithm iterates through the array once, taking **O(n)** time.

- **Space Complexity:** The algorithm uses only a constant amount of extra space **O(1)**.

#### Pros:

- Handles non-sorted arrays: Unlike Approach 1, this approach doesn't require a sorted array.
- In-place modification: Modifies the input array directly, minimizing memory usage.

#### Cons:

- Slightly more complex: Requires tracking the count of duplicate elements.

#### Real-Life Usage:

This approach is useful when you want to remove duplicates while maintaining a maximum occurrence of 2 for each element. It can be applied in scenarios involving sorted or unsorted data, where you need to maintain memory efficiency.

### Approach 3: Using a Set (Not In-Place)

Use a set to keep track of unique elements and their counts. Create a new array with the non-duplicate elements appearing at most twice.

1. Create a set to store unique elements and their counts.
2. Iterate through the input array and update the set.
3. Create a new array to hold the result.
4. Iterate through the set:
   - If the count is 1, add the element once to the new array.
   - If the count is 2 or more, add the element twice to the new array.
5. Return the new array and its length.

#### Implementation

```javascript
var removeDuplicates = function (nums) {
  const elementCount = new Map();

  for (const num of nums) {
    elementCount.set(num, (elementCount.get(num) || 0) + 1);
  }

  const result = [];

  for (const [num, count] of elementCount.entries()) {
    if (count >= 2) {
      result.push(num, num);
    } else {
      result.push(num);
    }
  }

  return result.length;
};
```

#### Complexity Analysis:

- **Time Complexity:** Building the element count map takes **O(n)** time, and iterating through the map takes **O(k)**, where k is the number of unique elements (usually smaller than n).

- **Space Complexity:** The algorithm uses additional space to store the element count map and the result array, both of which are proportional to the number of unique elements.

#### Pros:

- Handles arbitrary occurrences: Works for cases where you want to remove duplicates with any occurrence limit.
- Clear and easy to understand: Doesn't involve complex pointer manipulation.

#### Cons:

- Uses extra space: Unlike the in-place approaches, this approach requires additional memory.

#### Real-Life Usage:

This approach might be useful when memory efficiency isn't a primary concern and you need to deal with arbitrary occurrence limits for duplicate removal. It can be applicable when you're working with sorted or unsorted data and want a straightforward solution.

> Remember that the problem statement specifically asks for an in-place solution with O(1) extra memory, so Approach 1 or Approach 2 are more aligned with the requirements of this problem.

**Conclusion:**

The "Remove Duplicates from Sorted Array II" problem challenges us to efficiently remove excess duplicate occurrences from a sorted array while preserving the relative order of the elements. By adhering to a strict limit of at most two occurrences per unique element, we need to modify the array in-place and return the length of the modified array. Three main approaches are available to solve this problem, each with its own advantages and considerations.

**Important Notes:**

1. **Sorted Array:** The problem statement specifies that the input array is sorted in non-decreasing order. This property is crucial for the correct implementation of the algorithms. Failing to consider this can lead to incorrect results.

2. **In-Place Modification:** The problem explicitly requires an in-place solution, meaning that the modifications to the array should be made without using additional memory proportional to the input size.

3. **Occurrence Limit:** An essential aspect of the problem is the occurrence limit of at most two for each unique element. Be sure to understand and enforce this limit correctly in your implementation.

4. **Relative Order:** Maintaining the relative order of the elements is crucial. The final arrangement of the non-duplicate elements should mirror their original order in the input array.

5. **Choosing the Approach:** When selecting an approach, consider the constraints of the problem and the trade-offs between time complexity, space complexity, and code complexity. Each approach has its advantages and may be more suitable for different scenarios.

6. **Edge Cases:** Be mindful of edge cases, such as arrays with lengths of 1 or 2, and how they should be handled according to the problem requirements.

7. **Algorithm Complexity:** Understand the time and space complexities of each approach. All three approaches provided earlier have linear time complexity (O(n)).

8. **Custom Judge:** The problem includes a custom judge code that tests the correctness of your solution. Passing the provided assertions demonstrates the correctness of your implementation.

9. **Problem Variants:** Similar problems might ask for different occurrence limits or could be generalized to accommodate any occurrence limit. Adjust your approach accordingly based on the specific requirements.

By paying attention to these important notes and understanding the nuances of the problem, you can develop a robust and accurate solution that effectively removes duplicates while adhering to the constraints and specifications outlined in the problem statement.s
