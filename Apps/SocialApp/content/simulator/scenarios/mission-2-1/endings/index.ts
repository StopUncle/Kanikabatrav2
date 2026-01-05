import type { ForkScene } from '../../../types';

export const genuineEnding: ForkScene = {
  id: 'ending-genuine',
  backgroundId: 'coffee-shop',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Real Connection',
  endingSummary: 'You navigated the digital minefield. Avoided the catfish, the oversharer, and found someone genuine. Jordan is real. The coffee is real. This is how it\'s supposed to feel.',
  dialog: [
    { speakerId: null, text: 'Coffee with Jordan. Easy conversation. No pressure.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Slow burn beats flash and crash. Every time.', emotion: 'hopeful' },
  ],
};

export const unsafeEnding: ForkScene = {
  id: 'ending-unsafe',
  backgroundId: 'apartment',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Boundary Breach',
  endingSummary: 'You gave your address to a stranger who pressured you. Sam never showed up. But someone knows where you live now.',
  dialog: [
    { speakerId: null, text: '8pm comes and goes. No Sam.', emotion: 'neutral' },
    { speakerId: null, text: '2am. A car idles outside. Engine running. Headlights off.', emotion: 'neutral' },
    { speakerId: null, text: 'You watch from the window. Fifteen minutes. Then it drives away.', emotion: 'neutral' },
    { speakerId: null, text: 'You don\'t sleep. You\'ll move apartments within the month.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'One bad decision. Months of looking over your shoulder.', emotion: 'sad' },
  ],
};

export const manipulationEnding: ForkScene = {
  id: 'ending-manipulation',
  backgroundId: 'text-screen',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Guilt Trap',
  endingSummary: 'You apologized for having boundaries. Sam took that as an opening. The relationship started with you already compromising yourself. Pattern set.',
  dialog: [
    { speakerId: null, text: 'SAM: "I knew you\'d come around. Now, about that address..."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'When you apologize for boundaries, you teach people to push them.', emotion: 'sad' },
  ],
};

export const overshareEnding: ForkScene = {
  id: 'ending-overshare',
  backgroundId: 'text-screen',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Information Extracted',
  endingSummary: 'Riley got what they wanted—a complete profile of your life. They never asked you on a date. They just collected.',
  dialog: [
    { speakerId: null, text: 'Riley stopped texting. A week later, a fake account messages your mom on Facebook.', emotion: 'neutral' },
    { speakerId: null, text: 'They know your family structure now. Your hometown. Your vulnerabilities.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You handed someone everything they needed to hurt you.', emotion: 'sad' },
  ],
};

export const allEndings: ForkScene[] = [genuineEnding, unsafeEnding, manipulationEnding, overshareEnding];
