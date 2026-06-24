import { useState, useCallback, useRef } from 'react';
import type { GameState, Frequency } from '@/types/game';
import {
  createGrid,
  applyPluck,
  clearAnimations,
  checkWin,
  gridSizeForLevel,
} from '@/lib/resonance';

function makeInitialState(): GameState {
  return {
    grid: [],
    targetFrequency: 1,
    moves: 0,
    status: 'idle',
    level: 1,
  };
}

export function useResonanceGame() {
  const [gameState, setGameState] = useState<GameState>(makeInitialState);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLevel = useCallback((level: number) => {
    const { rows, cols } = gridSizeForLevel(level);
    const targetFrequency = (Math.floor(Math.random() * 5) + 1) as Frequency;
    const grid = createGrid(rows, cols, targetFrequency);
    setGameState({
      grid,
      targetFrequency,
      moves: 0,
      status: 'playing',
      level,
    });
  }, []);

  const resetLevel = useCallback(() => {
    setGameState(prev => {
      const { rows, cols } = gridSizeForLevel(prev.level);
      return {
        ...prev,
        grid: createGrid(rows, cols, prev.targetFrequency),
        moves: 0,
        status: 'playing',
      };
    });
  }, []);

  const handlePluck = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.status !== 'playing') return prev;

      const afterPluck = applyPluck(prev, row, col);
      const won = checkWin(afterPluck.grid, afterPluck.targetFrequency);

      // Schedule animation clear
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      animTimerRef.current = setTimeout(() => {
        setGameState(s => clearAnimations(s));
      }, 450);

      return { ...afterPluck, status: won ? 'won' : 'playing' };
    });
  }, []);

  return { gameState, handlePluck, startLevel, resetLevel };
}
