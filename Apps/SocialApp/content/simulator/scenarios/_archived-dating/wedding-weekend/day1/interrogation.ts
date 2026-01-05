// Day 1: Sophia's Interrogation & Danielle's Probe
// Scenes 4-6 - The real tests begin

import type { Scene } from '../../../types';

export const interrogationScenes: Scene[] = [
  // Sophia alone with you
  {
    id: 'scene-4-sophia-interrogation',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{boyfriend} is gone. It's just you and {bride} now. She's not smiling anymore. \"So. How long have you two been together?\" The question is casual. The energy is not.",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "\"Six months,\" you say. \"Interesting. His last relationship was three years. Did he tell you about {ex}?\" She knows the answer already.",
        speakerId: 'sophia',
        emotion: 'smirking',
      },
      {
        
        text: "Comparing.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-4-1',
        text: '"What did he tell YOU about her?"',
        nextSceneId: 'scene-4-sophia-pushback',
        xpBonus: 10,
        feedback: 'Deflection. Now she\'s answering questions, not asking them.',
        tactic: 'reverse_probe',
      },
      {
        id: 'choice-4-2',
        text: '"He tells me everything."',
        nextSceneId: 'scene-4-sophia-validation',
        feedback: 'You claimed certainty. She\'ll test that claim.',
        tactic: 'overconfidence',
      },
      {
        id: 'choice-4-3',
        text: '"You seem concerned. Should I be worried about something?"',
        nextSceneId: 'scene-4-sophia-reveal',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'You flipped it. Now she\'s the one who has to explain herself.',
        tactic: 'frame_reversal',
      },
      {
        id: 'choice-4-4',
        text: '"Wrong person to ask."',
        nextSceneId: 'scene-4-sophia-boundary',
        xpBonus: 10,
        feedback: 'Short. Redirects. But she\'ll keep probing.',
        tactic: 'deflection',
      },
    ],
  },
  {
    id: 'scene-4-sophia-pushback',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride}'s not smiling anymore. \"Ancient history. Right.\" She takes a sip of her drink. \"It's just funny. {ex} said the same thing when they broke up. 'We\'ll always be friends.' And here she is. Bridesmaid. Family dinners. Holidays.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "\"I'm just saying. Some histories are harder to bury than others.\" She touches your arm briefly. \"Good luck.\"",
        speakerId: 'sophia',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
  {
    id: 'scene-4-sophia-validation',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride} pauses. She wasn't expecting honesty. \"They were good together.\" \"Everyone thought they'd get married.\" She's watching your face for a crack.",
        speakerId: 'sophia',
        emotion: 'neutral',
      },
      {
        text: "\"He wasn't ready. That's what he said, anyway. I wonder if he's ready now.\" She lets the question hang. Doesn't wait for an answer. \"Dinner's in an hour. Don't be late.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
  {
    id: 'scene-4-sophia-reveal',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride}'s eyes narrow. She didn't expect the deflection. \"Should you know?\" She laughs, but it's hollow. \"Just that she's still... around. Very around. If that matters to you.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "\"But I'm sure {boyfriend} mentioned all that.\" The implication is clear: he didn't. She moves away before you can respond. Point scored. So did she.",
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
  {
    id: 'scene-4-sophia-boundary',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride} blinks. The boundary surprised her. \"Of course. You're right. This weekend is about {groom} and me.\" Her smile returns. Different smile.",
        speakerId: 'sophia',
        emotion: 'neutral',
      },
      {
        text: "\"We should absolutely focus on that. All of us.\" A pause. \"Including {ex}. She's very focused on celebrating with us.\" Point made. She glides away.",
        speakerId: 'sophia',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
  // Danielle's probe
  {
    id: 'scene-5-danielle-probe',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride} has drifted away. Now it's just you and {ex}. She approaches with two glasses of wine. \"Figured you could use this.\" Her smile seems genuine. Or she's very good.",
        speakerId: 'danielle',
        emotion: 'happy',
      },
      {
        text: "\"So how did you and {boyfriend} meet? He's been so secretive about you.\" Her eyes are warm but searching. She wants information. The question is what for.",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
      {
        
        text: "Fishing.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-5-1',
        text: 'Take the wine. "I\'m happy to finally meet his people."',
        nextSceneId: 'scene-5-danielle-vague',
        feedback: 'You called her "his people." She\'s still in the inner circle. Noted.',
        tactic: 'accidental_status',
      },
      {
        id: 'choice-5-2',
        text: '"I\'m sure you two had something special. He doesn\'t talk about the past much."',
        nextSceneId: 'scene-5-danielle-open',
        xpBonus: 5,
        feedback: 'You acknowledged their history and admitted you don\'t know him as well.',
        tactic: 'self_diminish',
      },
      {
        id: 'choice-5-3',
        text: '"Secretive? Interesting. What else has he told you about us?"',
        nextSceneId: 'scene-5-danielle-reverse',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'You flipped it. Now you\'re gathering intel while she thinks she is.',
        tactic: 'information_reversal',
      },
      {
        id: 'choice-5-4',
        text: '"Thanks for the wine. How are you holding up with all this?"',
        nextSceneId: 'scene-5-danielle-territorial',
        xpBonus: 10,
        feedback: 'Kind, but you ceded the frame to her comfort. She\'s the one being tended to.',
        tactic: 'frame_cede',
      },
    ],
  },
  {
    id: 'scene-5-danielle-vague',
    backgroundId: 'bar',
    dialog: [
      {
        text: "\"Mutual friends.\" {ex} nods slowly, wine glass halfway to her lips. \"Interesting. He used to tell me everything about his relationships. I guess things change.\"",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
      {
        text: "\"I'm happy for him. Really.\" The 'really' does too much work. \"He deserves someone... new.\" The 'new' does too much work too.",
        speakerId: 'danielle',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-5-danielle-open',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You tell her about the coffee shop, the bad first date that turned into six hours of talking, how he showed up at your apartment with soup when you were sick. Her smile stays fixed throughout.",
        speakerId: 'danielle',
        emotion: 'happy',
      },
      {
        text: "\"He did the same thing for me once.\" She says it softly, almost to herself. \"The soup thing. Chicken noodle.\" Her eyes are wet. \"Anyway. I'm really happy for you both.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-5-danielle-reverse',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{ex}'s composure flickers. Just for a moment. \"Three years. We were... it was serious.\" She takes a drink. \"I ended it. He wasn't ready for what I needed.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
      {
        text: "\"Is he ready now? With you?\" The question is sharper than she intended. She catches herself. \"Sorry. That was... I shouldn't have asked that.\"",
        speakerId: 'danielle',
        emotion: 'confused',
      },
      {
        
        text: "She still cares. That's not nothing.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-5-reverse-1',
        text: '"I think he is. But I guess we\'ll see."',
        nextSceneId: 'scene-7-welcome-dinner',
        xpBonus: 10,
        feedback: 'Honest without being cruel. She respects it.',
        tactic: 'honest_response',
      },
      {
        id: 'choice-5-reverse-2',
        text: '"That\'s between me and him."',
        nextSceneId: 'scene-7-welcome-dinner',
        xpBonus: 5,
        feedback: 'Cold, but fair. She backed off.',
        tactic: 'boundary_set',
      },
      {
        id: 'choice-5-reverse-3',
        text: '"Are you still in love with him?"',
        nextSceneId: 'scene-5-danielle-confrontation',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Direct hit. She can\'t hide anymore.',
        tactic: 'direct_confrontation',
      },
    ],
  },
  {
    id: 'scene-5-danielle-territorial',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{ex}'s smile freezes. \"To himself. Right.\" She takes a long sip of wine. \"He used to do that with me too. Hide me from his friends for months. Said I was too precious to share.\"",
        speakerId: 'danielle',
        emotion: 'cold',
      },
      {
        text: "\"Turns out he just didn't want people comparing us to his last girlfriend. Sound familiar?\" She walks away before you can respond. That landed.",
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-5-danielle-confrontation',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{ex}'s face crumbles. Just for a second, then she rebuilds. \"I...\" She can't finish. The silence stretches. Then, quietly: \"I think part of me will always love him.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
      {
        text: "\"But I'm not trying to get him back. I promise. I just... I don't know how to let go of someone who's still everywhere.\" She looks at the group, at {boyfriend} laughing with {groom}. \"Maybe you understand that someday.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  // Confrontation path activated
  {
    id: 'scene-6-confrontation-active',
    backgroundId: 'bar',
    dialog: [
      {
        text: "The room goes quiet. {bride}'s face is frozen. From across the bar, {groom} lets out a bark of laughter. \"Holy shit.\" He's grinning.",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "{bride} recovers first. \"Cute. I see why he likes you. Scrappy.\" She turns away, dismissing you completely. But {groom} is looking at you differently now. Interested.",
        speakerId: 'sophia',
        emotion: 'angry',
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
];
