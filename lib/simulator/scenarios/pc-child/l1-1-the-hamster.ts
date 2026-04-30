/**
 * pc-1-1, "The Hamster"
 *
 * Psychopath-Child track, Level 1, order 1. Voice-lock scenario for
 * the whole track.
 *
 * This is the scenario the parent remembers for the rest of their
 * life as the moment the pattern resolved into a picture.
 *
 * Written with clinical restraint. The child is not a villain. The
 * child has a neurological condition. The scenarios teach the parent
 * to act on behaviour, not on identity. Voice is unchanged Kanika —
 * cold, observational, merciless with softeners but the subject is
 * your own five-year-old, which is the heaviest register in the
 * catalogue.
 *
 * Opens with an explicit content gate. The gate is always the first
 * scene on every scenario in this track.
 *
 * Voice: reference/KANIKA-VOICE.md + reference/TRACK-pc-child.md.
 */

import type { Scenario, Scene } from "../../types";
import {
  INNER_VOICE,
  CHILD_5,
  SIBLING_YOUNGER,
  THE_PARTNER,
} from "../../characters";

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE, mandatory opening for every scenario in this track
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This track is written for parents of a child showing conduct-disorder or callous-unemotional traits. The scenarios include references to animal harm (described, not depicted), sibling harm, and the specific grief of a parent recognising a pattern in their own child.",
      },
      {
        speakerId: null,
        text: "There is no catastrophising in this track. Not every cruel behaviour at age five becomes a diagnosis at age twenty. The scenarios teach the frame, the vocabulary, and the interventions that have evidence. They do not demonise the child.",
      },
      {
        speakerId: null,
        text: "If this is the wrong scenario for you tonight, you may exit. If this is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue. I am ready.",
        tactic: "Opt-in. The scenario will begin at 9:14 a.m. on a Saturday.",
        nextSceneId: "the-kitchen",
        isOptimal: true,
      },
      {
        id: "exit",
        text: "Not tonight. I will come back.",
        tactic: "Valid. The scenario will be here when you return.",
        nextSceneId: "ending-opted-out",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ACT 1, the kitchen
  // ===================================================================
  {
    id: "the-kitchen",
    backgroundId: "apartment",
    mood: "cold",
    immersionTrigger: "cold-moment",
    presentCharacterIds: ["child-5"],
    dialog: [
      {
        speakerId: null,
        text: "Saturday, 9:14 a.m. your son Finn, aged five, was given his class's pet hamster to keep for the weekend. You went upstairs at 8:50 to get dressed. The last thing you saw before leaving the kitchen was Finn sitting cross-legged on the floor, the cage open on the tile, a piece of cereal held out to the hamster.",
      },
      {
        speakerId: null,
        text: "You come back down at 9:14. The hamster is dead on the kitchen floor. Finn is at the breakfast bar eating toast.",
      },
      {
        speakerId: "child-5",
        text: '"It got scared and ran away from me. I didn\'t do anything. I don\'t know what happened."',
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "His voice is steady. He has already taken another bite of the toast.",
      },
      {
        speakerId: "inner-voice",
        text: "Note what is missing from the room. Note it in this order, because the sequence matters later. One, he is not crying. Two, he did not come find you upstairs when the hamster died. Three, he has not stopped eating. Four, the explanation he is giving is grammatically complete and ready on arrival, which is a form that five-year-olds in real distress almost never produce.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The behaviour is one data point. It might not mean what you are afraid it means. The absence, the missing crying, the missing running to you, the uninterrupted breakfast, is a different kind of data. It is what the diagnostic literature on callous-unemotional traits describes as the 'telling stillness.' A neurotypical five-year-old who has witnessed the death of a small animal is a specific kind of hysterical. Your son is eating toast.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You now have a series of decisions to make in the next ninety minutes. Most of what happens over the next fifteen years of your parenting of this child depends on how disciplined you are in the next ninety minutes. Take them in the right order.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "check-the-evidence",
        text: "Before anything else, look at the body. Quietly. Without him seeing you look.",
        tactic: "Observation first. The body tells you whether the explanation is physically possible. You are not accusing your child; you are establishing the facts of what happened in the room you were not in.",
        nextSceneId: "the-evidence",
        isOptimal: true,
      },
      {
        id: "call-partner",
        text: "Text your partner at the bank: 'Something happened with Finn. Come home when you can. Not an emergency.'",
        tactic: "Bring the co-parent in early. This is a conversation that must not be held only in your head. The 'not an emergency' phrasing is deliberate, you do not want them driving home panicked.",
        nextSceneId: "partner-on-way",
        isOptimal: true,
      },
      {
        id: "quiet-the-house",
        text: "Before any conversation: put Lily in her room with a show. She is three. She does not need to see this kitchen right now.",
        tactic: "Sibling protection first. The decision tree you are about to walk through is for adults. Lily gets forty-five minutes of Bluey. No negotiation.",
        nextSceneId: "lily-settled",
        isOptimal: true,
      },
      {
        id: "question-him",
        text: 'Sit down opposite Finn. "Finn. I need you to tell me exactly what happened. Slowly."',
        tactic: "Direct questioning of a five-year-old who has already produced a complete explanation will almost certainly produce a refinement of that same explanation. You will not learn what happened. You will learn how he polishes a story under pressure.",
        nextSceneId: "questioning-him",
      },
    ],
  },

  // ===================================================================
  // ACT 2A, the evidence
  // ===================================================================
  {
    id: "the-evidence",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "You walk to where the hamster is. You crouch. You do not touch it. Finn continues eating his toast; you are, now, out of his direct line of sight, which gives you ninety seconds of observation time.",
      },
      {
        speakerId: null,
        text: "The hamster has no external injuries you can see. Its back is unusually arched. There is no blood. There are no bite marks on the cereal that remains on the floor. The cereal has not been eaten.",
      },
      {
        speakerId: "inner-voice",
        text: "You are not a veterinary pathologist. You do not know, from this visual, what killed the animal. What you do know is that the story Finn is telling, 'it got scared and ran away from me', does not explain why the cereal is intact, why the cage door is open, or why a hamster would sustain the kind of posture-injury suggested by that arch.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Photograph the scene with your phone. Do not narrate what you are doing. Do not tell Finn. Photograph the body, the cage, the cereal, the distance between them. Save the photos to a folder you will not look at often. This is, starting today, the first entry in a document that will matter in fifteen years if anyone ever asks.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You photograph. You stand up. You take the trash bag from under the sink. You lift the hamster with the trash bag as a glove, still not touching it. You place it, bag and all, in the outside bin. You wash your hands for longer than you need to.",
      },
    ],
    nextSceneId: "lily-settled",
  },

  {
    id: "questioning-him",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["child-5"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"I already told you. It got out when I was putting in the food. And I tried to catch it but it ran under the chair. And when I looked it wasn\'t moving. I didn\'t touch it."',
        emotion: "neutral",
      },
      {
        speakerId: "child-5",
        text: '"I think it had a heart attack. Sometimes animals have heart attacks."',
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Note the addition. You did not ask him for a cause of death. He volunteered one. The volunteered cause, 'heart attack', is a sophisticated deflection. It is also a sentence a five-year-old might have heard from an adult in the past week about a grandparent, or from a television programme. Or from no one. You do not know.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "You have learned nothing from the questioning that you did not already know. The story is still consistent. The absence of distress is still absolute. Direct questioning at this age produces refinement, not confession. Stop asking. Photograph the scene now and bring in the co-parent.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "the-evidence",
  },

  // ===================================================================
  // ACT 2B, sibling + partner in the room
  // ===================================================================
  {
    id: "lily-settled",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["sibling-younger"],
    dialog: [
      {
        speakerId: null,
        text: "Lily, your three-year-old, is in her room with an episode of Bluey running. You tell her she can have a second episode if she stays put and does not come downstairs. She nods without looking up from the screen.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the first of approximately ten thousand decisions you will make in the next fifteen years that centre on protecting Lily. Today it is a cartoon. In six months it will be a different bedroom. In three years it will be supervision rules. In eight years it will be the decision about whether to tell her what the pattern is. Today is the easy version. Do not understate today, the motor habit of choosing her safety first is the habit you are training.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "partner-on-way",
  },

  {
    id: "partner-on-way",
    backgroundId: "apartment",
    mood: "tense",
    dialog: [
      {
        speakerId: null,
        text: "Your partner texts back within four minutes: 'On my way. Twenty minutes. What happened?'",
      },
      {
        speakerId: null,
        text: "You type, delete, type again, send: 'Hamster is dead. Finn says it got scared. I do not think that is what happened. I need us both in the room.'",
      },
      {
        speakerId: "inner-voice",
        text: "Note the construction of that text. You did not say 'Finn killed the hamster.' You described the behaviour ('Finn says it got scared'), named your own read ('I don't think that's what happened'), and requested the co-parent's physical presence. That is the template for every conversation you will have with your partner about this child for the rest of your parenting. Describe behaviour, not identity. State your read as your read. Bring them into the room.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-quiet",
        text: "Wait in the kitchen. Do not interrogate Finn further. Do not narrate aloud. Drink water.",
        tactic: "The twenty-minute wait is for your own nervous system. You will have a better conversation with your partner at 9:36 than you will have at 9:16.",
        nextSceneId: "partner-arrives",
        isOptimal: true,
      },
      {
        id: "start-the-log",
        text: "Open a note on your phone. Begin the document: 'Saturday [date], 9:14 am. Hamster found dead. Finn's explanation: it got scared.' Keep writing.",
        tactic: "The single most valuable habit to start today. Documentation matters in three years, in seven years, in fifteen years. Dated entries, described behaviour, your read noted as your read.",
        nextSceneId: "log-begun",
        isOptimal: true,
      },
      {
        id: "confront-him",
        text: "Go back to Finn. Tell him you know he is lying. Tell him this is serious.",
        tactic: "You are running on adrenaline. Confronting him now will produce a tighter version of the same story and will teach him, at age five, how to handle accusations under pressure. Wait for your partner.",
        nextSceneId: "confronted-alone",
      },
    ],
  },

  {
    id: "log-begun",
    backgroundId: "apartment",
    mood: "peaceful",
    dialog: [
      {
        speakerId: null,
        text: "You open a note. You title it, after a pause, not 'Finn incidents' but 'Household log, family A.' The anonymisation is deliberate; you may have to show this to someone professional in years to come and you want the document to read as observation, not accusation.",
      },
      {
        speakerId: null,
        text: "You write: 'Saturday [date], 9:14 am. Hamster found dead on kitchen floor. Cage door open. Cereal on floor intact. Finn's position at discovery: seated at breakfast bar, eating toast. Finn's volunteered explanation: animal got scared and ran away; volunteered cause of death: heart attack. Behaviours observed: no crying, no seeking of parent after the event, uninterrupted eating. Action: photographed scene, disposed of animal in outside bin. Partner notified by text at 9:18; arriving 9:36.'",
      },
      {
        speakerId: "inner-voice",
        text: "You just did the hardest thing most parents in this position never do, you wrote it down on the day. Not at age eight when the school is calling, not at age fifteen when the therapist asks for a history, but today. A dated entry from the original moment is worth, in any future clinical or legal context, more than a thousand reconstructions.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Keep this note going from now on. One line per incident. No interpretation that is not labelled as interpretation. Do not delete old entries even if they later seem overblown. The pattern is in the shape of the entries as a whole, not any single one.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "partner-arrives",
  },

  {
    id: "confronted-alone",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["child-5"],
    dialog: [
      {
        speakerId: "child-5",
        text: '"I am not lying. Why are you being mean to me. I didn\'t do anything. Why don\'t you believe me."',
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Finn produces tears. They arrive in the correct sequence, eyes first, voice-break second, face in hands third. The sequence is textbook. They do not convince you.",
      },
      {
        speakerId: "inner-voice",
        text: "Record this in the log when you next pick up the phone. The tears came only after you accused him, and they came in the correct staged sequence rather than the disorganised one a distressed child typically produces. This is not proof of anything by itself. It is another data point, dated and documented.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "Stop the conversation. Do not apologise for accusing him. Do not comfort him. Say 'we will talk when your other parent gets home' and walk into a different room.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "partner-arrives",
  },

  // ===================================================================
  // ACT 3, the partner in the room
  // ===================================================================
  {
    id: "partner-arrives",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: null,
        text: "Your partner comes in the front door at 9:38. They do not take their shoes off. They see your face; they put their keys down; they walk to the kitchen. You have, mercifully, already moved Finn to the living room with a book.",
      },
      {
        speakerId: "the-partner",
        text: '"Tell me."',
        emotion: "serious",
      },
      {
        speakerId: null,
        text: "You tell them. You keep to the behaviour and the absence of distress. You show them the photograph. You read them the log entry.",
      },
      {
        speakerId: "the-partner",
        text: '"... okay. Okay. I hear you. I want to believe this is nothing. I know that is what I want."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner just said the most honest sentence available to a co-parent in this position, they want to believe it is nothing, and they know that wanting is a bias they will have to correct against. That sentence is a gift. It means the conversation is possible.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "propose-specialist",
        text: '"I want us to call a specialist in conduct disorder this week. Not our paediatrician. A specialist."',
        tactic: "The single most important decision of the morning. Paediatricians are generally not equipped for this; they will offer behavioural advice that will not work and will delay the correct intervention by years. Insist on a specialist.",
        nextSceneId: "partner-agrees-specialist",
        isOptimal: true,
      },
      {
        id: "propose-sibling-move",
        text: '"Starting tonight, Lily sleeps in our room. We move her back when we have a specialist opinion."',
        tactic: "Sibling protection formalised. This is not overreaction. This is the motor habit you want to establish in the first twelve hours.",
        nextSceneId: "partner-agrees-sibling",
        isOptimal: true,
      },
      {
        id: "propose-wait-and-see",
        text: '"Let\'s watch for a few more weeks. This might be a one-off. We don\'t want to overreact."',
        tactic: "The parent-position that loses you, statistically, the next three to five years. 'Wait and see' is almost always motivated by the parent's own grief, not by the child's interest.",
        nextSceneId: "partner-agrees-wait",
      },
      {
        id: "propose-both",
        text: "Propose both: specialist this week, and Lily moves to our room tonight. Non-negotiable on both.",
        tactic: "The full discipline of the morning. Both actions, same conversation, no compromise, no horse-trading.",
        nextSceneId: "partner-agrees-both",
        isOptimal: true,
      },
    ],
  },

  {
    id: "partner-agrees-specialist",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Yes. I agree. Not the paediatrician. A specialist. I will call Monday. I will pay whatever it costs."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Write down what just happened. Write it in the log before you forget the exact sentence. Your partner agreed, in clear terms, to the correct first step on a morning they did not want to be having this conversation on. That is the marriage working. Note it. In eighteen months when this is harder you will need to remember this morning as proof that the two of you are capable of it.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-acted-today",
  },

  {
    id: "partner-agrees-sibling",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Yes. Lily moves tonight. I will set up the travel cot in our room while you talk to Finn about the new arrangement."',
        emotion: "serious",
      },
      {
        speakerId: "inner-voice",
        text: "Finn will ask why Lily is moving. The answer is: 'because we are trying a different sleeping arrangement for a while.' Not 'because we are worried about her with you.' You do not explain parental worry to a five-year-old you are trying to read. You describe the action. The action is the intervention.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-sibling-moved",
  },

  {
    id: "partner-agrees-both",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: '"Okay. Both. Specialist Monday. Lily moves tonight. I will do the travel cot. You call the specialist."',
        emotion: "serious",
      },
      {
        speakerId: "the-partner",
        text: '"I need to say something and I need you to hear it. I love Finn. I am afraid of Finn. Those are both true today. I don\'t know how to hold them yet."',
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Your partner just said the sentence most co-parents in this position never say out loud to each other. They said it on the day it became true. They named the fear. They did not ask you to resolve the contradiction for them. If you can stay married to the person who can say this sentence on this morning, you have a real chance of surviving the next fifteen years.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-first-real-conversation",
  },

  {
    id: "partner-agrees-wait",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["the-partner"],
    dialog: [
      {
        speakerId: "the-partner",
        text: "\"Maybe. Maybe it was a one-off. Let's watch.\"",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "The 'maybe it was a one-off' position is understandable and, almost always, wrong. The next incident arrives in somewhere between six and eighteen months. During those six to eighteen months, Finn will refine his handling of the pattern. Both the behaviour and the post-behaviour story, because he has had the feedback of one unchallenged event. You are not protecting him by waiting. You are giving him a practice run.",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "If this is where the conversation ends today, keep the log anyway. Date today's entry. When the next incident happens, you will open the log, read this entry, and the pattern will resolve faster. The log is the insurance policy against the wait-and-see frame.",
        emotion: "knowing",
      },
    ],
    nextSceneId: "ending-normalised",
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingSummary:
      "You opted out of the scenario before it began. That is a legitimate choice. The material here is heavy and specific, and nobody is helped by you reading it on the wrong evening. The scenario will be here when you return. In the meantime, the anxiety track and the toxic-narc track are available, and either is a reasonable adjacent start.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You know your own bandwidth. Respecting it is part of the discipline.",
        emotion: "neutral",
      },
    ],
  },

  {
    id: "ending-acted-today",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Kitchen Held",
    endingSummary:
      "By 10 a.m. Saturday you had done the four things that matter on this morning: you observed before you accused, you protected Lily's Saturday, you brought your co-parent into the room, and you agreed on a specialist referral for Monday. You did not confront Finn. You did not catastrophise. You did not ask him to confess. You did, quietly, begin a document that will matter in fifteen years. This is the minimum responsible response to the first time a parent sees this pattern clearly. Everything that happens over the next decade depends on the groove this morning cut. The groove is in the right direction.",
    endingLearnReference: "predators-gaze-how-sociopaths-detect-weakness",
    endingLearnPrompt:
      "The specialist is not optional. Paediatricians are for ear infections and growth charts. A child with callous-unemotional traits needs a clinician with specific training. Ask the specialist for an assessment, not for reassurance.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Today was hard. Today was also the easiest version of the decisions you will have to make about this child. Note that. The ones ahead, the school principal in five years, the triangulation in ten, the legal-adult boundary in fifteen. All depend on the reps you just put in at age five. You just proved to yourself you are capable of the category of decision this parenting will require.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Monday, 8:02 a.m., your partner calls three specialists before the first coffee. One of them can see you in three weeks. You book it. You add the date to the log.",
      },
    ],
  },

  {
    id: "ending-sibling-moved",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Room Change",
    endingSummary:
      "Lily moves to your room tonight. Finn notices at bath time. He asks why. You say, without drama, 'we are trying a different arrangement for a while.' He says 'okay.' He does not ask again. That is not necessarily suspicious, a five-year-old might reasonably not ask again. It is, however, noted. The travel cot goes up in your room in the corner by the window. You lie in bed at 10 p.m. listening to Lily's breathing on the floor and you are, for the first time in about two years, certain that you are doing one specific thing correctly in this house.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The small certainty in the dark is the reward for having moved on the decision the same day you recognised it was needed. That certainty is not a feeling you will get often in the next fifteen years; when you get it, write down what produced it. The pattern of good decisions in this parenting is not visible day by day. It is visible from six feet away across a year.",
        emotion: "knowing",
      },
    ],
  },

  {
    id: "ending-first-real-conversation",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The First Real Conversation",
    endingSummary:
      "You and your partner had the conversation most couples in this position do not have until year four or year seven, the one where both of you say, out loud, in daylight, that you love your child and you are afraid of your child, and both are true. You agreed to the specialist. You agreed to the room change. You did not pretend. You also did not catastrophise. You held the double truth together, in the kitchen, before noon on a Saturday. This is the obsidian-rarity version of this scenario for a specific reason. Most couples cannot produce this conversation on the first day. You did. Protect that capacity in your marriage above almost everything else over the next fifteen years. It is, statistically, the variable most predictive of surviving this.",
    endingLearnReference: "architecture-of-control-how-emotional-dependency-is-built",
    endingLearnPrompt:
      "The marriage is the infrastructure. Every scenario in the upcoming levels will test it. Couples who can say the double truth. I love the child and I am afraid of the child, to each other without shattering have, by a large margin, the best outcomes. Revisit this sentence at every milestone.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You will each, privately, have nights over the next decade where you doubt the read you took this morning. Revisit the log on those nights. The entries are dated specifically so that the doubt can be tested against the record. Do not re-write the entries. Do not delete them. The record is your alliance with your past self.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Lily sleeps in your room by 8:40 p.m. the log has three entries by midnight, the hamster, the partner conversation, the room change. You sleep at 11:47. Finn is asleep down the hall. The house is, structurally, different than it was at breakfast.",
      },
    ],
  },

  {
    id: "ending-normalised",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "bad",
    failureBlogSlug: "predators-gaze-how-sociopaths-detect-weakness",
    failureBlogTitle: "Predator's Gaze. How Sociopaths Detect Weakness",
    endingTitle: "Wait and See",
    endingSummary:
      "You and your partner agreed to wait. The hamster is buried in the back garden on Sunday afternoon. Finn cries at the burial, at the appropriate moment in the ceremony, and neither of you can decide whether the tears are real. The specialist call does not happen. The log, if you began one, lapses by week three. Finn is on his best behaviour for approximately five months. Then the next incident arrives, at a friend's house, involving their cat, reported back to you by an apologetic parent who is not sure what to make of it. By then you have lost the clean first-day version of the documentation and, more importantly, Finn has had six months of practice handling the absence of consequences. The scenario is not catastrophic. It is simply a lost year. You will have this scene again. You will recognise it the second time.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Do not be harsh with yourself about this. The parent-position of 'wait and see' is the most common response in this scene and most parents who make it arrive eventually at the correct intervention, just two to five years late. The log, even if lapsed, is recoverable. The specialist call is a phone call that can happen any Monday morning. The lost year is not a lost life. Recognise the pattern earlier next time. Today is data for next time.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The household returns to normal-looking by Sunday night. The hamster is in the garden. Finn is asleep. Lily is asleep. You and your partner lie in bed and do not talk about it. The silence on this specific subject will last approximately five months.",
      },
    ],
  },
];

