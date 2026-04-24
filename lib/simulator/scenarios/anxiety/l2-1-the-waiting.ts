/**
 * anx-2-1 — "The Waiting"
 *
 * Anxiety track, Level 2, order 1. Opens Thursday evening. Ash has
 * not replied to your text since the date on Tuesday night. The
 * forty-eight-hour silence window is the hardest sustained
 * anxious-attached stress test this track will run.
 *
 * Teaches:
 *  - The information asymmetry of post-date silence — his silence is
 *    not a message; you are turning it into one
 *  - The "silence narrator" — the internal voice that fills a
 *    no-data window with a specific rejection story
 *  - The follow-up message that is actually a follow-up, vs. the
 *    one that is a chase
 *  - When the silence is data (week+) and when it is just silence
 *    (≤72h)
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, NOOR, THE_CRITIC } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the forty-eight hours
  // ===================================================================
  {
    id: "thursday-evening",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 8:11 p.m. The date with Ash was forty-eight hours ago. The last message in the thread is yours — sent Wednesday morning at 9:14 a.m., reading: 'Thanks again for last night, that was fun.' Period on the end, not an exclamation mark, sent thirteen hours after the date. All these specifics were deliberate at the time.",
      },
      {
        speakerId: null,
        text: "It has been, as of now, thirty-five hours since you sent that message. Ash read it at 9:16 a.m. Wednesday. He has not replied.",
      },
      {
        speakerId: "the-critic",
        text: "Obviously he is not going to reply. Of course he is not. The sentence was too short. Or too long. Or too casual — 'that was fun' is high-school prom language, a person of his reading level would wince at it. Also the period at the end, which you thought was elegant, was actually cold. He read that as cold.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Note the Critic's specific pivot. On Wednesday it told you the period was elegant. On Thursday, with thirty-five hours of data to work with, it has retconned the period as cold. This is not new analysis; it is the same voice re-writing history to explain a piece of missing data. The silence contains exactly zero information about what Ash thinks of your message. The Critic is filling the silence with a specific rejection story because an absence of data is its preferred operating environment.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The skill of the next forty-eight hours is not to send the perfect follow-up. The skill is to not turn the silence into a narrative that will, if he replies on Saturday, still be sitting in your head and colouring your reading of his reply.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-the-72",
        text: "Do nothing. Seventy-two hours is the envelope for a normal human being with a life. Re-evaluate on Saturday morning, not before.",
        tactic: "The canonical move. A reply at hour 72 from Ash is data; a reply at hour 180 is a different kind of data; a reply at hour 35 that you prompted is no data at all.",
        nextSceneId: "waiting-the-window",
        isOptimal: true,
      },
      {
        id: "send-a-follow-up",
        text: "Send one more message. Something short and warm, to give him an opening.",
        tactic: "The 'opening' frame is almost always a chase in disguise. At hour 35 you are not giving him an opening; you are shortening the response window from 'when he gets back to you naturally' to 'now.' He will either reply immediately or not, and either reply is contaminated by the chase.",
        nextSceneId: "sent-follow-up",
      },
      {
        id: "text-noor",
        text: "Text Noor. 'hypothetically speaking — 35h is bad, right?'",
        tactic: "Route the silence-narrator through an ally. Noor has not been in your head for the last 35 hours; she will give you a cleaner reading of the interval than you can produce yourself.",
        nextSceneId: "noor-reads",
        isOptimal: true,
      },
      {
        id: "check-his-socials",
        text: "Pull up his Instagram. Check his story. Check if he has been online on the apps. Check when he was last active on anything.",
        tactic: "The specific failure mode of waiting — research-as-activity. You will find something; you will interpret the something; the interpretation will be both hot and almost certainly wrong.",
        nextSceneId: "social-reconnaissance",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — waiting the window
  // ===================================================================
  {
    id: "waiting-the-window",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You close the thread. You do not close the app — closing the app entirely is an admission that you need to close the app entirely, and you are trying to not be the person who needs to do that. You lock the screen. You put the phone face-up on the coffee table, which is the next most-checkable position you can place it in.",
      },
      {
        speakerId: "inner-voice",
        text: "The face-up placement is a tell. You are hedging. If the phone were face-down you would have to pick it up to check it; face-up it will notify you passively of any incoming signal. You are, in this specific geometry, still on standby for him. The distinction is small and it is the whole scenario.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "face-down",
        text: "Flip the phone face-down. If he replies, the notification sound will still fire. You do not need to see the lock-screen ambient state.",
        tactic: "A two-second adjustment that removes approximately eighty percent of the passive-checking surface. One of those high-leverage tiny interventions.",
        nextSceneId: "face-down-evening",
        isOptimal: true,
      },
      {
        id: "phone-another-room",
        text: "Take the phone into the bedroom. Close the door. Sit on the couch without it for one hour.",
        tactic: "The physical-distance move from L1-2, applied to a different spiral. The hour is the commitment; you can, of course, go fetch the phone any time. But if you do, you did; if you do not, you proved to yourself you could.",
        nextSceneId: "hour-without-phone",
        isOptimal: true,
      },
      {
        id: "leave-as-is",
        text: "Leave the phone face-up. Watch a show. Try not to glance at the coffee table.",
        tactic: "You will glance at the coffee table every ninety seconds for the next two hours. The show will not register. Technically you are 'not doing anything' about the silence; practically, the silence is the main character of your evening.",
        nextSceneId: "ending-glanced-all-night",
      },
    ],
  },

  {
    id: "face-down-evening",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You flip the phone. The face-down screen is a small black rectangle on a wooden table. It is, structurally, no different from the face-up version, except that you now cannot see it from where you are sitting without leaning forward.",
      },
      {
        speakerId: "inner-voice",
        text: "Leaning-forward is a specific motor act. Checking a face-up phone requires zero motor acts — the eye glances. Checking a face-down phone requires a deliberate motion. The friction is the intervention. You will still check, probably; you will check less often; and each check is now an action you can count rather than a glance you cannot.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  {
    id: "hour-without-phone",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You sit for the hour without the phone. The first twenty minutes are loud in a specific way — the awareness of the phone in the next room is more acute than it would be if it were in your pocket. At minute thirty-six you are actually, briefly, thinking about something else. At minute fifty-one you forget about the phone entirely for about three minutes.",
      },
      {
        speakerId: "inner-voice",
        text: "Note the curve. The acuteness peaks in the first third and then decays. This is the half-life of the nervous-system reaction to a specific removed stimulus. Your body adapts to the phone's absence approximately as fast as it adapts to wearing an unfamiliar watch. The adaptation is not healing; it is mechanical. Do not interpret the adaptation as you having solved anything. Interpret it as evidence that the stimulus was doing the work, not you.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "At 9:14 p.m. you go and retrieve the phone. There are no new messages from Ash. You find that you can see this fact more clearly than you could have thirty-five hours ago.",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  // ===================================================================
  // ACT 2B — the follow-up
  // ===================================================================
  {
    id: "sent-follow-up",
    backgroundId: "text-screen",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You compose the follow-up. You revise it four times. The final version reads: 'how was the rest of your week?' — casual, warm, low-cost, open-ended. You send it at 8:19 p.m.",
      },
      {
        speakerId: "inner-voice",
        text: "Clock what just happened. You sent the message. Ash now has the information that you were, at 8:19 p.m. on Thursday, specifically thinking about him enough to break the thirty-five-hour silence. That information has a price. The price is that whatever he was going to do — reply naturally at hour 72, let it cool down gracefully, ask Noor to ask you about him — has been replaced by a more specific set of options, all of which now include the knowledge that you reached first.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "This is not catastrophic. A follow-up at hour 35 is the kind of thing that well-adjusted people do sometimes. The specific cost here is that you will, now, check the phone for a reply every ninety seconds until he replies or until you go to bed. Whatever his reply is, you will receive it into that state. That is the cost — not his reading of you, but your own degraded state for the next hour.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "follow-up-outcome",
  },

  {
    id: "follow-up-outcome",
    backgroundId: "apartment",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "The reply arrives at 10:52 p.m. Two hours and thirty-three minutes after your message. The reply reads: 'hey! sorry — got pulled into a thing at work, been offline for a day. saturday afternoon still works if you are up for a walk?'",
      },
      {
        speakerId: "inner-voice",
        text: "Read the reply carefully. He was offline for a day — that is a fact, not a frame. He is proposing Saturday. He used a lower-case sentence casing that matches yours. The 'sorry' is the smallest possible version of an apology, which is the version a person with an adult friendship offers — not a grovel, not a dismissal. This is, structurally, a good reply.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Now — the counterfactual. If you had waited to 72 hours, his reply would have arrived roughly when his reply arrived anyway, because his reply was gated on his work thing ending, not on your follow-up. You bought about fourteen hours of information at a cost of two hours and thirty-three minutes of degraded nervous-system state. The exchange rate on this trade is rarely in your favour.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  // ===================================================================
  // ACT 2C — Noor reads
  // ===================================================================
  {
    id: "noor-reads",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"ha. 35 hours is just hours. he is a man who had a date on tuesday and he has a job. for most men 35 hours is the first day of thinking about whether to text back. for a secure one it is the middle of the week."',
        emotion: "knowing",
      },
      {
        speakerId: "noor",
        text: '"real talk — you read his texting cadence on monday and tuesday. was he a fast-reply guy on the pre-date thread? if yes, 35h is meaningful data. if no, 35h is nothing and you are filling a window."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Noor just gave you the exact diagnostic. The silence is meaningful or non-meaningful depending on the baseline of his previous cadence, not on the absolute number of hours. Absolute-hour-watching is a Critic game; cadence-relative reading is an adult game.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "recall-cadence-fast",
        text: 'Reply to Noor: "he was fast before — same-day replies, short turnarounds. so 35 is maybe meaningful?"',
        tactic: "Honest recall. If Ash was a fast replier, the silence is a real data point — not proof of rejection, but worth noticing.",
        nextSceneId: "noor-reads-fast",
        isOptimal: true,
      },
      {
        id: "recall-cadence-slow",
        text: 'Reply: "actually no — he took six hours once and eight hours another time. 35 is in range for him."',
        tactic: "Honest recall. The silence is in his normal envelope. Stand down.",
        nextSceneId: "noor-reads-slow",
        isOptimal: true,
      },
      {
        id: "cannot-recall",
        text: 'Reply: "honestly i cannot remember, i have been reading his messages too hot to notice cadence."',
        tactic: "Also honest. The admission is itself valuable — it tells you that you cannot trust your read, which means you should not act on it.",
        nextSceneId: "noor-reads-unclear",
        isOptimal: true,
      },
    ],
  },

  {
    id: "noor-reads-fast",
    backgroundId: "text-screen",
    mood: "mysterious",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"okay. 35h after a fast baseline is a data point. it is not proof of anything. it means he has either hit a thing (busy, sick, family), is doing his own calibration, or is starting to cool off. three possibilities; you cannot distinguish them yet. wait to 72. if silence continues, you know more. if he writes back by saturday morning, you know more differently."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Read what Noor is doing. She is not telling you how to feel. She is giving you a protocol — observe, wait, re-observe. The observation windows have specific boundaries (35h now, 72h threshold, Saturday morning reassessment). The protocol is more useful than the feeling because the protocol survives whichever of the three possibilities is true.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  {
    id: "noor-reads-slow",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"then 35 is nothing. literally nothing. he has been slow before and this is a slow post-date baseline for him. put your phone down. watch a show. re-check saturday."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Noor declined to manufacture drama. A slow texter was slow; that is not a signal. The scenario you were writing in your head for the last ten hours was built on a cadence assumption that does not match the data. Release the scenario. This is the hardest part — releasing a story your nervous system has already invested in.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  {
    id: "noor-reads-unclear",
    backgroundId: "text-screen",
    mood: "peaceful",
    presentCharacterIds: ["noor"],
    dialog: [
      {
        speakerId: "noor",
        text: '"good that you noticed. the noticing is the whole move. the rule when you cannot read him is — do nothing. wait the 72. if he writes first, great. if he does not, saturday morning you can reach once, short, and see."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "'Do nothing when you cannot read him.' That sentence is the protocol. You will use it in dating, in friendships, in work contexts, at dinner parties, for the rest of your life. People who know when to do nothing are, rather unambiguously, the people other people trust.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "saturday-arrives",
  },

  // ===================================================================
  // ACT 2D — social reconnaissance (the bad path)
  // ===================================================================
  {
    id: "social-reconnaissance",
    backgroundId: "apartment",
    mood: "danger",
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "You pull up his Instagram. The most recent post is from a week ago; a coffee cup with no caption. You scroll to his followers list. You click through to three people who follow him whose names you do not recognise, and examine their posts for context. You check his 'active' indicator on two different apps. At one of them, his name shows 'Active 14m ago.'",
      },
      {
        speakerId: "inner-voice",
        text: "You have just spent fourteen minutes on this. You have gathered one piece of information — he was, at some point in the last 14 minutes, active on one app — and it has cost you fourteen minutes of a specific kind of stress-eating. The information is also, on its own, meaningless. He could have been checking the weather, replying to his mother, or on a date with someone else, and the word 'active' is blind to all three. You have, in exchange for nothing, manufactured a new hot data point your Critic will spend the next two hours digesting.",
        emotion: "concerned",
      },
      {
        speakerId: "the-critic",
        text: "Obviously if he was active 14 minutes ago and he has not replied to you, he is deliberately not replying. He has your message and he is choosing not to respond. This is active rejection and you are being stupid to pretend otherwise.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The Critic has upgraded itself from 'he might not reply' to 'he is deliberately not replying,' which is a significantly more hostile framing that it was not running fifteen minutes ago. You gave it new material. It rewrote the story. This is what research-as-activity produces — it does not give you answers; it gives the Critic upgrades.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "close-everything",
        text: "Close all the tabs. Close the apps. Put the phone down. Do not look again until Saturday.",
        tactic: "The recovery move. You cannot un-research; you can stop researching. Treat the 'Active 14m' data point as contaminated data and set it aside.",
        nextSceneId: "face-down-evening",
        isOptimal: true,
      },
      {
        id: "escalate-research",
        text: "Keep going. Find his LinkedIn. Check mutual followers. See if there is a common connection you could casually ask.",
        tactic: "The slope continues downward. You will spend the evening on it. By 11 p.m. you will have produced approximately fourteen imagined scenarios, all of which are built on the research you did tonight.",
        nextSceneId: "ending-research-spiral",
        isOptimal: false,
      },
      {
        id: "confront-him",
        text: "Text him. 'Hey — saw you were online earlier. Did my message go through?'",
        tactic: "This text is the worst text available to you in this scenario. It communicates, precisely, that you were watching his activity status. Do not send it.",
        nextSceneId: "ending-confronted",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 3 — Saturday
  // ===================================================================
  {
    id: "saturday-arrives",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 9:47 a.m. You pick up the phone for the first time since waking. In the thread with Ash: one new message, sent at 8:14 a.m. It reads: 'hey — busy week, sorry for the quiet. walk later today?'",
      },
      {
        speakerId: "inner-voice",
        text: "He wrote first. The silence was silence, not a message. The narrative your Critic spent Thursday and Friday constructing — the retconned period, the cold reading of your text, the 'deliberate non-reply' — was all entirely wrong, and the scenario is now over. The next question is whether you can read his message from the rested Saturday position or whether the Thursday-evening Critic is still colouring the lens.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "reply-warm",
        text: "Reply: 'sure — 3 p.m. the bridge bit? meet by the fountain.'",
        tactic: "Match his register. He apologised lightly; you accepted lightly. You pick a specific venue. You offered a specific meeting point. No mention of the silence; no micro-audit of whether he owes you an explanation; no catching-up exchange that would re-introduce the Thursday-evening tone.",
        nextSceneId: "ending-clean-saturday",
        isOptimal: true,
      },
      {
        id: "audit-him",
        text: "Reply: 'hey! yeah, it had been a minute. what happened on monday?'",
        tactic: "The question you were not going to ask. He mentioned he was busy — you are now requiring him to account for specifics, which is the Critic asking for the evidence it did not get Thursday night. He will answer; the answer will be boring; and you will have established a register where his movements are audited.",
        nextSceneId: "ending-audited",
      },
      {
        id: "punish",
        text: "Reply: 'hey — i'm tied up today, next week maybe.'",
        tactic: "Punishing him for the silence. The silence was not a thing; your punishment is a thing; the net effect on the relationship is that you have manufactured a conflict that did not exist.",
        nextSceneId: "ending-punished",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-clean-saturday",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Saturday Walk",
    endingSummary:
      "You waited the window. You did not send a follow-up at hour 35. You did not research his Instagram or his 'Active' indicator. You routed the silence-narrator through Noor, heard her read of it, and accepted the three-possibility framework. Saturday morning he wrote first. You replied cleanly, matched his register, proposed a specific venue. The scenario ends at the fountain at 2:58 p.m. — scenario close, not date close; what happens on the walk is the next scenario. What you proved in the forty-eight-hour window is that you can sit with a no-data stretch without turning it into a narrative. That is a skill you did not reliably have a month ago.",
    endingLearnReference: "doctrine-of-cold-your-new-dating-operating-system",
    endingLearnPrompt:
      "The ability to sit with silence without authoring it is, rather unambiguously, the highest-leverage single skill in dating for anxious-attached readers. Every other dating skill is downstream of this one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write down the Thursday-evening narrative the Critic constructed. Read it back next to Saturday's actual outcome. The specific gap between the two will be the teaching artefact. You will refer to it the next time a silence lands on you in a different thread.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You put the phone down. You decide on the coat. Saturday afternoon belongs to whichever version of you walks through the gate of the park at 2:58.",
      },
    ],
  },

  {
    id: "ending-audited",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Monday Question",
    endingSummary:
      "You asked him 'what happened on monday.' He replied — accurately, honestly, briefly ('work thing ran late monday night, then tuesday sprint'). The audit produced the answer, and the answer was boring, because the silence had been boring. The walk still happens. But you have now established a precedent — you ask about gaps, he accounts for his time. That precedent will either fade or solidify depending on the next four-to-six weeks of the thread. Neither outcome is catastrophic; the cleaner version existed and you missed it by one sentence.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The audit sentence is an anxious-attached signature that reads, to a secure man, as mildly effortful. Most secure men will tolerate it in small doses. If you notice it becoming a habit across the next several silences, that is the data — at that point, run a self-audit on why you are auditing him.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-glanced-all-night",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Night of Glances",
    endingSummary:
      "You left the phone face-up. The show played; you did not absorb it. You estimate you checked the phone between 180 and 220 times over the course of the evening. Each check confirmed the same fact — no new message — and each confirmation cost you a small unit of nervous-system energy you did not have to spend. You went to bed at 11:47. You slept badly. The scenario resolves on Saturday regardless — Ash writes first at 8:14 — but the Thursday evening was, structurally, lost. Not a crisis; one lost evening in exchange for the lesson that face-up is a choice with a price.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Next time the phone stays face-down. The two-second flip is the difference between an evening that registers and one that does not. Make it a pre-commitment — phone face-down during any interval you are actively waiting on a reply. The cost of remembering is trivial; the savings across a year are material.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-research-spiral",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "The Research Spiral",
    endingSummary:
      "You spent the evening researching. LinkedIn, mutual followers, the exact timing of his social activity across four platforms. You produced approximately fourteen imagined scenarios, each one more specific than the last, all built on data that turned out, on Saturday, to mean nothing — Ash had work, wrote first on Saturday morning, and is offering a walk. The walk will happen, probably, and you will go, probably. What you lost was the Thursday and Friday evenings and a specific amount of sleep. The scenario ends, but the pattern is now one iteration louder in your nervous system, which is the actual cost.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write down, tonight, the exact specific research actions you took. Include the count of each — 'checked his Instagram story 7 times, checked Active indicator on the apps 11 times, clicked through to 4 followers.' Seeing the tally in your handwriting is the artefact. It will make the next research spiral harder to start, because you will, reluctantly, have a benchmark for it.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-confronted",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook — How They Actually Operate",
    endingTitle: "The Active-14m Text",
    endingSummary:
      "You sent 'did my message go through?' at 9:42 p.m. Thursday. Ash read it at 7:18 a.m. Friday. His reply arrived at 8:20 a.m. Friday: 'hey — yeah, got it. sorry for the quiet, had a thing. free sunday?' The reply is, on its face, fine. What has shifted is that Ash now knows — specifically — that you were watching his app-activity status at 9:42 p.m. Thursday. That information cannot be un-transmitted. He will calibrate his future communication with you downstream of that knowledge. The walk may still happen; the frame has permanently shifted a degree.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Do not double down on the next message by over-explaining what you meant. 'Did my message go through' is a known tell; every adult who receives it in the wild knows what it is signalling. Ash is choosing to be gracious, which tells you something good about him. Do not squander that graciousness by following up with paragraph-length clarifications.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-punished",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How to Leave Without Being the Villain",
    endingTitle: "The Manufactured Conflict",
    endingSummary:
      "You replied 'tied up today, next week maybe.' Ash replied 'ok, let me know.' You will not let him know, because the punishment-move is almost always accompanied by a specific reluctance to walk it back, which means the thread is now cold. Two weeks from now he will be on two other dates and your thread will sit in his archive as a Saturday-morning nothing. The silence was not a thing; the punishment was a thing; the net outcome is that you have, deliberately, broken an introduction Noor made you, over a 48-hour window that contained zero hostility from his side.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write to Noor tonight. Not to blame. To acknowledge, in plain terms, that you punished him for a silence that was not a signal, and that you ended the thread on a decision you made under anxiety. Noor will not scold you. She will note it. Her noting it is, structurally, the accountability your future introductions will need.",
        emotion: "sad",
      },
    ],
  },
];

export const anxiety21: Scenario = {
  id: "anx-2-1",
  title: "The Waiting",
  tagline: "Thursday, 8:11 p.m. Thirty-five hours of silence. Your brain is filling it.",
  description:
    "Opens anxiety L2 — 'The Waiting.' The forty-eight-hour silence after a first date is the hardest sustained anxious-attached stress test this track will run. Teaches the silence-narrator pattern, the cadence-relative reading of missing replies, the face-up phone as a tell, and the distinction between a follow-up and a chase.",
  tier: "free",
  track: "anxiety",
  level: 2,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "beginner",
  category: "self-regulation",
  xpReward: 180,
  badgeId: "sat-with-silence",
  startSceneId: "thursday-evening",
  prerequisites: ["anx-1-3"],
  tacticsLearned: [
    "Silence contains no information — the Critic fills no-data windows with a rejection story",
    "Cadence-relative reading: 35 hours after a fast baseline is data; 35 hours after a slow baseline is nothing",
    "The face-up phone as a passive-checking tell",
    "Noor's three-possibility framework (busy / calibrating / cooling) — all viable, none distinguishable yet",
    "Saturday reply that matches his register, no audit, no accounting-for-time",
    "Research-as-activity as an anxiety discharge that produces Critic upgrades, not answers",
  ],
  redFlagsTaught: [
    "The retconning Critic — rewriting the history of your own messages to explain missing data",
    "Checking 'Active' indicators on apps as a specifically costly form of research",
    "'Did my message go through' as a known tell that cannot be un-transmitted",
    "Punishing the silence with a cold reply — manufactured conflict over a non-event",
  ],
  reward: {
    id: "sat-with-silence",
    name: "Sat With Silence",
    description: "Forty-eight hours of no data and you did not author a rejection story into it.",
  },
  characters: [INNER_VOICE, NOOR, THE_CRITIC],
  scenes,
};

export default anxiety21;
