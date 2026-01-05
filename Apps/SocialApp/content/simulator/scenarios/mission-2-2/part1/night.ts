import type { ForkScene } from '../../../types';
export const nightScenes: ForkScene[] = [
  { id: 'night-out', backgroundId: 'bar', mood: 'party', dialog: [
    { speakerId: null, text: 'The bar is crowded. Blake is in full wingman mode.', emotion: 'neutral' },
    { speakerId: 'blake', text: '"Okay, I\'ll set you up. Just follow my lead."', emotion: 'happy' },
    { speakerId: 'inner-voice', text: 'Blake is confident. Too confident. Watch carefully.', emotion: 'knowing' },
  ], nextSceneId: 'blake-approach' },
  { id: 'blake-approach', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'Blake approaches a group. You hang back slightly.', emotion: 'neutral' },
    { speakerId: 'blake', text: '"Hey! This is my friend. They\'re actually pretty cool—once you get past the awkward phase."', emotion: 'smirking' },
    { speakerId: 'inner-voice', text: '"Awkward phase"? That\'s not a compliment.', emotion: 'concerned' },
  ], choices: [
    { id: 'call-out', text: '"Thanks Blake. He means socially selective."', nextSceneId: 'recover-smooth', feedback: 'Quick redirect. Nice.', isOptimal: true },
    { id: 'laugh-along', text: 'Laugh it off and play along', nextSceneId: 'blake-continues', feedback: 'Accepting the frame he set.' },
  ]},
  { id: 'recover-smooth', backgroundId: 'bar', dialog: [
    { speakerId: 'morgan', text: '"Ha! Socially selective. I like that."', emotion: 'happy' },
    { speakerId: null, text: 'Morgan turns toward you, interested. Blake\'s smile tightens slightly.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You took control. He didn\'t expect that.', emotion: 'knowing' },
  ], nextSceneId: 'morgan-chat' },
  { id: 'blake-continues', backgroundId: 'bar', dialog: [
    { speakerId: 'blake', text: '"No but seriously, they\'re great. Just takes a while to warm up."', emotion: 'happy' },
    { speakerId: 'blake', text: '"I on the other hand am an open book. What do you want to know?"', emotion: 'seductive' },
    { speakerId: 'inner-voice', text: 'And now he\'s pivoted the attention to himself.', emotion: 'knowing' },
  ], choices: [
    { id: 'reclaim', text: 'Interject and reclaim the conversation', nextSceneId: 'reclaim-convo', feedback: 'Don\'t let him run the show.' },
    { id: 'let-go', text: 'Let Blake have this one', nextSceneId: 'blake-wins', feedback: 'Strategic retreat. Or just losing.' },
  ]},
  { id: 'morgan-chat', backgroundId: 'bar', dialog: [
    { speakerId: 'morgan', text: '"So what brings you out tonight?"', emotion: 'curious' },
    { speakerId: 'blake', text: '"We\'re celebrating—"', emotion: 'happy' },
    { speakerId: 'morgan', text: '"I was asking them, actually."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'Morgan sees through Blake. Good sign.', emotion: 'hopeful' },
  ], choices: [
    { id: 'honest-answer', text: '"Just needed a night out. You?"', nextSceneId: 'connection-builds', feedback: 'Genuine. Simple.', isOptimal: true },
    { id: 'show-off', text: 'Tell an impressive story', nextSceneId: 'trying-hard', feedback: 'Performing instead of connecting.' },
  ]},
  { id: 'connection-builds', backgroundId: 'bar', dialog: [
    { speakerId: 'morgan', text: '"Same. Work has been intense. This is the first real break I\'ve had."', emotion: 'neutral' },
    { speakerId: null, text: 'The conversation flows. Blake hovers awkwardly, then excuses himself.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He lost interest when he couldn\'t control it.', emotion: 'knowing' },
  ], nextSceneId: 'ending-genuine' },
  { id: 'reclaim-convo', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'You step in smoothly, redirecting the conversation.', emotion: 'neutral' },
    { speakerId: 'blake', text: '"Oh—yeah, sorry, go ahead."', emotion: 'neutral' },
    { speakerId: 'morgan', text: '"You two have an interesting dynamic."', emotion: 'smirking' },
  ], nextSceneId: 'connection-builds' },
  { id: 'trying-hard', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'You launch into a story about something impressive.', emotion: 'neutral' },
    { speakerId: 'morgan', text: '"Uh huh. That\'s... nice."', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'You lost her. Performance killed connection.', emotion: 'sad' },
  ], nextSceneId: 'ending-tryhard' },
  { id: 'blake-wins', backgroundId: 'bar', dialog: [
    { speakerId: null, text: 'You step back. Blake fills the space immediately.', emotion: 'neutral' },
    { speakerId: null, text: 'Within minutes, Morgan is laughing at his jokes. Looking at him.', emotion: 'neutral' },
    { speakerId: 'inner-voice', text: 'He wasn\'t your wingman. You were his.', emotion: 'sad' },
  ], nextSceneId: 'ending-sabotaged' },
];
