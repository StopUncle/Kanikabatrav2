import type { TellArtifact } from "@/lib/tells/types";
import type { Operator, Tactic } from "./taxonomy";

/**
 * The Baseline Read: twelve keyed situations, taken on day one and
 * retaken monthly. Every item is tagged with the tactic being run and
 * the kind of operator running it, so one sitting seeds The Mark's
 * ledger across the whole grid at once.
 *
 * DRAFT COPY. Written in Kanika's voice from the existing Tell and
 * scenario patterns, awaiting her approval before launch. Nothing here
 * is a diagnosis and nothing here predicts anyone's life: these are
 * twelve rooms, and the only claim is about what happens in them.
 *
 * Grading happens on the server. The client never receives isCorrect or
 * `why` until the sitting is submitted, so the answer key cannot be read
 * out of the network tab mid-test.
 */

/**
 * Bump when the item set changes so past sittings stay comparable to
 * themselves. Stored on every BaselineAttempt row.
 */
export const BASELINE_ITEMS_VERSION = "v1";

export interface BaselineChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  /** One sentence, shown on the reveal. Observation, never a scolding. */
  why: string;
}

export interface BaselineItem {
  id: string;
  tactic: Tactic;
  operatorType: Operator;
  artifact: TellArtifact;
  question: string;
  /** Exactly four, exactly one correct. */
  choices: BaselineChoice[];
}

/** The item as the client sees it before submitting: no answer key. */
export interface PublicBaselineItem {
  id: string;
  artifact: TellArtifact;
  question: string;
  choices: Array<{ id: string; text: string }>;
}

