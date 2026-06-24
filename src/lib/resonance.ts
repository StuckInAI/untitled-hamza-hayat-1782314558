import type { Frequency, GridNode, GameState } from '@/types/game';

function randomFreq(): Frequency {
  return (Math.floor(Math.random() * 5) + 1) as Frequency;
}

export function shiftFrequency(current: Frequency, target: Frequency): Frequency {
  if (current === target) return current;
  const next = current < target ? current + 1 : current - 1;
  return Math.max(1, Math.min(5, next)) as Frequency;
}

export function createGrid(rows: number, cols: number, targetFreq: Frequency): GridNode[][] {
  const grid: GridNode[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: GridNode[] = [];
    for (let c = 0; c < cols; c++) {
      // Give ~30% chance to start on target frequency to seed the board nicely
      const freq: Frequency = Math.random() < 0.3 ? targetFreq : randomFreq();
      row.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        frequency: freq,
        isResonating: false,
        isAbsorbing: false,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function getNeighbours(grid: GridNode[][], row: number, col: number): GridNode[] {
  const neighbours: GridNode[] = [];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
      neighbours.push(grid[nr][nc]);
    }
  }
  return neighbours;
}

interface WaveResult {
  resonating: Set<string>;
  absorbing: Map<string, Frequency>;
}

function computeWave(
  grid: GridNode[][],
  row: number,
  col: number,
  sourceFreq: Frequency,
  visited: Set<string>,
  result: WaveResult
): void {
  const neighbours = getNeighbours(grid, row, col);
  for (const neighbour of neighbours) {
    if (visited.has(neighbour.id)) continue;
    visited.add(neighbour.id);

    if (neighbour.frequency === sourceFreq) {
      // Resonance — chain the wave further
      result.resonating.add(neighbour.id);
      computeWave(grid, neighbour.row, neighbour.col, sourceFreq, visited, result);
    } else {
      // Absorption — shift toward source frequency
      result.absorbing.set(neighbour.id, shiftFrequency(neighbour.frequency, sourceFreq));
    }
  }
}

export function applyPluck(state: GameState, row: number, col: number): GameState {
  const source = state.grid[row][col];
  const sourceFreq = source.frequency;

  const visited = new Set<string>([source.id]);
  const result: WaveResult = {
    resonating: new Set<string>(),
    absorbing: new Map<string, Frequency>(),
  };

  computeWave(state.grid, row, col, sourceFreq, visited, result);

  // Build new grid with updated state
  const newGrid: GridNode[][] = state.grid.map(r =>
    r.map(node => {
      if (node.id === source.id) {
        return { ...node, isResonating: true, isAbsorbing: false };
      }
      if (result.resonating.has(node.id)) {
        return { ...node, isResonating: true, isAbsorbing: false };
      }
      if (result.absorbing.has(node.id)) {
        return {
          ...node,
          frequency: result.absorbing.get(node.id)!,
          isResonating: false,
          isAbsorbing: true,
        };
      }
      return { ...node, isResonating: false, isAbsorbing: false };
    })
  );

  return {
    ...state,
    grid: newGrid,
    moves: state.moves + 1,
  };
}

export function clearAnimations(state: GameState): GameState {
  return {
    ...state,
    grid: state.grid.map(r =>
      r.map(node => ({ ...node, isResonating: false, isAbsorbing: false }))
    ),
  };
}

export function checkWin(grid: GridNode[][], targetFreq: Frequency): boolean {
  return grid.every(row => row.every(node => node.frequency === targetFreq));
}

export function gridSizeForLevel(level: number): { rows: number; cols: number } {
  if (level === 1) return { rows: 4, cols: 4 };
  if (level === 2) return { rows: 5, cols: 5 };
  if (level === 3) return { rows: 6, cols: 6 };
  if (level === 4) return { rows: 6, cols: 7 };
  return { rows: 7, cols: 7 };
}
