/**
 * Mission 11-2 — "The Return"
 *
 * Level 11, order 2. Act 2 continuation — "The Weight".
 *
 * The twenty-second. Sunday. Dinner at the old house. You arrived
 * with Ren at 4 pm; your curfew is 7:30. The scenario is three hours
 * inside the house you left five years ago, with a mother who engineered
 * the invitation to deliver one specific ask. Most of the scenario is
 * the interior of watching for the ask to land.
 *
 * Canon hand-off: closes on whether the protagonist accepted, deflected,
 * or declined a power-of-attorney request — the artefact is a folder of
 * legal paperwork on the study desk. L12-1 opens on the consequence of
 * whichever answer was given.
 *
 * Voice: reference/KANIKA-VOICE.md. The mother is finally on-screen.
 * She does not perform the villain. She performs warmth. That is the
 * weapon.
 */

import type { Scenario, Scene } from "../types";
import {
  THE_MOTHER,
  GOLDEN_SIBLING,
  PRIYA,
  INNER_VOICE,
} from "../characters";

const scenes: Scene[] = [
  // ===================================================================
  // ACT 1 — the arrival
  // ===================================================================
  {
    id: "the-arrival",
    backgroundId: "suburban-house",
    mood: "tense",
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "Sunday, the twenty-second. 3:58 pm. Ren parks two houses down so the walk buys you twenty extra seconds. The driveway you are not parked in was the first boundary of the evening. You set it before you got out of the car.",
      },
      {
        speakerId: null,
        text: "The house is the same. The hedge is trimmed the same. The porch light is on in daylight, which is a thing she has always done when she is trying.",
      },
      {
        speakerId: "sibling",
        text: '"Seven-thirty. We are out of here at seven-thirty. I have a dinner at eight I am not going to. That is our out."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ren has built the exit for you. Note that they built it without being asked. Five years ago they would have framed your curfew as rudeness. Tonight they are the curfew's co-author.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You walk to the porch. Your hand is steady. Your hand being steady surprises you.",
      },
    ],
    choices: [
      {
        id: "ring-the-bell",
        text: "Ring the bell. Don't use the key you still have.",
        tactic: "Guest, not resident. The bell-press is the first sentence of the evening.",
        nextSceneId: "the-greeting",
        isOptimal: true,
      },
      {
        id: "let-ren-open",
        text: "Let Ren open the door. You stand a half-step behind.",
        tactic: "Let the middle sibling be the middle sibling — for one entrance. You are not hiding; you are letting Ren set the key.",
        nextSceneId: "ren-opens",
        isOptimal: true,
      },
      {
        id: "use-the-key",
        text: "Use the key. Walk in. You are not a guest in a house that was yours.",
        tactic: "Assertive but early. Using the key frames you as still-family, which is the frame she wants. Choose it on purpose or not at all.",
        nextSceneId: "used-the-key",
      },
      {
        id: "knock-twice",
        text: "Knock twice. Don't ring. Make her come to the door.",
        tactic: "Forces her to perform the greeting rather than orchestrate it. A small re-negotiation of who is hosting whom.",
        nextSceneId: "knock-greeting",
      },
    ],
  },

  // ===================================================================
  // ACT 1B — the greeting (convergence from arrival branches)
  // ===================================================================
  {
    id: "the-greeting",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Your mother opens the door. She is thinner than the last image you had of her, which was a photograph from a cousin's wedding two years ago. She is wearing a cardigan she bought in 2014 that you remember because you were there when she bought it.",
      },
      {
        speakerId: "mother",
        text: '"You came. Oh — you came."',
        emotion: "hopeful",
      },
      {
        speakerId: null,
        text: "She steps forward like she is going to hug you. She stops a half-second before contact and lets you choose.",
      },
      {
        speakerId: "inner-voice",
        text: "That half-second is the first expensive move of the evening. She is either genuinely uncertain — which would be new — or she is performing uncertainty to let you 'grant' the hug and own the warmth. Watch which version it is over the next twenty minutes. The body will tell you before the words do.",
        emotion: "concerned",
      },
    ],
    choices: [
      {
        id: "hug-briefly",
        text: "Hug her once. Briefly. The kind of hug you'd give an aunt.",
        tactic: "Social protocol without commitment. A hug is not a contract. Length matters more than occurrence.",
        nextSceneId: "the-living-room",
        isOptimal: true,
      },
      {
        id: "one-hand-on-shoulder",
        text: "Put one hand on her shoulder. Step past her into the hall.",
        tactic: "Contact acknowledged, intimacy not extended. A physical 'hello' that is not a reunion.",
        nextSceneId: "the-living-room",
        isOptimal: true,
      },
      {
        id: "do-not-hug",
        text: '"It\'s good to see you." Step inside. No contact.',
        tactic: "Clean. Verbal greeting, no physical entanglement. Some people in your position will feel the cost of refusing contact more than the cost of contact itself.",
        nextSceneId: "the-living-room",
      },
      {
        id: "full-hug",
        text: "Hug her properly. Two seconds longer than you meant to.",
        tactic: "Warm. Also a signal she will use for the next three hours as 'we are fine now'. Know that you are paying for that warmth with future leverage.",
        nextSceneId: "the-living-room-warm",
      },
    ],
  },

  // ===================================================================
  // ACT 1C — settling into the living room
  // ===================================================================
  {
    id: "the-living-room",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "The living room is the same. The clock is still running four minutes fast. The throw on the armchair is the one you chose in 2019 because she asked you to and then she hated it and kept it anyway.",
      },
      {
        speakerId: "mother",
        text: '"Sit. Sit. Ren, get her the green tea — she likes the green tea." Pause. "You still like the green tea, darling?"',
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "She is performing 'I remember what you like' and then performing 'but I want to check in case I got it wrong', which is a compound move. The two gestures together signal 'I have been thinking about you' without any cost of being wrong. Note the construction. It is the cleanest version of a compliment she has ever given you.",
        emotion: "knowing",
      },
      {
        speakerId: "sibling",
        text: '"She still likes green tea. I\'ll get it."',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Ren leaves the room. You are alone with her for the first time since 2021.",
      },
    ],
    choices: [
      {
        id: "small-talk-weather",
        text: '"The hedge looks good. Who does it now?"',
        tactic: "Safe opener. Give her something to talk about that is not about you, about her illness, or about the five-year gap.",
        nextSceneId: "small-talk-test",
        isOptimal: true,
      },
      {
        id: "ask-how-she-is",
        text: '"How are you, really?"',
        tactic: "Direct opener. Invites her health update. Be ready for it to be more engineered than informative.",
        nextSceneId: "the-illness-report",
      },
      {
        id: "wait-in-silence",
        text: "Say nothing. Let the silence sit. See what she fills it with.",
        tactic: "Diagnostic silence. What someone says into empty air tells you what they came to say.",
        nextSceneId: "the-silence-fills",
        isOptimal: true,
      },
      {
        id: "compliment-the-room",
        text: '"You\'ve kept the place beautiful."',
        tactic: "Warm but distancing — compliments the object, not the person. Low-commitment social lubrication.",
        nextSceneId: "small-talk-test",
      },
    ],
  },

  // ===================================================================
  // ACT 2 — the dinner (conversation phases)
  // ===================================================================
  {
    id: "small-talk-test",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Ren returns with the tea. Green, loose-leaf, in the cup with the chip in the handle that your mother has had since your wedding-she-didn't-attend.",
      },
      {
        speakerId: "mother",
        text: '"The hedge man retired. The new one is Polish, very thorough, rather expensive. Your brother arranged it. Your brother arranges everything now."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "'Your brother arranges everything now' is a set-up sentence. It is not a complaint and it is not a fact. It is a plot point she wants you to track, so that when she makes the ask later — 'could you help arrange this one thing' — it lands as relief rather than as request. Note the placement. You are meant to remember this sentence an hour from now.",
        emotion: "concerned",
      },
      {
        speakerId: "mother",
        text: '"How is the work? Ren said you were up for a promotion."',
        emotion: "hopeful",
      },
    ],
    choices: [
      {
        id: "neutral-answer",
        text: '"Work is good. Busy. The promotion came through."',
        tactic: "Factual, short, no detail. Give her data, not access.",
        nextSceneId: "the-praise-trap",
        isOptimal: true,
      },
      {
        id: "detailed-answer",
        text: "Tell her about the job. Team size, what you're building, the trajectory.",
        tactic: "Too much information. She will use the detail later — either to flatter you into a bigger ask or to reference something you disclosed as proof of closeness.",
        nextSceneId: "the-too-much-info",
      },
      {
        id: "deflect-to-her",
        text: '"It\'s going. Tell me about the follow-ups — Ren said heart?"',
        tactic: "Redirect to her health. Get the medical facts into the room now, when you can still calibrate them against what Ren told you.",
        nextSceneId: "the-illness-report",
        isOptimal: true,
      },
      {
        id: "deflect-to-ren",
        text: '"Ask Ren — they know more than I tell most people."',
        tactic: "Sends the question to the person who knows what you'd consent to sharing. Ren will answer in a frame that protects you.",
        nextSceneId: "ren-answers-for-you",
      },
    ],
  },

  {
    id: "the-silence-fills",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "You let the silence sit. Three seconds. Five. Your mother looks at her hands.",
      },
      {
        speakerId: "mother",
        text: '"I don\'t know how to do this, darling. I\'ve been rehearsing three different versions of tonight in my head for a month and none of them are what\'s happening."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Meta-honesty in the first fifteen minutes is a sophisticated tactic. It says 'I am not performing' which is itself a performance. It may also be real. The only way to tell is whether it is followed, twenty minutes from now, by a request. If there is no request, the meta-honesty was real. If there is one, the meta-honesty was the warm-up.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "the-illness-report",
  },

  {
    id: "the-illness-report",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"The heart. I had some trouble last October. I have a cardiologist now. He is reassuring on balance. I take two tablets in the morning. I walk every day."',
        emotion: "serious",
      },
      {
        speakerId: "mother",
        text: '"It is not the thing I wrote as if it were. I wrote the letter at a moment and it came out more dramatic than the facts. I am sorry about that. I was not lying, I was performing the feeling, which is not the same as the facts."',
        emotion: "pleading",
      },
      {
        speakerId: "sibling",
        text: '"She told me she was going to correct the letter. I told her to correct it tonight in person. That was me."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "An actual partial admission. Small but real. She downgraded her own letter in your presence. That is a move she did not make in any of the five years before this evening. Note it. It does not erase the letter's original engineering — but it is a data point.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "acknowledge-the-correction",
        text: '"I appreciate you saying that. Thank you."',
        tactic: "Reward the honest move with a short, warm, bounded acknowledgement. Do not make it bigger than it was.",
        nextSceneId: "dinner-table",
        isOptimal: true,
      },
      {
        id: "press-for-detail",
        text: '"Which two tablets? Which cardiologist?"',
        tactic: "Verify specifics. She gave you a framework; names and dosages are the stress-test.",
        nextSceneId: "details-offered",
        isOptimal: true,
      },
      {
        id: "stay-neutral",
        text: '"Alright."',
        tactic: "One-word acknowledgement. You heard it; you are not giving it weight yet.",
        nextSceneId: "dinner-table",
      },
      {
        id: "call-out-letter",
        text: '"The letter read as terminal. Which was the point. Was it not?"',
        tactic: "Direct confrontation. Some relationships need the sentence said out loud; others detonate at it. Know which yours is.",
        nextSceneId: "the-detonation-avoided",
      },
    ],
  },

  {
    id: "details-offered",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Dr. Agarwal at St. Barnabas. Bisoprolol and a statin. The statin was new in January. He wants to see me in six weeks. I can show you the letter."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Specific names, specific drugs, specific hospital. This is the version of 'ill' that Priya said would be there if the letter had been factual. She has now shown you she can produce the factual version. Which raises the question: why didn't she write it that way?",
        emotion: "knowing",
      },
    ],
    nextSceneId: "dinner-table",
  },

  {
    id: "the-detonation-avoided",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"You are right. The letter read dramatic because I wrote it dramatic. I wanted you to come. I do not have thirty years to write letters in. I gave myself permission to exaggerate. I should not have."',
        emotion: "sad",
      },
      {
        speakerId: "sibling",
        text: '"Mum."',
        emotion: "concerned",
      },
      {
        speakerId: "mother",
        text: '"It is fair. I am not going to defend a letter I wrote at ten at night with a glass of wine."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "She took the punch without flinching. That is new. Five years ago she would have mobilised self-pity or flipped it into your cruelty. Tonight she sat in the truth for four seconds. Four seconds is a lifetime for this woman.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "dinner-table",
  },

  {
    id: "dinner-table",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "5:42 pm. Dinner on the table. Roast chicken, potatoes, the green beans she does with almonds. She cooked for three. There is no extra chair, no hint she expected more people. She cooked for three and set for three.",
      },
      {
        speakerId: "inner-voice",
        text: "A meal sized to its guests, not to its intent. Another data point on the 'not engineered' side of the ledger. The evening is looking more complicated than you were prepared for. Good. Complication is honest.",
        emotion: "knowing",
      },
      {
        speakerId: "mother",
        text: '"I\'m going to ask one thing across the whole meal and then I\'m going to let us eat. Is that alright?"',
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "allow-the-question",
        text: '"One question. Go."',
        tactic: "Bounded permission. You are giving her the one, which means anything beyond it is noted and declined.",
        nextSceneId: "the-one-question",
        isOptimal: true,
      },
      {
        id: "set-condition",
        text: '"One question. And I can decline to answer it. Those are the terms."',
        tactic: "Terms-first. Makes explicit that consent to be asked is not consent to answer. Useful with someone who has historically blurred that line.",
        nextSceneId: "the-one-question",
        isOptimal: true,
      },
      {
        id: "deflect-to-after-meal",
        text: '"Ask it after dessert. Let\'s eat first."',
        tactic: "Delay the ask until you have more data. Watch how she behaves at the table before she's had her turn.",
        nextSceneId: "the-meal-watched",
      },
    ],
  },

  {
    id: "the-one-question",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: "mother",
        text: '"Are you open to the idea of being the person who handles things if I can\'t. Not now. The paperwork for later. I am going to ask Ren either way but I want to know whether you are open to also being named."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "There it is. Power of attorney — or something close enough to it. The letter was the invitation. The dinner is the ask. You now have the shape of the entire operation. It was never about reconciliation. It was about legal nomination of the daughter with the head for it. The illness was the runway. The warmth was the lubricant. The question was the payload.",
        emotion: "concerned",
      },
      {
        speakerId: "mother",
        text: '"Ren said I should ask you tonight and let you take as long as you want to answer. I am asking it now. I am not asking for an answer at this table."',
        emotion: "pleading",
      },
      {
        speakerId: "sibling",
        text: '"I told her to frame it that way. The ask is real. The no-pressure-for-an-answer part is also real. I vouched for that."',
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "firm-no",
        text: '"No. I am not open. Ren is the right person and the only person. I appreciate you asking."',
        tactic: "Sovereign no. Delivered warm, closed, final. No re-negotiation lane.",
        nextSceneId: "the-no-response",
        isOptimal: true,
      },
      {
        id: "offer-alternative",
        text: '"No — but I will help you find a solicitor who specialises in this. A professional, not a daughter."',
        tactic: "No with a door. Declines the role, opens a better one. Useful if the ask is real and the answer is still no.",
        nextSceneId: "the-alternative-offered",
        isOptimal: true,
      },
      {
        id: "take-time",
        text: '"I will think about it. I will have an answer by the end of the month."',
        tactic: "Deferral. Dangerous. Some deferrals are genuine thought and some are cowardice with a calendar on it. Know which this one is before you say it.",
        nextSceneId: "the-deferral-taken",
      },
      {
        id: "agree-conditionally",
        text: '"Yes — if it is tightly scoped. Medical only, not financial."',
        tactic: "Conditional yes. Opens the door you were about to close. Your mother is extremely good at widening scope after a conditional acceptance.",
        nextSceneId: "the-conditional-yes",
      },
    ],
  },

  // ===================================================================
  // ACT 3 — response branches
  // ===================================================================
  {
    id: "the-no-response",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "She nods. Not a disappointed nod. An acknowledging nod. She has clearly rehearsed for this answer.",
      },
      {
        speakerId: "mother",
        text: '"Alright. Thank you for coming to say it in person. Ren — you\'re it then. I\'ll call the solicitor Monday."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: '"Fine. Monday."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The ask landed, the no landed, the table did not break. This is the rarest version of this scene. Either she rehearsed for it in advance because Ren coached her, or she has changed. Most likely both. The question of whether she has changed is not answered tonight; it is answered by what happens in the next ninety days.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "after-the-ask",
  },

  {
    id: "the-alternative-offered",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"A solicitor. Yes. That is — more sensible actually. Ren and I will use one. I would not have thought of it framed that way. Thank you."',
        emotion: "serious",
      },
      {
        speakerId: "sibling",
        text: '"That is the right answer, by the way. I would rather do it with a professional than alone."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You just up-graded the plan by refusing the role. This is the version of a no that moves the whole situation forward. Save this sentence shape — 'no, but let me point at the better version' — it works in boardrooms and kitchens.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "after-the-ask",
  },

  {
    id: "the-deferral-taken",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"End of the month. Alright."',
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "She heard 'yes with a delay'. She did not hear 'maybe'. That is the cost of deferrals to people who are good at seeing deferrals as almost-yeses. You have three weeks before the follow-up question arrives and you are going to have to answer it anyway. Use those three weeks to make the decision, not to postpone making it.",
        emotion: "concerned",
      },
      {
        speakerId: "sibling",
        text: '"I\'ll check in with you on the fifteenth."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "after-the-ask",
  },

  {
    id: "the-conditional-yes",
    backgroundId: "suburban-house",
    mood: "danger",
    presentCharacterIds: ["mother", "sibling"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: "mother",
        text: '"Medical only. Yes. Of course. We can narrow it. We will look at the forms together. There\'s a folder in the study — I\'ll show you after dinner."',
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "Watch that sentence. 'We will look at the forms together.' 'There\\'s a folder.' You agreed to a concept and she is now producing a document. The scope widening has already started — not in malice, in momentum. This is how scope widens on a conditional yes. Most of the damage is done in the twenty minutes after the yes, not at the yes itself.",
        emotion: "concerned",
      },
      {
        speakerId: "sibling",
        text: '"Hey — look at the folder with me present. Not alone. That is a thing I need to be in the room for."',
        emotion: "serious",
      },
    ],
    nextSceneId: "the-study-folder",
  },

  // ===================================================================
  // ACT 4 — after the ask / the study
  // ===================================================================
  {
    id: "after-the-ask",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "6:15 pm. The rest of the dinner is almost normal. She asks about your apartment. You tell her two true, surface-level things. She tells you about a book she is reading. Ren talks about their dog.",
      },
      {
        speakerId: "inner-voice",
        text: "The post-ask conversation is the most reliable data of the evening. If she stayed polite and bounded after you refused, the ask was real and discrete. If she became cold, lectured, or started fishing for other asks, the ask was the operation and the rest of the evening is fall-out. Which version are you in?",
        emotion: "knowing",
      },
      {
        speakerId: "mother",
        text: '"Would you like to see the garden? I redid the far bed. It is ugly but I am proud of it."',
        emotion: "hopeful",
      },
    ],
    choices: [
      {
        id: "see-the-garden",
        text: '"Show me the garden."',
        tactic: "Accept a low-stakes shared activity. You have done the hard work of the evening; a garden is not a further commitment.",
        nextSceneId: "the-garden",
        isOptimal: true,
      },
      {
        id: "decline-politely",
        text: '"Next time. I should head off shortly — Ren has a seven-thirty."',
        tactic: "Clean early exit. You landed the ask, you held the no, you do not have to also accept the garden tour.",
        nextSceneId: "the-departure",
        isOptimal: true,
      },
      {
        id: "bring-ren",
        text: '"Yes — if Ren comes."',
        tactic: "Don\'t be solo with her in a soft moment. The solo garden walk is the kind of frame where another ask shows up as a spontaneous addition.",
        nextSceneId: "the-garden",
        isOptimal: true,
      },
    ],
  },

  {
    id: "the-garden",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "The far bed is in fact ugly. It is also clearly three months of real work. She talks about soil and dahlias. She does not try to ask you anything.",
      },
      {
        speakerId: "inner-voice",
        text: "Twenty minutes in the garden with no second ask. The ask was the ask. The dinner was, mostly, the dinner. This is not reconciliation — it is a minimum-viable adult transaction with the woman who raised you. That is a more useful outcome than reconciliation would have been.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-departure",
  },

  {
    id: "the-study-folder",
    backgroundId: "suburban-house",
    mood: "danger",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "The study. Her desk is tidier than you remember. A thin manila folder sits on the blotter. She opens it for you. Ren is in the doorway, which is what you agreed.",
      },
      {
        speakerId: null,
        text: "The first document is exactly what she said — a medical power of attorney form. The second document is a continuing power of attorney for property. The third is a simple will with a blank in the executor line.",
      },
      {
        speakerId: "inner-voice",
        text: "Three documents. One was agreed. Two were not. The scope widening is now visible as paper. This is the moment. You either re-assert the scope or you let the paper drag you forward. The paper is very good at dragging. Don\\'t let the paper drag you.",
        emotion: "concerned",
      },
      {
        speakerId: "sibling",
        text: '"The other two are off the table tonight. Medical only. That is what was agreed."',
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "back-ren-up",
        text: '"Ren is right. Medical only. The other two we are not discussing tonight."',
        tactic: "Reassert scope immediately in front of the document. Hold the line Ren just drew.",
        nextSceneId: "scope-held",
        isOptimal: true,
      },
      {
        id: "pull-out-entirely",
        text: '"Actually — I am out. All three. Solicitor. I am not doing this tonight."',
        tactic: "Total retreat. You saw the widening and you are responding to it by closing the whole channel. Harsh but clean.",
        nextSceneId: "scope-retreated",
        isOptimal: true,
      },
      {
        id: "read-all-three",
        text: '"Let me read all three. I\'ll decide at the end."',
        tactic: "You are in the room with the paper, letting her explain each one. This is how scope widens. Most people in your position sign something in this version.",
        nextSceneId: "scope-widened",
      },
    ],
  },

  {
    id: "scope-held",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"Alright. Medical only. The others — I will take them off the desk."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "She closes the folder. She puts the two extra documents into a drawer. You watch her do it.",
      },
      {
        speakerId: "inner-voice",
        text: "Scope held. The paper is in the drawer. Sign nothing tonight anyway. Take the medical form to your solicitor this week, have them redraft it, then sign a version your solicitor wrote and she accepted. The difference between that and signing what she drafted is the whole difference.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-departure",
  },

  {
    id: "scope-retreated",
    backgroundId: "suburban-house",
    mood: "cold",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"I misread what tonight was. I am sorry."',
        emotion: "sad",
      },
      {
        speakerId: "sibling",
        text: '"This was the right call. I would have pulled you out myself in another two minutes."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Total retreat is not a failure — it is a correction of a decision you made under warmer conditions. You can always sign a medical form in six weeks from a solicitor\\'s office. You cannot always un-sign one you signed at a kitchen desk.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-departure",
  },

  {
    id: "scope-widened",
    backgroundId: "suburban-house",
    mood: "danger",
    presentCharacterIds: ["mother", "sibling"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: null,
        text: "She walks you through each form. The explanations are calm, reasonable, well-rehearsed. You notice, twenty minutes in, that you have a pen in your hand and you are not sure when she gave it to you.",
      },
      {
        speakerId: "inner-voice",
        text: "The pen is the tell. It appeared in your hand during a reasonable-sounding explanation and you did not feel it arrive. This is not a dramatic moment. This is the entire mechanism of how scope widens — calmly, reasonably, with a pen you did not feel yourself accept. Put the pen down. Walk out of the study. Re-do the conversation with a solicitor next week or not at all.",
        emotion: "concerned",
      },
      {
        speakerId: "sibling",
        text: '"Put the pen down. We are going."',
        emotion: "serious",
      },
    ],
    nextSceneId: "the-departure-hard",
  },

  // ===================================================================
  // ACT 5 — departure
  // ===================================================================
  {
    id: "the-departure",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "7:26 pm. Ren is at the door. You are putting your coat on. The curfew is landing on time.",
      },
      {
        speakerId: "mother",
        text: '"Thank you for coming. I mean that. I will not assume anything about what this evening was or wasn\'t. I am glad of it either way."',
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "warm-goodbye",
        text: '"I\'m glad I came. Take care of yourself."',
        tactic: "Warm close without commitment to a sequel. 'Take care of yourself' is a proper sentence that does not book the next dinner.",
        nextSceneId: "ending-sovereign-no",
        isOptimal: true,
      },
      {
        id: "bounded-goodbye",
        text: '"Ren will be in touch about the form."',
        tactic: "Transactional close. Names the next concrete action. Does not offer warmth that would be disingenuous.",
        nextSceneId: "ending-sovereign-no",
        isOptimal: true,
      },
      {
        id: "neutral-nod",
        text: "A nod. No sentence. Out the door.",
        tactic: "Minimum viable exit. Valid when you do not have a warm sentence that is honest.",
        nextSceneId: "ending-clean-cold",
      },
    ],
  },

  {
    id: "the-departure-hard",
    backgroundId: "suburban-house",
    mood: "cold",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "You and Ren leave together, fast. Ren drives the first block before either of you speaks. The pen is, as far as you know, still on the study desk. You did not sign anything.",
      },
      {
        speakerId: "sibling",
        text: '"That was not what I agreed to. I am going to speak to her tomorrow. Not tonight. Tomorrow. I am sorry."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You did not sign. That is the single fact that matters out of the last three hours. You can rebuild from a scare. You cannot easily rebuild from a signed power of attorney you did not want to grant.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-scared-clean",
  },

  {
    id: "ren-opens",
    backgroundId: "suburban-house",
    mood: "tense",
    presentCharacterIds: ["sibling"],
    dialog: [
      {
        speakerId: null,
        text: "Ren rings the bell. You stand behind them on the porch, a half-step back. The door opens on the first peal.",
      },
      {
        speakerId: "sibling",
        text: '"Mum. Hi."',
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-greeting",
  },

  {
    id: "used-the-key",
    backgroundId: "suburban-house",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You use the key. You walk into the hall you knew as a child. Your mother is already in the corridor — she heard the lock and came to meet you.",
      },
      {
        speakerId: "inner-voice",
        text: "You chose the key. You are now framed as family. Every conversation for the next three hours will reference that framing, whether or not either of you names it. You have not done anything wrong; you have chosen a warmer gear. Know that you chose it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-greeting",
  },

  {
    id: "knock-greeting",
    backgroundId: "suburban-house",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "You knock twice. Firm. Your mother does not come to the door immediately — she finishes whatever she was doing and then walks. The door opens about fifteen seconds after you knocked.",
      },
      {
        speakerId: "inner-voice",
        text: "Those fifteen seconds were hers and she took them. That is fine. You set a frame; she adjusted; neither of you performed. This is what adult-to-adult looks like across a doorway.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-greeting",
  },

  {
    id: "the-living-room-warm",
    backgroundId: "suburban-house",
    mood: "romantic",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "You hug her properly. Two seconds longer than you meant to. Her shoulders drop into yours. Something in you that you did not know was holding lets go a centimetre.",
      },
      {
        speakerId: "inner-voice",
        text: "That hug is a real thing. It is also a receipt she will reference later as 'when you came back to me'. Both are true. The work of the evening is to receive what was real in it without accepting the framing she will put on it afterwards.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "the-living-room",
  },

  {
    id: "the-praise-trap",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "mother",
        text: '"A promotion. Oh. You always were the one with the head for that sort of thing. You always were the responsible one. Ren knows I say this."',
        emotion: "hopeful",
      },
      {
        speakerId: "sibling",
        text: '"She says it. It is annoying. Carry on."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "'The responsible one' is a setup sentence. It is being planted now so that later, when the ask arrives, it arrives into soil that has been prepared. The pattern is: compliment the trait, request deployment of the trait, framed as continuous with the compliment. Watch for it forty minutes from now.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "dinner-table",
  },

  {
    id: "the-too-much-info",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother"],
    dialog: [
      {
        speakerId: null,
        text: "You tell her about the team, the restructure, the person above you who is leaving, the budget you are about to own. You speak for nearly four minutes before you catch yourself.",
      },
      {
        speakerId: "inner-voice",
        text: "She does not need to know any of that. You gave her the access because the room felt safer than you expected — which is exactly the room someone like this engineers. Going forward tonight: facts only, no strategy, no internal politics. You already over-shared; the fix is not to over-share the fix.",
        emotion: "concerned",
      },
    ],
    nextSceneId: "dinner-table",
  },

  {
    id: "ren-answers-for-you",
    backgroundId: "suburban-house",
    mood: "peaceful",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: "sibling",
        text: '"She got the promotion. It is a good company. She is good at it. That is all the detail we are sharing."',
        emotion: "knowing",
      },
      {
        speakerId: "mother",
        text: '"Alright. I won\'t press."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Ren answered in a sentence designed to close the topic. You will buy Ren a really good bottle of wine next time you see them alone. Not as gratitude — as recognition of a skill you did not realise Ren had developed.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "dinner-table",
  },

  {
    id: "the-meal-watched",
    backgroundId: "suburban-house",
    mood: "mysterious",
    presentCharacterIds: ["mother", "sibling"],
    dialog: [
      {
        speakerId: null,
        text: "You eat. She does not ask the question. She talks about the potatoes; she asks Ren about work; she offers you seconds; she does not, once, try to pivot to the reason she wrote.",
      },
      {
        speakerId: "inner-voice",
        text: "This is restraint. Real restraint. Somebody — probably Ren — taught her, or she taught herself, that pushing the ask into the meal would blow the ask entirely. She is pacing herself. Which means there is an ask. It is sitting behind the plates, waiting for dessert.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-one-question",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-sovereign-no",
    backgroundId: "suburban-house",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Sovereign No",
    endingSummary:
      "You went. You stayed for the agreed three and a half hours. You heard the ask — medical power of attorney — and you declined it cleanly, either outright or by redirecting her to a solicitor. You did not sign paper you did not want to sign. You left at 7:30 on the curfew you named. Ren walked you to the car. Priya called before you hit the motorway; you debriefed the evening in twenty minutes and then you listened to music. The envelope sits on your counter at home; tonight you put it in a drawer. The next move is not tonight. The next move is the call you make to your own solicitor on Wednesday about how to document the refusal so it is not re-litigated by surprise in six months.",
    endingLearnReference: "sovereign-no-without-performance",
    endingLearnPrompt:
      "A sovereign no is warm, bounded, and does not invite a re-negotiation lane. It also does not need to be re-litigated — document it in writing this week so the next letter can be answered in two sentences.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You went into the house you left five years ago and came out the same person who went in. That is the rare ending. Not 'reconciled'. Not 'destroyed'. The same. You will understand what a victory that is in about a week.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-clean-cold",
    backgroundId: "suburban-house",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Clean Cold Exit",
    endingSummary:
      "You declined the ask, you left at 7:30, you did not hug her at the door, you did not say a warm sentence on the way out. You nodded and you went. The exit is clean. It is also colder than the evening called for — she had, by the standards of your history with her, behaved well. A warmer close would not have committed you to anything; the nod did not save you from anything. Over the next month you may find yourself rewriting the nod into a sentence; if you do, send the sentence in a card. One card. Not the beginning of a correspondence.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Cold is sometimes the right temperature. Sometimes it is a temperature you defaulted to because you did not know what else to do. Only you know which tonight was.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-scared-clean",
    backgroundId: "suburban-house",
    mood: "tense",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Pen Put Down",
    endingSummary:
      "She showed you three documents when you had agreed to one. The scope widened the way scope always widens with her — calmly, in paragraphs that each sounded reasonable, with a pen you did not feel yourself accept. Ren pulled you out. You did not sign. You left the house fast and the drive home was quiet. Nothing was signed. That is the single sentence that matters. You will, correctly, be rattled for three days. You will, correctly, be angry at yourself for getting as close as you did. Use the anger to write down exactly what happened — in a text to Priya, in a note to your solicitor — so the next time somebody calm and reasonable puts a pen in your hand, the body will know before the mind does.",
    endingLearnReference: "scope-widens-with-reasonable-paragraphs",
    endingLearnPrompt:
      "Scope does not widen with shouting. It widens with reasonable paragraphs and a pen you did not feel arrive. The diagnostic is the pen, not the paragraphs.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You got close. Close is not signed. Close, documented, is a training set — the next time it happens you will recognise the pen by its weight.",
        emotion: "knowing",
      },
    ],
    failureBlogSlug: "how-scope-widens",
    failureBlogTitle: "How Scope Widens In Reasonable Paragraphs",
  },
];

export const mission112: Scenario = {
  id: "mission-11-2",
  title: "The Return",
  tagline: "Sunday. 4 pm. The old house. Three hours on a curfew you wrote yourself.",
  description:
    "The dinner the letter was asking for. Three hours inside the house you left five years ago, with your mother on-screen for the first time, with Ren as witness, on a 7:30 curfew. The evening has one ask hidden inside it. The scenario is whether you land the no without breaking the table — or whether the paper on the study desk pulls you across a line you did not mean to cross.",
  tier: "vip",
  level: 11,
  order: 2,
  estimatedMinutes: 18,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 1300,
  badgeId: "sovereign-no",
  startSceneId: "the-arrival",
  prerequisites: ["mission-11-1"],
  tacticsLearned: [
    "Sovereign no — warm, bounded, closed, no re-negotiation lane",
    "Redirect the ask to a professional when the role is wrong but the need is real",
    "Scope-widening detection (three documents when you agreed to one)",
    "The pen diagnostic — noticing tools you did not feel yourself accept",
    "Using a named curfew and a named witness to bound a high-risk re-entry",
  ],
  redFlagsTaught: [
    "Compliments planted early to soil the later ask",
    "Meta-honesty as warm-up for a request",
    "Conditional yes → scope widens in the next twenty minutes, not at the yes",
    "Reasonable paragraphs as the mechanism of scope widening",
    "A pen arriving in your hand during a calm explanation",
  ],
  reward: {
    id: "sovereign-no",
    name: "The Sovereign No",
    description: "Entered the house. Heard the ask. Left on the curfew. Signed nothing you did not mean to sign.",
    unlocksScenarioId: "mission-12-1",
  },
  characters: [THE_MOTHER, GOLDEN_SIBLING, PRIYA, INNER_VOICE],
  scenes,
};

export default mission112;
