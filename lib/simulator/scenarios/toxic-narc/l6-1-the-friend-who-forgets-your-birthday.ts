/**
 * tn-6-1 — "The Friend Who Forgets Your Birthday"
 *
 * Toxic-Narc track, Level 6 (The Narc Friend), order 1. Your closest
 * friend of ten years did not post for your birthday on Sunday. Did
 * not text. Did not like the post you wrote about it yourself. She
 * has posted for three other friends in the past year — each one
 * over-warm, with photo carousels, with the mock-roast caption that
 * means "we are intimate." The asymmetry is no longer deniable.
 *
 * The scenario is not the missed birthday. The missed birthday is
 * the artefact you are using to finally run the audit you have been
 * avoiding for two years. It also closes The Mother Arc — she
 * learned these moves from her own mother, and you spotted them
 * here because you spotted them with yours.
 *
 * Teaches:
 *  - The friend-audit: the specific asymmetric-performance pattern
 *    a covert-narc friend runs (warm in groups + on the friends
 *    less threatening to her; flat on the one whose life is going
 *    well)
 *  - The cost of running the audit honestly when the friendship is
 *    a load-bearing part of your life
 *  - The restructure-without-a-scene move — downgrade her from
 *    inner-circle to ring-2 without an announcement, without a
 *    confrontation, without giving her a martyr-story to tell at
 *    other people's tables
 *  - The Mother-Arc echo: the same register, in a different
 *    relationship, spotted only because you have already done the
 *    work with your mother
 *
 * Voice: clinical-friendship register. The scenario does not pretend
 * the audit is easy or costless; it does not advocate exit. It
 * teaches the specific structural move that lets a long friendship
 * survive the discovery without either denial or scene.
 *
 * Voice reference: KANIKA-VOICE.md and TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_FRIEND, THE_PARTNER } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THREE DAYS LATER
  // ===================================================================
  {
    id: "wednesday-evening",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 7:14 p.m. Your birthday was Sunday. It is now Wednesday. Elise has not texted, posted, or liked your own birthday post. You are at the kitchen counter with the second glass of wine you did not pour for that reason but are about to acknowledge, internally, that you did.",
      },
      {
        speakerId: null,
        text: "You open Instagram. You do not search her — that would be a confirmation move, and the confirmation is already in your hand. You scroll your own feed. Eleven posts down: Elise's story from Saturday night, the dinner she said she could not make on Friday because she was 'absolutely flattened by work.' She is in the photo with three women you do not know, holding what is clearly a third glass of red. The caption is one of those mock-affectionate jokes that signal a long-running in-group.",
      },
      {
        speakerId: "inner-voice",
        text: "The dinner she could not make. The Saturday night. The third glass. The story is forty hours after the text where she said sorry, love you, will make it up to you next month. She has not, of course, made it up to you. She has not made it up to you the previous three times either.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "open-the-audit",
        text: "Open a blank document. Title it: 'Elise — pattern check.' Write the last six things you can remember.",
        tactic: "The audit is a written act, not a thinking-while-scrolling act. Writing forces specificity; specifics resist the friendship-fog the relationship has been protecting. The blank document is the structural move; what you write in it is secondary.",
        nextSceneId: "the-document",
        isOptimal: true,
        event: "tactic-named:narcissistic",
      },
      {
        id: "text-her-now",
        text: "Text Elise: 'hey lovely, hope you had a good weekend xx'",
        tactic: "The performed-warm text is the move you have run six times before. It opens a thread, gets a warm reply, and produces the comfortable forty-eight-hour resolution that absorbs the weekend without requiring you to look at it. Effective at making the wound stop hurting; ineffective at producing information.",
        nextSceneId: "performed-warm",
        isOptimal: false,
      },
      {
        id: "screenshot-to-priya",
        text: "Screenshot Elise's story. Send it to Priya with no caption.",
        tactic: "Outsourcing the audit to Priya is fast, accurate, and emotionally cheap — Priya will see what you see in eleven seconds. The cost is that Priya now carries data about Elise that you have not chosen to give her, and the friend-circle starts sorting itself faster than you intended. Run the audit yourself first; consult after.",
        nextSceneId: "outsourced-fast",
        isOptimal: false,
      },
      {
        id: "drop-it",
        text: "Close Instagram. Pour the third glass of wine. The friendship is what it is.",
        tactic: "The drop-it move is its own answer — one you have given for two years. The scenario does not punish you for it; it just notes that you came to the kitchen counter on a Wednesday night for a reason, and the reason has not changed.",
        nextSceneId: "deferred-again",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE DOCUMENT
  // ===================================================================
  {
    id: "the-document",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You open Notes. You title it: 'Elise — pattern check, started Wed 7:18 pm.' You stop. You drink half the wine. You start typing.",
      },
      {
        speakerId: null,
        text: "1. Sept '24 — promotion. You told her in person at lunch. Five-second pause. 'Oh wow. That is so much pressure though, are you ok?' No congratulations.",
      },
      {
        speakerId: null,
        text: "2. Christmas '24 — three-person dinner you'd planned six months. She cancelled at 4 p.m., 'absolutely shattered.' Posted a story at 8:47 p.m. at someone else's dinner.",
      },
      {
        speakerId: null,
        text: "3. Jen's wedding '25 — Elise made an Instagram carousel. Eleven photos. Caption: 'my soul-friend.' Jen and Elise have known each other four years.",
      },
      {
        speakerId: null,
        text: "4. Saskia's pregnancy '25 — Elise hosted the announcement dinner. Four hours of cooking. Carousel, again.",
      },
      {
        speakerId: null,
        text: "5. Your engagement '25 — text only. 'Yay congrats!! 🥳' Eight hours after you posted. No comment on the post.",
      },
      {
        speakerId: null,
        text: "6. Your birthday '26 — nothing. Nothing.",
      },
      {
        speakerId: "inner-voice",
        text: "The shape is on the screen. Asymmetric performance. The friends she over-celebrates are the friends whose lives are not running ahead of hers. The one whose life is — yours — gets the flat reply. The pattern is in writing now and you cannot un-see it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-the-pattern",
        text: "Name it: 'covert narcissist friend, asymmetric performance, ten-year-pattern.' Save the document.",
        tactic: "Naming is the threshold move. Once it is in writing it becomes operational data, not a feeling. The label is for you, not for any later conversation with her — you will never use it to her face.",
        nextSceneId: "named",
        isOptimal: true,
      },
      {
        id: "soften-the-pattern",
        text: "Add a line: 'maybe she just struggles with my success.' Save.",
        tactic: "The softening line is the friendship-fog reasserting. 'She struggles with your success' is true and is not the operational point — what matters is the asymmetric performance, which is a register, not a feeling. Do not trade the precise language for the kinder one.",
        nextSceneId: "softened",
        isOptimal: false,
      },
      {
        id: "delete-the-document",
        text: "Delete the document. Some things should not be in writing.",
        tactic: "The delete-it move is the third version of the drop-it move from scene one. The document is private; deleting it is not protecting Elise, it is protecting the friendship-fog. Keep it.",
        nextSceneId: "deferred-again",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NAMED → THE DECISION
  // ===================================================================
  {
    id: "named",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The document saves. You close the laptop. The wine is finished. Your partner walks past on the way to bed and asks if you are coming up. You say in a minute. He stops, looks, says 'you ok?' You nod. He goes up.",
      },
      {
        speakerId: "inner-voice",
        text: "The audit produced a register-name. The register-name produces a question: what do you do now. The question has three legitimate answers, not one — and the worst one is the public one.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "downgrade-quietly",
        text: "Restructure her position in your life without telling anyone. She moves from inner-circle to ring-2: still a friend, still warmly received, but the dinner-planning, the calls about big news, the holiday photos move to people whose register is symmetric.",
        tactic: "The no-scene downgrade. The most expensive move emotionally because there is no satisfying confrontation and no public marker; the cheapest move structurally because it does not give her a martyr-story or a friendship-circle disturbance. Quiet is the whole technique.",
        nextSceneId: "downgrade-execute",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "send-the-text",
        text: "Text her: 'Hey — birthday went past Sunday. Did not hear from you. Wanted to mention it.'",
        tactic: "The naming-text seems direct but is a confrontation in friendly clothing. It will produce a profuse warm apology, a lunch invitation, a story about how she was 'going through it.' It feels like a result; it produces no actual change in the register because the register is structural, not a forgotten birthday.",
        nextSceneId: "named-text-sent",
        isOptimal: false,
      },
      {
        id: "exit-the-friendship",
        text: "Decide to end the friendship. Stop initiating. Decline the next invite.",
        tactic: "The exit is a legitimate move but premature here. Two-decade friendships do not end on the strength of one written audit; they erode when one party stops investing. The downgrade does the same operational work as the exit, costs less, and leaves the friendship available for genuine moments she is capable of.",
        nextSceneId: "premature-exit",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DOWNGRADE EXECUTE
  // ===================================================================
  {
    id: "downgrade-execute",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. You do not text her. You do not unfriend her on anything. You do not change the way you respond when she texts you — but you no longer reach first.",
      },
      {
        speakerId: null,
        text: "Three weeks later, she asks if you want dinner. You say yes; you go; you have a warm three hours; you do not tell her about the new project. At the end of dinner she says 'we should do this more often.' You smile and say yes. You do not propose a date.",
      },
      {
        speakerId: "inner-voice",
        text: "The downgrade is invisible to the outside. It is detectable only as the absence of the things that used to happen — the unprompted lunch invitations, the share-this-news call, the long voice-note on a Sunday. The absence is the move.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "warm-but-boundaried",
        text: "When she texts about big news of her own, reply warmly and proportionately. Send the heart, do not send the carousel.",
        tactic: "Symmetric performance is the structural counter-move. You do not punish her by withholding warmth; you simply match the register she has been giving you for ten years. She will, eventually, register the change — usually as a vague sense that something has shifted. She will not be able to name it.",
        nextSceneId: "ending-downgrade",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "withhold-cold",
        text: "Stop reciprocating. Do not send the heart. Do not turn up to the next dinner.",
        tactic: "Cold withdrawal is the variant of the exit move at half-speed. It produces the same ending without the cleanness. She will read the cold as data, will form a story about it, and will tell that story at other people's tables. The downgrade is symmetric — not warmer than her, not colder.",
        nextSceneId: "ending-cold-withdraw",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS — DOWNGRADE
  // ===================================================================
  {
    id: "ending-downgrade",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Quiet Restructure",
    endingLearnPrompt:
      "The covert-narc friend audit produces an operational answer that does not require a scene. Symmetric performance, no public marker, no confrontation. The friendship survives, calibrated to a register she is actually capable of holding. You stop bleeding warmth into a one-way channel. The closes-the-Mother-Arc note: this is the same move you ran on your mother in tn-1-1 — warm-no, no announcement, sustained across years. You spotted it here because you ran it there.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Six months later: dinner twice. Group event once. No carousel, no soul-friend caption, no Saturday-cancellation drama. The friendship is exactly as warm as Elise has ever been able to make it. The version of you that thought it was warmer was authoring the difference.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cold-withdraw",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Cold Withdrawal",
    endingLearnPrompt:
      "Cold withdrawal does the same operational work as the downgrade but produces a martyr-story Elise will tell at every shared table for the next two years. You will hear about the story. The friendship becomes the absence of a friendship in a way that is louder than the absence the downgrade would have created. Next time: symmetric, not cold.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Eight months later: she has told four mutual friends a version. None of the versions is wrong, exactly. None of them is what happened either.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // FAILURE BRANCHES — SHORTER
  // ===================================================================
  {
    id: "performed-warm",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-friend", "inner-voice"],
    dialog: [
      {
        speakerId: "the-friend",
        text: '"OH MY GOD I AM THE WORST. babe I have been DROWNING this week, completely missed your birthday, I am sending you something this weekend I PROMISE, lunch on me next week, I love you so much"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The over-apology is its own register. The seven exclamation marks, the all-caps 'WORST,' the promise of the gift she will not send, the lunch she will reschedule twice — every move is the friendship's standard repair pattern. You have run it before. The wound stops hurting; the pattern resumes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "audit-anyway",
        text: "Reply warmly. Then close the chat. Open the document anyway.",
        tactic: "Late-but-real recovery. The performed-warm thread is closed; the audit is the work that the closed thread did not do. Run the audit privately.",
        nextSceneId: "the-document",
        isOptimal: true,
      },
      {
        id: "accept-the-repair",
        text: "Reply: 'no worries lovely!! Lunch sounds amazing xx.' Close the laptop.",
        tactic: "The accepted-repair is the loop the scenario is built to interrupt. Two more years of the same pattern, with the same audit waiting on Wednesday nights with the second glass of wine.",
        nextSceneId: "ending-loop-resumed",
        isOptimal: false,
      },
    ],
  },

  {
    id: "outsourced-fast",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Priya replies in three minutes: 'I have been waiting for you to notice this. I love you. I love her. They are not the same love and you have known that for a year.'",
      },
      {
        speakerId: "inner-voice",
        text: "Priya named it because Priya has been watching it from outside the friendship for a year. Useful — and now Priya carries data she did not ask for, and the next time the three of you are in a room there will be a small unaddressed thing in it. Recoverable, but a tax was paid.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "thank-and-private-audit",
        text: "Thank Priya. Tell her you are running an audit yourself. Open the document.",
        tactic: "The recovery is to not turn this into a co-audit with Priya. Bring the work back to your own desk; thank her for the confirmation; do not ask her for the eight-bullet list. She has done her part by saying yes.",
        nextSceneId: "the-document",
        isOptimal: true,
      },
    ],
  },

  {
    id: "deferred-again",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Wednesday Resumed",
    endingLearnPrompt:
      "The drop-it move has a specific operational cost: every Wednesday like this one will arrive again. The audit is the only move that ends the recurrence; declining the audit defers it. The scenario does not punish you for the deferral — it just notes that the next iteration will be longer, and the next wine will be poured with the same internal weather.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Nine months later, on a different Wednesday, you will arrive at this same kitchen counter with the same wine. The audit will be waiting.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "softened",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "'She struggles with my success' is the friendship-version of the apology you would not let your mother extract. The line is true; it is also a re-fogging move. Restore the precise language in the document.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "restore-precision",
        text: "Re-write the line. 'Asymmetric performance — over-warm to friends less threatening, flat to friend whose life is going well.' Save.",
        tactic: "Precision recovery. The fog returned in five seconds because the friendship is well-rehearsed at producing it. Hold the language.",
        nextSceneId: "named",
        isOptimal: true,
      },
    ],
  },

  {
    id: "named-text-sent",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-friend", "inner-voice"],
    dialog: [
      {
        speakerId: "the-friend",
        text: '"Oh god babe. I am so sorry. I genuinely thought I had texted you. I have been losing my mind. Can I take you to dinner this weekend, my treat, anywhere you want."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The naming-text produced the warm apology. The dinner will happen. Three weeks after the dinner, you will notice you are running a slightly more cautious version of the friendship that costs you energy. Six weeks after, you will be back to the same Wednesday wine. The naming-text was a confrontation in friendly clothing; the friendship is too well-rehearsed at absorbing those.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "still-do-the-downgrade",
        text: "Accept the dinner. Go warmly. Do the downgrade afterwards anyway. The text was a misstep; the structural move is still available.",
        tactic: "The recovery. The text happened; the operation continues. Going to dinner does not undo the audit. The downgrade is structural, not declarative.",
        nextSceneId: "downgrade-execute",
        isOptimal: true,
      },
    ],
  },

  {
    id: "premature-exit",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Premature Exit",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How To Leave Without Being The Villain",
    endingLearnPrompt:
      "Ten-year friendships end through erosion or scene; you reached for scene on the strength of one Wednesday's audit. The exit will hold. It will also produce a story Elise tells at four mutual tables, a redistribution of the friendship-circle, and a six-month spell where you wonder if you over-corrected. The downgrade does the same operational work without producing the story — quiet erosion at chosen tempo, with the friendship available for the genuine moments she is capable of. Next time, restructure before exiting.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Three months later: she texts twice. You reply briefly. She stops. The shared circle absorbs the silence. You will think about whether the audit was right for another year.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-loop-resumed",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Loop Resumed",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The performed-warm reply absorbed the wound; the audit did not happen. The lunch will be rescheduled twice. The pattern will continue. Three to nine months from now you will be at this kitchen counter again with the same wine. The scenario is built specifically to interrupt this loop — running it and not landing the audit is the costliest version, because you used the warning shot.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The loop resumed. The next iteration is not for at least three months. You have, approximately, that long before this Wednesday returns.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const toxicNarc61: Scenario = {
  id: "tn-6-1",
  title: "The Friend Who Forgets Your Birthday",
  tagline: "Wednesday, 7:14 p.m. Three days after. The audit you have been afraid to run for two years.",
  description:
    "Ten years of friendship. Three days ago she did not post for your birthday. She has posted for three other friends in the past year. The asymmetry is no longer deniable. The scenario is not the missed birthday — the missed birthday is the artefact you are using to finally run the audit. Closes the Mother Arc: the same register, in a different relationship, spotted because you have already done the work with your mother.",
  tier: "premium",
  track: "toxic-narc",
  level: 6,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 420,
  badgeId: "the-quiet-restructure",
  startSceneId: "wednesday-evening",
  prerequisites: ["tn-1-1"],
  tacticsLearned: [
    "The written audit as the threshold move — pattern in writing becomes operational data, not a feeling",
    "Asymmetric performance as the diagnostic for covert-narc friendship",
    "The no-scene downgrade — quiet restructure from inner-circle to ring-2 without an announcement",
    "Symmetric reciprocation as the structural counter-move (not warmer, not colder)",
    "The Mother-Arc echo — the same register spotted in a different relationship because you ran the work with the mother first",
  ],
  redFlagsTaught: [
    "The over-apology repair pattern (all-caps WORST, seven exclamations, the gift she will not send) as the friendship's loop-closing mechanism",
    "The friendship-fog softening line ('she struggles with my success') that re-fogs precise language",
    "Cold withdrawal as the noisy variant of the downgrade — produces a martyr-story Elise tells at four shared tables",
    "Premature exit on the strength of one audit — eight years of investment lost to the wrong move at the right moment",
  ],
  characters: [INNER_VOICE, THE_FRIEND, THE_PARTNER],
  scenes,
};

export default toxicNarc61;
