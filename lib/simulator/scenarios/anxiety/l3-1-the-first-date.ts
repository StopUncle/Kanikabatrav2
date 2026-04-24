/**
 * anx-3-1 — "The First Date"
 *
 * Anxiety track, Level 3 (The First Date), order 1. You showed up to
 * the wine bar on Friday — the handoff from anx-1-3 "The Read
 * Receipt." You are on the actual date. The scenario compresses
 * ninety minutes into ~15 scenes and asks the question the anxious-
 * attached reader has been asking for eleven years: how do you tell
 * the difference between a warm man and a warm-performance, in real
 * time, with your own nervous system running a rumination track
 * underneath?
 *
 * Teaches:
 *  - The grading problem — scoring his micro-expressions instead of
 *    noticing your own read of him
 *  - The interview-vs-conversation shift — when you notice you are
 *    asking questions in sequence to fill silence, the date has
 *    moved into the wrong register and the move is to name a thing
 *    about yourself, not ask another
 *  - Warm vs. performative warmth — the specific tell is whether he
 *    makes you feel seen or graded
 *  - The first-exit choice — second-round-of-drinks is a signal
 *    question, not a social one, and the critic wants you to refuse
 *    it for anxiety reasons rather than structural ones
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-anxiety.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_CRITIC, RHYS, NOOR } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THE BAR, EIGHT MINUTES EARLY
  // ===================================================================
  {
    id: "wine-bar-arrival",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "Friday, 7:22 p.m. You are eight minutes early. The wine bar is small, lit from above by three copper pendants, and about three-quarters full. You take a table near the back wall. You sit facing the door.",
      },
      {
        speakerId: "the-critic",
        text: "Eight minutes early is eager. Eight minutes early is how women get read as eager. Should have been four minutes late.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Eight minutes early is eight minutes you have to settle your body before he walks in. The grading has already started.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "order-a-drink",
        text: "Order a glass of wine. Sit. Let the eight minutes be eight minutes.",
        tactic: "Arriving early and settling with a drink is a regulation move. It positions you as the one at ease when he arrives, not performing having-just-got-here.",
        nextSceneId: "settled-at-table",
        isOptimal: true,
      },
      {
        id: "leave-to-restart",
        text: "Get up. Walk around the block. Arrive at 7:34.",
        tactic: "The restart move is performance. You will return more anxious, not less. The earliness was never the problem.",
        nextSceneId: "walked-the-block",
        isOptimal: false,
      },
      {
        id: "check-phone",
        text: "Stay seated. Open the phone. Scroll the ex's Instagram.",
        tactic: "The 8-minute window is a load-bearing interval; what you put into it decides what shows up on your face when he walks in. Theo's page is the worst available choice.",
        nextSceneId: "instagram-before-date",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SETTLED AT TABLE
  // ===================================================================
  {
    id: "settled-at-table",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The wine arrives — a Nero d'Avola, the waiter nods approvingly at your choice. You take a small sip. You put the glass down. You rest both hands on the table.",
      },
      {
        speakerId: "inner-voice",
        text: "Your body is here. The room is warm. The door is in front of you. Whatever walks through it walks into a scene that already exists without him.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "At 7:36 the door opens. Rhys walks in. He scans the room once, sees you, a small smile, raises a hand. He comes over.",
      },
      {
        speakerId: "rhys",
        text: '"Sorry — six minutes. Bus. Nothing clever."',
        emotion: "neutral",
      },
      {
        speakerId: "the-critic",
        text: "He apologised. That's either warm or performative. Start counting.",
        emotion: "cold",
      },
    ],
    choices: [
      {
        id: "accept-cleanly",
        text: '"You are fine. I had wine."',
        tactic: "A six-word response. Warm, brief, not performing gracious. The apology gets absorbed without you making it the opening frame.",
        nextSceneId: "first-ten-minutes",
        isOptimal: true,
      },
      {
        id: "reassure-at-length",
        text: '"Oh no, not at all, honestly — I was early, I was happy to just sit, it was lovely, the wine is great, I did not even notice the time."',
        tactic: "The over-reassurance signal. In anxious-attachment work, the length of a reassurance is inversely proportional to the security of the person giving it. You just told him exactly where you are starting from.",
        nextSceneId: "reassured-too-long",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FIRST TEN MINUTES
  // ===================================================================
  {
    id: "first-ten-minutes",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The first ten minutes are the calibration window. Rhys orders a glass of the same wine. He asks what you did with your Friday. You answer briefly. He answers about his briefly. The pace is neither fast nor slow. He does not interrupt. He does not finish your sentences.",
      },
      {
        speakerId: "the-critic",
        text: "He hasn't looked at your mouth once. Is he attracted to you? Check again. Count the times he looks at your mouth vs. your eyes.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic is grading micro-signals. The grading is rumination. Notice what is happening in your own body instead.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "notice-your-body",
        text: "Shift the attention. How does your body feel in this conversation? Are your shoulders down? Is your stomach unclenched?",
        tactic: "The nervous-system check is the correct move. Your read of him will be more accurate if your own body is the first instrument, not his face.",
        nextSceneId: "body-calibrated",
        isOptimal: true,
      },
      {
        id: "ask-deeper-question",
        text: 'Skip ahead. Ask a deeper question. "What\'s something you believed in your twenties that you don\'t anymore?"',
        tactic: "Not wrong, but early. A depth-question in minute eleven is often an anxious reach for information to grade him on. The calibration window wants shallow exchange, not vetting.",
        nextSceneId: "deep-early",
        isOptimal: false,
      },
      {
        id: "silent-mouth-count",
        text: "Count his mouth-looks vs. eye-looks anyway. Get the data.",
        tactic: "The data is noise. You cannot date a spreadsheet of micro-movements. Return to the actual room.",
        nextSceneId: "grading-intensified",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // BODY CALIBRATED
  // ===================================================================
  {
    id: "body-calibrated",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You notice: your shoulders are at ease. Your stomach is soft. You are laughing, twice, at things that are not that funny — at the level of response, not the level of performance. That is the read.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Rhys is saying something about a novel he is reading. He is not testing you on it. He does not name the author as if he is quizzing you. He says: 'I think I'm liking it more than I would admit to a friend who reads well.' He laughs once at himself.",
      },
      {
        speakerId: "inner-voice",
        text: "He just self-deprecated without fishing. A performative warm man would have paused. He did not pause.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-yourself",
        text: 'Tell him something about yourself, unprompted. "I used to pretend to have read Musil. I got through forty pages of the first book."',
        tactic: "Offering a small self-disclosure without being asked is the shift from interview to conversation. It is also a test — not of him, but of your own willingness to be seen before you have verified he is safe to be seen by.",
        nextSceneId: "disclosed-early",
        isOptimal: true,
      },
      {
        id: "mirror-his-question",
        text: 'Stay in question-mode. "What\'s the novel?"',
        tactic: "Not wrong, but you are in interview cadence. A question in response to a self-disclosure is a declined invitation.",
        nextSceneId: "interview-cadence",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // DISCLOSED EARLY
  // ===================================================================
  {
    id: "disclosed-early",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"Forty pages of the first book is further than most. I tell people I\'ve read Proust. I have read thirty-eight pages of Proust. I am at peace with it."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He laughs. You laugh. He does not follow up with an ask. He does not make the next move a test. He simply continues the thread.",
      },
      {
        speakerId: "inner-voice",
        text: "That was the first real signal. He met a self-disclosure with a self-disclosure, at matching weight. The exchange is symmetric. The critic is quiet.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The wine is half gone. It is 8:14 p.m. The ninety minutes is, approximately, half done.",
      },
    ],
    choices: [
      {
        id: "keep-present",
        text: "Keep going. No plan, no agenda. Just the conversation.",
        tactic: "The correct stance. Having calibrated, having disclosed, the remaining work is to not over-manage the rest.",
        nextSceneId: "mid-date-intrusion",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE CRITIC INTRUSION
  // ===================================================================
  {
    id: "mid-date-intrusion",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-critic", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "8:38 p.m. You are twenty-four minutes into a good conversation. You are telling him, mid-anecdote, about your last trip. You are about seven sentences into a story.",
      },
      {
        speakerId: "the-critic",
        text: "You are talking too much. You have been talking for three minutes. Shut up. He's going to think you're self-absorbed.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The critic arrives mid-date. Every anxious reader will recognise this. The critic is not here for good faith; the critic is here to interrupt the thing that is working.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-the-critic-internally",
        text: "Notice the critic. Finish the anecdote. Do not shorten it defensively.",
        tactic: "The technique is: notice the voice, do not argue with it, complete the action you were taking. Argument with the critic is what the critic wants.",
        nextSceneId: "anecdote-finished",
        isOptimal: true,
      },
      {
        id: "cut-the-story-short",
        text: 'Abort the story. "Anyway — sorry, I\'m monologuing. What about you?"',
        tactic: "The critic was obeyed. The cost: the conversation now knows something about your anxious pattern. He did not mind the story; the apology for the story is the signal.",
        nextSceneId: "apologised-for-talking",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ANECDOTE FINISHED
  // ===================================================================
  {
    id: "anecdote-finished",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You finish the story. It lands. He laughs at the right moment. He asks a follow-up question that is specific to the story, not a generic redirect. He has, evidently, been listening.",
      },
      {
        speakerId: "inner-voice",
        text: "The follow-up question is the second-order tell. You cannot fake it. He would have had to be present to ask it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "into-the-second-half",
        text: "The ninety minutes has become something else. Continue.",
        tactic: "The date has moved from first-date calibration to actual connection. The remaining question is what you do with the offer that is coming.",
        nextSceneId: "second-drinks-offer",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // SECOND-ROUND-OF-DRINKS OFFER
  // ===================================================================
  {
    id: "second-drinks-offer",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["rhys", "inner-voice", "the-critic"],
    dialog: [
      {
        speakerId: null,
        text: "9:04 p.m. The wine is done. The glasses are empty. He does not reach for his wallet. He does not look at his phone.",
      },
      {
        speakerId: "rhys",
        text: '"I would like another glass with you. But honestly — I have to be up at 5:40 for a flight. I would rather end this one here and ask you properly for a second one than be half-absent for an extra forty minutes."',
        emotion: "neutral",
      },
      {
        speakerId: "the-critic",
        text: "He's leaving. He wanted to leave. He's using the flight as an excuse. Read the flight as rejection.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Or he did exactly what a secure man does — name a structural reason, preserve the second date, decline to half-perform.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "accept-clean",
        text: '"That\'s the right call. I had a good time. Yes to the second one."',
        tactic: "Match his register — direct, warm, specific yes. The critic wants you to interrogate the flight; do not.",
        nextSceneId: "accepted-second-date",
        isOptimal: true,
      },
      {
        id: "probe-the-flight",
        text: '"Is the flight real though? Like — be honest, did I do something?"',
        tactic: "The anxious-attached probe. The cost is high: you just handed him the read that this is the pattern. The flight was the flight. Your anxiety made it a test.",
        nextSceneId: "probed-and-learned",
        isOptimal: false,
      },
      {
        id: "decline-defensively",
        text: '"Honestly maybe let\'s leave it. I had a nice time but I think maybe let\'s not do a second."',
        tactic: "The pre-emptive refusal. The critic has won the date. You just vetoed a second one because the first one was going well.",
        nextSceneId: "pre-emptively-declined",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ACCEPTED SECOND DATE — BEST ENDING PATH
  // ===================================================================
  {
    id: "accepted-second-date",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "He pays for the wine — without a production of it. You walk out together. He says: 'I'll text you tomorrow from the airport. Think about where you actually want to go next time — somewhere you've been wanting to go. My preference doesn't need to win.' He half-smiles, says goodnight, walks left. You walk right.",
      },
      {
        speakerId: "inner-voice",
        text: "His last sentence was an invitation to have a preference. In a life of anxious-attachment, the words 'my preference doesn't need to win' are a specific calibration signal. Warm, not performative. Low-effort to say, if he is who he appears to be.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "9:16 p.m. You are on the footpath. Noor's text comes through forty seconds later:",
      },
      {
        speakerId: "noor",
        text: "so. real talk.",
        emotion: "neutral",
      },
    ],
    choices: [
      {
        id: "text-noor-warmly",
        text: '"It was warm. He was warm. I was present. I will see him again."',
        tactic: "The four-sentence debrief. Clean, not over-authored, no grading. Noor will read the absence of drama as the presence of calibration.",
        nextSceneId: "ending-present-on-date",
        isOptimal: true,
      },
      {
        id: "text-noor-long",
        text: 'Write a 300-word text to Noor analysing his six-minute lateness, the flight, his mouth-vs-eye ratio, and whether his "my preference does not need to win" sentence was too perfect.',
        tactic: "The after-action rumination. The date was good; the analysis is the pattern the track is built to interrupt. Noor will read this and gently name it.",
        nextSceneId: "ending-analysed-afterwards",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SECONDARY ROUTES — SHORTER
  // ===================================================================
  {
    id: "walked-the-block",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You walk around the block. You arrive at 7:34. He is already there, at the table you would have taken. He has ordered wine for himself. He stands when you arrive.",
      },
      {
        speakerId: "inner-voice",
        text: "You have now arrived anxious, not settled. The first ten minutes will be a recovery, not a start.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "settle-now",
        text: "Sit. Order your wine. Reset. The first ten minutes are still available.",
        tactic: "Catchup is possible. Acknowledge the misstep internally, do not name it to him.",
        nextSceneId: "first-ten-minutes",
        isOptimal: true,
      },
    ],
  },

  {
    id: "instagram-before-date",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-critic", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Theo's Instagram has one new story. A woman's hand holding a wineglass at a bar that looks, from the angle, a lot like this bar. You know it is not this bar. Your nervous system does not know.",
      },
      {
        speakerId: "the-critic",
        text: "See? He moved on. She's prettier. You are sitting here about to meet someone who is going to notice you are distracted.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The 8-minute window has been filled with a poison that will show up on your face when Rhys walks in. This is the specific failure of the first-date anxiety pattern.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "close-the-app",
        text: "Close Instagram. Delete the app off the home screen for tonight. Look up at the door.",
        tactic: "The specific recovery. You cannot undo the glance; you can prevent the next one. The date has not started yet and the rumination still can be, approximately, contained.",
        nextSceneId: "first-ten-minutes",
        isOptimal: true,
      },
      {
        id: "keep-scrolling",
        text: "Keep scrolling. See the full story.",
        tactic: "The full scroll is the anxious rehearsal of rejection. When Rhys walks in you will be reading him against the ghost of the one who left.",
        nextSceneId: "rhys-meets-ghost",
        isOptimal: false,
      },
    ],
  },

  {
    id: "rhys-meets-ghost",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Rhys walks in at 7:36. You look up from the phone and meet him with a face that has, for the last seven minutes, been reading Theo's story. You smile a beat late.",
      },
      {
        speakerId: "inner-voice",
        text: "He noticed. He did not name it. The date is recoverable but the starting line has moved back.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-phone-lightly",
        text: '"Sorry — I was doom-scrolling about nothing. I am here now."',
        tactic: "A light name of the misstep, offered in warmth. It repositions the eight minutes, does not overclaim, and invites him into the present with you.",
        nextSceneId: "first-ten-minutes",
        isOptimal: true,
      },
      {
        id: "pretend-nothing",
        text: "Pretend nothing happened. Launch into the first question.",
        tactic: "The mask is visible. Not naming it will make the mask work harder, not less.",
        nextSceneId: "mask-during-date",
        isOptimal: false,
      },
    ],
  },

  {
    id: "reassured-too-long",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"Got it. Well — I am glad you were fine. What are we drinking?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He absorbed the over-reassurance cleanly. He did not grade you for it. He pivoted to the wine. The cost is a small one but the pattern has been read. Recover.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "recover-cleanly",
        text: "Answer about the wine. Let the moment pass.",
        tactic: "The best recovery is to be ordinary. Do not apologise for the reassurance; simply do not do it again.",
        nextSceneId: "first-ten-minutes",
        isOptimal: true,
      },
    ],
  },

  {
    id: "deep-early",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"That is a good question. Um — let me think. I used to think seriousness was the same thing as depth. I do not think that anymore."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He answered the question cleanly. He did not flinch. The depth-question landed. But you asked it from anxiety, not interest — and the pattern will repeat.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "downshift",
        text: "Downshift. Ask something lighter next. Rebuild the calibration window.",
        tactic: "You cannot un-ask the deep question. You can, across the next ten minutes, return the conversation to the warmth-register it was heading toward.",
        nextSceneId: "body-calibrated",
        isOptimal: true,
      },
    ],
  },

  {
    id: "grading-intensified",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-critic", "inner-voice"],
    dialog: [
      {
        speakerId: "the-critic",
        text: "Four mouth-looks. Eleven eye-looks. Ratio 1:2.75. A man who wanted you would be 1:1. Conclusion: he is being polite.",
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "The grading has produced a 'conclusion.' The conclusion is a fiction built on data that does not measure what you think it measures. The conversation, in the meantime, has gone on without you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "return-to-room",
        text: "Return to the room. What has he been saying for the last ninety seconds?",
        tactic: "The recovery move. Grading pulled you out of the room; the only way back is to drop the spreadsheet and start listening again.",
        nextSceneId: "body-calibrated",
        isOptimal: true,
      },
    ],
  },

  {
    id: "interview-cadence",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"Hernan Diaz, Trust. I will lend it to you if you like."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The question was fine. The cadence it lives inside is an interview — and he just offered you the book as a way to force a non-interview register. That was graceful.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "shift-to-disclosure",
        text: 'Shift register. "Actually — I used to pretend to have read Musil."',
        tactic: "Late but correct. The self-disclosure resets the cadence. Do it now before the interview pattern locks in.",
        nextSceneId: "disclosed-early",
        isOptimal: true,
      },
    ],
  },

  {
    id: "apologised-for-talking",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["rhys", "inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"No — finish it. What happened at the border?"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He corrected the interruption. He does not think you are monologuing. That was the critic's voice, not his. He has given you the door back.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "finish-the-story",
        text: "Pick the story back up. Finish it. Do not apologise for the pick-up.",
        tactic: "Do not explain the apology. Do not re-apologise. Simply continue, as if the interruption had not happened.",
        nextSceneId: "anecdote-finished",
        isOptimal: true,
      },
    ],
  },

  {
    id: "mask-during-date",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The rest of the date is, on the surface, fine. Underneath, the mask is working. You laugh at the right moments; you ask the right questions; you deliver the right anecdote. The match cannot land because it has nowhere soft to land on. He senses it. He does not say so.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "to-mask-ending",
        text: "The wine is done. The check arrives. Ninety minutes held.",
        tactic: "The date as form. The result of performing through an anxious pre-date is a performed hour-and-a-half.",
        nextSceneId: "ending-performed-through",
        isOptimal: false,
      },
    ],
  },

  {
    id: "probed-and-learned",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["rhys", "inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"The flight is real. I am also — honestly — a little thrown that you asked. I was not performing a reason. I think the date was great. I hope the next one is too."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He named it without weaponising it. That is a warm response. He has also, accurately, read the anxious pattern. The next date is still on, but the signal has been sent.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "own-the-probe",
        text: '"Fair. That was me reaching. I had a good time too. Yes to a second one."',
        tactic: "Own the probe. Do not spiral into a 20-minute explanation. The best apology for an anxious reach is a short sentence and a clean acceptance of the offer.",
        nextSceneId: "ending-probe-owned",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pre-emptively-declined",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["rhys", "inner-voice"],
    dialog: [
      {
        speakerId: "rhys",
        text: '"OK. Understood. I had a good time. Look after yourself."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "He did not chase. He did not ask. He took the no at its word — which is, incidentally, the behaviour of a secure man. The second date existed. You declined it because the first one was going well.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "walk-home",
        text: "Walk home. The critic won tonight.",
        tactic: "The scenario does not unwind the refusal. The lesson is on the walk home.",
        nextSceneId: "ending-pre-emptive-no",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-present-on-date",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Present On The Date",
    endingLearnPrompt:
      "The anxious pattern wants you to grade, interview, and pre-emptively refuse. The corrective is: notice your body, disclose before being asked, let the ninety minutes be ninety minutes. A warm man is detectable in real time — through your own nervous system, not his micro-expressions.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The date held. You did not grade. You did not interview. You disclosed without being asked. You accepted a second one without interrogating the reason a first one ended. The pattern the track is built to interrupt was, tonight, interrupted.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-analysed-afterwards",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Analysed Afterwards",
    endingLearnPrompt:
      "You were present on the date. You were anxious after. The after-action rumination is the quieter form of the same pattern — the post-date analysis as the place the grading moved to. The tool is the same: name the rumination, do not perform a conclusion, wait for the actual Saturday text.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The date was good. The debrief is scored. Noor will read the length of the message as the presence of the pattern. She will not name it tonight; she will name it at the coffee on Sunday.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-performed-through",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Mask Held",
    endingLearnPrompt:
      "The rumination before the date decided the temperature of the date itself. The performance stayed online for ninety minutes. The problem is not that he will not text — he might. The problem is that the version of you he met is not the version of you he will eventually know, and the handoff between the two is where the anxious-attached pattern breaks the relationship.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Ninety minutes of performance is exhausting. You come home empty. The date looked fine. The date was not the date.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-probe-owned",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Probe Owned",
    endingLearnPrompt:
      "You reached for the flight as a test. Reaching happens. The difference between an anxious reach that ends a date and an anxious reach that does not is the length of the apology for it. One sentence of ownership, a yes to the next one, and you move. The scenario models the recovery, not just the perfection.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You named the reach. You did not spiral into ten minutes of explanation. He read the ownership as warmth, not damage. The second date is on; the pattern has been, on this one, not gotten away with — but not let ruin anything either.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-pre-emptive-no",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Pre-emptive No",
    failureBlogSlug: "how-to-leave-without-being-villain",
    failureBlogTitle: "How To Leave Without Being The Villain",
    endingLearnPrompt:
      "The critic ran the close. A good first date was ended by the version of you that could not tolerate the possibility of a second one being worse. This is the specific defence move the anxious-attached pattern uses to never be disappointed — and it is the specific move the track is built to interrupt. The scenario does not unwind it; it names it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The walk home is long. The no was not yours. The no belonged to the critic. Tomorrow you will want to text him. Do not text him. The next scenario starts at 9:47 a.m. Saturday when you are about to.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const anx31: Scenario = {
  id: "anx-3-1",
  title: "The First Date",
  tagline: "Seven on Friday at a wine bar. Ninety minutes. One chance to not grade him into a stranger.",
  description:
    "Rhys walks in at 7:36. You are eight minutes early, settled with a glass of Nero d'Avola. The anxious-attached pattern wants to grade his micro-expressions and interview him into a spreadsheet. The track teaches the corrective in real time: notice your body, disclose before being asked, let the ninety minutes be ninety minutes.",
  tier: "premium",
  track: "anxiety",
  level: 3,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "intermediate",
  category: "self-regulation",
  xpReward: 380,
  badgeId: "present-on-the-date",
  startSceneId: "wine-bar-arrival",
  prerequisites: ["anx-1-3"],
  tacticsLearned: [
    "Use the pre-date window for regulation, not for Instagram",
    "Body-check before face-reading — your shoulders tell you more than his mouth does",
    "Self-disclose before being asked — it resets interview cadence into conversation",
    "Notice the critic mid-date; do not argue with it; complete the action it tried to interrupt",
    "Accept the structural reason for ending a date on time — it is the warm move, not a rejection",
  ],
  redFlagsTaught: [
    "Over-reassurance as anxious-attached tell: the length is inversely proportional to the security",
    "Interview cadence in minute eleven — the depth-question as an anxious reach for grading data",
    "The mouth-vs-eye ratio as the specific grading fiction; data that does not measure what you think",
    "The pre-emptive no to the second date as the critic's close",
  ],
  characters: [INNER_VOICE, THE_CRITIC, RHYS, NOOR],
  scenes,
};

export default anx31;
