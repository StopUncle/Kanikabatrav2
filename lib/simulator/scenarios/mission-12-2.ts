/**
 * Female Track. Mission 12-2 "The Friend Who Stayed"
 *
 * Three weeks after the whisper-network smear closed (mission-12-1).
 * Sunday afternoon at Priya's apartment. The mother retreated. Ren
 * chose. The protagonist survived a campaign without defending it.
 *
 * The scenario is not about the mother. It is about whether the
 * protagonist can sit at the warmest kitchen table in her life and
 * not turn the friendship into a debrief. Receiving is a discipline.
 * Most people who survive a campaign discover they have learned
 * everything about defense and nothing about being in a warm room
 * afterward. L12-2 is the warm room.
 *
 * Handoff out: an industry-adjacent podcast description that names
 * the protagonist with the word "allegations" in it. The smear left
 * the family and walked across the street in a different outfit.
 * Sets up L13 ("The Crisis").
 *
 * Voice register: female-track narrator, old-money softeners
 * ("rather / certainly / almost"). At least one specific brand anchor
 * per scene. Physical-beat scene endings. Pivot sentences short after
 * long. Pilot reference: `reference/L12-2-pilot.md`.
 */

import type { Scenario, Scene } from "../types";
import { PRIYA, INNER_VOICE } from "../characters";

