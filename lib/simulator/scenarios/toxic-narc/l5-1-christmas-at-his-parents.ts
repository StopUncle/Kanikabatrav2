/**
 * tn-5-1 — "Christmas At His Parents"
 *
 * Toxic-Narc track, Level 5 (The Narc In-Law), order 1. Four years
 * of Christmases at your partner's mother's house. You have learned
 * to read her register. Your partner has largely not — she performs
 * differently when he is in the room. The public passive-aggressive
 * comment, framed as 'just making conversation,' is her specific
 * move, and the scenario takes place around one of them: Christmas
 * Day dinner, seven people at the table, 3:47 p.m., just after the
 * first glass of champagne.
 *
 * The scenario's core technique is 'becoming boring' — producing a
 * response so unperformed that she has nothing to play with.
 * Neither warm nor cold, neither defensive nor explanatory. The
 * move is three words at most, delivered flat, and then a pivot
 * to another subject at the table. Grey rock at a family register.
 *
 * Teaches:
 *  - The 'become boring' response as a specific skill, distinct
 *    from coldness and distinct from warm appeasement
 *  - The refusal to triangulate through the partner at the table
 *    — do not turn to him for defence, do not ask him later in the
 *    kitchen to have the conversation with her, do not convert
 *    public bait into private operational work
 *  - The refusal to explain — every explanation is new material
 *  - The pivot-to-other-subject as the closing move — you do not
 *    sit in the silence her line produced; you change the subject
 *    cleanly, at the same table, to someone else
 *
 * Voice: reference/KANIKA-VOICE.md and reference/TRACK-toxic-narc.md.
 */

