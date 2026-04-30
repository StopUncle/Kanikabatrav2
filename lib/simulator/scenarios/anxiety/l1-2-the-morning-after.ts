/**
 * anxiety-1-2 — "The Morning After"
 *
 * Anxiety track, Level 1, order 2. Sam at the office at 9:07 a.m.
 * after one of the L1-1 endings. The Slack message resolved itself
 * thirty seconds ago — David walked over, said the copy was great,
 * said he just wanted to tighten the second paragraph on Monday.
 * The body that has carried the catastrophe-narrative for sixteen
 * hours now has to integrate that the catastrophe was not real.
 *
 * What this scene teaches:
 *   - The integration problem. The body that catastrophises is the
 *     same body, and now what. The lesson available in the
 *     resolved-worry gap is one of the most underused leverage
 *     points in CBT — a real-world disconfirmation of the
 *     catastrophising narrative, with the patient awake and
 *     standing in the office, available for metabolisation.
 *   - The five available stances at the moment of integration.
 *     Three of them lose the lesson. Two of them install the
 *     pattern shrinkage that is, across hundreds of trials, how
 *     the disorder gets quieter.
 *   - Naming the work to one trusted witness (partner, peer, or
 *     therapist's notebook) compounds the integration. The lesson
 *     metabolised alone is half-metabolised.
 *
 * Voice: outside-the-bed register. Office light, fatigue, ordinary
 * world. Kanika in italics still naming distortions and skills as
 * they pass.
 *
 * Cast: SAM (player), DAVID (briefly), MAYA, MIA (text), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. The body that ran the chemistry from 11 p.m. last night until 4 a.m. and the body that is now standing at a desk at 9:07 a.m. on four hours of sleep.",
  traits: ["sensitive", "in-treatment", "fatigued"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const DAVID: Character = {
  id: "david",
  name: "David Park",
  description:
    "Senior Partner at the agency. 47. Bad at affect on Slack. Coffee in hand. Walking past your desk on the way to his office.",
  traits: ["distracted", "warm-in-person", "tone-blind-on-text"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "friend",
  silhouetteType: "male-suit",
};

const MAYA: Character = {
  id: "maya",
  name: "Maya Patel",
  description:
    "27. Account strategist at the agency. In treatment for her own GAD; two years further into the work than you. Has not yet been told about your treatment.",
  traits: ["grounded", "warm", "in-recovery"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME — the integration problem
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "9:07 a.m. The office. You slept somewhere between three and five hours, depending on which skill you used or did not use last night. The Slack message that ate your evening was just resolved — David walked over, coffee in hand, said the copy was great, said he just wanted to tighten the second paragraph on Monday. He walked off. You are standing at your desk holding the resolution.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What happens in the next ninety seconds is one of the most underused leverage moments in CBT. The catastrophising staircase has just been disconfirmed by reality. The body that ran the chemistry for sixteen hours has been provided with evidence that the chemistry was responding to a stimulus that was not what the chemistry believed it was. This evidence is metabolisable. It is also dismissable. Five stances are available. Three of them lose the lesson. Two of them install the pattern shrinkage that is, across hundreds of trials, how the disorder gets quieter.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The desk.",
        tactic: "The scene opens.",
        nextSceneId: "the-resolution",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE RESOLUTION — David walks off
  // ===================================================================
  {
    id: "the-resolution",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["david"],
    dialog: [
      {
        speakerId: null,
        text: "He's already turning. He has half a sentence going to someone else as he walks. The exchange took eighteen seconds.",
      },
      {
        speakerId: "david",
        text: "Hey — Henderson copy is great by the way, just tighten up that second graf on Monday, I'll send notes. Catch you later.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "He's gone. The bullpen is making bullpen sounds — keyboards, the burr of the espresso machine, two people negotiating which conference room they have at 10. The light is the slightly-too-bright agency light. The coffee in your hand is your first of the day and you have not drunk it yet.",
      },
      {
        speakerId: null,
        text: "Your body, which has been carrying David-firing-narrative for sixteen hours, is now holding eighteen seconds of contradicting evidence. The body's first response is not relief. The body's first response is, weirdly, almost annoyance — the chemistry ran all night for THIS. The annoyance is itself a distortion. The chemistry didn't know. The chemistry was just doing chemistry.",
      },
      {
        speakerId: "inner-voice",
        text: "Five stances on what to do with the resolution. The stances are listed in approximate order of frequency. The first three lose the lesson. The last two are the work.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "dismiss",
        text: "Dismiss. 'Oh thank god, I was being crazy. Never mind.' Move on with the day.",
        tactic: "The most common stance, and the one that loses the lesson cleanest. The body experiences relief. The pattern is invisible. Same spiral fires next Slack message because the body did not metabolise what just happened. Costs a lesson. Does not damage anything else.",
        nextSceneId: "dismiss-1",
        isOptimal: false,
      },
      {
        id: "shame",
        text: "Beat self up. 'What is wrong with me. I am ridiculous. I lost a whole night of sleep over nothing.'",
        tactic: "The shame layer adds a second-order distortion to the first one. The body now has fatigue plus shame. Shame is itself anxiogenic. Loses the lesson AND damages the rest of the day.",
        nextSceneId: "shame-1",
        isOptimal: false,
      },
      {
        id: "tell-mia",
        text: "Text Mia briefly. 'Hey — last night I spiralled hard about David. He just came over and said the copy was fine. Bigger than I let on. Love you.'",
        tactic: "Naming the work to a trusted witness compounds the integration. Mia replies with one sentence that lands as ground. The body metabolises with a witness present. Three sentences cost nothing and save the lesson.",
        nextSceneId: "tell-mia-1",
        isOptimal: true,
      },
      {
        id: "notebook",
        text: "Open the notes app. Type a structured entry: trigger, distortions, time-course, resolution. Tag for therapy.",
        tactic: "The dry adult version. Four lines of text. Lin will see it on Wednesday and will use it as a teaching artefact in-session. The notebook entry is the integration in its driest, most CBT-orthodox form. Lands.",
        nextSceneId: "notebook-1",
        isOptimal: true,
      },
      {
        id: "tell-maya",
        text: "Walk over to Maya at the kitchenette. She's making tea. 'Can I tell you something weird that happened last night.'",
        tactic: "Coming out as anxious to a peer at work. Riskier than the Mia text — Maya has not been told, you are at the office, the bullpen is noisy. The risk is small and the upside is the relational thread that opens for the rest of the arc. Maya gets it. The opening goes well.",
        nextSceneId: "tell-maya-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DISMISS PATH
  // ===================================================================
  {
    id: "dismiss-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You exhale. You drink the coffee. You sit down. You open Slack. You open the second-paragraph file. You start working.",
      },
      {
        speakerId: null,
        text: "By 11 a.m. you have produced four versions of the second paragraph. By noon you have forgotten that last night happened. By Thursday you have forgotten what the catastrophising staircase was about. You sleep okay Tuesday and Wednesday because David's resolution is fresh and your body's threat-detection is calmer for about 72 hours.",
      },
      {
        speakerId: null,
        text: "On Sunday night a new Slack message arrives — different content, different sender, similar tonal ambiguity. By 2:48 a.m. you are running the same staircase, on the same body, with no integration from last week to draw on. The body did not learn that catastrophe-narratives sometimes don't materialise. The body just learned that catastrophes happen sometimes and don't happen other times, which is what the body believed before.",
      },
      {
        speakerId: "inner-voice",
        text: "Dismissing the lesson is the most common stance because it is what the body wants to do. The relief of resolved worry is psychoactive — it is the closest thing to a chemical reward your endogenous system produces in the worry-loop architecture. You DON'T want to dwell. You want to move on. The dwelling is the work. The dwelling is what gives the body a structured experience of 'the catastrophe-narrative was not load-bearing,' which is the only experience that, repeated, eventually trains the staircase to fire less often. Tonight's catastrophe was a teachable moment. You declined the lesson. The next teachable moment is two weeks away.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-dismiss-end",
        text: "End scene.",
        tactic: "The dismiss ending.",
        nextSceneId: "ending-dismiss",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SHAME PATH
  // ===================================================================
  {
    id: "shame-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "The shame arrives right behind the relief. It is sharper than the relief. It is faster.",
      },
      {
        speakerId: null,
        text: "What is wrong with you. You lost a whole night of sleep over a Slack message. You have a partner who is exhausted because of you. You are 28 years old and you cannot read tone like an adult. You are in therapy and you still cannot do this. Lin is going to be disappointed when you tell her. Maybe don't tell her.",
      },
      {
        speakerId: null,
        text: "Each shame-thought is itself anxiogenic. The body that was running the David-firing chemistry from 11 p.m. to 4 a.m. now starts to run shame chemistry from 9:07 a.m. onward. The flavour is different but the somatic profile is similar — chest tightness, shallow breath, a low-grade humming that the rest of the day will be conducted on top of.",
      },
      {
        speakerId: "inner-voice",
        text: "Shame is one of the most reliable engines of the next anxiety episode. The body that runs shame chemistry today is the body that has elevated baseline cortisol tomorrow morning, which is the body that produces the next 3 a.m. spiral on slightly less stimulus than the previous one needed. Shame about anxiety is anxiogenic. This is not an opinion. This is the mechanics of the HPA axis under chronic activation.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There is a substitution the CBT literature has been honing for forty years. When the shame-thought arrives — 'what is wrong with me' — the substitution is: 'what is wrong with me' is replaced with 'I have a thing my body does, and it did the thing last night, and the body is the body, and I am working with it.' The substitution is not magic. It is a small grammatical move. Repeated, it puts ground under the shame instead of letting the shame compound. The shame does not vanish on the first try; it loses 15% of its grip. Over months it loses more.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-shame-end",
        text: "End scene.",
        tactic: "The shame ending.",
        nextSceneId: "ending-shame",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // TELL MIA PATH (skill)
  // ===================================================================
  {
    id: "tell-mia-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You open the thread. You type three sentences. You re-read them. You change one word. You hit send at 9:09 a.m.",
      },
      {
        speakerId: null,
        text: "YOU: 'Hey — last night I spiralled hard about David. He just came over and said the copy was fine. It was bigger than I let on. Love you.'",
      },
      {
        speakerId: null,
        text: "Three dots come up almost immediately. Mia is at home, working from her desk in the second bedroom. The reply lands within forty seconds.",
      },
      {
        speakerId: "mia",
        text: "yeah i felt you not sleep. i love you. talk tonight. proud of you for telling me.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You read the message. The 'proud of you for telling me' is not the part that lands hardest. The 'yeah i felt you not sleep' is. She knew. She did not name it because she does not name things at 6:30 a.m. when she is making coffee — she names them in the evening when there is room. She knew last night. She knew. She held the room while you held the body. She slept some, not all.",
      },
      {
        speakerId: null,
        text: "You set the phone down on the desk. You drink the coffee. The integration just happened. You did not have to do anything elaborate. You just sent three sentences to one trusted person and the lesson stuck because someone else metabolised it with you.",
      },
      {
        speakerId: "inner-voice",
        text: "Naming the work to a trusted witness is the most under-taught CBT skill, partly because it is not technically a CBT skill — it is a relational skill that compounds CBT. The reason it works: the body's chemistry of resolved-worry is psychoactive but ephemeral; the witness gives the lesson a second body to hold it, which doubles the metabolisation surface. Mia did not solve anything. She received. The receiving is the work.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-mia-end",
        text: "End scene.",
        tactic: "The tell-Mia ending.",
        nextSceneId: "ending-mia-text",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // NOTEBOOK PATH (skill)
  // ===================================================================
  {
    id: "notebook-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You sit down. You open the notes app. The CBT log is the seventh entry from the top, the one labelled 'Lin — for Wednesday.'",
      },
      {
        speakerId: null,
        text: "You type four lines. You do not embellish. The dryness is the skill.",
      },
      {
        speakerId: null,
        text: "TRIGGER: David Slack message at 4:48 p.m. yesterday. 'we need to talk about the Henderson copy on Monday.' No period.",
      },
      {
        speakerId: null,
        text: "DISTORTIONS: Catastrophising staircase (eight steps). Mind-reading (he was upset). Fortune-telling (firing on Monday). Probability inflation (low base rate of Monday-firings via casual Slack).",
      },
      {
        speakerId: null,
        text: "TIME COURSE: Body activation 5:14 p.m. Sleep onset attempt 11:15 p.m. Spiral 1:45 to 4:08 a.m. Slept four hours. Skill used: [defusion / postponement / grounding / waking Mia / phone].",
      },
      {
        speakerId: null,
        text: "RESOLUTION: 9:07 a.m. — David said copy is great, just second-paragraph notes. Catastrophe did not materialise. Disconfirming evidence available for integration.",
      },
      {
        speakerId: null,
        text: "You save it. You tag it 'wednesday-session.' Lin will read it before you arrive. You will not have to spend the first ten minutes describing the spiral; you can spend those ten minutes on what to DO with the disconfirmation.",
      },
      {
        speakerId: "inner-voice",
        text: "The dry CBT log is the most orthodox version of integration available. It looks unglamorous because it IS unglamorous. The structured entry — trigger / distortions / time-course / resolution — is itself a small experience of the body being treated as an instrument that can be observed instead of as an emergency that must be managed. The fourteenth entry teaches the body something the first one cannot. The fortieth entry teaches more. Lin's bookcase has clients in their fifth year of treatment whose notebooks are longer than this scenario; they are also the clients whose disorder is the quietest.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-notebook-end",
        text: "End scene.",
        tactic: "The notebook ending.",
        nextSceneId: "ending-notebook",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // TELL MAYA PATH (skill — relational thread)
  // ===================================================================
  {
    id: "tell-maya-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["maya"],
    dialog: [
      {
        speakerId: null,
        text: "Maya is at the kitchenette pulling a tea bag out of the boiler. Mint, you think. She does mint mid-morning, English breakfast at 4 p.m. You have been observing her tea pattern for a year without knowing why.",
      },
      {
        speakerId: null,
        text: "You walk over. You lean against the counter. You don't pre-rehearse the sentence. You let it come out.",
      },
      {
        speakerId: "sam",
        text: "Hey — can I tell you something weird that happened last night.",
        emotion: "neutral",
      },
      {
        speakerId: "maya",
        text: "yeah. of course.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She has not yet looked up from the tea. She is not pretending not to look up — she is just doing the tea-pulling-out thing. The not-looking-up is the move. Most people, when handed 'can I tell you something,' lock eyes and produce a face of receptive attention, which is itself a form of pressure. Maya's body has learned, somewhere in her treatment, to receive without staring. The not-staring is generous.",
      },
      {
        speakerId: "sam",
        text: "I had a 3 a.m. spiral about David's Slack message. The 'we need to talk about Henderson on Monday' one. I lost the night to it. He just walked over and said the copy was great. I want to tell someone because I think I have been pretending not to be in treatment with you and that's a thing I'm trying to stop.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She looks up now. The look is small. She squeezes the tea bag, drops it in the bin, takes a sip.",
      },
      {
        speakerId: "maya",
        text: "Yeah. The David tone-thing is real. He's bad at affect on Slack — most people read his messages as firing-language at least once. Welcome to the club. I lost a week to a 'circle back tomorrow' from him in March.",
        emotion: "knowing",
      },
      {
        speakerId: "maya",
        text: "And — yeah. Treatment is treatment. I'm in CBT with a woman in midtown. Have been for two years. You don't have to brief me. We can just have it.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She says it the way someone says 'we can just have lunch.' Casual, low-stakes, no ceremony. She turns her body slightly toward yours and away from the tea. The conversation continues for another six minutes. By 9:23 a.m. you have told her about Lin, she has told you about her therapist (an hour-long woman named Halloran in midtown), you have agreed to grab a real lunch on Thursday, and the whole exchange has been so low-key that a passing partner might have read it as a normal coffee-machine catch-up about the Henderson account.",
      },
      {
        speakerId: "inner-voice",
        text: "Coming out as anxious to a peer is one of the highest-value moves available in your work environment, and almost every clinically anxious person under-uses it. The fear of the move is that the peer will recategorise you. The actual outcome — about 70% of the time, by clinical estimate — is that the peer, like Maya, has their own version of the work and has been waiting for the social permission to bring it to surface. Maya just gave you a witness inside the building where the trigger lives. That witness is more valuable than tonight's Mia text, in a way the next year of your treatment will draw on.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-maya-end",
        text: "End scene.",
        tactic: "The Maya-thread-opens ending.",
        nextSceneId: "ending-maya",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-dismiss",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Never Mind",
    endingLearnPrompt:
      "You declined the lesson. The body slept okay Tuesday and Wednesday on the residual relief. By Sunday night a new ambiguous message arrived from a different sender, and your body ran the same staircase with no integration to draw on. Across hundreds of these moments — disconfirmed catastrophe, available disconfirmation, dismissed integration — the disorder maintains its volume. The skill substitution is small. Three sentences to one trusted person. Four lines in a CBT log. Six minutes with a peer. Any of these would have moved the metabolisation surface from one body to two and made the next staircase a step shorter.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Dismissing the lesson is the most common stance because the body's chemistry of resolved-worry is psychoactive — moving on FEELS like the right move. The dwell is the work. The dwell is dry. The dwell is what makes the next staircase shorter. Most chronic GAD that does not respond to treatment is GAD treated only at the moment of the spiral; the leverage moment most patients miss is THIS one, the morning after, when the disconfirmation is sitting on the desk uncollected.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-shame",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "What's Wrong With Me",
    endingLearnPrompt:
      "You added a shame layer on top of the original spiral. The body's chemistry shifted from worry to humiliation, but the somatic profile is similar — and the HPA axis under chronic activation does not care which flavour of self-attack it is processing. By 4 p.m. you are exhausted, low-grade humming, less likely to use any skill tonight than you would have been at 9:07. The substitution is small but mechanical: 'what is wrong with me' becomes 'I have a thing my body does, and it did the thing last night.' The substitution does not vanish the shame on the first try. It loses 15% of its grip. Over months it loses more.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Shame about anxiety is anxiogenic. This is not an opinion; it is the chronic-activation HPA mechanics. The most under-taught second-line CBT skill is the cognitive substitution from global-self-verdict ('what is wrong with me') to bounded-event-description ('I have a thing my body does'). It is a small grammatical move. The body does not know it is a small grammatical move. The body responds to the substitution as if it were a different brain producing a different sentence — because, structurally, it is.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-mia-text",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Three Sentences",
    endingLearnPrompt:
      "You sent three sentences and got back two. The integration moved from one body to two. The 'yeah i felt you not sleep' was the line that landed — Mia knew. Mia held the room while you held the body. Across years of relationship with someone who has clinical anxiety, this is the sustainable shape — small, named, frequent, low-ceremony. You did not ask Mia to fix anything. You told her what happened. She received. The receiving is the work. Tonight's spiral now lives inside the relationship as a thing both of you know about, instead of a thing you carry alone.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The relational version of integration is one of the best-evidenced anxiety interventions and one of the least-deployed. Most people in long relationships with anxiety either over-share (which trains the partner into co-regulation that becomes its own dependence) or under-share (which keeps the disorder isolated and unwitnessed). Three sentences is the calibrated dose. The dose is sustainable across years. Mia's reply matters less than the act of sending. You named the thing to a witness. The naming compounds.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-notebook",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The CBT Log",
    endingLearnPrompt:
      "You wrote four lines. Trigger, distortions, time-course, resolution. Tagged for Wednesday. Lin will read it before you arrive. The dryness is the skill — the structured entry is itself a small experience of the body being treated as an instrument that can be observed instead of as an emergency that must be managed. The fourteenth entry teaches the body something the first one cannot. The fortieth teaches more. Lin's longest-running clients are the ones with the fattest notebooks, which is also the cohort whose disorder is quietest. The notebook is the work.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The CBT log is one of the few durable instruments in mental health. Most therapeutic gains do not survive the patient leaving the office; the log is one of the things that crosses that threshold. It is a written external memory of the disorder's actual statistical behaviour over time, which is the best counter-weight to the in-the-moment certainty that the disorder produces. The fortieth entry is harder to ignore than the first one. By the hundredth, the log has become the body's instrument of self-recognition.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-maya",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Welcome to the Club",
    endingLearnPrompt:
      "You came out as anxious to a peer at work. Maya, who has been two years further into her own treatment, received the disclosure low-key and reciprocated. Lunch on Thursday. The relational thread that just opened is the most valuable single move in your work environment for the next year. Most clinically anxious people under-use peer disclosure because they fear recategorisation by the peer. The actual outcome — about 70% of the time by clinical estimate — is what just happened: the peer has their own version of the work and has been waiting for social permission to surface it. Maya is now a witness INSIDE the building where the trigger lives.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Peer-disclosure at work is the move that scales the worst — almost no one in chronic-anxiety treatment is told to do it, partly because the clinical literature is conservative and partly because most clinicians have never tested it themselves. The clients who do it tend to report large effect sizes on workplace anxiety specifically: a witness in the room where the trigger lives changes the reading of every Slack message, every meeting glance, every overheard hallway laugh. Maya did not become your support system. She became your peer. The peer-relation is structurally different and harder to over-use than the partner-relation.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety12: Scenario = {
  id: "anx-1-2",
  title: "The Morning After",
  tagline: "9:07 a.m. The catastrophe didn't materialise. The disconfirmation is sitting on the desk uncollected.",
  description:
    "Sam at the office at 9:07 a.m. after one of the L1-1 endings. David walks over with coffee, says the copy was great, walks off. The body that has carried the catastrophe-narrative for sixteen hours now has to integrate that the catastrophe was not real. Five available stances at the integration moment: dismiss the lesson, beat self up, text Mia three sentences, write the CBT log entry, or come out as anxious to peer-coworker Maya. Three of the five compound the disorder's shrinkage; two lose the lesson. Five endings.",
  tier: "premium",
  track: "anxiety",
  level: 1,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "beginner",
  category: "narcissist",
  xpReward: 320,
  badgeId: "the-morning-after",
  startSceneId: "the-frame",
  tacticsLearned: [
    "The integration leverage moment — disconfirmed catastrophe is metabolisable evidence; dismissing it loses the disorder's most underused shrinkage moment",
    "Naming the work to a trusted partner via three short sentences compounds metabolisation across two bodies",
    "The dry CBT log entry (trigger/distortions/time-course/resolution) as the orthodox written-memory instrument that crosses the office-to-therapy threshold",
    "Peer-disclosure at work as the under-deployed but high-effect-size move; ~70% of attempted peer-disclosures produce a reciprocal disclosure that opens a witness inside the trigger environment",
    "Substitution of 'what is wrong with me' (global self-verdict) with 'I have a thing my body does' (bounded event description) — the small grammatical move that bleeds 15% of shame's grip per repetition",
  ],
  redFlagsTaught: [
    "Dismissing the disconfirmation — the relief-of-resolved-worry is psychoactive; moving on FEELS right; the dwell is what makes the next staircase shorter",
    "Adding a shame layer on top of the original spiral — anxiogenic in its own right via HPA chronic-activation mechanics; produces the next spiral on slightly less stimulus",
  ],
  characters: [INNER_VOICE, SAM, DAVID, MAYA],
  scenes,
};

export default anxiety12;