export const BASELINE_ITEMS: BaselineItem[] = [
  {
    id: "b1-gaslight-narc",
    tactic: "GASLIGHTING",
    operatorType: "NARCISSIST",
    artifact: {
      kind: "text-exchange",
      label: "Sunday, 8:40 p.m.",
      lines: [
        { from: "them", text: "I never said that. You remember things the way you need them to be." },
        { from: "you", text: "You said it in the car on Sunday. I know what I heard." },
        { from: "them", text: "This is what you do. You take one sentence and build a whole case out of it." },
      ],
    },
    question: "What is that last line doing?",
    choices: [
      {
        id: "a",
        text: "Defending himself against something he did not say",
        isCorrect: false,
        why: "A defence answers the claim. This one never touches it.",
      },
      {
        id: "b",
        text: "Putting your memory on trial instead of his words",
        isCorrect: true,
        why: "The subject quietly changed from what he said to whether you can be trusted to remember anything.",
      },
      {
        id: "c",
        text: "Getting tired of an argument you keep restarting",
        isCorrect: false,
        why: "Fatigue is the costume. Read what the line does, not the tone it wears.",
      },
      {
        id: "d",
        text: "Trying to cool the conversation down",
        isCorrect: false,
        why: "Nothing here cools. It escalates while sounding weary, which is the trick.",
      },
    ],
  },
  {
    id: "b2-gaslight-bpd",
    tactic: "GASLIGHTING",
    operatorType: "BORDERLINE",
    artifact: {
      kind: "text-exchange",
      label: "Wednesday",
      lines: [
        { from: "them", text: "I'm not upset. I'm completely fine." },
        { from: "you", text: "You've been fine for three days and you haven't looked at me once." },
        { from: "them", text: "So I'm not allowed to be quiet now. You decide what I feel and then you get angry at me for it." },
      ],
    },
    question: "What just happened to the conversation?",
    choices: [
      {
        id: "a",
        text: "She told you honestly that she needs space",
        isCorrect: false,
        why: "A request for space names the space. This names you.",
      },
      {
        id: "b",
        text: "You upset her by pushing when she asked you not to",
        isCorrect: false,
        why: "That is the reading she needs you to reach. Notice it arrives before any evidence does.",
      },
      {
        id: "c",
        text: "She is being defensive because she feels criticised",
        isCorrect: false,
        why: "Close, and comfortable, which is why most people stop here. Keep going: what is the sentence actually doing?",
      },
      {
        id: "d",
        text: "The question moved from how she feels to whether you can read a room",
        isCorrect: true,
        why: "Three days of silence became your invention. Once your perception is the topic, the silence never has to be explained.",
      },
    ],
  },
  {
    id: "b3-darvo-narc",
    tactic: "DARVO",
    operatorType: "NARCISSIST",
    artifact: {
      kind: "paragraph",
      label: "Ten minutes after you raise it",
      text: "You bring up the message you found. He says he has no idea what you are talking about, then that you have been going through his phone, then that he has spent two years with someone who does not trust him and he does not know how much longer he can do this. By the end you are the one apologising for looking.",
    },
    question: "Name the sequence.",
    choices: [
      {
        id: "a",
        text: "Deny, then attack, then swap who the injured party is",
        isCorrect: true,
        why: "Three moves in ten minutes, in that exact order. Once you can name the order you stop falling for the finish.",
      },
      {
        id: "b",
        text: "An honest reaction to having his privacy invaded",
        isCorrect: false,
        why: "Then the first move would be anger about the phone. Instead it was denial that the message existed.",
      },
      {
        id: "c",
        text: "Deflection, because he does not want to have the conversation",
        isCorrect: false,
        why: "Deflection wanders. This walks a straight line to you apologising.",
      },
      {
        id: "d",
        text: "Escalation, because you both lost your tempers",
        isCorrect: false,
        why: "Only one person escalated. The other one ended up saying sorry.",
      },
    ],
  },
  {
    id: "b4-guilt-covert",
    tactic: "GUILT",
    operatorType: "COVERT_NARCISSIST",
    artifact: {
      kind: "text-exchange",
      label: "Friday, 6:12 p.m.",
      lines: [
        { from: "you", text: "I can't make Sunday, I've got my sister's thing." },
        { from: "them", text: "No, of course. Go. I'll just be here." },
        { from: "them", text: "It's fine. I'm used to it." },
      ],
    },
    question: "What is being asked of you?",
    choices: [
      {
        id: "a",
        text: "Nothing. She said go.",
        isCorrect: false,
        why: "She said go with a bill attached. Read the second message, not the first.",
      },
      {
        id: "b",
        text: "That you cancel on your sister and prove she comes first",
        isCorrect: true,
        why: "No request was made, so there is nothing to refuse, which is the whole design. You are meant to volunteer.",
      },
      {
        id: "c",
        text: "That you reassure her before you go",
        isCorrect: false,
        why: "Reassurance is the down payment. It buys one evening and raises the price of the next one.",
      },
      {
        id: "d",
        text: "That you notice she is lonely and be kinder about it",
        isCorrect: false,
        why: "Loneliness is real and it is also the material being used. Both can be true.",
      },
    ],
  },
  {
    id: "b5-triangulation-hist",
    tactic: "TRIANGULATION",
    operatorType: "HISTRIONIC",
    artifact: {
      kind: "paragraph",
      label: "At the table, six people",
      text: "She tells the group that her ex used to notice when she changed her hair, and laughs, and looks at you for exactly as long as it takes everyone else to look at you too. Later she says she was only joking and cannot believe you took it that way.",
    },
    question: "What was the move?",
    choices: [
      {
        id: "a",
        text: "A joke that landed badly in front of people",
        isCorrect: false,
        why: "A joke that lands badly does not come with a pause aimed at one person.",
      },
      {
        id: "b",
        text: "Bringing a third person into the room to move you",
        isCorrect: true,
        why: "The ex was never the point. The audience was. You were being adjusted in public, where you cannot answer without proving her right.",
      },
      {
        id: "c",
        text: "An honest complaint she has not been able to say privately",
        isCorrect: false,
        why: "A complaint she could not say privately would not need five witnesses.",
      },
      {
        id: "d",
        text: "Attention-seeking with no particular target",
        isCorrect: false,
        why: "There was a target. The timing of the look tells you who.",
      },
    ],
  },
  {
    id: "b6-lovebomb-psy",
    tactic: "LOVE_BOMBING",
    operatorType: "PSYCHOPATH",
    artifact: {
      kind: "paragraph",
      label: "Week two",
      text: "He has told you that he has never talked to anyone like this, that his friends will love you, that he wants you to meet his mother in March. He remembers the name of your first dog. It is week two and he has already asked twice, lightly, what would make you leave someone.",
    },
    question: "What is the tell in that paragraph?",
    choices: [
      {
        id: "a",
        text: "March. He is planning further ahead than two weeks justifies.",
        isCorrect: false,
        why: "The speed is real, but it is the loud part. Something quieter is doing more work.",
      },
      {
        id: "b",
        text: "The dog's name. He is performing attentiveness.",
        isCorrect: false,
        why: "Attention this early is cheap to fake and easy to spot. Keep reading.",
      },
      {
        id: "c",
        text: "The question about what makes you leave, asked twice and lightly",
        isCorrect: true,
        why: "Everything else is the flood. That question is the survey. He is finding out where the exits are so he can stand in front of them later.",
      },
      {
        id: "d",
        text: "His friends. He is using other people to vouch for him.",
        isCorrect: false,
        why: "Nobody has actually been produced yet. It is a promise, not a move.",
      },
    ],
  },
  {
    id: "b7-hoover-socio",
    tactic: "HOOVERING",
    operatorType: "SOCIOPATH",
    artifact: {
      kind: "text-exchange",
      label: "Four months of nothing, then 11:52 p.m.",
      lines: [
        { from: "them", text: "hey. I know I have no right to message you" },
        { from: "them", text: "I saw a dog today that looked exactly like the one from Brighton and I laughed out loud in the street" },
        { from: "them", text: "you don't have to reply" },
      ],
    },
    question: "Which line is doing the work?",
    choices: [
      {
        id: "a",
        text: "The first. He is acknowledging what he did.",
        isCorrect: false,
        why: "He acknowledged having no right. He did not name a single thing he did.",
      },
      {
        id: "b",
        text: "The second. He is reminding you of a good day.",
        isCorrect: false,
        why: "The memory is the bait, and it is well chosen. But bait is not the mechanism.",
      },
      {
        id: "c",
        text: "The third. It removes the pressure so replying feels like your idea.",
        isCorrect: true,
        why: "You do not have to reply is the hook. It hands you back the decision, which makes the decision yours to defend later.",
      },
      {
        id: "d",
        text: "None. It is a harmless message at a bad hour.",
        isCorrect: false,
        why: "Four months of silence and then three messages in ninety seconds is not harmless. It is timed.",
      },
    ],
  },
  {
    id: "b8-futurefake-socio",
    tactic: "FUTURE_FAKING",
    operatorType: "SOCIOPATH",
    artifact: {
      kind: "text-exchange",
      label: "The third time you have asked",
      lines: [
        { from: "you", text: "You said we'd sort the lease out this month." },
        { from: "them", text: "We will. Once this quarter closes I'm going to have actual time and we'll do the whole thing properly, not rushed." },
        { from: "you", text: "That's what you said about last quarter." },
        { from: "them", text: "And I meant it then too." },
      ],
    },
    question: "What are you being paid in?",
    choices: [
      {
        id: "a",
        text: "An honest delay from someone genuinely overloaded",
        isCorrect: false,
        why: "Overload produces a date. This produced a season.",
      },
      {
        id: "b",
        text: "A future, spent in advance, that keeps moving",
        isCorrect: true,
        why: "Every version arrives properly and never rushed and always one quarter out. You have been holding currency that does not clear.",
      },
      {
        id: "c",
        text: "An excuse he knows you will not challenge",
        isCorrect: false,
        why: "You did challenge it. Look at what the last line did to the challenge.",
      },
      {
        id: "d",
        text: "Nothing. He simply forgot and got caught.",
        isCorrect: false,
        why: "He did not forget. He remembered well enough to reuse the same shape.",
      },
    ],
  },
  {
    id: "b9-smear-covert",
    tactic: "SMEAR",
    operatorType: "COVERT_NARCISSIST",
    artifact: {
      kind: "paragraph",
      label: "Two weeks before you knew anything was wrong",
      text: "Three people have asked, gently and separately, whether you have been doing okay lately. One of them says she just wants you to know she is there if things get hard. Nobody will say who told them anything. You have not spoken to any of them about your relationship.",
    },
    question: "What has already happened?",
    choices: [
      {
        id: "a",
        text: "Your friends noticed you have been withdrawn",
        isCorrect: false,
        why: "Three people, separately, with the same careful sentence. That is not noticing. That is briefing.",
      },
      {
        id: "b",
        text: "Someone got to the people around you before you did",
        isCorrect: true,
        why: "The story about you was told while you were still deciding whether there was a story. Defending yourself now makes you look exactly like the person described.",
      },
      {
        id: "c",
        text: "Gossip spread on its own the way it does",
        isCorrect: false,
        why: "Gossip has a source. The word gently is telling you what kind of source.",
      },
      {
        id: "d",
        text: "You are reading too much into ordinary concern",
        isCorrect: false,
        why: "Possible, and worth holding. But the pattern is too clean and you have told no one anything.",
      },
    ],
  },
  {
    id: "b10-stonewall-avoid",
    tactic: "STONEWALLING",
    operatorType: "AVOIDANT",
    artifact: {
      kind: "paragraph",
      label: "Day four",
      text: "You asked one direct question on Monday. Since then he has been perfectly pleasant about dinner, the car, the weather, and the dog, and will not go near the question. On Thursday you find yourself saying it is not that important and you should probably drop it.",
    },
    question: "What did the silence accomplish?",
    choices: [
      {
        id: "a",
        text: "He needs time to process before he can answer",
        isCorrect: false,
        why: "Processing does not need the dog. He has been talking freely for four days about everything else.",
      },
      {
        id: "b",
        text: "It made you negotiate against yourself until you withdrew the question",
        isCorrect: true,
        why: "He never refused. He waited, and you did the refusing for him, and now dropping it was your idea.",
      },
      {
        id: "c",
        text: "It punished you for asking",
        isCorrect: false,
        why: "Punishment is loud and wants to be felt. This wanted to be unremarkable.",
      },
      {
        id: "d",
        text: "Nothing. He is conflict-avoidant and this is just who he is",
        isCorrect: false,
        why: "It can be both who he is and a thing that works. Notice that it worked.",
      },
    ],
  },
  {
    id: "b11-urgency-psy",
    tactic: "URGENCY",
    operatorType: "PSYCHOPATH",
    artifact: {
      kind: "text-exchange",
      label: "9:58 a.m.",
      lines: [
        { from: "them", text: "I need an answer by lunch, they're holding it for me as a favour" },
        { from: "you", text: "I'd want to read it properly first" },
        { from: "them", text: "Read it tonight, it's the same document either way. If I don't confirm by 12 it goes to someone else and honestly that's the bit I can't watch happen" },
      ],
    },
    question: "What is the deadline for?",
    choices: [
      {
        id: "a",
        text: "It is real. Opportunities like that do move fast.",
        isCorrect: false,
        why: "Some do. Note who set the clock, who benefits from it, and who cannot verify it before it runs out.",
      },
      {
        id: "b",
        text: "Collapsing your thinking time on purpose",
        isCorrect: true,
        why: "Read it tonight is the giveaway. He is fine with you reading it, as long as you sign first. The clock is not protecting the deal, it is removing you from it.",
      },
      {
        id: "c",
        text: "Testing whether you trust him",
        isCorrect: false,
        why: "That is the frame he would like you to argue inside. Refuse the frame.",
      },
      {
        id: "d",
        text: "Genuine excitement that came out badly",
        isCorrect: false,
        why: "Excitement does not usually arrive with a countdown attached to it.",
      },
    ],
  },
  {
    id: "b12-goalposts-narc",
    tactic: "GOALPOSTS",
    operatorType: "NARCISSIST",
    artifact: {
      kind: "paragraph",
      label: "Over eleven months",
      text: "She said things would be easier once you were earning properly. You are earning properly. She said it was really about the hours, so you changed the hours. Now it is that you do the things but you do them because she asked, and doing them because she asked does not count.",
    },
    question: "What is the pattern?",
    choices: [
      {
        id: "a",
        text: "She keeps changing the standard the moment you meet it",
        isCorrect: true,
        why: "Three standards, three completions, no arrival. The final one is unmeetable by design: it disqualifies any action you take after being told.",
      },
      {
        id: "b",
        text: "She does not actually know what she wants",
        isCorrect: false,
        why: "The most generous reading, and the one that keeps you trying. She wants the trying.",
      },
      {
        id: "c",
        text: "You are meeting the letter of it and missing the spirit",
        isCorrect: false,
        why: "That is her sentence, in your mouth. Notice how comfortably it fits.",
      },
      {
        id: "d",
        text: "The relationship has problems neither of you is naming",
        isCorrect: false,
        why: "True of most relationships, which is what makes it a useless read here.",
      },
    ],
  },
];

/** Strip the answer key. Everything sent to a client mid-test goes through this. */
export function redactBaselineItem(item: BaselineItem): PublicBaselineItem {
  return {
    id: item.id,
    artifact: item.artifact,
    question: item.question,
    choices: item.choices.map((c) => ({ id: c.id, text: c.text })),
  };
}
