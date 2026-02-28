# Rock Paper Scissors (Lizard Spock?)

A browser-based Rock Paper Scissors game built with React and Supabase, featuring both single-player and real-time multiplayer modes.

## Features

- **Single Player** — play against a CPU opponent with instant results
- **Multiplayer** — play in real time against a friend via a shared session code
- **Two versions** — Classic (Rock Paper Scissors) and Advanced (Rock Paper Scissors Lizard Spock)
- **Score tracking** — wins, losses and draws tracked over 5 rounds
- **Session management** — generate a session, share the code, leave at any time

## Tech Stack

- [React](https://react.dev/) — UI and state management
- [Supabase](https://supabase.com/) — database and real-time subscriptions (Postgres + Realtime)
- [Vite](https://vitejs.dev/) — build tool
- [nanoid](https://github.com/ai/nanoid) — session ID generation

## Getting Started

### Prerequisites

- Node.js
- A [Supabase](https://supabase.com/) project with a `sessions` table (see schema below)

### Supabase Schema

```sql
create table sessions (
  id text primary key,
  u1Weapon text,
  u2Weapon text,
  status text default 'picking',
  version text default 'classic'
);
```

Enable Row Level Security and Realtime on the `sessions` table.

### Installation

```bash
npm install
```

Create a `.env.local` file in the root:

```
VITE_URL=your_supabase_project_url
VITE_ANON_KEY=your_supabase_anon_key
```

### Run locally

```bash
npm run dev
```

## How to Play

### Single Player

1. Select **Single** mode
2. Choose a version (Classic or Advanced)
3. Pick your weapon — the CPU picks randomly
4. First to 5 rounds wins

### Multiplayer

1. Select **Multi** mode
2. **Player 1** clicks **Generate your session ID** and shares the code
3. **Player 2** enters the code and clicks **Join session**
4. Both players pick their weapons — results are calculated in real time
5. Click **Play again** to replay with the same session, or **✕** to leave

## Project Structure

```
src/
├── components/
│   ├── Chooser.jsx      # Weapon selection
│   ├── Lobby.jsx        # Session creation and joining
│   ├── Matcher.jsx      # Result display and score
│   └── resetCounters.js # Shared reset utility
├── data/
│   ├── possibilities.js         # Classic weapons
│   ├── possibilitiesAdvanced.js # Advanced weapons
│   ├── rules.js                 # Classic win rules
│   └── rulesAdvanced.js         # Advanced win rules with sentences
├── lib/
│   └── supabase.js      # Supabase client
├── App.jsx
└── index.css
```
