/**
 * Female Track. Mission 16-2 "The Reference"
 *
 * Five weeks after L16-1. Elena accepted on Friday of the same week
 * and joined Halberd in January. The protagonist is four months into
 * her second three-year cliff. The candidate list for the spring
 * partner-elevation cycle has just been circulated by Hugh's office.
 * Avery is on the list.
 *
 * Wednesday morning. Avery walks in unannounced and asks for a
 * reference letter for an outside partnership opportunity at a London
 * firm. She interviews Friday. She would like the reference by
 * Thursday at noon.
 *
 * The discipline taught: how to write a reference for someone whose
 * historical work you have legitimate reason to mistrust but who has
 * not done anything in the last five years that you can specifically
 * name. The L4 register is fourteen years old. The L4 register is not
 * nothing. The L4 register is also not the data of the last five
 * years.
 *
 * Handoff out: Avery's interview Friday + the letter you wrote.
 *
 * Pilot reference: `reference/L16-2-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { AVERY, LENNOX, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  {
    id: "cold-open",
    backgroundId: "office",
    mood: "professional",
    dialog: [
      {
        speakerId: null,
        text: "Wednesday. 9:42 am. Your office. The spring partner-elevation candidate list arrived in your inbox forty-three minutes ago. You have read it twice. Avery is on it. So are three others. The list is six names.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The last time you and Avery were in a meaningful conversation was eleven years ago at a common room ambush you did not participate in because Priya intervened. That was L4-2. She has worked at Halberd for five years. She has not been in your way and she has not been in your room.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The L4 register is fourteen years old. The L4 register is not nothing. The L4 register is also not the data of the last five years. The candidate-list email is the first time you have been asked to take a position on her in any capacity since 2024.",
      },
    ],
    nextSceneId: "avery-walks-in",
  },

  {
    id: "avery-walks-in",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: null,
        text: "Avery knocks at 10:14 am. She is wearing the navy suit she has worn to every partners' meeting for two years. She has not asked the assistant to schedule her. She is asking now in person, on the assumption that you have ten minutes.",
      },
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "Do you have ten minutes. I would like to ask you something. It is not a partners' meeting topic.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The framing is correct. The walk-in is correct. She has gone through Hugh's office for nothing in five years and she is not going through Hugh's office for this. Whatever the ask is, she is treating you as the person who decides without intermediation.",
      },
      {
        speakerId: "inner-voice",
        text: "Yes. Sit.",
      },
    ],
    nextSceneId: "she-makes-the-ask",
  },

  {
    id: "she-makes-the-ask",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "I am interviewing on Friday for a partnership opportunity at a firm in London. The firm is Cardiff Reede. The role is a senior partnership track in the consumer-platform vertical I have built here. They have asked for a reference from a current Halberd partner who is not in my direct chain. You are the partner who would be most useful for them and most credible for me.",
      },
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "I would like the reference letter by Thursday at noon. The interview is Friday at 2:00 pm London. I am asking now because if you decline I will need to ask someone else by end of day and Hugh is unavailable until Friday.",
      },
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "I am asking you because I think the letter you would write would be true. I am also asking you because I know what the letter you would write would not say. I am not asking for the letter that does not say those things. I am asking for the letter you can defend.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She has just named the L4 register without naming it. She has acknowledged that you have a reason to write a letter that would not be neutral. She has asked for the letter you can defend. The framing is the framing of someone who has done the work of thinking about the ask before placing it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Three options.",
      },
    ],
    nextSceneId: "the-choice",
  },

  {
    id: "the-choice",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["avery"],
    dialog: [],
    choices: [
      {
        id: "specific-reference",
        text: "I will write the letter. The letter will be specific. It will name your work of the last five years honestly. It will note that we worked together earlier in our careers and that the operating record I can speak to is the record at this firm. I will send it Thursday morning.",
        tactic:
          "Write the specific reference. Name the work of the last five years honestly. Note the L4 era as historical context rather than current data. The letter is the diligence the firm needs and the reference Avery asked for.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-the-specific-reference",
      },
      {
        id: "polite-letter",
        text: "I will write the letter. I will keep it brief. Three sentences. The standard form. I will send it Thursday morning.",
        tactic:
          "The polite letter. Three vouching sentences with no specifics. The Cardiff Reede partner will read it as the lukewarm reference it is and draw the conclusion. The letter does the work of declining without the directness of declining.",
        feedback:
          "Polite letters are signals dressed as letters. The recipient will read the signal.",
        nextSceneId: "path-b-the-polite-letter",
      },
      {
        id: "decline-the-letter",
        text: "I do not think I have the operating context to write a useful letter. I recommend you ask Lennox or Hugh. Lennox is available this afternoon. I will not be offended if Lennox is the right one.",
        tactic:
          "Decline cleanly. The framing is honest but the operating context excuse is incomplete. You have five years of context. The decline is structurally a no without the directness of a no. It also routes Avery to a partner who may not have the context you have.",
        event: "failure-rejected",
        nextSceneId: "path-c-decline",
      },
    ],
  },

  {
    id: "path-a-the-specific-reference",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "Thank you. That is the answer I was hoping for. I will not see the letter. The firm does not share references with the candidate, and I am not asking for an unofficial preview. Thursday at noon is fine.",
      },
      {
        speakerId: null,
        text: "She stands. She does not shake your hand. She nods. She leaves at 10:19 am. The conversation took five minutes.",
      },
      {
        speakerId: null,
        text: "You draft the letter that afternoon. Three paragraphs. The first paragraph names the firm context and your role. The second paragraph names her work on the consumer-platform vertical at Halberd over the last five years, with two specific deals and two specific decisions. The third paragraph names that you worked together earlier in your careers in a different vertical, that the operating record you can speak to is the one at this firm, and that the firm's diligence team should ask for additional references covering the earlier period.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The third paragraph is the load-bearing one. It does not deny the L4 register. It positions the L4 register as historical and routes the firm to do the diligence that would surface it if they wanted to. The letter is the letter Avery asked for, which is the letter you can defend.",
      },
      {
        speakerId: null,
        text: "You send the letter at 11:14 am Thursday. Avery does not reply. Cardiff Reede acknowledges receipt at 12:04 pm. The Friday interview happens. The decision Cardiff Reede makes is not yours to know.",
      },
    ],
    nextSceneId: "ending-the-specific-reference",
  },

  {
    id: "path-b-the-polite-letter",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "Thank you. Three sentences works.",
      },
      {
        speakerId: null,
        text: "She leaves at 10:18 am. You write the letter Wednesday afternoon. Three sentences. The work she has done at Halberd is respected. Her relationships with the operating teams are strong. She would be considered a strong candidate. The letter is technically correct and structurally a signal.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Cardiff Reede has read hundreds of three-sentence letters in their existence. They will read this one in the eight seconds it takes to read. The eight seconds will produce the conclusion three-sentence letters produce, which is that the writer has chosen not to write more.",
        event: "tactic-named:polite-letter-as-signal",
      },
      {
        speakerId: null,
        text: "The interview happens Friday. The decision Cardiff Reede makes is not yours to know. Avery does not raise the letter again. Two months later you hear from Lennox that the partnership did not extend.",
      },
    ],
    nextSceneId: "ending-the-polite-letter",
  },

  {
    id: "path-c-decline",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["avery"],
    dialog: [
      {
        speakerId: "avery",
        emotion: "neutral",
        text: "Okay. Thank you for being direct. I will ask Lennox this afternoon.",
      },
      {
        speakerId: null,
        text: "She stands. She leaves at 10:17 am. The conversation took three minutes.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The decline is technically valid. The decline is also a decline you would not have given to a candidate whose L4 register did not exist. You are aware of that. Avery is aware of that. Lennox will be aware of that by 4:00 pm.",
      },
      {
        speakerId: null,
        text: "Lennox stops by your office at 3:48 pm.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Avery asked me for a reference. I told her I would write it because she asked and the firm asked. I also asked her why she came to me second. She told me you declined on operating-context grounds. I would like to know if there is a context I should know about that is not the operating context.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Lennox has just opened the door cleanly. You can name the L4 register here. The L4 register would matter to Lennox. It would also be the disclosure you spent eight weeks of her capital on at L15-1. You did not disclose it then. You can disclose it now.",
        event: "tactic-named:context-deferred",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Or you can hold the L4 register. The L4 register stays yours. Avery's reference is now Lennox's letter, which is the letter Lennox could not have written with the same depth, because Lennox does not have the L4 context. The firm gets a letter from Lennox.",
      },
    ],
    nextSceneId: "ending-the-decline",
  },

  {
    id: "ending-the-specific-reference",
    backgroundId: "office",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Specific Reference",
    endingSummary:
      "Three paragraphs. The third one routed Cardiff Reede to do the diligence on the L4 era without doing the diligence for them. The letter is the letter Avery asked for, which was the letter you could defend. The interview happens Friday. The decision is not yours to know. The L4 register is fourteen years old. The five years at Halberd are five years.",
    endingLearnPrompt:
      "References for people whose historical work you have legitimate reason to mistrust are not yes/no decisions. They are diligence decisions. The next time you are asked to write a reference for someone with a historical floor, ask whether the letter routes diligence or replaces it.",
    dialog: [
      {
        speakerId: null,
        text: "Thursday 11:14 am. Letter sent. Receipt acknowledged at 12:04 pm. Lennox stops by at 4:14 pm.",
      },
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Saw the letter. Third paragraph was the right move. Cardiff Reede's diligence team will follow the routing. Whether they extend or not, the diligence is theirs to run.",
      },
    ],
  },

  {
    id: "ending-the-polite-letter",
    backgroundId: "office",
    mood: "professional",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Polite Letter",
    endingSummary:
      "Three sentences. Technically correct. Structurally a signal. Cardiff Reede read the signal in eight seconds. The partnership did not extend. The decision was not the letter's; the diligence team has its own process. The letter was a piece of the picture. Most polite letters do the work of declining without the directness of declining.",
    endingLearnPrompt:
      "The polite three-sentence letter is the most common reference written for the candidate you would prefer not to recommend. The recipient firm reads it as the signal it is. The next time you reach for the polite letter, ask whether you are writing a reference or writing a decline.",
    failureBlogSlug: "the-polite-letter",
    failureBlogTitle: "Why the three-sentence reference is a decline in eight seconds",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "Saw the letter. Three sentences is a length. Cardiff Reede's diligence team will read it as a length. The decision is theirs.",
      },
    ],
  },

  {
    id: "ending-the-decline",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Decline",
    endingSummary:
      "You declined on operating-context grounds. Lennox wrote the letter without the L4 context. You did not disclose the L4 context to Lennox in the 3:48 pm conversation. Lennox's letter is a competent letter without the depth a letter with the L4 context would have had. The decline is technically valid. The decline is also the version of the L15-1 floor disclosure that was deferred at the partners' table and is now deferred again. The deferrals are stacking.",
    endingLearnPrompt:
      "Declining on operating-context grounds when the context exists is the soft version of declining for a reason you do not want to name. The next time you decline a reference, ask whether the decline is structurally a no or substantively a no.",
    failureBlogSlug: "the-context-deferred-decline",
    failureBlogTitle: "Why declining on operating-context grounds is a soft no when the context exists",
    dialog: [
      {
        speakerId: "lennox",
        emotion: "knowing",
        text: "I wrote the letter. I sent it Thursday morning. The interview happened Friday. The partnership did not extend. The decision is theirs. The conversation we did not have at 3:48 pm on Wednesday is one we will need to have at some point. I will book a Saturday booth.",
      },
    ],
  },
];

const mission16_2: Scenario = {
  id: "mission-16-2",
  title: "The Reference",
  tagline:
    "Avery walks in Wednesday morning. The L4 register is fourteen years old. The reference is the letter you can defend.",
  description:
    "Five weeks after the Elena interview. Avery asks for a reference for a London partnership opportunity. She has not been a problem in five years. She has also not been a peer. The discipline is to write the reference that names the work of the last five years honestly and routes the firm to do the diligence on the earlier period without doing it for them.",
  tier: "vip",
  track: "female",
  level: 16,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 500,
  badgeId: "specific-reference",
  startSceneId: "cold-open",
  prerequisites: ["mission-16-1"],
  isNew: true,
  tacticsLearned: [
    "Writing the specific reference that routes diligence rather than replacing it",
    "Naming current operating work without ignoring historical context",
    "Acknowledging the L4 era as historical data, not current data",
    "Distinguishing a reference from a decline-in-three-sentences",
  ],
  redFlagsTaught: [
    "The polite three-sentence letter as a signal disguised as a reference",
    "Declining on operating-context grounds when the context exists",
    "Routing the candidate to a partner who does not have the same context",
    "Stacking deferrals of the floor disclosure across years",
  ],
  reward: {
    id: "specific-reference",
    name: "The Specific Reference",
    description:
      "Three paragraphs. The third one routed Cardiff Reede to do the diligence on the L4 era without doing it for them. The reference is the letter you could defend.",
  },
  characters: [AVERY, LENNOX, INNER_VOICE],
  scenes,
};

export default mission16_2;
