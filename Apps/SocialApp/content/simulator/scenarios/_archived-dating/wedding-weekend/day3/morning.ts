// Day 3: Wedding Morning
// Scenes 26-28 - Final preparations and Sophia confrontation

import type { Scene } from '../../../types';

export const weddingMorningScenes: Scene[] = [
  {
    id: 'scene-26-wedding-morning',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Wedding day. Sunlight through the curtains feels different today. Heavier. {boyfriend} is already up, suit hanging on the door, nervous energy radiating off him.",
      },
      {
        text: "\"Big day.\" He kisses your forehead. \"You ready?\" It's a loaded question and you both know it. Your phone buzzes. Two texts. {sister}: \"Getting ready in the bridal suite. Come join?\" {bride}: \"We should talk. My room. 10 minutes.\"",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        
        text: "{bride} wants to talk. That's either very good or very bad.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-26-1',
        text: 'Join {sister}. Safe harbor.',
        nextSceneId: 'scene-26-lily-morning',
        xpBonus: 10,
        feedback: 'Ally time. Smart.',
        tactic: 'ally_priority',
      },
      {
        id: 'choice-26-2',
        text: 'Meet {bride}. Face it head on.',
        nextSceneId: 'scene-27-sophia-ultimatum',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Brave. Let\'s see what she wants.',
        tactic: 'confrontation_accepted',
      },
      {
        id: 'choice-26-3',
        text: 'Stay with {boyfriend}. Focus on you two.',
        nextSceneId: 'scene-26-ethan-morning',
        xpBonus: 5,
        feedback: 'Connection over conflict.',
        tactic: 'partner_priority',
      },
    ],
  },
  {
    id: 'scene-26-lily-morning',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The bridal suite is chaos. Hair. Makeup. Champagne already flowing. {sister} pulls you aside. \"Smart skipping {bride}'s summons. She was going to try to scare you off.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "\"I overheard her and {groom} this morning. She wanted to ask you to leave. He said no.\" {sister} grins. \"You've got {groom}'s respect. That's the only currency that matters here.\"",
        speakerId: 'lily',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  {
    id: 'scene-26-ethan-morning',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You ignore both texts. \"Hey.\" You take his hand. \"Before all of this. Before them. Just... us.\"",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        text: "He pulls you close. \"I know this weekend has been hard. I know I haven't been...\" He trails off. \"After today. I'll do better. I promise.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  // Sophia's ultimatum
  {
    id: 'scene-27-sophia-ultimatum',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bride}'s suite. Just the two of you. She's in her robe, hair half-done, and she's not smiling. \"Let me be direct. You don't belong here. Not with this group. Not with {boyfriend}.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "\"You're a temporary distraction and everyone knows it. Including him.\" She's not blinking. \"I'm giving you a chance to leave with dignity. Before the ceremony.\"",
        speakerId: 'sophia',
        emotion: 'angry',
      },
      {
        
        text: "She's testing you.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-27-1',
        text: '"You seem really invested in someone temporary."',
        nextSceneId: 'scene-27-counter',
        xpBonus: 20,
        isOptimal: true,
        feedback: 'Check. She has no comeback.',
        tactic: 'power_counter',
      },
      {
        id: 'choice-27-2',
        text: '"What exactly are you asking me to do?"',
        nextSceneId: 'scene-27-clarify',
        xpBonus: 10,
        feedback: 'She has to commit to the attack or back off.',
        tactic: 'clarification',
      },
      {
        id: 'choice-27-3',
        text: '"You were the outsider once. I can tell."',
        nextSceneId: 'scene-27-psychology',
        xpBonus: 15,
        feedback: 'Psychological warfare. Her face changes.',
        tactic: 'psychology_bomb',
      },
      {
        id: 'choice-27-4',
        text: 'Turn. Leave. Don\'t give her a word.',
        nextSceneId: 'scene-27-silent-exit',
        xpBonus: 10,
        feedback: 'Ultimate power move. She called this meeting. You ended it.',
        tactic: 'silent_power',
      },
    ],
  },
  {
    id: 'scene-27-counter',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bride} freezes. Her mouth opens. Closes. \"I'm not...\" But she can't finish. You've named the thing she doesn't want named.",
        speakerId: 'sophia',
        emotion: 'angry',
      },
      {
        text: "\"Enjoy your wedding day, {bride}. I'll see you at the ceremony.\" You leave her standing there. First real victory of the weekend.",
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  {
    id: 'scene-27-clarify',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bride} straightens. \"I'm asking you to leave. Quietly. No scene. Make up an excuse - family emergency, work crisis. And don't come back.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "\"In exchange, I'll make sure your relationship ends cleanly. No drama. No poison.\" She thinks she has leverage. She doesn't know you.",
        speakerId: 'sophia',
        emotion: 'smirking',
      },
      {
        
        text: "She's offering a deal. What do you say?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-27-clarify-1',
        text: '"No."',
        nextSceneId: 'scene-27-refuse',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'One word. Complete.',
        tactic: 'simple_refusal',
      },
      {
        id: 'choice-27-clarify-2',
        text: '"You really think you have that power?"',
        nextSceneId: 'scene-27-challenge',
        xpBonus: 10,
        feedback: 'Questioning her authority.',
        tactic: 'authority_challenge',
      },
      {
        id: 'choice-27-clarify-3',
        text: '"You know what? You\'re right. This isn\'t worth my time."',
        nextSceneId: 'ending-early-exit',
        feedback: 'You gave her exactly what she wanted. But sometimes leaving is the win.',
        tactic: 'strategic_retreat',
      },
    ],
  },
  {
    id: 'scene-27-psychology',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bride}'s face changes. Something cracks behind her eyes. \"You don't know anything about me.\" But her voice wavers.",
        speakerId: 'sophia',
        emotion: 'sad',
      },
      {
        text: "\"You fought for {groom} once. You were the outsider too.\" You say it gently. \"I'm not your enemy, {bride}. I'm just trying to love someone.\"",
      },
    ],
    nextSceneId: 'scene-27-sophia-softens',
  },
  {
    id: 'scene-27-sophia-softens',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{bride} is quiet for a long moment. When she speaks, her voice is different. Smaller. \"His mother hated me. Did you know that? Took two years before she'd call me by my name.\"",
        speakerId: 'sophia',
        emotion: 'sad',
      },
      {
        text: "\"I was... I was hard on you. Maybe too hard.\" She doesn't apologize. But it's close. \"Go. Get ready. I have a wedding to have.\"",
        speakerId: 'sophia',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  {
    id: 'scene-27-silent-exit',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "You turn. You walk out. You don't say a word. Behind you, you hear her sputtering: \"We're not done here...\" But you are.",
      },
      {
        text: "She called this meeting. You ended it. She has nothing. Let her stew in that.",
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  {
    id: 'scene-27-refuse',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "\"{bride}'s face hardens. \"You're making a mistake.\" \"No.\" You say it again. \"I'm making a choice. There's a difference.\"",
      },
      {
        text: "You leave her standing there, powerless. It feels good. It feels earned.",
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
  {
    id: 'scene-27-challenge',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "\"{bride} blinks. \"I have more power in this group than you can imagine.\" \"Maybe. But not over me. Not anymore.\"",
      },
      {
        text: "You leave before she can respond. Let her wonder what you meant.",
      },
    ],
    nextSceneId: 'scene-29-ceremony',
  },
];
