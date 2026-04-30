/**
 * anxiety-3-2, "The Morning After Panic"
 *
 * Anxiety track, Level 3, order 2. The avoidance fork. Monday
 * morning after the L3-1 grocery-store panic attack. Sam has slept
 * badly. The body has, in the last 24 hours, conditioned a new
 * fear: of having another panic in public. Anticipatory anxiety
 * has fired about going to the office today. The choice is the
 * fork in the road, does the avoidance trap consolidate, or does
 * it close.
 *
 * What this scene teaches:
 *   - Anticipatory anxiety as a distinct symptom-class. The body
 *     fired panic at Trader Joe's yesterday. The body now fires
 *     low-grade activation at the THOUGHT of any environment that
 *     resembles Trader Joe's, open public spaces, fluorescent
 *     light, busy weekend stores, work-day subways. Anticipatory
 *     anxiety is the maintenance shape of panic disorder; it is
 *     what Lin treats with exposure work in the next session.
 *   - The avoidance fork. Five available paths. Three install or
 *     deepen the avoidance trap (full avoid, partial avoid, white-
 *     knuckle expose without skill). Two close it (talk to Lin
 *     before doing anything, alcohol-managed exposure as caution).
 *   - The substance-use cautionary path. Alcohol is a short-term
 *     anxiolytic that produces rebound anxiety as it metabolises
 *     out. Using a glass of wine to manage subway-panic at 8 a.m.
 *     installs a body-learning that the subway requires alcohol,
 *     which is the foundation of anxiety-driven substance use.
 *     Worth depicting because it is the most common slow-poison
 *     path in clinical anxiety and almost never named.
 *   - The right move set. Email Lin before making any decision
 *     today. Lin's CBT protocol for post-panic avoidance includes
 *     specific protocols, and the body that consults the clinician
 *     before deploying its own coping is the body whose recovery
 *     compounds.
 *
 * Voice: Monday-morning office register. Fatigue from bad sleep.
 * The body in the leftover-shape from yesterday's panic, plus the
 * new conditioning. Kanika in italics naming anticipatory anxiety
 * and the avoidance trap as the choice points pass.
 *
 * Cast: SAM (player), DR. LIN (off-page in email), MIA (off-page),
 * INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. Monday morning after the L3-1 grocery-store panic. The body now produces low-grade anticipatory anxiety at the thought of any environment that resembles a Trader Joe's.",
  traits: ["sensitive", "in-treatment", "in-conditioning"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const LIN: Character = {
  id: "lin",
  name: "Dr. Yoon Lin",
  description:
    "47. Sam's CBT therapist of eight months. Korean-American, runs a small private practice in midtown. Method-driven. Emails arrive in the same calibrated voice she uses in session.",
  traits: ["calm", "structured", "calibrated"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, anticipatory anxiety, the avoidance fork
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Monday morning, 7:14 a.m. you slept maybe four hours. The body has, in the last 22 hours since the cereal aisle, conditioned a new fear, not of grocery stores specifically, but of HAVING ANOTHER PANIC ATTACK IN PUBLIC. The body is firing low-grade activation at the thought of leaving the apartment.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This is anticipatory anxiety. It is the maintenance shape of panic disorder. The body that has had one panic attack is the body that scans, indefinitely, for the conditions of the next one. The scanning is what Lin treats with exposure work. Today is the fork in the road, does the avoidance trap consolidate, or does it close.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves. Three install or deepen the trap. Two close it. The most common move is the third, white-knuckle through it, pretend it didn't happen, force-march to the office. That move feels like courage and is structurally avoidance with extra steps. The body that white-knuckles through its first post-panic Monday is the body that produces re-panic on the subway by Wednesday and rebuilds the trap from the more secure foundation of two trials.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The bedroom.",
        tactic: "The scene opens.",
        nextSceneId: "the-bedroom",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE BEDROOM, fatigue, the new fear
  // ===================================================================
  {
    id: "the-bedroom",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "The light through the curtain is the Monday-morning light. Mia has been up for thirty minutes; you can hear her in the kitchen making coffee.",
      },
      {
        speakerId: null,
        text: "You are sitting on the edge of the bed. You have been sitting on the edge of the bed for nine minutes. You cannot quite get the next move started, the shower, the clothes, the door, the train.",
      },
      {
        speakerId: null,
        text: "The body is producing the same somatic profile as yesterday at 11:23, except quieter, a low-grade chest tightness, slightly shallow breath, mild gut signal. The cognitive content is different from yesterday's. Yesterday was 'I am dying.' Today is 'what if it happens again on the F train.'",
      },
      {
        speakerId: null,
        text: "Yesterday you texted Mia about the panic attack when you got home. She made tea. She did not push you to talk. She let you describe it when you were ready. By 9 p.m. you had told her what you remembered. By 10 p.m. you were in bed. By 11:30 p.m. the body was doing the still-on-Sunday-night-pre-Monday thing, plus the new layer of yesterday-was-real activation. You slept badly.",
      },
      {
        speakerId: "inner-voice",
        text: "What you are about to decide in the next ten minutes will set the maintenance picture for the next month. Five options. The body wants you to take the first or second. The third feels heroic. The fourth and fifth are the work.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-home",
        text: "Stay home. Email work that you have a stomach thing. Order Instacart for groceries this week.",
        tactic: "The full-avoidance path. The body's anticipatory anxiety drops 70% within an hour of the email being sent. Across the day the relief consolidates. By tomorrow morning the anticipatory anxiety re-fires at the thought of the office. By Friday you have stayed home four times. The avoidance trap is now generalising from grocery-stores to commute-environments.",
        nextSceneId: "stay-home-1",
        isOptimal: false,
      },
      {
        id: "uber",
        text: "Take an Uber to work instead of the F train. Avoid the subway today. Just today. You'll do the train tomorrow.",
        tactic: "The partial-avoidance path. Body relief lands but is more contained, you got to work, just not via the train. The cost: the body has now learned that the F train is the trigger. Tomorrow's anticipatory anxiety will fire at the thought of the F train AND will be slightly stronger. The 'just today' substitution is one of the most common slow-erosion shapes in panic disorder.",
        nextSceneId: "uber-1",
        isOptimal: false,
      },
      {
        id: "force-march",
        text: "Force-march. Pretend yesterday didn't happen. Take the train. White-knuckle it.",
        tactic: "The white-knuckle exposure. Looks like courage. Structurally avoidance with extra steps, the body experiences the train environment without skill, panics on the subway at 8:52 a.m., gets off at York Street, throws up in a trash can. The conditioning is now between the F train AND grocery stores AND your own ability to handle public spaces. Worse than the Uber path because it added a new failure-trial to the body's evidence base.",
        nextSceneId: "force-march-1",
        isOptimal: false,
      },
      {
        id: "wine",
        text: "Pour two ounces of red wine into your coffee mug. Take it on the train. Drink it slowly.",
        tactic: "The substance-use cautionary path. Alcohol is a short-term anxiolytic. The body's anticipatory anxiety drops within 15 minutes of the wine entering the system. The train ride is fine. By 11 a.m. the alcohol metabolises out and rebound anxiety arrives, somatically louder than the original anticipatory anxiety. By next Monday you are reaching for the wine before the body has even fired. Anxiety-driven substance use installs in roughly four to six trials.",
        nextSceneId: "wine-1",
        isOptimal: false,
      },
      {
        id: "email-lin",
        text: "Open the laptop. Email Lin before making any decision. 'Had a panic attack at TJs Sunday. Body firing about the train this morning. What's the plan?'",
        tactic: "The consultation move. Lin replies within 90 minutes with a structured graded plan. The plan involves taking the train today, BUT with a specific protocol, sit in a specific car, deploy box breathing if anticipatory anxiety hits 6/10, pre-named exit station if it hits 9. The plan is the work; the consultation is the foundation.",
        nextSceneId: "email-lin-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // STAY HOME PATH (full avoidance)
  // ===================================================================
  {
    id: "stay-home-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You open the laptop. You compose the email to your manager. 'Hey. I think I'm coming down with a stomach bug, going to take today as sick. Will check Slack from home. Apologies.'",
      },
      {
        speakerId: null,
        text: "You hit send at 7:34 a.m. within two minutes the body's anticipatory anxiety drops 70%. The chest releases. The breath comes back. You exhale. You climb back into bed.",
      },
      {
        speakerId: null,
        text: "The relief is real and the relief is psychoactive. You sleep for three more hours. You wake at 11. You order Instacart for the week. You work from home, half-functionally. You order delivery for dinner. You do not leave the apartment.",
      },
      {
        speakerId: null,
        text: "Tuesday morning the anticipatory anxiety re-fires. You stay home again. By Friday you have stayed home four days. The avoidance has generalised, the trigger is no longer 'crowded grocery stores' but 'leaving the apartment.' This is how panic disorder consolidates into agoraphobia in approximately six to twelve weeks.",
      },
      {
        speakerId: "inner-voice",
        text: "Full avoidance is the fastest path from a single panic attack to chronic disorder. The mechanism is mechanical. Each day of avoidance strengthens the conditioning between 'leaving the apartment' and 'panic-prevention.' The body experiences four consecutive days of relief from staying in. The body cannot distinguish 'I avoided panic by staying home' from 'I would have been fine if I had left.' Without counter-evidence, the conditioning compounds.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair is exposure. The exposure on Wednesday in Lin's office, after a week of avoidance, will be harder than the exposure today would have been. The avoidance compounds the work that has to be done; it does not eliminate it. Across enough avoidance days, treatment requires escalating to in-vivo exposure with the therapist, intensive outpatient programs, or. In the most consolidated cases, partial hospitalisation. None of those are catastrophes; they are also significantly more expensive in time and energy than an email to Lin at 7:14 a.m. would have been.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-stay-home-end",
        text: "End scene.",
        tactic: "The full-avoidance ending.",
        nextSceneId: "ending-stay-home",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // UBER PATH (partial avoidance)
  // ===================================================================
  {
    id: "uber-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You order the Uber. You shower. You dress. You go downstairs. The car is a black Toyota Camry driven by a man named Yuri who is listening to Russian-language news.",
      },
      {
        speakerId: null,
        text: "The drive is fine. Yuri does not talk. The body's anticipatory anxiety stays in the 4-5 range, not gone, but contained. You arrive at the office at 8:48. You get coffee. You start the day.",
      },
      {
        speakerId: null,
        text: "Tuesday morning: anticipatory anxiety re-fires at the thought of the F train. Slightly louder than Monday's, because Monday provided no counter-evidence. You order the Uber again. 'Just one more day,' you tell yourself.",
      },
      {
        speakerId: null,
        text: "By Friday you have ordered the Uber four times. Your monthly Uber bill is on track to be $480, where it used to be $0. By next Wednesday Mia notices the credit card statement and asks. You tell her. She says, gently, 'we should probably talk to Lin about this.' She is right. You email Lin Wednesday afternoon, having lost five days of compounded conditioning that would have been simpler to interrupt on Monday morning at 7:14.",
      },
      {
        speakerId: "inner-voice",
        text: "Partial avoidance is the most common slow-erosion shape in clinical panic disorder. The 'just today' move is repeatable; the body's relief is real; the financial cost is masked under the small-purchase threshold; and the compounding happens slowly enough that no individual day's decision feels catastrophic. The body learns the trigger is the F train. Then the body learns the trigger is the F AND the J. Then the body learns the trigger is morning subways generally. The trigger generalises about as fast as the avoidance generalises.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair on Wednesday will be exposure to the F train, with Lin's structured graded protocol. The exposure will be harder than it would have been Monday. Five days of avoidance is five days of additional conditioning that the exposure has to overwrite. Not catastrophic. Just more work, more sessions, more weeks of practice.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-uber-end",
        text: "End scene.",
        tactic: "The partial-avoidance ending.",
        nextSceneId: "ending-uber",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FORCE-MARCH PATH (white-knuckle avoidance)
  // ===================================================================
  {
    id: "force-march-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You decide to be brave. You shower. You dress. You walk to the F at Bergen Street. The platform is the Monday-morning rush-hour platform, full, hot, fluorescent, the small ambient roar of the tunnel.",
      },
      {
        speakerId: null,
        text: "The train arrives. You board. You get a corner spot near the door. The car is full. You can smell three different colognes and the laundry-detergent of the man pressed against your right shoulder.",
      },
      {
        speakerId: null,
        text: "The doors close. The train accelerates into the tunnel.",
      },
      {
        speakerId: null,
        text: "By the second stop. Carroll Street, the chest tightness is at a 7. By the third. Smith-9th, it is at a 9. The cognitive content arrives in the recognised shape: 'I am having another one. I am going to have to leave the train. I am going to faint here. Everyone is going to see.'",
      },
      {
        speakerId: null,
        text: "You force yourself to stay through the East River tunnel. By York Street the body has fired full panic. You get off. You stumble up the stairs. You throw up in a trash can on Plymouth Street.",
      },
      {
        speakerId: null,
        text: "You sit on a bench. You breathe. After eleven minutes you walk to the office. You arrive at 9:18. You tell your manager you had a stomach thing on the train. You work the rest of the day on autopilot.",
      },
      {
        speakerId: "inner-voice",
        text: "White-knuckle exposure is the most well-meaning version of avoidance, and one of the most damaging. It looks like the courageous move. It is also exposure WITHOUT skill or scaffolding, which is structurally similar to physical-therapy without warm-up, you can do it, you can technically complete the rep, you can also re-injure yourself in the process. The body that white-knuckled the F train this morning has now associated the F train with PANIC AND THROWING UP. The conditioning is stronger than yesterday's TJ conditioning, because the failure trial included a public somatic event.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair on Wednesday will require unwinding both Sunday's and this morning's conditioning. Lin will not be angry. Lin has had clients do this many, many times but she will name the white-knuckle attempt as a structural mistake and propose the proper graded protocol. White-knuckle exposure works in approximately the same percentage of cases as untrained physical therapy works for a torn ACL, which is approximately none.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-force-march-end",
        text: "End scene.",
        tactic: "The white-knuckle ending.",
        nextSceneId: "ending-force-march",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // WINE PATH (substance-use cautionary)
  // ===================================================================
  {
    id: "wine-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "There is a half-bottle of red wine on the counter from Saturday. You pour two ounces into your travel coffee mug. You top it with cold-brew. You leave the apartment at 7:48.",
      },
      {
        speakerId: null,
        text: "Within fifteen minutes of taking the first sip on the platform, the body's anticipatory anxiety drops to a 3. Alcohol is doing what alcohol does, central-nervous-system depressant, GABAergic activity, body-wide deceleration. The train ride is fine. You arrive at work at 8:55. The day proceeds.",
      },
      {
        speakerId: null,
        text: "By 11 a.m. the alcohol has metabolised out. The rebound anxiety arrives, somatically louder than the original anticipatory anxiety, because the parasympathetic system that the alcohol artificially activated is now over-correcting back. You take a long lunch. You eat a slice of pizza. You drink water.",
      },
      {
        speakerId: null,
        text: "By 2 p.m. you are functional but tired in a specific somatic flavour. By the end of the day you are exhausted. By Tuesday morning the body has the same anticipatory anxiety AND a mild expectation that the wine will be there to manage it.",
      },
      {
        speakerId: null,
        text: "By next Monday, the fourth trial, the wine is in the coffee mug before the body has even fired. By the third week, the wine is two ounces in the morning coffee AND a full glass at lunch on hard days.",
      },
      {
        speakerId: "inner-voice",
        text: "Anxiety-driven substance use is one of the most under-recognised slow-poison paths in clinical anxiety, partly because it does not look like drinking-too-much in the recognisable shapes. The morning wine in the coffee is not drunk. The lunch glass is not drunk. The pattern installs in roughly four to six trials. By trial twenty, the body's tolerance for un-medicated transit has dropped, which means subway-without-wine produces panic that subway-with-wine does not, which is the conditioning by which the substance use becomes structurally necessary.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair, when this comes up in Lin's session in three weeks, will be a hard conversation. Lin will not be punitive. Lin will be matter-of-fact about the mechanism but the addition of a substance-use layer to the panic-disorder treatment plan adds three to six months of work. The skill substitution available today is the email-to-Lin move; that thirty seconds of typing prevents three to six months of additional work.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-wine-end",
        text: "End scene.",
        tactic: "The substance-use cautionary ending.",
        nextSceneId: "ending-wine",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // EMAIL LIN PATH (skill, the right move)
  // ===================================================================
  {
    id: "email-lin-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You open the laptop. You go to Gmail. You open a new message to Lin's clinical email.",
      },
      {
        speakerId: null,
        text: "YOU: 'Dr. Lin, had a panic attack at the Trader Joe's on Court Street yesterday Sunday around 11:23 a.m. body had triggers (bad sleep, three coffees, low-grade Christmas activation). Stayed and rode it via box breathing. Five cycles, peak at cycle three, descended by checkout. Got home okay. Slept badly last night. This morning anticipatory anxiety firing at the thought of the F train. Want to do the right thing. What's the plan?'",
      },
      {
        speakerId: null,
        text: "You hit send at 7:18 a.m. the body's anticipatory anxiety is still firing. Sending the email did not solve it. What sending the email DID was give the body a structured external next-step that is not a coping decision. The act of consulting the clinician is itself a small skill, it routes the morning to her expertise rather than to your own scrambling.",
      },
      {
        speakerId: null,
        text: "Lin's reply lands at 8:47 a.m., she has read it between her 8 a.m. and 9 a.m. clients.",
      },
      {
        speakerId: "lin",
        text: "Sam, good. Glad you rode the panic via the breathing yesterday, that is the right outcome. About this morning: take the train today. Specifically: take the F at 8:52 (less crowded than 8:32). Stand at the front of the platform; first car is usually emptiest. If anticipatory anxiety hits 6/10 deploy box breathing immediately. Same protocol as yesterday. If it hits 9/10 and it shouldn't if you deploy at 6, the pre-named exit is Carroll Street, get off, sit on the platform bench, run cycle four through six. We'll discuss this Wednesday and add the formal exposure protocol to the treatment plan. You have done this work. Today's train is rep 1. YL",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You read the email twice. The structured graded protocol is the work, specific train, specific time, specific car, specific deployment threshold, specific named exit. The body that has just been handed a plan does not feel relief, exactly, but it feels HELD. The decision is no longer yours to make from your own scrambling chemistry; it has been made by Lin and you are executing the plan.",
      },
      {
        speakerId: null,
        text: "You take the F at 8:52. You stand at the front of the platform. The first car is, as Lin said, less crowded, half-full, mostly Park Slope parents with strollers. You board. Anticipatory anxiety at a 5. You watch the doors close. The train accelerates.",
      },
      {
        speakerId: null,
        text: "By Carroll Street the anxiety is at a 6. You deploy box breathing, 4 in, 4 hold, 4 out, 4 hold. By Smith-9th you are at a 4. By York Street you are at a 3. By the time you arrive at work, the body has gotten through the trip on the planned protocol, with the anxiety never escalating to the threshold that required the named exit.",
      },
      {
        speakerId: null,
        text: "You arrive at work at 9:09. You email Lin: 'On the train. Anxiety hit 6 at Carroll. Deployed breathing. Down to 3 by York. Will see you Wednesday.'",
      },
      {
        speakerId: "lin",
        text: "Excellent. That is a complete exposure trial. The body now has counter-evidence to yesterday's conditioning. Wednesday's session will build on this. YL",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What just happened is the protocol that closes the avoidance trap. The body had two conditioning events in 24 hours, yesterday's panic at TJs, this morning's anticipatory anxiety. The morning email gave Lin the data she needed to design a graded exposure trial that the body could complete. The trial provided counter-evidence. F train ridden, anticipatory anxiety managed, no escalation to panic. That counter-evidence is the foundation of the exposure work that will close the trap across the next four to six weeks.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The whole sequence, email, plan, trial, debrief, took less than two hours. The substitution for the avoidance paths is small in time. It is also the difference between a one-week containment of yesterday's panic and a six-month treatment escalation. The body that consults the clinician before deploying its own coping is the body whose recovery compounds.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-email-end",
        text: "End scene.",
        tactic: "The email-Lin ending.",
        nextSceneId: "ending-email-lin",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-stay-home",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Apartment",
    endingLearnPrompt:
      "You stayed home. The relief lasted four days. By Friday the avoidance had generalised, trigger is no longer 'crowded grocery stores' but 'leaving the apartment.' This is how panic disorder consolidates into agoraphobia in six to twelve weeks. The repair on Wednesday will be harder than it would have been Monday morning at 7:14, exposure to the avoided environments, with structured graded protocols, possibly with Mia present, possibly across multiple weeks. Not catastrophic. Significantly more expensive in time and energy than an email to Lin would have been. Avoidance is the single most reliable predictor of chronic panic disorder.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The apartment-as-safe-zone shape is one of the cleanest examples of conditioning compounding in clinical anxiety. The body that experiences four consecutive days of relief from staying home cannot distinguish 'I avoided panic by staying home' from 'I would have been fine if I had left.' Without counter-evidence, the conditioning compounds across each additional day. The repair via exposure works. The repair takes longer the deeper the conditioning has gone. The window when intervention is cheapest is the morning after the first panic.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-uber",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Just One More Day",
    endingLearnPrompt:
      "Four Ubers. $480 on the credit card. The 'just one more day' move is the most common slow-erosion shape in panic disorder, and one of the hardest to interrupt because the financial cost is masked under small-purchase threshold and no individual day's decision feels catastrophic. By next Wednesday Mia notices the statement and gently flags it. You email Lin Wednesday afternoon. Five days of compounded conditioning that would have been simpler to interrupt this morning. The repair via exposure works. It just takes longer than it would have today.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Partial avoidance is structurally identical to full avoidance, with the cosmetic difference that the body believes it is 'mostly functional.' The body's conditioning does not respect the cosmetic difference. The trigger generalises (F train → all morning trains → all subway lines) at approximately the same rate that the avoidance generalises (Uber Monday → Uber every weekday → Uber on weekends too). The skill substitution is the email-to-Lin move; thirty seconds of typing prevents weeks of compounding.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-force-march",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Plymouth Street",
    endingLearnPrompt:
      "You forced yourself onto the F train without skill or scaffolding. By York Street the body had fired full panic. You threw up on Plymouth Street. The conditioning is now stronger than yesterday's, because the failure trial included a public somatic event. The body has associated the F train with PANIC AND THROWING UP. The repair on Wednesday will require unwinding both conditionings. White-knuckle exposure works in approximately the same percentage of cases as untrained physical therapy works for a torn ACL, which is approximately none. The skill is graded exposure with a structured plan; the consultation that produces the plan takes thirty seconds of typing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "White-knuckle exposure is the most well-meaning version of avoidance because it looks like the courageous move. It is also the version that produces the deepest conditioning, because each white-knuckle failure adds a new evidence-trial to the body's archive of 'public spaces produce panic.' Lin will not be angry. Lin will, calmly, name the structural mistake and propose the proper graded protocol. The next four to six weeks will include exposure trials at lower-stakes thresholds. F train at 11 a.m. (less crowded), then 9 a.m., then rush hour, until the body's conditioning extinguishes.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-wine",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Two Ounces",
    endingLearnPrompt:
      "Two ounces of wine in the morning coffee. The body's anticipatory anxiety dropped within fifteen minutes. The train ride was fine. By 11 a.m. the alcohol metabolised out and rebound anxiety arrived, louder than the original. By trial four next Monday, the wine was in the coffee before the body had even fired. By trial twenty, the body's tolerance for un-medicated transit had dropped, meaning subway-without-wine produced panic that subway-with-wine did not, which is the conditioning by which the substance use becomes structurally necessary. Anxiety-driven substance use is one of the most under-recognised slow-poisons in clinical anxiety, partly because it does not look like drinking-too-much in recognisable shapes. Lin's eventual conversation about it adds three to six months of treatment. The substitution is the thirty-second email today.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Alcohol as anxiety-management is structurally similar to benzodiazepine-as-anxiety-management without the prescription, with the cosmetic difference that nobody calls it medication. The brain's GABA system does not care which molecule activates it; the conditioning is the same. The clinical literature on anxiety-driven substance use is one of the under-priced bodies of research in mental health, it is well-documented, it is treatable, and it is rarely surfaced by primary-care physicians who are screening for the obvious-shapes of alcohol use disorder. The two ounces in the morning coffee is the canonical opening trial.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-email-lin",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Rep 1",
    endingLearnPrompt:
      "You emailed Lin. Lin replied at 8:47 with a structured graded protocol. You took the F at 8:52, in the front car, anxiety at 6 at Carroll, breathing deployed, down to 3 by York. The trial was complete. Counter-evidence to yesterday's conditioning is now in the body's archive. Wednesday's session will build on this. The whole sequence took less than two hours. The substitution for the four avoidance paths is small in time. It is also the difference between a one-week containment of yesterday's panic and a six-month treatment escalation. The body that consults the clinician before deploying its own coping is the body whose recovery compounds.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Lin's email-back-with-protocol is the kind of clinical responsiveness that not every therapist provides, between-session emails of clinical substance are increasingly common in CBT-orthodox practices but are not universal. If your own therapist does not provide them, the substitution is the post-session call back, the calendar slot for an emergency session, or the agreed-on phone protocol. The mechanism is the same: route the immediate decision through the clinician's structured protocol rather than through your own panicked chemistry.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The phrase 'rep 1' in Lin's reply is the orthopaedic-physiotherapy framing applied to exposure work and it is the framing she will use in Wednesday's session and across the next four to six weeks. Each completed exposure is one rep. Reps compound. The body that completes 40 reps over six weeks is the body whose conditioning has extinguished. The body that completes 8 reps and avoids the rest is the body whose conditioning persists. Today was rep 1. The math from here is straightforward.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety32: Scenario = {
  id: "anx-3-2",
  title: "The Morning After Panic",
  tagline: "Monday, 7:14 a.m. the body is firing about the F train. The avoidance trap is opening. Five available moves.",
  description:
    "The avoidance fork. Sam Monday morning after the L3-1 grocery-store panic, with anticipatory anxiety firing at the thought of any environment that resembles Trader Joe's, including the F train. Five available moves: stay home (full avoidance, generalises to agoraphobia in 6-12 weeks); take an Uber (partial avoidance, slow-erosion shape); white-knuckle the train (avoidance with extra steps, produces re-panic and stronger conditioning); two ounces of wine in the coffee (substance-use cautionary path, anxiety-driven AUD installs in 4-6 trials); email Lin before deciding (consultation move, produces structured graded protocol, completes rep 1 of exposure work). Five endings. The cheapest intervention window is the 7:14 a.m. of the morning after.",
  tier: "premium",
  track: "anxiety",
  level: 3,
  order: 2,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 440,
  badgeId: "rep-one",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Anticipatory anxiety as the maintenance shape of panic disorder, body scans for trigger conditions across days following the first attack",
    "The consultation move, email the clinician before deploying your own coping; route the morning to her expertise rather than to your scrambling chemistry",
    "Graded exposure protocol, specific train, specific time, specific car, specific deployment threshold, named exit; structured by the clinician, executed by the body",
    "Counter-evidence as the close of the avoidance trap, one completed exposure trial provides the body's archive with a non-conditioning data point",
    "Reps as the framing, 40 exposures over 6 weeks compound into extinguished conditioning; 8 exposures plus avoidance compound into persistent disorder",
  ],
  redFlagsTaught: [
    "Full avoidance, fastest path from a single panic attack to agoraphobia; conditioning compounds across each additional day of staying home; cheapest intervention window is the first morning",
    "Partial avoidance via the 'just today' substitution. Most common slow-erosion shape; financial cost masked under small-purchase threshold; trigger generalises at the rate avoidance generalises",
    "White-knuckle exposure without skill, looks like courage, structurally avoidance with extra steps; failure trials add public somatic events to the body's evidence archive of 'public spaces produce panic'",
    "Anxiety-driven alcohol use, installs in 4-6 trials; tolerance for un-medicated transit drops; substance becomes structurally necessary; under-recognised because it does not look like drinking-too-much in recognisable shapes",
  ],
  characters: [INNER_VOICE, SAM, LIN],
  scenes,
};

export default anxiety32;
