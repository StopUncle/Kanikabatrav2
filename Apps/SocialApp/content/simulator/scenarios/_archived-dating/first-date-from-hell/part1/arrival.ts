// Part 1: The Arrival
// Scenes 1-3: First impression and early red flags

import type { Scene } from '../../../types';

export const arrivalScenes: Scene[] = [
  // SCENE 1: ARRIVING
  {
    id: 'scene-1-arriving',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The restaurant is nice. Your choice - they insisted on 'somewhere you'd be comfortable.' You spot them at a table in the corner. They're watching the door. They were watching you walk in.",
      },
      {
        text: '{date} stands. "There you are. Wow." Their eyes travel down, then up. Slowly. "You\'re even better in person."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "They looked you up and down. Like appraising something they already own.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-1a',
        text: '"Thanks! Good to finally meet you."',
        nextSceneId: 'scene-2-conversation',
        xpBonus: 5,
        feedback: "You're being polite. But file that look away.",
        tactic: 'polite_accept',
      },
      {
        id: 'choice-1b',
        text: 'Sit down. "Hey, nice to meet you."',
        nextSceneId: 'scene-2-conversation',
        xpBonus: 8,
        feedback: "You saw it. You didn't like it. You're already tracking.",
        tactic: 'notice_but_continue',
      },
      {
        id: 'choice-1c',
        text: '"Ha, yeah. Have you been here before? How\'s the food?"',
        nextSceneId: 'scene-2-conversation',
        xpBonus: 5,
        feedback: "You redirected. They'll try again.",
        tactic: 'deflect',
      },
      {
        id: 'choice-1d',
        text: '"That\'s... kind of a lot. Can we start with hello?"',
        nextSceneId: 'scene-1-reaction',
        xpBonus: 10,
        isOptimal: true,
        feedback: "You set a boundary immediately. Now watch their reaction.",
        tactic: 'early_boundary',
      },
    ],
  },

  // SCENE 1B: BLAKE'S FIRST REACTION
  {
    id: 'scene-1-reaction',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You set a small boundary. {date}'s face flickers - something underneath the smile.",
        speakerId: 'blake',
        emotion: 'confused',
      },
      {
        text: '"Whoa, okay. Didn\'t mean to offend." They recover quickly. "I was just complimenting you. It\'s a good thing."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: '"Anyway. Sit, sit. Let\'s order some drinks."',
        speakerId: 'blake',
        emotion: 'seductive',
      },
    ],
    nextSceneId: 'scene-2-conversation',
  },

  // SCENE 2: THE CONVERSATION PATTERN
  {
    id: 'scene-2-conversation',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Ten minutes in. You've noticed a pattern. Every time you start a story, they interrupt. Every opinion you mention, they correct or pivot to themselves.",
      },
      {
        text: 'You: "So at my job, we\'ve been working on—" {date}: "Oh yeah, that reminds me of MY job. So basically what happened was—"',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: "They've been talking for five minutes straight. You haven't finished a single thought.",
      },
      {
        
        text: "They haven't let you complete a sentence.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-2a',
        text: 'Nod. Smile. Wait for it to end.',
        nextSceneId: 'scene-3-touch',
        xpBonus: 0,
        feedback: "You're being polite. They're monopolizing the conversation.",
        tactic: 'passive',
      },
      {
        id: 'choice-2b',
        text: '"That\'s interesting. So anyway, what I was saying—"',
        nextSceneId: 'scene-2-interrupt-again',
        xpBonus: 8,
        feedback: "You tried to reclaim space. Let's see if they let you.",
        tactic: 'reclaim_space',
      },
      {
        id: 'choice-2c',
        text: '"How long have you been doing that?"',
        nextSceneId: 'scene-3-touch',
        xpBonus: 5,
        feedback: "You're keeping them talking while you assess.",
        tactic: 'strategic_question',
      },
      {
        id: 'choice-2d',
        text: '"I\'ve noticed you interrupt a lot. Can I finish my thought?"',
        nextSceneId: 'scene-2-defensive',
        xpBonus: 12,
        isOptimal: true,
        feedback: "Direct. They won't like it.",
        tactic: 'call_out_pattern',
      },
    ],
  },

  // SCENE 2B: BLAKE INTERRUPTS AGAIN
  {
    id: 'scene-2-interrupt-again',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You tried to continue your thought. {date} doesn\'t even register it.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Oh totally, but the thing is—" And they\'re off again. Another five minutes. Your story, abandoned.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        
        text: "They didn't even notice you tried to speak.",
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-3-touch',
  },

  // SCENE 2C: BLAKE GETS DEFENSIVE
  {
    id: 'scene-2-defensive',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You called out the interrupting. {date}'s smile tightens. Something shifts.",
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"I\'m just excited to talk to you. Is that a crime?" Their tone has shifted. Sarcasm. Maybe irritation.',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Some people would appreciate someone who\'s actually interested."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        
        text: "Red flag. They're defensive about basic manners.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-2c-a',
        text: '"No, I didn\'t mean— never mind."',
        nextSceneId: 'scene-3-touch',
        xpBonus: 0,
        feedback: "You retreated. They learned your boundary is negotiable.",
        tactic: 'backpedal',
      },
      {
        id: 'choice-2c-b',
        text: '"I appreciate the energy. Just want to make sure we\'re both getting to talk."',
        nextSceneId: 'scene-3-touch',
        xpBonus: 10,
        isOptimal: true,
        feedback: "You held without escalating.",
        tactic: 'hold_firm',
      },
      {
        id: 'choice-2c-c',
        text: 'Stay neutral. File it away. Keep watching.',
        nextSceneId: 'scene-3-touch',
        xpBonus: 8,
        feedback: "You're building a picture.",
        tactic: 'observe',
      },
    ],
  },

  // SCENE 3: THE FIRST TOUCH
  {
    id: 'scene-3-touch',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: '{date} is mid-story when it happens. They reach across the table and put their hand on yours. Warm. Firm. Uninvited.',
        speakerId: 'blake',
        emotion: 'seductive',
      },
      {
        text: '"Sorry, I\'m a physical person. I can\'t help it."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        
        text: "You didn't reach for them. They just took.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3a',
        text: 'Leave your hand there. Keep listening.',
        nextSceneId: 'scene-4-comment',
        xpBonus: 0,
        feedback: "You're overriding your discomfort to be polite.",
        tactic: 'allow_touch',
      },
      {
        id: 'choice-3b',
        text: 'Reach for your water. Natural movement. Hand removed.',
        nextSceneId: 'scene-4-comment',
        xpBonus: 8,
        feedback: "Subtle reclaiming of your space.",
        tactic: 'subtle_remove',
      },
      {
        id: 'choice-3c',
        text: '"I\'d prefer if we didn\'t do the touching thing yet."',
        nextSceneId: 'scene-3-touch-reaction',
        xpBonus: 12,
        isOptimal: true,
        feedback: "You named it. Directly.",
        tactic: 'verbal_boundary',
      },
      {
        id: 'choice-3d',
        text: 'Pull hand back. "So what do you do for fun outside of work?"',
        nextSceneId: 'scene-4-comment',
        xpBonus: 10,
        feedback: "You removed the touch and redirected.",
        tactic: 'remove_and_redirect',
      },
    ],
  },

  // SCENE 3B: BLAKE'S REACTION TO TOUCH BOUNDARY
  {
    id: 'scene-3-touch-reaction',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: 'You asked them not to touch you. {date}\'s face changes. Arms cross. Something cold in their eyes.',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        text: '"Wow. Okay. I was just being friendly. It\'s not like I grabbed you."',
        speakerId: 'blake',
        emotion: 'angry',
      },
      {
        text: '"Sorry for being attracted to you, I guess."',
        speakerId: 'blake',
        emotion: 'cold',
      },
      {
        
        text: "They made your boundary about THEIR feelings.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3b-a',
        text: '"No, it\'s fine, I just— I didn\'t mean to make it weird."',
        nextSceneId: 'scene-4-comment',
        xpBonus: 0,
        feedback: "TRAP: You're apologizing for having a boundary.",
        tactic: 'apologize_for_boundary',
      },
      {
        id: 'choice-3b-b',
        text: 'Just look at them. Don\'t fill the awkward pause.',
        nextSceneId: 'scene-4-comment',
        xpBonus: 10,
        isOptimal: true,
        feedback: "You're not responsible for their reaction to your boundary.",
        tactic: 'silence',
      },
      {
        id: 'choice-3b-c',
        text: '"I just like to take things slow. It\'s not personal."',
        nextSceneId: 'scene-4-comment',
        xpBonus: 8,
        feedback: "You softened without abandoning the boundary.",
        tactic: 'soft_hold',
      },
      {
        id: 'choice-3b-d',
        text: 'Note this reaction. Someone respectful would just say "no problem."',
        nextSceneId: 'scene-4-comment',
        xpBonus: 10,
        feedback: "File it. This isn't normal.",
        tactic: 'mental_note',
      },
    ],
  },
];
