import type { Tell } from "./types";

/**
 * Spike-phase seed Tells. Hardcoded in TS so the format can be felt
 * before the schema is committed. Once the loop is approved, these
 * migrate to the Tell table via a one-shot script and authoring moves
 * into /admin/tells/new.
 *
 * Voice rules (Kanika-faithful):
 *   - No em dashes.
 *   - Declarative observations, never instructions.
 *   - Specific, not abstract. Names of tactics where they help.
 *   - Reveals teach the diagnostic, not the response.
 */
export const SEED_TELLS: Tell[] = [
  {
    id: "tell-001-the-voicemail",
    number: 1,
    format: "DIAGNOSE",
    track: "DARK_PSYCH",
    axes: ["READ", "SPOT"],
    difficulty: 3,
    artifact: {
      kind: "voicemail",
      speakerLabel: "Her, 11:47 p.m.",
      durationLabel: "1:42",
      transcript:
        "I just need you to know I am fine. I am completely fine. You did not have to leave like that, you did not have to make me feel like I was the one who did something wrong. I told you I was tired and you decided that meant something. I love you. I love you so much, you have no idea. But maybe you do not actually love me, maybe you never did, because someone who loved me would not have left at ten o'clock when I asked you to stay. Anyway. Call me. Or do not. I do not even know anymore.",
    },
    question: "Name the cluster-B register. Use the tells.",
    choices: [
      {
        id: "borderline",
        text: "Borderline.",
        isCorrect: true,
        why: "Idealize-devalue-idealize inside a single artifact, abandonment-panic disproportionate to the event ('left at ten' is not the event, your leaving at all is), the split sentence 'maybe you never did' arriving four sentences after 'I love you so much.'",
      },
      {
        id: "narcissistic",
        text: "Narcissistic.",
        isCorrect: false,
        why: "NPD bait would be colder, sharper, framed to make you feel small. The repeated 'I love you' and the despair register are wrong-key for narcissism, which prefers contempt to longing.",
      },
      {
        id: "histrionic",
        text: "Histrionic.",
        isCorrect: false,
        why: "Closer than NPD. HPD and BPD share intensity but HPD performs for an audience in the room. This was left to voicemail, unwitnessed. She is dysregulating for herself, not staging.",
      },
      {
        id: "anxious-attached",
        text: "Anxious attachment, not cluster-B.",
        isCorrect: false,
        why: "Anxious-attached voicemails seek reassurance. They do not split to 'maybe you never loved me' without an event. The magnitude without a magnitude trigger is the BPD tell.",
      },
    ],
    reveal:
      "The register is borderline. The diagnostic is the intensity-to-event ratio. Not every dysregulated person is BPD, not every BPD person dysregulates this hard. But when the artifact is this intense and the event is this small, and the message contains both 'I love you so much' and 'maybe you never loved me' inside ninety seconds, the shape is abandonment-panic with split. The next question is not whether to call back. It is what to say when you do.",
  },

  {
    id: "tell-002-the-favour",
    number: 2,
    format: "DIAGNOSE",
    track: "DARK_PSYCH",
    axes: ["READ", "SPOT"],
    difficulty: 3,
    artifact: {
      kind: "text-exchange",
      label: "Mentor, Tuesday afternoon",
      lines: [
        {
          from: "them",
          text: "I have been meaning to say. You have been doing exceptional work. I want to put you on the Carter account.",
        },
        {
          from: "them",
          text: "Tiny ask. My nephew is interviewing at your old firm next week. Could you put in a quick word with David? Nothing formal. Just a 'I think you should meet him.'",
        },
        {
          from: "them",
          text: "If you cannot, no pressure at all. I just thought of you because you are so good with David. Carter is yours either way.",
        },
      ],
    },
    question: "What is the move being run on you?",
    choices: [
      {
        id: "narcissistic-transaction",
        text: "Narcissistic. Praise-then-extract, with the praise as currency.",
        isCorrect: true,
        why: "The Carter mention precedes the favour by one message, the disclaimer 'no pressure' is on the favour but not on Carter. You are being asked to spend social capital with David in exchange for something already implicit in the relationship. The sequence is the tell.",
      },
      {
        id: "borderline",
        text: "Borderline. The intensity of 'exceptional work' followed by a sudden ask reads as idealize-then-test.",
        isCorrect: false,
        why: "Closer-call than it looks. BPD splits run on emotional dysregulation. This is calm, sequenced, transactional. It is the wrong nervous system for a BPD diagnosis.",
      },
      {
        id: "just-a-favour",
        text: "Not cluster-B. Just a normal mentor asking for a small favour.",
        isCorrect: false,
        why: "The 'no pressure' line is doing work. A genuinely casual ask does not need to disclaim pressure. The disclaimer is an instruction to read the message as low-stakes, which is the move.",
      },
      {
        id: "histrionic",
        text: "Histrionic. The performed warmth before the ask.",
        isCorrect: false,
        why: "HPD warmth is theatrical and broad. This warmth is targeted at you specifically, with a specific currency ('Carter is yours'), used to set up a specific extraction. Targeted is not theatrical.",
      },
    ],
    reveal:
      "Narcissistic. The shape is the praise-extraction sequence. Carter arrives one message before the nephew. The 'no pressure' is the structural cover, it converts a transactional ask into something you would feel petty refusing. You are not being given Carter. You are being asked to pay for Carter in advance with your David capital. The clean response declines the favour without acknowledging the bundle, because acknowledging the bundle is half of accepting it.",
  },

  {
    id: "tell-006-the-meeting-credit",
    number: 6,
    format: "DIAGNOSE",
    track: "POWER",
    axes: ["READ", "CALIBRATE"],
    difficulty: 3,
    artifact: {
      kind: "scene",
      label: "Quarterly review, conference room, 14 people",
      text: "You spent six weeks rebuilding the data layer. You walked your senior through it twice. In the review, your senior says: 'We have to call out the work the team put in here. Particularly Marcus, who flagged the bottleneck early. And myself, frankly, I have been pushing this for two quarters.' Your name is not in the sentence. Marcus joined three weeks in.",
    },
    question: "What is the move being run?",
    choices: [
      {
        id: "credit-laundering",
        text: "Credit laundering. The frame names the work without naming you.",
        isCorrect: true,
        why: "Two non-you names get specificity (Marcus, herself), the work itself gets vague collective credit ('the team'). The shape is calibrated, not accidental.",
      },
      {
        id: "honest-oversight",
        text: "An honest oversight. People forget names under pressure.",
        isCorrect: false,
        why: "Possible in isolation. The diagnostic flag is the structure: she did not forget two names, she included them. Forgetting is uniform, this is selective.",
      },
      {
        id: "narcissistic-display",
        text: "Narcissistic. She is centring herself in front of leadership.",
        isCorrect: false,
        why: "Closer-call. NPD self-centring would more aggressively crowd out others. This move includes Marcus, which is the surgical part. NPD usually skips that detail.",
      },
      {
        id: "passive-grudge",
        text: "Personal grudge. Something happened between you two.",
        isCorrect: false,
        why: "The grudge might exist but the diagnostic is independent: even if she likes you, the move still extracts your visibility. Read the artefact, not the relationship.",
      },
    ],
    reveal:
      "Credit laundering. The diagnostic is selective specificity. Two names, two pieces of credit, one absence. The move is structural, not personal, the work has now been laundered into a story leadership will retell with two names in it. Your move is not to defend in the room. The defence is the receipt: a written follow-up to the leadership chain that named the timeline and the artefacts, in the next forty-eight hours, with no reference to the meeting. The meeting is the smear. The receipt is the correction.",
  },

  {
    id: "tell-007-the-quick-favour",
    number: 7,
    format: "DIAGNOSE",
    track: "REFUSAL",
    axes: ["REFUSE", "HOLD"],
    difficulty: 2,
    artifact: {
      kind: "text-exchange",
      label: "Friend, Saturday 8:42 a.m.",
      lines: [
        {
          from: "them",
          text: "Hey, sorry to ask, I know you are busy. Can you watch Lily for like two hours this afternoon? Three at most.",
        },
        {
          from: "them",
          text: "Mum cancelled and I have this thing I cannot move. I would owe you huge.",
        },
        {
          from: "them",
          text: "If you really cannot, totally fine, I will figure something out. No pressure.",
        },
      ],
    },
    question: "Pick the structurally clean refusal.",
    choices: [
      {
        id: "clean-no",
        text: "'I can't this afternoon. Hope your thing goes well.'",
        isCorrect: true,
        why: "One sentence. Reason omitted (you do not owe one). Goodwill on the second line. Does not engage 'two hours, three at most,' the negotiating frame.",
      },
      {
        id: "explained-no",
        text: "'I would but I have to finish a project deadline tomorrow and I am already behind, you know how it is.'",
        isCorrect: false,
        why: "Explanation invites counter-offer. 'Even one hour?' arrives within ninety seconds. Explanations turn a refusal into a negotiation.",
      },
      {
        id: "soft-maybe",
        text: "'Let me see if I can shift things. I will text you in an hour.'",
        isCorrect: false,
        why: "The maybe is its own answer. You will text in an hour with a yes you do not want to give, or a no you have now made twice as expensive. Firm now is cheaper than firm later.",
      },
      {
        id: "guilty-yes",
        text: "'Okay, but only this once, and you really do owe me.'",
        isCorrect: false,
        why: "The 'only this once' is a flag you posted on the wrong post. It tells you that you are saying yes against your read. The conditional is for next time, but it does not protect you from this time.",
      },
    ],
    reveal:
      "The clean no is the short no. 'I cannot' plus a goodwill close. Reasons are courtesy, not obligation, and offering one converts the refusal from a fact into a debate. The 'no pressure' she added is real, treat it as real, the structurally clean response respects the offer she made. Most people refuse expensively because they want to refuse and be liked. The discipline is accepting a small drop in liking is the cost of the no, and not paying it now means paying it bigger in three weeks.",
  },

  {
    id: "tell-008-the-3am-text",
    number: 8,
    format: "DIAGNOSE",
    track: "SELF_REG",
    axes: ["HOLD", "REPLY"],
    difficulty: 3,
    artifact: {
      kind: "scene",
      label: "Wednesday, 2:54 a.m. you are awake",
      text: "You woke at 2:30, looked at his last message from yesterday afternoon ('hey hope your day is good x'), and now twenty-four minutes later you have drafted three replies. Reply one is short and warm. Reply two adds a soft question. Reply three is the question alone, no warmth, no preamble. You can feel the want to send. The 6 a.m. alarm is in three hours.",
    },
    question: "What is the one structurally correct move at 2:54 a.m.?",
    choices: [
      {
        id: "do-not-send",
        text: "Send nothing. Close the app. Reply tomorrow at a daylight hour.",
        isCorrect: true,
        why: "The diagnostic is not the content of the replies, all three may be fine. The diagnostic is the time stamp. A 2:54 a.m. send communicates 'I am awake at 2:54 thinking about you,' which is a frame you do not want set, particularly if you are the one being chased.",
      },
      {
        id: "send-the-short-warm",
        text: "Send reply one. It is short and clean. He will read it in the morning.",
        isCorrect: false,
        why: "He will read it but he will read it as 'sent at 2:54.' The metadata is the message at this hour. The replies you draft at 2:54 are not the replies you would draft at 9:14, the difference is what gets transmitted.",
      },
      {
        id: "draft-and-schedule",
        text: "Draft reply one. Schedule it to send at 8:30 a.m.",
        isCorrect: false,
        why: "Closer to right. The trap is in the drafting, the reply you write at 2:54 carries the energy of 2:54 even if it lands at 8:30. The discipline is not just timing the send, it is delaying the writing.",
      },
      {
        id: "send-the-question-alone",
        text: "Send reply three. The question is the most honest version.",
        isCorrect: false,
        why: "Honesty at 2:54 a.m. with no warmth is sniper-shot vulnerability. It will land as urgency. Honesty needs a frame the receiver can hold, and 'no warmth at 3 a.m.' is the wrong frame for the message you actually mean.",
      },
    ],
    reveal:
      "Hold. The whole rep is not sending. Sleep is the active move, drafting three replies at 2:54 a.m. is the urge surfing, sending one is the reactive collapse. The version of you at 9:14 will rewrite anything you would have sent at 2:54 and the rewrite will be cleaner because it will have been written by someone who is rested, has eaten, and is not in the chemistry of insomnia plus longing. The instinct trained here is not 'what to say.' It is 'when not to say.'",
  },

  {
    id: "tell-003-the-text-back",
    number: 3,
    format: "DIAGNOSE",
    track: "RED_FLAGS",
    axes: ["READ", "SPOT", "CALIBRATE"],
    difficulty: 2,
    artifact: {
      kind: "text-exchange",
      label: "Three weeks in, 11:14 p.m. Sunday",
      lines: [
        {
          from: "them",
          text: "I know this is fast. I have just never met anyone who gets me the way you do.",
        },
        {
          from: "them",
          text: "It is like you can see the parts of me I have spent years hiding. I have not slept properly since Friday because I keep replaying our conversation.",
        },
        {
          from: "them",
          text: "I am not saying I love you. I just want you to know I have never felt this before and it is terrifying and I want you to know.",
        },
      ],
    },
    question: "What is happening here?",
    choices: [
      {
        id: "love-bombing",
        text: "Love-bombing. The intensity is calibrated to your reaction, not to the relationship.",
        isCorrect: true,
        why: "Three weeks. The phrases are pre-fitted: 'parts of me I have hidden,' 'never met anyone like you,' 'have not slept.' Intensity is the lever. The disclaimer 'I am not saying I love you' is the soft-launch of the word.",
      },
      {
        id: "secure-vulnerable",
        text: "Secure attachment, just unusually vulnerable early.",
        isCorrect: false,
        why: "Secure attachment paces itself to the partner's signals. This message does not adjust to anything you have said. The intensity is on a script, not a conversation.",
      },
      {
        id: "anxious-fast",
        text: "Anxious attachment escalating because of his own panic, not strategic.",
        isCorrect: false,
        why: "Anxious-attachment messages tend to seek reassurance ('please tell me we are OK'). This message tells you how he feels and how you have already changed him. It is a deposit, not a request.",
      },
      {
        id: "neurodivergent",
        text: "Neurodivergent over-share, reading as intense but meant earnestly.",
        isCorrect: false,
        why: "Possible in isolation. The diagnostic flag is the structure: pre-fitted phrases, escalating across three messages, self-disclosure designed to elicit reciprocation. The structure is too clean for an over-share.",
      },
    ],
    reveal:
      "Love-bombing. The diagnostic is structure plus pace. Three weeks is too short for 'parts of me I have hidden for years' to be earned. The phrases are not chosen for you, they are chosen for the lever, intensity-and-vulnerability triggers reciprocation in most people. The 'I am not saying I love you' line is the controlled landing of the word. Watch what arrives in week four. If the intensity drops the second you reciprocate, the move was the bond, not the connection.",
  },
];

/**
 * Pick today's Tell deterministically from the seed pool. Until the
 * schema lands, "today" is a stable hash of the UTC date so refreshes
 * show the same Tell and three sequential days show three different
 * Tells. Replaced by a real schedule lookup once Tell rows exist.
 */
export function getTodaysTell(): Tell {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)) >>> 0;
  }
  const idx = hash % SEED_TELLS.length;
  return SEED_TELLS[idx];
}

export function getTellById(id: string): Tell | undefined {
  return SEED_TELLS.find((t) => t.id === id);
}
