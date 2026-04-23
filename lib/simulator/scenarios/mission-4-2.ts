/**
 * Mission 4-2 — "DARVO"
 *
 * Level 4, order 2. Teaches recognition and exit from the
 * Deny-Attack-Reverse-Victim-Offender sequence. Public setting,
 * live audience, real stakes.
 *
 * v2 (2026-04-19): expanded the middle. Added an Act-1 establishing
 * scene (the room, the drink, Avery making her way over), middle
 * beats for each Act-2 path (room-tilts-the-other-way after volume
 * match, Priya physically stepping in, the morning-after group chat
 * texture). Nine endings unchanged.
 *
 * Total scenes: 13 → 24
 * Avg dialog lines per playthrough: ~10 → ~22
 */

import type { Scenario, Scene } from "../types";
import { AVERY, PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the room before the ambush
  // ===================================================================

  {
    id: "the-confrontation",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday evening. The kind of crowded event where conversations overlap and people half-listen to three at once. Thirty within earshot. Drink in your hand you've forgotten you're holding.",
      },
      {
        speakerId: null,
        text: "You see Avery before she sees you — a quick glance toward the bar, then a tighter walk in your direction. She's been waiting for the right room. This is it.",
      },
      {
        speakerId: "avery",
        text: '"Can we talk? Actually — no. I need to say this out loud so people know."',
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "She said it half a step louder than the conversation needed. Two heads turn. A third leans in.",
      },
      {
        speakerId: "inner-voice",
        text: "Staged confrontation. Her audience is the rest of the room, not you. The phrase 'so people know' is not a slip of the tongue — it is the entire operating system of the move. A confrontation that required the room would not have announced that it required the room.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The next sixty seconds are the most expensive sixty seconds of your social life this month, and every sentence you produce either buys back your reputation or pays her for a performance she has been rehearsing for ten days. Plan accordingly.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "avery-accuses",
  },

  {
    id: "avery-accuses",
    backgroundId: "common-room",
    mood: "danger",
    immersionTrigger: "red-flag-revealed",
    shakeOnEntry: "threat",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: "avery",
        text: '"You\'ve been spreading lies about me. Telling people I lied about the collab. Do you know how damaging that\'s been for me?"',
        emotion: "angry",
      },
      {
        speakerId: "avery",
        text: '"I\'m the victim here and I\'m done staying quiet."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "She didn't pause for breath between those two lines. The script was rehearsed. Three more heads turn.",
      },
      {
        speakerId: "inner-voice",
        text: "Full DARVO: Deny (she was never lying), Attack (you're spreading things), Reverse Victim/Offender (she's the victim, you're the aggressor). Classic sequence.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The trap isn't the accusation. The trap is the response. Whatever you say next either accepts the stage she built or refuses it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defend-immediately",
        text: '"That\'s not true, I haven\'t said anything about you!"',
        tactic:
          "Defending against the reversal IS the reversal. You lose the frame.",
        nextSceneId: "avery-escalates-publicly",
        isOptimal: false,
      },
      {
        id: "match-volume",
        text: '"YOU started this with a lie about ME."',
        tactic:
          "Matching volume makes it look like a dispute, not a smear.",
        nextSceneId: "room-tilts-other-way",
        isOptimal: false,
      },
      {
        id: "quiet-refuse",
        text: '"I\'m not doing this here."',
        tactic: "Refuse the stage. Six words.",
        nextSceneId: "avery-tries-drag",
        isOptimal: true,
      },
      {
        id: "call-audience",
        text: '"Everyone hearing this — she chose this room on purpose. Ask yourselves why."',
        tactic: "Name the tactic to the audience. Risky but decisive.",
        nextSceneId: "audience-pivots",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — DEFEND IMMEDIATELY
  // ===================================================================

  {
    id: "avery-escalates-publicly",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: "avery",
        text: '"THAT\'S exactly what you always do. Deny, deny, deny. Classic."',
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "Heads are turning. Phones are half-up. A pocket of people near the wall has gone completely quiet — they're watching now, not pretending not to.",
      },
      {
        speakerId: "inner-voice",
        text: "She's using your denial as evidence. Every word now digs deeper. You have one last clean exit available; the next sentence either takes it or buries it.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "explain-facts",
        text: "Launch into a point-by-point rebuttal.",
        tactic:
          "You're now giving a speech about how innocent you are. Worst optics.",
        nextSceneId: "ending-lost-the-room",
        isOptimal: false,
      },
      {
        id: "exit",
        text: '"I\'m leaving. This isn\'t a conversation."',
        tactic: "Late exit, but better than staying.",
        nextSceneId: "ending-dignified-exit",
      },
      {
        id: "one-sentence",
        text: '"The timeline is public if anyone wants to look." Then walk away.',
        tactic:
          "One factual line; no engagement. Lets people check for themselves.",
        nextSceneId: "ending-cold-exit",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2B — MATCH VOLUME
  // ===================================================================

  {
    id: "room-tilts-other-way",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "Your voice carries further than you intended. The ambient conversation drops. The pocket of half-watchers is now fully watching — and they're watching both of you.",
      },
      {
        speakerId: null,
        text: "Two phones come the rest of the way up. Someone behind you mutters 'oh, Christ.'",
      },
      {
        speakerId: "avery",
        text: '"Wow. Wow. You\'re going to do this in front of everyone? Really?"',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "She's about to play 'I can't believe you'd attack me publicly.' Watch — she's setting up the second verse.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-spectacle",
  },

  // ===================================================================
  // ACT 2C — QUIET REFUSE
  // ===================================================================

  {
    id: "avery-tries-drag",
    backgroundId: "common-room",
    mood: "danger",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "You said it once, calmly, then stopped looking at her. Six words and a sip of your drink.",
      },
      {
        speakerId: "avery",
        text: '"Oh, so you don\'t want to face me publicly. Interesting."',
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "Movement on your left. Priya, who'd been three feet away pretending not to clock the situation, has stopped pretending. She's stepped in shoulder-to-shoulder with you, drink still in her hand, casual as weather.",
      },
      {
        speakerId: "priya",
        text: '"Avery. Not here."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "Two words. The way she said the name made it sound like she'd known Avery for years and was tired of her. The room registers that.",
      },
      {
        speakerId: "inner-voice",
        text: "Priya stepped in. The window just opened. Don't make it worse — every option you take now is read against the composure you've already shown.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "walk-with-priya",
        text: 'Turn to Priya. "Let\'s go." Walk out together.',
        tactic: "Ally-assisted exit. Audience reads it as composure.",
        nextSceneId: "ending-ally-exit",
        isOptimal: true,
      },
      {
        id: "take-bait",
        text: '"I\'m happy to face you, just not in your staged ambush."',
        tactic:
          "You'd rather be clever than exit. The audience didn't need the clever.",
        nextSceneId: "ending-spectacle",
      },
      {
        id: "single-landmine",
        text: '"Avery — the email thread exists. Walk carefully." Exit.',
        tactic:
          "Implied receipt + exit. She knows you have documentation. Audience notices.",
        nextSceneId: "landmine-detonates",
        isOptimal: true,
      },
    ],
  },
  {
    id: "landmine-detonates",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: null,
        text: "You said it loud enough for two rows of people, quiet enough that it wasn't a scene. Then you turned and walked toward the door without looking back.",
      },
      {
        speakerId: null,
        text: "What you don't see — what Priya texts you about an hour later — is the half-second after your line landed: Avery's face flicked through three expressions before she settled on outrage. The pocket of watchers saw it.",
      },
      {
        speakerId: "inner-voice",
        text: "The microexpression is the receipt. Anyone who saw it doesn't need the email thread. They saw her recognise the email thread.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-landmine-planted",
  },

  // ===================================================================
  // ACT 2D — CALL AUDIENCE
  // ===================================================================

  {
    id: "audience-pivots",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["avery", "priya"],
    dialog: [
      {
        speakerId: null,
        text: "A beat. You said it level, almost bored. Six words. Then a couple near you exchange looks. Someone mutters 'okay, fair.' The performance is losing its audience in real time.",
      },
      {
        speakerId: "avery",
        text: '"Oh I chose this room? You\'re gaslighting ME now?"',
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "She said it too quickly. The escalation word landed without setup. The pocket of watchers shifts again — you can almost hear the read happening.",
      },
      {
        speakerId: "inner-voice",
        text: "She's losing the room, so she's reaching for escalation words. The room knows what those mean now. Exit before she recovers — the next ten seconds are pure profit if you say nothing.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "exit-on-high",
        text: "Nod. Turn. Leave without another word.",
        tactic:
          "Peak exit. Let the audience's shift be the last thing said.",
        nextSceneId: "ending-audience-pivoted",
        isOptimal: true,
      },
      {
        id: "one-more",
        text: '"Gaslighting is a real word. I\'d Google it."',
        tactic:
          "Clever but now you look combative. Don't keep swinging after the bell.",
        nextSceneId: "overstep-fallout",
      },
      {
        id: "address-audience-gently",
        text: '"Sorry, everyone — I\'m going to step out. Enjoy your night." Leave.',
        tactic: "Address the room, not her. Exits the scene while honouring the witnesses. Reads as composure.",
        nextSceneId: "ending-audience-pivoted",
        isOptimal: true,
      },
      {
        id: "quiet-offer",
        text: '"Avery — I\'m down to talk, but not here. DM me tomorrow." Leave.',
        tactic: "Redirect the real conversation offstage without admitting anything. Takes the air out of the spectacle.",
        nextSceneId: "ending-audience-pivoted",
      },
    ],
  },
  {
    id: "overstep-fallout",
    backgroundId: "common-room",
    mood: "tense",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: null,
        text: "Two people laugh. One winces. Avery's face hardens — she just got handed a pivot back.",
      },
      {
        speakerId: "avery",
        text: '"Oh, NICE. Real classy."',
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "The room re-balances. Half a minute ago you'd won. Now you're a person who insulted someone who was upset, in public. The story has two characters again.",
      },
      {
        speakerId: "inner-voice",
        text: "When the room tips your way, stop talking. The clever line is always available later. The win window isn't.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-overstep",
  },

  // ===================================================================
  // ENDINGS (unchanged from v1)
  // ===================================================================

  {
    id: "ending-cold-exit",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Cold Exit",
    endingSummary:
      "One sentence, zero engagement, clean walk. The audience who was there now has one clear datapoint: 'there's a timeline they can look up.' That's a much scarier thing for Avery than any argument would have been.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "One verifiable fact, delivered calmly, ends the conversation you refused to have.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-ally-exit",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Exit With Your Ally",
    endingSummary:
      "Priya created the gap; you used it. Leaving together signals composure, not flight. Avery finishes the speech to a room of people already forming a different opinion than the one she was aiming for.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Allies create windows. Good players walk through them.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-landmine-planted",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Landmine",
    endingSummary:
      "'The email thread exists. Walk carefully.' Six words, said calmly, in public. Avery now has to decide whether to keep going against someone with documented receipts. The smart ones de-escalate immediately. The dumb ones push, and find the landmine. Either way, you've stopped volunteering the detonator.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Implied documentation is stronger than shown documentation. Mystery is leverage.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-audience-pivoted",
    backgroundId: "common-room",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Room Turned",
    endingSummary:
      "You named the staging, got out during the pivot, said nothing more. The audience leaves talking about the staging, not the content. Avery's script is now the thing people remember — not the accusation.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Once you name the tactic, the tactic becomes the story.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-dignified-exit",
    backgroundId: "common-room",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Dignified But Late",
    endingSummary:
      "You left. Good. But you defended first, which now lives as the opening line of the story. Most people will remember composure. Some will remember the defense as proof of guilt. Mixed bag.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A late exit is still an exit. Next time, earlier.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-spectacle",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "ghostlighting-when-they-ghost-then-gaslight",
    failureBlogTitle: "Ghostlighting: When They Ghost Then Gaslight",
    endingTitle: "Two Loud People",
    endingSummary:
      "You matched volume and engaged the trap. Observers now have a story: 'those two were yelling at each other.' Your credibility is averaged with hers. You gave her the equivalence she needed.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Matching volume is matching level. Stay higher.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lost-the-room",
    backgroundId: "common-room",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "The Speech Killed You",
    endingSummary:
      "Point-by-point rebuttal to a staged accusation IS the loss. People remember the long explanation, not the facts in it. By the end, half the audience thinks 'why are they trying so hard.'",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Long explanations are confessions of insecurity. Short facts aren't.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-overstep",
    backgroundId: "common-room",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Won the Room, Lost the Ending",
    endingSummary:
      "You had the audience. Then you took one more shot and muddied the impression. People remember the last line. Not the turn.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "When the room tips your way, stop talking.",
        emotion: "neutral",
      },
    ],
  },
];

