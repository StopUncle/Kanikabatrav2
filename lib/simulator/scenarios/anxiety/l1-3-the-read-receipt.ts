/**
 * anx-1-3 — "The Read Receipt"
 *
 * Anxiety track, Level 1, order 3. Friday evening, four days after
 * Noor sent you a photo of a man she thinks you should consider. You
 * read the message. You have not replied. The anxious-attached loop
 * has, in the four days, pivoted from Theo (the ex) to Ash (a man
 * you have not met).
 *
 * Teaches:
 *  - Naming the ruminating-in-advance pattern that sabotages dates
 *    before they happen
 *  - The date-scheduling motor habit — reply-within-24h rule for
 *    Noor-vetted introductions
 *  - Meeting a new person from a nervous-system position of curiosity
 *    rather than hypervigilance
 *  - Distinguishing real incompatibility from catastrophising
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NOOR, THE_CRITIC } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the four-day silence
  // ===================================================================
  {
    id: "friday-evening",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Friday, 6:42 p.m. You are on the couch. You have not turned any lights on yet. Your phone is in your lap, thread with Noor open, and you are looking at a photo she sent on Monday afternoon that you have opened, you estimate, between forty and sixty times over the last four days.",
      },
      {
        speakerId: null,
        text: "The photo is of a man named Ash. He is, by every measure you can see from a photograph, a specific variety of unthreatening attractive. Noor's text below the photo reads: 'no pressure but he reads books, you would eat him alive, he asked if i knew anyone.'",
      },
      {
        speakerId: "inner-voice",
        text: "Clock what has happened in the last four days. On Monday Noor sent you a low-stakes introduction to a man whose face she thinks you will like. Four days later, you have not replied. You have also not done nothing — you have, in the four-day interval, developed approximately eleven imagined scenarios in which this date goes poorly and two imagined scenarios in which it goes well. The ratio is not the data. The existence of eleven pre-imagined scenarios for a man you have not met is the data.",
        emotion: "knowing",
      },
      {
        speakerId: "the-critic",
        text: "Obviously he is going to be disappointed in the real version of you. Obviously you look better in photos. Obviously Noor is trying to be kind and Ash is being polite. Obviously —",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic has been running this loop for four days while you were technically doing other things. This is the hidden form of the anxiety — not the 3 a.m. version you can identify, but the low-grade background rumination that turns a simple Yes-or-No text into a four-day occupation of your attention.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-now",
        text: "Reply now. Keep it short. 'Sure, send him my number.'",
        tactic: "The 24-hour rule was broken on Tuesday; the four-day delay has cost you nothing yet with Noor, but it has cost you the four days. Close the decision now.",
        nextSceneId: "replied-clean",
        isOptimal: true,
      },
      {
        id: "ask-noor-questions",
        text: "Text Noor: 'ok send him my number — also tell me three things about him you did not put in the first text.'",
        tactic: "Extract the data that would have helped you reply on Monday. Noor will give it. You are not asking Ash to prove himself; you are asking your friend to share what she already knows.",
        nextSceneId: "noor-dossiers",
        isOptimal: true,
      },
      {
        id: "decline-cleanly",
        text: "Text Noor: 'thanks for thinking of me — not right now, i am not ready for new people.'",
        tactic: "A real no, if it is a real no. Noor will respect it. The question is whether it is an actual no or an anxious no dressed as a real one — those are different categories and Noor cannot tell them apart for you.",
        nextSceneId: "self-audit",
      },
      {
        id: "keep-stalling",
        text: "Close the phone. You will deal with it this weekend. It's only been four days.",
        tactic: "The stalling is the spiral. Monday will arrive and you will have added the weekend to the silence and the number has not changed. Only the weight has.",
        nextSceneId: "ending-stalled-out",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — replied clean
  // ===================================================================
  {
    id: "replied-clean",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: null,
        text: "You type the reply in about nine seconds. You send. The entire act, from thumb to sent, takes less than fifteen seconds.",
      },
      {
        speakerId: "noor",
        text: '"oh good. i was going to send you a meme about this on monday. sending him your number now."',
        emotion: "happy",
      },
      {
        speakerId: "noor",
        text: '"one ground rule — meet at bar quinn\'s, i have been there with you, the staff know you, it is a home-field. do not let him pick somewhere."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor just handed you two operational rules in under twenty seconds. One — the venue matters, and a venue you have anchored in before is measurably better for your nervous system than a neutral one. Two — you do not let him pick. The 'do not let him pick' is not controlling; it is the specific move that, on a first date, keeps you from spending an hour in a place whose layout, lighting, and staff are unfamiliar while also trying to read a stranger's face.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-date-scheduled",
  },

  // ===================================================================
  // ACT 2B — noor dossiers
  // ===================================================================
  {
    id: "noor-dossiers",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"okay. one — he reads nonfiction, political stuff, not the weird kind. two — he was married for three years in his late twenties, divorced cleanly, no kids, spoke about his ex in normal sentences when i asked. three — he does not drink much, he is not weird about it, he just does not."',
        emotion: "serious",
      },
      {
        speakerId: "noor",
        text: '"thing i would not have said unprompted — he reminds me a small amount of theo in appearance, nothing in temperament. i debated mentioning it. you will notice. i wanted you to know before the date."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor just gave you four pieces of high-value information — two about who he is (reader, divorced-clean), one about an ordinary-people habit (does not drink much), and one meta-observation (the Theo resemblance, flagged so it does not ambush you). This is what a steady friend does when you ask for the data she already had. Send Ash a short message. You have the context you needed.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "replied-clean",
  },

  // ===================================================================
  // ACT 2C — self-audit on the decline
  // ===================================================================
  {
    id: "self-audit",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You close the phone without sending. You sit for a minute. Something about the sentence you were going to send did not feel quite true.",
      },
      {
        speakerId: "inner-voice",
        text: "Two possible sentences were on offer. One — 'I am not ready for new people' — is a real sentence some people say in some weeks and it is correct. Two — 'I am scared and saying I am not ready so that I do not have to do the scared thing' — is a different sentence. Both live in the same five words. Only you know which you were about to send.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "A quick diagnostic. If Ash, magically, had a terrible job, a boring face, and a reputation for lateness, would you still decline? If yes, the decline is real. If the decline is specifically because he reads books and looks like someone you could like, the decline is the anxiety wearing the coat of a boundary.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "its-real",
        text: "It is a real no. I am in a specific season that is not about Ash. Send the decline.",
        tactic: "Real self-knowledge. A no that knows itself is a different artefact than an anxious no. Noor will respect it without follow-up.",
        nextSceneId: "ending-real-no",
        isOptimal: true,
      },
      {
        id: "its-fear",
        text: "It is fear wearing a boundary's coat. Reply to Noor with a yes instead.",
        tactic: "The hard read. Diagnosing yourself accurately in the moment of a decision is a specific discipline. Most people cannot do it until after the decline has been sent.",
        nextSceneId: "replied-clean",
        isOptimal: true,
      },
      {
        id: "cannot-tell",
        text: '"I genuinely cannot tell. Text Noor for a read."',
        tactic: "Route the ambiguity through the steady friend. Noor will read you accurately because she has watched you run this loop before.",
        nextSceneId: "noor-reads-decline",
        isOptimal: true,
      },
    ],
  },

  {
    id: "noor-reads-decline",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"real talk. you have been off new people since theo. that is a real season. it is also, now, february — four months. you get to be off new people and you also get to notice that the off-ness has a cost. only you know if the cost is worth paying for another four months."',
        emotion: "serious",
      },
      {
        speakerId: "noor",
        text: '"i am not going to tell you yes or no. i will tell you this — ash is not the version of man who will make a fuss if you say no. he will be briefly disappointed, he will move on, he will not be waiting in your dms in six months like theo was."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor declined to decide for you. She also gave you two calibrating data points — you are four months in to a real season, and Ash is a low-stakes yes if you want to take one. That second data point is structurally useful; it tells you the cost of wrongly saying yes is small, which tips the asymmetry in favour of the yes if you cannot tell.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "self-audit-resolved",
  },

  {
    id: "self-audit-resolved",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You sit with it for another minute. The uncertainty does not resolve the way you thought it would. What resolves instead is the realisation that you were going to spend the next four months avoiding this exact decision on some other Monday about some other man, and that the avoiding is the thing that is actually costing you weeks.",
      },
    ],
    choices: [
      {
        id: "yes-anyway",
        text: "Yes. Noor gets the short reply. Ash gets a message from her in the next hour.",
        tactic: "The yes-after-audit is a different category of yes than the default yes. You have actually thought about it. That changes how you show up on the date.",
        nextSceneId: "replied-clean",
        isOptimal: true,
      },
      {
        id: "no-after-all",
        text: "No. I did the audit and the no held. Send the decline clearly.",
        tactic: "An audited no is an adult no. Noor will respect it without any 'are you sure' follow-up. Save the decision text; you will recognise this pattern again.",
        nextSceneId: "ending-real-no",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 3 — the date scheduled (convergence)
  // ===================================================================
  {
    id: "the-date-scheduled",
    backgroundId: "text-screen",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Ash texts you at 8:09 p.m. You do not know his rhythm yet. You do not know his jokes. You do not know what he is like under pressure. The text reads, simply: 'Noor just connected us. I am free Tuesday or Wednesday evening. Bar Quinn's, per Noor. What works?'",
      },
      {
        speakerId: "inner-voice",
        text: "Read the text as a sample. Short. Direct. Venue accepted without argument. Two options offered — not 'what works for you,' which is the lazy version, but specific days with a specific place. This is how an uncomplicated man sets up a first date. The specifics are a positive signal, not a controlling one. Note the distinction.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pick-quickly",
        text: "Reply within a minute. 'Tuesday, 7 p.m. works. See you there.'",
        tactic: "The reply matches his register — short, direct, specific. You are signalling that you handle first-date logistics like an adult, which is the low floor most first dates fail to clear.",
        nextSceneId: "pre-date-rumination",
        isOptimal: true,
      },
      {
        id: "ask-about-him",
        text: "Reply with questions first. 'Tuesday works — what's your week been like?'",
        tactic: "Warm but off-topic. Turns a logistical exchange into a pre-date conversation. Some men thrive in that register; some find it fatiguing. Noor has not told you which Ash is.",
        nextSceneId: "ash-light-conversation",
      },
      {
        id: "over-plan",
        text: "Reply with 'Tuesday, I'll look at the menu and message you later with preferences for us?'",
        tactic: "Over-planning the first date as an anxiety discharge. The preference-negotiation is not necessary and sends a signal about your discomfort that you do not want to send.",
        nextSceneId: "over-planned",
      },
    ],
  },

  {
    id: "pre-date-rumination",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Saturday. Sunday. Monday. Three days between the sent reply and the date. In each of those three days, your brain produces, on average, four new imagined-date scenarios — three failure modes and one neutral. The ratio has improved from the four-day pre-reply weeks. The noise is still there.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously the morning of the date you will look like you have not slept. Obviously you will say something stupid in the first ten minutes. Obviously he is going to mention his ex-wife and you are going to have a specific kind of feeling about it —",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic is doing its work. Three days of pre-date rumination at four scenarios per day is a hundred and twenty minutes of imagined date content. The actual date will be ninety minutes. You are about to have spent more time imagining it than experiencing it, and the imagined version will colour the experienced version unless you specifically intervene.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The intervention is small. Name each scenario as it arrives. 'That is a failure-scenario. Noted.' Do not argue with it. Do not reassure yourself. Do not tell the Critic it is wrong. Just name it as a piece of furniture your brain is producing and keep walking. The naming is the skill.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-each-one",
        text: "Use the three days to name each scenario as it arrives. Do not engage. Just name.",
        tactic: "The canonical move. Turns the background rumination into a foreground diagnostic. By Tuesday morning you will have a rough count and a rough shape.",
        nextSceneId: "ending-showed-up-clean",
        isOptimal: true,
      },
      {
        id: "distract",
        text: "Fill the three days with tasks. Do not engage with the rumination; do not name it; just out-execute it.",
        tactic: "Works for some nervous systems. Risk — the unnamed rumination still arrives, it just arrives on Tuesday evening at 6:57 p.m. as you are walking to Bar Quinn's.",
        nextSceneId: "ending-showed-up-distracted",
      },
      {
        id: "cancel-at-hour-zero",
        text: "On Tuesday at 5:44 p.m. the rumination peaks. Send Ash: 'hey, sorry, i am not going to make it tonight, something came up.'",
        tactic: "Cancel under anxiety. The cost is not Ash — he will be fine. The cost is the specific reinforcement of your own pattern: you ruminated enough to cancel, which teaches the rumination that cancelling is on the table, which makes the rumination louder next time.",
        nextSceneId: "ending-cancelled-anxious",
        isOptimal: false,
      },
    ],
  },

  {
    id: "ash-light-conversation",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Ash replies with a one-sentence answer about his week. You trade four messages. He is, on the thread, roughly who Noor described — clean sentences, no over-explaining, no flirty boilerplate.",
      },
      {
        speakerId: "inner-voice",
        text: "Pre-date messaging is a diagnostic, not a commitment. The information you are gathering is not 'is he flirty' but 'does he write like a person or like a performance.' Ash is, based on a sample of four messages, writing like a person. That is a small positive signal. Save it; do not inflate it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "pre-date-rumination",
  },

  {
    id: "over-planned",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Ash replies: 'Tuesday works. Do not worry about the menu — they do good food, we will be fine.'",
      },
      {
        speakerId: "inner-voice",
        text: "Note what he just did. He absorbed your over-planning gracefully without participating in it. That is data — it tells you he is not going to match anxious energy, which is structurally good news. It also, however, logs you as the one who did the over-planning, which is a signal he will or will not remember depending on what kind of person he is.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "pre-date-rumination",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-showed-up-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Showed Up",
    endingSummary:
      "You closed the four-day silence on Friday. You got the dossier from Noor. You scheduled the date inside twelve minutes of typing. Over the three days between schedule and date, you named each rumination-scenario as it arrived without engaging it. Tuesday evening you walked into Bar Quinn's without the hundred-and-twenty-minute imagined version of the date running in your head as an overlay. The actual date was — you will not know the shape of the date yet; the scenario ends at the door. What you do know is that you arrived at the door as yourself, and that is most of the work.",
    endingLearnReference: "doctrine-of-cold-your-new-dating-operating-system",
    endingLearnPrompt:
      "Naming rumination-scenarios as they arrive, without engaging them, is the core anti-anxious-attached skill of dating. Practise it on low-stakes dates. It generalises to higher-stakes ones.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You did not know on Friday that Tuesday would arrive quietly. You could not have known. What you did, specifically, was run the protocol anyway — reply on Friday, schedule on Friday, name the scenarios between Saturday and Monday — and the protocol produced a Tuesday that was smaller than it would otherwise have been. That is the whole intervention. Do it again in six weeks with the next introduction.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You open the door of Bar Quinn's at 7:02 p.m. Ash is at a booth near the back. He looks up. The scenario ends here.",
      },
    ],
  },

  {
    id: "ending-showed-up-distracted",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Showed Up, Out of Breath",
    endingSummary:
      "You distracted through the three days. The rumination, unnamed, arrived at 6:57 p.m. on Tuesday as you walked. You showed up at Bar Quinn's anyway, slightly wired, slightly out of the body. The date is possible from this position. It will require Ash to be calmer than you for the first fifteen minutes, which is a lot to ask of a stranger. Note the shape of the ending for next time — the naming discipline costs you three days of low-grade attention; the distraction discipline costs you the first fifteen minutes of the actual date.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Both disciplines work; they distribute the cost differently. Most readers will land at the naming discipline eventually because the cost-at-the-door is more expensive than the cost-over-three-days. Learn the shape. Choose accordingly.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-real-no",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Audited No",
    endingSummary:
      "You did the audit. The no held. You sent Noor a clean decline. She replied 'got it, no worries.' The scenario ends at 6:58 p.m. with the phone face-down on the coffee table and lights still not turned on, because sitting in the dark on a Friday evening is not a crisis — it is, sometimes, a Friday evening. The difference between this and the anxiety-driven decline is invisible from outside. You know the difference. That is enough.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A no that knew itself is a real accomplishment, and the audit that produced it is a reusable tool. The next time a Noor introduction lands, you will run the audit faster — possibly at the message rather than at day four — and the answer will arrive cleaner. You did not need to say yes to practise the skill. Declining well is part of the curriculum.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-cancelled-anxious",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "The Hour-Zero Cancel",
    endingSummary:
      "You cancelled at 5:44 p.m. on Tuesday. Ash replied 'no worries, another time maybe,' which is both the most gracious response and the response that functionally ends the introduction, because there will not be an another time. You will tell yourself, on Wednesday, that the cancellation was the right call; you will know, on Thursday, that the cancellation was the rumination winning. This is not catastrophic — it is one date you did not go on — but it is a specific reinforcement of the loop, and the loop compounds the same way in either direction.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Do not re-open the thread to explain yourself. Do not send a paragraph to Noor. The cancellation, having happened, is complete; the worst version of this ending is the one where you spend the next three days trying to repair the cancellation with a second message that makes you look less anxious, which it will not. Write the ending down in the log. Note the specific time the rumination peaked. That timing is valuable — next time, schedule something else at that specific hour on the day of, because the peak is now a known feature of your nervous system.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-stalled-out",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "One More Week",
    endingSummary:
      "You closed the phone. The weekend became Monday. Monday became Wednesday. On Friday you composed a reply in your head eleven times. On the following Monday, eleven days after Noor's original message, you replied. Noor replied 'ha, ok — let me check with him, he may have moved on.' He had. The introduction evaporated. You will never meet Ash. He was, almost certainly, not your person; the point of the scenario is not Ash. The point is that you spent eleven days deciding, and the deciding was the loop, not the date. The loop will arrive again with a different name.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write down the eleven days. Not as self-punishment — as a data point. Next time, at day two, you will recognise the shape and you will have the option to short-circuit. That option did not exist before you ran this specific stall. Now it does.",
        emotion: "neutral",
      },
    ],
  },
];

export const anxiety13: Scenario = {
  id: "anx-1-3",
  title: "The Read Receipt",
  tagline: "Friday, 6:42 p.m. Four days of not replying. The loop has pivoted from the ex to a man you have not met.",
  description:
    "Unlocks after anx-1-2. The anxious-attached loop does not stop when the ex is gone — it finds a new target. Noor has sent you an introduction you have been ruminating over for four days. The scenario teaches the specific anti-stall discipline for dating introductions and the naming-scenarios technique for pre-date rumination.",
  tier: "free",
  track: "anxiety",
  level: 1,
  order: 3,
  estimatedMinutes: 11,
  difficulty: "beginner",
  category: "self-regulation",
  xpReward: 160,
  badgeId: "showed-up-anyway",
  startSceneId: "friday-evening",
  prerequisites: ["anx-1-2"],
  tacticsLearned: [
    "The 24-hour reply rule for Noor-vetted introductions (and the audit to run when you are about to miss it)",
    "Asking your friend for the dossier — the data she already has — rather than asking the stranger to prove himself",
    "The audited no vs. the anxiety-driven no — they sound identical; they are different artefacts",
    "Naming rumination-scenarios as furniture your brain produces, without engaging them",
    "Matching a clear logistical register when someone sets one up cleanly",
  ],
  redFlagsTaught: [
    "The four-day silence as a pre-committed stall, not as 'not being ready'",
    "Over-planning the first date as an anxiety discharge that logs a signal you did not want to send",
    "The hour-zero cancel — the rumination arrives at ~60 minutes before the date and demands the exit",
    "Distracting through pre-date days as a cost-distribution, not a cost-elimination",
  ],
  reward: {
    id: "showed-up-anyway",
    name: "Showed Up",
    description: "Arrived at the door as yourself. The protocol held through three days of rumination.",
  },
  characters: [INNER_VOICE, NOOR, THE_CRITIC],
  scenes,
};

export default anxiety13;
