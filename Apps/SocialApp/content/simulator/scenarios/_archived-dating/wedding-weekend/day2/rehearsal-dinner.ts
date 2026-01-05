// Day 2: Rehearsal Dinner
// Scenes 18-22 - Slideshow incident and Marcus's speech

import type { Scene } from '../../../types';

export const rehearsalDinnerScenes: Scene[] = [
  {
    id: 'scene-18-rehearsal-dinner',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Private room. Flowers. Candles. The weight of expectation in every corner. You're seated better tonight - next to {boyfriend}, at least. Small mercies.",
      },
      {
        text: "{groom} stands. \"Before we eat, we put together a little something. A walk down memory lane.\" He dims the lights. A projector flickers to life. \"To the friends who made us who we are.\"",
        speakerId: 'marcus',
        emotion: 'happy',
      },
    ],
    nextSceneId: 'scene-19-slideshow',
  },
  {
    id: 'scene-19-slideshow',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Photos flash by. College years. Vacations. Birthdays. Then: {boyfriend} and {ex}. A lot of {boyfriend} and {ex}. Beach trip. New Year's Eve. Her head on his shoulder. His arm around her waist.",
      },
      {
        text: "The room is laughing, reminiscing. You're invisible. Then - a photo that makes your stomach drop. Midnight. New Year's. {boyfriend} and {ex}, lips locked.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        
        text: "Breathe.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-19-1',
        text: 'Squeeze {boyfriend}\'s hand. Stay composed. This is his moment to step up.',
        nextSceneId: 'scene-19-ignore',
        feedback: 'You waited for rescue. He didn\'t come. Now they know you\'ll take it.',
        tactic: 'passive_hope',
      },
      {
        id: 'choice-19-2',
        text: 'Stand. Walk out. Don\'t look back.',
        nextSceneId: 'scene-19-exit',
        xpBonus: 10,
        feedback: 'Dignified exit. But now you\'re alone in the hallway.',
        tactic: 'dignified_exit',
      },
      {
        id: 'choice-19-3',
        text: '"God, {ex}, you look so young there! Was that before you discovered sunscreen?"',
        nextSceneId: 'scene-19-roast',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'The room pivots. They\'re laughing WITH you now. You own this moment.',
        tactic: 'humor_dominance',
      },
      {
        id: 'choice-19-4',
        text: 'Lock eyes with {groom}. Raise your glass slowly. Don\'t blink.',
        nextSceneId: 'scene-19-stare',
        xpBonus: 10,
        feedback: 'He got the message. Whether he respects or resents it - you\'ll find out.',
        tactic: 'silent_challenge',
      },
    ],
  },
  {
    id: 'scene-19-ignore',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You stare at your phone. The slideshow continues. More photos. More memories you're not part of. Your phone buzzes - {sister}: \"That was fucked up. You okay?\"",
      },
      {
        text: "You type back: \"Fine.\" {boyfriend} squeezes your hand under the table. Everyone saw.",
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  {
    id: 'scene-19-exit',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You stand. Chair scraping. Heads turning. You walk out without looking back. The hallway is cool and quiet. You can hear the slideshow continuing behind you.",
      },
      {
        text: "Footsteps. You turn. It's {boyfriend}. \"Babe, wait.\" His voice is strained. \"I didn't know he was going to show those.\"",
        speakerId: 'ethan',
        emotion: 'concerned',
      },
      {
        
        text: "Didn't know or didn't stop him?",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-19-exit-1',
        text: '"Did you ask him not to?"',
        nextSceneId: 'scene-19-exit-confront',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'The real question.',
        tactic: 'direct_challenge',
      },
      {
        id: 'choice-19-exit-2',
        text: '"Excuse me."',
        nextSceneId: 'scene-19-exit-space',
        xpBonus: 5,
        feedback: 'Space. Sometimes that\'s what you need.',
        tactic: 'space_request',
      },
      {
        id: 'choice-19-exit-3',
        text: 'Keep walking. Don\'t respond.',
        nextSceneId: 'scene-19-exit-cold',
        feedback: 'Ice. He deserves it.',
        tactic: 'cold_shoulder',
      },
    ],
  },
  {
    id: 'scene-19-exit-confront',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{boyfriend} stops. His mouth opens. Closes. \"I... no. I didn't think...\" He trails off. The silence is answer enough.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "\"I should have.\" He finally says it. \"I should have asked him. I should have... I'm sorry.\" It's the first real apology of the weekend.",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  {
    id: 'scene-19-exit-space',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "\"Okay.\" {boyfriend} stays by the door. \"I'll wait.\" He doesn't push. That's something.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "You take a few breaths. Compose yourself. When you walk back in, heads turn. But you're standing. That's what they'll remember.",
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  {
    id: 'scene-19-exit-cold',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You keep walking. You hear him call your name once.",
      },
      {
        text: "The bathroom mirror shows you looking rattled. You fix your makeup. When you return to the table, the slideshow is over. {boyfriend} is in his seat, staring at his plate. Good.",
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  {
    id: 'scene-19-roast',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The room goes silent. Then - {ex} laughs. Genuine, surprised. \"Okay, fair. That haircut was a choice.\"",
        speakerId: 'danielle',
        emotion: 'happy',
      },
      {
        text: "The table laughs WITH you now. {groom} is grinning. {bride} is not. But you flipped the script. You're not the victim. You're the one with jokes.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  {
    id: 'scene-19-stare',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You lock eyes with {groom}. He meets your gaze, curious. You don't blink. You raise your glass, slow and deliberate, and take a sip.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "He gets the message. You saw what he did. And you're not breaking. Something shifts in his expression. Respect, maybe. Or the recognition of a worthy opponent.",
      },
    ],
    nextSceneId: 'scene-20-marcus-speech',
  },
  // Marcus's speech
  {
    id: 'scene-20-marcus-speech',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Dinner winds down. {groom} stands again. Best man speech. \"To {boyfriend},\" he begins. \"My brother from another mother. Twelve years of friendship. Some great women along the way.\"",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "He looks at {ex}. Then at you. \"And hopefully this one sticks.\" The room is silent. The words land like stones.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        
        text: "Did he really just... in front of everyone.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-20-1',
        text: 'Smile graciously. This isn\'t the time to make a scene.',
        nextSceneId: 'scene-20-absorb',
        feedback: 'You\'ve earned the right to respond by now. Taking it just invites more.',
        tactic: 'passive_absorb',
      },
      {
        id: 'choice-20-2',
        text: 'Look at {boyfriend}. This is his moment to step up.',
        nextSceneId: 'scene-20-walkout',
        xpBonus: 5,
        feedback: 'He doesn\'t move. You waited for him. He failed.',
        tactic: 'passive_hope',
      },
      {
        id: 'choice-20-3',
        text: 'Raise your glass. "I intend to."',
        nextSceneId: 'scene-20-respond',
        xpBonus: 20,
        isOptimal: true,
        feedback: 'Three words. That\'s all it took. {groom} grins. You won.',
        tactic: 'frame_claim',
      },
      {
        id: 'choice-20-4',
        text: '"That\'s a bold toast. Almost as bold as proposing three times."',
        nextSceneId: 'scene-20-veiled',
        xpBonus: 10,
        feedback: 'Risky. {bride}\'s face hardens. You made an enemy. But {groom} laughs.',
        tactic: 'counter_attack',
      },
    ],
  },
  {
    id: 'scene-20-absorb',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You say nothing. Do nothing. The toast continues. The room moves on. {sister} catches your eye. Disappointment.",
      },
      {
        text: "{boyfriend}'s hand finds yours under the table. His eyes are somewhere else.",
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-20-respond',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You raise your glass. \"I intend to.\" Your voice is clear, steady. Direct eye contact with {groom}. The table holds its breath.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "{groom} pauses. Then he grins, raises his glass to you. \"I like her, {boyfriend}. She's got fire.\" {bride} looks like she swallowed a lemon. You just won something.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-20-veiled',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{groom}'s smile falters. Just for a second. \"What's that supposed to mean?\" You shrug. \"Nothing. Just wedding jitters are contagious.\"",
        speakerId: 'marcus',
        emotion: 'confused',
      },
      {
        text: "He doesn't push it. But he's looking at you differently now. Uncertainty where there was confidence. Good.",
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-20-walkout',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You stand. The chair scrapes. Every head turns. You don't say anything. You don't need to. You walk out.",
      },
      {
        text: "Behind you, you hear {boyfriend}: \"I'm sorry, I'll...\" His chair. Footsteps. He follows you into the night.",
        speakerId: 'ethan',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'scene-21-private-confrontation',
  },
  // Private confrontation
  {
    id: 'scene-21-private-confrontation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Outside. Night air. Just the two of you. {boyfriend}'s face is a mix of frustration and desperation. \"What do you want me to do? He's my best friend. It's his wedding weekend.\"",
        speakerId: 'ethan',
        emotion: 'angry',
      },
      {
        
        text: "Watch what he chooses.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-21-1',
        text: '"This isn\'t about {groom}. Tell me the truth about {ex}."',
        nextSceneId: 'scene-21-truth',
        xpBonus: 10,
        feedback: 'You redirected. Now you have information instead of apologies.',
        tactic: 'intel_gather',
      },
      {
        id: 'choice-21-2',
        text: '"It\'s not about fighting. It\'s about whether you see what they\'re doing."',
        nextSceneId: 'scene-21-acknowledgment',
        xpBonus: 10,
        feedback: 'Harder for him to deflect. He has to admit he sees it.',
        tactic: 'force_acknowledgment',
      },
      {
        id: 'choice-21-3',
        text: '"Tomorrow, in front of everyone, you choose. Them or me."',
        nextSceneId: 'scene-21-defend-request',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Clear. Specific. He can\'t hide behind "I\'ll try."',
        tactic: 'specific_demand',
      },
      {
        id: 'choice-21-4',
        text: '"I\'m getting a car to the airport first thing."',
        nextSceneId: 'scene-21-ultimatum',
        xpBonus: 5,
        feedback: 'Maximum leverage. But you better mean it.',
        tactic: 'ultimatum',
      },
    ],
  },
  {
    id: 'scene-21-defend-request',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} looks at you. Really looks. \"Defend you? Against {groom}?\" He runs a hand through his hair. \"I... I don't know how. He's... he's {groom}.\"",
        speakerId: 'ethan',
        emotion: 'confused',
      },
      {
        text: "\"That's not good enough, is it?\" He already knows the answer. \"I'll try. Tomorrow. I promise I'll try.\" It's not a yes. But it's not a no.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-21-acknowledgment',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} stops. This he can't deflect. \"I see it.\" His voice is quiet. \"I see what they're doing. I just... I don't know how to stop it without blowing everything up.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "\"Maybe some things need to blow up.\" You say it gently. He doesn't answer. But he holds you. That's something.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-21-ultimatum',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend}'s face crumbles. \"Don't. Please.\" He reaches for you. \"I need you here. I need you to see that this is my life. These people matter to me.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "\"But you matter more.\" He says it like he's surprised by his own words. \"Stay. Please. I'll do better. I swear.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  {
    id: 'scene-21-truth',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} is caught off guard. \"Everything?\" He sighs. \"Fine. Three years. We talked about getting married. She wanted it. I wasn't ready. She ended it.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
      {
        text: "\"She still texts me. Birthdays. Holidays. I respond because... because I don't know how not to.\" He meets your eyes. \"I don't love her anymore. But I don't know how to not have her in my life.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day2-end',
  },
  // Day 2 End (Checkpoint)
  {
    id: 'scene-day2-end',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Back at the hotel. Tomorrow is the wedding. The ceremony. The reception. The final tests. {boyfriend} is asleep beside you, his hand on your hip like an anchor.",
      },
      {
        text: "Your phone glows. {sister}: \"You survived day 2. One more to go. Sleep. You'll need it.\" She's right. Tomorrow, everything ends. One way or another.",
      },
    ],
    nextSceneId: 'scene-26-wedding-morning',
  },
];