export const mission42: Scenario = {
  id: "mission-4-2",
  title: "DARVO",
  tagline: "Deny, Attack, Reverse Victim and Offender — live audience.",
  description:
    "Avery confronts you in a crowded room, on her chosen ground. She's running the sequence on purpose. The audience is her weapon; your instinct to defend is her goal. The only win is to refuse the stage she built — and the win window is narrow.",
  tier: "premium",
  level: 4,
  order: 2,
  estimatedMinutes: 9,
  difficulty: "advanced",
  category: "gaslighter",
  xpReward: 200,
  badgeId: "darvo-recognized",
  startSceneId: "the-confrontation",
  tacticsLearned: [
    "Refusing a staged confrontation",
    "Naming the tactic to the audience",
    "Implied receipts without displaying them",
    "Exiting at the peak, not after the peak",
    "Reading the microexpression as the real receipt",
  ],
  redFlagsTaught: [
    "Public ambushes on chosen ground",
    "'I'm the victim' framing of the aggressor",
    "Escalation words (gaslighting, aggressive) deployed rhetorically",
    "Your denial being used as 'evidence'",
    "The clever line you take after the room has already turned",
  ],
  reward: {
    id: "darvo-recognized",
    name: "DARVO Recognized",
    description: "You saw the script, refused the stage, and left the room.",
    unlocksScenarioId: "mission-5-1",
  },
  prerequisites: ["mission-4-1"],
  characters: [AVERY, PRIYA, INNER_VOICE],
  scenes,
};

export default mission42;
