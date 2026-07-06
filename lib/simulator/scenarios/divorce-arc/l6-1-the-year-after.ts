/**
 * divorce-6-1, "The Year After"
 *
 * Divorce-Arc, Level 6, order 1. The capstone. Where divorce-1-1 was
 * one sixty-minute conversation, this is four moments spread across the
 * first twelve months on the other side of the decision: the first
 * solo school pickup, the first Christmas handover, the first loyalty
 * bid carried across the water by a child, and the hoover that arrives
 * at 10:40 p.m. in month eight. Same protagonist, same covert-narc ex
 * (THE_SPOUSE), the marriage now legally over but the register still
 * live.
 *
 * Register-shift from the rest of the arc: the earlier scenarios were
 * decisions under pressure. This one is discipline in the quiet, the
 * thousand small refusals to re-enter the old shape when nobody is
 * watching you refuse. The teaching is that leaving well does not feel
 * like winning; it feels like a specific quiet you learn to sit inside
 * without filling.
 *
 * Teaches:
 *  - The solo-pickup discipline: name the quiet precisely (a nervous
 *    system noticing a channel gone silent, not loneliness) and sit in
 *    it without discharging it into performance or contact
 *  - Gray rock in front of an audience at the Christmas handover: the
 *    gift and the "come in for five minutes" are staged for the
 *    neighbour and the kids; receive flatly, decline by not engaging,
 *    move to logistics
 *  - The loyalty bid the child carries ("Dad says you wanted everything
 *    to change"): let it pass without counter-programming, because the
 *    counter-move to a loyalty bid is refusing to make the child the
 *    battlefield, not winning the argument
 *  - The 10:40 p.m. hoover: warmth, a partial admission, a shared-loss
 *    frame, zero accountability, timed for tiredness; the clean decline
 *    that refuses the late-night register and re-routes to the kids
 *
 * Mandatory content gate. The best ending is quiet, not triumphant.
 *
 * Voice ref: KANIKA-VOICE.md.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE, THE_SPOUSE } from "../../characters";

/**
 * Local cast. Voiced with clinical restraint: short lines, flat affect
 * in the telling detail. The children are not villains and not props;
 * they are people the year is happening to.
 */
