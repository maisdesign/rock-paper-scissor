# Rock Paper Scissors ✊✋✌️

> Progetto realizzato nell'ambito del corso **Boolean Web Development** — modulo JavaScript Functions.
> Versione estesa con **React + Vite** per allenamento sui componenti.

---

## Descrizione

Gioco Carta Forbice Sasso in **5 round** contro il computer.
Il giocatore sceglie tramite un dropdown, il computer estrae casualmente, un componente confronta le due scelte e mostra il risultato.

---

## Struttura componenti

```
App.jsx
└── components/
    ├── Chooser.jsx   — dropdown per la scelta del giocatore (dato un array di possibilità)
    ├── Picker.jsx    — estrae casualmente dall'array, triggerato da onClick
    └── Matcher.jsx   — confronta i due valori e mostra il risultato del round
```

---

## Step di sviluppo

- [x] **Setup** — Vite + React, pulizia file default
- [x] **`possibilities.js`** — array dati `['rock', 'paper', 'scissor']`
- [x] **`Picker`** — estrazione casuale con `Math.random()` e `.length`
- [ ] **`Chooser`** — dropdown collegato all'array di possibilità
- [ ] **`Matcher`** — logica di confronto e visualizzazione risultato
- [ ] **Punteggio** — tracciamento score su 5 round
- [ ] **Vincitore finale** — dichiarazione al termine dei 5 round

---

## Concetti React applicati

| Concetto | Utilizzo |
|---|---|
| **Props + destructuring** | passaggio di `possibilities` ai componenti figli |
| **Componenti dumb** | `Picker`, `Chooser`, `Matcher` non gestiscono stato proprio |
| **`useState`** | punteggio e scelte nel componente padre |
| **Event handler** | `onClick` per triggerare l'estrazione |

---

## Tecnologie

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Corso

Progetto del percorso **[The Odin Project](https://www.theodinproject.com/)** — Foundations
Sviluppato durante il bootcamp **[Boolean](https://boolean.co.uk/)** WDPT11
