import type { Frequency } from '@/types/game';

export interface FrequencyStyle {
  bg: string;
  ring: string;
  glow: string;
  text: string;
  border: string;
  label: string;
  hex: string;
}

export const FREQUENCY_STYLES: Record<Frequency, FrequencyStyle> = {
  1: {
    bg: 'bg-rose-500',
    ring: 'ring-rose-400',
    glow: 'shadow-rose-500/60',
    text: 'text-rose-100',
    border: 'border-rose-400',
    label: 'I',
    hex: '#f43f5e',
  },
  2: {
    bg: 'bg-orange-500',
    ring: 'ring-orange-400',
    glow: 'shadow-orange-500/60',
    text: 'text-orange-100',
    border: 'border-orange-400',
    label: 'II',
    hex: '#f97316',
  },
  3: {
    bg: 'bg-yellow-400',
    ring: 'ring-yellow-300',
    glow: 'shadow-yellow-400/60',
    text: 'text-yellow-900',
    border: 'border-yellow-300',
    label: 'III',
    hex: '#facc15',
  },
  4: {
    bg: 'bg-emerald-500',
    ring: 'ring-emerald-400',
    glow: 'shadow-emerald-500/60',
    text: 'text-emerald-100',
    border: 'border-emerald-400',
    label: 'IV',
    hex: '#10b981',
  },
  5: {
    bg: 'bg-blue-500',
    ring: 'ring-blue-400',
    glow: 'shadow-blue-500/60',
    text: 'text-blue-100',
    border: 'border-blue-400',
    label: 'V',
    hex: '#3b82f6',
  },
};