import type { Scenario, Scene } from "../../types";
import { INNER_VOICE, THE_PARTNER, MOTHER_IN_LAW } from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // OPENING — THE DINNER TABLE
  // ===================================================================
  {
    id: "christmas-dinner",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Christmas Day, 3:47 p.m. His mother's dining room. The long walnut table, the good plates, seven people around it. You are seated between your partner and his cousin's husband. The first glass of champagne has been poured. A plate of smoked salmon is moving clockwise.",
      },
      {
        speakerId: "mother-in-law",
        text: '"Tell me, how is the — the content thing going? The online project? I was describing it to Patricia at church and I realised I do not fully understand what it is you — do."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The 'content thing.' The 'online project.' The trailing 'do.' Three specific condescensions, delivered in the warmest possible register, at a table where the other five people will interpret them as the hostess making friendly conversation. This is the move. She has been building toward this since the champagne was opened.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "become-boring",
        text: '"It is going well, thank you."',
        tactic: "The grey-rock Christmas response. Six words. No content for her to play with, no warmth for her to extract, no coldness to frame as rudeness. Pair with a pivot — but let the first line land on its own.",
        nextSceneId: "pivot-window",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "defend-the-work",
        text: 'Explain. "Actually it is quite specific — I write about interpersonal dynamics, particularly around —"',
        tactic: "Every word of the explanation is new material. She will pick the line that sounds most absurd out of context and cite it at Patricia-at-church in January. The explanation is the move she is fishing for.",
        nextSceneId: "defended-at-table",
        isOptimal: false,
      },
      {
        id: "match-her-register",
        text: '"Oh you know — the content thing."',
        tactic: "Matching the belittlement with self-deprecation lands as meta-cleverness, which inside this family register will be heard as sharpness. Cost: the cousin-in-law will laugh, his mother will file it, your partner will not notice. Not terrible, but more expensive than the clean six words.",
        nextSceneId: "register-matched",
        isOptimal: false,
      },
      {
        id: "turn-to-partner",
        text: 'Turn to your partner. "Help me out — how would you describe what I do?"',
        tactic: "The triangulation shape — passing the question to him at the table is the specific move that converts a public bait into a joint operation he did not ask for. The correction is: do not route through him at the table, ever. You have a private channel for later if you need it.",
        nextSceneId: "triangulated-at-table",
        isOptimal: false,
        event: "tactic-named:triangulation",
      },
    ],
  },

  // ===================================================================
  // PIVOT WINDOW — THE SECOND MOVE
  // ===================================================================
  {
    id: "pivot-window",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The six words sit at the table. She nods. She will not ask a follow-up immediately — the follow-up is the second move, and it depends on whether you left her an opening. You have ~four seconds before the silence becomes too long to pivot from naturally.",
      },
      {
        speakerId: "inner-voice",
        text: "The pivot has to be to someone else, not a topic. A topic leaves her on the thread. A person moves the conversation to a new thread.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "pivot-to-cousin",
        text: 'Turn to the cousin-in-law. "Lucas — you were in Porto last month, tell me about the food."',
        tactic: "The clean pivot. A specific person, a specific prompt, a subject that moves. Within three seconds Lucas will be talking about tapas and the table will be somewhere else. The six words plus the pivot is the whole move.",
        nextSceneId: "pivot-clean",
        isOptimal: true,
        event: "optimal-with-grace",
      },
      {
        id: "pivot-to-topic",
        text: 'Pivot to a topic. "Has anyone watched the new thing about the — what was it called, the thing with Colin Firth?"',
        tactic: "A topic pivot leaves her room to re-enter. She will come back with a follow-up about the content thing once the Colin Firth beat lands, and the pivot has not done its job. Prefer a pivot to a specific person.",
        nextSceneId: "pivot-soft",
        isOptimal: false,
      },
      {
        id: "sit-in-silence",
        text: "Sit in the silence. Let her pivot herself.",
        tactic: "The sit-in-silence is legitimate but expensive — she controls the table, and the silence will be loaded with her next move. Prefer to drive the pivot.",
        nextSceneId: "silence-held",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // PIVOT CLEAN — THE SECOND HALF
  // ===================================================================
  {
    id: "pivot-clean",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Lucas lights up. He was in Porto for a week; he has been waiting to tell someone about the place they ate on the last night. He talks for six minutes. The table moves with him. The smoked salmon finishes its circuit. The first attempt is, operationally, over.",
      },
      {
        speakerId: "inner-voice",
        text: "She will try again — this is four years of Christmas — but the second attempt will be smaller because the first was neutralised cleanly. The move for the rest of the afternoon is the same move, repeated. Boring. Pivot. Boring. Pivot.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-the-afternoon",
        text: "Hold the afternoon at the same register. Six words, pivot, repeat. Until 7 p.m. when you leave.",
        tactic: "The whole scenario was one dinner table. The discipline applies at scale: for every bait, six words + pivot, every time.",
        nextSceneId: "afternoon-held",
        isOptimal: true,
      },
    ],
  },

  {
    id: "afternoon-held",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "7:14 p.m. You and your partner are in the car, driving home. He is quiet for a few minutes. Then:",
      },
      {
        speakerId: "the-partner",
        text: '"You did the thing with my mother today. The — the boring thing. I noticed."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "He noticed. The four-year learning curve is, quietly, shifting. He has named the move without being asked. Do not escalate this into a debrief of every line she delivered — just receive the observation.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "receive-simply",
        text: '"Thank you for noticing."',
        tactic: "Receive the observation without building a post-Christmas operational debrief. He named it; that is the work. The debrief can happen on another day if he initiates it.",
        nextSceneId: "ending-become-boring",
        isOptimal: true,
      },
      {
        id: "full-debrief",
        text: 'Run the full debrief. "Yes — she did three specific moves, the worst one was —"',
        tactic: "The post-event operational debrief, uninvited, converts his first moment of independent noticing into a Christmas-management workstream he did not ask to open. He will help if asked; do not ask today.",
        nextSceneId: "ending-debriefed",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // FAILURE BRANCHES
  // ===================================================================
  {
    id: "defended-at-table",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: "mother-in-law",
        text: '"Interpersonal dynamics! Goodness. And people — pay for that?"',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "She has pulled a second line from the first. The explanation was the hook. Every sentence of response from here extends the exchange. The damage-control move is to stop producing content — even now.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stop-producing-late",
        text: '"They do."',
        tactic: "Two words. End of thread. Not a recovery of the optimal path, but a containment of the damage.",
        nextSceneId: "pivot-window",
        isOptimal: true,
        event: "restraint-shown",
      },
      {
        id: "explain-further",
        text: 'Explain the business model. "Well, there are coaching packages, and the book revenue, and —"',
        tactic: "Compound explanation. Every noun she hears is a future condescension she can cite to Patricia. Stop.",
        nextSceneId: "ending-extraction-complete",
        isOptimal: false,
      },
    ],
  },

  {
    id: "register-matched",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Lucas laughs. His mother's eyes flick to you for a half-second. She smiles.",
      },
      {
        speakerId: "mother-in-law",
        text: '"Well, we do our best to keep up, don\'t we."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She absorbed the self-deprecation and returned the punch wrapped in plural. The room reads her sentence as warm grandmother-speak. You read it as the follow-up. The meta-cleverness cost you nothing at the table, and one piece of calibration she will use in March.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "return-to-boring",
        text: "Return to boring now. Turn to Lucas with the Porto question. Do not match her again today.",
        tactic: "Recovery. The meta line happened; the meta game does not need to be played twice. Boring is still the shape.",
        nextSceneId: "pivot-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "triangulated-at-table",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["the-partner", "mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Oh — um, she writes about — you know, about relationships and stuff, it is — it is quite — she is quite good at it."',
        emotion: "confused",
      },
      {
        speakerId: "mother-in-law",
        text: '"That is lovely, darling. No one doubts she is good at it."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The triangulation landed. He stumbled (he is not a public speaker; he did not know the question was coming); she collected the moment for what it was — a small demonstration that he cannot cleanly describe your work under pressure. Both of you have been sized down at her table.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "recover-with-pivot",
        text: "Pivot immediately. 'Lucas — Porto. Tell me about the food.' Move the table.",
        tactic: "Salvage. The triangulation cannot be un-done; the next move is to stop the damage by moving the subject off him.",
        nextSceneId: "pivot-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pivot-soft",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: "mother-in-law",
        text: '"Oh I saw that! Lovely. Now — back to the online thing — does it, does it pay the rent, or is it more of a —"',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The topic-pivot left her a door to come back through. She is now on the money question, which is the exact line you were trying to steer her off. Pivot to a person this time.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "person-pivot-late",
        text: '"It pays the rent. Lucas — Porto. Tell me about the food."',
        tactic: "Salvage. Six words on the money question, immediate pivot to a specific person. Close the door she re-opened.",
        nextSceneId: "pivot-clean",
        isOptimal: true,
      },
    ],
  },

  {
    id: "silence-held",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mother-in-law", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You hold the silence. Four seconds. Six seconds. At eight seconds, before anyone else can pick up the conversation, she does.",
      },
      {
        speakerId: "mother-in-law",
        text: '"It is alright, darling. I am not going to keep pressing. I can see you do not want to talk about it."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "She reframed your quiet as a refusal. The other five people at the table now have the picture she has just painted — you did not want to explain. The silence produced a specific cost you did not pay for the six-word version.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "take-the-frame-back",
        text: '"Not at all — it is going well. Lucas — Porto?"',
        tactic: "Reject her frame in seven words. Pivot immediately. The silence cost you one reframe; do not extend the exchange by defending against the reframe in detail.",
        nextSceneId: "pivot-clean",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-become-boring",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Become Boring",
    endingLearnPrompt:
      "The 'become boring' response is the specific technique for covert narc in-laws at family tables. Six words, no content to play with, pivot to a different person by name. Your partner noticed; the four-year learning curve shifted by a small, specific amount. Hold the same move at every subsequent family event and the register will, quietly, calibrate down across years.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Home. Seven-fourteen. Partner has noticed. Kitchen. Kettle on. The Christmas is, operationally, complete.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-debriefed",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Uninvited Debrief",
    endingLearnPrompt:
      "Your partner named the move for the first time in four years. The uninvited debrief converted that small moment of independent noticing into a joint operational project he did not open. He will not do it again soon. The discipline for the next Christmas: let his noticing be his — do not build a shared operations desk out of it until he asks for one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Home. The debrief ran until 8:47 p.m. He was patient. He will not raise her name, unprompted, for a while.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-extraction-complete",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Extraction",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook — How They Actually Operate",
    endingLearnPrompt:
      "Every sentence of explanation was new material. By the time the main course arrived, she had three specific quotes she will cite at Patricia-at-church in January and at Easter in April. The extraction was not personal; it was operational. The correction for next Christmas is the clean six words: it is going well, thank you. Then the pivot to Lucas.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The extraction completed. Patricia-at-church will hear about this within six weeks. The afternoon held, barely. Next time: six words.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const toxicNarc51: Scenario = {
  id: "tn-5-1",
  title: "Christmas At His Parents",
  tagline: "Christmas Day, 3:47 p.m. Seven at the table. Your mother-in-law lands a sentence.",
  description:
    "Four years of Christmases at his mother's house. Her specific move is the passive-aggressive line delivered across the dinner table, framed as 'just making conversation,' in a register so warm that the other five at the table will read it as hostess-speak. The scenario is one dinner, one line, and the technique of 'becoming boring' — the six-word response that gives her nothing to play with, paired with the pivot-to-a-person that closes the door she left open.",
  tier: "premium",
  track: "toxic-narc",
  level: 5,
  order: 1,
  estimatedMinutes: 13,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 380,
  badgeId: "become-boring",
  startSceneId: "christmas-dinner",
  prerequisites: ["tn-1-1"],
  tacticsLearned: [
    "The six-word response at a family table — no content, no warmth, no coldness",
    "The pivot-to-a-specific-person (not a topic) as the closing move",
    "The refusal to triangulate through your partner at the table",
    "The refusal to explain — every explanation is new material",
    "The one-line acknowledgement when your partner notices, rather than the uninvited debrief",
  ],
  redFlagsTaught: [
    "Covert narc in-law specialising in 'just making conversation' passive-aggression at public tables",
    "The compound-explanation failure mode — every noun becomes a future citation",
    "The silence-held trap — her reframing your quiet as refusal",
    "The register-match (meta-cleverness) as the subtle secondary failure",
    "The post-event uninvited debrief converting your partner's noticing into a workstream",
  ],
  characters: [INNER_VOICE, THE_PARTNER, MOTHER_IN_LAW],
  scenes,
};

export default toxicNarc51;
