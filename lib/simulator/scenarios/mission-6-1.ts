/**
 * Mission 6-1 — "The Credit Thief"
 *
 * Level 6, order 1. Workplace political scenario: your director
 * presents your work as a team effort (coded: his), in front of
 * the CEO. You have ten seconds to decide how to respond — and
 * then several days of micro-political consequences to navigate.
 *
 * v2 (2026-04-19): expanded the middle. Each Act-1 choice now
 * routes through 2-3 intermediate scenes (live meeting micro-
 * reactions + a hallway/Slack aftermath) before reaching an
 * ending. Six endings unchanged; the middle does the heavy
 * lifting now.
 *
 * Total scenes: 14 → ~24
 * Avg dialog lines per playthrough: ~7 → ~22
 */

import type { Scenario, Scene } from "../types";
import { MARCUS, SAGE, KAYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the meeting opens
  // ===================================================================
  {
    id: "meeting-opens",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["marcus", "sage", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Quarterly review. Twelve people around the table. The CEO at the head. Marcus opens the slide deck — your slide deck.",
      },
      {
        speakerId: "marcus",
        text: '"So the team built out a new pricing model this quarter. I\'ll walk us through it."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Across the table, Sage's eyes flick to you for half a second. Kaya doesn't move. The CEO is taking notes.",
      },
      {
        speakerId: "inner-voice",
        text: '"The team" = him. You know how this ends. He\'ll say "we" through the slides and "I" in the Q&A.',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You have about four seconds before the frame sets. Whatever lands first will be true to this room for the next year.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "interrupt-immediately",
        text: '"Quick note — I actually built that model. Happy to walk through it."',
        tactic: "Correct attribution before the frame sets. Risky but direct.",
        nextSceneId: "marcus-reacts",
        isOptimal: true,
      },
      {
        id: "silent-for-now",
        text: "Let him present. Speak only if a specific technical question comes up.",
        tactic: "Preserve the ambush opportunity. Emerge as the expert when needed.",
        nextSceneId: "marcus-stumbles-early",
        isOptimal: true,
      },
      {
        id: "raise-your-hand",
        text: "Raise a hand. Wait until he finishes. Then clarify ownership.",
        tactic: "Late clarification is a complaint, not a correction.",
        nextSceneId: "marcus-dismisses",
      },
      {
        id: "say-nothing",
        text: "Say nothing. Complain to HR later.",
        tactic: "HR sides with the company, not you. You just lost credit permanently.",
        nextSceneId: "meeting-ends-stewing",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — INTERRUPT BRANCH
  // ===================================================================

  {
    id: "marcus-reacts",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus", "kaya"],
    dialog: [
      {
        speakerId: "marcus",
        text: '"Sure — team effort obviously, but yeah, go ahead."',
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "His smile holds. His eyes don't. Across the table, Kaya tilts her head a quarter-degree — she heard the reframe.",
      },
      {
        speakerId: "inner-voice",
        text: "He just rebadged 'you built it' as 'team effort' in front of the CEO. The next sentence out of your mouth either accepts that frame or breaks it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-team-frame",
        text: "\"Thanks.\" Present the model as a team product.",
        tactic: "You accepted the re-frame. Future reviews attribute this to 'the team' — meaning Marcus.",
        nextSceneId: "marcus-controls-narrative",
        isOptimal: false,
      },
      {
        id: "correct-gently",
        text: "\"To clarify — I led the model. Sage ran the data validation.\"",
        tactic: "Name who did what. Gives Sage credit too; cuts Marcus out entirely.",
        nextSceneId: "model-presented",
        isOptimal: true,
      },
      {
        id: "correct-sharply",
        text: "\"It wasn't a team effort. I built it alone.\"",
        tactic: "True but reads hostile. You win this round, lose the relationship with Sage.",
        nextSceneId: "model-presented-harsh",
      },
    ],
  },

  // --- INTERRUPT → ACCEPT-TEAM-FRAME middle ---
  {
    id: "marcus-controls-narrative",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "You walk through the slides. You explain the elasticity model. You answer two questions cleanly.",
      },
      {
        speakerId: "marcus",
        text: '"Right — and just to add to that, the team and I went back and forth a lot on the assumptions."',
        emotion: "smirking",
      },
      {
        speakerId: null,
        text: "He's narrating over you. Every clarification you give, he echoes back as 'we' and 'us'. By slide nine, half the room thinks you're his junior on this.",
      },
      {
        speakerId: "inner-voice",
        text: "You corrected the attribution and then immediately accepted his counter-frame. The interrupt was meaningless. Worse — it made you look territorial AND replaceable.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-team-framed",
  },

  // --- INTERRUPT → CORRECT-GENTLY middle ---
  {
    id: "model-presented",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["marcus", "kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You walk the room through the model. Kaya nods at specific points — she knows exactly which parts you designed.",
      },
      {
        speakerId: "kaya",
        text: '"Clean work. The assumptions on the curve are aggressive — defensible?"',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She's handing you a layup. Kaya doesn't ask questions she doesn't already know the answer to. This is her telling the room you're the one to ask.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "kaya-confirms-publicly",
  },
  {
    id: "kaya-confirms-publicly",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "You walk through the stress-tests. The two failure modes you ruled out. The assumption you'd revisit if rates moved 75bps either way.",
      },
      {
        speakerId: "kaya",
        text: '"That tracks with what I saw. Solid."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The CEO writes something down. Marcus's mouth opens, then closes. The slide moves on without him.",
      },
      {
        speakerId: "inner-voice",
        text: "Kaya just made the credit official. The fastest way to beat a credit thief isn't to fight him — it's to make a senior person validate the truth in the same room.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-attribution-won",
  },

  // --- INTERRUPT → CORRECT-SHARPLY middle ---
  {
    id: "model-presented-harsh",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "The room reads the tension. Marcus's face stays professional; his eyes log it. Sage looks at the table.",
      },
      {
        speakerId: "inner-voice",
        text: "You won the attribution. You also just made it personal in front of twelve people. Two of whom report to Marcus. One of whom is the CFO.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "marcus-grudge-set",
  },
  {
    id: "marcus-grudge-set",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "Meeting ends. Marcus stays seated as the room files out, talking quietly to the CFO. He doesn't look at you.",
      },
      {
        speakerId: null,
        text: "Friday afternoon, your calendar pings: 'Performance check-in — Marcus + you, Monday 10am.' He didn't pick the worst time slot. He picked the one that costs you the most weekend.",
      },
      {
        speakerId: "inner-voice",
        text: "Being right is free. Being right in a way that humiliates a man who controls your salary band has a price tag — and he just sent you the invoice.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "ending-harsh-victory",
  },

  // ===================================================================
  // ACT 2B — SILENT-FOR-NOW BRANCH
  // ===================================================================

  {
    id: "marcus-stumbles-early",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "You stay quiet. Marcus presents slide three, slide four, slide five — surface-level, no real depth on the methodology.",
      },
      {
        speakerId: "marcus",
        text: '"And so the team really focused on getting the demand curve right..."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He gestures at a chart and uses the word 'iterative'. He's stalling. The pages he's most uncertain on are coming up.",
      },
      {
        speakerId: "inner-voice",
        text: "He's reading the slides, not explaining them. The CFO will notice within two more pages. Hold.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "technical-question",
  },
  {
    id: "technical-question",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "Slide 7. The CFO leans forward. \"How are you handling cross-elasticity between SKUs in the same category?\"",
      },
      {
        speakerId: "marcus",
        text: '"Yeah, that\'s — uh —"',
        emotion: "confused",
      },
      {
        speakerId: null,
        text: "Two seconds of silence. Then four. The whole room is waiting.",
      },
      {
        speakerId: "inner-voice",
        text: "He doesn't know. This is the ambush moment. The room is watching the silence stretch — every second past three confirms he didn't build it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "rescue-him",
        text: '"I can take that one."',
        tactic: "Neutral rescue. You answer, get credit for the knowledge, don\'t attack him.",
        nextSceneId: "cfo-probes",
        isOptimal: true,
      },
      {
        id: "rescue-with-flag",
        text: "\"Happy to — I modeled that piece specifically.\"",
        tactic: "Answer + subtly plant ownership flag. Best of both.",
        nextSceneId: "cfo-probes-knows",
        isOptimal: true,
      },
      {
        id: "let-him-fail",
        text: "Don't volunteer. Let him fumble.",
        tactic: "Satisfying but reads as disloyalty. The CEO sees a team not functioning.",
        nextSceneId: "ceo-frowns",
        isOptimal: false,
      },
    ],
  },

  // --- SILENT → RESCUE-HIM middle ---
  {
    id: "cfo-probes",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "You answer the cross-elasticity question cleanly. Then a follow-up. Then two more. By slide 12 you're presenting, not Marcus.",
      },
      {
        speakerId: "inner-voice",
        text: "The room has quietly reassigned who built the model. Marcus didn't lose it. You took it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "meeting-closes-recapture",
  },
  {
    id: "meeting-closes-recapture",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Meeting ends. CEO catches your eye on the way out. \"Send me the model. I want to walk through the assumptions this weekend.\"",
      },
      {
        speakerId: null,
        text: "He says it loud enough for the room to hear. He could have DM'd you. He didn't.",
      },
      {
        speakerId: "inner-voice",
        text: "That single sentence reset the org chart in everyone's head. You are now the person who owns this model — directly to the CEO.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-ambush-won",
  },

  // --- SILENT → RESCUE-WITH-FLAG middle ---
  {
    id: "cfo-probes-knows",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "CFO nods. \"Good. Let's dig in.\" The next 15 minutes are between him and you.",
      },
      {
        speakerId: null,
        text: "Marcus stops speaking. He's still in the room. He's no longer in the conversation.",
      },
      {
        speakerId: "inner-voice",
        text: "Clean re-attribution. Credit flagged early, defended with expertise, earned in front of the CEO.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "marcus-fades",
  },
  {
    id: "marcus-fades",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Slide 14, slide 15 — the CFO addresses you directly each time. Marcus has stopped clicking the slides. Sage took over silently.",
      },
      {
        speakerId: null,
        text: "By the time the meeting closes, Marcus's only contribution to the second half was 'good question, let me have him take that one.'",
      },
      {
        speakerId: "inner-voice",
        text: "You didn't fight him. You let him introduce you to the room as the expert and then took the introduction at face value. He can't undo it without admitting what he did.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-ambush-won",
  },

  // --- SILENT → LET-HIM-FAIL middle ---
  {
    id: "ceo-frowns",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Marcus stalls. The CFO repeats the question, slower. Marcus says \"let me come back to that\" and clicks to the next slide.",
      },
      {
        speakerId: null,
        text: "You feel the CEO's eyes pass over you. He's wondering why his pricing lead can't answer a question about the pricing model. He's also wondering why nobody else on the team is helping.",
      },
      {
        speakerId: null,
        text: "The CEO writes something down. He underlines it.",
      },
      {
        speakerId: "inner-voice",
        text: "You won the small game. Marcus looks bad. So does the team. So do you. The CEO doesn't reward a winner of a fight he didn't want to see — he punishes both fighters equally.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-pyrrhic",
  },

  // ===================================================================
  // ACT 2C — RAISE-YOUR-HAND BRANCH
  // ===================================================================

  {
    id: "marcus-dismisses",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["marcus"],
    dialog: [
      {
        speakerId: null,
        text: "You raise a hand at the natural pause. Marcus sees it. Doesn't acknowledge it. Keeps talking through slide 8.",
      },
      {
        speakerId: "marcus",
        text: '"We can go into ownership details offline. Don\'t want to slow this down."',
        emotion: "cold",
      },
      {
        speakerId: null,
        text: "He said it without looking at you. The slide deck moves on. The credit moves with it.",
      },
      {
        speakerId: "inner-voice",
        text: "He shut you down using 'efficiency' as cover. That phrase is now the room's reason your raised hand was the problem, not his theft.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "hallway-after-dismissal",
  },
  {
    id: "hallway-after-dismissal",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Meeting ends. You're packing up your laptop. Kaya catches your eye in the hallway.",
      },
      {
        speakerId: "kaya",
        text: '"Walk with me."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She's not asking. The fact that she's pulling you into the corridor at all means she saw what you saw.",
      },
      {
        speakerId: "inner-voice",
        text: "Senior person, witnessing the theft, opening a private door. This is the next ten years of your career, depending on what you do in the next ninety seconds.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "find-kaya-now",
        text: '"You saw what just happened. What do I do?"',
        tactic: "Name it. Ask the senior witness what good looks like. Lets her tell you the play she'd back.",
        nextSceneId: "kaya-private-meeting",
        isOptimal: true,
      },
      {
        id: "swallow-it",
        text: "\"I'll handle it.\" Walk away.",
        tactic: "Refusing senior help when it's offered makes you a project for nobody. Including yourself.",
        nextSceneId: "end-of-day-loss",
        isOptimal: false,
      },
    ],
  },
  {
    id: "kaya-private-meeting",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: '"You should have spoken before he opened the deck. You know that."',
        emotion: "knowing",
      },
      {
        speakerId: "kaya",
        text: '"Now you have two options. Build a paper trail and recover the work in writing over the next month. Or escalate now and ask for a public correction. Both have a price."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Documentation is slow but cheap. Public correction is fast but expensive. There is no version of this where it costs nothing — that ship sailed when you raised your hand instead of speaking first.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "document-quietly",
        text: '"Paper trail. I\'ll send a written summary tonight cc\'ing the team."',
        tactic: "Slow recovery. Costs you this quarter's credit; sets up next quarter's.",
        nextSceneId: "next-day-paper-trail",
      },
      {
        id: "request-public-correction",
        text: '"I want a public correction. Can you back me with the CEO tomorrow?"',
        tactic: "Public escalation. You'll get the credit AND the reputation for escalating when you should have spoken in the room.",
        nextSceneId: "ceo-meeting-tomorrow",
      },
    ],
  },
  {
    id: "next-day-paper-trail",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You write the summary that night. Dated. Detailed. Names every contributor and what they did. CC'd to the team and the CFO 'for the record'.",
      },
      {
        speakerId: null,
        text: "Friday morning, the CFO replies-all: 'Helpful, thanks for the detail.' Marcus replies separately, just to you: 'Let's chat Monday.'",
      },
      {
        speakerId: "inner-voice",
        text: "You won the long game. This quarter's credit is gone. Next quarter's is yours, in writing, witnessed by finance. But you also handed Marcus a six-week resentment timer that ends in your one-on-one.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-credit-lost",
  },
  {
    id: "ceo-meeting-tomorrow",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: null,
        text: "Kaya backs you. The two of you sit down with the CEO Tuesday morning. He listens. He nods. He says: 'Got it. I'll address it.'",
      },
      {
        speakerId: null,
        text: "By Wednesday's all-hands, the CEO opens with: 'Wanted to clarify — the pricing model that drove last quarter's wins was led by you, with Sage's data work. Just for the record.'",
      },
      {
        speakerId: null,
        text: "The room hears it. Marcus hears it. The next time he reviews you, he will remember this morning.",
      },
      {
        speakerId: "inner-voice",
        text: "You got the credit and the public correction. You also told the room you escalate to the CEO when you don't get your way. That story will outlive the model.",
        emotion: "neutral",
      },
    ],
    nextSceneId: "ending-harsh-victory",
  },
  {
    id: "end-of-day-loss",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You leave the building. The pricing model is now Marcus's pricing model in every Slack message that goes out for the rest of the week.",
      },
      {
        speakerId: null,
        text: "Sunday evening, Marcus DMs you: 'Hey — wanted to flag the CEO loved the model. Big win for the team. Let's chat Monday about Q4 priorities.'",
      },
      {
        speakerId: null,
        text: "He's wrapping the win in 'team' and pivoting you to the next deliverable before you can object.",
      },
      {
        speakerId: "inner-voice",
        text: "You refused help when it was offered. Now you're isolated, the credit is permanent, and Marcus is your gatekeeper to the next opportunity.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-credit-lost",
  },

  // ===================================================================
  // ACT 2D — SAY-NOTHING BRANCH
  // ===================================================================

  {
    id: "meeting-ends-stewing",
    backgroundId: "office",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "You sit through the rest of the meeting. Marcus closes the deck. The CEO thanks 'the team'. Marcus says 'happy to walk anyone through the methodology one-on-one.'",
      },
      {
        speakerId: null,
        text: "He's already collecting the post-meeting credit conversations. By Monday morning, three executives will have heard him explain the model in his words.",
      },
      {
        speakerId: "inner-voice",
        text: "Credit isn't assigned in the meeting. It's assigned in the hallway after the meeting. He's working that hallway right now while you're packing up.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "private-message-kaya",
        text: "DM Kaya: 'Got a minute? Want to talk about what just happened.'",
        tactic: "Late but not nothing. Kaya may help, but the public frame is already set.",
        nextSceneId: "kaya-pity-coach",
      },
      {
        id: "play-it-cool",
        text: "Don't message anyone. Brood about it tonight. Decide tomorrow.",
        tactic: "By tomorrow, three more rooms will have heard Marcus explain 'his' model. Decide-tomorrow is decide-no.",
        nextSceneId: "quiet-resignation",
        isOptimal: false,
      },
    ],
  },
  {
    id: "kaya-pity-coach",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["kaya"],
    dialog: [
      {
        speakerId: "kaya",
        text: "\"You should have said something in the room. I would have backed you. I can't back you now without it looking like I'm taking sides.\"",
        emotion: "neutral",
      },
      {
        speakerId: "kaya",
        text: '"Best you can do is start writing a one-pager every Friday on what you actually did that week. CC me. Build the trail. Wait for the next theft and react in the moment."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She's offering you a future. She's also confirming the present is gone. The model is Marcus's now in every executive's head — they can't unhear what they heard.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-team-framed",
  },
  {
    id: "quiet-resignation",
    backgroundId: "apartment",
    mood: "danger",
    dialog: [
      {
        speakerId: null,
        text: "Tuesday morning. The all-hands recap goes out. The pricing model is referenced as 'Marcus's pricing initiative' — neutral phrasing, no malice, perfectly accurate to what the room heard.",
      },
      {
        speakerId: null,
        text: "By Friday it's 'the Marcus model' in the project tracker. By the next quarter it's an entry on his promotion case.",
      },
      {
        speakerId: "inner-voice",
        text: "You waited. The credit didn't wait. It went to whoever was willing to claim it in the room — and that wasn't you.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-credit-lost",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================

  {
    id: "ending-attribution-won",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Credit Reclaimed",
    endingSummary:
      "You corrected the frame in the first ten seconds, named Sage's contribution, defended the model in front of the CEO. Kaya made it easy by asking a question she knew the answer to. Marcus walks out of the room less powerful than he walked in. You didn't fight him — you made him irrelevant.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The fastest way to beat a credit thief is to make your expertise undeniable in the same room. Frame first. Names second. Senior witnesses third.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-ambush-won",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Ambush Paid",
    endingSummary:
      "You let him open. He stalled. You stepped in at the exact moment his bluff collapsed and the CFO needed an answer. By the end of the presentation, the CEO was asking you questions directly — and asked for the model on his weekend reading list, in front of the room. Marcus can't reframe this. The room saw who knew the answers.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Patience is a weapon. Let them walk onto the stage unprepared, then let the stage do the unmasking.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-harsh-victory",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Victory With Interest",
    endingSummary:
      "You got the credit. You also painted yourself as someone who escalates publicly when crossed. Marcus controls your reviews, your promotion, your bonus, and the budget for your team. You won today. He has twelve months to retaliate, and the org chart says he gets to. Whether this was worth it depends on how close you were to leaving anyway.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Being right is free. Being right in a way that makes a political enemy isn't.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-credit-lost",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    endingTitle: "It's His Model Now",
    endingSummary:
      "By the end of the quarter, 'Marcus's pricing model' is canonical in every follow-up meeting. You built it. Nobody remembers. Next review cycle, your contribution line reads 'supported the pricing initiative.' You're now competing with your own director for your own work.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "If you don't attribute your work in the room where credit is assigned, someone else will do it for you.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-team-framed",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "'The Team' Took the Win",
    endingSummary:
      "You presented the model — but accepted 'team effort' as the frame. On the quarterly write-up, 'the team' is shorthand for 'Marcus's group'. On LinkedIn, Marcus mentions 'leading the pricing redesign.' By next quarter he's been promoted for it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'Team effort' is the phrase credit-thieves use to legally steal your work.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-pyrrhic",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control: How Emotional Dependency Is Built",
    endingTitle: "You Won By Disloyalty",
    endingSummary:
      "You let Marcus fumble. The CEO noticed — and saw the whole team look dysfunctional, including you. The CEO's takeaway: 'That group doesn't run cohesively.' Your director will remember your silence as sabotage, even if nobody else does.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Loyalty is also leverage. Withholding it strategically only works when nobody notices you withheld.",
        emotion: "sad",
      },
    ],
  },
];

export const mission61: Scenario = {
  id: "mission-6-1",
  title: "The Credit Thief",
  tagline: "He's about to present your work as his.",
  description:
    "Quarterly review. The CEO is watching. Marcus opens the deck you built and says 'the team pulled this together.' You have ten seconds to decide whether to correct him now, ambush him on a technical question, or lose the work permanently — and then several days of micro-political consequences to navigate.",
  tier: "premium",
  level: 6,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "advanced",
  category: "professional",
  xpReward: 275,
  badgeId: "credit-reclaimed",
  startSceneId: "meeting-opens",
  tacticsLearned: [
    "Early attribution before the frame sets",
    "Technical ambush — let them open, then step in",
    "Naming collaborators to neutralize 'team effort' re-frames",
    "Using senior allies (Kaya) as setup artists and witnesses",
    "Documentation as a slow-recovery instrument",
  ],
  redFlagsTaught: [
    "'Team effort' as attribution-theft vocabulary",
    "Directors who say 'we' for wins and your name for losses",
    "HR as a credit-recovery mechanism (it isn't)",
    "Quiet coworkers who take notes and know whose ideas those notes become",
    "The hallway after the meeting as the actual credit-assignment venue",
  ],
  reward: {
    id: "credit-reclaimed",
    name: "Credit Reclaimed",
    description: "You made the room reassign the work to the person who did it.",
    unlocksScenarioId: "mission-6-2",
  },
  prerequisites: ["mission-5-2"],
  characters: [MARCUS, SAGE, KAYA, INNER_VOICE],
  scenes,
};

export default mission61;
