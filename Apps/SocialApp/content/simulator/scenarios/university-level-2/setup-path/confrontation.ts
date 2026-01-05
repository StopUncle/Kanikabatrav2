import type { ForkScene } from '../../../types';

/**
 * Setup Path - Confrontation & Resolution
 * Calling out the covert or letting it slide
 */
export const confrontationScenes: ForkScene[] = [
  {
    id: 'setup-dana-emergency',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'You step outside. Call Dana.',
      },
      {
        text: '"Oh thank god. Okay so I know this is bad timing but I REALLY need to talk about something."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: '"How\'s it going with Derek?"',
        speakerId: 'dana',
        emotion: 'curious',
      },
      {
        text: 'That\'s the emergency? Checking in?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'emergency-trap',
        text: '"It\'s going well! He\'s really nice. What did you need?"',
        nextSceneId: 'setup-dana-plants',
        isOptimal: false,
        tactic: 'report',
        reaction: {
          text: '"Oh good! Hey, did he mention anything about... like, wanting to get back together with anyone?"',
          emotion: 'neutral',
          bodyLanguage: 'There it is. The real question.',
          scoreImpact: -10,
        },
      },
      {
        id: 'emergency-subtle',
        text: '"You called me out of my date for this?"',
        nextSceneId: 'setup-dana-defensive',
        isOptimal: false,
        tactic: 'call-out-light',
        reaction: {
          text: '"Wow, okay. Sorry for caring. Guess I\'ll just... deal with my stuff alone."',
          emotion: 'sad',
          bodyLanguage: 'Victim pivot. You\'re the bad guy now.',
          scoreImpact: 5,
        },
      },
      {
        id: 'emergency-close',
        text: '"Dana. What are you really doing?"',
        nextSceneId: 'setup-dana-crumbles',
        isOptimal: false,
        tactic: 'direct-confrontation',
        reaction: {
          text: 'Long silence. "...I don\'t know what you mean."',
          emotion: 'neutral',
          bodyLanguage: 'She knows exactly what you mean.',
          scoreImpact: 10,
        },
      },
      {
        id: 'emergency-optimal',
        text: '"This isn\'t an emergency, is it? You wanted to check on your investment."',
        nextSceneId: 'setup-dana-exposed-final',
        isOptimal: true,
        tactic: 'expose',
        reaction: {
          text: 'Silence. Then: "You think you\'re so smart."',
          emotion: 'cold',
          bodyLanguage: 'The mask falls. Real personality emerges.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'setup-dana-escalates',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Phone keeps buzzing. "Please I\'m really upset" "It\'s about Derek" "Actually never mind I don\'t want to ruin your night"',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'Guilt trip. Information bait. Then the noble withdrawal.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'escalates-trap',
        text: 'Call her immediately.',
        nextSceneId: 'setup-dana-emergency',
        isOptimal: false,
        tactic: 'comply',
        reaction: {
          text: 'She answers on the first ring. Not crying.',
          emotion: 'neutral',
          bodyLanguage: 'She was waiting. This was planned.',
          scoreImpact: -10,
        },
      },
      {
        id: 'escalates-subtle',
        text: '"I\'ll call you after. Promise."',
        nextSceneId: 'setup-dana-wait',
        isOptimal: false,
        tactic: 'defer',
        reaction: {
          text: '"Fine." One word. Cold.',
          emotion: 'cold',
          bodyLanguage: 'You\'ll pay for that later.',
          scoreImpact: 5,
        },
      },
      {
        id: 'escalates-close',
        text: '"If it\'s about Derek, tell me now."',
        nextSceneId: 'setup-dana-reveals',
        isOptimal: false,
        tactic: 'force',
        reaction: {
          text: '"He\'s still in love with me. Just so you know."',
          emotion: 'smirking',
          bodyLanguage: 'There it is. The sabotage bomb.',
          scoreImpact: 5,
        },
      },
      {
        id: 'escalates-optimal',
        text: 'Show the texts to Derek. "Thoughts?"',
        nextSceneId: 'setup-derek-sees',
        isOptimal: true,
        tactic: 'transparency',
        reaction: {
          text: 'He reads. Shakes his head. "She hasn\'t changed at all."',
          emotion: 'knowing',
          bodyLanguage: 'Now you\'re allies against the manipulator.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'setup-dana-ignored',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'romantic',
    dialog: [
      {
        text: 'The phone stays silent. The date continues.',
      },
      {
        text: '"You know she\'s going to make you pay for that."',
      },
      {
        text: '"Let her try."',
        speakerId: 'inner-voice',
        emotion: 'smirking',
      },
      {
        text: 'Derek grins. "I really like you."',
      },
    ],
    nextSceneId: 'setup-aftermath-good',
  },
  // Dana confrontation branches
  {
    id: 'setup-dana-plants',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Just be careful with him. He has a tendency to... lead people on."',
        speakerId: 'dana',
        emotion: 'concerned',
      },
      {
        text: '"I just don\'t want you to get hurt like I did."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'She\'s planting doubt. Poisoning the well.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-dana-defensive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"You know what? Forget it. Enjoy your date."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'She hangs up. Three passive aggressive texts follow.',
      },
      {
        text: '"No it\'s fine" "I\'m fine" "Have fun with MY ex"',
        speakerId: 'dana',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-dana-crumbles',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"I just... I thought if he saw me being a good person, setting up someone great..."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: '"Maybe he\'d realize what he lost."',
        speakerId: 'dana',
        emotion: 'sad',
      },
      {
        text: 'The truth. Finally. You were a pawn.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-dana-exposed-final',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'danger',
    dialog: [
      {
        text: '"You don\'t know ANYTHING about me."',
        speakerId: 'dana',
        emotion: 'angry',
      },
      {
        text: '"Derek and I had something real. YOU\'RE the interloper."',
        speakerId: 'dana',
        emotion: 'angry',
      },
      {
        text: 'The covert mask is off. Narcissistic rage exposed.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
      {
        text: '"Good luck with your date. You\'ll need it."',
        speakerId: 'dana',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'setup-aftermath-confronted',
  },
  {
    id: 'setup-dana-wait',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'The date continues. But you\'re distracted now.',
      },
      {
        text: '"Everything okay?"',
      },
      {
        text: '"Dana stuff. I\'ll handle it later."',
      },
      {
        text: 'His expression flickers. Recognition.',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-dana-reveals',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'You return to the table. Different energy now.',
      },
      {
        text: '"Dana just told me you\'re still in love with her."',
      },
      {
        text: 'His face cycles through confusion, recognition, exhaustion.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
      {
        text: '"...I\'m not. But she needs to believe I am."',
      },
    ],
    nextSceneId: 'setup-aftermath',
  },
  {
    id: 'setup-derek-sees',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: 'Derek reads the texts. Sighs.',
      },
      {
        text: '"This is exactly why we broke up. She creates chaos, then acts hurt when you call it out."',
      },
      {
        text: '"Thanks for showing me. Most people wouldn\'t."',
      },
      {
        text: 'Transparency builds trust. Always.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'setup-aftermath-good',
  },
  // Aftermath scenes
  {
    id: 'setup-aftermath',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'Mission Complete: The Setup', index: 3, total: 5 },
    dialog: [
      {
        text: 'The date ends. Not terrible, not great. Dana\'s fingerprints are everywhere.',
      },
      {
        text: 'Derek: "This was nice. But complicated. Can I think about things?"',
      },
      {
        text: 'You nod. He leaves.',
      },
      {
        text: 'Covert narcissist lesson: the sabotage is invisible until it\'s too late.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ex-appearance-intro',
  },
  {
    id: 'setup-aftermath-confronted',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'Mission Complete: The Setup', index: 3, total: 5 },
    dialog: [
      {
        text: 'You return to the table. Derek can tell something happened.',
      },
      {
        text: '"Dana?"',
      },
      {
        text: '"She showed her hand."',
      },
      {
        text: 'He nods slowly. "Welcome to my last two years."',
      },
      {
        text: 'Covert exposed. The spell is broken.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'ex-appearance-intro',
  },
  {
    id: 'setup-aftermath-good',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'setup',
    chapter: { name: 'Mission Complete: The Setup', index: 3, total: 5 },
    mood: 'romantic',
    dialog: [
      {
        text: 'The date ends well. Despite Dana\'s efforts.',
      },
      {
        text: '"Can I see you again? Without the... situation?"',
      },
      {
        text: 'You smile. "I\'d like that."',
      },
      {
        text: 'Covert narcissist defeated. Connection preserved.',
        speakerId: 'inner-voice',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'ex-appearance-intro',
  },
];
