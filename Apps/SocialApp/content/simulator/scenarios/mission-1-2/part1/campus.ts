import type { ForkScene } from '../../../types';

export const campusScenes: ForkScene[] = [
  {
    id: 'campus-walk',
    backgroundId: 'park',
    mood: 'peaceful',
    dialog: [
      { speakerId: null, text: 'Morning class is over. You walk across the quad, coffee in hand.', emotion: 'neutral' },
      { speakerId: null, text: 'A few people nod at you. One girl whispers to her friend as you pass.', emotion: 'neutral' },
      { speakerId: null, text: 'Jordan Park, the RA, sits on a bench nearby. Reading, but... watching. You catch him glancing your way.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'The gala changed things. You\'re on people\'s radar now.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'acknowledge', text: 'Give a casual nod back', nextSceneId: 'dana-intercept', feedback: 'Confident but not cocky. Good.' },
      { id: 'ignore', text: 'Keep walking, eyes forward', nextSceneId: 'alex-ambush', feedback: 'Sometimes ignoring attention draws more attention.' },
    ],
  },
  {
    id: 'dana-intercept',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"Hey! I was hoping I\'d run into you!"', emotion: 'happy' },
      { speakerId: 'dana', text: '"We should get lunch. My treat. I know this great place off campus."', emotion: 'happy' },
      { speakerId: null, text: 'Over Dana\'s shoulder, you see Jordan look up from his book. Watching.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Yesterday coffee. Today lunch. She\'s escalating fast.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'accept-lunch', text: '"Sure, sounds good"', nextSceneId: 'lunch-trap', feedback: 'Deeper into her orbit. Be careful.' },
      { id: 'raincheck', text: '"Can\'t today. Maybe another time?"', nextSceneId: 'dana-pushed', feedback: 'Soft no. See how she handles boundaries.', isOptimal: true },
      { id: 'direct-decline', text: '"I\'m good, thanks"', nextSceneId: 'dana-mask-slip', feedback: 'Direct. Watch for the mask slip.' },
    ],
  },
  {
    id: 'alex-ambush',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'alex', text: '"Yo. We need to talk."', emotion: 'serious' },
      { speakerId: null, text: 'Alex falls into step beside you. His energy is off.', emotion: 'neutral' },
      { speakerId: 'alex', text: '"People are saying things. About you and Maris."', emotion: 'concerned' },
      { speakerId: 'inner-voice', text: 'He\'s been stewing. This is about jealousy, not concern.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'defensive', text: '"What kind of things?"', nextSceneId: 'alex-confrontation', feedback: 'Engaging with rumors gives them power.' },
      { id: 'dismiss', text: '"People talk. Doesn\'t mean anything."', nextSceneId: 'alex-dismissed', feedback: 'Unbothered energy. He expected more reaction.', isOptimal: true },
    ],
  },
  {
    id: 'dana-pushed',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"Oh. Sure. Another time then."', emotion: 'neutral' },
      { speakerId: null, text: 'For just a second, something flickers behind her smile. Calculation.', emotion: 'neutral' },
      { speakerId: 'dana', text: '"I\'ll text you! We\'ll figure something out."', emotion: 'happy' },
      { speakerId: 'inner-voice', text: 'She didn\'t like that. But she\'s playing the long game.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-checkpoint',
  },
  {
    id: 'dana-mask-slip',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'dana', text: '"You\'re good?"', emotion: 'confused' },
      { speakerId: null, text: 'Her warmth flickers. Then returns, slightly forced.', emotion: 'neutral' },
      { speakerId: 'dana', text: '"No, it\'s fine. I just thought we had something here, but..."', emotion: 'sad' },
      { speakerId: 'dana', text: '"Anyway. If you ever need anything..."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Guilt trip. Classic move. She made your "no" feel cruel.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-checkpoint',
  },
  {
    id: 'lunch-trap',
    backgroundId: 'restaurant',
    dialog: [
      { speakerId: null, text: 'The restaurant is upscale. Dana orders for both of you.', emotion: 'neutral' },
      { speakerId: 'dana', text: '"So tell me everything about the gala. Who did you talk to? What did Maris say?"', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'This isn\'t lunch. This is an interrogation.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'share-details', text: 'Share some details', nextSceneId: 'ending-dana-wins', feedback: 'She\'ll be texting before you finish your sentence.', isOptimal: false },
      { id: 'redirect', text: '"Tell me about you first. What\'s your story?"', nextSceneId: 'dana-deflected-lunch', feedback: 'Turn it around. Make her the subject.', isOptimal: true },
    ],
  },
  {
    id: 'dana-deflected-lunch',
    backgroundId: 'restaurant',
    dialog: [
      { speakerId: 'dana', text: '"Me? Oh, I\'m not that interesting."', emotion: 'neutral' },
      { speakerId: 'dana', text: '"But really, the gala must have been amazing. Maris is so selective..."', emotion: 'curious' },
      { speakerId: 'inner-voice', text: 'She won\'t stop. Time to end this lunch.', emotion: 'serious' },
    ],
    choices: [
      { id: 'fake-emergency', text: '"Oh no, I forgot I have a thing. Gotta run."', nextSceneId: 'escape-dana', feedback: 'Strategic exit. She\'ll remember this.', isOptimal: true },
      { id: 'give-crumbs', text: 'Give her something small to end the questions', nextSceneId: 'ending-dana-wins', feedback: 'Even crumbs are information she can use.' },
    ],
  },
  {
    id: 'escape-dana',
    backgroundId: 'park',
    dialog: [
      { speakerId: null, text: 'You leave money on the table and exit. Dana\'s smile doesn\'t waver.', emotion: 'neutral' },
      { speakerId: 'dana', text: '"We\'ll do this again soon!"', emotion: 'happy' },
      { speakerId: 'inner-voice', text: 'She\'s not giving up. But you\'re learning her patterns.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-checkpoint',
  },
  {
    id: 'alex-confrontation',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'alex', text: '"They\'re saying you\'re trying to get into Maris\'s circle. That you think you\'re better than everyone."', emotion: 'angry' },
      { speakerId: 'alex', text: '"Is that true? You think you\'re too good for us now?"', emotion: 'angry' },
      { speakerId: 'inner-voice', text: 'Jealousy speaking. Don\'t engage at this level.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'fight-back', text: '"That\'s ridiculous and you know it"', nextSceneId: 'alex-escalates', feedback: 'Defense reads as confirmation to the jealous mind.' },
      { id: 'stay-calm', text: '"I went to a party, Alex. That\'s it."', nextSceneId: 'alex-calms', feedback: 'Minimizing. De-escalating. Smart.', isOptimal: true },
    ],
  },
  {
    id: 'alex-dismissed',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'alex', text: '"...Doesn\'t it bother you? What they\'re saying?"', emotion: 'confused' },
      { speakerId: null, text: 'Your lack of reaction throws him off.', emotion: 'neutral' },
      { speakerId: 'alex', text: '"Whatever. Just... be careful, I guess."', emotion: 'neutral' },
    ],
    nextSceneId: 'priya-checkpoint',
  },
  {
    id: 'alex-escalates',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'alex', text: '"See? Getting defensive. That\'s exactly what a social climber would do."', emotion: 'angry' },
      { speakerId: null, text: 'His voice is loud enough that people are looking.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'He\'s making a scene. You need to end this now.', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-alex-scene',
  },
  {
    id: 'alex-calms',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'alex', text: '"Just a party? That\'s it?"', emotion: 'confused' },
      { speakerId: 'alex', text: '"Because people are saying you and Maris were like... talking for a long time."', emotion: 'concerned' },
      { speakerId: null, text: 'He\'s watching your reaction. Testing.', emotion: 'neutral' },
      { speakerId: 'alex', text: '"...Fine. Maybe I overreacted. It\'s just weird, you know?"', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'He backed off. But he\'ll be watching. Always watching.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-checkpoint',
  },
  {
    id: 'priya-checkpoint',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: null, text: 'Later. Campus Bean. Priya slides into the seat across from you.', emotion: 'neutral' },
      { speakerId: 'priya', text: '"Saw Dana cornering you earlier. You okay?"', emotion: 'concerned' },
      { speakerId: 'priya', text: '"She does that. Picks someone new every semester. Extracts everything useful, then drops them."', emotion: 'serious' },
    ],
    choices: [
      { id: 'ask-advice', text: '"How do I handle her?"', nextSceneId: 'priya-advice', feedback: 'Learn from someone who\'s been through it.' },
      { id: 'already-figured', text: '"I think I\'ve got her figured out"', nextSceneId: 'priya-validates', feedback: 'Confidence. But stay humble.', isOptimal: true },
    ],
  },
  {
    id: 'priya-advice',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'priya', text: '"Never give her what she wants directly. She wants information? Redirect. Make her work for everything."', emotion: 'serious' },
      { speakerId: 'priya', text: '"And watch who she\'s close to. If she\'s suddenly interested in you, she has a reason."', emotion: 'knowing' },
      { speakerId: 'priya', text: '"The reason is never good for you."', emotion: 'serious' },
    ],
    nextSceneId: 'jordan-appears',
  },
  {
    id: 'priya-validates',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'priya', text: '"Good. You learn fast."', emotion: 'happy' },
      { speakerId: 'priya', text: '"Just remember—she\'s playing a longer game than you think. The sweet act is just phase one."', emotion: 'serious' },
    ],
    nextSceneId: 'jordan-appears',
  },
  {
    id: 'jordan-appears',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: null, text: 'Jordan Park walks in. Sees you both. Makes a beeline.', emotion: 'neutral' },
      { speakerId: 'jordan', text: '"Hey. Got a minute?"', emotion: 'serious' },
      { speakerId: 'inner-voice', text: 'The RA wants to talk. Official or personal?', emotion: 'curious' },
    ],
    choices: [
      { id: 'talk-jordan', text: '"Sure, what\'s up?"', nextSceneId: 'jordan-warning', feedback: 'The RA sees everything. Worth hearing.' },
      { id: 'excuse', text: '"Actually, we were just leaving"', nextSceneId: 'jordan-brief', feedback: 'Avoiding the RA. Could backfire.' },
    ],
  },
  {
    id: 'jordan-warning',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'jordan', text: '"Look, I\'m not here to lecture you. But I see patterns."', emotion: 'serious' },
      { speakerId: 'jordan', text: '"Dana Morrison. She\'s been asking about you. A lot."', emotion: 'concerned' },
      { speakerId: 'jordan', text: '"Last person she took an interest in transferred out mid-semester. Just... be careful."', emotion: 'serious' },
    ],
    nextSceneId: 'ending-success',
  },
  {
    id: 'jordan-brief',
    backgroundId: 'coffee-shop',
    dialog: [
      { speakerId: 'jordan', text: '"Right. Another time then."', emotion: 'neutral' },
      { speakerId: null, text: 'He watches you leave. Thoughtful.', emotion: 'neutral' },
      { speakerId: 'priya', text: '"Jordan\'s one of the good ones. You might want to hear what he has to say sometime."', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-success',
  },
];
