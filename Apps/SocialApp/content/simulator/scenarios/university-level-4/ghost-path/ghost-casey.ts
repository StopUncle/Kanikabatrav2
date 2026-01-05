import type { ForkScene } from '../../../types';

/**
 * Ghost Path: Casey Chen
 * Past relationship returns with new power
 */
export const caseyScenes: ForkScene[] = [
  {
    id: 'ghost-casey-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    chapter: { name: 'Ghosts', index: 2, total: 4 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'Evening. The bar fills with guests. Post-dinner socializing.',
      },
      {
        text: 'A voice you haven\'t heard in years.',
      },
      {
        text: '"Well. Look who made it to the island."',
      },
      {
        text: 'You turn. Casey Chen. Kai\'s younger sibling. Your past.',
      },
      {
        text: 'Different now. Sharper edges. Designer clothes. Power in their stance.',
      },
      {
        text: 'Casey. Here. Of all places.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-casey-confrontation',
  },
  {
    id: 'ghost-casey-confrontation',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"You look surprised." Casey takes the stool beside you.',
        speakerId: 'casey',
        emotion: 'smirking',
      },
      {
        text: '"Kai didn\'t tell you I was part of this now?"',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"I\'ve been in Harrison\'s circle for two years. Moved up fast."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'Blake watches from across the room. Sensing tension.',
      },
      {
        text: 'Casey\'s further inside than we are. And they know our history.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-casey-history',
  },
  {
    id: 'ghost-casey-history',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: '"Last time I saw you..." Casey swirls their drink.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"You were promising me things. Future. Commitment. All that."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Then you disappeared. No explanation. Just... gone."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"I cried for months. Did you know that?"',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'Old wounds. They\'ve been waiting to have this conversation.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'casey-trap',
        text: '"That was a long time ago. We were different people."',
        nextSceneId: 'ghost-casey-dismissed',
        isOptimal: false,
        tactic: 'dismissal',
        reaction: {
          text: '"Different people." Their laugh is cold. "How convenient."',
          emotion: 'angry',
          bodyLanguage: 'You minimized their pain. They won\'t forget.',
          scoreImpact: -10,
        },
      },
      {
        id: 'casey-subtle',
        text: '"I\'m sorry. I was young. I didn\'t know how to handle it."',
        nextSceneId: 'ghost-casey-apology',
        isOptimal: false,
        tactic: 'apology',
        reaction: {
          text: '"Sorry." They consider. "That\'s... something."',
          emotion: 'neutral',
          bodyLanguage: 'Basic apology. Acknowledged but not resolved.',
          scoreImpact: 5,
        },
      },
      {
        id: 'casey-close',
        text: '"I hurt you. I know. If you want an explanation, I can try."',
        nextSceneId: 'ghost-casey-honest',
        isOptimal: false,
        tactic: 'accountability',
        reaction: {
          text: 'Something softens in their eyes. "Try. I want to hear it."',
          emotion: 'neutral',
          bodyLanguage: 'You acknowledged fault. They\'re listening.',
          scoreImpact: 15,
        },
      },
      {
        id: 'casey-optimal',
        text: '"You deserved better. I was scared of how much I felt—and I ran."',
        nextSceneId: 'ghost-casey-vulnerable',
        isOptimal: true,
        tactic: 'vulnerability',
        reaction: {
          text: 'They freeze. Wasn\'t expecting honesty. "That\'s... real."',
          emotion: 'sad',
          bodyLanguage: 'You showed genuine vulnerability. It disarms them.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'ghost-casey-dismissed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Convenient." Casey finishes their drink.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"I thought about what I\'d say to you. When we met again."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"But you haven\'t changed. Still running from anything real."',
        speakerId: 'casey',
        emotion: 'angry',
      },
      {
        text: '"Good luck with Harrison\'s test tonight. You\'ll need it."',
        speakerId: 'casey',
        emotion: 'smirking',
      },
      {
        text: 'They know about the test. And they\'re not helping.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-apology',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Something." Casey repeats. Not satisfied.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"I\'ve moved on. Obviously. This..." They gesture at the room.',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"...is my world now. I don\'t need apologies. I need to know where we stand."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Ally? Enemy? Stranger?"',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'They want clarity. Fair enough.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-casey-define',
  },
  {
    id: 'ghost-casey-honest',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"An explanation." Casey leans back. Waiting.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'You explain. The fear. The immaturity. The way feelings overwhelmed reason.',
      },
      {
        text: 'Casey listens. Expression unreadable.',
      },
      {
        text: '"That\'s... more honest than I expected."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Doesn\'t undo what happened. But I appreciate the attempt."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'Progress. Not forgiveness, but acknowledgment.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ghost-casey-define',
  },
  {
    id: 'ghost-casey-vulnerable',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Real." Casey\'s voice wavers slightly.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"I spent two years thinking you didn\'t care. That I was... nothing."',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"But you were scared. Of feeling too much."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"That\'s... different. I can work with different."',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: 'Connection. Real and unexpected.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-casey-offer',
  },
  {
    id: 'ghost-casey-define',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Where do we stand?" Casey repeats.',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"I can be useful to you here. I know the players. The games."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"But I won\'t help someone who sees me as... disposable. Again."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'They\'re offering alliance. With conditions.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'define-trap',
        text: '"Let\'s just stay out of each other\'s way."',
        nextSceneId: 'ghost-casey-strangers',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: '"Strangers then." They nod. Cold. "Fine."',
          emotion: 'cold',
          bodyLanguage: 'You chose distance. They\'ll respect it—coldly.',
          scoreImpact: -5,
        },
      },
      {
        id: 'define-subtle',
        text: '"I don\'t want to be your enemy. But I can\'t promise more than that."',
        nextSceneId: 'ghost-casey-neutral',
        isOptimal: false,
        tactic: 'careful',
        reaction: {
          text: '"Not enemies. It\'s a start."',
          emotion: 'neutral',
          bodyLanguage: 'Cautious peace. No alliance but no hostility.',
          scoreImpact: 10,
        },
      },
      {
        id: 'define-optimal',
        text: '"You were never disposable. I was just too broken to show it. Let me prove I\'ve changed."',
        nextSceneId: 'ghost-casey-allies',
        isOptimal: true,
        tactic: 'redemption',
        reaction: {
          text: 'Their expression softens. "Prove it then. Tonight. I\'ll be watching."',
          emotion: 'hopeful',
          bodyLanguage: 'You offered growth. They want to believe.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'ghost-casey-offer',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"I have information." Casey moves closer. Quieter.',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"About tonight\'s test. What Harrison is planning."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"I\'ll share it. But I need something in return."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"What?"',
      },
      {
        text: '"A real answer. Do you still feel anything? Or was it all performance?"',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: 'They want truth. The one currency that matters.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'offer-trap',
        text: '"That was years ago. I don\'t know what I feel now."',
        nextSceneId: 'ghost-casey-uncertain',
        isOptimal: false,
        tactic: 'evasion',
        reaction: {
          text: '"Still running." They stand. "Some things don\'t change."',
          emotion: 'cold',
          bodyLanguage: 'You evaded again. They\'re disappointed.',
          scoreImpact: -5,
        },
      },
      {
        id: 'offer-subtle',
        text: '"Seeing you again... brought it all back. That\'s real."',
        nextSceneId: 'ghost-casey-acknowledged',
        isOptimal: false,
        tactic: 'partial-truth',
        reaction: {
          text: '"Brought it back." They nod slowly. "That\'s something."',
          emotion: 'neutral',
          bodyLanguage: 'Acknowledgment without commitment. They accept it.',
          scoreImpact: 10,
        },
      },
      {
        id: 'offer-optimal',
        text: '"I never stopped. I just got better at hiding it. From everyone. Including myself."',
        nextSceneId: 'ghost-casey-truth',
        isOptimal: true,
        tactic: 'full-truth',
        reaction: {
          text: 'Silence. Then Casey takes your hand. Brief. "Okay. I believe you."',
          emotion: 'hopeful',
          bodyLanguage: 'Full vulnerability. They\'re moved.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'ghost-casey-strangers',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: 'Casey stands. All warmth gone.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"Strangers it is. Good luck tonight."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'They walk away. No help coming from that direction.',
      },
      {
        text: 'Another bridge burned. We\'re collecting those.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-neutral',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Not enemies." Casey considers.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"I\'ll give you one piece of advice then. Free."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"Tonight\'s test is about choices. Not right answers."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Harrison wants to see what you\'ll sacrifice. Be careful what you offer."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'Cryptic but useful. Sacrifice is the key.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-allies',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Prove it." Casey\'s walls are down. Slightly.',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: '"Tonight\'s test—Harrison will ask you to choose between people."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"Someone you trust, someone you met here, someone from your past."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"The answer isn\'t about picking the right one. It\'s about how you justify your choice."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: 'Justification matters more than the choice itself. Harrison wants our reasoning.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-uncertain',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: 'Casey stands. Resigned.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: '"Some things don\'t change."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: '"Good luck tonight. You\'ll need it without information."',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: 'They walk away. Opportunity missed.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-acknowledged',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: '"Something." Casey nods.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Okay. Here\'s what I know."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"The test tonight involves all three new people. You, Blake, Tyler."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: '"Harrison will make one of you betray the others. Watch your back."',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'Betrayal. Built into the test. One of us will turn.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-casey-truth',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    dialog: [
      {
        text: 'Casey holds your hand. Just for a moment.',
        speakerId: 'casey',
        emotion: 'hopeful',
      },
      {
        text: '"I believe you." Their voice is soft.',
        speakerId: 'casey',
        emotion: 'neutral',
      },
      {
        text: '"Tonight—Harrison will test your loyalty. He\'ll offer you something you want badly."',
        speakerId: 'casey',
        emotion: 'serious',
      },
      {
        text: '"But the price is someone else. Someone you care about."',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: '"Don\'t take the deal. The real test is whether you can find a third option."',
        speakerId: 'casey',
        emotion: 'knowing',
      },
      {
        text: 'Third option. Create new choices. That\'s how to pass.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ghost-path-end',
  },
  {
    id: 'ghost-path-end',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'ghost',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake approaches as Casey leaves.',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Who was that? You looked... intense."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Old history. It\'s complicated."',
      },
      {
        text: '"This whole place is complicated."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'He\'s right. And tonight, it gets worse.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'crisis-summons',
  },
];
