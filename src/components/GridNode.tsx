import type { GridNode as GridNodeType, Frequency } from '@/types/game';
import { FREQUENCY_STYLES } from '@/lib/frequencyColors';

interface Props {
  node: GridNodeType;
  targetFrequency: Frequency;
  onClick: () => void;
}

export default function GridNode({ node, targetFrequency, onClick }: Props) {
  const style = FREQUENCY_STYLES[node.frequency];
  const isOnTarget = node.frequency === targetFrequency;

  let animClass = '';
  if (node.isResonating) animClass = 'animate-resonance';
  else if (node.isAbsorbing) animClass = 'animate-absorb';

  return (
    <button
      onClick={onClick}
      className={[
        'relative rounded-full flex items-center justify-center',
        'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
        'font-bold text-xs sm:text-sm select-none cursor-pointer',
        'transition-transform duration-150',
        'hover:scale-110 active:scale-95',
        'shadow-lg',
        style.bg,
        style.text,
        isOnTarget ? `ring-2 ${style.ring} ring-offset-2 ring-offset-gray-950` : '',
        isOnTarget ? `shadow-xl ${style.glow}` : '',
        animClass,
      ].filter(Boolean).join(' ')}
      aria-label={`Node frequency ${node.frequency}, ${isOnTarget ? 'on target' : 'off target'}`}
    >
      {/* Inner glow dot when on target */}
      {isOnTarget && (
        <span
          className="absolute inset-0 rounded-full opacity-30 animate-pulse"
          style={{ background: style.hex }}
        />
      )}

      {/* Resonance ring */}
      {node.isResonating && (
        <span
          className="absolute inset-0 rounded-full border-2 border-white opacity-60"
          style={{ animation: 'resonance-pulse 0.45s ease-out' }}
        />
      )}

      <span className="relative z-10 font-black">{style.label}</span>
    </button>
  );
}
