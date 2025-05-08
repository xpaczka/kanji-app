
# Knowledge Evaluation Score Calculation
## Overview

This document outlines the scoring methodology for a test consisting of **50 kanji** 
distributed across **5 JLPT levels**. Each level contains **10 kanji**.

Different levels have different difficulty levels, so we apply **different weightings**. 
However, the maximum possible test score will always be **100 points**.

## 1. Level Weights
|Level|Weight (%)|
|--|--|
|jlpt-n5|10%|
|jlpt-n4|15%|
|jlpt-n3|20%|
|jlpt-n2|25%|
|jlpt-n1|30%|

## 2. Calculate Per-Kanji Value

Since each level has 10 kanji, the value of each correct answer within a level is:

* jlpt-n5: 10% ÷ 10 = **1% per kanji**

* jlpt-n5: 15% ÷ 10 = **1.5% per kanji**

* jlpt-n5: 20% ÷ 10 = **2% per kanji**

* jlpt-n5: 25% ÷ 10 = **2.5% per kanji**

* jlpt-n5: 30% ÷ 10 = **3% per kanji**


## 3: Calculate a User Total Score

For each level:

* Multiply the **number of correct answers** by the **per-kanji value**.

* Sum across all levels to get the final score.

  

### Example

If a user scores:

| Level | Correct Answers | Calculation | Score Contribution |
|--|--|--|--|
| jlpt-n5 | 8 | 8 × 1% | 8% |
| jlpt-n4 | 7 | 7 × 1.5% | 10.5% |
| jlpt-n3 | 5 | 5 × 2% | 10% |
| jlpt-n2 | 9 | 9 × 2.5% | 22.5% |
| jlpt-n1 | 6 | 6 × 3% | 18% |


**Total Score = 8% + 10.5% + 10% + 22.5% + 18% = 69%**

## 4. Final kanji level evaluation

After the final score is calculated, user is assigned starting kanji proficiency 
level which corresponds inversely proportional to how weight for each level are assigned. 

Higher values are inclusive: if user score 55%, still receives **jlpt-n4** result

|Level|Score (%)|
|--|--|
|jlpt-n5|>=30%|
|jlpt-n4|30%-55%|
|jlpt-n3|55%-75%|
|jlpt-n2|75%-90%|
|jlpt-n1|90%-100%|