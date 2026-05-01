// The Mini Dark Mirror — free, email-gated, 12-question clinical
// assessment. The free front-door of the entire $10M roadmap funnel.
//
// Design philosophy:
//   1. Questions are scenario-based and CLINICALLY non-obvious.
//      A reader can't see "this is the narcissist option" on first
//      read — the DSM-5 / Hare PCL-R signatures are embedded in
//      the texture of each answer, not the topic.
//   2. Every question has six answer choices, one per axis. So
//      every axis gets twelve scoring opportunities and the
//      distribution is forced-balanced across questions.
//   3. The result rendering uses primary + secondary axis (top
//      two scoring axes) for a composed clinical synthesis rather
//      than a single-archetype label. Real intake summaries read
//      this way; Buzzfeed quizzes don't.
//   4. The Consilium tie-in on the result page is axis-tailored:
//      different content recommended per dominant axis.
//
// The full $9.99 quiz at /quiz remains the upsell — 20 questions,
// functioning level (high/moderate/low), and the clinical-grade
// long-form report. The mini's job is to be substantive enough
// that taking the full version feels like the natural next step.

import type {
  PersonalityType,
  QuizScores,
} from "@/lib/quiz-data";

// ============================================================
// Types
// ============================================================

export interface MiniAnswer {
  /** Stable ID. Format: "<questionId><a-f>" e.g. "1a". */
  id: string;
  /** The answer text shown to the user. */
  text: string;
  /** Which of the 6 axes this answer scores against. */
  axis: PersonalityType;
}

export interface MiniQuestion {
  id: number;
  /** Short eyebrow above the scenario (3-5 words). */
  title: string;
  /** The scenario. 2-3 sentences max. Concrete, present-tense. */
  scenario: string;
  /** Six answers. Order is fixed at write time but VARIED across
   *  questions so users can't pattern-match position to axis. */
  answers: MiniAnswer[];
}

export interface MiniDarkMirrorResult {
  scores: QuizScores;
  /** Top two axes. Used to compose the clinical synthesis. */
  dominantType: PersonalityType;
  secondaryType: PersonalityType;
  /** Resolved at request time so the email + page show the same
   *  archetype name without the page having to import quiz-data
   *  itself. */
  dominantName: string;
  dominantTagline: string;
  dominantDsmLabel: string;
  secondaryName: string;
}

// ============================================================
// The 12 questions
// ============================================================
//
// Coverage: each axis (psychopathic, sociopathic, narcissistic,
// borderline, histrionic, neurotypical) appears as exactly ONE
// answer choice per question. So every axis gets 12 scoring
// opportunities. Position-randomised within each question so the
// "neurotypical answer" isn't always option A.