const scenes: Scene[] = [
  // -------------------------------------------------------------------
  // Scene 1, arrival
  // -------------------------------------------------------------------
  {
    id: "arrival",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "Sunday. 2:14 pm. Priya's building. Brick on Lexington, four floors up. The walk-up that announces a person who chose Brooklyn ten years ago and was vindicated.",
      },
      {
        speakerId: null,
        text: "You have been here forty-seven times. You know the buzzer panel by name.",
      },
      {
        speakerId: null,
        text: "You are carrying a small white box from Maison Kayser because three years ago Priya told you their pain au choco was the only one in the city she would pay full retail for.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Forty-three days since the call you did not refute. Twenty-one days since the last whisper landed. Three weeks of nothing.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Priya has not asked. That is not the same as Priya not knowing.",
      },
      {
        speakerId: null,
        text: "The intercom clicks before you ring it. Priya watches the street.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Come up.",
      },
    ],
    nextSceneId: "the-couch",
  },

  // -------------------------------------------------------------------
  // Scene 2, the kitchen
  // -------------------------------------------------------------------
  {
    id: "the-couch",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Books face-out on the lower shelves so the daughter can read the spines from the floor. One Le Creuset on the stove, the orange one, because Priya cooks one dish and has cooked it for nine years.",
      },
      {
        speakerId: null,
        text: "A drawing on the fridge. Six-year-old, certainly Priya's daughter's, a stick figure with hair so long it loops back around to the feet. Above it: MOMMY AT THE BEACH.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "She is asleep. She was awake for the first hour. She drew you something.",
      },
      {
        speakerId: null,
        text: "Priya does not bring out the drawing. She does not need to. It is on the fridge already, in the spot where Priya puts the ones that matter.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "There are two drawings on the fridge. Priya does not curate her fridge. She receives things and lets them stay where they were put.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "I made the tea you like. The Mariage Frères. I bought three tins last year because you mentioned it. I have used one. We have time.",
      },
      {
        speakerId: null,
        text: "She pours.",
      },
    ],
    nextSceneId: "priya-opens",
  },

  // -------------------------------------------------------------------
  // Scene 3, the opening choice
  // -------------------------------------------------------------------
  {
    id: "priya-opens",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "No pressure. I have not asked. I am not going to ask. I want you to know that the door is open if you want it open. And that the tea is hot if you want to talk about nothing for an hour.",
      },
      {
        speakerId: null,
        text: "She sits. She does not look at you while she says it. She looks at the steam coming off her cup. The Mariage Frères ascending in a thin line because the apartment is dry from the radiators.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The move has a name. She has just given you both options without authoring which one you take. Re-litigation is the failure mode you would walk into now.",
        event: "tactic-named:re-litigation",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You have been authoring rooms toward a confession of damage for forty-three days. Priya has authored nothing. The choice is whether to receive a room she has built without any author at all.",
      },
    ],
    choices: [
      {
        id: "talk-about-nothing",
        text: "I came for the tea. Tell me about her week.",
        tactic:
          "Receiving. The friendship is a separate object from the campaign. Sit in the room without authoring it.",
        isOptimal: true,
        event: "optimal-with-grace",
        nextSceneId: "path-a-clean-pivot",
      },
      {
        id: "headline-only",
        text: "Five sentences and then we pivot. Is that allowed?",
        tactic:
          "The middle path. You give Priya the right to be informed without making her the witness to forty minutes. Calibrated, not optimal.",
        nextSceneId: "path-b-update-given",
      },
      {
        id: "tell-her-everything",
        text: "I have been wanting to tell you the whole thing. Can I?",
        tactic:
          "Re-litigation. The instinct is to debrief because debriefing is what your nervous system has been doing alone in your apartment for three weeks.",
        nextSceneId: "path-c-re-litigation",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Path A ,the clean pivot
  // -------------------------------------------------------------------
  {
    id: "path-a-clean-pivot",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: "priya",
        emotion: "happy",
        text: "Her week. She lost a tooth on Tuesday. She has been putting the tooth on the windowsill because she read that the tooth fairy in some other country leaves the money on the windowsill.",
      },
      {
        speakerId: "priya",
        emotion: "happy",
        text: "She would like to test whether the fairy has access to the international distribution network.",
      },
      {
        speakerId: null,
        text: "You laugh. You did not laugh forty-three days ago because forty-three days ago the only audio in your apartment was your own breath holding under voicemails.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Receiving is a discipline. It does not feel like one until you have practiced not-receiving for forty-three days and your nervous system has hardened around the refusal.",
      },
      {
        speakerId: "priya",
        emotion: "happy",
        text: "She also said she would like to know what the largest building in Tokyo is. I do not have an answer. I am taking applications.",
      },
      {
        speakerId: null,
        text: "The hour passes. You drink two cups. She drinks one.",
      },
      {
        speakerId: null,
        text: "The daughter wakes up at 3:47 pm. She walks into the kitchen with the unguarded face of a child who has been pre-briefed that this person is safe. She hands you a second drawing. It is of the three of you on a couch.",
      },
      {
        speakerId: null,
        text: "You hold the drawing. You do not need to say what you feel. The drawing already said it.",
      },
    ],
    nextSceneId: "ending-tea-drunk",
  },

  // -------------------------------------------------------------------
  // Path B ,the update given
  // -------------------------------------------------------------------
  {
    id: "path-b-update-given",
    backgroundId: "apartment",
    mood: "professional",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "Five sentences. You count them.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She made calls. She rewrote the Sunday in two of them. Ren remembered the actual Sunday. The story stopped traveling once it hit context. We are in a quiet week that may or may not last.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Five exactly. You counted.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "She noticed. She always notices.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Okay. I am informed. We pivot. Did you watch the documentary I sent? The one about the conductor.",
      },
      {
        speakerId: null,
        text: "You did not. You watch it on her laptop for thirty-eight minutes, the two of you on the couch with the daughter asleep behind a pillow stack.",
      },
      {
        speakerId: null,
        text: "The documentary is about a conductor who fired half her orchestra in her first month and built a new one in three years. Priya pauses it twice.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Watch this answer.",
      },
      {
        speakerId: null,
        text: 'On screen: "Defense is documentation. I do not document false claims. I document the work."',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You did not hear that line in your own life forty-three days ago because you were too close to it. Now you hear it from a stranger on a laptop. Priya knew that.",
      },
    ],
    nextSceneId: "ending-update-given",
  },

  // -------------------------------------------------------------------
  // Path C ,re-litigation (with stop/keep sub-choice)
  // -------------------------------------------------------------------
  {
    id: "path-c-re-litigation",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["priya"],
    dialog: [
      {
        speakerId: null,
        text: "You start at the beginning. You explain the Sunday. You explain what the mother said on the call. You explain what she said on the second call.",
      },
      {
        speakerId: null,
        text: "You explain what your aunt sent. You explain the four sentences from the cousin. You explain Ren in the car.",
      },
      {
        speakerId: null,
        text: "Priya does not interrupt. She refills her cup once. She refills yours twice. She watches your face the way a doctor watches a face when she is timing something.",
      },
      {
        speakerId: null,
        text: "Forty minutes pass. You can see the clock in the kitchen. You watch yourself watching it.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The move has a name. Instrumentalisation. You are using the warmest person in your life as a holding chamber for forty minutes of material that has been running in your head with no audience.",
        event: "tactic-named:instrumentalisation",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Your nervous system is doing what nervous systems do. The unloading is not the friendship. The friendship is what is paying for the unloading.",
      },
      {
        speakerId: null,
        text: "At minute forty-one Priya does not look tired. She looks present. The cost is not on her face. The cost is going on the books somewhere else.",
      },
    ],
    choices: [
      {
        id: "stop-apologise-pivot",
        text: "I am sorry. I have been carrying this alone and I unloaded. Tell me about her week.",
        tactic:
          "The discipline of stopping mid-failure. You can not un-spend the forty minutes. You can decline to spend another forty.",
        event: "restraint-shown",
        feedback:
          "Recovery is not the same as never having spent it. The next time you visit you will know what a kitchen-table instrumentalisation feels like, and you will not do it twice.",
        nextSceneId: "ending-re-litigated-stopped",
      },
      {
        id: "keep-going",
        text: "There is more. The aunts have a version that is...",
        tactic:
          "The escalation. Once unloading starts, the impulse is to complete it. The friendship absorbs the second forty.",
        nextSceneId: "ending-re-litigated-full",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING ,GOOD
  // -------------------------------------------------------------------
  {
    id: "ending-tea-drunk",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Tea Drunk",
    endingSummary:
      "Three weeks after the smear, you sat at Priya's kitchen table and did not turn it into a witness stand. The friendship is a separate object from the campaign. You will leave with two drawings and nothing to file. Priya will not need to recover from the visit. That is the discipline.",
    endingLearnPrompt:
      "Receiving is a discipline. The constant friend deserves to be present in your life as a non-instrumentalised presence ,name three current friendships where you have been authoring the rooms toward your own material, and try one Sunday at the other person's register.",
    dialog: [
      {
        speakerId: null,
        text: "You leave at 5:12 pm. The daughter walks you to the door. The second drawing in her hand.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Come back next Sunday. I have a tin and a half of the Mariage Frères left.",
      },
      {
        speakerId: null,
        text: "You walk down four flights with two drawings folded into the inside pocket of your coat. You do not look at them on the train. You will look at them in the kitchen later.",
      },
      {
        speakerId: null,
        text: "8:47 pm. Your kitchen. The phone has been face-down on the counter since you got home. One notification. Priya. A screenshot.",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Saw this. Did not want to mention it today. Wanted you to see it on your own time. Tomorrow, not tonight.",
      },
      {
        speakerId: null,
        text: 'The screenshot is a podcast page. Industry-adjacent. The episode description says your name. The episode description says the word "allegations." The episode is scheduled to drop in nine days.',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The smear left the family. It walked across the street and put on a different outfit. Priya saw it before you did and held it for the right hour to tell you.",
      },
      {
        speakerId: null,
        text: "You put the phone face-down again. You finish the dishes. You turn off the kitchen light at 11:14 pm.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING ,NEUTRAL
  // -------------------------------------------------------------------
  {
    id: "ending-update-given",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["priya"],
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Update Given",
    endingSummary:
      "You calibrated. Five factual sentences and a clean pivot. Priya absorbed them without complaint, which is exactly what the strongest friendships do ,they absorb. The cost is invisible. The friendship moved from neutral to slightly weighted. It is the kind of move that stays slightly weighted for years if you keep importing five sentences a visit.",
    endingLearnPrompt:
      "The five-sentence update is the founder of the friendship debt. Calibrated calm now is uncalibrated calm in eight months. Try one visit per quarter that has zero sentences on the campaign.",
    dialog: [
      {
        speakerId: null,
        text: "You leave at 4:58 pm. The documentary is half-watched. Priya bookmarks it on her laptop and writes the start time on a Post-it so the two of you can resume.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You gave her the headline and you pivoted. The five sentences cost her one minute and forty-five seconds of attention. The pivot cost her none. Both are tolerable.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The thing you did not do was build the friendship a room of its own this Sunday. The currency is finite. Note that.",
      },
      {
        speakerId: null,
        text: "9:14 pm. Your kitchen. The phone has been face-down on the counter. One notification. Priya. A screenshot.",
      },
      {
        speakerId: null,
        text: 'A podcast page. Industry-adjacent. The episode description says your name. The episode description says the word "allegations."',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The smear left the family. It walked across the street and put on a different outfit. Priya saw it. She held it for the right hour.",
      },
      {
        speakerId: null,
        text: "You put the phone face-down again. You finish the dishes.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING ,bad (recovered)
  // -------------------------------------------------------------------
  {
    id: "ending-re-litigated-stopped",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["priya"],
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Kitchen Held (Late)",
    endingSummary:
      "You spent the friendship and then you stopped. Priya named the rule cleanly on the landing. The next Sunday you will know how it goes when the tea comes first. You have been given a second draft, which is a thing Priya does for the people she has decided to keep.",
    endingLearnPrompt:
      "Stopping mid-failure is a real discipline. Note the cost ,Priya recovered for you. That is not unlimited. Audit the friends whose recovery work has been silent.",
    dialog: [
      {
        speakerId: null,
        text: "You leave at 6:24 pm. Priya walks you down the first flight of stairs. She does not say 'it is okay.' She does not say 'anytime.'",
      },
      {
        speakerId: "priya",
        emotion: "knowing",
        text: "Next time, the tea first. The other thing second. Or not at all. Both are fine.",
      },
      {
        speakerId: null,
        text: "You nod. She squeezes your shoulder. She goes back up.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You spent forty-one minutes on the campaign. You spent the next nineteen apologising and pivoting. The friendship cost is recoverable because Priya is the rare person who recovers other people's costs for them.",
      },
      {
        speakerId: null,
        text: "9:14 pm. Your kitchen. One notification. Priya. A screenshot.",
      },
      {
        speakerId: null,
        text: 'A podcast page. The episode description says your name. The episode description says the word "allegations."',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "Priya held it until the right hour. She always knows what hour is the right hour.",
      },
    ],
  },

  // -------------------------------------------------------------------
  // ENDING ,BAD (full)
  // -------------------------------------------------------------------
  {
    id: "ending-re-litigated-full",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["priya"],
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Friend Who Absorbed",
    endingSummary:
      "You unloaded the campaign at the kitchen table for eighty minutes. Priya listened without complaint. The cost was invisible to you because Priya is the kind of person whose cost is always invisible to you. The friendship is now slightly more expensive to maintain. You will feel it sometime in the next year when a Sunday does not happen and you can not say why.",
    endingLearnPrompt:
      "Instrumentalisation has a name. The friendship can absorb one campaign. Maybe two. At three, the absorption capacity will be quietly gone, and the loss will be told to you in the form of slightly fewer Sundays.",
    failureBlogSlug: "instrumentalising-your-friends",
    failureBlogTitle: "When your friend becomes your therapist",
    dialog: [
      {
        speakerId: null,
        text: "You leave at 7:11 pm. Priya hugs you at the door for slightly longer than usual. The daughter is asleep again.",
      },
      {
        speakerId: null,
        text: "You walk down four flights with nothing in your coat pocket because there were no drawings tonight. The drawings stayed on the fridge.",
      },
      {
        speakerId: null,
        text: "Priya washes both cups. Puts the Mariage Frères tin back. Sits at her kitchen table for twenty minutes with the lights on and the window open, doing the work nobody pays her to do.",
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "You can not see this part. You will never see this part. That is the cost. It happens in the room you have just left.",
      },
      {
        speakerId: null,
        text: "10:02 pm. Your kitchen. One notification. Priya. A screenshot.",
      },
      {
        speakerId: null,
        text: 'A podcast page. The episode description says your name. The episode description says the word "allegations."',
      },
      {
        speakerId: "inner-voice",
        tone: "tactical",
        text: "The smear left the family. Priya held it for the right hour to tell you. She always does. You will need to figure out tomorrow whether you can return the favour.",
      },
    ],
  },
];

const mission12_2: Scenario = {
  id: "mission-12-2",
  title: "The Friend Who Stayed",
  tagline:
    "Three weeks after a smear, the warmest kitchen table in your life is not a witness stand.",
  description:
    "The mother retreated. Ren chose. You survived a campaign without defending it. Today is Sunday afternoon and Priya has tea on. The scenario is not about the mother. It is about whether you can sit at the warmest kitchen table in your life and let it stay a kitchen table. Receiving is a discipline. Most people who survive a campaign have learned everything about defense and nothing about being in a warm room afterward.",
  tier: "vip",
  track: "female",
  level: 12,
  order: 2,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "social-dynamics",
  xpReward: 320,
  badgeId: "the-tea-drunk",
  startSceneId: "arrival",
  prerequisites: ["mission-12-1"],
  isNew: true,
  tacticsLearned: [
    "Receiving care without authoring the room",
    "Distinguishing a debrief from a friendship",
    "Declining the kitchen-table instrumentalisation",
    "Stopping mid-failure when the unloading has started",
  ],
  redFlagsTaught: [
    "Re-litigation as a nervous-system default after a campaign",
    "Instrumentalisation of constant friends as unpaid therapy",
    "The five-sentence update that begins the friendship debt",
    "Performative apology as a substitute for procedural repair",
  ],
  reward: {
    id: "the-tea-drunk",
    name: "The Tea Drunk",
    description:
      "Three weeks after the smear, you sat at Priya's kitchen table and did not turn it into a witness stand.",
  },
  characters: [PRIYA, INNER_VOICE],
  scenes,
};

export default mission12_2;
