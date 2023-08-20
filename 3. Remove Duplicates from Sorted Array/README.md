## Remove Duplicates from Sorted Array

Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each unique element appears only **once**. The **relative order** of the elements should be kept the **same**. Then return _the number of unique elements in_ `nums`.

Consider the number of unique elements of `nums` to be `k`, to get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

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
```

If all assertions pass, then your solution will be **accepted**.

#### Example 1:

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

#### Example 2:

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

#### Constraints:

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in **non-decreasing** order.

#### Hint:

1. In this problem, the key point to focus on is the input array being sorted. As far as duplicate elements are concerned, what is their positioning in the array when the given array is sorted? Look at the image above for the answer. If we know the position of one of the elements, do we also know the positioning of all the duplicate elements?
   ![hint_rem_dup](hint_rem_dup.png)
2. We need to modify the array in-place and the size of the final array would potentially be smaller than the size of the input array. So, we ought to use a two-pointer approach here. One, that would keep track of the current element in the original array and another one for just the unique elements.
3. Essentially, once an element is encountered, you simply need to **bypass** its duplicates and move on to the next unique element.

## Solution

### Overview:

The problem "Remove Duplicates from Sorted Array" deals with manipulating a sorted array of integers to remove duplicate elements in-place while maintaining the relative order of the remaining unique elements. The objective is to return the count of unique elements present in the modified array and demonstrate that the algorithm works by providing a custom judge.

The problem statement defines that to achieve acceptance, the following requirements must be met:

1. Modify the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially.
2. Return the value `k`, representing the count of unique elements.

The problem provides custom judge code to verify the correctness of the solution. The judge code compares the output of the algorithm against an expected answer with correct length. If the algorithm passes this verification, it is considered accepted.

#### Approaches:

Several approaches can be used to solve this problem, with varying levels of efficiency and simplicity. Some of the key approaches are:

1. **Two Pointer (Optimal):** Using two pointers to traverse the array while updating it in-place. One pointer tracks the current position being considered for uniqueness, and the other iterates through the array to find new unique elements. This approach has a time complexity of O(n) and a space complexity of O(1).

2. **Set (Not In-Place):** Utilizing a set to track unique elements and constructing a new array without duplicates. While not in-place, it provides a simple solution with a time complexity of O(n) and a space complexity of O(n).

3. **Create a New Array (Not In-Place):** Creating a new array to store unique elements while iterating through the original array. This approach also has a time complexity of O(n) and a space complexity of O(n).

4. **Counting Duplicate Occurrences (Not In-Place):** Counting the occurrences of elements in the array using a dictionary or hash map, then creating a new array with unique elements based on the keys. It has a time complexity of O(n) and a space complexity of O(n).

5. **Splice (Not Recommended):** Using the `splice` method to remove duplicate elements. While not efficient due to the repeated `splice` operations, it works. The time complexity of this approach is O(n^2) on average.

### Approach 1: Two Pointer (Optimal)

This approach utilizes two pointers - one for iterating through the array and another for keeping track of the position where unique elements should be placed. It takes advantage of the fact that the input array is sorted.

1.  Initialize `uniqueIndex` as 0.
2.  Iterate through the array from index 1 to the end:
    - If the current element is different from the element at `nums[uniqueIndex]`, increment `uniqueIndex` and place the current element at that index.
3.  Return `uniqueIndex + 1` as the count of unique elements.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesTwoPointer = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let uniqueIndex = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniqueIndex]) {
      uniqueIndex++;
      nums[uniqueIndex] = nums[i];
    }
  }

  return uniqueIndex + 1;
};
```

#### Complexity Analysis:

This approach is highly efficient as it works in-place and maintains the order of the original array. It employs two pointers - `uniqueIndex` and `current` - to traverse the array. The `uniqueIndex` points to the position where the next unique element should be placed, while the `current` pointer iterates through the array.

- **Time Complexity:** O(n)
- **Space Complexity:** O(1)

#### Pros

- Achieves optimal time complexity by traversing the array once.
- In-place modification of the input array, which saves memory.
- Preserves the relative order of elements.
- Minimal space overhead, as it doesn't require additional data structures.

#### Cons:

- Requires careful management of array indices.

#### Real-Life Usage:

- Sorting algorithms like Quicksort and Merge Sort utilize a two-pointer approach to rearrange elements in-place efficiently.

### Approach 2: Set (Not In-Place)

This approach doesn't modify the original array in-place, but instead uses a set to keep track of unique elements.

1.  Initialize an empty set.
2.  Iterate through the array:
    - If the current element is not in the set, add it to the set and add it to the result array.
