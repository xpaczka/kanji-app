
# Kanji App Spaced Repetition System

Explaining how Spaced Repetition System (SRS) is being constructed and used 
for the Kanji App

## Description

Kanji App SRS has 10 stages (`1-10`). Each stage determines when the next review 
for selected kanji will be available. It uses **exponential growth** to increase 
the interval between reviews, helping reinforce memory retention over time.

When kanji has reached stage `10` it means that, it is considered as **"burned"** 
meaning that kanji has been mastered and it won't appear in review ever again.

## Learning Stages

Learning stages are tied to expertise naming. Expertise level is determined 
like following:

- **"Rookie"** (`1-3`)
- **"Learner"** (`4-5`)
- **"Explorer"** (`6-7`)
- **"Professional"** (`8-9`)
- **"Master"** (`10`)  

## Progressing through stages

Kanji is marked as completed once user answers both meaning and reading correctly.
On learning phase it does not impact the value of updated stage and user will
always go from `0` to `1`. During review phase user will progress to next
stage only if both answers to kanji (meaning and reading) were answered
correctly on the first try. In other case user is dropped by two stages

```
Meaning correct + reading correct -> +1 stage
Meaning incorrect + reading correct -> -2 stages
Meaning correct + reading incorrect -> -2 stages
```

## Calculation Logic

-  **Base interval:**  `2` hours

-  **Growth factor:**  `2.5` per stage

The formula for calculating the next review interval is:

```
intervalInHours = baseHours * (growthFactor ^ (newStage - 1))
```

## 📊 Stage-to-Interval Table

| Stage | Interval |
|---|---|
| Stage 1 | 2 hours  |
| Stage 2 | 5 hours  |
| Stage 3 | 12 hours  |
| Stage 4 | 20 hours  |
| Stage 5 | 1 day 5 hours  |
| Stage 6 | 8 days 3 hours  |
| Stage 7 | 20 days 8 hours  |
| Stage 8 | 50 days 20 hours  |
| Stage 9 | 127 days 3 hours  |
| Stage 10 | -  |
