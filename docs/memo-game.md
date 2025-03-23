# Kanji Memo Game Score Calculation

## Overview

This document explains the score calculation algorithm for the Kanji Memo Game.
The scoring system considers the number of guesses, time spent, penalties, and
bonuses to fairly evaluate a player's performance.

## Score Calculation Steps

### 1. **Base Score**

- Every player starts with a **base score** of **1000 points**.

### 2. **Cooldown Time**

- Each guess has a **fixed cooldown time of 1 second**, during which the player
  cannot take any action.
- The total cooldown time is calculated as:

```
cooldownTime = fixedCooldownTime * minGuessAmount
```

### 3. **Active Time**

- The **active time** is the total time spent minus the cooldown time:

```
activeTime = Math.max(0, timeSpent - cooldownTime)
```

### 4. **Time Penalty**

- For each second of active play, the player loses **2 points**:

```
score -= activeTime * timeFactor
```

### 5. **Guess Penalty**

- If the player makes more than the minimum required guesses (`minGuesses`),
  they receive a penalty of **50 points per extra guess**:
  _(Penalty applies only if `guessCount > minGuesses`)_

```
score -= (guessCount - minGuesses) * guessPenalty
```

### 6. **Perfect Play Bonus**

- If the player finishes the game with exactly `minGuesses`, they receive
  a **200-point bonus**:

```
score += perfectGameBonus
```

### 7. **Final Score**

- The final score is adjusted to ensure it is not negative:

```
score = Math.floor(Math.max(score, 0))
```