3.  Return the length of the result array.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesWithSet = function (nums) {
  const uniqueSet = new Set();
  const result = [];

  for (const num of nums) {
    if (!uniqueSet.has(num)) {
      uniqueSet.add(num);
      result.push(num);
    }
  }

  return result.length;
};
```

#### Complexity Analysis:

This approach involves using a set to track unique elements and constructing a new array without duplicates. While it's not in-place, it's simple to implement and maintains the original array.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

#### Pros:

- Simple to implement, requiring no complex index manipulation.
- Creates a new array that retains the original order.
- Suitable when in-place modification isn't strictly required.

#### Cons:

- Consumes additional memory due to the set data structure.
- Not in-place, which might not meet the problem's constraints.

#### Real-Life Usage:

- Counting unique elements in a dataset.
- Extracting distinct items from a list for further processing.

### Approach 3: Create a New Array (Not In-Place)

This approach creates a new array without duplicates and returns its length.

1.  Initialize an empty array for storing unique elements.
2.  Iterate through the original array:
    - If the current element is different from the last element added to the new array, append it to the new array.
3.  Return the length of the new array.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesWithNewArray = function (nums) {
  const uniqueArray = [];

  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      uniqueArray.push(nums[i]);
    }
  }

  return uniqueArray.length;
};
```

#### Complexity Analysis:

In this approach, a new array is constructed to hold unique elements while iterating through the original array. The new array is created without duplicates, preserving the order.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

#### Pros:

- Easy to understand and implement.
- Preserves the original array, useful for comparisons and analysis.
- Provides a new array containing only the unique elements.

#### Cons:

- Requires additional space for the new array.
- Not an in-place modification of the input array.

#### Real-Life Usage:

- Maintaining a history of data changes.
- Constructing a new dataset with distinct values for specific operations.

### Approach 4: Counting Duplicate Occurrences (Not In-Place)

This approach involves counting the occurrences of each element in the array and then creating a new array with the unique elements.

1.  Initialize an empty object to store element counts.
2.  Iterate through the array and count the occurrences of each element in the object.
3.  Create a new array with the unique elements based on the object keys.
4.  Return the length of the new array.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesWithCounting = function (nums) {
  const counts = {};

  for (const num of nums) {
    counts[num] = (counts[num] || 0) + 1;
  }

  const uniqueArray = Object.keys(counts).map(Number);

  return uniqueArray.length;
};
```

#### Complexity Analysis:

This approach focuses on counting the occurrences of elements in the array using a dictionary (hash map) and then constructing a new array with unique elements based on the dictionary keys.

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)

#### Pros:

- Offers a clear count of unique elements.
- Adaptable to counting occurrences of various elements.

#### Cons:

- Requires additional space for the dictionary/hash map.
- Generates a new array containing unique elements, not a modified version of the input array.

#### Real-Life Usage:

- Analyzing the frequency of specific events or data points.
- Extracting unique identifiers from a dataset for further processing.

### Approach 5: Splice (Not Recommended)

This approach uses the `splice` method to remove duplicate elements from the array. It's less efficient as `splice` operation takes O(n) time for each removal.

1.  Iterate through the array from end to start:
    - If the current element is the same as the previous element, use `splice` to remove it from the array.
2.  Return the length of the modified array.

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicatesWithSplice = function (nums) {
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] === nums[i - 1]) {
      nums.splice(i, 1);
    }
  }

  return nums.length;
};
```

#### Complexity Analysis:

This approach employs the `splice` method to remove duplicate elements. While it's an in-place approach, its efficiency is suboptimal due to repeated `splice` operations.

- **Time Complexity:** O(n^2) on average
- **Space Complexity:** O(1)

#### Pros:

- In-place modification of the input array, saving memory.

#### Cons:

- Inefficient due to quadratic time complexity on average.
- The repeated `splice` operation causes inefficient memory handling.

#### Real-Life Usage:

- Generally not recommended due to inefficiency.
- Situations where preserving the original array structure is crucial, but efficiency isn't a primary concern.

> **Note:** Please note that while all these approaches can be used in JavaScript, the "Two Pointer" approach is generally the most efficient and recommended solution for this specific problem.

#### Conclusion:

The problem "Remove Duplicates from Sorted Array" challenges the programmer to manipulate a sorted array to remove duplicates while adhering to specific constraints. The two-pointer approach is the recommended solution due to its efficiency and in-place nature. However, it's important to understand other approaches as they provide insights into different programming techniques and trade-offs.
