/**
 * tn-4-1 — "The 18-Month Exit"
 *
 * Toxic-Narc track, Level 4 (The Narc Spouse), order 1. You are
 * nineteen years into a marriage that works on paper. The
 * register inside it has, across the last four years, resolved
 * into something you can no longer describe to your sister as
 * 'just a rough patch.' Eleven weeks ago you read the sentence
 * that made the decision: not a dramatic sentence, a small one,
 * across the kitchen table, about whose turn it was to drive.
 *
 * The decision is not the scenario. The scenario is one
 * Wednesday — specifically today, 6:37 a.m. to 7:14 p.m. — in
 * which three logistics moves must be executed without the
 * spouse detecting any of them. The exit itself is eight to
 * twelve months away. This Wednesday is infrastructure.
 *
 * Survival, not escape, is the unit of work. The scenario does
 * not ask whether to leave; it assumes the decision is made and
 * teaches the specific operational discipline of the slow exit.
 *
 * Teaches:
 *  - The three-move rule for an infrastructure Wednesday —
 *    separate account, medical record, locksmith booking
 *  - Phone hygiene: no search history, no synced bank app, no
 *    contact saved under the actual name, recently-used call log
 *    managed before the spouse gets home
 *  - The untraceable-by-default principle: every move lives
 *    outside the shared digital surface (joint browser history,
 *    shared cloud, car GPS, home Alexa, etc.)
 *  - The sister's role — offsite backup, not on-record in any
 *    phone you own that goes home
 *  - Staying in the marriage operationally for eight more months
 *    while the infrastructure completes — the scenario's
 *    hardest register
 *
 * Mandatory content gate. Register is clinical-operational, not
 * emotional. Voice: reference/KANIKA-VOICE.md and
 * reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

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
        text: "Content note. This scenario assumes the decision to leave a long-term marriage has been made offstage. It does not prescribe or persuade. It teaches the operational discipline of a slow exit — the eight-to-twelve-month infrastructure window, not the leaving itself.",
      },
      {
        speakerId: null,
        text: "The register is clinical-operational, not emotional. If the scenario you need tonight is about whether to make the decision, this is the wrong one — come back to this when that conversation with yourself has already happened.",
      },
      {
        speakerId: null,
        text: "If this is the right scenario for you tonight, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Wednesday morning, 6:37 a.m. The spouse is in the shower. You have the kitchen to yourself for eleven minutes.",
        nextSceneId: "wednesday-morning",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. The decision this scenario assumes is not one to run through uncertainly.",
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
      "The opt-out is a complete move. The scenario will be available when the conditions are right. Infrastructure work does not start until the decision is stable — and the scenario is built for the phase after the decision, not during it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The scenario will be here.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // WEDNESDAY MORNING — THE ELEVEN MINUTES
  // ===================================================================
  {
    id: "wednesday-morning",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 6:37 a.m. The shower is running down the hall. The spouse takes eleven to thirteen minutes on a shower. You have the kitchen to yourself. The list for today is three items long. You have written the list, across eleven weeks, approximately two hundred times in your head. Today is the Wednesday you do it.",
      },
      {
        speakerId: null,
        text: "The three moves:",
      },
      {
        speakerId: null,
        text: "1. Open the separate account with the digital-only bank. (Phone-only, no paper, no mail to the house.) 2. Book the GP appointment for Friday afternoon. 3. Book the locksmith for consultation-only — no date, just a quote in writing that exists in your name. ",
      },
      {
        speakerId: "inner-voice",
        text: "The order matters. The account first, because it takes the longest and the verification call might come mid-morning. The GP second, because it is the shortest. The locksmith third, because the person who picks up has to hear your actual voice and you want that to happen from the car at lunch, not from the kitchen.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "account-first-as-planned",
        text: "Stick to the plan. Account first — open the app you sideloaded last month, start the application, give yourself nine minutes.",
        tactic: "Plan-adherence is the whole discipline on a Wednesday like this. The order was chosen across eleven weeks; trust it over the Wednesday-morning nerve.",
        nextSceneId: "account-opening",
        isOptimal: true,
      },
      {
        id: "gp-first-easier",
        text: "Do the GP first. It is easier; it will settle the hands before the harder one.",
        tactic: "Re-ordering on the day, mid-adrenaline, is how plans fragment. The rationale ('settle the hands') is the nervous system bargaining. The plan is the plan.",
        nextSceneId: "reordered",
        isOptimal: false,
      },
      {
        id: "abort-today",
        text: "Abort today. He seemed tense last night. Do it next Wednesday instead.",
        tactic: "The abort-reflex is the most common specific failure mode in the infrastructure window. The number of Wednesdays between today and the actual leave date is finite; every aborted one extends the window and compounds the operational strain.",
        nextSceneId: "aborted-today",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACCOUNT OPENING
  // ===================================================================
  {
    id: "account-opening",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You open the app. You have practised the application across two weekends on a burner scenario — the fields are memorised. Name, address, DOB, employer, proof of ID via a photo you took on Monday of your driver's licence (and deleted from the camera roll the same evening; it lives only in the app now).",
      },
      {
        speakerId: null,
        text: "The address field is the one decision left. Not the house. Your sister's flat — with her written permission, pre-discussed, and a printed notice in her kitchen drawer confirming you receive mail there.",
      },
      {
        speakerId: "inner-voice",
        text: "Your sister's flat is the right answer. It is legal, it is documented, and it removes the single highest-risk artefact — mail from an unknown bank arriving at the house during the eight months of infrastructure.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "sisters-flat-address",
        text: "Use your sister's flat. Submit the application.",
        tactic: "The infrastructure's single most important decision. The alternative addresses — work, P.O. box, a friend — each have specific failure modes your sister's flat does not.",
        nextSceneId: "verification-call-pending",
        isOptimal: true,
      },
      {
        id: "home-address-because-fast",
        text: "Use the home address. The mail can be intercepted; you are home more than he is.",
        tactic: "The home-address decision is the specific infrastructure move that compounds across the eight months. One mis-timed morning — one stack of mail he happens to pick up — and the window closes. Do not.",
        nextSceneId: "home-address-used",
        isOptimal: false,
      },
      {
        id: "work-address",
        text: "Use your work address. You are there every weekday.",
        tactic: "Work address is better than home; worse than sister. The specific risks: an HR or facilities staffer opening misdirected mail, a postal shift pattern you do not control, and the professional-life contamination of the exit infrastructure.",
        nextSceneId: "work-address-used",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // VERIFICATION CALL PENDING → THE CALL HAPPENS
  // ===================================================================
  {
    id: "verification-call-pending",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The application submits. The confirmation screen says a verification call will come within two hours. The spouse's shower stops. You move from the kitchen to the home office with your coffee. You do not say anything when he walks past in his towel.",
      },
      {
        speakerId: null,
        text: "6:51 a.m. You have nine minutes before he leaves for the gym. The plan is: he leaves at 7:00, you have the house until 8:30, you do the GP call from the office before starting work.",
      },
      {
        speakerId: "inner-voice",
        text: "The phone is on silent. If the bank calls now, it goes to voicemail with a generic greeting you changed last week. If he hears the phone vibrate on the counter, the question he asks will not be an emergency — but the answer you produce has to be ready.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "phone-to-bedroom",
        text: "Take the phone to the bedroom. Leave it under the pile of clean laundry you meant to fold.",
        tactic: "The structural move: put the phone in a location where he has no reason to go in the next eight minutes. The laundry pile is both a visual screen and a reason to not touch.",
        nextSceneId: "spouse-leaves",
        isOptimal: true,
      },
      {
        id: "phone-in-pocket",
        text: "Put the phone in your dressing-gown pocket.",
        tactic: "Pocket is fine for thirty seconds. The vibration is detectable if he leans on you while finding his keys. Prefer structural separation.",
        nextSceneId: "pocket-close-call",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SPOUSE LEAVES
  // ===================================================================
  {
    id: "spouse-leaves",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"I will be back at eight. We can drive in together. I want to talk about the weekend."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The 'we can drive in together' is the test. It is not a genuine offer. It is a scope-expansion — a way to convert your morning from his forty-minute absence into his presence in the car for the forty-minute commute. Decline cleanly.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "decline-the-drive-in",
        text: '"I\'m going in earlier — I have an 8:30 meeting. See you tonight."',
        tactic: "The structural decline. A reason he cannot argue with, no apology, no performed regret, no re-opening.",
        nextSceneId: "alone-in-house",
        isOptimal: true,
        event: "failure-rejected",
      },
      {
        id: "accept-the-drive-in",
        text: '"Sure, let\'s drive in together."',
        tactic: "The accept converts your morning from a covert operational window to a co-presence window. The GP call and the locksmith call can no longer happen at 8:15 or 9:00. Infrastructure delayed by at least one Wednesday.",
        nextSceneId: "drive-in-accepted",
        isOptimal: false,
      },
      {
        id: "vague-maybe",
        text: '"Maybe — I will see how the morning goes."',
        tactic: "The vague-maybe is the anxious-appeasement move. He will read it as a soft yes and plan around it. You will have to firm it up in twenty minutes. Firm now.",
        nextSceneId: "vague-backfired",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ALONE IN HOUSE — THE GP CALL
  // ===================================================================
  {
    id: "alone-in-house",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The front door closes at 6:58 a.m. The car reverses out of the driveway at 7:00. You stand in the kitchen. The house is yours for ninety minutes.",
      },
      {
        speakerId: null,
        text: "You retrieve the phone from the laundry pile. There are no missed calls yet. You go back to the kitchen. You dial the GP's appointment line. A receptionist picks up at 7:03.",
      },
      {
        speakerId: "inner-voice",
        text: "The script for this call is a paragraph you memorised last week. A Friday afternoon appointment, with Dr [name], forty-five minutes, in person, for ongoing mental-health support. Not 'urgent.' Not 'crisis.' Ongoing. You want the record to start building a paper trail now, not later.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "book-friday-afternoon",
        text: "Book Friday at 3:30. In person. Forty-five minutes. Ongoing support.",
        tactic: "Exactly the script. The language creates the specific record that will matter in ten to eighteen months.",
        nextSceneId: "gp-booked",
        isOptimal: true,
      },
      {
        id: "book-lunchtime-easier",
        text: "Book Friday lunch — easier to hide from the spouse if he asks about the afternoon.",
        tactic: "Plausible, but a lunch appointment compresses the conversation. Forty-five minutes of paper-trail work > twenty minutes that has to skip the specifics.",
        nextSceneId: "gp-booked-short",
        isOptimal: false,
      },
      {
        id: "explain-the-reason",
        text: "When the receptionist asks the reason, explain the marriage situation in summary.",
        tactic: "The reason is not for the receptionist. The reason is for the doctor, in person, at 3:30 on Friday. The receptionist does not need the story and the phone call does not need to carry it.",
        nextSceneId: "over-explained",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // GP BOOKED — LOCKSMITH NEXT (AT LUNCH)
  // ===================================================================
  {
    id: "gp-booked",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The GP is booked. Friday, 3:30 p.m. You end the call at 7:06. You put the phone down. Two of the three moves are, in their way, done — account submitted, GP booked.",
      },
      {
        speakerId: "inner-voice",
        text: "The locksmith is the 1:15 p.m. call from the car. Not from the kitchen. Not from the office desk. The car at lunchtime, engine on, driving slowly around the industrial estate three streets from the office.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The verification call from the bank comes through at 10:47 a.m. You take it in the stairwell between the third and fourth floors. Eight minutes. Standard questions. The account is confirmed open at 10:55.",
      },
    ],
    choices: [
      {
        id: "to-lunch-locksmith",
        text: "12:58 p.m. Grab the car keys. Tell the team you are taking lunch out. Drive.",
        tactic: "Commit to the third move on schedule. The temptation to defer will be highest here because two are already done.",
        nextSceneId: "locksmith-call",
        isOptimal: true,
      },
      {
        id: "skip-locksmith-today",
        text: "Skip the locksmith. Two of three is a good Wednesday. Do the third next week.",
        tactic: "The two-of-three compromise is the specific way the infrastructure window extends from twelve months to seventeen. The adrenaline you have built this morning is a non-renewable resource; use it.",
        nextSceneId: "deferred-locksmith",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // LOCKSMITH CALL
  // ===================================================================
  {
    id: "locksmith-call",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The car is in the industrial estate. You are driving slowly enough to take the call on the car's speaker. 1:17 p.m. The locksmith picks up. You ask for a consultation-only quote — written, emailed to a specific address (not the joint email, not your work email; the standalone Gmail you set up six weeks ago on the burner browser profile).",
      },
      {
        speakerId: "inner-voice",
        text: "The language is: 'I would like a quote in writing for full rekeying of a three-bedroom detached — no work commissioned yet, just the quote for planning.' The locksmith has heard this call before. He will write the quote without asking anything further. His job is the quote; your job is to not volunteer.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "script-clean",
        text: "Follow the script exactly. Quote in writing, emailed to the Gmail, no work commissioned.",
        tactic: "Script discipline. The locksmith call is the shortest and cleanest of the three if you do not improvise.",
        nextSceneId: "three-moves-complete",
        isOptimal: true,
      },
      {
        id: "ask-about-timing",
        text: "Ask how quickly he could do a rekeying if you needed it on short notice.",
        tactic: "Timing questions in the quote call are recorded — often in the locksmith's own notes, sometimes in a call-recording system. The question is for the second call, six months from now. This call is the quote only.",
        nextSceneId: "timing-asked",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THREE MOVES COMPLETE — EVENING
  // ===================================================================
  {
    id: "three-moves-complete",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The quote arrives by email at 2:40 p.m. — £1,240, itemised, no date attached. You forward it to your sister from the Gmail; you delete it from the sent folder; you archive it in a folder your sister named. Wednesday's three moves are complete by 2:44 p.m.",
      },
      {
        speakerId: null,
        text: "7:14 p.m. You are home. The spouse is making dinner. He turns when you walk in and asks how your day was. You answer with the specific phrase you have rehearsed for every Wednesday like this: 'Busy, fine — I will tell you over dinner.' Then you will talk, over dinner, about the three ordinary things that did happen at work, which were true and unrelated.",
      },
      {
        speakerId: "inner-voice",
        text: "The eight months begin tonight. The infrastructure Wednesdays will be approximately eighteen of them before the exit Wednesday, which is not this one. Tonight is the first of them. You survive this dinner the way you have survived the last eleven weeks of dinners — with the operational log running quietly behind the ordinary sentences.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "dinner-held",
        text: "Dinner is held. The Wednesday closes cleanly.",
        tactic: "The Wednesday's whole discipline was: three moves, no detection, one ordinary dinner.",
        nextSceneId: "ending-three-moves-wednesday",
        isOptimal: true,
      },
      {
        id: "log-everything-tonight",
        text: "After dinner, while he watches the news, log the Wednesday's three moves in the sister's shared document. Date, time, outcome, next steps.",
        tactic: "The documentation is the obsidian-tier move. Two versions of the operational log — yours on the Gmail, your sister's on her drive — mean that if any one document is compromised the other survives. The logging itself takes eleven minutes and closes the Wednesday's loop.",
        nextSceneId: "ending-eighteen-month-infrastructure",
        isOptimal: true,
        event: "optimal-with-grace",
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES — SHORTER
  // ===================================================================
  {
    id: "reordered",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You re-ordered. The GP call is now first. It goes fine — two minutes. Then you go to open the bank app and the 7:00 a.m. moment you had earmarked for the longer call has become the 7:12 a.m. moment he is standing in the kitchen asking what you are working on. The plan fragmented.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "salvage-after-work",
        text: "Salvage. Open the account from the stairwell at work, on lunch. It is no longer a clean Wednesday but it is still a Wednesday.",
        tactic: "Partial recovery. The cost is eleven weeks of compounding if the pattern repeats, but today's bank move is not dead.",
        nextSceneId: "account-opening",
        isOptimal: true,
      },
    ],
  },

  {
    id: "aborted-today",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The abort is the most common specific failure mode across the infrastructure window. You will tell yourself this Wednesday did not count. The exit date, as a mathematical matter, moved later by one Wednesday. That is not catastrophic in isolation; it is catastrophic if it happens to six of the next ten Wednesdays.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "commit-next-wednesday",
        text: "Log the abort in the sister's document with the specific reason. Commit to next Wednesday with the same three moves.",
        tactic: "The log is the whole recovery. An unlogged abort becomes an unlogged pattern; a logged one stays countable.",
        nextSceneId: "ending-aborted-logged",
        isOptimal: true,
      },
    ],
  },

  {
    id: "home-address-used",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The home address is in the application. The account is submitted. The first piece of mail — a welcome letter — will arrive within seven to ten business days. Every morning between now and then is a coin-flip: do you get to the mailbox first, or does he?",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "cancel-and-reapply",
        text: "Call the bank the moment you are alone again. Cancel the application. Re-apply with the sister's flat as the address.",
        tactic: "Cancellation is a clean reset. Re-applying within the same week avoids the compounding of the mailbox-watching.",
        nextSceneId: "cancelled-recovered",
        isOptimal: true,
      },
      {
        id: "intercept-the-mail",
        text: "Accept the risk. Intercept the mail over the next two weeks.",
        tactic: "The mailbox-watching window is not a one-time risk. It will repeat with every subsequent piece of mail: statement, card, fraud alert. You are converting a one-time fix into a permanent surveillance task on yourself.",
        nextSceneId: "ending-intercept-duty",
        isOptimal: false,
      },
    ],
  },

  {
    id: "work-address-used",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The work address is better than home. It is also a specific contamination: your exit infrastructure now lives at your employer, where a facilities staff member will at some point sort misdirected mail, where an HR system may log deliveries, and where a resignation six months from now has to account for why a bank has been writing to you there.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "switch-to-sister",
        text: "Update the address with the bank to your sister's flat tomorrow. Work was the easy answer, not the right one.",
        tactic: "Early correction. Updating within the first seven days is usually free and undetected.",
        nextSceneId: "sister-switch-recovery",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pocket-close-call",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The phone vibrates in your pocket as he leans in to say goodbye. He feels it. He pulls back and looks at you.",
      },
      {
        speakerId: "spouse",
        text: '"Who is texting you at seven a.m.?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The question is not the emergency. The answer you produce is. A real lie is memorable and unravels; the answer that works is boring and true-adjacent.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "boring-truth-adjacent",
        text: '"My sister — she is fighting with her landlord again, it is an email."',
        tactic: "Boring, plausible, references a recurring real thing (your sister's actual landlord dispute), closes the question without inviting the next one.",
        nextSceneId: "spouse-leaves",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "elaborate-lie",
        text: '"It is work — the Barcelona client is in a different time zone, they send things overnight."',
        tactic: "The elaborate lie introduces new verifiable facts (Barcelona, overnight, a client). Every new fact is a future risk. Prefer the boring truth-adjacent.",
        nextSceneId: "lie-compounded",
        isOptimal: false,
      },
    ],
  },

  {
    id: "drive-in-accepted",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The drive-in is accepted. The next ninety minutes are co-presence. The GP call cannot happen in the car. The locksmith call cannot happen over lunch if lunch is in the office cafe where he might drop by. Today's Wednesday is now, operationally, next Wednesday.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "salvage-bank-only",
        text: "The bank app is already submitted. Treat today as a one-of-three day. Log it. Move the GP and locksmith to next Wednesday.",
        tactic: "The partial-salvage. A one-of-three Wednesday is a real Wednesday, not a failure — provided it is logged and the next one re-commits to three.",
        nextSceneId: "ending-one-of-three",
        isOptimal: true,
      },
    ],
  },

  {
    id: "vague-backfired",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"OK — I will wait until 7:45 in case you want to come in together."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The vague answer produced his plan. You now have forty-five minutes of his presence instead of zero. Firm the answer now.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "firm-up-now",
        text: '"Actually — I realised I have to prep for the 8:30. Go ahead without me."',
        tactic: "Firm, specific, and does not re-open. The vague-backfire is recoverable if the firmness arrives within sixty seconds.",
        nextSceneId: "spouse-leaves",
        isOptimal: true,
      },
    ],
  },

  {
    id: "deferred-locksmith",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Two of three is a two-of-three. The third item moves to next Wednesday. The specific cost is not the week; it is the precedent — the next time you are close, on adrenaline, and want to skip the hardest of three, the rationale will arrive faster.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "log-and-commit",
        text: "Log the deferral in the sister's document. Specify the exact Wednesday the locksmith gets made.",
        tactic: "The log is the whole recovery for a deferral. An unlogged deferral becomes a three-of-four pattern that compounds.",
        nextSceneId: "ending-two-of-three",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // SHORTER ENDINGS FOR SIDE BRANCHES
  // ===================================================================
  {
    id: "over-explained",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The receptionist was warm; she did not need the story. The over-explanation is a small tell — specifically to a receptionist who will not repeat it, but it establishes a pattern inside you. Keep the script for Friday.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "move-on",
        text: "Move on. Locksmith at lunch.",
        tactic: "No recovery needed; the booking is fine. Carry the specific move-discipline to the next call.",
        nextSceneId: "locksmith-call",
        isOptimal: true,
      },
    ],
  },

  {
    id: "gp-booked-short",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Lunchtime is twenty minutes. The record will be thinner than a forty-five-minute one. Not a failure, but an exit-infrastructure cost you will feel in twelve months when the record matters.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "move-on-short",
        text: "Move on. Locksmith at lunch.",
        tactic: "Carry forward. A second GP appointment can be added in four weeks to build the record back up.",
        nextSceneId: "locksmith-call",
        isOptimal: true,
      },
    ],
  },

  {
    id: "timing-asked",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The locksmith answered: '24 hours from payment, sometimes same day for rekey only.' The answer is useful. The fact that you asked is now in his notes or his memory; next call has to be someone different, or a long-enough gap that he does not connect the two.",
      },
    ],
    choices: [
      {
        id: "note-and-carry",
        text: "Make a note in the sister's document. Next time, use a different firm for the actual booking.",
        tactic: "Operational adjustment. The infrastructure is resilient to one misstep provided the next step adapts.",
        nextSceneId: "three-moves-complete",
        isOptimal: true,
      },
    ],
  },

  {
    id: "cancelled-recovered",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Cancelled within the hour. Re-applied with the sister's flat. The infrastructure is back on plan. Cost: two hours of the Wednesday and a small spike of adrenaline. Recoverable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "continue-plan",
        text: "Continue to GP call.",
        tactic: "Plan resumed.",
        nextSceneId: "alone-in-house",
        isOptimal: true,
      },
    ],
  },

  {
    id: "sister-switch-recovery",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Address switch initiated tomorrow. The work-address mail will be managed for the seven-day window; the future mail goes to the sister. Recovery is clean.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "continue-day",
        text: "Continue the Wednesday.",
        tactic: "Carry forward.",
        nextSceneId: "alone-in-house",
        isOptimal: true,
      },
    ],
  },

  {
    id: "lie-compounded",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: '"Barcelona? Since when do we have a Barcelona client?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The new fact is the specific failure mode of the elaborate lie. Walk this back with a smaller truth before it becomes a multi-thread problem.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "walk-back",
        text: '"Sorry — not Barcelona, I am confusing accounts. It was the landlord thing from my sister. I am under-caffeinated."',
        tactic: "Walking back via an under-caffeinated self-deprecation is plausible and close the thread without adding more facts.",
        nextSceneId: "spouse-leaves",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-three-moves-wednesday",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Three Moves",
    endingLearnPrompt:
      "Infrastructure is the unit of work, not escape. Three moves, executed untraceably, in an eleven-hour window, closed with one ordinary dinner — that is a Wednesday. Approximately eighteen more of them stand between today and the exit Wednesday, which will be the cleanest of them all because of the eighteen that came before.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Account open. GP booked. Quote in hand, forwarded, archived. The operational log for today reads clean. Tomorrow is a Thursday — no infrastructure moves, no adrenaline, just the ordinary eight months you are staying operationally inside the marriage while the infrastructure completes.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-eighteen-month-infrastructure",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Eighteen-Month Infrastructure",
    endingLearnPrompt:
      "The obsidian-tier version of the Wednesday is the one where the moves are done AND the documentation is kept in two places. Your Gmail; your sister's drive. Redundancy is what makes the infrastructure actually load-bearing across eight months. One document is a hope; two documents is a system.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three moves. Logged in two places. Dinner held. The Wednesday is closed. The infrastructure, as a system, has just moved from 'in progress' to 'operational.' The rest of the eight months is execution, not invention.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-one-of-three",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The One-Of-Three",
    endingLearnPrompt:
      "The drive-in consumed the Wednesday's operational window. The one remaining move (the account, already submitted) stands. The cost is not catastrophic — it is the specific pattern of a co-presence request successfully converting a Wednesday into a half-Wednesday. Next time, decline in the first thirty seconds.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "One move, logged. Two deferred to next Wednesday. The infrastructure shifts by one week. Noted in the document.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-two-of-three",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Two-Of-Three",
    endingLearnPrompt:
      "Two of three is real work; it is not a failed Wednesday. The discipline is to log the deferral with a specific next date — and to treat the next Wednesday as a must-complete-three, not a repeat of today's pattern.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Account open, GP booked, locksmith to next Wednesday 1:15 p.m. Logged. The system continues.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-intercept-duty",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Mailbox Watch",
    endingLearnPrompt:
      "Every non-optimal decision in the infrastructure window produces a surveillance task on yourself. The mailbox-watching routine becomes a permanent part of the next eight months — it is cognitive load, it is adrenaline every morning, and it is a single coin-flip away from a mis-timed morning. The correction is to re-issue the address change tomorrow, which should have been done today.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Every morning for the next ten business days you will wake at 6:20 to beat him to the mailbox. That is the cost of the shortcut.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-aborted-logged",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Logged Abort",
    endingLearnPrompt:
      "A logged abort is countable; an unlogged one becomes a pattern. The aborted Wednesday is not a moral failure — it is a data point. The recovery is the log itself, which makes the next Wednesday more likely to complete.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Logged. Next Wednesday, 6:37 a.m., three moves, same plan, same order.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const toxicNarc41: Scenario = {
  id: "tn-4-1",
  title: "The Eighteen-Month Exit",
  tagline: "Wednesday, 6:37 a.m. The shower is running. Three moves before dinner, no detection.",
  description:
    "Nineteen years into a marriage that works on paper. The decision to leave was made eleven weeks ago. Today is one Wednesday in the eight-to-twelve-month infrastructure window — not the exit, not the decision, just one day's three moves executed untraceably. Survival, not escape, is the unit of work.",
  tier: "vip",
  track: "toxic-narc",
  level: 4,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 500,
  badgeId: "three-moves-wednesday",
  startSceneId: "content-gate",
  prerequisites: ["tn-1-1"],
  tacticsLearned: [
    "The three-move Wednesday: separate account, medical record, locksmith quote — executed in that order",
    "The sister's-flat address rule: every address of record lives outside the shared digital surface",
    "Boring-truth-adjacent answers to unexpected questions (use recurring real facts, never introduce new ones)",
    "Decline the drive-in / drive-home scope-expansion in the first thirty seconds, with a reason that does not re-open",
    "The log kept in two places — your Gmail and your sister's drive — as the operational redundancy",
  ],
  redFlagsTaught: [
    "The abort-reflex on an adrenaline Wednesday morning — extends the infrastructure window by weeks each time",
    "Home-address shortcuts that convert a one-time decision into permanent mailbox surveillance",
    "Work-address contamination of the exit infrastructure with your professional life",
    "Timing questions in the quote call that the locksmith writes down or remembers",
    "The elaborate lie with new verifiable facts — every new fact is a future risk",
  ],
  characters: [INNER_VOICE, THE_SPOUSE],
  scenes,
};

export default toxicNarc41;
