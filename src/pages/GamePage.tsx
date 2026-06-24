import { useResonanceGame } from '@/hooks/useResonanceGame';
import StartScreen from '@/components/StartScreen';
import GameHUD from '@/components/GameHUD';
import GameGrid from '@/components/GameGrid';

export default function GamePage() {
  const { gameState, handlePluck, startLevel, resetLevel } = useResonanceGame();

  if (gameState.status === 'idle') {
    return <StartScreen onStart={() => startLevel(1)} />;
  }

  const { grid, targetFrequency, moves, status, level } = gameState;

  function handleNextLevel() {
    startLevel(level + 1);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center pt-6 pb-10 px-4"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)',
      }}
    >
      {/* Title */}
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 tracking-tight">
          Resonance Grid
        </h1>
      </div>

      {/* HUD */}
      <GameHUD
        level={level}
        moves={moves}
        targetFrequency={targetFrequency}
        status={status}
        onReset={resetLevel}
        onNextLevel={handleNextLevel}
      />

      {/* Instruction strip */}
      <p className="text-gray-600 text-xs mt-4 mb-5 text-center">
        Click a circle → same colour chains 🌊 → different colour shifts one step
      </p>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center">
        <GameGrid
          grid={grid}
          targetFrequency={targetFrequency}
          onPluck={handlePluck}
        />
      </div>
    </div>
  );
}