export const pcChild11: Scenario = {
  id: "pc-1-1",
  title: "The Hamster",
  tagline: "Saturday, 9:14 a.m. your five-year-old is eating toast. The hamster is on the floor.",
  description:
    "Opens with a content gate. This scenario is for parents of a child showing conduct-disorder or callous-unemotional traits. It is the morning a parent first recognises the pattern clearly and the ninety minutes that follow, which shape the next fifteen years of the parenting. Voice-lock scenario for the pc-child track.",
  tier: "vip",
  track: "pc-child",
  level: 1,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 300,
  badgeId: "the-kitchen-held",
  startSceneId: "content-gate",
  tacticsLearned: [
    "Observe before accusing, the absence of distress is the diagnostic signal, not the behaviour",
    "Specialist referral (conduct disorder / CU-traits clinician), not paediatrician",
    "The household log, dated entries, behaviour described, interpretation labelled",
    "Sibling protection as motor habit, the room change tonight, not next week",
    "The double truth, 'I love my child, I am afraid of my child', spoken in daylight with your partner",
    "Describe behaviour, not identity. In the log, in the partner conversation, in all clinical contexts",
  ],
  redFlagsTaught: [
    "Grammatically complete explanations delivered on arrival by a distressed five-year-old",
    "The 'telling stillness', continued eating, no crying, no parent-seeking after an event",
    "Volunteered causes of death that were not asked for",
    "Tears in correct staged sequence under accusation (vs. disorganised real distress)",
    "The 'wait and see' parent-position as the most common and most costly error",
  ],
  reward: {
    id: "the-kitchen-held",
    name: "The Kitchen Held",
    description:
      "You did the four things that matter before 10 a.m. Saturday. The rest of the parenting depends on the groove this morning cut.",
  },
  characters: [INNER_VOICE, CHILD_5, SIBLING_YOUNGER, THE_PARTNER],
  scenes,
};

export default pcChild11;
