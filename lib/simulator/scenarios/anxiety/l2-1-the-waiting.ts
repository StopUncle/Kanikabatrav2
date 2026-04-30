/**
 * anxiety-2-1, "The Waiting"
 *
 * Anxiety track, Level 2, order 1. The daylight version of the
 * loop. Sam at the agency, Tuesday 2:47 p.m., between meetings. A
 * hard-but-resolved conversation with Mia last night. A small text
 * sent at 12:10 p.m. that has gone unanswered for 2:37 hours. The
 * body fills the silence with story. GAD plus social anxiety in the
 * relationship-content slot.
 *
 * What this scene teaches:
 *   - The catastrophising staircase fires in daylight too. The
 *     content shifts (relationship instead of work) but the engine
 *     is identical. The same five distortions, catastrophising,
 *     mind-reading, fortune-telling, probability inflation,
 *     emotional reasoning, produce the same staircase regardless
 *     of trigger.
 *   - Worry-postponement applied in a daylight, work-environment
 *     context. The notebook-on-desk variant works as well as the
 *     bedside notebook of L1-1.
 *   - The cognitive distortion CHECKLIST as a real-time CBT skill —
 *     opening notes app, listing distortions, naming each one
 *     against current cognitive content. The act of naming
 *     de-fuses.
 *   - Peer normalisation as the most efficient anxiety-reset
 *     available in a workplace. Maya from L1-2 returns. Walking
 *     to the bodega together is itself an exteroceptive grounding
 *     skill.
 *   - The two loop-feeders specific to this trigger: sending the
 *     unprompted follow-up text (anxious-attachment tell that
 *     erodes the partner's nervous system over months) and
 *     reassurance-Googling relationship-anxiety threads (the
 *     daylight version of the L1-1 phone loop).
 *
 * Voice: outside-the-bedroom register. Office light, fluorescent
 * fatigue, the small accumulation of micro-checks. Kanika in
 * italics naming distortions and skills as they pass.
 *
 * Cast: SAM (player), MIA (off-page in text), MAYA, INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. At the agency. Between the 2 p.m. and 3 p.m. meetings. The body is producing low-grade activation about a text Mia has not yet answered.",
  traits: ["sensitive", "in-treatment"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description: "30. Sam's partner. Off-page; in a meeting until 4 p.m.",
  traits: ["calm", "grounded"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const MAYA: Character = {
  id: "maya",
  name: "Maya Patel",
  description:
    "27. Account strategist. Two years into her own GAD treatment. Came out as anxious-fluent to Sam over tea-bag at the kitchenette in L1-2.",
  traits: ["grounded", "warm", "in-recovery"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, daylight loop
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Tuesday, 2:47 p.m. the agency. The air-conditioning is making the ambient hum it makes. The light is the office daylight, slightly too bright. You are between the 2 p.m. and 3 p.m. meetings.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Last night you and Mia had a hard but resolved conversation about her mother. Beatriz, moving in for a week starting Saturday. You said something at the end that landed slightly off, in a tone you did not mean. You apologised this morning at the door. Mia said 'yeah, I love you, talk later.' That was 11:14 a.m. it is now 2:47 p.m.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "At 12:10 p.m. you sent her one text. 'Hey, hope your morning's good. Lentil soup tonight?' Three hours twenty-three minutes ago. She has not replied.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What follows is the daylight version of the 3 a.m. loop. Different content slot, relationship instead of work. Same cognitive engine. Same five distortions ready to deploy. The available skills are the same. Two of the available moves feed the loop. Three reset it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The desk.",
        tactic: "The scene opens.",
        nextSceneId: "the-staircase",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE STAIRCASE, daylight version
  // ===================================================================
  {
    id: "the-staircase",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You sit down. You open Slack. You open the notes app. You close the notes app. You re-open the message thread.",
      },
      {
        speakerId: null,
        text: "12:10 p.m., your text. 'Hey, hope your morning's good. Lentil soup tonight?'",
      },
      {
        speakerId: null,
        text: "12:10 p.m., read receipt. She read it within four minutes.",
      },
      {
        speakerId: null,
        text: "Then nothing.",
      },
      {
        speakerId: null,
        text: "The body activates within nine seconds. The chest goes slightly tight. The breath shortens by maybe 30%.",
      },
      {
        speakerId: null,
        text: "Step one. She read it.",
      },
      {
        speakerId: null,
        text: "Step two. She read it and didn't reply.",
      },
      {
        speakerId: null,
        text: "Step three. She is still mad about last night. The 'yeah I love you talk later' was a holding pattern. The actual conversation is going to happen tonight and it is going to be bigger than you thought.",
      },
      {
        speakerId: null,
        text: "Step four. She has been thinking, all morning, about whether to break up with you. The Beatriz comment was the last in a long line. The 'lentil soup' text was a stupid casual thing to send to someone who is currently making a decision about your relationship.",
      },
      {
        speakerId: null,
        text: "Step five. I should send a follow-up. No, that would be needy. Yes, that would show I care. No, she will read it as more of the same anxious pattern she has been tolerating. Yes, silence is worse than the pattern.",
      },
      {
        speakerId: null,
        text: "Step six. What if I get home and she's gone.",
      },
      {
        speakerId: "inner-voice",
        text: "Six steps. Three minutes. Same engine as last night, in daylight. The distortions are catastrophising, mind-reading, fortune-telling. There is a fourth shape inside the spiral that did not appear at 3 a.m., the meta-loop, which is the loop ABOUT whether to send the follow-up text. The meta-loop is itself a feature of relationship-anxiety in 2026; the technology gives the body a real action to fixate on (compose, send, don't send), which makes the meta-loop more grippy than the worry it is wrapped around.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available moves.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "follow-up",
        text: "Send a follow-up. Draft three; send one. 'Hey just checking in, hope all good, soup or sushi tonight?'",
        tactic: "The unprompted follow-up. Will resolve the body's tension when Mia eventually replies, about 40 minutes from now, with a normal 'hi, in a meeting until 4, soup yes love you.' Cost: the second-text-unprompted is an anxious-attachment tell that careful partners can feel. Mia's nervous system, across months, learns that she has to reply within X minutes or you will second-text. That clock erodes her own ground.",
        nextSceneId: "follow-up-1",
        isOptimal: false,
      },
      {
        id: "google",
        text: "Reassurance-Google. 'Why does my partner not reply for three hours.' Fall down the relationship-anxiety internet.",
        tactic: "The daylight phone-loop. Reddit threads on relationship anxiety, attachment-style tests, three TikToks of women describing the silent-treatment. Each piece of content soothes for 12 minutes by giving the brain the SHAPE of someone-else's-resolution. Each cycle re-spirals. By 3:30 you have lost 45 minutes. Useless.",
        nextSceneId: "google-1",
        isOptimal: false,
      },
      {
        id: "postponement",
        text: "Worry postponement. Open the notebook. Write: 'Mia hasn't replied 3:23. Catastrophising. Worry-time at 5 p.m.' Close the notebook.",
        tactic: "Same skill as L1-1, daylight version. The notebook gives the worry a container. The body has to hold the postponement against its own protest, which is louder in daylight because there is more to distract with. Holds. By 3:48 Mia replies; by 5 p.m. the worry is empty. The notebook is the third entry this month that resolved itself before worry-time.",
        nextSceneId: "postponement-1",
        isOptimal: true,
      },
      {
        id: "distortion-check",
        text: "CBT distortion checklist. Open notes. List the distortions firing right now: catastrophising, mind-reading, fortune-telling, emotional reasoning, probability inflation. Name each one against current cognitive content.",
        tactic: "The CBT-orthodox skill. The act of naming de-fuses. The notes are dry and clinical. By 4:15 the body has dropped two notches. The skill works because attention is finite and labelling occupies the bandwidth that was running the staircase.",
        nextSceneId: "distortion-check-1",
        isOptimal: true,
      },
      {
        id: "maya",
        text: "Walk to the kitchenette. Maya is there making 4 p.m. English Breakfast. Lean against the counter. 'I'm in the silly version of the relationship-anxiety thing right now.'",
        tactic: "Peer normalisation, deployed mid-spiral. Maya laughs at the right place. Asks the right question, 'has she ever ghosted you, like ever, ghost-style.' Sam: 'No.' Maya: 'Cool, so you're worrying about a thing that has never happened. Want to walk to the bodega.' Walking + peer + naming + open air = the most efficient anxiety reset available in a workplace.",
        nextSceneId: "maya-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // FOLLOW-UP PATH (loop-feeder)
  // ===================================================================
  {
    id: "follow-up-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You draft three. The first is too long. The second is too neutral. The third is the one, casual, light, plausibly-deniable as not-anxious.",
      },
      {
        speakerId: null,
        text: "YOU: 'Hey just checking in, hope all good, soup or sushi tonight?'",
      },
      {
        speakerId: null,
        text: "You hit send at 3:11 p.m. the body's tension drops about 25% just from having sent it. The relief is not because the text resolved anything. The relief is from the simple act of having taken an action that the body had been straining to take for an hour.",
      },
      {
        speakerId: null,
        text: "Mia replies at 4:02 p.m., about 50 minutes after your follow-up.",
      },
      {
        speakerId: "mia",
        text: "hi babe! sorry, in a meeting since 1, just got out. Soup is great. Love you. See you at 7.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "The body now drops the rest of the way down. Relief lands. You feel like an idiot for having spiralled. You also feel a small undefined unease that you cannot quite name, which sits beneath the relief.",
      },
      {
        speakerId: "inner-voice",
        text: "The undefined unease has a name. The unprompted follow-up is what careful partners can feel. Mia is a careful partner. Her nervous system, when it pinged her at 3:11 with your second text, had a small registration that did not consciously surface, something is going on with Sam, which she didn't have time to attend to in the meeting. Across months, this micro-registration accumulates. Her body learns to track your reply windows. Her own ground starts to shift toward managing them. She will not name this for at least six months. By the time she names it, the pattern will have been installed for forty trial cycles.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There is also a body-side cost. Your nervous system just learned, again, that the way through 3-hour text gaps is to send the second text. The next gap will arrive sooner. The body's tolerance for unanswered messages is being trained downward. Same loop-feeder mechanism as L1-1's wake-Mia move. Different content. Same architecture.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-follow-up-end",
        text: "End scene.",
        tactic: "The follow-up ending.",
        nextSceneId: "ending-follow-up",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // GOOGLE PATH (loop-feeder)
  // ===================================================================
  {
    id: "google-1",
    backgroundId: "office",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You open Safari. You type 'why does my partner not reply for three hours.'",
      },
      {
        speakerId: null,
        text: "The first results are a 2017 Reddit thread (r/relationship_advice, 'My boyfriend hasn't replied to me all day'), a Wayback-machine cached article from a 2019 dating-coach blog, and three TikToks queued in your phone-as-search algorithm because you have searched adjacent things before.",
      },
      {
        speakerId: null,
        text: "You read the Reddit thread. The top comment is 'he's avoiding the relationship-talk you had last night.' The second is 'sometimes people are just busy.' The third is 'this is anxious-attachment, you should read Attached.' Each comment soothes for 12 minutes by giving the brain a SHAPE of resolution. Each comment is contradicted by the next one.",
      },
      {
        speakerId: null,
        text: "You open the dating-coach article. It tells you to 'check in with yourself first.' You click the related-article link about avoidant-attachment partners. You take the buzz-feed-quality attachment-style quiz. You score 'anxious.' You knew that. You have known that for two years.",
      },
      {
        speakerId: null,
        text: "By 3:30 p.m. you have spent 45 minutes in the relationship-anxiety internet. Your body is more activated than it was at 2:47, not less, because each piece of content gave the body more SCRIPTS for what could be happening, the avoidant partner script, the slow-fade script, the just-busy script and the body has now been rehearsing all three at low resolution for 45 minutes.",
      },
      {
        speakerId: "inner-voice",
        text: "Reassurance-Googling is structurally similar to the L1-1 phone-in-bed pattern, with one key difference: the daylight version produces SCRIPTS instead of just content. Scripts are stickier than content. Each script the body rehearses becomes a cognitive lane the body can ride down later. By the end of an afternoon of relationship-anxiety Googling, the body has learned three new shapes for what could go wrong, and the next text-gap will fire all three in succession.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Mia replies at 4:02 with the normal 'in a meeting' text. The body's tension drops. The 45 lost minutes are gone. Tonight you will be tired in a way that is hard to source, chronic Googling produces a specific somatic flavour, a low-grade humming exhaustion, that sleep does not fully discharge.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-google-end",
        text: "End scene.",
        tactic: "The Google ending.",
        nextSceneId: "ending-google",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // POSTPONEMENT PATH (skill)
  // ===================================================================
  {
    id: "postponement-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You reach into the drawer. The notebook is the small Moleskine you have been keeping for the last six weeks since Lin recommended it. You open to today's page.",
      },
      {
        speakerId: null,
        text: "You write: 'Mia hasn't replied since 12:10. Now 2:51. Catastrophising staircase, six steps. Worry-time 5 p.m.'",
      },
      {
        speakerId: null,
        text: "You close the notebook. You put it back in the drawer. You whisper, in your head, the postponement promise. We will worry about Mia at 5 p.m. we will. The body will get its time.",
      },
      {
        speakerId: null,
        text: "The body protests within nine seconds. 'But this is different. This is RELATIONSHIP. This is not a Slack message.' The protest is the body trying to argue that this particular worry is too special for the container. The skill is to recognise that all worries say they are special.",
      },
      {
        speakerId: null,
        text: "The body re-reaches for the phone at 2:54. You catch the reach. You do not unlock the phone. You let the reach be a reach.",
      },
      {
        speakerId: null,
        text: "The 3 p.m. meeting starts. You are in it. The meeting is about the Henderson account. You are present in it for thirty-eight minutes, which is approximately what good attention looks like during low-grade anxiety. The meeting ends at 3:42.",
      },
      {
        speakerId: null,
        text: "You come out of the meeting. The body re-reaches for the phone. You unlock it. There is a text from Mia at 3:48 p.m.",
      },
      {
        speakerId: "mia",
        text: "hi babe! sorry, in a meeting since 1, just got out. Soup is great. Love you. See you at 7.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "5 p.m. arrives. You open the notebook. The entry says 'Mia hasn't replied since 12:10.' You write next to it: 'resolved 3:48 p.m. by her getting out of a meeting. In a meeting since 1.' This is the third entry this month that resolved itself before worry-time.",
      },
      {
        speakerId: "inner-voice",
        text: "Postponement works on the body's natural attention-economy. Worries that get scheduled stop competing for cognitive bandwidth in the moment. Most worries scheduled for later are dissolved by reality before later arrives. The notebook is the cumulative external memory of this fact. Across forty entries, the body learns that worry-postponement does not just defer, it sometimes reveals that the worry was never load-bearing. The fortieth entry teaches the body more than the first one. By the hundredth, the postponement is automatic.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-postponement-end",
        text: "End scene.",
        tactic: "The postponement ending.",
        nextSceneId: "ending-postponement",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DISTORTION-CHECK PATH (skill)
  // ===================================================================
  {
    id: "distortion-check-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You open the notes app. You type a header: 2:47 p.m. Mia text gap, distortion check.",
      },
      {
        speakerId: null,
        text: "You list them as you find them in the cognitive content of the last five minutes.",
      },
      {
        speakerId: null,
        text: "1. Catastrophising, staircase from 'no reply' to 'she's gone when I get home.' Six steps. Each one inflated.",
      },
      {
        speakerId: null,
        text: "2. Mind-reading, 'she is currently making a decision about our relationship.' No evidence. Pure projection.",
      },
      {
        speakerId: null,
        text: "3. Fortune-telling, 'she's going to break up with me tonight.' Specific future, certain tone, no evidence.",
      },
      {
        speakerId: null,
        text: "4. Emotional reasoning, 'I FEEL panicked, therefore the situation MUST BE bad.' The feeling is being treated as evidence FOR the feeling.",
      },
      {
        speakerId: null,
        text: "5. Probability inflation, base rate of 'partner ends two-year relationship via 3-hour text gap on a Tuesday' is approximately zero. Weighting it as if it were 30%.",
      },
      {
        speakerId: null,
        text: "You read the list back. The act of having the list in front of you, in dry CBT-worksheet shape, changes the relationship between you and the cognitive content. The thoughts have not stopped, they continue arriving. They are now arriving as labelled objects rather than as truth-claims.",
      },
      {
        speakerId: null,
        text: "By 4:15 the body has dropped two notches. The chest tightness is gone. The breath has lengthened. You can return to the spreadsheet you were trying to work on.",
      },
      {
        speakerId: null,
        text: "Mia replies at 4:02 p.m. with the normal 'in a meeting' text. The body now has a clean disconfirmation to add to the bottom of the list. You add it.",
      },
      {
        speakerId: null,
        text: "RESOLUTION: 4:02 p.m. Mia in meeting since 1. Catastrophe did not materialise. Probability inflation confirmed.",
      },
      {
        speakerId: "inner-voice",
        text: "The distortion checklist is the workhorse of CBT for anxiety. It is also one of the cleanest examples of a skill that requires repetition before the BODY believes it works. The first time you do this exercise, the cognitive content does not visibly de-fuse, it just gets labelled, which feels procedural and unsatisfying. The fifth time, the labelling itself produces a small drop in body activation. The twentieth time, the labelling and the de-fusion happen almost simultaneously. Across hundreds of trials, the labelling has compressed into automatic, your brain produces 'fortune-telling' as a tag at the same moment it produces the fortune-telling thought, and the tag prevents the thought from being acted on.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-distortion-end",
        text: "End scene.",
        tactic: "The distortion-check ending.",
        nextSceneId: "ending-distortion",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // MAYA PATH (skill)
  // ===================================================================
  {
    id: "maya-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["maya"],
    dialog: [
      {
        speakerId: null,
        text: "You stand up. You walk to the kitchenette. The route to the kitchenette is the route to the kitchenette. The motor activity itself drops the body two notches just by being motion.",
      },
      {
        speakerId: null,
        text: "Maya is there. English Breakfast. The water has just finished boiling. She is steeping.",
      },
      {
        speakerId: "sam",
        text: "I'm in the silly version of the relationship-anxiety thing right now.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Maya does not look up. She is doing the not-looking-up generosity again. She squeezes the tea bag, drops it in the bin, takes a sip.",
      },
      {
        speakerId: "maya",
        text: "Yeah? Okay. What's the shape.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "Mia hasn't replied to a text since noon. Three hours. We had a hard conversation last night and I apologised this morning. The body has decided she's currently sitting in a meeting deciding whether to break up with me. Which is not what is happening.",
        emotion: "neutral",
      },
      {
        speakerId: "maya",
        text: "Right. Has she ever ghosted you. Like, ever. Three hours, twelve hours, anything that genuinely was a thing.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "No.",
        emotion: "neutral",
      },
      {
        speakerId: "maya",
        text: "Cool. So you're worrying about a thing that has never happened. The body is generating concern about an outcome with a base rate of zero in a two-year sample. The body is bad at base rates. This is its whole personality.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She takes another sip of tea.",
      },
      {
        speakerId: "maya",
        text: "Want to walk to the bodega. I want a banana. The act of walking outside is itself the skill. Plus banana.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You walk to the bodega. It is two and a half blocks. The cold air on your face is one of the cleanest pieces of exteroceptive grounding available. You buy the banana. Maya buys an iced coffee. You walk back.",
      },
      {
        speakerId: null,
        text: "By the time you are back at your desk, your phone has Mia's reply.",
      },
      {
        speakerId: "mia",
        text: "hi babe! sorry, in a meeting since 1, just got out. Soup is great. Love you. See you at 7.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You read the message. You smile. You text Maya: 'banana situation: handled. Mia situation: handled. You: a national treasure.'",
      },
      {
        speakerId: "maya",
        text: "lol.",
        emotion: "neutral",
      },
      {
        speakerId: "inner-voice",
        text: "Peer normalisation deployed mid-spiral is the most efficient single-cycle intervention available in a workplace, by clinical estimate. The mechanism is approximately: the peer's body in proximity is itself a regulating presence; the named question 'has she ever ghosted you' is a base-rate intervention that the brain cannot easily refuse; the walk to the bodega is exteroceptive grounding plus mild aerobic activity; the banana is the banana. The combination produces, in fifteen minutes, a body-state that the same person doing the same skills alone would have reached in ninety. Maya is not solving anything. Maya is co-regulating, with a calibrated touch she has built across two years of her own treatment.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-maya-end",
        text: "End scene.",
        tactic: "The Maya ending.",
        nextSceneId: "ending-maya",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-follow-up",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Second Text",
    endingLearnPrompt:
      "You sent the follow-up. The body's tension dropped 25% on the act of sending. Mia replied an hour later with a normal 'in a meeting' text. The relief landed. The undefined unease beneath the relief is the cost, the unprompted second-text is an anxious-attachment tell that careful partners can feel below conscious threshold. Mia's nervous system registered something at 3:11; she didn't have time to attend to it. Across months and forty trial cycles, her body learns to track your reply windows. Her own ground starts to shift toward managing them. The first one is free; the fortieth is not. The skill substitution is one of the three named in the choice list.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The unprompted follow-up is one of the most invisible loop-feeders in modern relationship-anxiety. It looks reasonable. It looks polite. It is also, structurally, the daylight version of the L1-1 wake-Mia move, a partner-mediated reassurance reach dressed as a casual check-in. The diagnostic test is internal: did you compose the second text from a place of calm care, or did you compose it from a place of needing the gap to close? If the second, the cost is being paid by both bodies, slowly, across months.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-google",
    backgroundId: "office",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Internet",
    endingLearnPrompt:
      "Forty-five minutes in the relationship-anxiety internet. Three new scripts your body now knows. The avoidant-partner script, the slow-fade script, the just-busy script. Each one is a cognitive lane the body can ride down at the next text gap. The body did not learn that text gaps are usually meetings. The body learned that text gaps are explicable in three ways, all of which require attention. The next gap will fire all three. The internet specialises in producing scripts, that is what it sells and a body in chronic anxiety that visits the internet for reassurance is a body buying scripts at the highest possible price, in cognitive bandwidth.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The relationship-anxiety internet has the same structural problem as the 3 a.m. phone, content as loop-feeder. The daylight twist is that the content is more LITERATE; the scripts are more sophisticated; the rehearsals are more vivid. By the end of an afternoon, the body has not learned anything about the actual relationship. The body has learned three new shapes for what could go wrong. This is a structural backwards step, and it is the maintenance shape of relationship-anxiety in 2026.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-postponement",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Notebook (Daylight)",
    endingLearnPrompt:
      "You wrote the worry down and named the worry-time at 5 p.m. the body protested. You held the postponement. The 3 p.m. meeting carried you through. By 3:48 Mia had replied. By 5 p.m. the worry-time was empty. The notebook is the third entry this month that resolved itself before worry-time. The cumulative external memory of these dissolutions is, across enough entries, the structural counter-weight to the in-the-moment certainty the disorder produces. The fortieth entry teaches the body more than the first one. By the hundredth, the postponement is automatic.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Worry postponement applied across both 3 a.m. and 2:47 p.m. is the hallmark of a body that has internalised the worry-time container. Across treatment, the postponement becomes one of the few interventions that GENERALISES, meaning, the body does not need to relearn it for each new content slot. The notebook entries do not need to be elaborate. They need to be CONSISTENT. Lin's longest-running clients have notebooks that look like grocery lists from a distance. The grocery-list aesthetic is the skill working.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-distortion",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Five Names",
    endingLearnPrompt:
      "You listed five distortions firing in real time and let the labels do the work. The thoughts continued to arrive but as labelled objects rather than truth-claims. By 4:15 the body had dropped two notches. Mia replied at 4:02 with a clean disconfirmation that you added to the bottom of the list. The distortion checklist is the workhorse of CBT for anxiety, and it requires repetition before the body believes it. The first time, it feels procedural. The fifth time, it produces a small somatic drop. The twentieth time, the labelling and the de-fusion happen almost simultaneously. Across hundreds of trials, the labelling compresses into automatic.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The distortion checklist is one of the few CBT skills that scales linearly with practice. There is no plateau curve, the twentieth use is genuinely better than the tenth, and the hundredth is genuinely better than the twentieth. The reason is mechanical: each repetition strengthens the prefrontal-to-amygdala regulatory pathway through the same neuroplastic mechanism that strengthens any motor skill. The list does not have to be elaborate. The five names, catastrophising, mind-reading, fortune-telling, emotional reasoning, probability inflation, handle approximately 90% of clinical anxiety content.",
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
    endingTitle: "Banana Situation Handled",
    endingLearnPrompt:
      "Fifteen minutes with Maya. The base-rate question ('has she ever ghosted you, ever') was an intervention the brain could not easily refuse. The walk to the bodega was exteroceptive grounding plus mild aerobic activity plus peer-body proximity. The banana was the banana. The combination produced a body-state in fifteen minutes that the same skills deployed alone would have taken ninety to reach. The peer-witnessing thread that opened in L1-2 is now reciprocally functional. Maya can also call on you, and across the next year of your treatment this peer-relation will be the most under-priced asset in your work environment.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The peer-co-regulation move is structurally different from the partner-co-regulation move. With Mia, co-regulation risks installing the dependence shape. Mia's nervous system shifts to manage yours. With Maya, the relation is symmetrical, she is also in treatment, she also has bad afternoons, you can be both regulated and regulating depending on the day. This symmetry is what makes peer-witnessing scale better than partner-witnessing across years. The Mia witness is precious and finite. The Maya witness is durable and reciprocal.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety21: Scenario = {
  id: "anx-2-1",
  title: "The Waiting",
  tagline: "Tuesday, 2:47 p.m. she read it. She didn't reply. The body fills the silence.",
  description:
    "Daylight version of the anxiety loop. Sam at the agency between meetings, three hours twenty-three minutes after sending Mia a text that has gone unanswered. The catastrophising staircase fires in daylight on the same engine as 3 a.m., with relationship-content instead of work-content. Five available moves: send the unprompted follow-up (anxious-attachment loop-feeder), reassurance-Google relationship-anxiety threads (script-purchase loop-feeder), worry-postponement (notebook variant), CBT distortion checklist, or mid-spiral peer co-regulation with Maya. Three of the five compound the work; two reinforce the disorder. Five endings.",
  tier: "premium",
  track: "anxiety",
  level: 2,
  order: 1,
  estimatedMinutes: 12,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 360,
  badgeId: "the-waiting",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Same engine, daylight content, the staircase fires on relationship gaps as readily as on Slack messages; five distortions, identical mechanics",
    "Worry-postponement deployed in daylight via desk-drawer notebook, one skill that generalises across trigger contexts",
    "CBT distortion checklist as workhorse skill, the 5 named distortions handle ~90% of clinical anxiety content; scales linearly with practice",
    "Mid-spiral peer co-regulation, base-rate question + walk + open air + symmetrical peer presence produces 90-minute work in 15 minutes",
    "Symmetrical peer-witnessing as durable across years, distinct from partner-witnessing, which risks dependence-shape installation",
  ],
  redFlagsTaught: [
    "The unprompted second-text, careful partners feel it below conscious threshold; trains their nervous system to track reply windows; cost compounds across forty trials",
    "Reassurance-Googling as script-purchase, the relationship-anxiety internet sells cognitive lanes the body did not previously have; structural backwards step",
  ],
  characters: [INNER_VOICE, SAM, MIA, MAYA],
  scenes,
};

export default anxiety21;
