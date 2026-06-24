export type Frequency = 1 | 2 | 3 | 4 | 5;

export interface GridNode {
  id: string;
  row: number;
  col: number;
  frequency: Frequency;
  isResonating: boolean;
  isAbsorbing: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'won';

export interface GameState {
  grid: GridNode[][];
  targetFrequency: Frequency;
  moves: number;
  status: GameStatus;
  level: number;
}
