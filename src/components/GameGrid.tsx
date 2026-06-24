import type { GridNode as GridNodeType, Frequency } from '@/types/game';
import GridNode from '@/components/GridNode';

interface Props {
  grid: GridNodeType[][];
  targetFrequency: Frequency;
  onPluck: (row: number, col: number) => void;
}

export default function GameGrid({ grid, targetFrequency, onPluck }: Props) {
  if (grid.length === 0) return null;

  const cols = grid[0].length;

  return (
    <div
      className="inline-grid gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {grid.flat().map(node => (
        <GridNode
          key={node.id}
          node={node}
          targetFrequency={targetFrequency}
          onClick={() => onPluck(node.row, node.col)}
        />
      ))}
    </div>
  );
}