export const MINI_QUIZ_QUESTIONS: MiniQuestion[] = [
  {
    id: 1,
    title: "The Death Text",
    scenario:
      "A close friend texts you that their parent just died. You're at work. In the first thirty seconds after reading the message, what's actually happening in your head?",
    answers: [
      {
        id: "1a",
        axis: "neurotypical",
        text: "You feel struck. You picture them. You decide to call rather than text back, because text would be too thin for this.",
      },
      {
        id: "1b",
        axis: "psychopathic",
        text: "You feel a cold clarity. You start mentally drafting what to say so it lands right when you call.",
      },
      {
        id: "1c",
        axis: "borderline",
        text: "You feel a wave of grief — but it's mostly your own parent flashing through your head, and what you'd be feeling if it was you.",
      },
      {
        id: "1d",
        axis: "narcissistic",
        text: "You're hit, briefly. Then you start thinking about who else needs to know, who's coordinating, whether you should be the one to organise it.",
      },
      {
        id: "1e",
        axis: "histrionic",
        text: "You feel an immediate spike of \"this could be me,\" then a small, embarrassed relief that it isn't. You're already thinking about how to tell your other friends.",
      },
      {
        id: "1f",
        axis: "sociopathic",
        text: "You're oddly calm. You want to know logistics — when, how, what's needed — before the feelings part lands.",
      },
    ],
  },
  {
    id: 2,
    title: "The Week Alone",
    scenario:
      "Your partner of two years says, with no warning, that they want to take a week alone to think. They say it gently. They mean it kindly. It's about them, not you. The first three hours after the conversation:",
    answers: [
      {
        id: "2a",
        axis: "borderline",
        text: "You go through every conversation in the last month for the moment you must have done something wrong. By hour two you're certain it's over.",
      },
      {
        id: "2b",
        axis: "neurotypical",
        text: "You sit with it. You feel the weight, but you trust the relationship enough to give them the week. You text once that night to say goodnight, then leave it.",
      },
      {
        id: "2c",
        axis: "psychopathic",
        text: "You're calm but watching. You note that this is unusual for them, decide to spend the week building optionality, and start a quiet inventory of who else has been checking in lately.",
      },
      {
        id: "2d",
        axis: "narcissistic",
        text: "The first thing you feel is a flash of insult — that they'd choose distance from you. Then a cooler thought: how would this look to others, and how do you frame it.",
      },
      {
        id: "2e",
        axis: "histrionic",
        text: "You cry, post a deliberately ambiguous story, then text three friends about it. You'll handle it once you've performed it.",
      },
      {
        id: "2f",
        axis: "sociopathic",
        text: "You shrug, say \"okay,\" start drinking by 6pm, and kiss someone in a bar by 11.",
      },
    ],
  },
  {
    id: 3,
    title: "Halfway Wrong",
    scenario:
      "You're halfway through an argument with someone you love, and you realize you're actually wrong. Like, factually wrong. The next minute of the conversation:",
    answers: [
      {
        id: "3a",
        axis: "narcissistic",
        text: "You pivot the framing. You weren't wrong about the thing — you were misunderstood about the thing, and they should have asked clearly. The moral high ground stays intact.",
      },
      {
        id: "3b",
        axis: "psychopathic",
        text: "You note the wrongness internally and file it. You don't concede now — that would weaken your position. You'll concede later in a context where it costs you less.",
      },
      {
        id: "3c",
        axis: "neurotypical",
        text: "You stop, take a breath, and say \"wait — I think I'm wrong about this. Let me think for a second.\" Even if it costs you the argument.",
      },
      {
        id: "3d",
        axis: "borderline",
        text: "A wave of shame hits you so hard that you're suddenly certain they're going to leave you over this. You over-apologise, then resent them for hours.",
      },
      {
        id: "3e",
        axis: "histrionic",
        text: "You shift register entirely. Voice softens, eyes water, the energy of the conversation flips so the topic becomes secondary to the emotion.",
      },
      {
        id: "3f",
        axis: "sociopathic",
        text: "You laugh, say \"yeah whatever, you got me,\" and stop engaging. You're not going to litigate it.",
      },
    ],
  },
  {
    id: 4,
    title: "The Stolen Idea",
    scenario:
      "In a meeting, a colleague presents an idea that's verbatim what you said to them in private last week. They don't credit you. The next ten seconds in your head:",
    answers: [
      {
        id: "4a",
        axis: "psychopathic",
        text: "You log it, neutrally. They've handed you leverage. You'll use it sometime in the next six weeks, when it's worth more than the current moment is.",
      },
      {
        id: "4b",
        axis: "borderline",
        text: "You're suddenly not sure whether you actually said it first. Maybe you imagined the conversation. By the end of the meeting you're convinced you've been making things up.",
      },
      {
        id: "4c",
        axis: "neurotypical",
        text: "A flash of irritation. Then a quieter thought: do I correct this in the room or after? You decide based on what's better for the actual project, not the credit.",
      },
      {
        id: "4d",
        axis: "narcissistic",
        text: "The irritation isn't quiet at all. You feel something close to rage — not at them, but at the idea that anyone in this room might not realise the original thought was yours.",
      },
      {
        id: "4e",
        axis: "histrionic",
        text: "You laugh, audibly, and say \"love it, I literally said this exact thing last week, ha!\" — confronting it through performance, charming the room.",
      },
      {
        id: "4f",
        axis: "sociopathic",
        text: "You stand up halfway through their presentation, walk out for coffee, and don't bring it up later. You're done with this colleague today.",
      },
    ],
  },
  {
    id: 5,
    title: "The Spike of Pleasure",
    scenario:
      "You catch yourself, briefly, enjoying a co-worker's misfortune — they got passed over, embarrassed in front of leadership, something. The thirty seconds after you notice the feeling:",
    answers: [
      {
        id: "5a",
        axis: "histrionic",
        text: "You feel the spike, then immediately want to tell someone — partly to share it, partly to test whether the laugh is yours alone or the group's.",
      },
      {
        id: "5b",
        axis: "psychopathic",
        text: "You don't notice the discomfort because there isn't any. You enjoyed it. That's the whole content of the moment.",
      },
      {
        id: "5c",
        axis: "neurotypical",
        text: "You feel uncomfortable about the feeling. You don't beat yourself up — schadenfreude is human — but you check yourself, and decide not to amplify it.",
      },
      {
        id: "5d",
        axis: "narcissistic",
        text: "You enjoyed it because they deserved it. The \"noticing\" is just confirmation that you've been right about them all along. The feeling is righteous.",
      },
      {
        id: "5e",
        axis: "borderline",
        text: "You feel the spike, then a wave of self-loathing about being the kind of person who feels spikes like that. The next hour is a full mood crash.",
      },
      {
        id: "5f",
        axis: "sociopathic",
        text: "You feel the spike, decide not to think about it further, and forget the moment by lunch. You don't introspect about feelings you didn't choose.",
      },
    ],
  },
  {
    id: 6,
    title: "The Honest Question",
    scenario:
      "Your therapist asks you, gently: \"What do you actually want?\" Not for the year. Not in this room. Generally. What's the honest first thing that comes up?",
    answers: [
      {
        id: "6a",
        axis: "narcissistic",
        text: "Recognition. To be seen, accurately and at scale, by people who would matter in the seeing.",
      },
      {
        id: "6b",
        axis: "neurotypical",
        text: "A specific image. Probably banal — a kitchen at 10am, your kid laughing about something, low-stakes. The kind of \"want\" that isn't strategic.",
      },
      {
        id: "6c",
        axis: "psychopathic",
        text: "A pause. You're aware the question is testing for emotional content. You pick something believable — security, autonomy, a career milestone. You're choosing it strategically.",
      },
      {
        id: "6d",
        axis: "borderline",
        text: "A long blank, then a flash of someone's face. Then panic that you don't have an answer that doesn't centre on a person.",
      },
      {
        id: "6e",
        axis: "histrionic",
        text: "A vivid scene — applause, a moment, a room turning to look. The specifics shift each time you imagine it. The shape of the want is the looking.",
      },
      {
        id: "6f",
        axis: "sociopathic",
        text: "You laugh and say \"honestly? Less of this.\" You mean the question, not the therapy. You don't want to do the work of articulating it.",
      },
    ],
  },
  {
    id: 7,
    title: "The Hallway",
    scenario:
      "You're about to walk into a room where ten people are going to evaluate you — interview panel, dinner with someone's family, audition, whatever. You're in the hallway. The minute before you walk in:",
    answers: [
      {
        id: "7a",
        axis: "psychopathic",
        text: "A flat alertness. Your body doesn't really do nerves anymore; you've trained it out. Pulse is steady, hands are dry, you're scanning the room before you even open the door.",
      },
      {
        id: "7b",
        axis: "histrionic",
        text: "A spike of energy, a quick mirror check, a dialled-up version of yourself by the time the door opens. You'll be on for the next two hours.",
      },
      {
        id: "7c",
        axis: "borderline",
        text: "Catastrophic. Your inner voice is full of \"they're going to see right through you.\" You almost don't open the door.",
      },
      {
        id: "7d",
        axis: "neurotypical",
        text: "A normal level of nerves. You take a breath, run through your three things to remember, push the door open.",
      },
      {
        id: "7e",
        axis: "narcissistic",
        text: "A clean confidence. You've done the work to deserve this room. The nerves are about logistics, not about whether you belong.",
      },
      {
        id: "7f",
        axis: "sociopathic",
        text: "A shrug. If they don't like you, fuck them. You walk in and don't really care what comes of it.",
      },
    ],
  },
  {
    id: 8,
    title: "The Vague Cancel",
    scenario:
      "Your closest friend cancels plans tonight, last minute, with a vague reason. Three days later, they still haven't proposed a reschedule. The texture of your thinking about them right now:",
    answers: [
      {
        id: "8a",
        axis: "borderline",
        text: "They're done with you. You can feel it. You write a long message in your head, draft it, delete it, draft it again. You haven't slept right since the cancel.",
      },
      {
        id: "8b",
        axis: "histrionic",
        text: "You text mutual friends to ask if they've heard from her, framing it as concern. You're partly concerned and partly auditing the gossip.",
      },
      {
        id: "8c",
        axis: "psychopathic",
        text: "Mild interest. You file it as data. You won't reach out — better to see what they do when they have to.",
      },
      {
        id: "8d",
        axis: "narcissistic",
        text: "A quiet, hot offence. You went out of your way for them last month. That kind of asymmetry doesn't just happen — it gets noticed and corrected.",
      },
      {
        id: "8e",
        axis: "neurotypical",
        text: "A small note that this is unusual for them. You assume there's something going on you don't know about, send a \"you good?\" text, leave them space to answer.",
      },
      {
        id: "8f",
        axis: "sociopathic",
        text: "You haven't thought about it. They'll surface eventually. You've been busy.",
      },
    ],
  },
  {
    id: 9,
    title: "The Wedding Question",
    scenario:
      "A stranger at a wedding asks you, casually, to describe yourself. They mean it lightly — small talk. You have about thirty seconds to answer. What actually comes out of your mouth?",
    answers: [
      {
        id: "9a",
        axis: "histrionic",
        text: "A story. A specific funny one, told well, that makes them laugh. By the end of it they don't actually know what you do, but they know they like you.",
      },
      {
        id: "9b",
        axis: "narcissistic",
        text: "A version that sounds modest but isn't. You undersell something specific so they have to push for the impressive part. By minute two they know you went to a good school.",
      },
      {
        id: "9c",
        axis: "psychopathic",
        text: "A frame that you've used before. Calibrated to the room — at this wedding, you lead with the warmest, most relational part. At a different wedding, different lead.",
      },
      {
        id: "9d",
        axis: "borderline",
        text: "A long pause, then something that doesn't quite cohere. You're aware as you're saying it that the words don't add up to a person. You change the subject.",
      },
      {
        id: "9e",
        axis: "neurotypical",
        text: "Your job, where you live, something about what you've been into lately. You don't try to make it a story. It's a stranger at a wedding.",
      },
      {
        id: "9f",
        axis: "sociopathic",
        text: "You shrug, say something terse and honest that closes the conversation, and refill your drink.",
      },
    ],
  },
  {
    id: 10,
    title: "The Three-Month Lie",
    scenario:
      "You've been lying to someone you love about something small — not catastrophic, but ongoing. You realise tonight that it's been going for three months. The honest content of the next twenty minutes inside your head:",
    answers: [
      {
        id: "10a",
        axis: "psychopathic",
        text: "A neutral assessment of risk. Probability of discovery, cost if discovered, cost of telling now. You don't feel guilty; you feel calculating.",
      },
      {
        id: "10b",
        axis: "neurotypical",
        text: "A real wave of guilt. You decide you'll tell them this week, not because you have to, but because the lying is contaminating something you care about.",
      },
      {
        id: "10c",
        axis: "narcissistic",
        text: "A justification. The lie was protective — of them, of the relationship, of yourself. You actually weren't wrong to do it. The problem is them needing to be lied to.",
      },
      {
        id: "10d",
        axis: "borderline",
        text: "Spiralling. By minute ten you're certain they're going to leave you over this. By minute fifteen you're rehearsing how to defend yourself in advance.",
      },
      {
        id: "10e",
        axis: "histrionic",
        text: "A craving to confess, dramatically. The performance of the confession would be cathartic. You start composing it before deciding whether to actually deliver it.",
      },
      {
        id: "10f",
        axis: "sociopathic",
        text: "You shrug. The lie is fine. You move on. You don't think about it again until next week when you tell another one.",
      },
    ],
  },
  {
    id: 11,
    title: "The Win",
    scenario:
      "You find out you got something you wanted — promotion, role, win. The first call you want to make is:",
    answers: [
      {
        id: "11a",
        axis: "narcissistic",
        text: "The person whose recognition will mean the most professionally. You're calling because you want them to know — and to know that you wanted them to know.",
      },
      {
        id: "11b",
        axis: "borderline",
        text: "You want to call your partner, but you're already worried that the win will threaten them. You delay the call. You're already half in advance-defence mode.",
      },
      {
        id: "11c",
        axis: "psychopathic",
        text: "You don't have a first call. You take a beat, sit with it, let yourself feel it for thirty seconds, then go back to the next thing.",
      },
      {
        id: "11d",
        axis: "neurotypical",
        text: "Your partner / closest friend / parent. Not to brag. Because you want the moment to land somewhere safe.",
      },
      {
        id: "11e",
        axis: "histrionic",
        text: "Multiple calls, in sequence, with the version of the story dialled up slightly each time. The win gets a little bigger by the fifth telling.",
      },
      {
        id: "11f",
        axis: "sociopathic",
        text: "You go to the bar. The win is yours. You'll tell people when you tell them.",
      },
    ],
  },
  {
    id: 12,
    title: "The Hotel Room",
    scenario:
      "You wake up alone in a hotel room, far from home, in a city you don't know. No work obligations until tomorrow afternoon. The first hour after waking:",
    answers: [
      {
        id: "12a",
        axis: "narcissistic",
        text: "An acute awareness of being unobserved. You feel the lack — the absence of anyone reflecting you back. It makes the room feel smaller.",
      },
      {
        id: "12b",
        axis: "neurotypical",
        text: "A small luxury. You stretch, look out the window, plan a slow day. The aloneness feels restful.",
      },
      {
        id: "12c",
        axis: "borderline",
        text: "A wave of unanchored emptiness. Without your people in proximity, you're not sure who you are. You spend the first hour texting, looking at photos.",
      },
      {
        id: "12d",
        axis: "psychopathic",
        text: "Operational. You start the day exactly the way you'd start it at home. The location is incidental. You're the same person in any room.",
      },
      {
        id: "12e",
        axis: "histrionic",
        text: "You're already imagining who'll be in the lobby, the bar, the hallway. The day's about who you'll meet and how you'll be remembered by them.",
      },
      {
        id: "12f",
        axis: "sociopathic",
        text: "You lie there for a while, get up when you feel like it, go find food. The day starts when you decide it does.",
      },
    ],
  },
];

