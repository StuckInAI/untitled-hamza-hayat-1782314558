import type { GameStatus, Frequency } from '@/types/game';
import { FREQUENCY_STYLES } from '@/lib/frequencyColors';

interface Props {
  level: number;
  moves: number;
  targetFrequency: Frequency;
  status: GameStatus;
  onReset: () => void;
  onNextLevel: () => void;
}

export default function GameHUD({ level, moves, targetFrequency, status, onReset, onNextLevel }: Props) {
  const targetStyle = FREQUENCY_STYLES[targetFrequency];

  return (
    <>
      {/* Main HUD bar */}
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
        {/* Level badge */}
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Level</span>
          <span className="text-white text-2xl font-black">{level}</span>
        </div>

        {/* Target frequency */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Target</span>
          <div className={`w-12 h-12 rounded-full ${targetStyle.bg} flex items-center justify-center shadow-lg text-sm font-black ${targetStyle.text} ring-2 ${targetStyle.ring} ring-offset-2 ring-offset-gray-900`}>
            {targetStyle.label}
          </div>
          <span className="text-gray-400 text-xs">Tune all to this</span>
        </div>

        {/* Moves */}
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Moves</span>
          <span className="text-white text-2xl font-black">{moves}</span>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-150 cursor-pointer border border-gray-700 hover:border-gray-600"
        >
          ↺ Reset
        </button>
      </div>

      {/* Win overlay */}
      {status === 'won' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="animate-win-pop bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-black text-white mb-2">Tuned!</h2>
            <p className="text-gray-400 mb-1">Level {level} complete</p>
            <p className="text-2xl font-bold text-white mb-6">
              {moves} <span className="text-gray-400 text-base font-normal">move{moves !== 1 ? 's' : ''}</span>
            </p>

            {/* Par rating */}
            <div className="flex justify-center gap-1 mb-6">
              {[1, 2, 3].map(i => (
                <span key={i} className="text-2xl">{moves <= level * 4 + i * 2 ? '⭐' : '☆'}</span>
              ))}
            </div>

            <button
              onClick={onNextLevel}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Next Level →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
