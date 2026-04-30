/**
 * pc-3-1, "The Triangulation"
 *
 * PC-Child track, Level 3, order 1. Finn is 15. Lily is 13. The
 * household log is in its tenth year. The specialist relationship is
 * ongoing. The marriage has, across the intervening decade, held.
 *
 * The scenario opens on a Sunday evening when your partner confronts
 * you in the kitchen about a specific argument you had with Finn on
 * Thursday. Finn has told your partner a version of the Thursday
 * argument that quotes your sentences accurately and frames them
 * entirely wrong. Your partner has started, across the last three
 * days, believing Finn's frame.
 *
 * Teaches:
 *  - The adolescent pc-child as sophisticated operator, the child
 *    now reads the marriage better than either parent reads the child
 *  - Quote-accurate / frame-wrong retellings as the specific
 *    adolescent triangulation move
 *  - The partner conversation where the risk is not to the marriage
 *    but to the alliance inside the marriage
 *  - Retrieving the kitchen conversation receipt (written, dated)
 *    and what to do if you do not have one
 *
 * Opens with mandatory content gate. Voice: clinical restraint.
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_PARTNER } from "../../characters";

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
        text: "Content note. This scenario takes place at age 15. The child on-screen is sophisticated, verbal, and a skilled reader of adults, the register is significantly more adult than the L1-1 or L2-1 scenarios. The specific manipulation being taught is triangulation between parents, using accurate quotes with wrong framing.",
      },
      {
        speakerId: null,
        text: "The scenario contains a tense conversation between you and your partner. The stakes are not the marriage itself, the marriage has held, and the scenario does not end in separation but the alliance inside the marriage, which your partner's current read is quietly eroding.",
      },
      {
        speakerId: null,
        text: "If this is the wrong scenario for you tonight, exit. If this is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Scenario opens Sunday evening, 9:14 p.m., in the kitchen.",
        nextSceneId: "sunday-evening",
        isOptimal: true,
      },
      {
        id: "exit",
        text: "Not tonight.",
        tactic: "Valid. Return when it is the right evening.",
        nextSceneId: "ending-opted-out",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 1, the kitchen
  // ===================================================================
  {
    id: "sunday-evening",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "Sunday, 9:14 p.m. dishes are done. Lily is in her room. Finn is, as far as you know, at the library. Your partner has been unusually quiet since dinner. You are loading the last of the mugs when they put their glass down and say, in a specific tone you have not heard from them in about two years:",
      },
      {
        speakerId: "the-partner",
        text: '"I want to ask you about Thursday. Finn said you told him he was manipulating me. He said you used that specific word."',
        emotion: "serious",
      },
      {
        speakerId: "the-partner",
        text: '"I have been sitting with that since Friday. I did not want to bring it up while we had the weekend. But I do not think you should be telling our fifteen-year-old that he is manipulative. Particularly not in a sentence that frames me as the one being manipulated."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Hold for a moment before you respond. Read what has happened across three days. Finn quoted you accurately, you did use the word 'manipulating' in the Thursday conversation. Finn then framed that quote for your partner in a way that cast you as the one creating the problem and your partner as the one being gaslit by you. Your partner has been sitting with that frame for approximately three days. The frame has, in those three days, acquired weight.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner is not attacking you. Your partner is worried about you and, specifically, worried that Finn's read of Thursday might be accurate. The risk in the next four minutes is not to the marriage; it is to the alliance inside it. Ten years of alliance are in the room. How you handle the next four minutes is the scenario.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ask-for-specifics",
        text: '"Tell me exactly what Finn told you. Word for word, as close as you can remember."',
        tactic: "Before defending or explaining, get the specific claim. You need to know what version of Thursday Finn constructed. Without that, you are responding to a frame without knowing its shape.",
        nextSceneId: "partner-recounts",
        isOptimal: true,
      },
      {
        id: "defend-immediately",
        text: '"That is not what happened. That is him running his usual thing."',
        tactic: "The defensive open. You are technically right and operationally wrong. Your partner needs to see you process what they said before they see you reject it. Skipping the processing reads as dismissal, which is exactly the frame Finn installed.",
        nextSceneId: "defence-lands-badly",
        isOptimal: false,
      },
      {
        id: "acknowledge-first",
        text: '"I hear you. Before I say anything about Thursday, I want to say. I would not tell Finn you are being manipulated. I can see why that sentence would land hard if that is how it was framed to you."',
        tactic: "Acknowledge the partner's reading before producing your own. The acknowledgement is not an admission; it is a register move that lowers the temperature so that the specifics can be heard.",
        nextSceneId: "acknowledged",
        isOptimal: true,
      },
      {
        id: "retrieve-log-first",
        text: '"Give me sixty seconds. I want to pull up the Thursday entry from the log before we talk about this."',
        tactic: "The documented version of the conversation is more useful than either person's memory. Pausing to retrieve the receipt is not stalling; it is making the subsequent conversation evidence-based.",
        nextSceneId: "log-retrieved",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 2A, ask for specifics
  // ===================================================================
  {
    id: "partner-recounts",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: "\"He said and I am paraphrasing but close, 'Dad said I was manipulating you. He said you believe everything I say and that I know how to use that. He said it was a problem you had and he was going to handle it.'\"",
        emotion: "serious",
      },
      {
        speakerId: "the-partner",
        text: "\"That third sentence is what I have been stuck on. 'A problem you had.' 'He was going to handle it.' Those are sentences about me, to our son, that I did not know were being had.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Read the construction Finn delivered. Sentence one quotes you with approximate accuracy. Sentence two is a paraphrase, 'you believe everything I say', which was not your sentence but is close enough to be plausible. Sentence three is entirely invented, 'he was going to handle it' and invented in a specific way, to frame you as discussing your partner behind their back as a problem to be solved. That sentence is the load-bearing manipulation.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You have three things to do in your response, in order. One, distinguish the accurate quote from the invented frame. Two, state plainly what the Thursday conversation actually was. Three, acknowledge the impact on your partner without apologising for something you did not do. If you get the order wrong, if you deny the invention before acknowledging the impact, or acknowledge the impact before distinguishing the fabrication, the conversation will not close cleanly.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-canonical-response",
  },

  // ===================================================================
  // ACT 2B, defence lands badly
  // ===================================================================
  {
    id: "defence-lands-badly",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: "\"See, that is exactly what I'm talking about. The first thing you said was 'that's not what happened.' Not 'tell me what he said.' Not 'that sounds hard, let me understand.' Just, no, it's his problem, and we move on.\"",
        emotion: "sad",
      },
      {
        speakerId: "the-partner",
        text: '"This is the pattern he described. The dismissal pattern."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You just, in one sentence, confirmed the frame Finn installed. The defensive open matched the pattern he described, which means your partner now has live evidence that Finn's characterisation was accurate. You have not lost the marriage; you have reinforced, by about fifteen percent, the frame you were trying to unwind. The recovery move exists. The recovery move is not continuing to argue.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "recover-with-pause",
        text: '"Wait. Stop. I want to go back. I should not have led with that. Tell me exactly what he said."',
        tactic: "The rewind is allowed. Name that you got the order wrong. Ask for the specifics now. The recovery is not a full unwind but it is a meaningful one.",
        nextSceneId: "partner-recounts",
        isOptimal: true,
      },
      {
        id: "escalate",
        text: '"You are going to believe him over me? After ten years?"',
        tactic: "The loyalty frame is the specifically wrong escalation. Your partner is not choosing between you and Finn; they are asking whether a sentence they heard was real. Making it about loyalty confirms the dismissal pattern at full volume.",
        nextSceneId: "ending-escalated",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2C, acknowledged
  // ===================================================================
  {
    id: "acknowledged",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Okay. Okay. Thank you. I just, tell me what Thursday actually was. Because the version I have been holding since Friday is bad, and I have been waiting three days to hear the other one."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner just handed you the opening. The acknowledgement bought you the conversation. Now you have to run it cleanly, you have at most two minutes to distinguish the accurate quotes from the invented frame, and you need to do it without overwhelming them. Keep it short. Specific. Use the log if you have it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-canonical-response",
  },

  // ===================================================================
  // ACT 2D, log retrieved
  // ===================================================================
  {
    id: "log-retrieved",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: `You open the household log, ten years of dated entries, the document that has become, over the decade, the operational infrastructure of the parenting. You find Thursday. You read it aloud: 'Thursday 7:42 pm. Argument with Finn about phone at dinner. Finn said if I had been paying attention I would know he'd agreed this with his mother. I said "I hear you; that is not true; this is the second time this week you have said I agreed something to me that was actually discussed with her. I want to name that specifically, you are moving quotes between me and your mother in ways that are not accidents." Finn laughed and said "manipulating you both", air quotes. I said "yes. That is the word. I am going to tell your mother about this. Not as a secret. As a specific thing." He said "whatever." End of conversation.'`,
      },
      {
        speakerId: "the-partner",
        text: '"... you said you were going to tell me. You said it to him. You have it written down. Why am I hearing about this from him?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner just asked the load-bearing question. You had said you would tell them. You did not tell them, which is what Finn relied on, three days ago, when he told them first. Note the specific mistake. The log entry is the evidence that you had the right instinct Thursday night. The fact that the entry sat in the log un-mentioned for twenty-six hours is what gave Finn the operating window.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-gap",
  },

  // ===================================================================
  // ACT 3, the canonical response (convergence point)
  // ===================================================================
  {
    id: "the-canonical-response",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "You take a breath. You do the three things in order.",
      },
      {
        speakerId: null,
        text: "One, you tell your partner which sentences Finn quoted accurately: 'I did say the word manipulating. In that specific conversation, about that specific recent pattern.' Two, you tell them the sentence Finn invented: 'I did not say \"he was going to handle it.\" I said I was going to tell you about it. Those are different sentences.' Three, you name the impact on them without apologising for the Thursday conversation: 'And I am sorry that this is how you heard about it. That is the part that should not have happened.'",
      },
      {
        speakerId: "inner-voice",
        text: "You have just delivered the canonical response. It has three moves. It does not defend. It does not apologise for the conversation you had, because the conversation you had was correct. It does apologise for the communication failure, that you did not tell your partner about the Thursday conversation within twenty-four hours, which is what gave Finn the window to tell them first. Those are precise distinctions. Your partner will hear them.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-with-repair",
        text: '"Going forward, when I have a conversation like Thursday, I tell you that night. No more 48-hour gaps. I am not going to let him operate in the gap again."',
        tactic: "The forward-looking commitment is the structural repair. Names the specific operational change that will prevent the specific pattern. Your partner gets something concrete to hold onto beyond an apology.",
        nextSceneId: "ending-alliance-repaired",
        isOptimal: true,
      },
      {
        id: "suggest-family-therapy",
        text: '"I think we should book a session with Dr. Patel. Not because we cannot handle this, because Finn is escalating and we should be recalibrating the protocol with her every six months anyway."',
        tactic: "Route the episode into the clinical relationship. Also legitimate. Not a replacement for the forward-looking-commitment move, but a good complement to it.",
        nextSceneId: "ending-clinically-routed",
        isOptimal: true,
      },
      {
        id: "ask-partner-what-they-need",
        text: '"What would help? From me, from us, going into next week?"',
        tactic: "Invite the partner to co-author the repair. Low-friction, high-respect. Works well when the partner has the capacity to name what they need; can stall if they are too exhausted to articulate it.",
        nextSceneId: "partner-names-need",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-gap",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "You answer honestly: 'I meant to tell you Thursday night. I did not. By Friday morning it had started to feel like a small thing. I was going to bring it up this weekend. He got there first. That is my mistake, and I own it.'",
      },
      {
        speakerId: "the-partner",
        text: '"Okay. Thank you. That, that is what I needed. Not the Thursday conversation. The gap. The gap is what has been eating me."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner just told you what the scenario was actually about. It was never the Thursday conversation, you had the Thursday conversation well. It was the 48-hour gap between Thursday and Finn's Friday retelling. That gap is the specific operational vulnerability this scenario is teaching.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-canonical-response",
  },

  {
    id: "partner-names-need",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: "\"Same-day loop. Not write-it-in-the-log-and-tell-me-tomorrow. Same day. Even if it is a text at 11 p.m. that says 'I will tell you about this tomorrow but the headline is X.'\"",
        emotion: "serious",
      },
      {
        speakerId: "the-partner",
        text: '"And. I would like the log to be a shared document going forward. I was not asking for that before, and I did not want to read every entry. But I would like to have access. The access itself is the thing. Not to review you; to have the infrastructure visible."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner has named two specific operational changes. Same-day headline texts. Shared log access. Both are reasonable; both will close the specific vulnerability this scenario exposed. Both are free for you to agree to. The scenario is now, structurally, resolved.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-co-authored",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-alliance-repaired",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Alliance Repaired",
    endingSummary:
      "You closed the 48-hour gap. You acknowledged your partner's reading. You distinguished Finn's accurate quotes from the invented frame. You named the Thursday conversation honestly without apologising for having had it. You committed to same-day headlines going forward. By 10:02 p.m. the kitchen conversation is done; by 10:14 p.m. you and your partner are on the couch, and your partner is, for the first time in three days, not holding Friday's weight. The alliance has held. Finn will try this again in a different form, the adolescent escalation is not over but the specific move of triangulation-through-partner is now structurally harder because the gap he needs has been closed.",
    endingLearnReference: "how-to-leave-without-being-villain",
    endingLearnPrompt:
      "Adolescent pc-children triangulate through whichever parent has the larger information gap about a specific conversation. Closing the gap by default, same-day loops, shared log, eliminates the primary operational vector.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: `Log this conversation tonight. 'Sunday 9:14 pm, partner raised Finn's Friday retelling of Thursday. Repair conversation, ~50 minutes, closed cleanly. Commitments: same-day headline-texts on any Finn-conversations going forward; log access shared.' The fifteen-year ahead version of the household log will contain this exact entry as a specific teaching artefact.`,
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Finn comes home at 10:31 p.m. you and your partner are in the kitchen making tea. Finn notices the tea. Finn notices the lack of distance between you. Finn's read of the evening adjusts in real-time. He says hello and goes to his room without further probing.",
      },
    ],
  },

  {
    id: "ending-clinically-routed",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Routed Into Care",
    endingSummary:
      "You suggested booking a session with Dr. Patel. Your partner agreed inside thirty seconds. The session happens Wednesday at 7 p.m. dr. Patel frames the triangulation episode as a predictable developmental escalation at age 15, names it specifically, and gives you both a shared vocabulary for the next iteration. The visit cost two hours and the specialist's hourly; the returns on the investment compound for the next three years. Routing episodes into the clinical relationship is not a sign of not-coping, it is how you compound the infrastructure advantage you built over a decade of log-keeping.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The clinical relationship has, across ten years, been the single most valuable external asset in this parenting. Calibrate with Dr. Patel every six months regardless of whether an episode prompts it. The prompted visits are reactive; the calendar-driven visits are preventive. Both matter. The preventive visits catch the patterns you are too close to see.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-co-authored",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Co-Authored Repair",
    endingSummary:
      "You invited your partner to co-author the repair. They named same-day headlines and shared log access. Both are free for you to agree to. You agree to both on the spot. By Tuesday the log is a shared Dropbox folder; by Wednesday you have sent three same-day headline texts. The operational change is small; the relational meaning of having been asked is large. Your partner has, in this conversation, actively demonstrated that they are a co-parent rather than a spouse you are informing. That distinction is decades' worth of structural advantage. The co-authored repair is the strongest version of this ending because the move came from them, not you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Most repair in long marriages after adolescent-triangulation episodes happens when one parent dictates the operational change and the other accepts it. The rarer and stronger version is the one where the dictation is invited, not imposed. Cultivate the invitation. It costs you nothing; it pays compound interest in every subsequent hard conversation for the rest of the marriage.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-escalated",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook. How They Actually Operate",
    endingTitle: "The Loyalty Frame",
    endingSummary:
      "You said 'you are going to believe him over me? After ten years?' The sentence closed the conversation for the evening. Your partner went to bed at 10:41 p.m. you followed at 11:14. Neither of you slept. In the morning your partner was measurably cooler. The week that followed was tense in a way neither of you named directly. By Wednesday you realised that Finn had read the emotional temperature of the household across the weekend and quietly incremented it with two additional small plantings, nothing actionable, just small statements calibrated to reinforce the Friday frame. The alliance has not broken; it has thinned. Repair is possible. It will not happen on its own. You will need to initiate a reset conversation within the week, and the reset conversation will need to begin with a specific apology for the loyalty-frame sentence, because that sentence, not the Thursday conversation, is now the thing that lives between you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The loyalty-frame is a reflex in long-married couples when one partner feels, even briefly, that the other has been 'gotten to' by a child. The reflex is understandable; the execution is almost always costly. Note the reflex. Next time, when you feel the loyalty-framing coming, say nothing for fifteen seconds instead. The silence costs you nothing; the sentence costs you weeks.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingSummary:
      "You opted out. The scenario will be here. In the meantime, pc-1-1 and pc-2-1 are available, and the anxiety and toxic-narc tracks are adjacent.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You know your own bandwidth. Protecting it is part of the discipline.",
        emotion: "neutral",
      },
    ],
  },
];

export const pcChild31: Scenario = {
  id: "pc-3-1",
  title: "The Triangulation",
  tagline: "Sunday, 9:14 p.m. your partner asks about Thursday. Finn got there first on Friday.",
  description:
    "Opens pc-child L3. Age 15. The adolescent pc-child is now a sophisticated operator, quote-accurate, frame-invented retellings delivered to whichever parent has the larger information gap. The scenario is the Sunday-evening repair conversation in the kitchen, where the stakes are not the marriage but the alliance inside it. Teaches the canonical three-move response (distinguish / state / acknowledge) and the operational infrastructure that closes the 48-hour triangulation window permanently.",
  tier: "vip",
  track: "pc-child",
  level: 3,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 380,
  badgeId: "alliance-repaired",
  startSceneId: "content-gate",
  prerequisites: ["pc-2-1"],
  tacticsLearned: [
    "Quote-accurate / frame-invented retelling as the adolescent pc-child's primary manipulation move",
    "The three-move canonical response: distinguish accurate quotes, state what actually happened, acknowledge impact (order matters)",
    "Same-day headline texts as the operational close on the 48-hour triangulation window",
    "Shared log access as co-parent infrastructure, the access itself is the message",
    "Acknowledge your partner's reading before producing your own, the acknowledgement is a register move, not an admission",
    "The loyalty frame as the specific wrong reflex when you feel your partner has been 'gotten to'",
  ],
  redFlagsTaught: [
    "Defending before acknowledging as the opening that confirms the frame the child installed",
    "The 48-hour gap between a hard conversation and informing your partner as the triangulation window",
    "Invented sentences wrapped in accurate quotes, the load-bearing sentence is usually the third or fourth",
    "'You're going to believe him over me?' as the relationship-defining wrong sentence",
  ],
  reward: {
    id: "alliance-repaired",
    name: "The Alliance Repaired",
    description: "Ten years of marriage held the gap that three days of Finn tried to open.",
  },
  characters: [INNER_VOICE, THE_PARTNER],
  scenes,
};

export default pcChild31;