const DAUGHTER: Character = {
  id: "daughter",
  name: "Nell",
  description:
    "Your elder child. Twelve. Watches both parents with a precision that predates the separation. Carries messages across the water without knowing she is a courier.",
  traits: ["observant", "loyal-to-both", "twelve"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "child",
  silhouetteType: "child",
};

const SON: Character = {
  id: "son",
  name: "Jonah",
  description:
    "Your younger child. Eight. Less weather-aware than his sister. Asks the direct questions she has learned not to.",
  traits: ["young", "direct", "eight"],
  defaultEmotion: "neutral",
  gender: "male",
  personalityType: "child",
  silhouetteType: "child",
};

const scenes: Scene[] = [
  // ===================================================================
  // CONTENT GATE
  // ===================================================================
  {
    id: "content-gate",
    backgroundId: "apartment",
    mood: "cold",
    dialog: [
      {
        speakerId: null,
        text: "Content note. This is the capstone of the divorce arc: the first year on the other side of the decision. It is quieter than the scenarios before it. No conversation across a table, no lawyer, no move-out. Four moments across twelve months, and in each one the only question is whether the boundaries you built in the earlier scenarios hold when nobody is watching you hold them.",
      },
      {
        speakerId: null,
        text: "The register is not triumph. Leaving well does not feel like winning; it feels like a specific quiet you have to learn to sit inside without filling. If tonight is the wrong night for quiet, exit. If it is the right one, continue.",
      },
    ],
    choices: [
      {
        id: "continue",
        text: "Continue.",
        tactic: "A few weeks since the move-out. A rented house on the other side of the same town. The school run is yours on the weeks the kids are yours.",
        nextSceneId: "the-new-address",
      },
      {
        id: "exit-gate",
        text: "Exit. Return when the conditions are right.",
        tactic: "The year will still be here. A quiet-register scenario runs on your own bandwidth, not on a passing curiosity.",
        nextSceneId: "opted-out",
      },
    ],
  },

  {
    id: "opted-out",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Not Tonight",
    endingSummary:
      "You closed the gate. The capstone runs on your own bandwidth, and it will keep.",
    endingLearnPrompt:
      "The opt-out is a complete move. The year-after scenario is the quietest in the arc, and quiet asks more of you than pressure does, not less. Come back when you have the bandwidth to sit in it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Closed the gate. The year will be here.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  // ===================================================================
  // FRAMING
  // ===================================================================
  {
    id: "the-new-address",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "The house is rented, smaller, on a street you did not know a year ago. A few weeks since the boxes. The furniture that came with you looks provisional against walls that are not yours yet. Nell has the bigger of the two spare rooms; Jonah has the one over the boiler that ticks. On the weeks the kids are with him, the house is very quiet. On the weeks they are with you, it is loud in a way that is entirely yours to manage.",
      },
      {
        speakerId: "inner-voice",
        text: "The infrastructure is behind you. The decision is behind you. What is in front of you is a year of first times, and the discipline of the year after is not one hard conversation; it is a thousand small refusals to re-enter the old shape. The marriage is over on paper. The register is not.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    nextSceneId: "the-pickup-line",
  },

  // ===================================================================
  // VIGNETTE 1: THE SOLO PICKUP
  // ===================================================================
  {
    id: "the-pickup-line",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "September. The first solo school pickup on your week. You stand at the railings with the other parents, most of whom you know slightly, one or two of whom know. The bell goes. The thing you were not braced for is not sadness. It is the absence of the small ongoing conversation that used to run under everything, the low negotiation of two people managing one logistics. There is no one to text 'got them, heading home.' There is just you, and the children, and the car.",
      },
      {
        speakerId: "inner-voice",
        text: "Name it precisely, because the name determines what you do next. This is not loneliness. Loneliness is wanting a person. This is the nervous system noticing that a channel it ran on for nineteen years has gone quiet. The channel was not always kind. The quiet is not the same as the loss of something good.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "hold-the-quiet",
        text: "Let the quiet be quiet. Put the phone in your bag. Walk to the car with Nell and Jonah. Notice the moment; do not narrate it to anyone, including yourself.",
        tactic: "The correct move is the smallest one. The urge in the first solo pickup is to do something with the feeling: text a friend the poignant observation, reach for the old channel out of habit. Sitting in the quiet without discharging it is how the quiet stops being an emergency and becomes, eventually, just the weather.",
        nextSceneId: "the-handoff-week",
        isOptimal: true,
        xpBonus: 40,
        feedback:
          "Named accurately, held without discharge. The first solo pickup is where the quiet either becomes an emergency you keep managing or a fact you get used to. You let it be a fact.",
        event: "restraint-shown",
      },
      {
        id: "perform-for-the-mothers",
        text: "One of the other mothers catches your eye with the sympathetic head-tilt. Perform brightness for her: \"We're doing really well, honestly, the kids are thriving, it's all very amicable.\"",
        tactic: "The over-bright performance is for her comfort, not yours, and it costs you. Every time you narrate 'amicable' and 'thriving' to the railings, you write a version of events you will then feel obliged to maintain. You do not owe the school gate a status report. 'We're doing okay' is a complete sentence.",
        nextSceneId: "pickup-perform-derail",
        isOptimal: false,
      },
      {
        id: "text-him-logistics",
        text: "Reach for the old channel. Text him: \"Got them, heading home. Nell has a spelling test Friday.\" The logistics are real; the text is habit.",
        tactic: "The logistics are a cover story the habit is telling you. Nothing about a Friday spelling test needs to travel to him tonight, on your week, in real time. The old channel wants to stay warm. Route genuine co-parenting logistics through the agreed method (the shared calendar), not a live text that reopens the running conversation.",
        nextSceneId: "pickup-contact-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "pickup-perform-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "You hear yourself say 'thriving' and watch her file it. It is not a catastrophe; it is a small tax. The recovery is to stop narrating and let the next silence at the railings be un-narrated.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "let-the-story-go",
        text: "Let the \"amicable\" stand without building on it. Walk to the car. Do not send the follow-up text explaining what you meant.",
        tactic: "Recovery. The over-bright sentence is said; you do not have to keep feeding it. One un-defended silence resets the register.",
        nextSceneId: "the-handoff-week",
        isOptimal: true,
      },
    ],
  },

  {
    id: "pickup-contact-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The reply comes back within a minute, warm, a little too easy: 'thanks for letting me know x.' The x is the tell. The channel is not neutral logistics; it runs warm the second you feed it.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "route-to-method",
        text: "Do not reply to the x. Move the spelling-test note to the shared calendar where it belongs. Let the thread go cold.",
        tactic: "Recovery. Genuine logistics have a channel that is not a live warm thread. Using it starves the habit without dropping any actual co-parenting ball.",
        nextSceneId: "the-handoff-week",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // VIGNETTE 2: THE CHRISTMAS HANDOVER
  // ===================================================================
  {
    id: "the-handoff-week",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "December. The first Christmas is split by the agreement: the kids are with you Christmas Eve and the morning, with him from two o'clock. At the handover on his drive he is warm in the particular way he is warm when there is an audience, and today the audience is the children on the doorstep and, across the road, a neighbour bringing in bins. He hands you a wrapped gift.",
      },
      {
        speakerId: "spouse",
        text: "\"Just a little something. It felt wrong not to. However things are, you're still their mum. Come in for five minutes when you drop them, it's freezing, the kids would love it.\"",
        emotion: "happy",
      },
      {
        speakerId: "inner-voice",
        text: "Read the structure, not the warmth. The gift is not for you; it is for the doorstep and the neighbour and the version of this Christmas that gets told later. The 'come in for five minutes' is the reopening, dressed as kindness in front of an audience engineered to make refusal look cold. Gray rock: warm enough not to make a scene, flat enough to give the performance nothing to feed on.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "gray-rock",
        text: "Take the gift without opening the moment. \"Thank you. That's kind.\" Hand over the bags. \"They've had breakfast. Jonah's inhaler's in the front pocket. I'll see you all on the twenty-seventh.\" To the kids: \"Have the best time. I love you.\" Back to the car.",
        tactic: "Gray rock in front of an audience is the hardest version and the most important. You did not refuse the gift (a refusal is a scene the neighbour remembers); you received it flatly and gave the performance nothing. You declined the 'come in' by not engaging it at all, moving straight to logistics. No warmth to escalate, no coldness to narrate.",
        nextSceneId: "the-repeated-line",
        isOptimal: true,
        xpBonus: 45,
        feedback:
          "Received flat, declined by non-engagement, exited on logistics. The audience got nothing to remember and he got nothing to feed. That is gray rock at its hardest: performed at, on a doorstep, at Christmas.",
        event: "restraint-shown",
      },
      {
        id: "justify-the-holidays",
        text: "\"I don't think coming in is a good idea, given everything. I'm trying to do this properly and keep clear boundaries, so I'd rather just do the handover and not blur things.\"",
        tactic: "The justification is true and it is a mistake. Explaining the boundary invites negotiation of the boundary. In front of the neighbour you have now performed 'the difficult one who won't even come in for the kids at Christmas.' The boundary did not need a paragraph; it needed a logistics sentence and a car door.",
        nextSceneId: "handoff-justify-derail",
        isOptimal: false,
      },
      {
        id: "match-his-performance",
        text: "The audience makes it easy, and it is Christmas. Go in for five minutes. Coffee, the kids showing him their stockings, one shared photo. It's just five minutes; the children look so happy to have you both in one room.",
        tactic: "The five minutes is the reopening working exactly as designed. The children reading 'both parents in one room, warm, at Christmas' is precisely the frame he is building, because it is the frame that makes the separation feel provisional to them and to you. Warmth in the old house on Christmas morning is not a neutral kindness; it is a down payment on next Christmas being negotiable.",
        nextSceneId: "handoff-perform-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "handoff-justify-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: "spouse",
        text: "\"Of course. Whatever you need.\"",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "He nods, gently, wounded, for the neighbour. He got the wounded-reasonable position for the price of your paragraph. The recovery is to stop explaining and close on logistics.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "close-on-logistics",
        text: "Stop. \"Inhaler's in the front pocket. Twenty-seventh at ten.\" Kiss the kids. Car.",
        tactic: "Recovery. The paragraph is spent; do not add a second one defending the first. Logistics sentence, exit. The next handover you skip the explanation entirely.",
        nextSceneId: "the-repeated-line",
        isOptimal: true,
      },
    ],
  },

  {
    id: "handoff-perform-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You are in the old kitchen with a coffee you did not want. The kids are luminous. He is easy, funny, the good version. It lasts eleven minutes. At the door he touches your arm.",
      },
      {
        speakerId: "spouse",
        text: "\"This was nice. See, we can still do this.\"",
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "There it is: 'we can still do this.' The five minutes was never five minutes; it was evidence, collected in front of the children, that the shape is not really gone. You cannot undo the coffee. You can make it the last one, and make the exit clean so 'nice' does not become 'weekly.'",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "make-it-the-last",
        text: "Do not agree that it was nice. \"Thanks for the coffee. I'll see the kids on the twenty-seventh.\" Leave without booking the next warm moment.",
        tactic: "Recovery. You cannot un-drink the coffee; you can decline to schedule the next one. 'We can still do this' only becomes true if you confirm it. You did not confirm it.",
        nextSceneId: "the-repeated-line",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // VIGNETTE 3: THE LINE THE CHILD CARRIES
  // ===================================================================
  {
    id: "the-repeated-line",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "February. Bath time on your week. Jonah is in the tub; Nell is on the bath mat with her knees up, twelve and watchful. Out of nowhere, not unkindly, in the flat voice children use to test the temperature of a thing:",
      },
      {
        speakerId: "daughter",
        text: "\"Dad says you're the one who wanted everything to change. He says he would have kept trying.\"",
        emotion: "curious",
      },
      {
        speakerId: "inner-voice",
        text: "This is the loyalty conflict arriving, and it will arrive in some form whatever you do, because he is running a version and she is a child carrying it across the water without knowing she is a courier. The instinct is to correct the record: to give her the true version, that you did not blow up a happy home, that there are things she does not know. Every cell in you wants to give her the accurate account. Do not.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "let-it-pass",
        text: "Do not counter-program. \"I know it's hard when it feels like me and Dad see things differently. You don't have to figure out who's right. You're allowed to love us both.\" Then let it go. Wash Jonah's hair. Do not add the true version.",
        tactic: "The counter-move to a loyalty bid is not a better argument; it is refusing to make her the battlefield. She does not need your version to weigh against his; she needs to not be the one holding the scales. She will build her own accurate account over years, from what she sees, not from what either of you tells her at bath time.",
        nextSceneId: "the-text",
        isOptimal: true,
        xpBonus: 50,
        feedback:
          "You handed her the one load-bearing sentence (you don't have to choose) and refused the one that would have recruited her (here is the true version). Declining to counter-program is the whole move: you did not do to her what he is doing to her.",
        event: "restraint-shown",
      },
      {
        id: "correct-the-record",
        text: "Gently, carefully, give her the true version: \"That's not quite what happened, love. I tried for a very long time. There are grown-up things you don't know about.\" Age-appropriate, but the record, corrected.",
        tactic: "Even the gentle correction puts her in the middle. 'There are grown-up things you don't know' is an invitation she cannot accept and cannot forget; it makes you a second competing narrator and turns bath time into a court she has to adjudicate. The kindest thing is to be the parent who does not require her to choose, even when the other parent does.",
        nextSceneId: "the-repeated-line-derail",
        isOptimal: false,
      },
      {
        id: "counter-program-hard",
        text: "Hold her eye. \"Listen to me. Your dad is telling you a story that isn't true, and it isn't fair to put you in the middle like this. I need you to know what really happened.\"",
        tactic: "This is the most damaging version and the most tempting, because it is fuelled by real injustice. But 'your dad is lying to you' recruits a twelve-year-old into your case against her father. You may win the argument and lose the thing it was supposedly protecting: her childhood, spent as contested territory between two narrators. This is the one move in this scenario that leaves a mark on someone other than you.",
        nextSceneId: "the-repeated-line-derail",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-repeated-line-derail",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["daughter", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Nell has gone quiet, watching you, filing whatever you just gave her. You can feel the pull to keep going, to make sure she really understands. Stop there.",
      },
      {
        speakerId: "inner-voice",
        text: "You cannot unsay it, but you can decline to build on it. The recovery is to hand her back the permission you just complicated: that she does not have to hold this. Then close the subject and let the water be warm.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "hand-back-the-permission",
        text: "\"Actually, forget the grown-up stuff. It's not yours to carry. You just get to love us both, okay? That's your only job.\" Rinse Jonah's hair. Change the subject to the spelling test.",
        tactic: "Recovery. You return her to the one true, load-bearing sentence: she does not have to choose. The correction is spent; you do not feed it. Over years, the pattern of never making her the battlefield outweighs one bath-time slip.",
        nextSceneId: "the-text",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // VIGNETTE 4: THE HOOVER
  // ===================================================================
  {
    id: "the-text",
    backgroundId: "apartment",
    mood: "cold",
    presentCharacterIds: ["spouse", "inner-voice"],
    immersionTrigger: "cold-moment",
    dialog: [
      {
        speakerId: null,
        text: "May. Month eight. A Tuesday, the kids at his. Your phone lights at 10:40 p.m., a time that is not an accident. It is him, but the register is one you have not seen since early in the marriage: lowercase, soft, no logistics.",
      },
      {
        speakerId: "spouse",
        text: "\"been thinking about you tonight. the house is too quiet without you three. i know i got things wrong. i don't want to fight anymore. maybe we gave up too easily. no pressure. just wanted you to know x\"",
        emotion: "hopeful",
      },
      {
        speakerId: "inner-voice",
        text: "This is the hoover, and it is well made. Note what it contains and what it does not. It contains warmth, a partial admission ('got things wrong'), a shared-loss frame ('you three'), and a reopening ('gave up too easily'). It contains no specific accountability, no changed behaviour, no reference to a single thing that made you leave. It is not an apology. It is a door, opened at the exact hour and the exact softness most likely to catch you tired and alone eight months in.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "decline-clean",
        text: "Do not answer tonight. In the morning, if anything, send only what is true and closed: \"I got your message. I'm not going to reopen that conversation. I hope you're well. Let's keep things to the kids.\" Then put it down and go to bed.",
        tactic: "The clean decline does three things: it refuses the late-night register (answering at 10:40 accepts the intimacy the hour implies), it names no grievance (a grievance is a thread he can pull), and it re-routes to the only channel that stays open, the kids. You do not have to be cold, cruel, or triumphant. You have to be closed. 'I'm not going to reopen that conversation' is a full stop, not an argument.",
        nextSceneId: "the-quiet-turns",
        isOptimal: true,
        xpBonus: 55,
        feedback:
          "Refused the hour, named no grievance, re-routed to the kids. That is the whole decline: a full stop instead of a fight. He did not get an argument to work, an admission to leverage, or a warm channel to keep. He got a closed door and a good night's sleep on your side of it.",
        event: "failure-rejected",
      },
      {
        id: "warm-channel-open",
        text: "It's late and the message is kind and something in you softens. Reply warm, honest, but hold the line: \"this means a lot, honestly. i've missed the good parts too. i'm not ready to reopen anything but i'm glad we can be soft with each other. night x\"",
        tactic: "You held the decision, and you left the door on the latch. 'Soft with each other' at 10:40 p.m. is a channel, and the channel is the whole game; he does not need you to reopen tonight, only to keep the thread warm so it can be worked over weeks. The x you send back is the down payment.",
        nextSceneId: "ending-the-open-channel",
        isOptimal: false,
      },
      {
        id: "take-the-bait",
        text: "Eight months is a long time and the message is everything you wanted to hear once. Reply: \"i've thought about it too. maybe we did. can we talk properly? coffee this week, just us?\"",
        tactic: "The coffee is not a coffee; it is the reopening, and you just booked it. 'Just us,' at your suggestion now, means the year of infrastructure and the decision table and the move-out are back on the table as things to be re-litigated over a flat white. He did not have to reopen the marriage. He only had to send eleven soft lowercase lines at 10:40 and let eight months of your tiredness do the rest.",
        nextSceneId: "the-coffee",
        isOptimal: false,
      },
    ],
  },

  {
    id: "the-coffee",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["spouse", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Thursday. A cafe on neutral ground. He is early, which he never was. He looks good, rested, gentle. He does the thing he is best at: he listens, he agrees with your grievances before you finish them, he says 'you were right about a lot of it.' Forty minutes in, he reaches across and turns your hand over on the table.",
      },
      {
        speakerId: "spouse",
        text: "\"I'm not asking for anything. I just think we owe it to the kids to be sure.\"",
        emotion: "pleading",
      },
      {
        speakerId: "inner-voice",
        text: "'We owe it to the kids to be sure' is the whole operation in one sentence: it reframes your completed decision as a hasty one, makes reopening a moral duty rather than his want, and puts the children's welfare on his side of the table. This is the exact reframe the decision-table conversation existed to prevent, arriving eight months late in a warmer coat. You are one sentence from a year unspooled. You can still stand up.",
        emotion: "serious",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "leave-the-coffee",
        text: "Take your hand back. \"We were sure. I was sure. This was a mistake, and I'm going to go.\" Stand up. Leave the coffee half-drunk. Do not soften the exit with a hug.",
        tactic: "Late recovery, and it counts. Standing up mid-hoover, hand withdrawn, no softening hug, is the whole decision-table discipline compressed into thirty seconds. The coffee happened; it does not have to become the first of a series. The 'sure' you name is the record correcting itself in real time.",
        nextSceneId: "the-quiet-turns",
        isOptimal: true,
        xpBonus: 40,
        feedback:
          "You reached the cafe table and still stood up. That is the arc's whole point: the decision holds not because you never wobble but because you can withdraw your hand mid-sentence and leave the coffee. One flat white does not have to become a reconciliation.",
        event: "restraint-shown",
      },
      {
        id: "stay-and-listen",
        text: "His hand is warm and his voice is the old good voice and you are so tired of being the only adult in your house. Stay. Let him talk. \"Okay. Maybe we were too quick. Maybe we can try.\"",
        tactic: "The year reopens here, at a cafe table, over a sentence about the kids. Everything the arc built (the infrastructure, the clean opening, the spare room, the gray rock at Christmas, the line you let pass at bath time) is now a story about 'a rough patch we went through.' Not because he overpowered you. Because he waited eight months and sent the text at 10:40.",
        nextSceneId: "ending-the-reopened-year",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // VIGNETTE 5: THE QUIET TURNS
  // ===================================================================
  {
    id: "the-quiet-turns",
    backgroundId: "apartment",
    mood: "peaceful",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "A different night, weeks later. Kids asleep down the hall on your week. You are on the small sofa in the rented front room, a book you are actually reading, the boiler ticking over Jonah's room. The house is quiet. And you notice, without reaching for it, that the quiet has changed temperature. It is not the absence of the old channel anymore. It is just the room, at night, with your children asleep and no one to manage.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the thing the year was for, and it does not announce itself. There is no triumph in it, no scene, no message to send. The quiet stopped being a subtraction and became a fact, a neutral one, then quietly a good one. You did not fill it, negotiate it away, or reopen the thing that used to fill it. You held every small boundary in a year of small boundaries, and this is the payoff: an ordinary Tuesday that belongs entirely to you.",
        emotion: "knowing",
        tone: "tactical",
      },
    ],
    choices: [
      {
        id: "keep-the-quiet",
        text: "Do not do anything with the moment. Do not post it, text it, or mark it. Turn the page. Let it be an ordinary night.",
        tactic: "The last discipline is the same as the first, at the school railings: notice the quiet and do not discharge it. The difference is that now the quiet is yours and it is good, and keeping it un-narrated is not restraint against a pull anymore. It is just how you live now.",
        nextSceneId: "ending-the-quiet",
        isOptimal: true,
        xpBonus: 45,
        feedback:
          "The year closes on the same move it opened with, at the railings: notice the quiet, do not discharge it. The only thing that changed is that the quiet is good now. That is what leaving well looks like from the inside. Not a victory. A Tuesday.",
        event: "optimal-with-grace",
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-the-quiet",
    backgroundId: "apartment",
    mood: "peaceful",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Quiet That Is Not Loneliness",
    endingSummary:
      "You held every boundary in a year of small boundaries. The quiet stopped being absence and became a life that is yours.",
    endingLearnPrompt:
      "The year after has no single hard conversation to win; it has a thousand small refusals to re-enter the old shape, made when nobody is watching you make them. The solo pickup, the Christmas doorstep, the line the child carries, the 10:40 text: each one asks the same thing, which is that you notice the pull and do not discharge it. The reward is not triumph. It is the moment the quiet changes temperature, on an ordinary night, and you recognise it as yours. Leaving well feels like that: not like winning, like a Tuesday that belongs to you.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "11:20 p.m. The book is good. The boiler ticks. Down the hall two children are asleep in rooms that are theirs now. Nobody is coming home to be managed. The marriage's shape is gone, and the space where it was is not a wound anymore; it is just the room, and it is quiet, and it is yours.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-the-open-channel",
    backgroundId: "apartment",
    mood: "cold",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Latch Left On",
    endingSummary:
      "You held the decision but left the door on the latch. A warm channel costs more, over months, than a clean full stop ever would.",
    endingLearnPrompt:
      "Sending 'glad we can be soft with each other x' at 10:40 p.m. is not reopening the marriage, and that is exactly why it is the harder mistake to see: you kept the boundary and lost the point of it. The hoover does not need you to say yes tonight; it needs a warm thread it can work over weeks. A latch left on is a standing invitation to try the handle. The clean decline is colder in the moment and cheaper across the year: a full stop asks nothing further of you; a warm channel asks something of you every time it hums.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "11:02 p.m. You did not reopen anything. You also did not close it. The thread stays warm, and over the next months it will light again, softer, later, each time a little harder to leave un-answered. The door is on the latch. You will be managing the latch for a while.",
        emotion: "serious",
      },
    ],
    choices: [],
  },

  {
    id: "ending-the-reopened-year",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Year Unspooled",
    endingSummary:
      "The whole arc becomes 'a rough patch we worked through.' Not because he overpowered you, but because he waited eight months and sent the text at 10:40.",
    failureBlogSlug: "architecture-of-control-how-emotional-dependency-is-built",
    failureBlogTitle: "Architecture of Control. How Emotional Dependency Is Built",
    endingLearnPrompt:
      "The hoover almost never wins at the decision table; it wins eight months later, at a cafe, over a sentence about the kids, aimed at a version of you that is tired of being the only adult in the house. 'We owe it to the kids to be sure' reframes a finished decision as a hasty one and moves the children onto his side of the table. Note the mechanics for next time: the register is late-night and lowercase, the admission is partial and unaccountable ('got things wrong' names nothing), and the reopening is disguised as a duty. The counter is upstream: refuse the late-night register, name no grievance, keep everything to the kids channel, and never sit down for the coffee that is not a coffee.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The cafe warms up around the two of you. He is gentle, and it is such a relief to be managed for a change. Somewhere in the next few weeks, the year, the infrastructure, the decision table, the spare room, the doorstep, the bath, becomes a phase you went through. The sentence that reopened it was about the children. It usually is.",
        emotion: "serious",
      },
    ],
    choices: [],
  },
];

