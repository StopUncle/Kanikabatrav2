/**
 * Business Line. Mission 4 "The Charming Cofounder"
 *
 * Teaches: love-bombing in business contexts. Timeline pressure as a
 * tell. Reference friction as the real diligence. Walking away as a
 * skill most men never learn.
 *
 * Why it matters: every entrepreneur meets this guy. Most sign because
 * the opportunity looks too good. Two years later: litigation, dilution,
 * shame. The charm is the alarm.
 *
 * Failure routes → "Love-Bombing Signs Warning" (primary),
 * "Dark Triad Personality Types" (secondary).
 */

import type { Scenario, Scene } from "../../types";
import { RYKER, THEO, COLE, INNER_VOICE_M } from "../../characters-male";

const scenes: Scene[] = [
  // ---------------------------------------------------------------------
  // PART 1, the coffee
  // ---------------------------------------------------------------------
  {
    id: "the-coffee",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["ryker"],
    dialog: [
      {
        speakerId: null,
        text: "Tuesday, 9:02am. The café on the ground floor of his building. He's already ordered for you, the exact drink you mentioned once in a DM three weeks ago.",
      },
      {
        speakerId: "ryker",
        text: '"You made it. I\'ve been looking forward to this for eight months, genuinely. I told my wife last night, I think I finally found the guy."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "Eight months. You've known him three weeks. The clock he's describing doesn't exist, that's future-faking in business register. Mark the time. It's 9:02. Watch how fast the temperature climbs.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "stay-watchful",
        text: "Smile. Let him talk. Say little. Measure the first ten minutes against what you actually know about him.",
        tactic: "Calibration posture. Don't match his energy. Match your own.",
        nextSceneId: "the-love-bomb",
        isOptimal: true,
      },
      {
        id: "match-warmth",
        text: '"Man, likewise. I\'ve been excited about this." Warm him back.',
        tactic: "Matching his heat is how you lose your temperature reading.",
        nextSceneId: "the-love-bomb",
      },
      {
        id: "compliment-back",
        text: '"Your track record is insane. I should be the one thanking you."',
        tactic: "Flattering back resets the frame, he chose you; you chose him. Two-way pedestal is a trap.",
        nextSceneId: "the-love-bomb",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 2, the love-bomb
  // ---------------------------------------------------------------------
  {
    id: "the-love-bomb",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["ryker"],
    immersionTrigger: "manipulation-detected",
    dialog: [
      {
        speakerId: "ryker",
        text: '"Okay, real talk. I pulled your resume, I pulled the piece you wrote in 2022, I pulled the two decks you did at your old shop. You\'re the only person in this city who thinks about distribution the way I do."',
        emotion: "happy",
      },
      {
        speakerId: "ryker",
        text: '"I know Marcus. I know Dani. I know the guy who taught you pricing. It\'s like we\'ve been running in the same lane for a decade and never collided."',
        emotion: "seductive",
      },
      {
        speakerId: "ryker",
        text: '"I\'ve got a name. I\'ve got a term sheet template. I want to sign an LLC by Friday. 60/40, me majority, because I\'m bringing the first round of capital and the brand but you get full operational control. The window on this opportunity is narrow. Forty days, maybe less."',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "Count the tells. Four minutes in: excessive praise, name-dropping three contacts to mirror you, future-faking (eight months), idealisation (the ONLY person), fabricated urgency (Friday, forty-day window), and a pre-structured split that advantages him. This is a dating love-bomb with a cap table attached. A real partnership doesn't compress, it expands.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "slow-roll-hard",
        text: '"I take thirty days minimum on any partnership. Here\'s what I need: three unfiltered references, two of which I pick, your last two cap tables, and a six-month working trial before any equity moves."',
        tactic: "The counter-pace. Slow-rolling a pressure-applier is the whole test, his reaction to the slow-roll IS the diligence.",
        nextSceneId: "ryker-reacts",
        isOptimal: true,
      },
      {
        id: "ask-references",
        text: '"Love the energy. Can you send me three references today? I want to make calls before we go further."',
        tactic: "Asking for references is right, but without time-locking the rest you're still inside his frame.",
        nextSceneId: "reference-stall",
      },
      {
        id: "bring-theo",
        text: '"Before I respond. I never make moves this size without my CFO Theo in the room. Can we reconvene Thursday, three-way?"',
        tactic: "Bringing your ally is a legitimate pressure break. A good operator welcomes it. A predator resents it.",
        nextSceneId: "theo-meeting",
        isOptimal: true,
      },
      {
        id: "polite-stall",
        text: '"Let me think about it over the weekend and come back Monday."',
        tactic: "A polite stall isn't a stall, it's a yes with a delay. He'll tighten the pressure to collapse the weekend.",
        nextSceneId: "weekend-squeeze",
      },
      {
        id: "sign-now",
        text: '"Honestly, let\'s do it. Ink it Friday. I\'m in."',
        tactic: "You just signed a cap table during a coffee. This is how founders lose companies before they start them.",
        nextSceneId: "ending-signed",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3A, optimal: Ryker reacts to the slow-roll
  // ---------------------------------------------------------------------
  {
    id: "ryker-reacts",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["ryker"],
    shakeOnEntry: "revelation",
    dialog: [
      {
        speakerId: null,
        text: "For half a second, his face goes flat. No smile. No charm. Just a calculation. Then, inside a breath, the smile is back, wider than before.",
      },
      {
        speakerId: "ryker",
        text: '"Thirty days. Okay. Okay, I respect it, really. Look, I get it, due diligence, I\'d want the same."',
        emotion: "happy",
      },
      {
        speakerId: "ryker",
        text: '"The only thing is, the window I\'m talking about isn\'t me, it\'s the market. You know how these things close. If we\'re slow-rolling, I might have to keep talking to a couple other guys in parallel. Just to keep options open. No pressure on you."',
        emotion: "smirking",
      },
      {
        speakerId: "inner-voice",
        text: "The half-second flat face. That was him. The smile is the mask reassembling. And now, the soft threat dressed as logistics: 'I might have to talk to others'. That's the dating pattern where the love-bomber suddenly mentions their ex to keep you uncertain. You just watched a charming cofounder turn into a pressurer in one sentence. Your instruments are reading correctly. Trust them.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "hold-the-line",
        text: '"Talk to whoever you need to. My terms are my terms. Send the references by Friday and we can book a call next week."',
        tactic: "The line holds. You just revealed you're not coercible, which is exactly the information he didn't want you to have about yourself.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "meet-halfway",
        text: '"Okay, how about fifteen days, 50/50, and I skip the working trial?"',
        tactic: "Splitting the difference with a pressurer is how you get the worst of both worlds. He wanted you to negotiate down from your line.",
        nextSceneId: "fifty-fifty-trap",
      },
      {
        id: "apologise-and-soften",
        text: '"Sorry, I know I sounded rigid, let me loosen that. Maybe I don\'t need the working trial, just the references?"',
        tactic: "Apologising for your own boundary is the exact move he was waiting for. You just handed him the frame back.",
        nextSceneId: "ending-diluted",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3B, bringing Theo (also optimal)
  // ---------------------------------------------------------------------
  {
    id: "theo-meeting",
    backgroundId: "office",
    mood: "professional",
    presentCharacterIds: ["ryker", "theo"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday, 2pm. Conference room. Ryker has brought a laptop, a printed term sheet, and a bottle of sparkling water for each person. Theo has brought a legal pad and a pen.",
      },
      {
        speakerId: "ryker",
        text: '"Theo, huge fan of your work at the previous fund. Let me walk you through the structure."',
        emotion: "happy",
      },
      {
        speakerId: "theo",
        text: '"Before the structure, who did your last two cap tables? And who was your co-founder on the 2023 venture that dissolved?"',
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Ryker pauses. His hand goes to the water bottle and doesn't pick it up.",
      },
      {
        speakerId: "ryker",
        text: '"The 2023 thing, that was a creative differences situation. My co-founder was a good guy who couldn\'t scale. I can get you his number but he\'s travelling."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Theo asked the question you couldn't ask without sounding cold. Watch Ryker's tell, hand to bottle, no lift. The reference 'is travelling'. That's the second-most-common phrase in the love-bomber's handbook after 'my ex was crazy'. A real former co-founder picks up. A burned former co-founder hides.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "theo-pushes",
        text: '"I\'ll wait for him to land. I also want his two direct reports from that venture, not just him. No movement on the LLC until those calls happen."',
        tactic: "Insisting on sideways references, not just the one the founder picks, is how you find the story he doesn't want told.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "accept-traveling",
        text: '"Fair enough. Give me his number, I\'ll try him next week. In the meantime let\'s keep momentum on the docs."',
        tactic: "'Momentum on the docs' while references are pending is how you end up signed into a thing you haven't diligence'd.",
        nextSceneId: "ending-signed",
      },
      {
        id: "read-the-room",
        text: "Say nothing. Let Ryker fill the silence.",
        tactic: "The silence after a deflection is an X-ray. Most men rush to refill it.",
        nextSceneId: "ryker-fills-silence",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3C. Ryker fills the silence
  // ---------------------------------------------------------------------
  {
    id: "ryker-fills-silence",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["ryker", "theo"],
    dialog: [
      {
        speakerId: null,
        text: "The silence lasts nine seconds. Theo doesn't move. You don't move. Ryker smiles, looks at the ceiling, laughs a small laugh.",
      },
      {
        speakerId: "ryker",
        text: '"Okay, look. I\'m going to be transparent. There was a dispute. He says I pushed him out; I say he walked. It got ugly. I\'d rather we move forward without relitigating it. You know how these things are."',
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "'I'd rather move forward without relitigating it.' That's the sentence. A man who pushed someone out wants the question closed before you can ask it. A man who was walked out on begs you to call them. Ask yourself which this is.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "demand-the-call",
        text: '"I appreciate the honesty. I still need the call. Both sides. This week."',
        tactic: "Honesty under pressure is not the same as honesty. Demand the primary source or walk.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "accept-the-story",
        text: '"I appreciate you saying that. Let\'s keep moving."',
        tactic: "Accepting a self-serving summary in place of the actual reference is the moment the deal went bad.",
        nextSceneId: "ending-signed",
      },
      {
        id: "name-the-deflection",
        text: '"You just reframed a reference request as \'relitigating\'. Interesting word choice. Still need the call."',
        tactic: "Name the rhetorical move mid-sentence. A clean actor will respect the observation; a dirty one will escalate.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "end-meeting-think",
        text: "\"I'll think about it. Let's pause here for today.\"",
        tactic: "Take the decision out of the room. Pressure drops the moment you stop negotiating on his clock.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 4, reference friction + Cole calls unprompted
  // ---------------------------------------------------------------------
  {
    id: "reference-friction",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["cole"],
    dialog: [
      {
        speakerId: null,
        text: "Friday passes. No references. Monday, one of Ryker's three surfaces, warm, effusive, vague on specifics. 'He's brilliant. You'll love working with him. Details? Oh, we were early stage, hard to remember exactly.' Coached.",
      },
      {
        speakerId: null,
        text: "Tuesday evening. You're eating dinner. Your phone rings. Cole, a friend you haven't spoken to in six months.",
      },
      {
        speakerId: "cole",
        text: '"Hey, random call, sorry. I heard through Marcus you\'re talking to Ryker Cole. I\'m going to say this once and you can do whatever you want with it."',
        emotion: "serious",
      },
      {
        speakerId: "cole",
        text: '"Whatever you\'re talking to him about, run. I worked with him in 2022. He diluted my other co-founder through a clause nobody read. The charm is real. The outcome is always the same."',
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "An unsolicited warning from a man with nothing to gain is worth a hundred prepared references. Cole isn't guessing. He watched. Your instruments have now been independently verified by an outside observer. This is the closest thing to a signed note from the universe you will ever get.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "walk-clean",
        text: 'Send Ryker one message: "I\'ve decided not to move forward. Appreciate the time." No explanation. No debate.',
        tactic: "Walking away without explaining is a skill most men never learn. Explanation is an opening for renegotiation.",
        nextSceneId: "ending-walked",
        isOptimal: true,
      },
      {
        id: "confront-ryker",
        text: '"Cole told me what happened in 2022. I need your side."',
        tactic: "Confronting a practiced manipulator invites a practiced story. He will DARVO, deny, attack, reverse victim and offender and you'll walk out confused.",
        nextSceneId: "ryker-darvos",
      },
      {
        id: "dismiss-cole",
        text: "Dismiss it. Cole doesn't know the full picture. You've invested three weeks already, finish the diligence.",
        tactic: "Discounting a free, unsolicited, aligned warning is the sunk-cost fallacy wearing due-diligence clothes.",
        nextSceneId: "ending-signed",
      },
      {
        id: "delay-decide",
        text: "Don't decide yet. Tell Ryker you need another week, then another, then another. Let the conversation die from your end without ever closing it.",
        tactic: "Passive non-decision is a decision that costs you the months it takes to make. The deal won't happen, but neither will anything else you should have been building.",
        nextSceneId: "ending-wasted",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 5, side branch: confronting Ryker = he DARVOs
  // ---------------------------------------------------------------------
  {
    id: "ryker-darvos",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: ["ryker"],
    immersionTrigger: "red-flag-revealed",
    dialog: [
      {
        speakerId: "ryker",
        text: '"Cole told you that? Bro. I\'m so sorry you had to hear that. Cole is... complicated. He had a thing with my former co-founder\'s sister, it got messy, he\'s been trashing me in this city for two years."',
        emotion: "sad",
      },
      {
        speakerId: "ryker",
        text: '"Honestly? The fact that he called you unprompted tells me how badly he wants to keep me from winning. I\'m not going to defend myself against gossip. If you want out, I understand but know who\'s running that play."',
        emotion: "cold",
      },
      {
        speakerId: "inner-voice",
        text: "Textbook DARVO. Deny ('I won't defend against gossip'). Attack (smear Cole's character sideways, 'had a thing with the sister'). Reverse victim and offender (Cole's the bad guy, Ryker's the one being attacked). And the kicker, 'if you want out, I understand', giving you the exit so the story becomes 'you walked on me for no reason'. He's building the narrative for the next guy. You are now the crazy ex in Ryker's pitch to his next mark.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "walk-after-darvo",
        text: "Don't argue. Don't explain. End the call. Block the number.",
        tactic: "Never try to win the argument with a DARVO operator. The exit is the win.",
        nextSceneId: "ending-walked",
        isOptimal: true,
      },
      {
        id: "believe-ryker",
        text: '"That makes a lot of sense actually. Let\'s keep going."',
        tactic: "Believing the smoother story over the harder truth is the entire business model of this kind of man.",
        nextSceneId: "ending-signed",
      },
      {
        id: "one-line-out",
        text: '"Not moving forward. Best of luck." Hang up.',
        tactic: "Eight words and no opening for a reply. A DARVO operator needs a conversation to operate on. Close the channel.",
        nextSceneId: "ending-walked",
        isOptimal: true,
      },
      {
        id: "save-evidence",
        text: "Stay silent. Hit record. Let him talk. Hang up later.",
        tactic: "Document the pattern. Every DARVO script is the same, captured once, it's a reference for the next founder he targets.",
        nextSceneId: "ending-walked",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3D, bad branch: 50/50 compromise
  // ---------------------------------------------------------------------
  {
    id: "fifty-fifty-trap",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["ryker"],
    dialog: [
      {
        speakerId: "ryker",
        text: '"You know what. I hear you. 50/50. Done. Let\'s ink it. The operating agreement is already drafted, I\'ll have it over tonight."',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Why did he fold so fast? Because the ownership split was never the trap. The trap is in the operating agreement, the clauses around adverse events, dilution rights, and unilateral decisions. He doesn't care about 60/40 on paper if clause 19 routes control to him anyway. A man who 'drafted already' on day one designed the document before he knew you.",
        emotion: "sad",
      },
    ],
    nextSceneId: "ending-diluted",
  },

  // ---------------------------------------------------------------------
  // PART 3E, weekend squeeze
  // ---------------------------------------------------------------------
  {
    id: "weekend-squeeze",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["ryker"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 11:14pm. Three texts from Ryker: a news article about a competitor, a 'just a heads-up' about another candidate he's supposedly talking to, and a voice note.",
      },
      {
        speakerId: "ryker",
        text: '"Hey man, no pressure, enjoy your weekend, just, the other guy\'s flying in Monday and I\'d hate for us to miss each other on timing. Call me tomorrow if you can."',
        emotion: "seductive",
      },
      {
        speakerId: "inner-voice",
        text: "Three pressure vectors in one weekend. The competitor article is manufactured urgency. The rival candidate is manufactured scarcity. The voice note is manufactured warmth to soften the squeeze. 'No pressure' preceding pressure is the opposite of 'no pressure'.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ignore-weekend",
        text: "Reply Monday, business hours, on your schedule. Offer Friday afternoon.",
        tactic: "Refusing to let someone set your clock is the first test of whether you can cofound with them.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "call-sunday",
        text: "Call him Sunday morning. You don't want to lose the deal.",
        tactic: "Calling on his timeline teaches him he owns your weekends. That's the first lesson in the long course he'll teach you.",
        nextSceneId: "ending-signed",
      },
      {
        id: "no-reply-at-all",
        text: "Don't reply. Monday, pretend the texts never happened.",
        tactic: "Unacknowledged pressure becomes your pressure back. He'll surface it Monday in a way that tells you whether he heard the message.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "name-the-squeeze",
        text: 'Reply Sunday: "I don\'t take pressure over weekends. If the other guy\'s timing doesn\'t work, fine."',
        tactic: "Naming the squeeze out loud. If his deal can't survive you declining to work weekends, it couldn't survive a real company.",
        nextSceneId: "reference-friction",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PART 3F, reference stall
  // ---------------------------------------------------------------------
  {
    id: "reference-stall",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["ryker"],
    dialog: [
      {
        speakerId: "ryker",
        text: '"References, yes, absolutely. Two of them are travelling this week, one is in a sensitive transaction, but I\'ll get you names by end of next week. In the meantime let\'s keep momentum on the docs?"',
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "'Travelling' + 'sensitive transaction' + 'keep momentum on the docs'. That's a sentence optimised to produce paperwork before verification. A man with clean references sends them in twenty minutes. A man with dirty references schedules them for next Thursday.",
        emotion: "serious",
      },
    ],
    choices: [
      {
        id: "hold-firm",
        text: '"No docs until I\'ve spoken to three people who\'ve worked with you. That\'s the whole deal."',
        tactic: "Sequence discipline. Paper follows people, not the other way around.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "let-docs-move",
        text: '"Fair enough on the timing. Send the draft LLC through and we\'ll mark it up while we wait."',
        tactic: "Marking up a document is the first step toward signing one. The document is the anchor; the references were the anchor chain.",
        nextSceneId: "ending-signed",
      },
      {
        id: "source-own-references",
        text: "\"No worries. I'll find three people myself and we'll talk next month.\"",
        tactic: "Bypass his gated referee list. Primary sources he can't coach are the only sources worth asking.",
        nextSceneId: "reference-friction",
        isOptimal: true,
      },
      {
        id: "walk-on-stall",
        text: '"Then we\'re at an impasse. Thanks for your time." Stand up.',
        tactic: "Ryker is trying to run out the clock. Refuse to be on a clock. The deal that can't survive the sequence doesn't deserve it.",
        nextSceneId: "ending-walked",
        isOptimal: true,
      },
    ],
  },

  // ---------------------------------------------------------------------
  // ENDINGS
  // ---------------------------------------------------------------------
  {
    id: "ending-walked",
    backgroundId: "office",
    mood: "peaceful",
    immersionTrigger: "victory",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "You Walked",
    endingSummary:
      "You sent one line and nothing else. Ryker tried twice to reopen, a long explanation, a last-ditch 'I owe you the full picture over whiskey'. You didn't reply. He moved on to his next target inside three weeks. Eighteen months later you hear he burned another founder with the same pattern, and the same clauses, and the same 'my co-founder is travelling' story. You build the company clean with Theo. Walking away from a charming cofounder is the most expensive skill you will ever develop, and the cheapest thing you will ever do. The money you saved by not signing is invisible. The company you got to build because you didn't, is everything.",
    endingLearnReference: "love-bombing-signs-warning",
    endingLearnPrompt:
      "Walking is the skill. Study the pattern so you see it in four minutes next time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The opportunity that can't survive thirty days of diligence was never an opportunity. It was a trap with a timer.",
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
    endingTitle: "Two Years In",
    endingSummary:
      "You signed the LLC. Month three was brilliant, press, a seed round, momentum. Month nine he starts missing board meetings. Month fourteen he quietly moves the domain, the Stripe account, and the customer list to an entity you didn't know existed. Month eighteen you're in litigation. Month twenty-four you've been diluted to 8%, your lawyer's fees are approaching your personal savings, and Ryker is pitching the next company at a conference where the deck has a single co-founder on the team slide. You. You are the next deck's crazy ex. The charm was the alarm. You heard it in the first four minutes. You signed anyway.",
    failureBlogSlug: "love-bombing-signs-warning",
    failureBlogTitle: "Love-Bombing Signs Warning",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You knew at 9:06am on Tuesday. You signed on Friday. The gap between knowing and acting is where companies are lost.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-diluted",
    backgroundId: "office",
    mood: "tense",
    immersionTrigger: "defeat",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Clause 19",
    endingSummary:
      "50/50 on the cover page. Clause 19 on page 34. You didn't read it because the lawyer he recommended skimmed it for you. The clause gives Ryker unilateral decision rights on 'adverse dilution events', a term defined thirty pages earlier in a way you didn't understand and didn't ask about. Fourteen months in, he triggers the clause in a move so clean your own lawyer has to read it three times. You walk out with a number that was never what you signed for. You didn't lose the company, you handed it over, gift-wrapped in a document you compromised on because 60/40 felt greedy and 50/50 felt fair. Fairness was the bait. The document was the hook.",
    failureBlogSlug: "dark-triad-personality-types",
    failureBlogTitle: "Dark Triad Personality Types",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The split on page one is the magician's waving hand. The trick is on page 34. Always read the whole deck.",
        emotion: "sad",
      },
    ],
  },

  {
    id: "ending-wasted",
    backgroundId: "office",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Three Months Of Your Life",
    endingSummary:
      "You did the diligence. You slow-rolled. You asked for the references. You were cautious and correct. But you kept the conversation alive for three months. Each week a little more email, a little more pitch deck, a little more 'let's keep talking'. The deal never happened. Neither did anything else. While Ryker was circling you, you weren't building. You weren't hiring. You weren't shipping. You protected yourself from the knife and left the field fallow. Being right about a bad deal is not the same as being productive. The second skill, faster no, is the one most careful men never learn.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "A 'maybe' that lasts three months is a 'no' you were too polite to finish.",
        emotion: "sad",
      },
    ],
  },
];

export const businessMission4: Scenario = {
  id: "b4-charming-cofounder",
  title: "The Charming Cofounder",
  tagline:
    "Love-bombing in a pitch deck. The opportunity is too good because the man is too practiced.",
  description:
    "Ryker is magnetic. In four minutes he's praised your resume, name-dropped three mutuals, said he's been looking for you for eight months, and floated a 60/40 LLC he wants signed by Friday. Every entrepreneur meets this man. Most sign because the opportunity looks too good. Two years later: litigation, dilution, shame. The charm is the alarm. Your job is to hear it in the first four minutes and to do the hardest thing a founder ever learns to do, which is walk away from the deal that looked like the whole future.",
  tier: "premium",
  track: "male-business",
  level: 3,
  order: 1,
  estimatedMinutes: 10,
  difficulty: "intermediate",
  category: "business",
  xpReward: 175,
  badgeId: "the-walk-away",
  startSceneId: "the-coffee",
  tacticsLearned: [
    "Reading love-bombing in business register, future-faking, mirroring, idealisation",
    "Timeline pressure as the diagnostic, not the decision",
    "Reference friction, who surfaces, how fast, with what specifics",
    "Bringing your CFO to neutralise a pressure-applier",
    "Letting silence become an X-ray",
    "Walking away without explaining, the skill most founders never learn",
  ],
  redFlagsTaught: [
    "Fabricated history ('been looking for you eight months' when you've known him three weeks)",
    "Name-drop mirroring (dropping your contacts to manufacture shared lineage)",
    "Pre-drafted operating agreement on day one",
    "Pressure + scarcity + warmth in the same weekend text thread",
    "References 'travelling' plus coached surface references",
    "DARVO when confronted, smearing the unsolicited warner to preserve the pitch",
    "The clause on page 34 that undoes the cover page",
  ],
  characters: [RYKER, THEO, COLE, INNER_VOICE_M],
  scenes,
};

export default businessMission4;
