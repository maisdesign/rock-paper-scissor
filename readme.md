# Rock Paper Scissors ✊✋✌️🦎🖖

> Project built as part of the **Boolean Web Development** bootcamp — JavaScript Functions module.
> Extended version with **React + Vite** for component-based architecture practice.

---

## Description

Rock Paper Scissors (with optional Lizard-Spock variant) played over **5 rounds** against the computer.
The player chooses by clicking a weapon icon, the CPU picks randomly, and the result is calculated and displayed. At the end of 5 rounds the game can be restarted.

Two game modes available:
- **Classic** — Rock, Paper, Scissors
- **Advanced** — Rock, Paper, Scissors, Lizard, Spock

---

## Component Structure

```
App.jsx
├── data/
│   ├── possibilities.js        — weapons array { id, label, src } + 'start' entry
│   ├── possibilitiesAdvanced.js — same with Lizard and Spock added
│   ├── rules.js                — classic rules map (who beats whom)
│   └── rulesAdvanced.js        — advanced rules map with wins object and flavor text
└── components/
    ├── Chooser.jsx             — weapon buttons, CPU pick, result calculation
    ├── Matcher.jsx             — chosen images, round result, score, final alert
    └── resetCounters.js        — shared utility to reset all game state
```

---

## Development Steps

- [x] **Setup** — Vite + React, default file cleanup
- [x] **`possibilities.js`** — weapons array `{ id, label, src }` for rock, paper, scissors (+ `start` for initial state)
- [x] **`rules.js`** — classic rules map (`rock` beats `scissors`, etc.)
- [x] **`Chooser`** — image buttons generated with `.map()` on filtered `userWeapons`; random CPU pick; `calcResult` pure function
- [x] **`Matcher`** — visual comparison (images via `imageShow()`), round result, score and final Bootstrap alert
- [x] **Score tracking** — separate score for player and CPU (`score`, `cpuscore`)
- [x] **Game lock** — buttons disabled after 5 rounds (conditional `disabled`)
- [x] **Final winner** — 3-way Bootstrap alert (`alert-success` / `alert-warning` / `alert-danger`) at end of rounds
- [x] **Reset** — restart button at end of 5 rounds, all state restored
- [x] **Refactoring** — stale state fixed with `prev =>` callbacks; `calcResult` made pure; `src` as single source for image paths
- [x] **Lizard-Spock mode** — 5-weapon variant with extended rules (`rulesAdvanced.js`) and new `in` operator–based win check
- [x] **Game mode toggle** — custom Star Trek–styled button toggle in `App`, resets game on switch
- [x] **Conditional image invert** — CSS class applied per mode to handle icon style differences

---

## React Concepts Applied

| Concept | Usage |
|---|---|
| **Props + destructuring** | setters passed to child components via props |
| **`useState`** | score, choices, result and round counter in parent component |
| **Lifting state up** | all state lives in `App`, children receive getters and setters via props |
| **Event handlers** | `onClick` with arrow function block `() => { ... }` for multi-statement handlers |
| **Conditional rendering** | result and reset button shown only when needed |
| **`.map()` + `key`** | dynamic button generation from filtered array |
| **`.filter()` + `.find()`** | player weapon selection and image lookup by label |
| **Pure function** | `calcResult` has no side effects, returns object with result and points |
| **Stale state** | accumulative updates with `prev => prev + n` callback |
| **Ternary in JSX** | conditional `className` for active state and mode-based styling |
| **`in` operator** | used to check if opponent's weapon is in the winner's `wins` object |
| **Shared utility** | `resetCounters.js` imported in both `App` and `Matcher` |

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## Course

Project from **[The Odin Project](https://www.theodinproject.com/)** — Foundations
Built during the **[Boolean](https://boolean.co.uk/)** WDPT11 bootcamp
