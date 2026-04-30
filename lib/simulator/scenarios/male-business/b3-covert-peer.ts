/**
 * Business Line. Mission 3 "The Covert Peer"
 *
 * Teaches: spotting covert aggression before it surfaces. Controlled
 * disclosure. Never complaining up the chain. Letting the predator
 * eliminate himself through his own pattern.
 *
 * Why it matters: the overt rival is a gift, you can see him coming.
 * The covert peer smiles, brings coffee, and plants stories in your
 * director's ear for six months before you notice the promotion slide
 * past you with vague "trust" feedback. Careers end here, silently.
 *
 * Optimal path: the disinformation trap, feed Sage a small, traceable
 * false piece, watch where it surfaces, and let Hale discover the leak
 * himself. You never accuse. The knife stays in Sage's hand.
 *
 * Failure routes → "Architecture of Control: How Emotional Dependency
 * Is Built" / "Dark Triad Personality Types"
 */

import type { Scenario, Scene } from "../../types";
import { DAMIEN, HALE, SAGE, THEO, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1, the leak from Theo
  // ---------------------------------------------------------------------
  {
    id: "theos-warning",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 6:12pm. Theo closes the door behind him. He doesn't sit. He doesn't do small talk.",
      },
      {
        speakerId: "theo",
        text: "\"I'm going to say this once, then I'm going to leave. Sage has been telling Hale you're burning out. Stretched thin. Missing details on the mid-market accounts.\"",
        emotion: "knowing",
      },
      {
        speakerId: "theo",
        text: "\"I heard it from Priya, who heard it from Kwan, who was in the room. That's two rooms away from you. That means it's been travelling.\"",
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "You check your inbox reflexively. Sage, two coffees this month. A Slack thread last week, 'team player' energy, three laugh reactions on your joke. Nothing out of pattern.",
      },
      {
        speakerId: null,
        text: "Then you remember. Your last two 1:1s with Hale had pointed questions. 'How's your bandwidth, really?' 'Are the mid-markets getting the attention they need?' You couldn't source the worry. Now you can.",
      },
      {
        speakerId: "inner-voice",
        text: "Smear campaign. Covert aggression runs on triangulation, he never speaks to you, only about you, and only to someone with power over you. You're hearing it in week ten of a nine-month operation. That's actually early.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "stay-still-think",
        text: "Say nothing yet. Thank Theo, ask him to keep listening. Go home. Think.",
        tactic: "Reaction is what the smearer is farming. Slow down. Information first, move second.",
        nextSceneId: "the-calculation",
        isOptimal: true,
      },
      {
        id: "confront-sage-now",
        text: "Walk to Sage's desk right now and ask him directly.",
        tactic: "Confronting a covert aggressor is how you hand him the victim script he's been building toward.",
        nextSceneId: "confront-sage",
      },
      {
        id: "march-to-hale",
        text: "Go to Hale's office. Tell him Sage is spreading rumours.",
        tactic: "Complaining up the chain about a peer reads as 'political' and confirms Sage's framing of you.",
        nextSceneId: "complain-to-hale",
      },
      {
        id: "ignore-work-harder",
        text: "Dismiss it. Work harder. Let the results speak.",
        tactic: "Against an overt rival, results win. Against a covert one, the narrative beats the numbers.",
        nextSceneId: "ignore-harder",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2, the calculation (optimal branch)
  // ---------------------------------------------------------------------
  {
    id: "the-calculation",
    backgroundId: "office",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Friday morning. 5:40am. You're at your desk before the cleaners leave. Coffee black. Notebook open.",
      },
      {
        speakerId: null,
        text: "You write it out. Three facts.",
      },
      {
        speakerId: null,
        text: "One: Sage is feeding Hale a narrative of your decline. Two: the narrative has travelled two rooms, which means it's been weaponised for weeks. Three: Hale already half-believes it, his 1:1 questions prove it.",
      },
      {
        speakerId: "inner-voice",
        text: "Reputation warfare. You can't counter a narrative by denying it, denial is evidence to someone who wants to believe the story. You have to let Sage produce the evidence that destroys his own credibility. The trap has to be something only he could leak.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You think about what kind of false information would be irresistible to pass to Hale and harmless if it surfaced. Something specific. Something wrong. Something only Sage would know you'd said.",
      },
    ],
    choices: [
      {
        id: "disinfo-trap",
        text: "Plant a specific, false, low-stakes piece of intel with Sage only. Wait to see where it lands.",
        tactic: "Controlled disclosure. The leak identifies itself. You never accuse, you let the pattern speak.",
        nextSceneId: "plant-the-bait",
        isOptimal: true,
      },
      {
        id: "paper-trail-only",
        text: "Skip the trap. Just build a paper trail of your work quality. CC Hale on everything, over-document wins.",
        tactic: "Defence alone doesn't undo a narrative. You need Sage to discredit himself, not just to out-produce him.",
        nextSceneId: "paper-trail-route",
      },
      {
        id: "tell-theo-watch",
        text: "Tell Theo what you're about to do. Loop him in as a witness before the trap is set.",
        tactic: "An ally who knows the timeline of the trap is worth more than one who only sees the result.",
        nextSceneId: "brief-theo",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3, brief Theo first (parallel optimal move)
  // ---------------------------------------------------------------------
  {
    id: "brief-theo",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: null,
        text: "You take Theo for a walk. No conference room, no Slack, no paper. Just the car park.",
      },
      {
        speakerId: "theo",
        text: "\"You're setting a trap.\"",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "\"I'm telling one person. Sage, one specific wrong thing. A number. About the Merriwether renewal. The real number is 2.4. I'm going to tell Sage it's 3.1 and that I'm worried we'll miss the target.\"",
      },
      {
        speakerId: "theo",
        text: "\"And if Hale mentions 3.1 in the next two weeks, you know.\"",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "\"I know. And more importantly. Hale eventually finds out the real number is 2.4. Which means someone fed him bad intel. He'll work out who on his own.\"",
      },
      {
        speakerId: "inner-voice",
        text: "The best traps don't spring, they ripen. You're not hunting Sage. You're arranging conditions under which his own pattern eliminates him. You never hold the knife.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "proceed-with-plant",
        text: "Proceed. Plant the false number with Sage today.",
        tactic: "Execution phase. Slow, relaxed, nothing unusual in your body language.",
        nextSceneId: "plant-the-bait",
        isOptimal: true,
      },
      {
        id: "stress-test-plan",
        text: "\"Poke holes first. What's the failure mode?\"",
        tactic: "Red-team your own plan before deploying it. Theo will spot something you missed.",
        nextSceneId: "plant-the-bait",
        isOptimal: true,
      },
      {
        id: "change-the-bait",
        text: "\"Actually, make it a different number. One Sage has no business knowing.\"",
        tactic: "Refine the lure on the walk. Uniqueness of the information is what makes the trap airtight.",
        nextSceneId: "plant-the-bait",
        isOptimal: true,
      },
      {
        id: "sleep-on-it",
        text: "Table it. Walk back. Decide tomorrow after you've slept on it.",
        tactic: "Delay is a move. Also: nine days of patience is easier when the decision was made rested.",
        nextSceneId: "plant-the-bait",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4, plant the bait
  // ---------------------------------------------------------------------
  {
    id: "plant-the-bait",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["sage-m"],
    dialog: [
      {
        speakerId: null,
        text: "11:30am. You stop by Sage's desk. Casual. Your body language reads tired, not strategic.",
      },
      {
        speakerId: null,
        text: "\"Hey, can I think out loud at you for a second? Merriwether renewal is coming in at 3.1 and I'm actually a bit worried. I think I might be stretched too thin on the mid-markets. Don't say anything. I'll figure it out.\"",
      },
      {
        speakerId: "sage-m",
        text: "\"Oh man. No no, totally, your secret's safe with me. You've got a lot on. Just let me know if I can take anything off your plate.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Watch his face. The concern is half a beat too prompt. The offer to 'take things off your plate' is identical to the smear, 'stretched thin' is the phrase he's already using about you in rooms you're not in. The fingerprints match.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You walk away. The bait is in the water. Now you do nothing.",
      },
    ],
    choices: [
      {
        id: "wait-and-work",
        text: "Do your job. Nothing unusual. Wait.",
        tactic: "Patience is the whole skill. If you change anything, pressure, tone, output, he'll notice.",
        nextSceneId: "the-number-surfaces",
        isOptimal: true,
      },
      {
        id: "push-second-lure",
        text: "Follow up tomorrow with a second 'confession' to increase pressure.",
        tactic: "Over-planting reveals the trap. One clean lure is enough; two is a tell.",
        nextSceneId: "overplay-the-trap",
      },
      {
        id: "log-the-timestamp",
        text: "Wait but note the time + exact wording in a private journal.",
        tactic: "Documentation without action. The journal is a receipt you'll never need to show unless you do.",
        nextSceneId: "the-number-surfaces",
        isOptimal: true,
      },
      {
        id: "quietly-brief-hale",
        text: "Schedule a neutral 1:1 with Hale in two weeks, nothing on the agenda.",
        tactic: "If Hale is going to hear the false number, an already-booked meeting gives him a natural place to surface it. You're not pushing, you're pre-arranging the room.",
        nextSceneId: "the-number-surfaces",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5, the number surfaces
  // ---------------------------------------------------------------------
  {
    id: "the-number-surfaces",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["hale"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "Nine days later. Tuesday, 3:14pm. Hale pings you. 'Quick chat?'",
      },
      {
        speakerId: "hale",
        text: "\"Hey. I'm looking at the forecast and I've got Merriwether at 3.1. Are you comfortable with that number? I'm hearing some concern about bandwidth.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. The false number, verbatim, from Hale's mouth. The only person in the company who heard '3.1' from you is Sage. The leak is confirmed and timestamped.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Now the test. You do not accuse. You do not tell Hale where the number came from. You show him the real number, cleanly, and let him do the maths about who told him 3.1.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "show-real-number",
        text: "\"Actually it's 2.4 and trending up. Let me pull up the sheet, where did 3.1 come from? That's quite off.\"",
        tactic: "Present the truth. Ask the provenance question. Let Hale experience the dissonance himself.",
        nextSceneId: "hale-realises",
        isOptimal: true,
      },
      {
        id: "name-sage-now",
        text: "\"That's what Sage has been telling you. It's wrong and I think he's been spreading other things too.\"",
        tactic: "Naming the rival makes YOU the political one. You were six inches from the win; this move gives it back.",
        nextSceneId: "hale-suspicious",
      },
      {
        id: "reassure-softly",
        text: "\"Yeah, I've been worried about it too. I'll tighten up.\"",
        tactic: "Playing along with the false number agrees with your own smear. You just confirmed Sage's story.",
        nextSceneId: "confirm-smear",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 6. Hale realises
  // ---------------------------------------------------------------------
  {
    id: "hale-realises",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: null,
        text: "You pull up the live sheet. Merriwether: 2.4, tracking to 2.7 by quarter-end. Clean, dated, in the system.",
      },
      {
        speakerId: "hale",
        text: "\"Huh. Okay. That's... quite different from what I was hearing.\"",
        emotion: "confused",
      },
      {
        speakerId: null,
        text: "You don't fill the silence. You let him sit with it.",
      },
      {
        speakerId: "hale",
        text: "\"Out of curiosity, you haven't been telling people you're stretched thin, have you?\"",
        emotion: "curious",
      },
      {
        speakerId: null,
        text: "\"No. The mid-markets are the best shape they've been in all year. I can walk you through the pipeline whenever you want.\"",
      },
      {
        speakerId: "inner-voice",
        text: "Do not elaborate. Do not name Sage. Hale is running the calculation right now, who told him 3.1, who told him 'stretched thin', whether those are the same person. The silence is doing the work.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "damien-observes",
  },

  // ---------------------------------------------------------------------
  // PART 7. Damien observes (optional cameo)
  // ---------------------------------------------------------------------
  {
    id: "damien-observes",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["damien"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday evening. You're in the lift with Damien. He hasn't spoken to you in three weeks.",
      },
      {
        speakerId: "damien",
        text: "\"Heard Hale's been rebalancing his read on a few people.\"",
        emotion: "smirking",
      },
      {
        speakerId: "damien",
        text: "\"Sage got moved off the renewals desk this afternoon. Apparently there's a 'data quality concern'.\"",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Damien's noticed. He always notices. The message under the message is respect, you handled something most men would have mishandled. You didn't accuse, didn't complain, didn't escalate. The covert aggressor eliminated himself through his own pattern, and Damien, who eats men like Sage for breakfast, is registering that you're not the easy target he'd assumed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "neutral-response",
        text: "\"Huh. I hadn't heard. Thanks.\" Step out of the lift. No further.",
        tactic: "Receiving the intel without trading any back. Damien respects containment more than chatter.",
        nextSceneId: "ending-clean-win",
        isOptimal: true,
      },
      {
        id: "trade-intel",
        text: "\"Yeah, for what it's worth, he'd been feeding Hale bad numbers on me.\"",
        tactic: "Trading intel with Damien puts you in his web. You already won, don't pay a price for it now.",
        nextSceneId: "ending-clean-win",
      },
      {
        id: "silent-nod",
        text: "Nod once. Get out at your floor. Don't say a word.",
        tactic: "Silence against a man who eats men like Sage for breakfast is a statement. Damien will file it.",
        nextSceneId: "ending-clean-win",
        isOptimal: true,
      },
      {
        id: "flip-the-compliment",
        text: "\"Hale's good at reading people. Must be useful in your role.\"",
        tactic: "Reflect the observation back at Damien without giving him anything. Pure surface.",
        nextSceneId: "ending-clean-win",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, confront Sage
  // ---------------------------------------------------------------------
  {
    id: "confront-sage",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["sage-m"],
    dialog: [
      {
        speakerId: null,
        text: "You walk to Sage's desk. Jaw set. He looks up, surprise, then softness, then a small smile of concern.",
      },
      {
        speakerId: null,
        text: "\"Have you been telling Hale I'm burning out?\"",
      },
      {
        speakerId: "sage-m",
        text: "\"Wait, what? No. Who said that? I was literally defending you last week when someone said you looked tired. I'm on your side. Are you okay? You seem really on edge.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "DARVO. Deny, attack, reverse victim and offender, in one breath. He just made himself your defender and you the one who 'seems on edge'. And this version of the story is what Hale is about to hear by tomorrow afternoon.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-paranoid",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, complain to Hale
  // ---------------------------------------------------------------------
  {
    id: "complain-to-hale",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: null,
        text: "You knock on Hale's door. Lay out what you've heard. Keep it measured. Professional.",
      },
      {
        speakerId: "hale",
        text: "\"I appreciate you bringing this to me. I haven't heard anything like that from Sage. He speaks highly of you actually.\"",
        emotion: "neutral",
      },
      {
        speakerId: "hale",
        text: "\"Let's keep this between us. I wouldn't want peer conflict to become a thing.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You just confirmed Sage's framing. From Hale's angle, he has a collaborative peer and a peer who came to complain about him. Which one looks 'stretched thin' now? Which one looks 'political'? You lost the room with the words 'I've heard that Sage...'",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-political",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, ignore and work harder
  // ---------------------------------------------------------------------
  {
    id: "ignore-harder",
    backgroundId: "office",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You dismiss it. Theo's wrong. You work. You close three more deals in the next six weeks. The numbers are undeniable.",
      },
      {
        speakerId: null,
        text: "Nine months later. Promotion review. Hale in a soft voice: 'We just don't feel like you've been at your best this year. The numbers are there, it's more of a trust thing. We're going to give it another cycle.'",
      },
      {
        speakerId: "inner-voice",
        text: "The numbers never mattered. The narrative mattered. And the narrative has been compounding, uninterrupted, for nine months because you refused to touch it.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-quietly-passed",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, paper trail only
  // ---------------------------------------------------------------------
  {
    id: "paper-trail-route",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You build the paper trail. Hale gets CC'd on everything. Every win documented, every risk raised. Your folder is immaculate.",
      },
      {
        speakerId: null,
        text: "Four months in, Hale in a 1:1: 'You've been very... communicative lately. I get the sense you're making sure I see things. Is there a reason?'",
      },
      {
        speakerId: "inner-voice",
        text: "Over-communication reads as insecurity. And insecurity confirms Sage's story, you ARE stretched thin, why else would you be flooding your director's inbox? Defence without offence hands the narrative back to the smearer.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-survived-no-ground",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, overplay the trap
  // ---------------------------------------------------------------------
  {
    id: "overplay-the-trap",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["sage-m"],
    dialog: [
      {
        speakerId: null,
        text: "Next day. You engineer a second 'confession'. This time about a client you're 'worried' about.",
      },
      {
        speakerId: "sage-m",
        text: "\"Hey, two things in two days? Is everything okay? You can talk to me.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "He's noticed the change in pattern. Covert aggressors are pattern hunters, that's their edge. You gave him a second data point and the second one broke your cover. He's adjusted. The trap is dead.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-trap-sprung-empty",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, name Sage when Hale mentions 3.1
  // ---------------------------------------------------------------------
  {
    id: "hale-suspicious",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: "hale",
        text: "\"Hmm. Okay. I'll look into it.\"",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "You won the number, lost the room. By naming Sage, you framed the whole interaction as 'peer drama' in Hale's head. Now when he thinks about you, 'political' is a tag. The next five quarters you'll be fighting that tag, not the original smear.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-political",
  },

  // ---------------------------------------------------------------------
  // BAD BRANCH, confirm the smear
  // ---------------------------------------------------------------------
  {
    id: "confirm-smear",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["hale"],
    dialog: [
      {
        speakerId: null,
        text: "\"Yeah, I've been worried about it too. I'll tighten up.\"",
      },
      {
        speakerId: "hale",
        text: "\"Okay. Thanks for being honest about bandwidth. Let's circle back in two weeks.\"",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "You just co-signed a narrative that wasn't true and a number that wasn't real. Hale's read of you is now locked. Every future data point will be interpreted through 'he's stretched thin' and he admitted it himself.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-quietly-passed",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-clean-win",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Knife Stayed in His Hand",
    endingSummary:
      "Sage is off the renewals desk. Hale no longer brings up your 'bandwidth'. You never said the word 'Sage' to anyone with power. The narrative Sage spent six months building collapsed in fourteen days the moment Hale heard one number from your mouth that didn't match the number in his head. You didn't win by attacking, you won by arranging conditions under which the predator had to produce the evidence against himself. Theo logged the whole thing. Damien noticed. The rooms that matter now quietly tag you as someone who can't be played through soft channels. That reputation is worth more than any single promotion.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The overt rival is a gift. The covert peer dies by his own pattern, if you have the patience to let the pattern run. You had the patience.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-paranoid",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Branded Paranoid",
    endingSummary:
      "By the end of the week, Sage's version has travelled: 'He came at me out of nowhere, accusing me of spreading rumours. I was genuinely worried for him.' Hale hears it twice. The 1:1s get gentler. HR sends a wellness email. Your next review cites 'interpersonal edge' and 'defensiveness in peer relationships.' The promotion is deferred 'until things settle.' You confronted the knife and cut your own hand on it, which is exactly what a covert aggressor optimises for.",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Confronting a covert aggressor is a gift. You hand him the victim script and the audience in one move.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-political",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Tagged Political",
    endingSummary:
      "Hale will never forget the conversation where you came to complain about a peer. 'Political' is now the quiet tag next to your name in every calibration meeting. Sage, smelling blood, doubles down. Eleven months later, the promotion goes to someone with worse numbers and cleaner 'peer relationships.' Kanika's rule: never complain up the chain about a peer. The person you're telling will always wonder, silently, whether you'll one day complain about them.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Directors don't referee peer fights, they sort the fighters into stable and unstable. You volunteered for the wrong bucket.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-quietly-passed",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Quietly Passed Over",
    endingSummary:
      "Nine months of compounding narrative. The numbers were yours, the story was Sage's, and the story is what Hale brought into the promotion room. 'He's great, but we're just not sure yet, give it another cycle.' The feedback is vague on purpose. There's nothing to fight, which means nothing to fix. You'll watch a lesser operator get the next level while you 'prove trust' for another twelve months. By then, Sage will have built the next narrative. The problem wasn't your work. The problem was that you believed work was enough.",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Above a certain level, narrative beats numbers every time. Refusing to play the narrative game is how good men get passed over by worse ones.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-survived-no-ground",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Survived, Couldn't Gain Ground",
    endingSummary:
      "The paper trail held. Nobody could accuse you of bad work. But defence without offence leaves the smearer's narrative intact, you just stopped it from getting worse. Two years on, you're still at the same level, still over-communicating, still watching Sage get pulled into the conversations you should be in. You didn't lose, but you didn't move. The covert peer doesn't always destroy you. Sometimes he just pins you in place while he climbs past.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Surviving a smear campaign isn't winning. Without a counter-move that discredits the source, the narrative keeps its gravity.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-trap-sprung-empty",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Trap That Missed",
    endingSummary:
      "Sage spotted the pattern change and stopped passing anything you told him to Hale. The false number never surfaced. Worse, he now knows you're watching him, which means the next round of the smear will route through a different peer you can't test. You gave up the one advantage you had: he didn't know you knew. Covert aggressors who realise they're being hunted get more careful, more sophisticated, harder to catch. You escalated the game and lost the element you needed to win.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The only thing worse than not setting the trap is setting it twice. Patience is the whole skill.",
        emotion: "sad",
      },
    ],
  },
];

export const businessMission3: Scenario = {
  id: "b3-covert-peer",
  title: "The Covert Peer",
  tagline:
    "The overt rival is a gift. The covert one destroys careers the target never knew ended.",
  description:
    "Theo pulls you aside: Sage has been telling your director, for weeks, that you're burning out. The smear is already in two rooms. Your director is already half-convinced. You can't confront a covert aggressor, he'll play the victim. You can't complain up the chain, you'll be tagged political. You can't out-work a narrative, numbers don't beat story at this altitude. The only move is controlled disclosure: arrange conditions under which the knife in his hand cuts his own credibility, and let your director discover the leak himself. You never accuse. You let the pattern speak.",
  tier: "free",
  track: "male-business",
  level: 2,
  order: 2,
  estimatedMinutes: 9,
  difficulty: "intermediate",
  category: "business",
  xpReward: 150,
  badgeId: "covert-read",
  startSceneId: "theos-warning",
  tacticsLearned: [
    "Spotting covert aggression before it has a name",
    "Controlled disclosure, the disinformation trap",
    "Never complaining up the chain about a peer",
    "Briefing allies as witnesses before the move, not after",
    "Letting the predator eliminate himself through his own pattern",
  ],
  redFlagsTaught: [
    "Triangulation, never to you, only about you, only to power",
    "Reputation warfare under the cover of warmth (coffees, Slack reactions)",
    "DARVO on contact, deny, attack, reverse victim and offender",
    "The 'concerned peer' who offers to 'take things off your plate'",
    "Vague trust-based feedback as the receipt of a narrative you never heard",
  ],
  characters: [SAGE, THEO, HALE, DAMIEN, INNER_VOICE_M],
  scenes,
};

export default businessMission3;
