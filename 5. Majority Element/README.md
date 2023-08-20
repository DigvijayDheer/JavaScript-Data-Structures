## Majority Element

Given an array `nums` of size `n`, return _the majority element_.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

#### Example 1:

```
Input: nums = [3,2,3]
Output: 3
```

#### Example 2:

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

#### Constraints:

- `n == nums.length`
- `1 <= n <= 5 * 104`
- `-109 <= nums[i] <= 109`

> **Follow-up:** Could you solve the problem in linear time and in `O(1)` space?

## Solution

### Overview:

The "Majority Element" problem involves finding the element that appears more than `n/2` times in an array of integers. This problem is intriguing because it challenges you to efficiently identify an element that holds a significant majority within a dataset. The majority element always exists in the array, and the goal is to determine this element while satisfying specific time and space constraints.

Several approaches can be employed to solve this problem, each with its advantages and trade-offs. These approaches include:

1.  **Boyer-Moore Voting Algorithm:** This algorithm leverages the observation that a majority element will eventually dominate the count of all other elements if their counts are canceled out. It processes the array linearly, maintaining a "candidate" element and a count. This approach provides an elegant solution with linear time complexity and constant space usage.
2.  **Sorting:** Sorting the array allows the majority element to be found at the `n/2` index. Although this method satisfies the requirement, it introduces a higher time complexity due to the sorting step.
3.  **Hash Map:** Using a hash map to track the frequency of each element helps identify the majority element by scanning through the map. This approach is effective but comes with extra space usage.
4.  **Randomization:** The randomization approach involves picking a random index and checking if the element at that index is the majority element using a linear scan. While this method has a probabilistic nature, it can be improved with more iterations.
5.  **Divide and Conquer:** By recursively dividing the array and finding majority elements in subarrays, this approach can identify the majority element even if it appears fewer than `n/2` times. It provides more comprehensive information but has higher time complexity.

### Approach 1: Boyer-Moore Voting Algorithm

1. Initialize `candidate` as the first element of the array and `count` as 1.
2. Iterate through the array from the second element:
   a. If the current element is the same as `candidate`, increment `count`.
   b. If the current element is different from `candidate`, decrement `count`.
   - If `count` becomes 0, update `candidate` to the current element and reset `count` to 1.
3. After iterating through the array, the `candidate` will hold the majority element.

#### Pseudo-Code:

```plaintext
function majorityElement(nums):
    candidate = nums[0]
    count = 1

    for i = 1 to length(nums) - 1:
        if nums[i] == candidate:
            count = count + 1
        else:
            count = count - 1
            if count == 0:
                candidate = nums[i]
                count = 1

    return candidate
```

#### Implementation:

```javascript
var majorityElement = function (nums) {
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
      if (count === 0) {
        candidate = nums[i];
        count = 1;
      }
    }
  }

  return candidate;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Each element is scanned only once.
- **Space Complexity:** `O(1)` - Constant extra space is used.

#### Pros:

- Linear time complexity.
- Constant space complexity.

#### Cons:

- Doesn't work well if the majority element is less than or equal to `n/2` occurrences.

#### Real-Life Usage:

- Used in situations where the majority element is guaranteed to appear more than `n/2` times, such as voting systems.

### Approach 2: Sorting

1. Sort the array in ascending order using a sorting algorithm.
2. The majority element will always be the element at index `n/2` (where `n` is the length of the array), as it appears more than `n/2` times.

#### Pseudo-Code:

```plaintext
function majorityElement(nums):
    sort(nums) // Sorting the array

    return nums[length(nums) / 2] // Majority element is at index n/2
```

#### Implementation:

```javascript
var majorityElement = function (nums) {
  nums.sort();
  return nums[Math.floor(nums.length / 2)];
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n log n)` - Due to sorting.
- **Space Complexity:** `O(1)` - No extra space used.

#### Pros:

- Simple to understand and implement.
- Guarantees correct result if the majority element condition is met.

#### Cons:

- Sorting adds extra time complexity.

#### Real-Life Usage:

- Sorting can be useful if the majority element is needed for further processing after finding it.

### Approach 3: Hash Map

1. Initialize an empty hash map called `frequencyMap`.
2. Iterate through the array:
   a. If the current element exists in the `frequencyMap`, increment its frequency.
   b. If the current element is not in the `frequencyMap`, add it with a frequency of 1.
3. Iterate through the `frequencyMap`:
   a. If the frequency of any element is greater than `n/2`, return that element as the majority element.

#### Pseudo-Code:

```plaintext
function majorityElement(nums):
    frequencyMap = empty map

    for num in nums:
        if num exists in frequencyMap:
            frequencyMap[num] = frequencyMap[num] + 1
        else:
            frequencyMap[num] = 1

    for num in frequencyMap:
        if frequencyMap[num] > length(nums) / 2:
            return num
```

#### Implementation:

```javascript
var majorityElement = function (nums) {
  const frequencyMap = new Map();

  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    if (frequencyMap.get(num) > nums.length / 2) {
      return num;
    }
  }
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Each element is scanned once.
- **Space Complexity:** `O(n)` - Extra space for the hash map.

#### Pros:

- Can handle situations where the majority element appears less than `n/2` times.
- Provides additional information about the frequency of other elements.

#### Cons:

- Uses additional space.

