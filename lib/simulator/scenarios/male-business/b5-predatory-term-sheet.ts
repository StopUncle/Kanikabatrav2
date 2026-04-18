/**
 * Business Line — Mission 5 "The Predatory Term Sheet"
 *
 * Teaches: reading power asymmetry in paper. Standard vs. predatory
 * clauses. Negotiating vs. walking vs. becoming an employee of your
 * own company. Urgency as manipulation. Legal terms (full ratchet
 * anti-dilution, drag-along, reverse-vesting, key-man) as dark-
 * psychology weapons wearing a suit.
 *
 * Why it matters: founders who don't read their own contracts end up
 * fired from the thing they built. The "good investor who believes in
 * you" is frequently the same man who replaces you with a professional
 * CEO in year three — and the signature that lets him do it is yours,
 * on page 31 of a document you skimmed.
 *
 * This is the endgame Business Line scenario. The voice should carry
 * the weight of everything taught before — rooms, credit, cofounders,
 * silence — and bring it to the moment where paper becomes power.
 *
 * Failure routes → "Dark Triad Personality Types" + "Narcissist
 * Playbook: How They Actually Operate"
 */

import type { Scenario, Scene } from "../../types";
import { VAUGHN, THEO, RYKER, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1 — the restaurant, the number, the sentence
  // ---------------------------------------------------------------------
  {
    id: "the-offer",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "A corner table at Cipriani. White cloth. No menu yet — Vaughn ordered for the table half an hour before you arrived. The term sheet sits between the breadbasket and your water glass, face down.",
      },
      {
        speakerId: null,
        text: "Lawrence Vaughn is sixty-four, still thin, still wearing the same navy suit he's been photographed in for twenty years. He doesn't flip the document over. He pours you wine first.",
      },
      {
        speakerId: "vaughn",
        text: '"Four million. Twenty pre. That\'s above where I normally price a Series A at this stage. I wanted you to see that before you see anything else."',
        emotion: "knowing",
      },
      {
        speakerId: "vaughn",
        text: '"I\'ve watched a lot of men build companies. You have the temperament. It\'s rarer than the idea."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "The number makes you warm. The sentence makes you warmer. Notice which of those two you felt first — that's the hook. A real offer needs no compliment. A compliment is the anaesthetic.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "thank-and-read",
        text: '"That means a lot. Before I say anything else, I want to read the whole document with counsel."',
        tactic: "Warm, firm, no commitment. You accept the compliment without paying for it.",
        nextSceneId: "the-timeline",
        isOptimal: true,
      },
      {
        id: "match-the-warmth",
        text: '"Lawrence — honestly, the temperament line got me. Let\'s find a way to make this work this week."',
        tactic: "You just told a predator the flattery works. He will dose accordingly.",
        nextSceneId: "seduced-in",
      },
      {
        id: "play-hard-early",
        text: "Stay cold. Ask him why the valuation is above market.",
        tactic: "Playing cold at the table makes him show less paper. You want MORE paper, not less.",
        nextSceneId: "he-retracts",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2 — the 72-hour squeeze
  // ---------------------------------------------------------------------
  {
    id: "the-timeline",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: "vaughn",
        text: '"Take it with you. I only need one thing from you in return."',
        emotion: "neutral",
      },
      {
        speakerId: "vaughn",
        text: '"My LP window closes Friday. Seventy-two hours. If we sign Thursday, capital lands Monday. If not, the allocation rotates to another deal and we can\'t revisit for at least a quarter."',
        emotion: "knowing",
      },
      {
        speakerId: "vaughn",
        text: '"I\'m not pressuring you. I\'m telling you the calendar."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Urgency manipulation. Every predator — romantic, criminal, capital — uses the same mechanic: compress the clock so the prefrontal cortex can't run. 'I'm not pressuring you, I'm telling you the calendar' is the tell. A man who isn't pressuring you says 'take your time'.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Ryker used a different version of this. Sign the LLC this week. References are travelling. Same grammar, different suit.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "name-the-clock",
        text: '"I appreciate the calendar. My counsel needs ten business days. If that breaks the deal, we\'re not a fit."',
        tactic: "Name the urgency as a constraint, not a fact. A real investor adjusts. A predator drops the warmth.",
        nextSceneId: "theo-reads",
        isOptimal: true,
      },
      {
        id: "accept-the-clock",
        text: '"Understood. I\'ll get it read tonight and back to you by Thursday."',
        tactic: "You just agreed to read 47 pages of structured finance in a night. That's the plan.",
        nextSceneId: "night-skim",
      },
      {
        id: "counter-split",
        text: '"Can we sign Friday with an addendum allowing changes for two weeks?"',
        tactic: "Addenda that come after a signature are written by whoever has the signature. You'd be negotiating from zero leverage.",
        nextSceneId: "night-skim",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3 — Theo, the CFO, reads the document
  // ---------------------------------------------------------------------
  {
    id: "theo-reads",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["theo"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: null,
        text: "11:40pm at the office. Theo has the term sheet in front of him with four different coloured tabs sticking out of it. He hasn't looked up in forty minutes.",
      },
      {
        speakerId: "theo",
        text: '"The valuation is real. The structure is not. Clauses fourteen through nineteen. I need to walk you through what they actually do, not what they\'re called."',
        emotion: "knowing",
      },
      {
        speakerId: "theo",
        text: '"Fourteen — full ratchet anti-dilution. If the next round prices below this one, his shares re-price to the lower number as if he\'d always paid that. The down-round loss is transferred to you and the common stock. On a bad Series B, you personally go from forty percent to eleven."',
        emotion: "serious",
      },
      {
        speakerId: "theo",
        text: '"Sixteen — founder reverse-vesting over five years. You already own your shares. This clause says you\'ll lose them over time unless you stay, and that Vaughn can trigger a \'material breach\' at his sole discretion. He can define breach as \'missing guidance\' and take your equity back. The founder becomes an employee of his own cap table."',
        emotion: "serious",
      },
      {
        speakerId: "theo",
        text: '"Eighteen — drag-along at his discretion. If anyone offers to buy the company on terms he likes, he can force you and every other shareholder to sell. You lose the right to say no to an exit."',
        emotion: "serious",
      },
      {
        speakerId: "theo",
        text: '"Nineteen — key-man clause. You\'re named as key man, which sounds flattering. It means if you get hit by a bus, his protections multiply. But paired with sixteen, it means he can remove you AND still keep the key-man protections that were supposed to protect you. It\'s a trap built out of two friendly-looking paragraphs."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Clause-burial. Every one of these, in isolation, is defensible — some founders have signed them and survived. Stacked together, they describe one thing: a man who has priced control higher than capital. He's not funding the company. He's buying the option to take it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "negotiate-hard",
        text: "Tell Theo to draft a redline. Cap the ratchet to broad-based weighted average. Strip reverse-vesting. Drag-along triggered only by majority of common. Strike the key-man asymmetry.",
        tactic: "This is the real negotiation. You're not asking to 'soften' — you're replacing predator structure with standard structure.",
        nextSceneId: "the-redline",
        isOptimal: true,
      },
      {
        id: "compromise-two-four",
        text: "Fight two of the four. Ratchet and drag-along. Accept reverse-vesting and key-man to get the deal done.",
        tactic: "Compromising on the wrong two is worse than signing — you keep the company but lose control on Series B.",
        nextSceneId: "partial-surrender",
      },
      {
        id: "walk-tonight",
        text: "Don't counter. Email Vaughn in the morning that it's not a fit.",
        tactic: "Walking without a counter skips the diagnostic — you'll never know if he was negotiable.",
        nextSceneId: "walk-clean",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4 — the redline and Vaughn's response
  // ---------------------------------------------------------------------
  {
    id: "the-redline",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["vaughn", "theo"],
    dialog: [
      {
        speakerId: null,
        text: "Wednesday, 2pm. You and Theo across from Vaughn and his associate in a conference room Vaughn owns. You hand him the redline.",
      },
      {
        speakerId: null,
        text: "He reads it the way he pours wine. Unhurried.",
      },
      {
        speakerId: "vaughn",
        text: '"These are aggressive asks for a first-time founder."',
        emotion: "cold",
      },
      {
        speakerId: "theo",
        text: '"They\'re standard asks. Broad-based weighted average is market. No reverse-vesting on already-owned founder shares is market. Drag triggered by majority-of-majority is market. We\'re asking you to price this deal the way every other Series A in this sector priced last quarter."',
        emotion: "knowing",
      },
      {
        speakerId: "vaughn",
        text: '"I think we\'re not a fit."',
        emotion: "cold",
      },
      {
        speakerId: null,
        text: "He stands. Shakes your hand — the warmth is gone, the grip is the same. He leaves.",
      },
      {
        speakerId: "inner-voice",
        text: "That's the tell. Not that he walked — that the warmth disappeared the instant paper changed. A real investor says 'let me take these back to my partners'. A predator says 'we're not a fit' because the negotiable terms were the ones he wrote for you to negotiate. The ones he wouldn't budge on were the ones that mattered.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-the-line",
        text: "Let him leave. Don't chase. Go back to the office and call two other funds.",
        tactic: "Silence after a predator's walkout is the highest-value signal you can send. He will be back or he won't; either answer is useful.",
        nextSceneId: "the-callback",
        isOptimal: true,
      },
      {
        id: "soften-now",
        text: "Follow him to the elevator. 'Lawrence — tell me which three clauses are actual deal-breakers.'",
        tactic: "Chasing after a predator's walkout teaches him that walking works. Every future negotiation uses this lever.",
        nextSceneId: "he-resets-terms",
      },
      {
        id: "burn-it",
        text: '"Lawrence — for the record, your term sheet was predatory." Say it in front of his associate.',
        tactic: "Public moral framing burns the relationship and marks you in his network. The associate is not your ally and will not remember it the way you will.",
        nextSceneId: "burned",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5 — the callback
  // ---------------------------------------------------------------------
  {
    id: "the-callback",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "Forty-eight hours later. Friday afternoon — the supposed LP window has 'closed'. Your phone rings. Vaughn, personal line.",
      },
      {
        speakerId: "vaughn",
        text: '"I spoke with my partners. We can move on the ratchet — broad-based weighted average is acceptable. We can restructure the key-man. On reverse-vesting, we\'d like to discuss a three-year single trigger. On drag, we can accept majority-of-majority with a floor."',
        emotion: "neutral",
      },
      {
        speakerId: "vaughn",
        text: '"I\'d like to send revised documents by Monday. No calendar pressure this time."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The LP window was a lie. It was always a lie. Reverse-vesting is still the one he's trying to keep — that tells you it was the point of the entire structure. He didn't want the company; he wanted the option to remove the founder. Everything else was padding.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You now have three options: continue and extract a clean deal, take the diligence you've earned about him and walk anyway, or use his callback as leverage with a different fund that has already been slower and saner.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "continue-clean",
        text: '"Send the revised documents. Strike reverse-vesting entirely or we\'re done. Everything else we can discuss in counsel."',
        tactic: "The one he won't budge on is the one that reveals him. Making it the condition forces full disclosure.",
        nextSceneId: "ending-renegotiated",
        isOptimal: true,
      },
      {
        id: "use-as-leverage",
        text: "Call the second fund you've been talking to. Tell them you have a live Series A term sheet and need a response in five business days.",
        tactic: "Vaughn's paper becomes a weapon in a different negotiation. Clean exit, better investor.",
        nextSceneId: "ending-walked-better",
      },
      {
        id: "accept-his-terms",
        text: '"Monday works. I\'ll sign whatever the revised version looks like."',
        tactic: "You just collapsed in a negotiation you were winning. Predators remember the man who folds on the callback.",
        nextSceneId: "ending-signed",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 6 — bad branches
  // ---------------------------------------------------------------------
  {
    id: "seduced-in",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "Vaughn orders another bottle. The conversation moves to your childhood, your father, the difference between a founder and a CEO.",
      },
      {
        speakerId: "vaughn",
        text: '"Most men at your stage don\'t understand what they\'re really signing up for. You do. That\'s why this will work."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Paternal predation. He is not your father. The warmth is a grooming frame for a document you haven't read. By the time dessert lands, the 72-hour clock will feel like a reasonable constraint instead of a weapon.",
        emotion: "sad",
      },
    ],
    nextSceneId: "night-skim",
  },

  {
    id: "he-retracts",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: "vaughn",
        text: '"I\'ll be candid. The above-market valuation was conditional on this being a warm, fast deal. If we\'re going to negotiate terms adversarially, the number drops to sixteen pre and we re-price the whole structure."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "You played cold and he reset the anchor down. In this kind of room, cold is a losing hand — what you needed was warm, specific, and slow. You gave him an excuse to show you less paper, not more.",
        emotion: "sad",
      },
    ],
    nextSceneId: "night-skim",
  },

  {
    id: "night-skim",
    backgroundId: "office",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "1am. You've read 47 pages twice. You're tired. The language starts to blur — 'subject to clause 4.2(iii)' loops back to 'as defined in section 7.1(b)' which loops back to another section you read an hour ago.",
      },
      {
        speakerId: null,
        text: "You decide you'll trust the big numbers and sign.",
      },
      {
        speakerId: "inner-voice",
        text: "Clause-burial works because exhausted founders trust headlines. The valuation is the headline. The kill switch is in paragraph 16.c.ii. You are reading, but you are not reading.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-signed",
  },

  {
    id: "partial-surrender",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["theo"],
    dialog: [
      {
        speakerId: "theo",
        text: '"If you sign this, you own the company until Series B. At Series B, any down-round — which is half of all down rounds — the ratchet converts and you lose the board. The reverse-vesting means if you push back, he triggers \'breach\' and takes your shares. You survive on his mood."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Reverse-vesting trap. You kept two of the four dangerous clauses because the negotiation felt productive. Predators offer real concessions on the decoys to preserve the weapons. You optimised for 'getting the deal done' and got a deal that ends with your replacement.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-signed",
  },

  {
    id: "he-resets-terms",
    backgroundId: "office",
    mood: "cold",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: "vaughn",
        text: '"I\'ll give you the ratchet and the drag. I need the reverse-vesting and the key-man. Non-negotiable."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "You chased him to the elevator and he gave you the two you didn't care about while keeping the two that define control. This is exactly how the split would have gone if you'd held the line — except now he knows you can be pulled back.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-signed",
  },

  {
    id: "walk-clean",
    backgroundId: "office",
    mood: "mysterious",
    dialog: [
      {
        speakerId: null,
        text: "You email Vaughn at 7am: not a fit, thanks for the time, good luck with the fund.",
      },
      {
        speakerId: null,
        text: "No counter, no redline, no diagnostic pressure. He reads it and moves on. You'll never know whether the ratchet and the drag were real or theatre.",
      },
      {
        speakerId: "inner-voice",
        text: "Walking is clean. Walking without a counter is missing information. A well-written redline to a predator is free intelligence — his response tells you everything about him. You traded intelligence for the comfort of not having to talk to him again.",
        emotion: "serious",
      },
    ],
    nextSceneId: "ending-walked-blind",
  },

  {
    id: "burned",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["vaughn"],
    dialog: [
      {
        speakerId: null,
        text: "The associate's face doesn't move. Vaughn's does — a small, private smile. He nods once and leaves.",
      },
      {
        speakerId: "inner-voice",
        text: "You just told a man with a network that he is predatory in front of his junior. He is not embarrassed — he is cataloguing. Within three weeks the story in his circles is 'the founder is emotional, the deal was reasonable'. In venture, the man who calls out predation last, calmly, wins the narrative. The man who calls it out loudly, first, hands the narrative to the accused.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-marked",
  },

  // ---------------------------------------------------------------------
  // PART 7 — optional RYKER callback (layered into the good ending)
  // ---------------------------------------------------------------------
  {
    id: "ryker-callback",
    backgroundId: "office",
    mood: "peaceful",
    presentCharacterIds: ["ryker"],
    dialog: [
      {
        speakerId: null,
        text: "Six weeks after the Vaughn deal closes — clean, re-papered, reverse-vesting stripped — your phone buzzes. Unknown number, text only.",
      },
      {
        speakerId: "ryker",
        text: '"Heard about the Series A. Congrats. Shoulda been me on the cap table. No hard feelings. Coffee soon?"',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "The cofounder you walked from a year ago. Same grammar he used then: fast, familiar, a small pressure ask dressed as warmth. 'Coffee soon' with no day. The hoovering pattern is the same whether it's a woman or a business partner — the nervous system remembers the dose.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You don't reply. He's not the lesson anymore — he's the proof of the lesson. The man you didn't sign with twelve months ago is the same shape as the man you just outmanoeuvred. You are not a different man. You just read earlier.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-renegotiated-final",
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-renegotiated",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    dialog: [
      {
        speakerId: null,
        text: "Monday. The revised documents arrive. Reverse-vesting stripped. Ratchet broad-based. Drag majority-of-majority. Key-man clean.",
      },
      {
        speakerId: "inner-voice",
        text: "He priced the relationship correctly once you priced yourself correctly. That's the whole game.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ryker-callback",
  },

  {
    id: "ending-renegotiated-final",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Read the Paper",
    endingSummary:
      "You got the money. You kept the company. The four million cleared Monday; the reverse-vesting that would have made you an employee of your own cap table never happened, because you read the clause, named it, and refused. Vaughn remained an investor — polite, competent, and no longer dangerous, because the terms that made him dangerous are gone. Two years later, at Series B, the down-round that would have destroyed you under the original ratchet costs you fifteen percent of your stake instead of thirty-seven. You never forget the sentence at the restaurant — 'you have the temperament' — and you never again mistake the anaesthetic for the surgeon's opinion of you. The man funding you and the man replacing you can be the same man; his signature decides which. You decided.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Power is the willingness to be difficult about paper. Every founder who fails here was warm where they should have been exact.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-walked-better",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Slower Fund",
    endingSummary:
      "Four months later, a different fund — one that took three meetings and asked questions Vaughn never asked — leads your Series A at $18M pre. Lower valuation, cleaner structure, no reverse-vesting, no discretionary drag. You raise less on paper and keep more in reality. The fund partner turns out to be the kind of man who texts 'take the weekend' when things are tense and doesn't call on Sundays. You cross paths with Vaughn twice at industry events. Both times he is warm and both times you are briefer than he expects. Three years in, you hear from a friend that a different founder signed Vaughn's original structure and was replaced in year three exactly as the clauses were designed to allow. The sentence 'you have the temperament' is, you realise, something he says to everyone — and it only stays true for the ones who act like they heard it correctly.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The fund that moves slowly is pricing you with information. The fund that moves in seventy-two hours is pricing you with adrenaline.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-signed",
    backgroundId: "office",
    mood: "danger",
    immersionTrigger: "defeat",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Employee of Your Own Company",
    endingSummary:
      "Year one: the four million lands, the office triples in size, you hire aggressively, the metrics are good. Vaughn is warm at every board meeting. Year two: growth slows. Vaughn's questions sharpen. You miss a quarter on guidance you didn't write. Year three: the Series B prices at a haircut. The full ratchet converts. Your stake drops from forty percent to eleven, the board reshuffles, Vaughn's allocation grows. In March, at a dinner he hosts, he tells you — warmly, paternally — that the board is bringing in a professional CEO and that your contribution 'as founder' will be memorialised in a generous transition package. The reverse-vesting clawback triggers on 'material breach of performance covenants'. You leave the company you built with eleven percent, a two-year non-compete, and an NDA that forbids you from explaining what happened. In the first public write-up, Vaughn is quoted calling you 'an extraordinary first-chapter founder'. You understood the sentence at the restaurant three years too late.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Key-man weaponisation. Reverse-vesting trap. Ratchet cascade. All written in a document you skimmed. This is how founders are replaced — not by palace coups, but by paragraphs.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-walked-blind",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Runway Lost",
    endingSummary:
      "You walked without countering. Vaughn moves on in an hour. The second fund you were courting slows down when they hear no term sheet is live — they interpret your absence of paper as weakness, not restraint. Eleven weeks later your runway hits the red zone. You raise a bridge from existing angels at a flat — not a Series A, a survival round — and spend the next nine months diluted and under-resourced. The company survives. You are intact. The investors you walked from were probably predators; the one you didn't get the diagnostic on was definitely a loss. A redline that took Theo an evening to draft was the difference between 'walked cleanly' and 'walked blind'. The lesson is not that you shouldn't have walked — it's that walking without counter is leaving evidence on the table.",
    failureBlogSlug: "narcissist-playbook-how-they-actually-operate",
    failureBlogTitle: "Narcissist Playbook: How They Actually Operate",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Walking is a move. Walking with a counter on record is a better move. The counter is not for him — it's for you, in the next room, with the next investor.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-marked",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Marked in the Network",
    endingSummary:
      "Within a month, three different funds have declined meetings. The reasons given are always civil — 'not a fit right now', 'portfolio overlap'. The real reason is that a quiet sentence is circulating in a handful of WhatsApp threads you will never be on: 'emotional founder, took Lawrence's term sheet personally, not investable'. Vaughn is never the one who said it. He didn't have to. You called out predation loudly and first, and in the venture economy the man who called it out owns the smell, not the man who wrote the clauses. You raise eventually, two tiers down, from a fund that doesn't talk to Vaughn's network. The company survives. Your reputation is a decade-long recovery project.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naming predation is correct. Naming it loudly, publicly, with the predator's junior present is how you hand him the narrative. The calm redline kills him. The public accusation crowns him.",
        emotion: "sad",
      },
    ],
  },
];

export const businessMission5: Scenario = {
  id: "b5-predatory-term-sheet",
  title: "The Predatory Term Sheet",
  tagline:
    "The man funding you and the man replacing you can be the same man. His signature decides which.",
  description:
    "Four million, twenty pre, above market. A patrician investor who says 'you have the temperament'. A 72-hour LP window. And, buried between page 23 and page 31, four clauses that together describe one thing: a man who has priced control higher than capital. You are not being funded. You are being optioned. This is the final Business Line lesson — paper is a weapon, warmth is its anaesthetic, and founders who don't read their own contracts are fired from the thing they built. Read the clauses. Name the urgency. Hold the line. Or become an employee of your own company.",
  tier: "premium",
  track: "male-business",
  level: 3,
  order: 2,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "business",
  xpReward: 250,
  badgeId: "read-the-paper",
  startSceneId: "the-offer",
  tacticsLearned: [
    "Reading power asymmetry in legal documents",
    "Recognising urgency manipulation as a closing weapon",
    "Warm firmness in high-stakes negotiation",
    "Using a redline as a diagnostic, not just a demand",
    "Holding silence after a predator's walkout",
    "Separating the decoy clauses from the weapon clauses",
  ],
  redFlagsTaught: [
    "Paternal predation ('you have the temperament')",
    "Clause-burial across cross-referenced sections",
    "Full ratchet anti-dilution as founder-dilution weapon",
    "Founder reverse-vesting as a clawback trap",
    "Drag-along at investor discretion",
    "Key-man weaponisation paired with removal rights",
    "Fabricated LP windows as 72-hour urgency closers",
  ],
  characters: [VAUGHN, THEO, RYKER, INNER_VOICE_M],
  scenes,
};

export default businessMission5;