// ============================================================
// Clinical synthesis content — written for non-Buzzfeed readability
// ============================================================
//
// Each axis has THREE pieces of content used in the result render:
//   1. dsmLabel: the diagnostic anchor (DSM-5 cluster + criteria)
//   2. primarySynthesis: ~140-word clinical paragraph for when this
//      axis is the DOMINANT one — reads like an intake summary.
//   3. secondaryNote: ~70-word note for when this axis is the
//      SECONDARY one — describes how it modifies the dominant axis.
//
// Voice on the page is clinical-detached. The follow-up email
// re-frames the same content in Kanika-personal voice for the
// parasocial bond.

export interface AxisClinicalContent {
  dsmLabel: string;
  primarySynthesis: string;
  secondaryNote: string;
}

export const AXIS_CLINICAL: Record<PersonalityType, AxisClinicalContent> = {
  psychopathic: {
    dsmLabel:
      "Cluster B / Hare PCL-R Factor 1 — primary affective psychopathy",
    primarySynthesis:
      "Your answers cluster around the primary-affect signature: shallow affect, low autonomic reactivity to threat, and a strategic relationship to the emotional content of social life. Where most people FEEL their way through scenarios and then narrate the feeling afterwards, you appear to do the reverse — you assess, then perform the appropriate emotion if the situation calls for one. This is the clinical hallmark of Hare's Factor 1: not the absence of feeling, but the management of it. In relationships, this shows up as a kind of measured distance — partners describe you as composed, hard to read, present without being porous. The strength is calibration. The cost is that the people closest to you may, over time, come to suspect that the warmth they receive is performed rather than felt — and they're not entirely wrong, even when the affection is real.",
    secondaryNote:
      "When primary-affect psychopathy sits as your secondary axis, it shows up as the cold spine inside whatever else you're doing — the part of you that stays operational when the dominant pattern is at full volume. It's the strategic discipline that keeps the rest of your operating system effective.",
  },
  sociopathic: {
    dsmLabel: "Cluster B / DSM-5 Antisocial PD — secondary, reactive subtype",
    primarySynthesis:
      "Your scoring sits in the secondary-psychopathy band — the reactive, impulsive, lower-affective-control end of the antisocial cluster. Unlike the primary-affect type, your emotional life is intense; you feel things quickly and act on them quickly. The DSM-5 Antisocial PD criteria you map most clearly onto are impulsivity (criterion 3), irritability and aggression (criterion 4), and reckless disregard for self (criterion 5). In relationships, this presents as a pattern of high-heat connection followed by abrupt disengagement — you don't lack feeling, but you don't tolerate the slow work of repair when something breaks. The strength is that you're authentic in a world of performers; what people get from you is real, even when it's brief. The cost is the bridges. They tend not to come back.",
    secondaryNote:
      "When the reactive subtype runs as your secondary, it's the impulse-to-action shortcut that takes over when the dominant pattern is overloaded. The version of you that bails, walks out of the bar, kisses the wrong person — not strategy, just velocity.",
  },
  narcissistic: {
    dsmLabel: "Cluster B / DSM-5 Narcissistic PD (301.81)",
    primarySynthesis:
      "Your answers cluster around the centrality reflex — the subtle organising principle in which the self is the natural reference point of any given situation. The DSM-5 NPD criteria you map most clearly onto are entitlement (criterion 5), interpersonal exploitation (criterion 6), and the cluster around grandiosity and admiration-seeking (criteria 1, 4). What makes this pattern non-obvious from the inside is that it doesn't feel like vanity; it feels like clarity. You see your own perspective with high resolution and other perspectives at lower resolution, which makes your version of events feel objectively correct. In relationships, this presents as a partner who is reliably present at moments of public success and reliably absent during quieter low-stakes intimacy. The strength is decisiveness — you act when others stall. The cost is that the people closest to you, over time, learn that bringing you small needs is rarely worth the cost of competing with the big version of you.",
    secondaryNote:
      "When the narcissistic axis runs secondary, it's the self-protective frame that activates under threat — the pivot to high ground when the dominant pattern can't handle being wrong. It keeps the ego intact while the rest of you adapts.",
  },
  borderline: {
    dsmLabel: "Cluster B / DSM-5 Borderline PD (301.83) — affective subtype",
    primarySynthesis:
      "Your answers cluster around the BPD affective signature: marked reactivity of mood, identity disturbance, and the abandonment-vigilance reflex (DSM-5 criteria 1, 3, and 6). What discriminates this pattern from ordinary emotional sensitivity is the speed and amplitude — a delayed text reads as a verdict, a partner's quiet evening reads as the beginning of the end, and the verdict arrives before the audit can. Identity diffusion shows up in your answers around self-description and the wedding-stranger scenario; your sense of self is felt most clearly in proximity to specific people, and least clearly when you're alone. In relationships, this presents as a pattern of intense closeness followed by sudden distance, often initiated by you in pre-emptive defence. The strength is depth — you feel things at a register most people only access in grief. The cost is that the people you love spend a lot of energy trying to hold both you and themselves at once.",
    secondaryNote:
      "When the borderline axis runs secondary, it's the abandonment-vigilance the rest of your operating system is quietly running underneath. It's why even the cold-affect parts of you check, twice, whether the relationship is still safe.",
  },
  histrionic: {
    dsmLabel: "Cluster B / DSM-5 Histrionic PD (301.50)",
    primarySynthesis:
      "Your answers cluster around the attention-coordinative signature of histrionic PD — emotional expression as an inherently relational act. The DSM-5 HPD criteria you map most clearly onto are theatrical and exaggerated emotional expression (criterion 6), discomfort when not at the centre of attention (criterion 1), and the rapid, shallow shifting of emotion (criterion 3). What makes this pattern non-obvious is that the emotion is real; it's not feigned. The performance and the feeling are running on the same circuit, which means the distinction matters less than people who don't have this pattern tend to assume. In relationships, this presents as a partner who is uncommonly fun, magnetic in groups, and harder than average to be alone with quietly. The strength is the room you walk into; you raise the temperature of any space. The cost is that intimacy without an audience can feel, even to you, like a stage with no lights — which is one of the cleanest signals of the pattern.",
    secondaryNote:
      "When the histrionic axis runs secondary, it's the relational instinct that turns whatever the dominant pattern is doing into something that lands in a room. It's the polish on the delivery, the timing on the joke, the presence in the moment.",
  },
  neurotypical: {
    dsmLabel: "Outside Cluster B — secure, integrated baseline",
    primarySynthesis:
      "Your answers don't cluster around any single Cluster B signature. The pattern that emerges is best described in the negative: you don't reflexively centre yourself, you don't reflexively perform, you don't reflexively catastrophise, and you don't reflexively disengage. The DSM-5 alternative model uses the term \"integrated personality functioning\" — coherent identity, stable self-direction, capacity for empathy without absorption, and the ability to hold intimacy without losing self in it. In relationships, this presents as someone who is steady. Not flat — steady. You feel the full range, but the range doesn't run you. The strength is that the people in your life experience you as reliable, which is a quietly rare resource. The blind spot — and there is one — is that you tend to assume good faith in others longer than the people around you have earned, which is the failure mode of the Cluster B-naïve operator. Calibration is the work, not suppression.",
    secondaryNote:
      "When neurotypical baseline runs secondary, it's the steady backstop under whatever the dominant pattern is doing. The capacity to course-correct, repair, hold a hard conversation without setting fire to the relationship.",
  },
};

