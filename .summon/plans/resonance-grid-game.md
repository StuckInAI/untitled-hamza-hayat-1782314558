---
status: building
title: Resonance Grid — Novel Wave Propagation Puzzle Game
---

## Concept Summary

A puzzle game built around a unique "resonance vs. absorption" mechanic. Each node on a grid has a frequency (1–5). Clicking a node sends a wave outward. Matching-frequency neighbours resonate and chain the wave further. Non-matching neighbours absorb the wave and shift one step toward the clicked node's frequency. Win by tuning all nodes to the same frequency in as few clicks as possible.

---

## Steps

1. **Set up project entry point**
   - Ensure /app/src/main.tsx imports /app/src/styles/global.css and renders the root App component.
   - Ensure /app/src/styles/global.css starts with `@import "tailwindcss";` and defines any global CSS custom properties needed for animations (pulse keyframes, wave-ring keyframes).

2. **Define shared types in /app/src/types/game.ts**
   - `Frequency` — a union type of numbers 1 through 5.
   - `Node` — an object with: id, row, col, frequency, isResonating (boolean), isAbsorbing (boolean).
   - `GameStatus` — union: "playing" | "won" | "idle".
   - `GameState` — object holding: grid (2D array of Node), targetFrequency (Frequency), moves (number), status (GameStatus), level (number).

3. **Create game logic utilities in /app/src/lib/resonance.ts**
   - `createGrid(rows, cols, targetFreq)` — generates a 2D array of Nodes with random frequencies, guaranteeing at least some nodes already match the target.
   - `getNeighbours(grid, row, col)` — returns the 4 cardinal neighbours of a node (no diagonals).
   - `computeWave(grid, sourceRow, sourceCol, sourceFreq, visited)` — recursive function that:
     - Marks the source node as resonating if same frequency.
     - For each unvisited neighbour: if same frequency as `sourceFreq`, recurse (resonance chain). If different, mark as absorbing and shift its frequency one step toward `sourceFreq` (no recursion).
   - `applyPluck(grid, row, col)` — immutably produces a new grid by calling `computeWave` from the clicked node, then incrementing move count.
   - `checkWin(grid, targetFreq)` — returns true when every node's frequency equals `targetFreq`.
   - `shiftFrequency(current, target)` — returns `current + 1` if target > current, `current - 1` if target < current, else `current`. Clamps to 1–5.

4. **Create a custom hook /app/src/hooks/useResonanceGame.ts**
   - Manages full `GameState` in a single `useState`.
   - Exposes: `gameState`, `handlePluck(row, col)`, `startLevel(level)`, `resetLevel()`.
   - `handlePluck` calls `applyPluck`, then checks `checkWin`, then clears all resonating/absorbing flags after a short timeout (300 ms) via `setTimeout` so animations can play out.
   - `startLevel(level)` sets grid size based on level (level 1: 4×4, level 2: 5×5, level 3: 6×6, etc.), picks a random `targetFrequency`, and calls `createGrid`.

5. **Create the frequency color mapping utility in /app/src/lib/frequencyColors.ts**
   - Export a lookup that maps frequency 1–5 to a distinct Tailwind background class and a glow/ring color class:
     - 1 → red
     - 2 → orange
     - 3 → yellow
     - 4 → emerald
     - 5 → blue
   - Also export a label map (1→"I", 2→"II", 3→"III", 4→"IV", 5→"V") for accessibility.

6. **Build the GridNode component at /app/src/components/GridNode.tsx**
   - Accepts props: node (Node), targetFrequency (Frequency), onClick callback.
   - Renders as a circular button sized responsively.
   - Background color comes from frequencyColors lookup based on node.frequency.
   - When `node.isResonating` is true: apply a pulsing ring animation (scale-up + ring glow) using the `animate-ping`-style keyframe defined in global.css.
   - When `node.isAbsorbing` is true: apply a brief shake/flash animation.
   - When node.frequency equals targetFrequency: show a small glowing inner dot to hint it's already in tune.
   - Display the Roman numeral label inside the circle.

7. **Build the GameGrid component at /app/src/components/GameGrid.tsx**
   - Accepts: grid (2D Node array), targetFrequency, onPluck(row, col).
   - Renders a CSS grid with equal columns matching the grid width.
   - Maps over every node and renders a GridNode with appropriate props and click handler.
   - Gap between nodes scales with grid size.

8. **Build the HUD (heads-up display) component at /app/src/components/GameHUD.tsx**
   - Shows: current level number, moves used, target frequency as a large colored circle with label, and a "Reset Level" button.
   - When `status === "won"`: show a win banner overlay with moves count and a "Next Level" button.

9. **Build the StartScreen component at /app/src/components/StartScreen.tsx**
   - Full-screen centered card explaining the rules in plain language (3 bullet points: click to pluck, same color chains, different color shifts).
   - A prominent "Start Game" button that transitions status from "idle" to "playing" and calls `startLevel(1)`.

10. **Build the main page at /app/src/pages/GamePage.tsx**
    - Uses `useResonanceGame` hook.
    - If `status === "idle"`: renders StartScreen.
    - Otherwise: renders GameHUD at the top and GameGrid centered below.
    - Full-screen dark background with a subtle grid-texture or radial gradient applied via Tailwind.

11. **Wire up routing in /app/src/App.tsx**
    - Render GamePage directly (no router needed — single page game).

12. **Add animation keyframes to /app/src/styles/global.css**
    - `@keyframes resonance-pulse` — scales a ring from 100% to 160% opacity 1→0, simulating a sonar ping.
    - `@keyframes absorb-flash` — quick brightness flash then back.
    - `@keyframes node-shake` — tiny left-right shake (2–3 steps).
    - Register these as Tailwind utilities using `@utility` or apply them inline via a conditional className string.

13. **Polish and responsive sizing**
    - Node size: on small screens each node is ~52px, on medium+ screens ~68px, using Tailwind responsive size classes.
    - Grid container: max-width capped so it always fits on screen regardless of level grid size.
    - Ensure touch targets are large enough for mobile play.

## Expected Outcome

A fully playable, novel puzzle game where players discover the resonance-chain mechanic organically. The board responds visually with wave animations. The game scales in difficulty across levels. No external game libraries are used — all logic is pure TypeScript utility functions.