#### Real-Life Usage:

- Useful when additional frequency information is needed.

### Approach 4: Randomization

1. Repeat the following steps multiple times (let's say `k` times):
   a. Generate a random index `randomIndex` between 0 and `n-1`.
   b. Assign the value of `nums[randomIndex]` to `candidate`.
   c. Initialize a counter `count` to 0.
   d. Iterate through the array:
   - If the current element is the same as `candidate`, increment `count`.
     e. If `count` is greater than `n/2`, return `candidate` as the majority element.
2. If no candidate is found in `k` iterations, you may need to repeat the process with a larger `k` value.

#### Pseudo-Code:

```plaintext
function majorityElement(nums):
    repeat multiple times:
        randomIndex = random number between 0 and length(nums) - 1
        candidate = nums[randomIndex]
        count = 0

        for num in nums:
            if num == candidate:
                count = count + 1

        if count > length(nums) / 2:
            return candidate
```

#### Implementation:

```javascript
var majorityElement = function (nums) {
  const k = Math.min(20, nums.length); // Adjust 'k' as needed
  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * nums.length);
    const candidate = nums[randomIndex];
    let count = 0;
    for (const num of nums) {
      if (num === candidate) {
        count++;
      }
    }
    if (count > nums.length / 2) {
      return candidate;
    }
  }
};
```

#### Complexity Analysis:

- **Time Complexity:** Approximately `O(k * n)` - The `k` factor depends on the number of iterations.
- **Space Complexity:** `O(1)` - No extra space used.

#### Pros:

- Simple to implement.
- Has a probabilistic guarantee of success with more iterations.

#### Cons:

- Not guaranteed to work well in all cases.
- High time complexity for a large `k` value.

#### Real-Life Usage:

- Can be used as a quick solution if exact correctness isn't crucial.

### Approach 5: Divide and Conquer

1. Create a helper function `findMajorityElement(nums, left, right)`:
   a. If `left` is equal to `right`, return `nums[left]` as the majority element.
   b. Calculate `mid` as `(left + right) / 2`.
   c. Recursively call `findMajorityElement` on the left and right halves of the array.
   d. Get the majority element from both halves: `leftMajority` and `rightMajority`.
   e. Count the occurrences of `leftMajority` and `rightMajority` within the range of `left` to `right`.
   f. If either majority element occurs more than `(right - left + 1) / 2` times, return that element. Otherwise, return `null`.
2. In the main function `majorityElement(nums)`:
   a. Call `findMajorityElement(nums, 0, length(nums) - 1)` to find the majority element.

#### Pseudo-Code:

```plaintext
function findMajorityElement(nums, left, right):
    if left == right:
        return nums[left]

    mid = (left + right) / 2

    leftMajority = findMajorityElement(nums, left, mid)
    rightMajority = findMajorityElement(nums, mid + 1, right)

    if countOccurrences(nums, leftMajority, left, right) > (right - left + 1) / 2:
        return leftMajority
    else if countOccurrences(nums, rightMajority, left, right) > (right - left + 1) / 2:
        return rightMajority
    else:
        return null

function majorityElement(nums):
    return findMajorityElement(nums, 0, length(nums) - 1)
```

#### Implementation:

```javascript
var majorityElement = function (nums) {
  return findMajorityElement(nums, 0, nums.length - 1);
};

function findMajorityElement(nums, left, right) {
  if (left === right) {
    return nums[left];
  }

  const mid = Math.floor((left + right) / 2);
  const leftMajority = findMajorityElement(nums, left, mid);
  const rightMajority = findMajorityElement(nums, mid + 1, right);

  const leftCount = countOccurrences(nums, leftMajority, left, right);
  const rightCount = countOccurrences(nums, rightMajority, left, right);

  if (leftCount > (right - left + 1) / 2) {
    return leftMajority;
  } else if (rightCount > (right - left + 1) / 2) {
    return rightMajority;
  } else {
    return null;
  }
}

function countOccurrences(nums, target, left, right) {
  let count = 0;
  for (let i = left; i <= right; i++) {
    if (nums[i] === target) {
      count++;
    }
  }
  return count;
}
```

#### Complexity Analysis:

- **Time Complexity:** `O(n log n)` - Due to the recursive divide and conquer.
- **Space Complexity:** `O(log n)` - Recursive call stack.

#### Pros:

- Can handle situations where the majority element appears less than `n/2` times.
- Solves more general cases where exact frequencies matter.

#### Cons:

- Higher time complexity compared to other linear time solutions.

#### Real-Life Usage:

- Useful when more detailed information about the majority element's occurrences is needed.

### Conclusion:

The "Majority Element" problem challenges us to find an element that appears more than half the time within an array. Each approach has its own strengths and weaknesses, making the choice dependent on the specific context and requirements. The Boyer-Moore Voting Algorithm stands out as the most efficient solution, satisfying both the linear time and constant space constraints. Other methods, such as sorting and hash maps, offer simplicity and additional insights but come with different trade-offs.

Ultimately, the approach to use depends on the situation. If the majority element's exact count and frequency matter, the hash map or divide and conquer approaches might be preferred. If simplicity and efficiency are paramount, the Boyer-Moore Voting Algorithm should be the go-to solution. Understanding these various methods equips programmers with a versatile toolkit to tackle the "Majority Element" problem effectively.
