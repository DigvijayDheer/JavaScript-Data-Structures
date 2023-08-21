## Best Time to Buy and Sell Stock II

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can buy it then immediately sell it on the **same day**.

Find and return _the **maximum** profit you can achieve_.

#### Example 1:

```
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
```

#### Example 2:

```
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.
```

#### Example 3:

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
```

#### Constraints:

- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

## Solution

### Overview:

The "Best Time to Buy and Sell Stock II" problem involves finding the maximum profit that can be achieved by buying and selling stocks on different days. Unlike the "Best Time to Buy and Sell Stock I" problem, you are allowed to perform multiple transactions on the same day.

Given an array of stock prices representing the price on each day, the task is to determine the maximum profit that can be obtained by buying and selling stocks optimally.

### Approach 1: Greedy Algorithm

#### Description:

In this approach, you take advantage of the fact that you can perform multiple transactions on the same day. Whenever there's a price increase from one day to the next, you can consider it as a profitable transaction.

#### Step-By-Step Guide:

1.  Initialize a variable `maxProfit` to store the maximum profit.
2.  Loop through the `prices` array starting from the second day (index 1).
3.  For each day, check if the price is greater than the previous day's price. If it is, that means you can make a profit by buying on the previous day and selling on the current day.
4.  If the condition from step 3 is met, add the difference between the current day's price and the previous day's price to `maxProfit`.
5.  Return `maxProfit` as the final answer.

#### Pseudo-Code:

```plaintext
maxProfit(prices):
    maxProfit = 0
    for i = 1 to length(prices) - 1:
        if prices[i] > prices[i - 1]:
            maxProfit += prices[i] - prices[i - 1]
    return maxProfit
```

#### Implementation:

```javascript
var maxProfit = function (prices) {
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }
  return maxProfit;
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)`, where n is the length of the `prices` array. You iterate through the array once.
- **Space Complexity:** `O(1)`, as you're using only a constant amount of extra space.

#### Pros:

- Simple and intuitive.
- Efficient with linear time complexity.

#### Cons:

- Doesn't provide the path or details of individual transactions.
- Might not work well if there are very frequent price changes.

#### Real-Life Usage:

- This approach is used in scenarios where you want to maximize your profit while buying and selling assets like stocks, commodities, or cryptocurrencies. It's practical for active traders who need a quick estimation of potential profits in a dynamic market.

### Approach 2: Peak Valley Approach

#### Description:

This approach is based on identifying the peak and valley prices. You buy at the valley and sell at the peak, which gives you maximum profit.

#### Step-By-Step Guide:

1.  Initialize a variable `maxProfit` to store the maximum profit.
2.  Initialize an index `i` to 0 to iterate through the `prices` array.
3.  Start a `while` loop to iterate until `i` is less than `n - 1` (where `n` is the length of the `prices` array).
4.  Inside the loop, find the next valley (a day with a lower price than the next day) by incrementing `i` while the current day's price is greater than or equal to the next day's price.
5.  Store the valley's price in a variable called `valley`.
6.  After finding the valley, find the next peak (a day with a higher price than the next day) by incrementing `i` while the current day's price is less than or equal to the next day's price.
7.  Store the peak's price in a variable called `peak`.
8.  Add the difference between `peak` and `valley` to `maxProfit` since this is a profitable transaction.
9.  Repeat steps 4 to 8 until you've iterated through the entire array.
10. Return `maxProfit` as the final answer.

#### Pseudo-Code:

```plaintext
maxProfit(prices):
    maxProfit = 0
    i = 0
    while i < length(prices) - 1:
        while i < length(prices) - 1 and prices[i] >= prices[i + 1]:
            i++
        valley = prices[i]
        while i < length(prices) - 1 and prices[i] <= prices[i + 1]:
            i++
        peak = prices[i]
        maxProfit += peak - valley
    return maxProfit
```

#### Implementation:

```javascript
var maxProfit = function (prices) {
  let maxProfit = 0;
  let i = 0;
  while (i < prices.length - 1) {
    while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
      i++;
    }
    const valley = prices[i];
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

- **Time Complexity:** `O(n)`, where n is the length of the `prices` array. You iterate through the array once.
- **Space Complexity:** `O(1)`, as you're using only a constant amount of extra space.

#### Pros:

- Captures the essence of buying low and selling high.
- Can work well with moderate fluctuations in prices.

#### Cons:

- Doesn't provide a detailed path of transactions.
- May not be optimal in cases with very frequent and rapid price changes.

#### Real-Life Usage:

- This approach is often used by traders who want to take advantage of short-term price fluctuations. It's relevant in various trading markets, especially those with less extreme price volatility.

### Approach 3: Dynamic Programming

#### Description:

Although this problem can be solved with a dynamic programming approach, it's not the most efficient way since it's an overkill for this particular problem. Dynamic programming is more suitable for problems with more complex conditions and dependencies.

#### Step-By-Step Guide:

1.  Initialize a variable `n` with the length of the `prices` array.
2.  Create a 2D array `dp` of dimensions `n` x 2 to store the maximum profit at each day, with two states: holding a stock (`dp[i][1]`) and not holding a stock (`dp[i][0]`).
3.  Initialize `dp[0][0]` as 0 since you have no profit on the first day when not holding a stock.
4.  Initialize `dp[0][1]` as the negative of the price on the first day since you would incur a loss by buying on the first day.
5.  Loop through the `prices` array starting from the second day (index 1).
6.  For each day `i`, update `dp[i][0]` as the maximum of the previous day's `dp[i-1][0]` (no change) and the previous day's `dp[i-1][1] + prices[i]` (selling the stock on this day).
7.  Update `dp[i][1]` as the maximum of the previous day's `dp[i-1][1]` (no change) and the previous day's `dp[i-1][0] - prices[i]` (buying the stock on this day).
8.  After iterating through all days, return `dp[n-1][0]` as the maximum profit.

#### Pseudo-Code:

```plaintext
maxProfit(prices):
    n = length(prices)
    dp = array of size n x 2
    dp[0][0] = 0
    dp[0][1] = -prices[0]

    for i = 1 to n - 1:
        dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])

    return dp[n - 1][0]
```

#### Implementation:

```javascript
var maxProfit = function (prices) {
  const n = prices.length;
  const dp = Array.from({ length: n }, () => Array(2).fill(0));
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[n - 1][0];
};
```

#### Complexity Analysis:

- **Time Complexity:** `O(n)`, where n is the length of the `prices` array. You iterate through the array once.
- **Space Complexity:** `O(n)`, as you're using a 2D array of dimensions `n x 2` to store intermediate values.

#### Pros:

- Provides detailed information about individual transactions.
- Can handle more complex scenarios with specific constraints.

#### Cons:

- Overkill for this particular problem; might be less efficient than other approaches.
- Requires more memory due to the 2D array.

#### Real-Life Usage:

- This approach is used when solving more intricate financial problems that involve complex conditions and constraints. It can be adapted for situations where the trading strategy has more specific rules, beyond simple buying and selling.

> **Note:** Out of these approaches, the **greedy algorithm** (Approach 1) is the most efficient and recommended approach for this problem. It has a time complexity of `O(n)` where n is the length of the `prices` array.

### Conclusion:

Each approach offers a unique perspective on solving the "Best Time to Buy and Sell Stock II" problem. The choice of approach depends on the trader's goals, market conditions, and desired level of detail in the profit analysis. The problem's versatility allows for different strategies to be applied based on the trader's preferences and requirements.
