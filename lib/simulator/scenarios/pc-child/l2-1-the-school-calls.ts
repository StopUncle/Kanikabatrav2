/**
 * pc-2-1 — "The School Calls"
 *
 * PC-Child track, Level 2, order 1. Age 10. Five years after the
 * hamster. The household log is in its fifth year. Finn has been
 * seeing the specialist intermittently. Lily, now eight, sleeps in
 * her own room again but her door locks from the inside. The specific
 * monday-morning call from the school principal is the episode.
 *
 * Teaches:
 *  - The difference between a principal who believes you and a
 *    teacher who does not
 *  - What to take to the meeting (the log; the specialist letter;
 *    a dated chronology; nothing else)
 *  - The other parent's call — how to handle the call when Finn has
 *    done something to another family's child
 *  - The triangulation between school / specialist / co-parent
 *
 * Opens with mandatory content gate. Voice: clinical restraint.
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import {
  INNER_VOICE,
  THE_PARTNER,
  SIBLING_YOUNGER,
} from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE — mandatory opening
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This scenario takes place five years after pc-1-1. The child is now ten. The scenarios in this track get progressively heavier; this one contains references to a sustained pattern of incidents at school, including one involving another child.",
      },
      {
        speakerId: null,
        text: "There is no graphic content. The school incident is described in the principal's voice, not in the child's. The focus is on the parental response — what you take into the meeting, what you say to the teacher who does not believe you, what you do when the other family's parent calls.",
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
        tactic: "The scenario will open at 8:47 a.m. Monday with the principal's call on your phone.",
        nextSceneId: "the-monday-call",
        isOptimal: true,
      },
      {
        id: "exit",
        text: "Not tonight.",
        tactic: "Valid. The scenario will be here when you return.",
        nextSceneId: "ending-opted-out",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 1 — the call
  // ===================================================================
  {
    id: "the-monday-call",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Monday, 8:47 a.m. The call is from the school office. The voice on the line is the principal — not the secretary, not Finn's teacher. The principal has only called you directly twice in the last two school years; on both prior occasions the call was serious.",
      },
      {
        speakerId: null,
        text: "She says, in a register that is measured and not alarmed: 'I'm calling about Finn. There's been a situation this morning involving him and two other children. Can you come in? Not urgently — but today, if possible. I'd rather not discuss this on the phone.'",
      },
      {
        speakerId: "inner-voice",
        text: "Note the operational clarity of that call. One — she called you, not your partner, because the household log you produced at the specialist's request last year listed you as the incident contact. Two — she declined to describe the situation on the phone, which tells you the situation is not simple. Three — 'not urgently' is the phrase of a principal who has decided, in the time between the incident and picking up the phone, that you are an ally rather than a combatant. She is, quietly, on your side.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "This will be your fourth school meeting about Finn in two years. The first two were with his last teacher, who did not believe you. The third was with a vice-principal who sort of believed you. The principal calling directly is a different register — it means the school's institutional position has moved. You want to arrive at this meeting with the right materials and the right co-parent configuration, and you want to do the arrival in the next ninety minutes, not after you have spent three hours catastrophising.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "say-yes-and-call-partner",
        text: 'Agree on the phone — "eleven a.m. works, I will be there" — then hang up and call your partner. Before anything else.',
        tactic: "The canonical move. Confirm the meeting without delay; then bring the co-parent in before logistics, before research, before the log retrieval.",
        nextSceneId: "partner-call",
        isOptimal: true,
      },
      {
        id: "ask-what-happened",
        text: 'Ask the principal on the phone — "can you at least tell me who the other children are?"',
        tactic: "Understandable; also wrong in this specific register. The principal explicitly declined to discuss on the phone. Respecting that is a form of respect for her institutional position, which she needs if she is going to be your ally in the meeting.",
        nextSceneId: "principal-declines",
      },
      {
        id: "ask-to-bring-specialist",
        text: 'Ask on the phone — "would it be helpful if I brought a letter from Dr. Patel, or any of the clinical notes?"',
        tactic: "Excellent operational question. The principal's answer tells you how this meeting is going to run. You are signalling that you treat this as a collaboration, not a defence.",
        nextSceneId: "principal-asks-letter",
        isOptimal: true,
      },
      {
        id: "reschedule",
        text: 'Say — "today is difficult, is tomorrow morning possible?"',
        tactic: "Stalling on a principal's call at age 10 is a specific category of mistake. She called you quickly because there is a window for intervention. Deferring the meeting to tomorrow communicates that you are not treating this with the institutional urgency she is.",
        nextSceneId: "ending-deferred-badly",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACT 2A — partner call
  // ===================================================================
  {
    id: "partner-call",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "You call your partner at the office. They pick up on the third ring. You give them the facts in forty-two seconds: principal called, eleven a.m., not urgent, won't discuss on phone, involves Finn and two other children.",
      },
      {
        speakerId: "the-partner",
        text: '"I am coming. Both of us in the room is the right move. I will be there by ten forty-five. I will bring the specialist letter from my jacket pocket — I keep a copy of it in my wallet now — do you have the log?"',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Note what your partner just did in fifteen seconds. One — committed to being there, full stop, not 'if I can get out of my meeting.' Two — revealed that they carry the specialist letter in their wallet, which is a piece of operational discipline you did not know they had adopted. Three — asked about the log. This is a co-parent who has integrated the pattern over the five years. This conversation is not a conversation; it is an operational handoff.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "retrieve-log",
        text: "Retrieve the household log. Print the last twelve months. Highlight the three most recent dated entries that bear on school behaviour.",
        tactic: "The log is the most valuable document you will bring into the meeting. Its value comes from being dated, dispassionate, and pre-existing — not constructed this morning. The highlighting is for the principal's convenience; she will have seven minutes of attention and you want the most relevant twelve months in front of her first.",
        nextSceneId: "log-prepared",
        isOptimal: true,
      },
      {
        id: "prepare-statement",
        text: "Write up a one-page chronology of the past two years of Finn's school incidents, formatted as bullet points, for the principal.",
        tactic: "Worse than the log. A one-pager constructed this morning will read as a constructed narrative, however accurate. The log is stronger precisely because it was dated in real-time.",
        nextSceneId: "statement-prepared",
      },
      {
        id: "call-specialist",
        text: "Call the specialist (Dr. Patel) to ask if they can be reached during the meeting or join by phone.",
        tactic: "High-value if feasible. Most specialists cannot do this on ninety minutes' notice. Worth the call; expect the answer to be no.",
        nextSceneId: "specialist-response",
        isOptimal: true,
      },
    ],
  },

  {
    id: "principal-declines",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "The principal declines to tell you the other children's names on the phone — 'I'd rather go through this together in person' — but the declining is warm. She repeats the eleven a.m. time.",
      },
      {
        speakerId: "inner-voice",
        text: "She held her line. That is a useful data point in itself — a principal who holds a line with a parent in real time is a principal who will also hold a line in a meeting with you in the room. That is structurally good for today.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "partner-call",
  },

  {
    id: "principal-asks-letter",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "The principal pauses before she answers, and then says: 'Yes. The letter would be helpful. And any recent clinical notes. It will help me position this with the other family.'",
      },
      {
        speakerId: "inner-voice",
        text: "She just told you what the meeting is actually about. It is not a disciplinary meeting. It is a meeting to coordinate the institutional response to the other family — to whom she will, in her own meeting with them, have to produce a credible account of the school's handling of Finn. The letter and the notes give her material to work with in the other meeting. You are, in a sense, being recruited onto her side against a position she has not yet articulated. That position is coming from the other child's parent.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "partner-call",
  },

  {
    id: "statement-prepared",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You write up the one-page chronology. It takes you eighteen minutes. You print it. You reread it. It reads, honestly, as a piece of advocacy — which it is, because it was composed this morning by a parent under stress. A principal who skims it will see that.",
      },
      {
        speakerId: "inner-voice",
        text: "Bring the log to the meeting instead of or alongside the one-pager. The log's date stamps are the critical asset — they tell the principal you were not caught unprepared by the pattern, you have been tracking it for five years, and the pattern's existence is not contingent on today's incident. The constructed chronology, however accurate, is a different kind of artefact.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "log-prepared",
  },

  {
    id: "specialist-response",
    backgroundId: "text-screen",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Dr. Patel's office replies within eight minutes. Dr. Patel cannot join today. She can take a call from the principal after the meeting. Her PA sends you a two-sentence letter confirming Finn is under their care, dated today, with Dr. Patel's direct line for institutional contact.",
      },
      {
        speakerId: "inner-voice",
        text: "That is worth more than having the specialist in the room. A current-dated confirmation with a direct institutional line for the principal to call afterwards gives the principal exactly what she needs to carry the school's position credibly into her meeting with the other family. You did not need Dr. Patel in the meeting; you needed Dr. Patel's line in the principal's hand.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "log-prepared",
  },

  // ===================================================================
  // ACT 2B — the principal's office
  // ===================================================================
  {
    id: "log-prepared",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You print the last twelve months of the log. Forty-one dated entries, ranging from short ('Saturday, took a toy back from Lily by calmly escalating, no emotional display. Noted.') to longer paragraphs. You highlight three — the October entry about the birthday party; the December entry about the substitute teacher; the February entry about the cat.",
      },
      {
        speakerId: null,
        text: "You and your partner arrive at the school at 10:52 a.m. The principal meets you in the reception.",
      },
    ],
    nextSceneId: "the-meeting",
  },

  {
    id: "the-meeting",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "The meeting is in the principal's office, door closed. She thanks you for coming in, declines coffee on all three of your behalves, and then — without preamble — tells you what happened. Finn and two other boys were in the library during unscheduled time. Finn is believed to have constructed, over several weeks, a situation in which one of the other boys was made to do something he did not want to do, under threat of a specific social consequence. The school's description is careful. The substance is clear.",
      },
      {
        speakerId: null,
        text: "Ms. Alvarez, Finn's classroom teacher, is in the room. She is not speaking. Her body language is skeptical of the framing.",
      },
      {
        speakerId: "inner-voice",
        text: "Two institutional positions in the room. The principal is running a concerned-but-allied register, which is your target. Ms. Alvarez is running a 'this-seems-extreme' register, which is not uncommon — teachers of ten-year-olds who present well publicly are often the last to adjust their read of a specific child. The meeting will be won or lost based on whether the principal's read holds against Ms. Alvarez's skepticism. The log does not convert Ms. Alvarez. The log reinforces the principal.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "lead-with-log",
        text: "Slide the printed log across the desk to the principal. Say: 'This is the last twelve months of a household record we have kept since he was five. Three highlighted entries correspond to the behaviour category the library incident falls into.'",
        tactic: "Lead with the artefact. The log does the work before you say anything about it. The principal will read the highlighted entries; Ms. Alvarez will see the existence of the log; the conversation shifts register.",
        nextSceneId: "log-lands",
        isOptimal: true,
      },
      {
        id: "defend-finn",
        text: '"I would like to hear what Finn has said. He is ten. There are two sides to every incident."',
        tactic: "The reflex of many parents of a specifically-presenting ten-year-old. Understandable; also the worst opening in this room. It positions you as the parent who believes the child's account reflexively, which is exactly the frame Ms. Alvarez is braced for.",
        nextSceneId: "defence-lands-badly",
        isOptimal: false,
      },
      {
        id: "ask-principal",
        text: '"What is your institutional plan? I want to know that before I react."',
        tactic: "A cold question, well-placed. It signals that you are not going to run defensively; it invites the principal to share her position, which strengthens the alliance by giving her the first word.",
        nextSceneId: "principal-plan",
        isOptimal: true,
      },
      {
        id: "provide-specialist-letter",
        text: "Give the principal Dr. Patel's current-dated letter with the direct line. Then open the log.",
        tactic: "The full operational move. Establishes clinical engagement before disciplinary framing; gives the principal exactly the artefact she asked for on the phone.",
        nextSceneId: "letter-lands",
        isOptimal: true,
      },
    ],
  },

  {
    id: "log-lands",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "The principal reads the highlighted entries. Her expression does not change dramatically; it becomes, by a small amount, more measured. Ms. Alvarez leans forward at the October entry, which includes the sentence: 'In the middle of the game Finn produced, calmly, a specific consequence threat to another child that I, overhearing from the kitchen, noted because it was an adult construction delivered in a child's voice.'",
      },
      {
        speakerId: "inner-voice",
        text: "Ms. Alvarez's lean-forward is the teaching moment. She has not been wrong to run the skeptical register for months — her institutional job is to read her classroom accurately, and her classroom read of Finn is based on what she sees in class, which is a well-presenting ten-year-old. The log shows her the other surface, the one she cannot see in class. She is not converting in this meeting; she is updating. That is, structurally, the most you will get today from her.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "principal-plan",
  },

  {
    id: "letter-lands",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "You slide the letter across first, then open the log to the highlighted pages. The principal reads the letter, folds it, places it to her right — not to her left with general paperwork; to her right with the materials she is going to take into her next meeting.",
      },
      {
        speakerId: "inner-voice",
        text: "Placement matters. The letter going to her right means she is carrying it forward to the meeting with the other family. You have, in one slide-across, given her the institutional anchor she needed to hold the school's position credibly. The log is now additional material; the letter is the load-bearing artefact.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "principal-plan",
  },

  {
    id: "defence-lands-badly",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "The principal's register cools by a discernible half-degree. Ms. Alvarez's posture opens up — her skeptical read has, in her view, been confirmed. Your partner, sitting next to you, does not visibly react, but you feel the air beside you shift.",
      },
      {
        speakerId: "inner-voice",
        text: "You just spent the alliance. The principal is still on your side operationally — she has to be, because of the other family — but her confidence in the alliance has taken a hit. You can still recover the meeting if the next move is the log or the specialist letter, delivered calmly. Do not double down on the 'two sides' frame. The ten-year-old is the specific subject; there are not symmetrical sides.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "recover-with-log",
        text: "Open the log. Lead with the October entry. 'I want to show you what I mean when I say I know my son. This is a record from October.'",
        tactic: "The recovery move. The phrase 'I know my son' frames the log not as an accusation but as evidence that your engagement is clinical, not reflexive.",
        nextSceneId: "log-lands",
        isOptimal: true,
      },
      {
        id: "double-down",
        text: "\"I think it is important that we not jump to conclusions about a child's character based on one incident.\"",
        tactic: "Double-downs after a framing error compound the error. Ms. Alvarez will go home tonight having been right about you; the principal will reluctantly categorise you with the other non-engaged parents she has had to manage.",
        nextSceneId: "ending-alliance-lost",
        isOptimal: false,
      },
    ],
  },

  {
    id: "principal-plan",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "The principal lays out the plan. Finn will be supervised in all unscheduled time for the remainder of the term. The school counsellor will see him weekly. The library incident will be documented in his internal file without a disciplinary code, pending a follow-up with Dr. Patel. The other family has been informed that the school is taking it seriously; the other family has not been given Finn's name, because they already know his name.",
      },
      {
        speakerId: null,
        text: "She says: 'The other boy's father will be calling you. He asked for your number. I gave it to him because I believed, based on our history, that you would handle the call the way I would want it handled. I will regret that if I was wrong.'",
      },
      {
        speakerId: "inner-voice",
        text: "She just told you, with institutional precision, that she expects you to handle the other parent's call as an adult. That is both a gift and a test. The gift is that the school will back your handling of the call. The test is that whatever you say to the other parent, the principal will learn about — and her trust in the alliance will recalibrate.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "commit-cleanly",
        text: '"Thank you. I will take the call. I will not reveal clinical information. I will acknowledge, apologise, and offer to pay for the counselling his son needs. Would that match your expectation?"',
        tactic: "The canonical move. Pre-confirmed with the principal; gives her the handling you propose; invites her to calibrate your approach before you execute it. This is how alliances hold.",
        nextSceneId: "ending-alliance-held",
        isOptimal: true,
      },
      {
        id: "refuse-payment",
        text: '"I will take the call. I am not paying for counselling. That is a separate conversation."',
        tactic: "Defensible in law; costly in alliance. The father wants a gesture; the financial gesture is small relative to the relational cost of refusing it. Fights about the money later will colour the meeting you had today.",
        nextSceneId: "ending-meeting-ok-other-call-coming",
      },
      {
        id: "refuse-the-call",
        text: '"I would prefer the call go through a lawyer. Can you relay that to him?"',
        tactic: "Wrong. The lawyer frame is a specifically bad signal at this stage, because it communicates institutional posture when the other father is, as of today, asking for a human conversation. Lawyer the call later if there is a basis; do not lead with it.",
        nextSceneId: "ending-lawyered-up",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-alliance-held",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Meeting Held",
    endingSummary:
      "By 11:42 a.m. you were back in the car with your partner. The log was on the principal's desk. The specialist letter was in her right-hand pile, going into her next meeting. Ms. Alvarez had updated her read by about 12%, which is 12% more than she had on Monday morning. The other boy's father will call you tonight. You and your partner have, in the car on the drive home, already rehearsed the specific sentences — 'I am so sorry. I am Finn's parent. He has a condition we are treating. I am committed to paying for whatever counselling your son needs. I am not going to defend my child to you today.' The father will accept this, not immediately, but within the call. Five years of log-keeping bought you this meeting; the meeting bought you the next five years of the school not being in opposition to the family.",
    endingLearnReference: "how-to-leave-without-being-villain",
    endingLearnPrompt:
      "Alliances with institutions are built in minutes like these — when you arrive prepared, give them the materials they need, and let them carry the institutional position into rooms you are not in. Do this every time. The cost is small per meeting; the compounding over years is decisive.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Finn is ten. The next eight years are coming. The principal, the specialist, and your co-parent are, as of today, aligned on a frame that you have been building since age five. You will lose scenes; you will lose specific teachers; you will not lose the alliance. Note what made the alliance hold — preparation, the log, the letter, the willingness to take the other father's call like an adult. Replicate all four, every time.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You drive home past Lily's school. Lily is, at 11:47, in math class. You will pick her up at 3:15. Her door locks from the inside because five years ago you had a conversation across a kitchen table that most couples never have. The structure is holding. The structure is holding today.",
      },
    ],
  },

  {
    id: "ending-meeting-ok-other-call-coming",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Financial Line",
    endingSummary:
      "You held the line on not offering to pay for counselling. The meeting closed politely. The principal's trust in the alliance is unchanged on the institutional question; her trust in the alliance on the specific call-with-the-other-father is diminished by about twenty percent. The father will call you tonight. He will ask for counselling costs. You will not pay. The conversation will be fine; the relationship with the school will stay intact; but the specific friction with the other family will extend about eight months longer than it would have if you had offered the gesture at the meeting. This is not a catastrophic ending — it is a specific trade of money against institutional goodwill. Reasonable parents make this trade in either direction. Note which way you made it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Counselling-for-the-other-child is one of those costs that feels like an admission of guilt when offered and is, in practice, a specific kind of institutional lubricant. It does not prove Finn did anything legally actionable; it communicates that your family takes the impact seriously. The choice to not offer it is legitimate; the specific ways it will cost you over the next year are predictable. Keep the log.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-alliance-lost",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook — How They Actually Operate",
    endingTitle: "The Meeting Lost",
    endingSummary:
      "You doubled down on the 'two sides' frame. The principal recalibrated. Ms. Alvarez went home having been right about you. The alliance you had built over five years of log-keeping did not so much collapse as quietly downgrade by one tier — from 'parent we trust to handle this' to 'parent we monitor.' The supervision plan for Finn will still happen; the school counsellor will still see him; but the institutional frame, which was going to treat him as a child with a condition, is now going to treat him as a child with parents who are not fully onboard with the diagnosis. That is a costly structural shift. The log is not less valuable for having been presented; the frame you wrapped it in was the problem. Do not stop keeping the log. Bring it alone to the next meeting. Leave the 'two sides' sentence at home.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Write down what you said. Dated entry, verbatim. Read it back on Wednesday. The version of you who said the sentence is not the version of you who keeps the log; those are, occasionally, two different people, and the scenario ended poorly because the first version got to the microphone before the second. This is fixable. The next meeting is not today.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-lawyered-up",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze — How Sociopaths Detect Weakness",
    endingTitle: "Lawyered Too Early",
    endingSummary:
      "You asked for the call to go through a lawyer. The principal did not argue; she noted it. The other father received the message and drew the specific conclusion you did not want him to draw — that the family has something to protect. He will tell his wife. They will tell their friends at school. Within two weeks the parent-body narrative will have shifted. There is no legal catastrophe; there is, instead, a specific reputational cost that the family will carry until Finn finishes this school. The lawyer frame is the correct escalation if and when something escalates to a legal question. It is not the correct opening in the first meeting about the first school incident of this kind. Note the timing. The lesson is timing.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "If the other family does not sue in the next ninety days, they are not going to, and the lawyer frame becomes retroactively disproportionate. Walk this back privately with the principal next week. Not to apologise; to clarify that the lawyer stance was reflexive protection of a child with clinical care, not a legal position. She will note the clarification. It will not undo the parent-body shift, but it will preserve the school-side alliance.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-deferred-badly",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control — How Emotional Dependency Is Built",
    endingTitle: "Deferred",
    endingSummary:
      "You rescheduled to Tuesday morning. The principal accepted; she had no choice. The other family's call to her, which you did not know about, happened at 2:14 p.m. Monday. In that call, the other father asked whether your family had been contacted yet. The principal had to say 'yes, but the meeting is tomorrow.' The other father registered that as evasion — unfairly or not. By Tuesday morning when you arrive, the institutional frame has slipped half a step. The meeting itself will still be productive; the specific warmth of the alliance that you would have had on Monday is not fully recoverable. This is not a disaster. It is a specific cost of deferring an institutional call about your ten-year-old, and it is the kind of cost that compounds if you defer the next one too.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Principals call parents directly about ten-year-olds perhaps five times a year across a school. When they do, the call is to be taken today. Note the cadence. It is, structurally, the same rule as the 48-hour rule with a narc parent — but inverted: when the institution calls, you show up inside the window because the institution's operational choices are gated on you showing up.",
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
      "You opted out. The scenario will be here when you return. In the meantime, pc-1-1 is available as the earlier scene in this track, and the anxiety and toxic-narc tracks are adjacent if you want to be in a different register tonight.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You know your own bandwidth. Protecting it is part of the discipline.",
        emotion: "neutral",
      },
    ],
  },
];

export const pcChild21: Scenario = {
  id: "pc-2-1",
  title: "The School Calls",
  tagline: "Monday, 8:47 a.m. Age 10. The principal is on the line. She is warm. That is the signal.",
  description:
    "Opens pc-child L2. Five years after The Hamster. The household log is in its fifth year. Finn is ten. The school principal has called directly about an incident involving Finn and two other boys in the library. The scenario teaches institutional alliance-building, the specific materials to bring into a meeting, and how to handle the other family's call.",
  tier: "vip",
  track: "pc-child",
  level: 2,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 340,
  badgeId: "meeting-held",
  startSceneId: "content-gate",
  prerequisites: ["pc-1-1"],
  tacticsLearned: [
    "The principal-calls-directly cadence (~5x/year across a school) — the call is to be taken today",
    "The household log as the load-bearing document: dated, dispassionate, pre-existing",
    "The current-dated specialist letter as the institutional anchor the principal carries into her next meeting",
    "Lead with the log, not with defence — 'two sides' is the worst opening in a principal's office about this kind of incident",
    "Offer counselling costs to the other family as institutional lubricant, not as admission of legal fault",
    "Do not lawyer up on the first school incident — the lawyer frame communicates a specific signal to the parent body that cannot be un-transmitted",
  ],
  redFlagsTaught: [
    "The reflex to defend the child's account in a meeting about this specific pattern — compounds rather than protects",
    "Constructing a one-pager the morning of — reads as advocacy; weaker than the dated log",
    "Deferring the meeting to tomorrow when the institution has already signalled urgency",
    "Cold 'I want to know the plan before I react' is useful; cold 'I want a lawyer' is costly in this specific meeting",
  ],
  reward: {
    id: "meeting-held",
    name: "The Meeting Held",
    description:
      "Five years of log-keeping bought you this meeting. The meeting bought you the next five years of institutional alliance.",
  },
  characters: [INNER_VOICE, THE_PARTNER, SIBLING_YOUNGER],
  scenes,
};

export default pcChild21;
