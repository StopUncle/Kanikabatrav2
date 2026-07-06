/**
 * divorce-2-1, "The Lawyer Call"
 *
 * Divorce-Arc, Level 2, order 1. The morning after the decision was
 * spoken (divorce-1-1). The kids are at school, he is at work, and the
 * protagonist is at the kitchen table with a notepad and the number her
 * sister gave her. One hour on the phone with a family-law solicitor,
 * the first person in the whole process whose only job is her interests.
 *
 * Register-shift from divorce-1-1: there, the discipline was in the
 * speaking. Here, the discipline is in the listening and the not-saying.
 * The solicitor (SOLICITOR, new to this level) is not an ally in the
 * emotional sense; she is a professional who becomes useful in exact
 * proportion to how completely and cleanly the protagonist briefs her.
 * The covert-narc spouse (THE_SPOUSE, same character from divorce-1-1)
 * is off-screen but shapes every decision.
 *
 * Teaches real, defensible pre-divorce strategy:
 *  - Outcome-first framing on the first call: your objective and your
 *    facts, not the emotional case a no-fault court will not weigh
 *  - Full financial disclosure to your own solicitor, including the
 *    account already moved; the fact she knows, she can defend
 *  - Lawful document gathering: copies of the shared file, never his
 *    private accounts
 *  - Communication discipline with the spouse: write every message as
 *    if a judge will read it aloud
 *  - What not to do in the forty-eight hours after: sign nothing, agree
 *    nothing, reveal nothing you do not have to
 *
 * Voice: clinical, low affect. The solicitor speaks in checklists and
 * finished sentences. The subject carries its own weight.
 *
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

const SOLICITOR: Character = {
  id: "solicitor",
  name: "Frances Okoro",
  description:
    "Family-law solicitor, twenty years in. Speaks in checklists and finished sentences. Warm by competence rather than by tone. Opens the call by telling you what she needs and what not to do, in that order. Her one job on this call is your interests, which is a register you have not been on the receiving end of in nineteen years.",
  traits: ["precise", "structural", "warm-by-competence"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "family-solicitor",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This scenario is the first hour with a family-law solicitor the morning after the decision was spoken aloud (divorce-1-1). It teaches the operational discipline of the first legal call: what to say, what to withhold, and what to do in the forty-eight hours after. It is not legal advice for your own situation; the principles are general.",
      },
      {
        speakerId: null,
        text: "The register is not endurance and it is not confession. It is a professional briefing under pressure. If this is the wrong scenario for you tonight, exit. If it is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "Thursday, 9:05 a.m. the kids are at school. He is at work. You are at the kitchen table with a notepad, a glass of water, and the number your sister gave you. You have one hour.",
        nextSceneId: "call-opens",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The scenario will hold. A first legal call needs your own clear head, not a borrowed hour.",
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
    endingTitle: "Not Today",
    endingLearnPrompt:
      "The opt-out is a complete move. The solicitor's diary will have another slot. The first legal call runs best on a clear hour you have chosen, not on a Thursday you fell into. Come back when the head is right.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the number. The hour will be there when the head is.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // THE CALL OPENS
  // ===================================================================
  {
    id: "call-opens",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She picks up on the second ring. No small talk. A pen clicks on her end. You can hear that she is already writing your name at the top of a blank page.",
      },
      {
        speakerId: "solicitor",
        text: '"Frances Okoro. Thank you for the summary your sister passed on, I have the bones of it. Before we start, two things. Do not sign anything and do not agree anything with him until we have spoken again. Now. Tell me where things stand, and tell me what you want from this."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She asked two questions in one breath: what is true, and what do you want. Not how you feel, not how bad he was. The first move of the whole process is choosing which of those to answer with.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "outcome-first",
        text: '"I have decided to divorce. He does not know I have called you. My priority is the children and understanding my financial position. I am not trying to punish him. I want this done cleanly and I want to protect what I need to protect."',
        tactic: "Outcome-first framing. Objective, then facts. A family solicitor needs your goal and your figures, not the case for his awfulness. In a no-fault system the story of who wronged whom does not move the financial outcome; the hour is finite, and this sentence spends it on the two things that do.",
        feedback: "She has what she needs to work with: your objective and your facts. The hour is now hers to make useful.",
        nextSceneId: "the-disclosure",
        isOptimal: true,
        xpBonus: 40,
        event: "optimal-with-grace",
      },
      {
        id: "build-the-case",
        text: 'Start at the beginning. The nineteen years, the specific incidents, the way you tried and it did not work. "You need to understand what he is actually like. It started years ago when he..."',
        tactic: "The build-the-case instinct. The history is real and it is not what she bills for. No-fault means the court will not weigh the narrative; the forty minutes spent proving he is awful are forty minutes not spent on disclosure and the children. She will let you run because the clock is yours, and that is the cost.",
        nextSceneId: "case-derail",
        isOptimal: false,
      },
      {
        id: "win-frame",
        text: '"I want to know how I make sure he walks away with as little as possible. After what he has put me through, I want him to feel it."',
        tactic: "The scorched-earth objective. It raises your own costs, lengthens the timeline, and models war for the children who will live inside the result. The defensible goal is a fair settlement you can build a life on, not a punishment he cannot recover from. She will redirect you, and the redirect is the lesson.",
        nextSceneId: "win-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "case-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"I am going to stop you, and I want you to hear why. I believe every word. It also will not change the financial order by a pound. The divorce itself is no-fault; the money follows need and contribution, not conduct, save for the rare extreme. Keep the history for your journal or your therapist. On this call it costs you time you are paying for. Let me ask it differently: what do you want the next year to look like?"',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "She did not dismiss the history; she priced it. It is real, it is heavy, and it is not evidence in this room. The redirect is a gift: answer the question she is actually able to act on.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-to-outcome",
        text: '"Understood. The children are the priority, and I need to understand my financial position. I want this done cleanly."',
        tactic: "Recovery. The history-walk cost a few minutes; the objective lands now, and the call becomes useful.",
        nextSceneId: "the-disclosure",
        isOptimal: true,
      },
    ],
  },

  {
    id: "win-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"I understand the feeling and I am going to advise against building a strategy on it. A case run to hurt him runs up your fees, drags out the timeline, and the people who live inside a scorched result are the children. I will fight hard for a fair outcome. I will not run a punishment campaign, because it is the client, not the ex, who pays for those. So: a fair settlement you can build on, or a war. Which am I working towards?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The contempt is legitimate and the strategy built on it is not. She is offering you the distinction between what you feel and what you instruct. The professional move is to instruct for the outcome, not the wound.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-to-fair",
        text: '"A fair settlement. The children first, then my financial position. Cleanly."',
        tactic: "Recovery. The punishment frame is set down; the instruction becomes an outcome she can actually pursue.",
        nextSceneId: "the-disclosure",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE DISCLOSURE
  // ===================================================================
  {
    id: "the-disclosure",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"Good. Then the finances. I need the shape of everything: the house and the mortgage, the pensions on both sides, income, savings, debts, any business interest. We will formalise it later; today I want the map. And one more thing, and I need you to answer it straight." A pause. "Have you already done anything? Moved money, opened an account, set something up. If you have, I would rather hear it from you now than from his barrister in eight months."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. The account in your sister's name. Fourteen weeks of quiet infrastructure, and the first professional you have spoken to has walked straight to it in the first ten minutes. She is not accusing. She is asking to be able to defend it.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "full-disclosure",
        text: '"There is one thing. I opened an account in my sister\'s name and moved some money into it over the last few months. It is not much against the whole picture, but it is there. Is that a problem?"',
        tactic: "Full disclosure to your own solicitor. She is the one person in the entire process you do not manage, edit, or protect from the truth. The account she knows about she can position and disclose properly. The account she learns about from his side is the one that detonates your credibility at the worst possible moment.",
        feedback: "The one fact that could have blown up in eight months is now a fact she is holding for you. That is what the call is for.",
        nextSceneId: "the-documents",
        isOptimal: true,
        xpBonus: 45,
        event: "restraint-shown",
      },
      {
        id: "hide-from-lawyer",
        text: "Decide the sister-account stays yours. She does not need every detail on a first call, and it feels safer kept back. \"Nothing significant. The usual joint accounts, the mortgage, his pension is the big one.\"",
        tactic: "Non-disclosure to your own solicitor is the single unrecoverable move in this room. Every other mistake she can work with; the fact she does not have, she cannot defend. When his side finds it, and financial disclosure is designed to find it, it is no longer a modest transfer, it is proof you concealed, and it recolours everything true you also said.",
        nextSceneId: "hidden-derail",
        isOptimal: false,
      },
      {
        id: "move-more",
        text: '"Actually, while we are on it, should I move more across before he works out what is happening? Get more of it somewhere safe while I still can?"',
        tactic: "Asset dissipation dressed as protection. Moving money to shield it from the settlement reads to a court as exactly that, and non-disclosure of it reads as bad faith. It converts a neutral marital fact into evidence against you, and it is the very first thing an experienced opposing solicitor goes looking for.",
        nextSceneId: "dissipation-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "hidden-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"Let me be very direct, because this is the one thing I cannot fix later. If there is any account, any transfer, anything at all, and you do not tell me, then I find out when his side does, and by then I am defending a concealment instead of disclosing a transaction. Same money, completely different story. I am not here to judge what you did in fourteen weeks of a bad marriage. I am here to make it survivable. So I will ask once more, and there is no wrong answer except the one you keep from me."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "She left the door open on purpose. The instinct to keep the account back is the same instinct that ran the infrastructure in secret, and it was correct then. It is wrong now. Secrecy from him kept you safe; secrecy from her ends your credibility.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-disclose",
        text: '"There is an account. In my sister\'s name. I moved money into it over a few months. I should have led with it."',
        tactic: "Recovery. The one unrecoverable move, walked back before it hardened. She has the fact now, which is the only version of it she can protect.",
        nextSceneId: "the-documents",
        isOptimal: true,
      },
    ],
  },

  {
    id: "dissipation-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"No. Stop. Do not move another pound. What is there is there, and we disclose it and deal with it. What you are describing, moving assets ahead of disclosure, is dissipation, and it is the first thing a competent opponent looks for. It turns a modest transfer into a pattern, and a pattern into an argument that you cannot be trusted on any of your figures. The money you would try to hide costs you more, in credibility, than it could ever save you in settlement."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The impulse to grab more while the window is open is the marriage-survival brain still running. In the settlement, transparency is the asset. What you hide, you lose twice: once when it is found, and again in everything they stop believing.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-hold",
        text: '"Understood. Nothing moves. We disclose what is there and deal with it."',
        tactic: "Recovery. The dissipation instinct set down. Transparency reinstated as the strategy.",
        nextSceneId: "the-documents",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE DOCUMENTS
  // ===================================================================
  {
    id: "the-documents",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"Now the paperwork. I want you building your own picture before anyone formally asks for it. Twelve months of bank statements, joint and sole; the mortgage statement and the last valuation or an estimate; both pension statements; recent payslips, yours and his if you can see them; the last two tax years; and a list of debts. Copies, not originals. And listen to me carefully: gather only what you can already lawfully reach. The joint file, the post that comes to the house, your own logins. Do not go into anything that is his alone."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The line she just drew is the whole discipline of the gathering. Lawful, quiet, complete. The temptation on the other side of it, his email, his private login, feels like diligence and is actually a grievance you would be handing him for free.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "lawful-copies",
        text: '"I can photograph the joint statements and everything that comes to the house, and I have the mortgage and pension letters in the shared drawer. I will build my own set from what I can already see and leave his private accounts alone."',
        tactic: "Lawful, quiet, complete. The joint file and the household post are yours to copy; your own paperwork is yours by right. Everything you assemble this way is clean, usable, and unremarkable. It is the version of diligence that strengthens your position instead of contaminating it.",
        feedback: "A complete picture, all of it lawfully obtained. Nothing in the file can be used against how you got it.",
        nextSceneId: "the-communication",
        isOptimal: true,
        xpBonus: 40,
        event: "optimal-with-grace",
      },
      {
        id: "snoop",
        text: 'His accounts are all logged in on the family laptop. "I can just get into his email and his personal account and pull everything directly. It is all right there."',
        tactic: "Accessing his private accounts is unlawful, even on a shared laptop, even mid-divorce. The documents you obtain that way you cannot use, and the fact that you did it stops being a footnote and becomes his story about you: the one who broke in. It hands the covert narc the victim frame he has been waiting for, corroborated.",
        nextSceneId: "snoop-derail",
        isOptimal: false,
      },
      {
        id: "ask-him-now",
        text: '"It is easier if I just ask him for all of it tonight. Get him to hand over his pension and tax details directly, keep it above board."',
        tactic: "He will have to disclose everything in due course; that is not in question. But asking now, before you hold your own copies of the joint picture, gives him the one thing you do not want to give first: a window. A window in which figures can be tidied and papers can go missing before anything is formally on the record.",
        nextSceneId: "tipoff-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "snoop-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"Do not do that, and I need you to actually hear me. Going into his private accounts is unlawful. The material is inadmissible, so it buys you nothing, and the act itself becomes a weapon in his hand. Picture the covert man you have described being able to say, truthfully, that you hacked his email during the divorce. That is a gift. Take only what is jointly yours or comes to the house. It is genuinely enough."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The laptop is right there and the temptation is diligence-shaped. It is a trap in that shape. The clean file, lawfully built, wins the case. The dirty file loses it twice, once as inadmissible, once as his corroborated story.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-lawful",
        text: '"You are right. Joint accounts and household post only. I leave his private logins alone."',
        tactic: "Recovery. The line held. The file stays clean and usable.",
        nextSceneId: "the-communication",
        isOptimal: true,
      },
    ],
  },

  {
    id: "tipoff-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"He will disclose formally, and we will hold him to it. The order of operations matters, though. Build your own copy of the joint picture first, quietly, this week. Then the formal disclosure request goes out and he is on the record. If you ask him first, before you have your own snapshot, you hand a man with something to manage the chance to manage it. Copies first. Requests second."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The instinct to keep it above board is not wrong; the sequence is. A snapshot of the joint picture, taken before he knows the machinery is moving, is not a trick. It is the difference between disclosure and a chance to tidy.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-sequence",
        text: '"Copies of the joint picture first, this week. Then the formal request. I will not ask him directly yet."',
        tactic: "Recovery. The sequence corrected. Your snapshot before his window.",
        nextSceneId: "the-communication",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE COMMUNICATION
  // ===================================================================
  {
    id: "the-communication",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"Last thing, and it runs for the whole case. How you talk to him from now on. He will text. Some of it will be reasonable, some of it will be built to provoke a reply you would not want read back to you. So: civil, factual, in writing wherever it matters, and nothing about the split in front of the children. Agree no settlement, no figure, no arrangement, without running it past me first. Assume every message you send can be read aloud in a courtroom, because it can be."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Write every message as though a judge will read it aloud. The calm, factual, dated record is an asset that quietly accumulates in your favour. The furious two a.m. reply he engineered is his exhibit. The discipline is not about being nice to him; it is about who the record ends up belonging to.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "clean-record",
        text: '"Civil and factual, in writing, nothing about the divorce in front of the kids, and no deal agreed without you seeing it first. I will treat every message as if it will be read out."',
        tactic: "The clean record. It costs you the satisfaction of the reply he is fishing for and it buys you the one thing that compounds: a calm, dated, factual paper trail that reads well to anyone who later has to weigh the two of you against each other.",
        feedback: "Every message from here is an asset, not ammunition. That is a decision you make once and keep.",
        nextSceneId: "the-close",
        isOptimal: true,
        xpBonus: 40,
        event: "restraint-shown",
      },
      {
        id: "settle-tonight",
        text: '"It might be simpler if he and I just sort the main points out between us tonight, keep it amicable, and I bring you a deal that is basically done."',
        tactic: "The amicable instinct is right; the unadvised deal is not. Anything you agree tonight, before disclosure and before advice, you may be held to, and you cannot yet know what you are signing away because you have not seen the full picture. Amicable is the tone. It is not a substitute for knowing your position first.",
        nextSceneId: "settle-derail",
        isOptimal: false,
      },
      {
        id: "go-dark",
        text: '"Then I will just stop talking to him. No texts, no calls, nothing, until this is over. I go completely silent."',
        tactic: "Going dark on everything, including the children's logistics, looks obstructive and it hurts the kids, who still need the school run coordinated whatever the adults are doing. The discipline is civil and minimal, not absent. Silence on the practical co-parenting is its own bad exhibit.",
        nextSceneId: "godark-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "settle-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"I want it amicable too, genuinely. But not tonight and not as a done deal. You have not seen his pension figure yet. You do not know the house valuation. An agreement reached this week, in the highest emotion of the whole process and without disclosure, is the agreement you may be stuck living inside for ten years. Be warm with him. Settle nothing. Bring me the conversation, not the contract."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "The wish to keep it civilised is healthy and the mechanism is backwards. You cannot negotiate a fair deal on a picture you cannot yet see. Warmth now, figures later, signature last.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-no-deal",
        text: '"Amicable in tone, nothing agreed. I will bring you the conversation, not a deal."',
        tactic: "Recovery. The instinct kept, the mechanism corrected. No signature before disclosure.",
        nextSceneId: "the-close",
        isOptimal: true,
      },
    ],
  },

  {
    id: "godark-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"I understand the appeal of silence and I would advise against it. The children still need the two of you to run a school week. Refusing to communicate at all reads as obstruction, and it is the children who absorb the friction of it. Keep it to logistics, keep it civil, keep it in writing. Minimal is the discipline. Absent is a different exhibit, and not one that helps you."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The urge to disappear is understandable and it is a luxury the co-parenting does not allow. Minimal and civil is not the same as open and warm; it is the narrow band that protects the kids and the record at once.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "recover-minimal",
        text: '"Civil and minimal, in writing, logistics only. Not silence."',
        tactic: "Recovery. The middle band restored. Enough for the children, controlled for the record.",
        nextSceneId: "the-close",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CLOSE
  // ===================================================================
  {
    id: "the-close",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["solicitor", "inner-voice"],
    dialog: [
      {
        speakerId: "solicitor",
        text: '"We are nearly done. Before the next forty-eight hours run away from you, tell me what you are actually going to do between now and our follow-up. Say it out loud so I can hear the plan."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The last question is a rehearsal. She wants the plan spoken so that it is real, and so that anything reckless in it surfaces now, in front of the one person paid to catch it, rather than at ten p.m. tonight with him in the next room.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "the-plan",
        text: '"Sign nothing, agree nothing. Build my own copies of the joint file this week. Keep every message to him civil and factual. Book the follow-up with you. And tell no one beyond my sister until we have a plan for how the children are told."',
        tactic: "The hour converted a decision into a plan. Four concrete actions and a boundary, no leverage games, no announcements, nothing signed. The infrastructure gave you the standing; the call gave you the sequence. What happens next is administrative, and it is yours.",
        feedback: "A decision has become a plan with an order to it. That is the entire point of the hour, and you spent it well.",
        nextSceneId: "ending-the-hour",
        isOptimal: true,
        xpBonus: 50,
        event: "restraint-shown",
      },
      {
        id: "the-leverage",
        text: '"I think I will tell him tonight that I have seen a lawyer. Set the tone early, let him know I am serious and organised."',
        tactic: "The reveal feels like strength and it is information you would be giving away for nothing. It tells him to instruct his own solicitor and to move first on anything he wants to move, and it buys you no advantage the formal process would not deliver anyway. The tell you announce is a tell you no longer hold.",
        nextSceneId: "ending-the-leverage",
        isOptimal: false,
      },
      {
        id: "the-handshake",
        text: '"Honestly, I think I can get him to shake on the main points this weekend, before he gets his own advice and it turns into a fight. Lock in a deal while he is still off balance."',
        tactic: "The pre-emptive handshake is the exact move she spent the last ten minutes telling you not to make. A settlement built before disclosure, in the highest-emotion week of the entire process, with a covert narc who will re-narrate it the moment it suits him, is the deal you regret at leisure for a decade.",
        nextSceneId: "ending-the-handshake",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-the-hour",
    backgroundId: "apartment",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Hour That Paid For Itself",
    endingLearnPrompt:
      "The first legal call has a specific shape: outcome-first framing, total disclosure to your own solicitor including the account already moved, lawful document gathering, communication discipline, and a forty-eight-hour plan with nothing signed and nothing announced. The hour cost the price of the hour and it converted a spoken decision into an ordered plan you control. The strategy that wins a divorce is not cleverness against him; it is transparency with the one professional whose only job is you, and discipline everywhere else.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "9:58 a.m. The notepad has four lines and a boundary on it. The water is finally drunk. She has your account, your figures, your objective, and the truth about the transfer, and none of it can be turned against you now because none of it is hidden. Whatever the next year costs, the hour just made it survivable. You pick up the pen and start on the joint statements.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-the-leverage",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Tell You Gave For Free",
    endingLearnPrompt:
      "Announcing that you have lawyered up feels like strength and functions as a free gift of information. It tells him to instruct his own solicitor and to move first on anything he wants moved, and it buys you nothing the formal process would not deliver on its own timeline, on your terms. The advantage in a divorce is rarely in what you reveal; it is in the quiet, complete, disclosed file you build before anyone is watching. Next time: build first, announce never.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "10:02 a.m. The plan is sound except for the one line you added at the end. By tonight he will know the machinery is moving, and tomorrow he will have his own Frances, and the week you could have spent quietly building the file is now a week you both spend watching each other.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-the-handshake",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Handshake Deal",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The pre-emptive handshake is the one move the entire call was built to prevent. A settlement reached before disclosure, in the highest-emotion week of the process, with a covert narcissist who reads your haste as weakness, is not a shortcut past the fight. It is the fight, lost quietly, at the table, in the week you understood your position least. By the time you see his pension figure, the deal will already have a shape, and the shape will not be yours. The rule the solicitor gave you in the first sixty seconds was the whole call: sign nothing, agree nothing, until you can see what you are agreeing to.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Saturday, and he is being reasonable, which should have been the warning. The handshake feels like control. It is the last moment you will feel that for a while. Somewhere in the numbers you have not seen yet, the deal is already the wrong one.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce21: Scenario = {
  id: "divorce-2-1",
  title: "The Lawyer Call",
  tagline: "Thursday, 9:05 a.m. one hour with the first person whose only job is your interests.",
  description:
    "Divorce-Arc, Level 2. The morning after the decision was spoken (divorce-1-1), one hour on the phone with a family-law solicitor. The scenario teaches real pre-divorce discipline: outcome-first framing over the emotional case, total disclosure to your own solicitor including the account already moved, lawful document gathering, communication discipline with the spouse, and a forty-eight-hour plan with nothing signed. The covert-narc spouse is off-screen and shapes every decision. Same clinical register as divorce-1-1; the discipline here is in the listening and the not-saying.",
  tier: "vip",
  track: "divorce-arc",
  level: 2,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 480,
  badgeId: "the-lawyer-call",
  startSceneId: "content-gate",
  prerequisites: ["divorce-1-1"],
  tacticsLearned: [
    "Outcome-first framing on the first call: your objective and your facts, not the emotional case a no-fault court will not weigh",
    "Full disclosure to your own solicitor, including the account already moved; the fact she knows, she can defend",
    "Lawful document gathering: copies of the shared file and the household post, never his private accounts",
    "Communication discipline: write every message to him as if a judge will read it aloud, because they can",
    "Sign nothing and agree nothing before disclosure and advice; the unadvised handshake is the deal you live inside for a decade",
  ],
  redFlagsTaught: [
    "The build-the-case instinct: spending the billable hour proving he is awful instead of protecting the children and the finances",
    "Non-disclosure to your own solicitor, the only unrecoverable move, the fact his side surfaces that she never had",
    "Asset dissipation dressed as protection; moving money reads as bad faith and is the first thing his side looks for",
    "Accessing his private accounts for documents; unlawful, unusable, and it becomes his corroborated story about you",
    "The pre-emptive reveal and the unadvised handshake; a tell given for free and a settlement locked in the week of highest emotion",
  ],
  characters: [INNER_VOICE, SOLICITOR, THE_SPOUSE],
  scenes,
  isNew: true,
};

export default divorce21;
