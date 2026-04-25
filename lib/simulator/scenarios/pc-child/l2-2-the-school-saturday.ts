/**
 * pc-2-2 — "The School Saturday"
 *
 * PC-Child track, Level 2 (age 10), order 2. Companion to pc-2-1.
 * Where pc-2-1 was the principal's call and the meeting that bought
 * the next five years of alliance, pc-2-2 is the ordinary Saturday
 * morning one year later. The household log has, by now, twelve
 * months of dated entries. The specialist relationship is steady.
 * The marriage is holding. Lily is 8. Finn is 11.
 *
 * The scenario teaches what nobody warns you about: the ordinary
 * morning is the harder register. Crisis has shape; Saturday has
 * none. The pc-child read between you and your partner is now, a
 * year in, embedded in the small operational decisions you make
 * before 10 a.m. — who walks Lily to her swimming class, who
 * supervises Finn's screen time, what counts as "an unsupervised
 * hour" in a way that is not visible to either child.
 *
 * Mandatory content gate. Voice: clinical-domestic. The scenario
 * does not depict crisis; it depicts the cost of ongoing
 * surveillance. Some readers will find this register heavier than
 * the crisis ones because it does not resolve; it just continues.
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import {
  INNER_VOICE,
  THE_PARTNER,
  CHILD_5,
  SIBLING_YOUNGER,
} from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This is the second age-10 scenario in the pc-child track. Where pc-2-1 was a crisis (the principal's call), this scenario is an ordinary Saturday morning — the register some readers find heavier because it doesn't resolve, it just continues.",
      },
      {
        speakerId: null,
        text: "It depicts the cost of one year of household-log discipline: the small operational decisions you and your partner make before 10 a.m. that are invisible to both children but are the load-bearing infrastructure of the household. No incident happens on-screen. The teaching is the steady-state.",
      },
      {
        speakerId: null,
        text: "If the right scenario for you tonight is a crisis-shape one, this is the wrong one. Come back when steady-state is what you have bandwidth to look at.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Saturday, 8:14 a.m. Kitchen. Coffee on. Lily at the table. Finn upstairs. Your partner at the bench.",
        nextSceneId: "saturday-morning",
      },
      {
        id: "exit-gate",
        text: "Exit.",
        tactic: "The scenario will hold.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingLearnPrompt:
      "The opt-out is a complete move. Steady-state register requires its own bandwidth — the absence of a crisis can be heavier than a crisis when the bandwidth isn't there. Come back when it is.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The scenario holds.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // SATURDAY MORNING
  // ===================================================================
  {
    id: "saturday-morning",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "sibling-younger", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 8:14 a.m. The kitchen. Lily is at the table with cereal and a book about a horse. Your partner is making coffee at the bench. Finn is upstairs — has been since 7:40, awake earlier than that. The household log is open on the laptop on the side counter.",
      },
      {
        speakerId: "the-partner",
        text: '"Finn ate at 7:50. Took an apple. Asked for the iPad — said no, said weekend rules, no screen until 10. He went up without arguing."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Three pieces of operational data, delivered at 8:14 a.m. on a Saturday, in the casual voice of someone who has been doing this for a year. The without-arguing is the data point — Finn arguing would mean the morning was Finn-shaped. The without-arguing means today is, possibly, a Saturday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "log-the-three-data-points",
        text: "Walk to the laptop. Log: '7:50 ate; 7:55 asked iPad, refused without argument; upstairs since 7:55.'",
        tactic: "The log is the muscle. The three data points are not interesting on their own; they become interesting in three months when a Sunday-morning incident wants to be re-narrated and the dated log holds the memory of an entire year of without-arguing mornings.",
        nextSceneId: "logged",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "trust-the-without-arguing",
        text: 'Pour coffee. Say: "good. Lily, what is happening on page seventy-three of the horse book."',
        tactic: "The trust move is warm and present, and on a regular family it is the right one. In a pc-child household, skipping the log is the small invisible cost — three months from now the data is not retrievable. Combine: log briefly, then ask Lily about the horse.",
        nextSceneId: "skipped-the-log",
        isOptimal: false,
      },
      {
        id: "go-check-on-finn",
        text: "Go upstairs. See what he's doing.",
        tactic: "The go-check is a surveillance move that the without-arguing suggests is unnecessary today. Going up sends a small signal to Finn — your partner just established weekend rules without argument; arriving thirty seconds later is a check on your partner's read more than a check on Finn.",
        nextSceneId: "checked-too-soon",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // LOGGED
  // ===================================================================
  {
    id: "logged",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "sibling-younger", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "8:17 a.m. The three data points are in the log. You close the laptop. You pour coffee. You sit down at the table next to Lily. She turns the book to show you a watercolour drawing of a horse mid-jump.",
      },
      {
        speakerId: "sibling-younger",
        text: '"This one is called Whisper. She is eight, like me, but in horse years she is twenty-eight."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Lily's life is currently uncomplicated. The pc-child household that surrounds her does not require her to be uncomplicated, and the steady-state of the last year has, in fact, given her enough operational quiet for her to be eight in the way an eight-year-old is. The operational discipline is also what protects this morning.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "swim-class-conversation",
        text: 'To your partner: "Swim class — you taking, or me? Both of us?"',
        tactic: "The Saturday operational handoff happens at coffee, not at the door. Booking who does what at 8:18 prevents the 9:42 small misunderstanding about who is supervising which child at which moment.",
        nextSceneId: "swim-handoff",
        isOptimal: true,
      },
      {
        id: "linger-with-lily",
        text: "Stay with Lily and the horse book. The handoff can wait.",
        tactic: "Tempting, but the handoff at 9:42 instead of 8:18 is a recurrent small failure mode. Operational decisions made at the door are the ones that produce the unsupervised-hour gaps. Book at coffee.",
        nextSceneId: "handoff-late",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SWIM HANDOFF
  // ===================================================================
  {
    id: "swim-handoff",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"I was going to take Lily — gives me an hour with her one-on-one. You stay with Finn? Screen time at 10, I would put it at thirty minutes max today."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The proposal is structurally sound. You with Finn for the morning, your partner with Lily — same roles you ran last Saturday and the Saturday before. The thirty-minute screen cap is your partner's specific judgement; you don't need to relitigate it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "agree-and-name-window",
        text: '"Yes. I will be with him from 10 to noon — outside walk after the screen-time, weather looks fine."',
        tactic: "The yes plus the named window. 'I will be with him from 10 to noon' converts the agreement into an operational commitment your partner can plan against. The walk after screens is a small additional structural choice that the partner doesn't need to ask for.",
        nextSceneId: "specific-handoff-set",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "agree-vague",
        text: '"Yes, sure."',
        tactic: "The vague yes is fine for an ordinary household; in a pc-child household the vague leaves a one-hour gap your partner cannot plan against. Specifics are the discipline.",
        nextSceneId: "vague-agreement",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE QUIET TWO HOURS
  // ===================================================================
  {
    id: "specific-handoff-set",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "9:48 a.m. Your partner and Lily have left for the swim class. The house is quiet. You are at the table with the second coffee and the laptop. Finn comes downstairs at 9:52 — you hear his step on the third stair, the one that creaks, before you see him.",
      },
      {
        speakerId: "child-5",
        text: '"Hi. Can I do my screen time now?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Finn is asking eight minutes before the rule allows. Not arguing it; just asking. The structural answer is: rule is the rule, eight minutes is not a stretch — say no, suggest the eight minutes go to something else. The relational answer matters too — eight minutes early is not a confrontation move, it is an eleven-year-old being eleven.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "rule-as-stated",
        text: '"Ten on the dot. What do you want to do for eight minutes — toast, talk to me, walk to the corner?"',
        tactic: "Hold the rule + offer three concrete alternatives. The alternatives convert the eight-minute gap from a 'denied' into an 'offered.' Eleven-year-olds do not want abstract empathy; they want specific things to do for the next eight minutes.",
        nextSceneId: "rule-held",
        isOptimal: true,
      },
      {
        id: "give-the-eight",
        text: '"Sure, go ahead."',
        tactic: "The eight-minute concession is not, on its own, a problem. The pattern it would build across a Saturday — '8 minutes early on screens, 12 minutes longer on screens, 7 minutes past the walk' — is the cumulative drift the household-log is built to prevent. The rule was the right rule.",
        nextSceneId: "eight-conceded",
        isOptimal: false,
      },
      {
        id: "lecture-the-rule",
        text: '"You know the rule, Finn. We talked about this last week. Why are you asking again?"',
        tactic: "The lecture-the-rule move is the irritated-parent register. Finn is not testing the rule; he is asking eight minutes early. Treating the ask as a violation produces the very confrontation the morning has avoided.",
        nextSceneId: "lecture-given",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RULE HELD
  // ===================================================================
  {
    id: "rule-held",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"Toast. Then I will read until ten."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He pulls the bread out himself. He puts it in the toaster. He waits at the counter. He does not start a conversation. Neither do you. The kitchen is quiet for eight minutes. At 10:00 he gets up, takes the iPad off the side table, sits in the armchair, opens it. Half an hour exactly. At 10:30 he closes it without being told and goes outside without being told. The walk you mentioned to your partner happens without your prompt.",
      },
      {
        speakerId: "inner-voice",
        text: "Twelve months of this exact register — small specific holds, no escalation, no concession, no lecture — has produced a Saturday morning in which Finn closes the iPad on time without being told. The data is small, not narratively interesting, and absolutely the operational point.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "log-the-saturday",
        text: "Log it. '10:00–10:30 screens, closed at 10:30 unprompted, walked outside without prompt.'",
        tactic: "The unprompted is the data point. It is the kind of entry that, three years from now, in a teenage moment that wants to be re-narrated, holds the structural memory of a Saturday in October when an eleven-year-old put the iPad down on his own.",
        nextSceneId: "ending-the-saturday-held",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES
  // ===================================================================
  {
    id: "skipped-the-log",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The morning continues fine. Three months from now an incident wants the data and the data is not in the log. The cost is precise and small and only visible later.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "log-it-now",
        text: "Walk back to the laptop. Log it now.",
        tactic: "Recovery is free at 8:18 — the data is fresh. Five seconds of muscle memory.",
        nextSceneId: "logged",
        isOptimal: true,
      },
    ],
  },

  {
    id: "checked-too-soon",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You go upstairs. Finn is in his room reading. He looks up. He says, 'I am reading.' You say, 'OK, just checking.' You leave. The exchange takes nine seconds. He goes back to the book.",
      },
      {
        speakerId: "inner-voice",
        text: "The signal you sent: your partner's call about screen time was not enough; you needed to verify. Finn read it. He won't say anything. He will, very slightly, register that the without-arguing is now a controlled variable rather than a stable one. The cost is small but real.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "back-downstairs-and-log",
        text: "Go downstairs. Log the morning.",
        tactic: "Recovery: the check happened, do not double down. Return to the structural pattern.",
        nextSceneId: "logged",
        isOptimal: true,
      },
    ],
  },

  {
    id: "handoff-late",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "9:42 a.m. Your partner is at the door with Lily and the swim bag. The conversation about who-takes-Lily and who-stays-with-Finn happens in twenty seconds in the hallway. There is a moment of friction about screen-time timing because neither of you has explicitly named it. Lily is in the doorway; Finn is upstairs. The door closes; the morning continues, slightly less smoothly than the previous Saturday.",
      },
      {
        speakerId: "inner-voice",
        text: "The 9:42 hallway handoff is the recurring small cost of skipping the 8:18 coffee handoff. The morning is recoverable; the muscle memory next Saturday is what to fix.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "salvage-the-morning",
        text: "Take the morning. Stay with Finn. Log the data points as they arrive.",
        tactic: "The salvage is fine. The pattern-correction lives in next Saturday's 8:18.",
        nextSceneId: "specific-handoff-set",
        isOptimal: true,
      },
    ],
  },

  {
    id: "vague-agreement",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"OK — call me if anything weird, I will be home by 11:15."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The vague yes left the operational window underspecified. Your partner is now operating off the assumption that you are with Finn for the whole morning; your own internal model has 'I'll be around.' The mismatch is small and recoverable but is the exact pattern that produces the unsupervised-hour gap on a different Saturday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "tighten-now",
        text: '"Wait — to be specific: I am with him from 10 to noon. Walk after screens."',
        tactic: "Recovery at the door is free. Specifying now beats the call from your partner at 11:08 asking 'where is he.'",
        nextSceneId: "specific-handoff-set",
        isOptimal: true,
      },
    ],
  },

  {
    id: "eight-conceded",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Finn is on the iPad at 9:52. He will go past 10:30 by approximately 14 minutes without being told. The walk-after will not happen unless you prompt it. The morning continues and is not bad; it is not the Saturday-without-arguing the operational discipline produces. The cost is the precedent for next week.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "let-it-ride",
        text: "Let the morning play out.",
        tactic: "The recovery comes next Saturday; the discipline of the 8-minute hold is restored when you reset the rule before the next request.",
        nextSceneId: "ending-eight-conceded",
        isOptimal: false,
      },
      {
        id: "reset-mid-morning",
        text: '"Actually — let us reset. Ten on the dot, thirty minutes, walk after."',
        tactic: "Mid-morning reset is awkward but not impossible. Finn will be slightly annoyed; the rule resets. Better than letting the precedent sit through next Saturday.",
        nextSceneId: "ending-mid-reset",
        isOptimal: true,
      },
    ],
  },

  {
    id: "lecture-given",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5", "inner-voice"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"OK, sorry."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He goes back upstairs. The conversation took nineteen seconds. He does not come back down at 10:00 for screens; you do not call him. The 30 minutes of screen time happens at 10:42 instead. The walk does not happen. The morning is operationally fine and emotionally slightly off.",
      },
      {
        speakerId: "inner-voice",
        text: "The lecture made the structural rule about your irritation rather than the rule. Finn read it precisely; he is eleven. The 'OK, sorry' was a register-correction, not a real apology, and the cost is the small distance for the rest of the morning.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "repair-the-morning",
        text: "Go upstairs at 10:35. Knock. Say: 'Sorry — that was my register, not the rule. Want to do the walk?'",
        tactic: "The specific repair: name the misstep without overcorrecting, offer the walk as the structural reset. Finn at 11 will accept this cleanly.",
        nextSceneId: "ending-repair-walked",
        isOptimal: true,
      },
      {
        id: "let-the-morning-end",
        text: "Let the morning end without repair.",
        tactic: "The cost is small but accumulates. The next Saturday opens with a slightly different temperature.",
        nextSceneId: "ending-no-repair",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-the-saturday-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Saturday Held",
    endingLearnPrompt:
      "Twelve months of household-log discipline produces a Saturday in which an eleven-year-old pc-child closes the iPad on time without being told. The data is small, not narratively interesting, and absolutely the operational point. Steady-state register is the heaviest one because it does not resolve; it just continues. The walk happened. The rule held. The log is current.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "10:32 a.m. Finn is outside. The log is updated. Your partner is back at 11:11 with Lily. The morning held the way the previous fifty-one Saturdays have held: structurally, quietly, without argument.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-eight-conceded",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Eight-Minute Drift",
    endingLearnPrompt:
      "The eight-minute concession produced a fourteen-minute over-run by lunchtime and a missed walk. None of it was bad; all of it was drift. The pc-child household runs on the cumulative discipline of small specific holds. The recovery lives in next Saturday's 9:52 ask — the rule is the rule, eight minutes is not a stretch, here are three things you can do for eight minutes.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Drift, not failure. The next Saturday's 9:52 holds tighter than this one did. The log captures the drift so the pattern is visible.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-mid-reset",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Mid-Morning Reset",
    endingLearnPrompt:
      "Mid-morning resets are awkward but not impossible. Finn at 11 will accept a clean rule-restoration if it is delivered without irritation: 'let us reset' is the right register. The drift was caught before it became the Saturday; the structural pattern is intact for next week.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Reset clean. Walk happened. The log records the concession + reset honestly so next Saturday's 9:52 is calibrated.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-repair-walked",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Repair Walked",
    endingLearnPrompt:
      "Naming the misstep without overcorrecting is the specific repair register. 'That was my register, not the rule' separates the parent's emotional state from the structural rule, which is the move pc-children read accurately at every age. The walk that did not happen at 10:30 happened at 10:42 with a slightly better foundation than the original walk would have had.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walk taken. Repair clean. The morning ends warmer than the lecture suggested it would.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-no-repair",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Small Distance",
    endingLearnPrompt:
      "Unrepaired small frictions accumulate into a slightly different temperature next Saturday. The lecture wasn't a catastrophe; the absence of repair lets the temperature shift become the new baseline. Repair is cheap when it happens within the same morning; it is expensive after that.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Morning ends without repair. The next Saturday opens slightly cooler. The log records the day honestly so the pattern is visible.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const pcChild22: Scenario = {
  id: "pc-2-2",
  title: "The School Saturday",
  tagline: "Saturday, 8:14 a.m. Twelve months of household-log discipline. The morning has shape.",
  description:
    "Companion to pc-2-1. Where the principal's call was a crisis, the school Saturday is the steady-state — the ordinary morning one year in. The household log is current, the marriage is holding, the specialist relationship is steady. The scenario teaches what nobody warns you about: ongoing discipline is the heavier register because it doesn't resolve, it just continues. Mandatory content gate. The teaching is the absence of incident.",
  tier: "vip",
  track: "pc-child",
  level: 2,
  order: 2,
  estimatedMinutes: 13,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 380,
  badgeId: "the-saturday-held",
  startSceneId: "content-gate",
  prerequisites: ["pc-2-1"],
  tacticsLearned: [
    "The steady-state log entry — the unremarkable data point that becomes load-bearing in three years",
    "The 8:18 coffee handoff — booking the operational morning before the door rather than at it",
    "Holding the rule + offering three concrete alternatives — eleven-year-olds want specific things to do, not abstract empathy",
    "Naming the misstep without overcorrecting — 'that was my register, not the rule' separates parent state from structural rule",
  ],
  redFlagsTaught: [
    "The eight-minute concession that builds into a fourteen-minute over-run by lunch",
    "The lecture-the-rule move that converts an ordinary ask into a confrontation",
    "Skipping the log on a non-incident morning, leaving the data unrecoverable in three months",
    "The 9:42 hallway handoff producing the specific window the unsupervised-hour gap will live in",
  ],
  characters: [INNER_VOICE, THE_PARTNER, CHILD_5, SIBLING_YOUNGER],
  scenes,
};

export default pcChild22;
