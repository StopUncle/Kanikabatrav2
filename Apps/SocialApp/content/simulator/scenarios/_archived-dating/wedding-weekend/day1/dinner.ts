// Day 1: Welcome Dinner
// Scenes 7-10 - The seating trap and toast incident

import type { Scene } from '../../../types';

export const dinnerScenes: Scene[] = [
  // Transition to dinner
  {
    id: 'scene-7-welcome-dinner',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Private room at an upscale restaurant. Name cards on a long table. You find yours between a groomsman you don't know and... {ex}. {bride} arranged this. {boyfriend} is across the table - close enough to watch, too far to touch.",
      },
      {
        text: "{ex} slides into the chair beside you. \"Looks like we're neighbors.\" Her smile is careful. \"Small table.\"",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-8-seating-trap',
  },
  {
    id: 'scene-8-seating-trap',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Wine is poured, stories are shared, and you're on the outside of all of it. {ex} is charming - asking questions, laughing at your jokes, being almost aggressively pleasant.",
        speakerId: 'danielle',
        emotion: 'happy',
      },
      {
        text: "Then she drops it, casual as anything: \"{boyfriend} and I used to come to places like this all the time.\" She says it like it means nothing. It means everything.",
        speakerId: 'danielle',
        emotion: 'neutral',
      },
      {
        speakerId: 'inner-voice',
        text: "'Used to.' Interesting.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-8-1',
        text: '"He has good taste."',
        nextSceneId: 'scene-9-toast-setup',
        xpBonus: 10,
        feedback: 'Unbothered. She can\'t get a read on you.',
        tactic: 'unaffected_response',
      },
      {
        id: 'choice-8-2',
        text: '"\'Used to.\'"',
        nextSceneId: 'scene-9-toast-setup',
        xpBonus: 5,
        feedback: 'Pointed. She got the message.',
        tactic: 'subtle_mark',
      },
      {
        id: 'choice-8-3',
        text: '"What do you do? {boyfriend} mentioned design?"',
        nextSceneId: 'scene-9-toast-setup',
        xpBonus: 10,
        feedback: 'You\'re not playing her game. Subject changed.',
        tactic: 'redirect',
      },
      {
        id: 'choice-8-4',
        text: '"I\'m curious what you\'ll tell me."',
        nextSceneId: 'scene-8-intel-gain',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'You know she\'s performing. She knows you know. But she talks anyway. Intel.',
        tactic: 'intel_extraction',
      },
    ],
  },
  {
    id: 'scene-8-intel-gain',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{ex} blinks. She wasn't expecting curiosity. \"Really?\" You nod. And she talks. Their first date. The vacation in Portugal. The fight that ended everything. \"He was scared,\" she says finally. \"Of commitment. Of being vulnerable.\"",
        speakerId: 'danielle',
        emotion: 'sad',
      },
      {
        text: "\"I hope he's not scared with you.\" She means it. Or she's very good at pretending. Either way, you know more now than you did an hour ago. That's worth something.",
      },
    ],
    nextSceneId: 'scene-9-toast-setup',
  },
  {
    id: 'scene-9-toast-setup',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "{groom} stands. Clinks his glass. The table quiets. \"Welcome, everyone, to the best weekend of our lives.\" He raises his drink. \"To old friends, new beginnings, and the people who make life worth living.\"",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "His eyes move around the table. {bride}. The groomsmen. {ex}. He lingers on her for just a moment too long. Then his gaze slides past you like you're not there.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        
        text: "Everyone saw.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-9-1',
        text: 'Nothing. Watch. Remember.',
        nextSceneId: 'scene-10-after-toast-absorb',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'No reaction. They got nothing. Now they\'re wondering what you\'re thinking.',
        tactic: 'strategic_silence',
      },
      {
        id: 'choice-9-2',
        text: 'Stand up quietly. "I need some air."',
        nextSceneId: 'scene-9b-bathroom',
        xpBonus: 5,
        feedback: 'You removed yourself. They saw it land. They won this round.',
        tactic: 'tactical_exit',
      },
      {
        id: 'choice-9-3',
        text: 'Wait. Pull {boyfriend} aside after dinner. "Interesting toast."',
        nextSceneId: 'scene-9c-ethan-confrontation',
        xpBonus: 10,
        feedback: 'Controlled. You\'re addressing it without showing the wound.',
        tactic: 'controlled_confrontation',
      },
      {
        id: 'choice-9-4',
        text: 'Stand. "I\'d like to add something."',
        nextSceneId: 'scene-9d-your-toast',
        xpBonus: 5,
        feedback: 'All eyes on you. What do you say?',
        tactic: 'public_response',
      },
    ],
  },
  // Absorb path
  {
    id: 'scene-10-after-toast-absorb',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You drink. You smile. You pretend. Under the table, {boyfriend} squeezes your hand. He knows. But he doesn't speak. That's becoming a pattern.",
      },
      {
        text: "Dinner ends. People are tipsy and laughing. {sister} catches your eye as people filter toward the door. She mouths something: \"You okay?\" You nod.",
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  // Bathroom escape
  {
    id: 'scene-9b-bathroom',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "The bathroom is marble and soft lighting and blessed silence. You grip the sink, breathing. The door opens. {sister}.",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"That was bullshit.\" She leans against the counter, arms crossed. \"{groom} is an asshole. And my brother is a coward for not saying anything.\"",
        speakerId: 'lily',
        emotion: 'angry',
      },
      {
        
        text: "She sees it.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9b-1',
        text: '"Yeah. It was."',
        nextSceneId: 'scene-9b-lily-ally',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'She nods. You have an ally now.',
        tactic: 'honest_agreement',
      },
      {
        id: 'choice-9b-2',
        text: '"It\'s fine. I\'m probably overreacting."',
        nextSceneId: 'scene-9b-lily-disappointed',
        feedback: 'She looks disappointed. "If you say so."',
        tactic: 'minimizing',
      },
      {
        id: 'choice-9b-3',
        text: '"Is it always like this?"',
        nextSceneId: 'scene-9b-lily-intel',
        xpBonus: 10,
        feedback: 'She tells you. Everything.',
        tactic: 'intel_request',
      },
    ],
  },
  {
    id: 'scene-9b-lily-ally',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister} nods slowly. \"Good. You're not one of the delusional ones.\" She pulls out her phone. \"I'm texting you. Coffee tomorrow, before the rehearsal. Just us.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "\"I've got intel. And you're going to need it.\" She heads for the door. \"Also? Don't let my brother see you cry. Not yet. Make him work for that.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9b-lily-disappointed',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister} shrugs. \"Okay. If that's how you want to play it.\" She pushes off the counter. \"Just know - you're not the first woman I've watched go through this with my brother's friends.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"You're just the first one I thought might actually fight back.\" She leaves. You're alone again. The silence is worse now.",
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9b-lily-intel',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{sister} laughs darkly. \"Always? Honey, this is them being polite.\" She pulls out her phone, scrolls to a photo. \"See this? Last girlfriend. Two Christmases ago. {bride} made her cry at the dinner table.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "\"{boyfriend} didn't say anything then either.\" She pockets her phone. \"The question isn't whether they're going to try to break you. They will. The question is whether you're going to let them.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  // Private Ethan confrontation
  {
    id: 'scene-9c-ethan-confrontation',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "After dinner. The hallway outside the restaurant. Just the two of you. {boyfriend} already knows why you pulled him aside. His shoulders are tense.",
        speakerId: 'ethan',
        emotion: 'confused',
      },
      {
        text: "\"That toast. {groom} didn't even look at me.\" He sighs. \"Babe, that's just {groom}. He didn't mean anything.\"",
        speakerId: 'ethan',
        emotion: 'neutral',
      },
      {
        
        text: "He's deflecting. Already.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-9c-1',
        text: '"Maybe you\'re right. I\'m probably being sensitive."',
        nextSceneId: 'scene-9c-accept',
        feedback: 'Peace preserved. At what cost?',
        tactic: 'capitulation',
      },
      {
        id: 'choice-9c-2',
        text: '"He meant something. You just don\'t want to see it."',
        nextSceneId: 'scene-9c-pushback',
        xpBonus: 10,
        feedback: 'He gets defensive. But he knows you\'re right.',
        tactic: 'pushback',
      },
      {
        id: 'choice-9c-3',
        text: '"Say something. Today. Once."',
        nextSceneId: 'scene-9c-request',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Vulnerable. Honest. Now it\'s on him.',
        tactic: 'vulnerability',
      },
      {
        id: 'choice-9c-4',
        text: '"If this is how this weekend goes, I\'m leaving."',
        nextSceneId: 'scene-9c-ultimatum',
        xpBonus: 5,
        feedback: 'All cards on the table.',
        tactic: 'ultimatum',
      },
    ],
  },
  {
    id: 'scene-9c-accept',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend}'s shoulders drop. Relief. \"Thank you. I know it's a lot. They're just... they're protective.\" He kisses your forehead. \"Tomorrow will be better.\"",
        speakerId: 'ethan',
        emotion: 'happy',
      },
      {
        text: "You let him believe it. But you know something shifted tonight. Something you can't unshift.",
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9c-pushback',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend}'s jaw tightens. \"Why does everything have to be a thing with you?\" He catches himself. \"I didn't mean... I just... this weekend is important to me.\"",
        speakerId: 'ethan',
        emotion: 'angry',
      },
      {
        text: "\"Can we just... get through it? Please?\" He's asking for a pass. The question is whether you give it.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9c-request',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend} looks at you. Really looks. \"Say something? To who? {groom}?\" He runs a hand through his hair. \"He's my best friend. He's getting married tomorrow.\"",
        speakerId: 'ethan',
        emotion: 'confused',
      },
      {
        text: "\"I...\" He trails off. Swallows. \"I'll try. Okay? I'll try to be better.\" It's not a yes. But it's not a no. It's a start.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9c-ultimatum',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "{boyfriend}'s face hardens. Then breaks. \"Don't. Please.\" He reaches for your hand. \"I need you here. I need you to see that this is my life. These people matter to me.\"",
        speakerId: 'ethan',
        emotion: 'sad',
      },
      {
        text: "\"But you matter more.\" He says it quietly. Like he's surprised by his own words. \"Stay. Please. I'll do better.\" It's the first real thing he's said all night.",
        speakerId: 'ethan',
        emotion: 'sad',
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  // Your toast
  {
    id: 'scene-9d-your-toast',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The room goes quiet. All eyes on you. {bride}'s smile freezes. {boyfriend} looks terrified. {groom} raises an eyebrow, interested.",
      },
      {
        text: "\"To new beginnings.\" You raise your glass. \"And to the courage it takes to welcome new people into an old story.\" You look at {bride}. Then {groom}. \"Thank you for having me.\"",
      },
      {
        
        text: "Gracious with an edge. Well played.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-9d-1',
        text: 'Sit down. Let it land.',
        nextSceneId: 'scene-9d-graceful',
        xpBonus: 15,
        isOptimal: true,
        feedback: '{groom} clinks your glass. You earned something there.',
        tactic: 'graceful_power',
      },
      {
        id: 'choice-9d-2',
        text: 'Add: "I know not everyone was expecting me to last this long."',
        nextSceneId: 'scene-9d-pointed',
        xpBonus: 10,
        feedback: 'The shot lands. {bride} is furious. {groom} is impressed.',
        tactic: 'pointed_comment',
      },
    ],
  },
  {
    id: 'scene-9d-graceful',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You sit. The table exhales. {groom} reaches across and clinks your glass, eye contact held. \"To new beginnings,\" he echoes. Something shifted.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: "{bride} is still smiling, but it's razor-thin now. {boyfriend} squeezes your hand under the table - this time, it feels like pride.",
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  {
    id: 'scene-9d-pointed',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "The silence stretches. {bride}'s smile is gone. {groom} laughs - loud, genuine. \"I like this one.\" He raises his glass to you. {ex} is looking anywhere but at you.",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "You've drawn a line. Everyone saw it. {bride} will remember this. But {groom} is on your side now, and that might matter more.",
      },
    ],
    nextSceneId: 'scene-day1-end',
  },
  // Day 1 Checkpoint
  {
    id: 'scene-day1-end',
    backgroundId: 'apartment',
    dialog: [
      {
        text: "Back at the hotel. {boyfriend} is already asleep, or pretending to be. You stare at the ceiling, replaying every moment. Tomorrow is the rehearsal. The rehearsal dinner. More tests. More traps.",
      },
      {
        text: "Your phone buzzes. {bestfriend}: \"How's it going?\" You type back: \"I'll survive.\" She responds: \"That's not the same as thriving.\" She's not wrong.",
      },
    ],
    isEnding: false,
    nextSceneId: 'scene-13-morning',
  },
];
