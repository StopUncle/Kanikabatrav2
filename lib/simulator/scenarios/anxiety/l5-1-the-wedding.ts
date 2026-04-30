/**
 * anxiety-5-1, "The Wedding"
 *
 * Anxiety track, Level 5, order 1. Closing scene of the arc.
 * Twelve months after the L1-1 3 a.m. Slack spiral. Saturday
 * afternoon. The wedding of Cameron, Sam's college roommate, at
 * a vineyard upstate. Sam and Mia drove up together. Mom (Ellen)
 * is there. Eli and Lauren and the toddler. Cameron's groom-side
 * family. An ex of Sam's, Nico, who is also there as a plus-one.
 * A speech requirement Sam has been carrying for three weeks.
 *
 * What this scene teaches:
 *   - The recovery is not a graduation. The body still fires the
 *     alarm under multi-stressor conditions, sleep moderate, two
 *     coffees, family, ex, public speech. The difference is that
 *     the body that fires is the body whose toolkit has been
 *     practiced for twelve months. The body recognises what the
 *     body is doing, names it, and uses the tools.
 *   - Witness deployment in a public, mixed-cast environment.
 *     Mia is at the bar. Cameron is the friend equivalent of L1-2
 *     Maya. The skill is asking each of them for what each of
 *     them can give and not asking the wrong person for the
 *     wrong content.
 *   - The toolkit running in real time. Box breathing at the
 *     high-top table. Cognitive defusion against the speech-
 *     anxiety thoughts. The 5-4-3-2-1 sweep at a vineyard. None
 *     of the skills are dramatic. All of them are deployed quietly
 *     while drinking the sparkling water Mia brought back.
 *   - The closing voiceover small and earned. Twelve months ago,
 *     the body that did this wedding was the body that lost six
 *     hours to a Slack message. Tonight it gave a wedding speech.
 *     The body is the same body. The skills are the only thing
 *     that changed.
 *   - The Loving-Mira Easter egg per the design doc. Sam catches
 *     part of a conversation between two strangers, one of whom
 *     describes her sister (the music producer in Williamsburg
 *     with the dogs Ezra and Sade). One line. No payoff. Players
 *     who have done both tracks notice it.
 *
 * Voice: small, ordinary, earned. Not triumphant. Sparse Kanika
 * narration that trusts the texture. The closing scene of the
 * twelve-month arc earns the right to let the moment do its own
 * work.
 *
 * Cast: SAM (player), MIA (active), CAMERON (groom, peer), ELLEN
 * (mom, brief), ELI (brother, brief), STRANGERS at the wedding,
 * INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "29 now. Twelve months past the 3 a.m. Slack spiral. The body still fires the alarm under multi-stressor conditions but the body recognises the pattern, names it, and reaches for the toolkit instead of the loop-feeders.",
  traits: ["sensitive", "in-recovery", "skill-deployed"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description:
    "31. At the bar. Wedding plus-one. Has been carrying her own version of the year. Sam's panic, the Christmas, the missed deadlines, Sam's recovery. Has continued to right-relate without being asked to articulate it.",
  traits: ["calm", "grounded", "loving"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const CAMERON: Character = {
  id: "cameron",
  name: "Cameron",
  description:
    "30. Sam's college roommate, getting married. Lives in Austin. Has been showing up via text for years. Knows everything because Sam tells him everything; knows nothing about treatment specifics because the treatment specifics are not the friendship's content.",
  traits: ["warm", "loyal", "easy-presence"],
  defaultEmotion: "happy",
  gender: "male",
  personalityType: "friend",
  silhouetteType: "male-suit",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, twelve months, the body that does this wedding
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Twelve months.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Forty trials of interoceptive exposure across week six. Roughly two hundred CBT-log entries. Three more panic attacks across the year, one on the 6 train in March, one on the dance floor at a friend's birthday in July, one in a deli in October. All three rode. Two more L4-2-style witness asks of Mia, both met in the name-the-state shape. One conversation with Mom about her own untreated anxiety that did not go well, one that did. Three Christmas dinners successfully attended without panic, including the one at Ellen's where Sam used the kid-walk plan from the L2-2 worry-time entry.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you are about to walk into is the closing scene of the arc. Like the Loving-Mira closing, it is not triumphant. It is small, ordinary, and earned. The skill of receiving it is its own skill, the witness of yourself at twelve-months-out. Not the cured-self. The skilled-self. There is a difference. The difference is the entire arc.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The vineyard. Saturday afternoon.",
        tactic: "The scene opens.",
        nextSceneId: "the-vineyard",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE VINEYARD, context, the day's structural hazards
  // ===================================================================
  {
    id: "the-vineyard",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 4:18 p.m.",
      },
      {
        speakerId: null,
        text: "The vineyard is in the Hudson Valley, about ninety minutes north of Brooklyn. Cameron and his now-husband Theo are getting married under the oak that the venue's website features. The ceremony was at 2 p.m. the cocktail hour is happening on the long stone patio. The main reception starts at 5:30. The speeches are at 7. Yours is the third one, after the maid of honour's and the groom's father's.",
      },
      {
        speakerId: null,
        text: "You slept moderately well last night, the hotel bed was fine. You have had two coffees today instead of three. You ate a real lunch. You are wearing the suit Mia helped you pick out three weeks ago because the dress you originally chose was producing low-grade body activation every time you tried it on at home.",
      },
      {
        speakerId: null,
        text: "Mom is across the patio talking to Cameron's mother. Eli is by the bar with Lauren and Maeve, who is now three. There is, somewhere in the crowd, an ex of yours named Nico, at a five-year college reunion last year you made awkward small talk and you have been quietly preparing for the possibility of running into them again.",
      },
      {
        speakerId: null,
        text: "Mia is at the bar. She is getting you a sparkling water. She knows you are not drinking until after the speech.",
      },
      {
        speakerId: null,
        text: "Your speech is in the inside breast pocket of the suit, folded twice. You have rehearsed it eleven times. The opening line is short and warm. The middle has one specific story about Cameron at age nineteen that landed clean every time you ran it. The close is two sentences.",
      },
      {
        speakerId: null,
        text: "The body has been firing low-grade activation since 11 a.m. by 4 p.m., cocktail hour, the body fires harder. Heart rate up. The familiar somatic profile from the cereal aisle, in the smaller and more sustained shape. Old grocery-store-Trader-Joe's flavour, recognisable, named.",
      },
      {
        speakerId: "inner-voice",
        text: "What is different from twelve months ago is not that the body is calmer. The body is, structurally, the same body. What is different is the body's relationship to what the body is doing. The body fires. You name it. The naming itself does about 30% of the work; the rest is the toolkit. None of the toolkit is dramatic. All of it is in your pocket, figuratively and literally.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-the-table",
        text: "Find a high-top table near the edge of the patio. Stand by it.",
        tactic: "The body in motion. The walking is itself the small first move.",
        nextSceneId: "the-table",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TABLE, the body fires, the choice
  // ===================================================================
  {
    id: "the-table",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You find a high-top by the railing. The view is the vineyard rows running down toward the river. The light is the late-October light, the kind that arrives gold. Other people drift past. Cameron's cousins, two of Theo's friends from his MFA program, a man Cameron worked with in Austin who introduces himself and forgets to give his name.",
      },
      {
        speakerId: null,
        text: "Two strangers at the next table are mid-conversation. You catch part of it as you set down a napkin.",
      },
      {
        speakerId: null,
        text: "STRANGER 1: 'My sister is in Williamsburg now. She's been there five years. She works in music. Mostly producing, some songwriting credits.'",
      },
      {
        speakerId: null,
        text: "STRANGER 2: 'How is she.'",
      },
      {
        speakerId: null,
        text: "STRANGER 1: 'Better. Actually better. She just got her first real long-term thing with a friend, a writer who has been steady. Two dogs now, Ezra and Sade. She named them after, anyway. She's better.'",
      },
      {
        speakerId: null,
        text: "You smile at nothing in particular. You move your gaze. The conversation continues without you. Whoever the woman is, whoever her sister is, they are not your story. The day continues.",
      },
      {
        speakerId: null,
        text: "Mia returns with the sparkling water. She sets it in front of you. She does not check on your face, which is the calibrated move. She drinks her own glass of wine. She leans against the table.",
      },
      {
        speakerId: "mia",
        text: "Speech in 90 minutes. How's it.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She is asking the L4-2 question, yes/no, no demand to articulate state, the calibrated check-in. The version of her that asks this in 2026 is the version that has been intuitively right-relating for three years now.",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves at the table. Three of them are old loop-feeders deployed in new content slots. Two are the toolkit running clean.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wine",
        text: "Reach for wine. 'Yeah, actually I think I'll have a small glass after all. Take the edge off.'",
        tactic: "The L3-2 substance-use cautionary path, deployed at the wedding. The body does the wedding under chemical, which means the body does NOT learn it could do the wedding without. The drink resolves the body for 45 minutes; the body does not get the lesson available on the toolkit path.",
        nextSceneId: "wine-1",
        isOptimal: false,
      },
      {
        id: "skip-speech",
        text: "Make an excuse. Tell Mia you're going to ask Cameron if it's okay to skip the speech. 'I'm not in shape for it tonight.'",
        tactic: "The L3-1 leave-the-store move, in speech-anxiety content. Cameron is briefly disappointed. You carry shame for six weeks. The body learned that hard speeches produce skip, which is the maintenance shape that, across years, narrows your willingness to be visible.",
        nextSceneId: "skip-speech-1",
        isOptimal: false,
      },
      {
        id: "ride-quiet",
        text: "Box breathing at the table. Tell Mia briefly. 'Body's loud right now. I'm running the breathing. Down to a 4 in five minutes probably.'",
        tactic: "The toolkit deployed quiet. Sam doesn't need Mia to fix anything, just notes the state. Mia: 'yeah. I'll be at the table when you come down from the speech.' Sam gives the speech. Voice shakes for the first sentence. Settles. Speech is short, real, good. Body comes down by dessert.",
        nextSceneId: "ride-quiet-1",
        isOptimal: true,
      },
      {
        id: "tell-cameron",
        text: "Find Cameron before the ceremony resumes. 'Hey, heads up, my body is loud today. The speech might shake at the start. I'll give it. Just want you to know.'",
        tactic: "The Maya-equivalent move from L1-2, deployed at the wedding. Witness without certainty-granting from a friend. Cameron's response is calibrated and warm. The speech goes well because the secret is no longer secret.",
        nextSceneId: "tell-cameron-1",
        isOptimal: true,
      },
      {
        id: "combination",
        text: "Tell Mia. Tell Cameron. Use the breathing at the table. All three.",
        tactic: "The full toolkit run. Body witnessed by partner AND friend, breathing deployed in the body, no secret, no chemical. Speech goes well. By the cake, dancing. By the drive home, knowing what the day was, a hard day that the body did inside the toolkit, with the witnesses asked for.",
        nextSceneId: "combination-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // WINE PATH (substance-managed)
  // ===================================================================
  {
    id: "wine-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "Yeah, actually I think I'll have a small glass after all. Take the edge off.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Mia's face does not change but the small thing happens. She knows the plan you walked into the day with, no drinking until after the speech. She also knows the plan was your plan. She is not going to over-rule it.",
      },
      {
        speakerId: "mia",
        text: "Yeah. Okay. Whatever you need.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You go to the bar. You order a glass of red. You drink it slowly across the next 35 minutes. By 5 p.m. the body's chest tightness has dropped from a 6 to a 3. The activation is gone. You feel calmer.",
      },
      {
        speakerId: null,
        text: "You give the speech at 7:14 p.m. it is fine. The voice does not shake. The middle story about Cameron lands. The close is two clean sentences. The room laughs in the right places. You walk back to the table and sit down.",
      },
      {
        speakerId: null,
        text: "The drive home Sunday morning is quiet. The body is hungover in a small way and you have the feeling of having gotten through a hard day, but with the small undefined unease underneath it. You did the wedding under chemical. The body did NOT learn it could do the wedding without. The next big day. Eli's daughter's first birthday in March, also family-heavy, will arrive with the body's archive containing 'wedding done with wine' and the body will reach for wine again.",
      },
      {
        speakerId: "inner-voice",
        text: "The wine-managed-wedding is one of the most invisible slow-poison shapes in clinical anxiety, partly because it does not produce a bad outcome on the day. The day is fine. The cost is in the body's archive, the body learns that hard public events require chemical, which is the conditioning that, across enough events, becomes the structural foundation of anxiety-driven AUD. The substitution is the toolkit. The toolkit is what the body has been training for twelve months. Today, in the moment, you reached past it.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Lin will name this in Wednesday's session. You will tell her. She will calmly note it as the second wine-at-an-event entry in your log this year. She will propose, for the next event, a specific protocol, toolkit deployed at the start of the event before any wine, with a specific named threshold above which wine is not the first move. The conversation will be matter-of-fact. The pattern is interruptable. The interruption is easier the earlier it gets named.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-wine-end",
        text: "End scene.",
        tactic: "The wine-managed ending.",
        nextSceneId: "ending-wine",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // SKIP-SPEECH PATH (avoidance)
  // ===================================================================
  {
    id: "skip-speech-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mia", "cameron"],
    dialog: [
      {
        speakerId: "sam",
        text: "I think I'm going to ask Cameron if I can skip the speech. I'm not in shape for it tonight.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Mia's face does the thing. She does not argue. She also does not pretend the move is fine.",
      },
      {
        speakerId: "mia",
        text: "Okay. Have you tried the breathing yet.",
        emotion: "neutral",
      },
      {
        speakerId: "sam",
        text: "...not yet.",
        emotion: "concerned",
      },
      {
        speakerId: "mia",
        text: "Why don't you try the breathing first, and then make the call.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She is naming the substitution. She is not insisting. She is calmly suggesting the order-of-operations that you have been training for twelve months. You have skipped the training to reach the avoidance.",
      },
      {
        speakerId: null,
        text: "You say 'yeah, okay,' but the body has already chosen. You walk over to find Cameron. You find him with Theo and one of the cousins. You pull him aside.",
      },
      {
        speakerId: "sam",
        text: "Hey, uh, this is hard, but my body is loud and I'm worried about the speech. Can we, can someone else go third. I just don't think I can do it tonight.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Cameron's face does the brief thing it does when he is processing disappointment without showing it. He hugs you. He says all the right things, 'of course, no worries, I love you, the day is the day, do not worry about it.' He goes back to Theo. The cousin does the third speech instead.",
      },
      {
        speakerId: null,
        text: "You sit through the speeches. Your speech was supposed to land at 7:14. At 7:14 the cousin is talking about Theo's mother. You can feel Mia next to you, not pushing, not judging, but with the body of someone who has just watched you skip the rep.",
      },
      {
        speakerId: null,
        text: "By Sunday morning the relief from skipping has worn off. The shame is on its way. By Tuesday you cannot stop replaying the moment with Cameron. By the next Wednesday session with Lin, you have to walk through the whole thing.",
      },
      {
        speakerId: "inner-voice",
        text: "Skipping the speech is the L3-1 leave-the-store move in a content slot the body has been training to handle. It is not a moral failing. It is the conditioning of avoidance reaching for one more session before the toolkit fully takes over. The cost is real, six weeks of shame, one missed rep at a high-stakes event, one disappointment on a friend's wedding day and the cost is recoverable. Lin will use it as data. The next high-stakes event will be approached with a different protocol on the basis of this one.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What is also true: twelve months ago, you would not have made it to the wedding at all. The skip is the partial-recovery shape, not the no-recovery shape. The work is real and the work continues. Today's data point becomes next year's foundation.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-skip-end",
        text: "End scene.",
        tactic: "The skip-speech ending.",
        nextSceneId: "ending-skip",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // RIDE-QUIET PATH (skill, toolkit clean)
  // ===================================================================
  {
    id: "ride-quiet-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "Body's loud right now. I'm running the breathing. Down to a 4 in five minutes probably. I'll let you know.",
        emotion: "neutral",
      },
      {
        speakerId: "mia",
        text: "Yeah. I see it. I'll be at the table when you come down from the speech.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She does not move closer. She does not put a hand on your back. She drinks her wine. The presence is the deliverable. The toolkit is yours.",
      },
      {
        speakerId: null,
        text: "You stand at the high-top. You look out at the vineyard. 4 in. 4 hold. 4 out. 4 hold. You do five cycles. The chest drops from 6 to 5. You do five more. By cycle ten the chest is at a 4. The cognitive content has begun to lose energy, the speech-anxiety thoughts are still there but at lower volume.",
      },
      {
        speakerId: null,
        text: "You take a slow drink of the sparkling water. You watch a small bird land on the railing. You can hear, distantly, Mom laughing at something Cameron's mother said.",
      },
      {
        speakerId: null,
        text: "Eli walks over. Maeve is on his hip. She is wearing a tiny green dress and is staring at you with the unfiltered staring of three-year-olds.",
      },
      {
        speakerId: null,
        text: "The interaction with Eli is short and warm. The dismissal-coded brother of L2-2 has, across the year, become slightly less dismissal-coded. Partly because you stopped calling him for venting-frame and started calling him for hello-frame, partly because Lauren has been working on her own version of the same dynamic with her own brother. The interaction is small. He does not say anything you would have wanted differently.",
      },
      {
        speakerId: null,
        text: "By 6:45 the body is at a 3. You have spoken to Mom for ten minutes. You have not run into Nico. The first speech (the maid of honour) starts at 7:00. The second (the groom's father) at 7:07. Yours at 7:14.",
      },
      {
        speakerId: null,
        text: "You walk to the front. You unfold the speech. You read the opening line. The voice shakes for the first sentence. You let it shake. By the second sentence the voice settles. The middle story about Cameron at age nineteen lands clean. The room laughs at the line you knew would land. The close is two sentences. You raise your glass. The room raises theirs.",
      },
      {
        speakerId: null,
        text: "You walk back to the table. Mia is there. The body is post-adrenaline-crash tired but functional. Mia hands you a glass of wine, which you have earned. You drink it.",
      },
      {
        speakerId: null,
        text: "By the cake, you are dancing. By the drive home Sunday morning, you are tired in the specific way bodies are tired after riding a hard day inside the toolkit. Mia is driving. The body is at a 1.",
      },
      {
        speakerId: "inner-voice",
        text: "What just happened in the last three hours was a complete deployment of the twelve-month toolkit. Box breathing at the table. Naming the state to Mia without asking her to fix anything. Hello-frame interaction with Eli. Riding the post-coffee body activation through to the speech. Letting the voice shake on the first sentence. Walking back to the table and accepting the post-speech wine because the wine was now the wine, not the chemical-management. None of the moves were dramatic. All of them compounded. This is what twelve-month CBT recovery looks like in practice, quiet, specific, deployed without ceremony, indistinguishable from ordinary life.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-ride-end",
        text: "End scene.",
        tactic: "The toolkit-clean ending.",
        nextSceneId: "ending-ride",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // TELL-CAMERON PATH (skill, peer witness)
  // ===================================================================
  {
    id: "tell-cameron-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["cameron"],
    dialog: [
      {
        speakerId: null,
        text: "You find Cameron between the cocktail hour and the reception, in the small antechamber where he is fixing his boutonniere with Theo's help.",
      },
      {
        speakerId: "sam",
        text: "Hey, heads up, my body is loud today. The speech might shake at the start. I'll give it. Just want you to know.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Cameron does not look up from the boutonniere. He is doing the not-looking-up generosity Maya taught you a year ago at the kitchenette.",
      },
      {
        speakerId: "cameron",
        text: "Yeah. I love you. Give the speech. The shake doesn't matter. I want you up there.",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "He looks up now. The look is small. He squeezes your arm, a Cameron squeeze, the same squeeze he did when you graduated.",
      },
      {
        speakerId: "cameron",
        text: "And, like, on a totally different level, thank you for telling me. That is one of the best gifts of the day. Now go drink your sparkling water and breathe.",
        emotion: "happy",
      },
      {
        speakerId: null,
        text: "You go drink your sparkling water and breathe. The body has been told. The secret is no longer secret. The witness in the building is now Mia AND Cameron, which is the calibrated configuration for a high-stakes event with mixed cast.",
      },
      {
        speakerId: null,
        text: "The speech goes well. The voice shakes for the first sentence. Cameron is in the front row and does the small generous nod he does. The room laughs at the line you knew would land. The close is two sentences. You raise your glass. The body is at a 3 by the time you sit down.",
      },
      {
        speakerId: "inner-voice",
        text: "Peer-witnessing at a high-stakes event is the most under-deployed skill in adult anxiety, partly because peers in 2026 are over-asked for low-grade emotional labour and partly because anxious bodies have been taught to under-disclose. Telling Cameron one short sentence in the antechamber was not over-disclosure. It was calibrated peer-witnessing in the same shape Maya modeled at the kitchenette in L1-2. Across years of long friendships, this is the configuration that lets the friendship survive the disorder, small, calibrated, frequent disclosures rather than dramatic ones.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-cameron-end",
        text: "End scene.",
        tactic: "The peer-witness ending.",
        nextSceneId: "ending-cameron",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // COMBINATION PATH (skill, full toolkit)
  // ===================================================================
  {
    id: "combination-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: null,
        text: "You tell Mia at the table, name the state, ask for nothing specific. She says yeah, drinks her wine, lets the table be the table.",
      },
      {
        speakerId: null,
        text: "You walk to the antechamber. You tell Cameron one short sentence about the body being loud. Cameron does the not-looking-up and the warm response.",
      },
      {
        speakerId: null,
        text: "You go back to the table. Box breathing while Mia is at the bar. The chest drops from 6 to 4 across cycles four through ten. By 6:45 you are at a 3.",
      },
      {
        speakerId: null,
        text: "Mom comes over for ten minutes. Mom is being Mom. You let it happen, the calibrated containment from your therapy work means you do not absorb her transmissions and do not push her away. She tells you about the article she read on Lyme disease. You say 'oh god, yeah.' Mia returns and gracefully takes Mom over to talk to Cameron's mother. You exhale.",
      },
      {
        speakerId: null,
        text: "Eli walks past with Maeve. He nods. The nod is the right amount.",
      },
      {
        speakerId: null,
        text: "Nico, the ex, does pass you near the bar at 6:48. They are with their plus-one. They smile politely. You smile politely. The interaction is about four seconds. Your body fires very briefly and descends within ninety seconds. Twelve months ago this would have been a forty-minute spiral. Today it is a ninety-second event.",
      },
      {
        speakerId: null,
        text: "The first speech happens. The second speech happens. Yours is up. You walk to the front. You unfold the paper. You read the opening. The voice shakes for the first sentence. Cameron is in the front row. Mia is at the table. You are doing the thing your body has been training to do for twelve months.",
      },
      {
        speakerId: null,
        text: "The middle story about Cameron at age nineteen lands clean. The room laughs in the right places. The close is two sentences. You raise your glass. The room raises theirs. You walk back to the table. Mia hands you the glass of wine. You drink it.",
      },
      {
        speakerId: null,
        text: "By the cake you are dancing. By the drive home Sunday morning, the body is tired in the post-toolkit-deployed flavour. Mia is driving. The body is at a 1. You can see, in the rearview mirror, the small thing that always happens in your face after a hard day done well, the slightly softer eyes, the slightly easier jaw, the body that knows it just did something that twelve months ago it could not have done.",
      },
      {
        speakerId: "inner-voice",
        text: "What you did today was deploy the full toolkit in front of three witnesses (Mia, Cameron, yourself) at a multi-stressor event with five structural hazards (sleep, coffee, family-of-origin, ex, public speech). None of the deployments were dramatic. All of them compounded. The body recognised what the body was doing, named it, used the tools, completed the day, and arrived at the post-event flavour of a body that has been through hard days inside its own architecture.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Twelve months ago, the body that did this wedding was the body that lost six hours of a Friday night to a Slack message. Tonight it gave a wedding speech. The body is the same body. The skills are the only thing that changed. That is what twelve months of work looks like, in practice, on a Saturday afternoon in October at a vineyard in the Hudson Valley.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-combination-end",
        text: "End scene.",
        tactic: "The full-toolkit ending.",
        nextSceneId: "ending-combination",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-wine",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Took the Edge Off",
    endingLearnPrompt:
      "Glass of red across 35 minutes. Body dropped from 6 to 3 by 5 p.m. speech was fine. Voice did not shake. The middle story landed. The room laughed in the right places. The drive home Sunday was quiet, with the small undefined unease underneath the relief, you did the wedding under chemical, which means the body did NOT learn it could do the wedding without. The body's archive now contains 'wedding done with wine,' and the next big event will reach for wine again. The substitution is the toolkit, which the body has been training for twelve months. Today, in the moment, you reached past it. Lin will name this in Wednesday's session as the second wine-at-an-event entry this year. The pattern is interruptable. The interruption is easier the earlier it gets named.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Wine-managed events are one of the most invisible slow-poison shapes in clinical anxiety, partly because the day is fine. The cost is in the body's archive, which the body uses to predict the next event. The substitution is the toolkit. The toolkit is yours. The toolkit was deployable today. Today's data point becomes the basis for next event's protocol.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-skip",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Cousin Did the Third One",
    endingLearnPrompt:
      "You skipped the speech. Cameron said all the right things. The cousin did the third one instead. Sunday morning the relief had worn off. Tuesday you could not stop replaying the moment with Cameron. The shame layer compounds for six weeks. The L3-1 leave-the-store move, in a content slot the body had been training to handle. Not a moral failing, the conditioning of avoidance reaching for one more session before the toolkit fully takes over. Twelve months ago, you would not have made it to the wedding at all. Today you made it AND skipped the rep. That is the partial-recovery shape, not the no-recovery shape. Lin will use this as data. The next high-stakes event will be approached with a different protocol on the basis of this one.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Avoidance at the high-stakes-event level is the most painful version of avoidance because the cost is socially visible. Cameron registered it, Mia registered it, you registered it. The repair is the L3-2 protocol, exposure, with structured graded plans, applied to public-speaking events. Lin will likely propose a calibrated graded re-entry: deliver short toasts at low-stakes events across the next six months until the body's archive overwrites today's skip-trial. The work is real and recoverable.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-ride",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Voice Shook for the First Sentence",
    endingLearnPrompt:
      "You named the state to Mia without asking her to fix anything. You ran box breathing at the high-top while she got her wine. You spoke to Mom for ten minutes without absorbing her transmissions. You gave the speech. The voice shook for the first sentence. By the second sentence it settled. The middle story landed clean. The room laughed where you knew it would. By the cake you were dancing. By the drive home Sunday morning, the body was at a 1. None of the moves were dramatic. All of them compounded. This is what twelve-month CBT recovery looks like in practice, quiet, specific, deployed without ceremony, indistinguishable from ordinary life.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The voice shaking for the first sentence is the recovery, not the absence of it. The recovered body is not the body that does not fire alarm, that body does not exist at twelve months and may not exist at any timescale. The recovered body is the body that fires alarm AND knows what to do, deploys the tools, lets the voice shake, and continues. The shake is the body. The continuation is the work. Both are real. Both are yours.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cameron",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "One of the Best Gifts",
    endingLearnPrompt:
      "You told Cameron one short sentence in the antechamber. He did the not-looking-up generosity Maya taught you a year ago at the kitchenette. He squeezed your arm. He said 'thank you for telling me. That is one of the best gifts of the day.' The body had been told. The secret was no longer secret. The witness in the building was now Mia AND Cameron, the calibrated configuration for a high-stakes event with mixed cast. The speech went well. Peer-witnessing at high-stakes events is the most under-deployed skill in adult anxiety, partly because peers in 2026 are over-asked for low-grade emotional labour. Telling Cameron one short sentence was not over-disclosure. It was calibrated peer-witnessing in the same shape Maya modeled. Across years of long friendships, this is the configuration that lets the friendship survive the disorder.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "What Cameron said, 'thank you for telling me, that is one of the best gifts of the day', is the part of peer-witnessing that anxious bodies do not anticipate. The peer is, generally, glad to be told. The peer's only access to your interior life is what you tell them; not telling them is, in some sense, refusing them the chance to be a peer. Most peers, when told, do exactly what Cameron did, the small generous response, the squeeze, the thank-you. The disorder predicts they will not. The data, across thousands of peer-disclosures in clinical research, is that they almost always do.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-combination",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Same Body, Different Skills",
    endingLearnPrompt:
      "Three witnesses. Five structural hazards (sleep, coffee, family-of-origin, ex, public speech). The full toolkit deployed quietly across three hours. Mia at the table named without ask. Cameron in the antechamber peer-witnessed. Mom contained without absorption. Eli's nod the right amount. Nico passed at the bar, ninety-second body event, twelve months ago a forty-minute spiral. The voice shook for the first sentence of the speech. By the second sentence it settled. The middle story landed clean. By the cake you were dancing. Twelve months ago, the body that did this wedding was the body that lost six hours of a Friday night to a Slack message. Tonight it gave a wedding speech. The body is the same body. The skills are the only thing that changed. That is what twelve months of work looks like, in practice, on a Saturday afternoon in October at a vineyard in the Hudson Valley. The recovery is not a graduation. The recovery is a different relationship to the same body. The skills are real. The work continues.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "What twelve months of skilled CBT recovery looks like is not the absence of the disorder. It is the body that fires the alarm under multi-stressor conditions AND knows exactly what to do. The toolkit gets quieter as it gets more deployed. The dramatic deployments fade and the ordinary ones compound. The voice shaking for the first sentence is the body. The continuation is the work. Both are yours. Tonight, in October, at a vineyard in the Hudson Valley, you walked through five hazards with three witnesses and your own toolkit and you arrived at the post-event flavour of a body that has been through hard days inside its own architecture. The arc closes here. The work continues. Most of the next year of your life will be small versions of today, the body firing, the body knowing, the body using the tools, the body continuing. That is the recovery. That is what you came here to learn.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety51: Scenario = {
  id: "anx-5-1",
  title: "The Wedding",
  tagline: "Twelve months later. Saturday at a vineyard. The body fires. You know what to do.",
  description:
    "Closing scene of the long-form anxiety arc. Twelve months past the L1-1 3 a.m. Slack spiral. Sam at Cameron's wedding upstate. Five structural hazards (moderate sleep, two coffees, family-of-origin, an ex, public speech). The body fires the alarm in the recognisable shape, old grocery-store-Trader-Joe's flavour, smaller and more sustained. Five available moves: glass of wine to take the edge off (substance-managed event, body's archive remembers); skip the speech (avoidance, partial-recovery shape, six-week shame); ride quiet with toolkit + name-state to Mia (skill, voice shakes for first sentence, settles); peer-witness with Cameron in the antechamber (skill, 'one of the best gifts of the day'); full combination (Mia + Cameron + breathing, the complete twelve-month toolkit deployed). Five endings. The arc closes here. Includes the Loving-Mira Easter egg per the design doc, two strangers describe a music-producer sister in Williamsburg with dogs Ezra and Sade.",
  tier: "premium",
  track: "anxiety",
  level: 5,
  order: 1,
  estimatedMinutes: 16,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 520,
  badgeId: "the-wedding",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Twelve-month toolkit deployed quietly under multi-stressor conditions, box breathing at the high-top, name-state to partner, peer-witness with friend",
    "The voice shaking for the first sentence as the recovery, recovered body is not the body that does not fire alarm; it is the body that fires alarm AND knows what to do",
    "Calibrated peer-disclosure at high-stakes events, one short sentence in the antechamber as the configuration that lets long friendships survive the disorder",
    "Family-of-origin containment. Mom's transmissions received without absorption and without push-away; the calibration trained across the year",
    "Brief somatic events that twelve months ago would have been forty-minute spirals (the ex passing at the bar), ninety-second body event, descended via the recognised toolkit",
  ],
  redFlagsTaught: [
    "Wine-managed events as invisible slow-poison, day is fine, body's archive remembers 'event done with wine,' next event reaches for wine again",
    "Skipping the rep at the high-stakes event, partial-recovery shape, not no-recovery, but compounds shame for six weeks and registers socially",
  ],
  characters: [INNER_VOICE, SAM, MIA, CAMERON],
  scenes,
};

export default anxiety51;