// ============================================================
// Consilium tie-in content — axis-tailored
// ============================================================

export interface AxisConsiliumTie {
  /** Headline shown above the tile. ~7 words. */
  headline: string;
  /** 3 bullets, each ~12 words, naming actual Consilium content
   *  that's relevant for this axis. Honest content map, not
   *  marketing fluff. */
  bullets: string[];
  /** CTA button label. */
  cta: string;
}

export const AXIS_CONSILIUM_TIES: Record<PersonalityType, AxisConsiliumTie> = {
  psychopathic: {
    headline: "What works for the primary-affect operator",
    bullets: [
      "The Track-Toxic-Narc scenarios — your blind spot is partners who out-perform calibration.",
      "Voice notes on detection and exit, where Kanika's read of the pattern matches your own.",
      "Ask Kanika queue — your axis has the highest signal-to-noise of any cohort.",
    ],
    cta: "Step inside the Consilium",
  },
  sociopathic: {
    headline: "Built for the high-velocity operator",
    bullets: [
      "Simulator scenarios on impulse-to-action gaps and the bridges that don't burn.",
      "Voice notes on the difference between authenticity and reactivity.",
      "The forum, where the Wildcard cohort talks about repair after the heat fades.",
    ],
    cta: "Step inside the Consilium",
  },
  narcissistic: {
    headline: "For the centrality-reflex pattern",
    bullets: [
      "Track-Toxic-Narc — built specifically to reverse the centrality lens.",
      "Voice notes on quiet intimacy and how the Emperor pattern tolerates it.",
      "Classroom modules on receiving small needs without the cost asymmetry.",
    ],
    cta: "Step inside the Consilium",
  },
  borderline: {
    headline: "Built for the storm-pattern operator",
    bullets: [
      "Track-BPD — the only simulator track designed with mutual suffering in mind.",
      "Voice notes on Mirror-Bonding and Splitting (the two patterns most weaponised against you).",
      "Daily-insight feed weighted toward affective regulation and identity work.",
    ],
    cta: "Step inside the Consilium",
  },
  histrionic: {
    headline: "For the attention-coordinative operator",
    bullets: [
      "Voice notes on the difference between performance-and-feeling and performance-instead-of-feeling.",
      "Forum threads where the Siren cohort discusses intimacy without an audience.",
      "Track scenarios on the room-temperature you raise and the cost of always raising it.",
    ],
    cta: "Step inside the Consilium",
  },
  neurotypical: {
    headline: "For the integrated baseline",
    bullets: [
      "The simulator's Cluster-B Lab — pattern recognition for the operator who doesn't have the pattern.",
      "Voice notes on calibrating good-faith assumptions to the actual person across from you.",
      "Ask Kanika queue — your axis tends to ask the cleanest questions about the others.",
    ],
    cta: "Step inside the Consilium",
  },
};

