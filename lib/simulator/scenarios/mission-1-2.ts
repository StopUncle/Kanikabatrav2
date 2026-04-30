/**
 * Mission 1-2, "The Charm Offensive"
 *
 * Level 1, order 2. Teaches love-bombing recognition.
 * Maris chooses you tonight. That's the danger.
 *
 * Choices use the 4-position mix, correct answer's index varies
 * (sometimes 0, sometimes 2, sometimes buried), and "medium-wrong"
 * choices look plausible on the surface. Players who pattern-match
 * first-option-correct will lose.
 */

import type { Scenario, Scene } from "../types";
import { MARIS, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "bar-arrival",
    backgroundId: "bar",
    mood: "party",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. Five nights after the gala. The cream-stock card Maris slid between your glasses is in the inside pocket of your coat. You read it again on the walk over, a Manhattan number, no title, handwritten in a script that certainly cost someone a finishing-school term. You have not replied to it.",
      },
      {
        speakerId: "priya",
        text: '"No pressure on drinks. I already ordered. She walked in twenty minutes ago and clocked the door three times while I finished the first one."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Note the discipline of the timing. Maris did not message you to confirm. She simply assumed you would show up on the night she named, at roughly the hour she implied, and she has spent the last twenty minutes watching the door to find out whether she was right.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Women who watch doors that carefully are not waiting for friends. They are waiting to see how the audition enters.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "fashionably-late",
        text: "Walk in relaxed. Greet Priya first. Don't look for Maris.",
        tactic: "Non-pursuit. Make her come to you.",
        nextSceneId: "maris-approaches",
        isOptimal: true,
      },
      {
        id: "scan-for-her",
        text: "Scan the room until you find Maris. Catch her eye.",
        tactic: "Giving away where your attention lives.",
        nextSceneId: "maris-notices-scan",
        isOptimal: false,
      },
      {
        id: "ignore-entirely",
        text: "Pretend Maris isn't here. Don't even look.",
        tactic: "Overcorrection, she reads this as strategy, not indifference.",
        nextSceneId: "maris-tests-patience",
      },
      {
        id: "wave-her-over",
        text: "Wave Maris over from across the room.",
        tactic: "You just told everyone watching that you chased.",
        nextSceneId: "maris-declines-publicly",
        isOptimal: false,
      },
    ],
  },

  // Optimal branch, she approaches
  {
    id: "maris-approaches",
    backgroundId: "bar",
    mood: "party",
    presentCharacterIds: ["priya", "maris"],
    dialog: [
      {
        speakerId: null,
        text: "Four minutes later she is at the edge of your booth. Two drinks. One of them is placed on your side of the table before she has sat down, not slid across, placed. She is still standing when she speaks.",
      },
      {
        speakerId: "maris",
        text: '"I am bad at remembering names. I am not bad at remembering faces, and yours did something at the Collins table last Thursday I have thought about on two separate drives home since. You are here. I am rather pleased about that."',
      },
      {
        speakerId: "inner-voice",
        text: "Note the construction of that sentence. She pretended to struggle with something she does not struggle with, nobody with her family remembers people by face and forgets names, they remember both, instantly, the first time. The pretend weakness is a compliment disguised as self-deprecation. It is the oldest trick in the class.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The drink placement matters too. She put yours in front of you before asking if you wanted it. Placement is a frame, she is telling you, without any question, that hospitality in this booth runs through her now. The hospitality was already yours. She just annexed it.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is love-bombing in its first register. Specific flattery, planted memory, annexed hospitality, all before the second word out of your mouth. Name the move. The move is called the opening bid.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-warmly",
        text: "Take the drink. Smile. \"That's sweet.\"",
        tactic: "Mirroring the warmth back, exactly what she's testing for.",
        nextSceneId: "maris-escalates",
        isOptimal: false,
      },
      {
        id: "accept-cool",
        text: "Take the drink. Nod. \"Appreciated.\" Turn back to Priya.",
        tactic: "Accept value without reciprocating the frame.",
        nextSceneId: "maris-tries-again",
        isOptimal: true,
      },
      {
        id: "decline-polite",
        text: "\"No thanks. Already ordered.\" (You didn't.)",
        tactic: "Reads defensive. She'll probe why.",
        nextSceneId: "maris-prods-refusal",
      },
      {
        id: "decline-sharp",
        text: "\"I don't take drinks from strangers.\"",
        tactic: "Overcorrection, now you look uptight, not untouchable.",
        nextSceneId: "maris-amused-pivot",
        isOptimal: false,
      },
    ],
  },

  // Bad branch, scanning
  {
    id: "maris-notices-scan",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["priya", "maris"],
    dialog: [
      {
        speakerId: null,
        text: "You find her across the bar. She was already watching the door, she saw you look.",
      },
      {
        speakerId: null,
        text: "She doesn't come over. She turns a quarter-degree away and keeps talking to whoever she was with.",
      },
      {
        speakerId: "priya",
        text: '"She just noted that you looked first. Mental tally."',
        emotion: "concerned",
      },
    ],
    nextSceneId: "recover-or-chase",
  },

  {
    id: "recover-or-chase",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You gave her information. She's waiting to see what you do with the cost.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "stay-with-priya",
        text: "Let it go. Sit with Priya. Don't try to fix it.",
        tactic: "Cut losses. She respects people who don't scramble.",
        nextSceneId: "maris-tries-again",
        isOptimal: true,
      },
      {
        id: "go-explain",
        text: "Walk over. Play it cool. Make conversation.",
        tactic: "Chasing after a loss. Exactly what she wants.",
        nextSceneId: "audition-begins",
        isOptimal: false,
      },
      {
        id: "post-about-it",
        text: "Grab your phone. Post something witty about the bar.",
        tactic: "Performing 'unbothered' is still a performance. She'll see it.",
        nextSceneId: "audition-begins",
      },
    ],
  },

  // Ignore-entirely branch
  {
    id: "maris-tests-patience",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Twenty minutes pass. She doesn't look over. You don't look over. Someone is winning and you're not sure who.",
      },
      {
        speakerId: "priya",
        text: '"She\'s not playing your game. She\'s playing her own and making you watch."',
        emotion: "serious",
      },
    ],
    nextSceneId: "recover-or-chase",
  },

  // Wave-her-over branch, bad outcome
  {
    id: "maris-declines-publicly",
    backgroundId: "bar",
    mood: "danger",
    presentCharacterIds: ["priya", "maris"],
    dialog: [
      {
        speakerId: null,
        text: "She sees the wave. Holds eye contact for half a second. Then gives you a small, amused smile and turns back to her group.",
      },
      {
        speakerId: null,
        text: "Three people near you watched it happen.",
      },
      {
        speakerId: "priya",
        text: '"Ohhhh. Oh honey."',
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-chased-and-denied",
  },

  // Drink accepted warmly, she escalates
  {
    id: "maris-escalates",
    backgroundId: "bar",
    mood: "tense",
    immersionTrigger: "manipulation-detected",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: "\"You know what I noticed about you? You have the same energy as someone I used to know. Someone I rather respected, actually. I do not say that about many people.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Fabricated nostalgia, she met you six minutes ago, so whoever she is comparing you to is either invented or generic enough to fit anyone. The entire sentence is a piece of theatre. What it is actually doing is pricing you above the rest of the room at the cost of a comparison that cannot be fact-checked.",
        emotion: "concerned",
      },
      {
        speakerId: "maris",
        text: '"Most people here are, I am afraid, rather boring. You are not. I can tell."',
      },
      {
        speakerId: "inner-voice",
        text: "Watch the structure, she insulted the whole room and excluded you from the insult in the same breath. You are meant to feel flattered by the exception. What actually happened is she established herself as the one who decides who is and is not boring. You just became a subject of her verdict system.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "believe-her",
        text: '"That\'s really kind of you to say."',
        tactic: "You just signed the contract.",
        nextSceneId: "ending-recruited",
        isOptimal: false,
      },
      {
        id: "deflect-compliment",
        text: '"Bold claim about someone you met ten minutes ago."',
        tactic: "Name the move without naming it. She has to respect it or leave.",
        nextSceneId: "maris-reassesses",
        isOptimal: true,
      },
      {
        id: "mirror-flatter",
        text: '"You seem pretty interesting yourself."',
        tactic: "Mirroring, the core trap of love-bombing.",
        nextSceneId: "ending-recruited",
      },
      {
        id: "silence",
        text: "Just smile. Don't answer.",
        tactic: "Denying her the reaction is fine but she'll keep escalating.",
        nextSceneId: "maris-escalates-again",
      },
    ],
  },

  {
    id: "maris-reassesses",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: null,
        text: "A flicker. Something recalibrating behind her eyes.",
      },
      {
        speakerId: "maris",
        text: '"Hm. Most people would have taken that."',
        emotion: "curious",
      },
      {
        speakerId: "maris",
        text: '"Fine. Play. What do YOU think is so interesting about me?"',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "She's flipped it. You're supposed to answer. Don't.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "list-things",
        text: "Rattle off three things you've noticed about her.",
        tactic: "You just performed on her stage. Worst move of the night.",
        nextSceneId: "ending-recruited",
        isOptimal: false,
      },
      {
        id: "refuse-frame",
        text: "\"I haven't decided yet.\"",
        tactic: "Keep the frame. You're assessing; she doesn't get a verdict tonight.",
        nextSceneId: "ending-pattern-held",
        isOptimal: true,
      },
      {
        id: "change-subject",
        text: "Turn the question to something trivial. The bar, the music.",
        tactic: "Neutralize without retreating. Solid.",
        nextSceneId: "ending-neutral-exit",
      },
    ],
  },

  {
    id: "maris-escalates-again",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Silent type. I like that."',
        emotion: "seductive",
      },
      {
        speakerId: "maris",
        text: '"Tell me something no one else knows about you."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "Classic: creating intimacy she hasn't earned. Trade secrets for fake trust.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "confess-something",
        text: "Share something small and personal.",
        tactic: "You just handed her something to use later.",
        nextSceneId: "ending-info-traded",
        isOptimal: false,
      },
      {
        id: "reverse-question",
        text: "\"You first.\"",
        tactic: "Make her pay to play. She won't.",
        nextSceneId: "ending-pattern-held",
        isOptimal: true,
      },
      {
        id: "joke-deflect",
        text: "Laugh. \"I'm an open book. Very boring.\"",
        tactic: "Charming opt-out. She'll circle back later.",
        nextSceneId: "ending-neutral-exit",
      },
    ],
  },

  {
    id: "maris-tries-again",
    backgroundId: "bar",
    mood: "peaceful",
    presentCharacterIds: ["priya", "maris"],
    dialog: [
      {
        speakerId: null,
        text: "Fifteen minutes later she's standing by your booth again. Different pretense this time.",
      },
      {
        speakerId: "maris",
        text: '"We were just debating something. Tiebreaker?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She's using her friends as a prop to make contact feel casual. You don't have to play.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "bite",
        text: "Join her table. Be the tiebreaker.",
        tactic: "Recruitable. She got what she wanted.",
        nextSceneId: "audition-begins",
        isOptimal: false,
      },
      {
        id: "refuse-invitation",
        text: "\"Not really my call.\"",
        tactic: "You didn't take the bait. The door stays where you put it.",
        nextSceneId: "ending-pattern-held",
        isOptimal: true,
      },
      {
        id: "counter-offer",
        text: "\"If it's interesting, bring it over here. We have a booth.\"",
        tactic: "Flipping the frame. She has to come to you or retreat.",
        nextSceneId: "ending-seat-earned",
        isOptimal: true,
      },
    ],
  },

  {
    id: "maris-prods-refusal",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Oh come on. That\'s a no to the drink? Or a no to me?"',
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "She just framed the options. Don't take either.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "clarify",
        text: "\"Just to the drink. Already ordered.\"",
        tactic: "Answering her frame. You're in her script now.",
        nextSceneId: "audition-begins",
      },
      {
        id: "neither",
        text: "\"Neither. Just not tonight.\"",
        tactic: "Reject the frame entirely. No reason offered.",
        nextSceneId: "ending-pattern-held",
        isOptimal: true,
      },
      {
        id: "snap",
        text: "\"You don't need me to tell you which.\"",
        tactic: "Sharp, but reads combative. She'll log it.",
        nextSceneId: "ending-neutral-exit",
      },
    ],
  },

  {
    id: "maris-amused-pivot",
    backgroundId: "bar",
    mood: "tense",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: "maris",
        text: '"Stranger? We\'re at the same bar, same friend group, same weekend."',
        emotion: "smirking",
      },
      {
        speakerId: "maris",
        text: '"But okay, defensive is a look."',
        emotion: "smirking",
      },
    ],
    nextSceneId: "ending-neutral-exit",
  },

  {
    id: "audition-begins",
    backgroundId: "bar",
    mood: "danger",
    presentCharacterIds: ["maris"],
    dialog: [
      {
        speakerId: null,
        text: "You're at her table now. She's made space for you. Everyone else there is someone she chose.",
      },
      {
        speakerId: "maris",
        text: '"So. Tell me everything."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "You walked onto her stage. The rest of the night is her curriculum.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-recruited",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------

  {
    id: "ending-pattern-held",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pattern Held",
    endingSummary:
      "You saw every move before she made it and took none of them. The card from the gala is back in your coat pocket, unreturned. Maris will be back, she certainly will but she will come in differently next time, which means the first opening bid did not work, which means tonight you became the rare kind of person she has to plan for. You did not lose yourself to be chosen. That is a smaller achievement than most people at this bar will get in the next ten years.",
    dialog: [
      {
        speakerId: null,
        text: "Later, walking toward the lift, Priya matches your pace. She is not saying anything yet, which is itself a Priya choice, she has notes, she is sitting on them for thirty seconds so they land clean.",
      },
      {
        speakerId: "priya",
        text: '"Real talk. She is going to think about tonight for a week. Maybe two. Do not reply to the card. Let her open the next move."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Love-bombing only works on people who want to be chosen. You did not behave like someone who needed to be. That is the whole discipline of this scenario, not a rejection of her, which would feel like a scene, but a refusal of the chosen-by-Maris frame entirely.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You take the card out of your coat pocket on the lift down. You look at it once. You put it back.",
      },
    ],
  },

  {
    id: "ending-seat-earned",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Moved the Table",
    endingSummary:
      "She came to your booth. Three of her friends followed. By the end of the night, the center of the room had shifted and you'd barely moved. That's how you start to matter without asking.",
    dialog: [
      {
        speakerId: null,
        text: "The seat you started in is the one everyone's talking about now.",
      },
      {
        speakerId: "inner-voice",
        text: "Gravity, not invitation.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-neutral-exit",
    backgroundId: "bar",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Draw",
    endingSummary:
      "Neither of you gave much away. She'll try again, differently. You held ground but didn't gain any. Next time she approaches, the game restarts at the same score.",
    dialog: [
      {
        speakerId: null,
        text: "You leave the bar with less than you wanted and more than you started with.",
      },
      {
        speakerId: "inner-voice",
        text: "Not every night is a win. This one was tuition.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-chased-and-denied",
    backgroundId: "bar",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze: How Sociopaths Detect Weakness",
    endingTitle: "Publicly Rejected",
    endingSummary:
      "You waved. She declined. Three people watched. By morning, four more will have heard. Maris didn't need to say anything about you, you just gave her the story.",
    dialog: [
      {
        speakerId: null,
        text: "The screenshot of your wave is already in a group chat you're not in.",
      },
      {
        speakerId: "inner-voice",
        text: "The one who reaches is the one who loses the frame.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-recruited",
    backgroundId: "bar",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "Cast as Yourself",
    endingSummary:
      "You took the compliment. You took the seat. Somewhere between the third drink and the shared secret, you forgot that you were being auditioned. She did not. Every sentence you said tonight is now a line in a script she will quote back at you, not tonight, not next week, but in six months when she needs a favour she has not yet invented the excuse for. You are not her friend. You are a resource with a cover story called friendship.",
    dialog: [
      {
        speakerId: null,
        text: "You walk out at some hour past one. The card is no longer in your coat because you reached for it twice tonight at her table to show her you still had it. She smiled both times. She did not reach for hers.",
      },
      {
        speakerId: "inner-voice",
        text: "Love-bombing is not the affection. The affection is the invoice. Every warm sentence tonight has a price on the back of it written in invisible ink, and you will read it the first time you try to say no to her about something.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You lock your phone. You fall asleep. You will wake up feeling chosen, because that is what the brain does after a night like this. You were not chosen. You were cast.",
      },
    ],
  },

  {
    id: "ending-info-traded",
    backgroundId: "bar",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "dark-psychology-beginners-guide",
    failureBlogTitle: "Dark Psychology: Beginner's Guide",
    endingTitle: "One Confession Too Far",
    endingSummary:
      "She asked for something private. You gave it. The intimacy was fake, the ammunition is real. Every time you cross her from now on, that detail comes out in a conversation you're not part of.",
    dialog: [
      {
        speakerId: null,
        text: "You told her one small thing. She's already told three other people.",
      },
      {
        speakerId: "inner-voice",
        text: "Never trade a secret for a feeling. The receipt outlasts the feeling.",
        emotion: "sad",
      },
    ],
  },
];

export const mission12: Scenario = {
  id: "mission-1-2",
  title: "The Charm Offensive",
  tagline: "She picks you tonight. That's the problem.",
  description:
    "Rooftop bar. Maris walks in. You and Priya are the only table she hasn't worked yet and she's heading your way. Love-bombing is about to land; the only win is not catching it.",
  tier: "free",
  level: 1,
  order: 2,
  estimatedMinutes: 12,
  difficulty: "beginner",
  category: "narcissist",
  xpReward: 100,
  badgeId: "love-bomb-spotted",
  startSceneId: "bar-arrival",
  tacticsLearned: [
    "Non-pursuit, let them come to you",
    "Reject the frame without attacking it",
    "Don't reciprocate love-bombing with mirrored warmth",
    "Name the move without naming it",
  ],
  redFlagsTaught: [
    "Unearned intimacy (fabricated nostalgia, 'same energy as...')",
    "Compliments framed against 'everyone else'",
    "Early requests for secrets or confessions",
    "Testing your reaction to being chosen",
  ],
  reward: {
    id: "love-bomb-spotted",
    name: "Love-Bomb Spotted",
    description: "You recognized the pattern before the second drink.",
    unlocksScenarioId: "mission-2-1",
  },
  characters: [MARIS, PRIYA, INNER_VOICE],
  scenes,
};

export default mission12;
