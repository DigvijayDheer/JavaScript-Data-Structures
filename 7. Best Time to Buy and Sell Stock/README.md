## Best Time to Buy and Sell Stock

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

#### Example 1:

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

#### Example 2:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

#### Constraints:

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Solution

### Overview:

The "Best Time to Buy and Sell Stock" problem is a common coding challenge that involves finding the optimal time to buy and sell a stock to maximize profit. Given an array of stock prices where each element represents the price of the stock on a specific day, the goal is to determine the maximum profit that can be obtained by making a single transaction: buying the stock on one day and selling it on a different day in the future.

#### Key Elements:

- Array of stock prices: An array `prices` where each element `prices[i]` represents the price of the stock on the `ith` day.
- Buy and sell constraints: You must buy before you sell, which means the buy day should come before the sell day.

#### Approaches:

Several approaches can be used to solve this problem, each with its own advantages and disadvantages:

1. Brute Force Approach: Involves considering all possible pairs of buying and selling days using nested loops.
2. Single Pass with Min-Max Tracking: Efficiently iterates through the array once while tracking the minimum price encountered and calculating potential profits.
3. Dynamic Programming (Kadane's Algorithm): Treats the problem as a maximum subarray sum problem to find the maximum profit.
4. Peak-Valley Approach: Identifies peak and valley points to determine the optimal buying and selling days.
5. Simple One-Pass Approach: Efficiently iterates through the array while maintaining the minimum price and calculating potential profits.
6. Stack-based Approach: Uses a stack to keep track of potential buying days and calculates profits accordingly.

**Criteria for Selecting an Approach:**
The choice of approach depends on factors such as problem size, efficiency requirements, and ease of implementation. The second approach (Single Pass with Min-Max Tracking) is commonly preferred due to its simplicity and efficiency, making it a widely used solution.

### 1. Brute Force Approach (Nested Loops):

The brute force approach involves considering all possible pairs of buying and selling days using nested loops. For each pair, it calculates the profit and keeps track of the maximum profit.

1. Initialize `maxProfit` to 0.
2. Iterate over the array using two nested loops. The outer loop variable is `i` ranging from 0 to `n-1`.
3. For each `i`, iterate with the inner loop variable `j` ranging from `i+1` to `n-1`.
4. Calculate the profit by subtracting `prices[i]` from `prices[j]`.
5. Update `maxProfit` with the maximum value between the current `maxProfit` and the calculated `profit`.
6. Return the `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
maxProfit = 0

for i = 0 to n-1
    for j = i+1 to n
        profit = prices[j] - prices[i]
        maxProfit = max(maxProfit, profit)

return maxProfit
```

#### Implementation:

```javascript
var maxProfitBruteForce = function (prices) {
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const profit = prices[j] - prices[i];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n^2)` - The approach involves two nested loops, resulting in considering all pairs of buying and selling days.
- **Space Complexity:** `O(1)` - Only a constant amount of extra space is used for variables.

#### Pros:

- Simple and easy to implement.

#### Cons:

- Inefficient for larger input arrays due to the quadratic time complexity.
- Redundant calculations for many pairs of days.

#### Real-Life Usages:

- Not commonly used in real-life scenarios due to its inefficiency with larger datasets.

### 2. Single Pass with Min-Max Tracking:

This efficient approach involves iterating through the array once while keeping track of the minimum price encountered so far. For each subsequent day, it calculates the potential profit if selling on that day and updates the maximum profit accordingly.

1. Initialize `minPrice` to positive infinity and `maxProfit` to 0.
2. Iterate over the array of `prices`.
3. For each `price`, compare it with the current `minPrice`. If it's smaller, update `minPrice` with the new value.
4. If the current price minus `minPrice` is greater than `maxProfit`, update `maxProfit` with this new profit.
5. Return `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
minPrice = Infinity
maxProfit = 0

for price in prices
    if price < minPrice
        minPrice = price
    else if price - minPrice > maxProfit
        maxProfit = price - minPrice

return maxProfit
```

#### Implementation:

```javascript
var maxProfitMinAndMax = function (prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Iterates through the array once.
- **Space Complexity:** `O(1)` - Only a constant amount of extra space is used for variables.

#### Pros:

- Efficient with linear time complexity, making it suitable for larger datasets.
- Requires only a single pass through the array.

#### Cons:

- None significant.

#### Real-Life Usages:

- Widely used due to its efficiency and simplicity, applicable in stock market analysis and financial algorithms.

### 3. Dynamic Programming (Kadane's Algorithm):

This approach treats the problem as finding the maximum subarray sum. It transforms the price differences into an array of changes between consecutive days' prices. By applying Kadane's algorithm, it finds the maximum subarray sum, which corresponds to the maximum profit achievable.

1. Initialize `maxProfit` and `currentMax` to 0.
2. Iterate over the array starting from index 1.
3. For each element at index `i`, calculate the price difference `prices[i] - prices[i-1]`.
4. Update `currentMax` as the maximum value between 0 and the sum of `currentMax` and the calculated price difference.
5. Update `maxProfit` as the maximum value between `maxProfit` and `currentMax`.
6. Return `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
maxProfit = 0
currentMax = 0

for i = 1 to n-1
    currentMax = max(0, currentMax + (prices[i] - prices[i-1]))
    maxProfit = max(maxProfit, currentMax)

return maxProfit
```

#### Implementation:

```javascript
var maxProfitKadanes = function (prices) {
  let maxProfit = 0;
  let currentMax = 0;

  for (let i = 1; i < prices.length; i++) {
    const priceDiff = prices[i] - prices[i - 1];
    currentMax = Math.max(0, currentMax + priceDiff);
    maxProfit = Math.max(maxProfit, currentMax);
  }

  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Iterates through the array once.
- **Space Complexity:** `O(1)` - Only a constant amount of extra space is used for variables.

#### Pros:

- Efficient with linear time complexity.
- Especially useful when dealing with problems involving finding maximum subarray sums.

#### Cons:

- Requires understanding of dynamic programming concepts.

#### Real-Life Usages:

- Not limited to stock trading; used in various problems related to contiguous subarray sums.

### 4. Peak-Valley Approach:

In this approach, peak and valley points in the price graph are identified. It buys at the valley and sells at the next peak to maximize profit. By traversing through the array, it locates valleys and peaks, calculates the profit, and accumulates the maximum profit.

1. Initialize `maxProfit` to 0 and `i` to 0.
2. Enter a loop that runs while `i` is less than `n-1`.
3. Within the loop, find the valley by iterating while the price at `i` is greater than or equal to the price at `i+1`. Increment `i` in each iteration.
4. Once a valley is found, assign the valley price to `valley`.
5. Find the peak by iterating while the price at `i` is less than or equal to the price at `i+1`. Increment `i` in each iteration.
6. Once a peak is found, assign the peak price to `peak`.
7. Calculate the profit from this peak and valley and add it to `maxProfit`.
8. Continue with the loop until `i` reaches `n-1`.
9. Return `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
maxProfit = 0
i = 0

while i < n-1
    // Find the valley
    while i < n-1 and prices[i] >= prices[i+1]
        i++
    valley = prices[i]

    // Find the peak
    while i < n-1 and prices[i] <= prices[i+1]
        i++
    peak = prices[i]

    maxProfit += peak - valley

return maxProfit
```

#### Implementation:

```javascript
var maxProfitPeakValley = function (prices) {
  let maxProfit = 0;
  let i = 0;

  while (i < prices.length - 1) {
    // Find the valley
    while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
      i++;
    }
    const valley = prices[i];

    // Find the peak
    while (i < prices.length - 1 && prices[i] <= prices[i + 1]) {
      i++;
    }
    const peak = prices[i];

    maxProfit += peak - valley;
  }

  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Iterates through the array once.
- **Space Complexity:** `O(1)` - Only a constant amount of extra space is used for variables.

#### Pros:

- Simple and intuitive to understand.

#### Cons:

- Less efficient compared to other approaches due to multiple iterations through the array.
- May not perform optimally with certain input patterns.

#### Real-Life Usages:

- Suitable for educational purposes or when simplicity is preferred over performance.

### 5. Simple One-Pass Approach:

Similar to the second approach, this technique iterates through the array once. It maintains the minimum price encountered and calculates the potential profit for each day. By updating the maximum profit whenever a higher profit is calculated.

1. Initialize `minPrice` to positive infinity and `maxProfit` to 0.
2. Iterate over the array of `prices`.
3. For each `price`, compare it with the current `minPrice`. If it's smaller, update `minPrice` with the new value.
4. Calculate the potential profit by subtracting the current `minPrice` from the `price`.
5. Update `maxProfit` with the maximum value between the current `maxProfit` and the calculated profit.
6. Return `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
minPrice = Infinity
maxProfit = 0

for price in prices
    minPrice = min(minPrice, price)
    maxProfit = max(maxProfit, price - minPrice)

return maxProfit
```

#### Implementation:

```javascript
var maxProfitSimpleOnePass = function (prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
};
```

- **Time Complexity:** `O(n)` - Iterates through the array once.
- **Space Complexity:** `O(1)` - Only a constant amount of extra space is used for variables.

#### Pros:

- Efficient with linear time complexity.
- Similar to the second approach but with a different perspective.

#### Cons:

- None significant.

#### Real-Life Usages:

- Similar to the second approach, widely used in financial analysis and stock trading algorithms.

### 6. Stack-based Approach:

This approach uses a stack to keep track of potential buying days. By traversing through the array, it identifies buying opportunities and calculates the profit when a potential selling day is reached.

1. Initialize an empty `stack` and `maxProfit` to 0.
2. Iterate over the array using the variable `i`.
3. For each day's price at index `i`, compare it with the price at the top of the stack.
4. If the current price is lower than the price at the stack's top, pop elements from the stack until the condition is met.
5. If the stack becomes empty, assign `buyDay` as the current index `i`.
6. If the stack is not empty, calculate the profit by subtracting the price at the top of the stack from the current price.
7. Update `maxProfit` with the maximum value between the current `maxProfit` and the calculated profit.
8. Push the current index `i` onto the stack.
9. After iterating through the array, return `maxProfit` as the final result.

#### Pseudo-Code:

```plaintext
stack = empty stack
maxProfit = 0

for i = 0 to n-1
    while stack is not empty and prices[i] < prices[stack.top()]
        stack.pop()
    if stack is empty
        buyDay = i
    else
        profit = prices[i] - prices[stack.top()]
        maxProfit = max(maxProfit, profit)
    stack.push(i)

return maxProfit
```

#### Implementation:

```javascript
var maxProfitStack = function (prices) {
  const stack = [];
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[i] < prices[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length === 0) {
      buyDay = i;
    } else {
      const profit = prices[i] - prices[stack[stack.length - 1]];
      maxProfit = Math.max(maxProfit, profit);
    }
    stack.push(i);
  }

  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)` - Iterates through the array once.
- **Space Complexity:** `O(n)` - In the worst case, the stack can store all elements.

#### Pros:

- Useful for scenarios where you need to track local minima and maxima.

#### Cons:

- Less intuitive due to the stack-based implementation.
- Additional space complexity due to the stack.

#### Real-Life Usages:

- Used in problems where you need to track various local extrema and related information.

**Real-Life Applications:**
The problem's essence reflects real-world scenarios in financial markets, where investors aim to buy and sell assets at the right time to maximize their profits. Algorithms based on these concepts are used in trading platforms and investment strategies.

In summary, the "Best Time to Buy and Sell Stock" problem challenges developers to optimize a single transaction to maximize profit, and it offers various approaches that balance efficiency and simplicity.