// ============================================================
// Scoring + result construction
// ============================================================

/** Score a 12-answer record into 6-axis percentages. */
export function scoreMiniQuiz(
  answers: Record<number, PersonalityType>,
): QuizScores {
  const scores: QuizScores = {
    psychopathic: 0,
    sociopathic: 0,
    narcissistic: 0,
    borderline: 0,
    histrionic: 0,
    neurotypical: 0,
  };
  Object.values(answers).forEach((axis) => {
    scores[axis] += 1;
  });
  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  if (total === 0) return scores;
  return {
    psychopathic: Math.round((scores.psychopathic / total) * 100),
    sociopathic: Math.round((scores.sociopathic / total) * 100),
    narcissistic: Math.round((scores.narcissistic / total) * 100),
    borderline: Math.round((scores.borderline / total) * 100),
    histrionic: Math.round((scores.histrionic / total) * 100),
    neurotypical: Math.round((scores.neurotypical / total) * 100),
  };
}

/** Pick the dominant axis. Tiebreaks favour the more-discriminating
 *  Cluster B axes over neurotypical, then by cluster severity. */
export function pickDominantType(scores: QuizScores): PersonalityType {
  const order: PersonalityType[] = [
    "psychopathic",
    "sociopathic",
    "narcissistic",
    "borderline",
    "histrionic",
    "neurotypical",
  ];
  let best: PersonalityType = "neurotypical";
  let bestScore = -1;
  for (const t of order) {
    if (scores[t] > bestScore) {
      best = t;
      bestScore = scores[t];
    }
  }
  return best;
}

