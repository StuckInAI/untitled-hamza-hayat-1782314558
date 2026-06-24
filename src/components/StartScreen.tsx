import { FREQUENCY_STYLES } from '@/lib/frequencyColors';
import type { Frequency } from '@/types/game';

interface Props {
  onStart: () => void;
}

const DEMO_FREQS: Frequency[] = [1, 2, 3, 4, 5];

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-black tracking-tight text-white mb-2">
            Resonance
          </h1>
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-yellow-400 to-blue-400 mb-6">
            Grid
          </h2>
          <p className="text-gray-400 text-lg">A wave propagation puzzle unlike anything else</p>
        </div>

        {/* Frequency demo dots */}
        <div className="flex justify-center gap-3 mb-10">
          {DEMO_FREQS.map(f => {
            const style = FREQUENCY_STYLES[f];
            return (
              <div
                key={f}
                className={`w-12 h-12 rounded-full ${style.bg} flex items-center justify-center shadow-lg ${style.glow} font-bold text-sm ${style.text}`}
              >
                {style.label}
              </div>
            );
          })}
        </div>

        {/* Rules */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 text-left space-y-4">
          <h3 className="text-white font-bold text-lg mb-3 text-center">How to Play</h3>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold mt-0.5">1</div>
            <div>
              <p className="text-white font-semibold">Click any circle to pluck it</p>
              <p className="text-gray-400 text-sm">It sends a wave rippling outward to its neighbours</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold mt-0.5">2</div>
            <div>
              <p className="text-white font-semibold">Same colour = Resonance ✨</p>
              <p className="text-gray-400 text-sm">Matching neighbours amplify the wave and chain it even further</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold mt-0.5">3</div>
            <div>
              <p className="text-white font-semibold">Different colour = Absorption 🔄</p>
              <p className="text-gray-400 text-sm">They absorb the wave and shift one step closer to your colour</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold mt-0.5">🎯</div>
            <div>
              <p className="text-white font-semibold">Tune everything to the target</p>
              <p className="text-gray-400 text-sm">Get all circles to match the target colour — in as few clicks as possible</p>
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full py-4 px-8 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 hover:from-rose-400 hover:via-purple-400 hover:to-blue-400 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          Start Playing →
        </button>
        <p className="text-gray-600 text-sm mt-4">Levels get larger as you progress</p>
      </div>
    </div>
  );
}