export const divorce61: Scenario = {
  id: "divorce-6-1",
  title: "The Year After",
  tagline: "The first Christmas. The first solo school pickup. The specific quiet that is not loneliness.",
  description:
    "Divorce-Arc capstone. Four moments across the first twelve months on the other side of the decision: the first solo school pickup, the first Christmas handover, the loyalty bid a child carries across the water, and the hoover that arrives at 10:40 p.m. in month eight. Where the earlier scenarios were decisions under pressure, this one is discipline in the quiet, the thousand small refusals to re-enter the old shape when nobody is watching. The best ending is not triumph; it is the night the quiet changes temperature and becomes a life that is yours.",
  tier: "vip",
  track: "divorce-arc",
  level: 6,
  order: 1,
  estimatedMinutes: 18,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 600,
  badgeId: "the-year-after",
  startSceneId: "content-gate",
  prerequisites: ["divorce-5-1"],
  tacticsLearned: [
    "The solo-pickup discipline: name the quiet precisely (a channel gone silent, not loneliness) and sit in it without discharging it into performance or contact",
    "Gray rock in front of an audience: receive the Christmas gift flatly, decline the 'come in' by not engaging it, move straight to logistics",
    "Let the child's loyalty bid pass without counter-programming; the counter-move is refusing to make her the battlefield, not winning the argument",
    "Decline the hoover clean: refuse the late-night register, name no grievance, re-route to the kids channel with a full stop, not an argument",
    "Standing up mid-hoover is a valid late recovery; the coffee happened, it does not have to become a series",
  ],
  redFlagsTaught: [
    "The audience-engineered handover: the gift and the 'come in for five minutes' staged in front of the neighbour so refusal reads as cold",
    "'We can still do this' after a warm five minutes: evidence collected in front of the kids that the shape is not really gone",
    "The child as courier: 'Dad says you wanted everything to change' as a loyalty bid you are baited to counter-program",
    "The 10:40 p.m. hoover: lowercase warmth, partial admission, shared-loss frame, zero accountability, timed for tiredness",
    "'We owe it to the kids to be sure': reframing a completed decision as hasty and moving the children onto his side of the table",
  ],
  characters: [INNER_VOICE, THE_SPOUSE, DAUGHTER, SON],
  scenes,
  isNew: true,
};

export default divorce61;
