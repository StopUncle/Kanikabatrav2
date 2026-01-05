import type { ForkScene } from '../../../types';

export const goodEnding: ForkScene = {
  id: 'ending-success',
  backgroundId: 'apartment',
  isEnding: true,
  outcomeType: 'good',
  endingTitle: 'Pattern Recognized',
  endingSummary: 'You spotted the love-bombing. The too-fast intensity. The script. Ryan Cole will move on to someone else—someone who hasn\'t learned to see the signs. You have.',
  dialog: [
    { speakerId: null, text: 'That night, you think about Caleb. About Ryan. About patterns.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Same playbook. Different actors. Now you can see it.', emotion: 'knowing' },
  ],
};

export const lovebombEnding: ForkScene = {
  id: 'ending-lovebomb',
  backgroundId: 'bar',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Swept Away',
  endingSummary: 'Ryan\'s attention felt incredible. For two weeks. Then—nothing. When you see him again, he\'s running the same lines on someone else. And they\'re working.',
  dialog: [
    { speakerId: null, text: 'Three weeks later, you see him at a party. Same lines. New target.', emotion: 'neutral' },
    { speakerId: null, text: '"Has anyone ever told you that you have the most magnetic presence?"', emotion: 'neutral' },
    { speakerId: null, text: 'She laughs. Touches his arm. Leans closer. You remember that exact moment.', emotion: 'neutral' },
    { speakerId: null, text: 'He glances your way. No recognition. Nothing.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You thought you were the exception. You were just the last one.', emotion: 'sad' },
  ],
};

export const guiltEnding: ForkScene = {
  id: 'ending-guilt',
  backgroundId: 'park',
  isEnding: true,
  outcomeType: 'bad',
  endingTitle: 'Guilty by Association',
  endingSummary: 'You spent too long with Caleb, asking about Maris. Word got back. Fast.',
  dialog: [
    { speakerId: null, text: 'A text from an unknown number: "Maris knows you\'ve been asking about her."', emotion: 'neutral' },
    { speakerId: null, text: 'By morning, your invitation to next week\'s event is rescinded.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Caleb talked. Of course he did. He\'s Maris\'s creature.', emotion: 'angry' },
  ],
};

export const allEndings: ForkScene[] = [goodEnding, lovebombEnding, guiltEnding];
