import type { ForkScene } from '../../../types';

export const partyScenes: ForkScene[] = [
  {
    id: 'party-arrival',
    backgroundId: 'bar',
    mood: 'romantic',
    dialog: [
      { speakerId: null, text: 'A rooftop gathering. Fairy lights. Soft music. Intimate.', emotion: 'neutral' },
      { speakerId: null, text: 'You spot Caleb in the corner, alone, watching the door like he\'s waiting for someone.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Maris isn\'t here. But Caleb is. Interesting.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'approach-caleb', text: 'Approach Caleb', nextSceneId: 'caleb-talk', feedback: 'The cautionary tale might have something to teach.' },
      { id: 'mingle', text: 'Mingle with the crowd', nextSceneId: 'ryan-approach', feedback: 'Stay open. See who finds you.' },
    ],
  },
  {
    id: 'caleb-talk',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'caleb', text: '"Oh. Hey. You were at the gala, right?"', emotion: 'neutral' },
      { speakerId: 'caleb', text: '"Maris mentioned you. That\'s... rare."', emotion: 'serious' },
      { speakerId: 'inner-voice', text: 'He looks tired. Worn down.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'ask-caleb', text: '"How do you know Maris?"', nextSceneId: 'caleb-story', feedback: 'His story might be a warning.' },
      { id: 'surface-chat', text: '"Good party, right?"', nextSceneId: 'caleb-surface', feedback: 'Keep it light. He might not want to go deep.' },
    ],
  },
  {
    id: 'caleb-story',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'caleb', text: '"We\'ve been friends for two years. I do... things for her. Help out."', emotion: 'neutral' },
      { speakerId: 'caleb', text: '"She can be a lot. But she notices me, you know? That counts for something."', emotion: 'sad' },
      { speakerId: 'inner-voice', text: 'He waits. He helps. He gets noticed. That\'s the whole deal for him.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'let-go', text: '"I understand. Thanks for sharing."', nextSceneId: 'ryan-interrupt', feedback: 'Know when to stop digging.', isOptimal: true },
      { id: 'push-maris', text: '"What does Maris actually do? What\'s her deal?"', nextSceneId: 'caleb-uncomfortable', feedback: 'He\'s loyal to her. Be careful.' },
    ],
  },
  {
    id: 'caleb-uncomfortable',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'caleb', text: '"Her deal?"', emotion: 'confused' },
      { speakerId: null, text: 'He shifts. Glances at his phone.', emotion: 'neutral' },
      { speakerId: 'caleb', text: '"I mean... she connects people. Opens doors. Why are you asking so many questions?"', emotion: 'concerned' },
      { speakerId: 'inner-voice', text: 'Wrong nerve. He\'s getting defensive.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'backoff', text: '"No reason. Just curious."', nextSceneId: 'ryan-interrupt', feedback: 'Damage control. Smart.', isOptimal: true },
      { id: 'keep-pushing', text: '"Come on, there must be more to it"', nextSceneId: 'caleb-reports', feedback: 'He reports to Maris. You\'re making yourself a problem.' },
    ],
  },
  {
    id: 'caleb-reports',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'caleb', text: '"I... I should check on something. Excuse me."', emotion: 'neutral' },
      { speakerId: null, text: 'He walks away. Types something on his phone. Doesn\'t look back.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'That text is going straight to Maris. You pushed too hard.', emotion: 'angry' },
    ],
    nextSceneId: 'ending-guilt',
  },
  {
    id: 'caleb-surface',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'caleb', text: '"Yeah. It\'s fine. Maris couldn\'t make it so..."', emotion: 'neutral' },
      { speakerId: null, text: 'He trails off. Looks at his phone. Waiting.', emotion: 'neutral' },
    ],
    nextSceneId: 'ryan-interrupt',
  },
  {
    id: 'ryan-approach',
    backgroundId: 'bar',
    dialog: [
      { speakerId: null, text: 'A guy approaches. Confident. Good-looking. Direct eye contact.', emotion: 'neutral' },
      { speakerId: 'ryan', text: '"I couldn\'t help but notice you from across the room. I\'m Ryan."', emotion: 'seductive' },
      { speakerId: 'ryan', text: '"Has anyone ever told you that you have the most magnetic presence?"', emotion: 'seductive' },
      { speakerId: null, text: 'He delivers it smoothly. Too smoothly. Like he\'s said it before.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'That was fast. Too fast.', emotion: 'concerned' },
    ],
    choices: [
      { id: 'flattered', text: '"That\'s sweet. Thanks."', nextSceneId: 'ryan-escalates', feedback: 'Accepting the compliment. Watch what comes next.' },
      { id: 'deflect-ryan', text: '"Do you always open with that line?"', nextSceneId: 'ryan-challenged', feedback: 'Light challenge. See how he handles pushback.', isOptimal: true },
    ],
  },
  {
    id: 'ryan-interrupt',
    backgroundId: 'bar',
    dialog: [
      { speakerId: null, text: 'Someone slides up beside you. Confident. Charming smile.', emotion: 'neutral' },
      { speakerId: 'ryan', text: '"Mind if I steal you away? I\'m Ryan."', emotion: 'seductive' },
      { speakerId: 'caleb', text: '"Oh. Sure. I should check my phone anyway."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'Caleb deferred instantly. Ryan didn\'t even acknowledge him.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'go-ryan', text: 'Let Ryan lead you away', nextSceneId: 'ryan-escalates', feedback: 'He\'s in control now. Careful.' },
      { id: 'stay-caleb', text: '"Actually, I was mid-conversation"', nextSceneId: 'ryan-challenged', feedback: 'Boundary set. His reaction will be telling.', isOptimal: true },
    ],
  },
  {
    id: 'ryan-escalates',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'ryan', text: '"You\'re not like the other people here. I can tell."', emotion: 'seductive' },
      { speakerId: 'ryan', text: '"There\'s something special about you. I felt it the moment you walked in."', emotion: 'seductive' },
      { speakerId: 'inner-voice', text: 'Five minutes. And he already sees something "special"? Really?', emotion: 'concerned' },
    ],
    choices: [
      { id: 'believe-ryan', text: '"You really think so?"', nextSceneId: 'falling-trap', feedback: 'You\'re giving him exactly what he wants.', isOptimal: false },
      { id: 'slow-down', text: '"We just met. Maybe slow down?"', nextSceneId: 'ryan-masks-slip', feedback: 'Test his reaction to boundaries.', isOptimal: true },
    ],
  },
  {
    id: 'ryan-challenged',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'ryan', text: '"Ha! You\'re sharp. I like that."', emotion: 'smirking' },
      { speakerId: 'ryan', text: '"No, seriously though. There\'s something about you. Can\'t you feel it?"', emotion: 'seductive' },
      { speakerId: 'inner-voice', text: 'He bounced back too fast. Still pushing. Still intense.', emotion: 'knowing' },
    ],
    choices: [
      { id: 'engage-cautious', text: '"Maybe. But I don\'t know you yet."', nextSceneId: 'ryan-resets', feedback: 'Healthy skepticism. He\'ll adapt or retreat.' },
      { id: 'full-decline', text: '"I think I need some air actually"', nextSceneId: 'escape-ryan', feedback: 'Trust your gut. Exit.', isOptimal: true },
    ],
  },
  {
    id: 'ryan-masks-slip',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'ryan', text: '"Slow down?"', emotion: 'confused' },
      { speakerId: null, text: 'For just a second, irritation flickers. Then the smile returns.', emotion: 'neutral' },
      { speakerId: 'ryan', text: '"Of course. I just... felt a connection. But you\'re right. No pressure."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'There. The mask slipped. He didn\'t like that boundary.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-rescue',
  },
  {
    id: 'falling-trap',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'ryan', text: '"Absolutely. You\'re going to do amazing things. I can tell."', emotion: 'seductive' },
      { speakerId: 'ryan', text: '"We should get out of here. Go somewhere quieter. Get to know each other."', emotion: 'seductive' },
      { speakerId: 'inner-voice', text: 'Stop. Think. You met him ten minutes ago.', emotion: 'concerned' },
    ],
    nextSceneId: 'ending-lovebomb',
  },
  {
    id: 'ryan-resets',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'ryan', text: '"Fair enough. Let\'s start fresh. What brings you here tonight?"', emotion: 'neutral' },
      { speakerId: null, text: 'He\'s recalibrating. The intensity dialed back—for now.', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'He\'s adjusting his approach. Adaptive. Be careful.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-rescue',
  },
  {
    id: 'escape-ryan',
    backgroundId: 'park',
    dialog: [
      { speakerId: null, text: 'You step outside. The night air is cool. Clear.', emotion: 'neutral' },
      { speakerId: 'priya', text: '"Hey. Saw that guy cornering you. You okay?"', emotion: 'concerned' },
      { speakerId: 'priya', text: '"Ryan Cole. He\'s got a reputation for this. You dodged a bullet."', emotion: 'serious' },
    ],
    nextSceneId: 'ending-success',
  },
  {
    id: 'priya-rescue',
    backgroundId: 'bar',
    dialog: [
      { speakerId: 'priya', text: '"Hey! There you are. I need you for something."', emotion: 'happy' },
      { speakerId: null, text: 'Priya appears, arm through yours, steering you away.', emotion: 'neutral' },
      { speakerId: 'ryan', text: '"We\'ll continue this later."', emotion: 'neutral' },
      { speakerId: 'inner-voice', text: 'The way he said "continue." Like it\'s guaranteed. Entitled.', emotion: 'knowing' },
    ],
    nextSceneId: 'priya-debrief',
  },
  {
    id: 'priya-debrief',
    backgroundId: 'park',
    dialog: [
      { speakerId: 'priya', text: '"Ryan Cole. He does this to someone new every few weeks."', emotion: 'serious' },
      { speakerId: 'priya', text: '"He moved on already. There\'s another girl getting the \'magnetic presence\' line right now."', emotion: 'knowing' },
      { speakerId: 'priya', text: '"You spotted it though. That\'s good."', emotion: 'happy' },
    ],
    nextSceneId: 'ending-success',
  },
];