/** Pick the secondary axis — same as pickDominantType but excluding
 *  the dominant. Used for the composed clinical synthesis. */
export function pickSecondaryType(
  scores: QuizScores,
  dominant: PersonalityType,
): PersonalityType {
  const order: PersonalityType[] = [
    "psychopathic",
    "sociopathic",
    "narcissistic",
    "borderline",
    "histrionic",
    "neurotypical",
  ];
  let best: PersonalityType = "neurotypical";
  let bestScore = -1;
  for (const t of order) {
    if (t === dominant) continue;
    if (scores[t] > bestScore) {
      best = t;
      bestScore = scores[t];
    }
  }
  return best;
}

// Profile names + taglines, lifted from the existing PERSONALITY_PROFILES
// in lib/quiz-data.ts. We duplicate them here ONLY to avoid a circular
// import — the email template imports this file, and quiz-data is large.
const ARCHETYPE_NAMES: Record<PersonalityType, { name: string; tagline: string }> = {
  psychopathic: { name: "The Predator", tagline: "Cold. Calculated. Unstoppable." },
  sociopathic: { name: "The Wildcard", tagline: "Rules were made to be broken." },
  narcissistic: { name: "The Emperor", tagline: "I am the prize. Always." },
  borderline: { name: "The Storm", tagline: "Feel everything. Fear nothing." },
  histrionic: { name: "The Siren", tagline: "All eyes on me." },
  neurotypical: { name: "The Balanced", tagline: "Grounded in reality." },
};

/** Build the on-page result from a 12-answer record. The result
 *  contains everything the radar + clinical card + Consilium tile
 *  need to render. */
export function buildMiniResult(
  answers: Record<number, PersonalityType>,
): MiniDarkMirrorResult {
  const scores = scoreMiniQuiz(answers);
  const dominantType = pickDominantType(scores);
  const secondaryType = pickSecondaryType(scores, dominantType);
  const dominantArchetype = ARCHETYPE_NAMES[dominantType];
  const secondaryArchetype = ARCHETYPE_NAMES[secondaryType];
  return {
    scores,
    dominantType,
    secondaryType,
    dominantName: dominantArchetype.name,
    dominantTagline: dominantArchetype.tagline,
    dominantDsmLabel: AXIS_CLINICAL[dominantType].dsmLabel,
    secondaryName: secondaryArchetype.name,
  };
}
