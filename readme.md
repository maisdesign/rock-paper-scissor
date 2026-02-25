# Rock Paper Scissors ✊✋✌️

> Progetto realizzato nell'ambito del corso **Boolean Web Development** — modulo JavaScript Functions.
> Versione estesa con **React + Vite** per allenamento sui componenti.

---

## Descrizione

Gioco Carta Forbice Sasso in **5 round** contro il computer.
Il giocatore sceglie cliccando su un'immagine, il computer estrae casualmente, un componente confronta le due scelte e mostra il risultato. Al termine dei 5 round è possibile riavviare la partita.

---

## Struttura componenti

```
App.jsx
├── data/
│   ├── possibilities.js   — array armi { id, label, src } + voce 'start'
│   └── rules.js           — oggetto mappa delle regole (chi batte chi)
└── components/
    ├── Chooser.jsx        — bottoni arma, estrazione CPU, calcolo risultato (funzione pura)
    └── Matcher.jsx        — immagini scelte, risultato round, score, alert finale Bootstrap
```

---

## Step di sviluppo

- [x] **Setup** — Vite + React, pulizia file default
- [x] **`possibilities.js`** — array di oggetti `{ id, label, src }` per rock, paper, scissors (+ `start` per lo stato iniziale)
- [x] **`rules.js`** — oggetto mappa delle regole del gioco (`rock` batte `scissors`, ecc.)
- [x] **`Chooser`** — bottoni immagine generati con `.map()` sull'array filtrato `userWeapons`; estrazione casuale CPU; `calcResult` funzione pura
- [x] **`Matcher`** — confronto visivo (immagini via `imageShow()`), risultato round, score e alert finale Bootstrap
- [x] **Punteggio** — tracciamento score separato per giocatore e CPU (`score`, `cpuscore`)
- [x] **Blocco partita** — bottoni disabilitati al termine dei 5 round (`disabled` condizionale)
- [x] **Vincitore finale** — alert Bootstrap a 3 vie (`alert-success` / `alert-warning` / `alert-danger`) al termine dei round
- [x] **Reset** — pulsante di riavvio al termine dei 5 round, ripristino di tutti gli stati
- [x] **Refactoring** — stale state corretto con callback `prev =>`; `calcResult` resa funzione pura; `src` usato come unica fonte per i percorsi immagine

---

## Concetti React applicati

| Concetto | Utilizzo |
|---|---|
| **Props + destructuring** | setter passati ai componenti figli tramite props |
| **`useState`** | punteggio, scelte, risultato e contatore nel componente padre |
| **Lifting state up** | tutto lo stato vive in `App`, i figli ricevono getter e setter via props |
| **Event handler** | `onClick` con arrow function per passare il valore direttamente |
| **Rendering condizionale** | result e reset button mostrati solo quando necessario |
| **`.map()` + `key`** | generazione dinamica dei bottoni da array filtrato |
| **`.filter()` + `.find()`** | selezione armi giocatore e ricerca immagine per label |
| **Funzione pura** | `calcResult` non ha side effect, ritorna un oggetto con risultato e punti |
| **Stale state** | aggiornamenti accumulativi con callback `prev => prev + n` |

---

## Tecnologie

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## Corso

Progetto del percorso **[The Odin Project](https://www.theodinproject.com/)** — Foundations
Sviluppato durante il bootcamp **[Boolean](https://boolean.co.uk/)** WDPT11
