/**
 * loving-mira-3-2, "The Devaluation" (OUTSIDE)
 *
 * Loving Mira, Level 3, order 2. POV returns to the FP. The first
 * sustained devaluation beat, the moment the idealisation contracts
 * for the first time and the player has to find out whether they
 * collapse, escalate, fold, or hold.
 *
 * What this scene teaches:
 *   - GIVE as the working skill (Linehan / DBT). Gentle, Interested,
 *     Validate, easy Manner, applied to the one piece of the
 *     accusation that is real (the feeling) without conceding the
 *     piece that is not (the fact).
 *   - Validation of feeling is NOT agreement with claim. This is the
 *     hinge most non-clinicians get wrong. "I hear that you're
 *     feeling I'm pulling away" is not the same sentence as "You're
 *     right, I have been pulling away." The first one is GIVE. The
 *     second one is folding.
 *   - Not matching intensity. The accusation is loud. The skilled
 *     reply is soft AND firm. Loud-soft is collapse. Loud-loud is
 *     reactive. The graph the player is being trained on has a
 *     diagonal in it, softness paired with non-yielding.
 *   - Self-fulfilling prophecy mechanics. Silence reads as the
 *     withdrawal that was predicted. False apology installs an
 *     accuser-believer dynamic. Defensive escalation gives the
 *     accusation new evidence. The one path that does not feed the
 *     loop is the one that names the feeling and holds the fact.
 *
 * Voice: outside POV again. Kanika in italics between beats. Player
 * is at home Tuesday evening, in body, reactive, the skill is being
 * asked of someone who is tired, not someone in a calm chair.
 *
 * Cast: MIRA (off-page voice in texts and one phone call), the FP
 * (player), INNER_VOICE (Kanika).
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "Six weeks into the friendship with you. Tuesday evening. The first sustained devaluation beat. She has decided, on the basis of one slow Thursday text reply, that you are pulling away.",
  traits: ["sensitive", "intense", "reactive-when-scared"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, devaluation, GIVE, the diagonal
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "POV is yours again. You are the friend. Six weeks into the loft, the voice notes, the favorite-person line. The idealisation phase has been intoxicating for both of you. This evening, for the first time, the dial moves the other direction.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you are about to receive is called a devaluation. In BPD shorthand: the splitting flips. The person who was 'all good' three days ago becomes 'pulling away,' 'lying,' 'leaving', without the fact-base to support it. The trigger is internal; the evidence is back-filled.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There are four ways most people respond to the first devaluation, and only one of them does not feed the loop. Defending creates new evidence in your defensive language. Apologising for a thing that did not happen installs an accuser-believer dynamic for the next five years. Ignoring reads as the withdrawal she predicted, which means her prediction was right, which means the prediction will get bigger next time.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The fourth response is the skill. It is called GIVE. Linehan's acronym for Gentle, Interested, Validate, easy Manner. Applied here it means: validate the FEELING she is having (which is real) without agreeing with the CLAIM she is making (which is not). The diagonal of the move is soft AND firm at the same time. Loud-loud is reactive. Loud-soft is collapse. Soft-firm is the skill.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Phone is in your pocket. You just got home. The text is about to come in.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Tuesday, 6:42 p.m. you have been home for four minutes.",
        tactic: "The text arrives.",
        nextSceneId: "the-text",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE TEXT, the message lands
  // ===================================================================
  {
    id: "the-text",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You drop your bag on the floor by the couch. You are still in the day's clothes. Your shoes are on. You haven't eaten since 1 p.m.",
      },
      {
        speakerId: null,
        text: "Phone buzzes once. Then again. Then a third time.",
      },
      {
        speakerId: "mira",
        text: "you've been weird with me for days",
        emotion: "concerned",
      },
      {
        speakerId: "mira",
        text: "i can feel it. I'm not making it up",
        emotion: "concerned",
      },
      {
        speakerId: "mira",
        text: "you're pulling away. I knew you would. Don't lie to me",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You stare at the screen. The first instinct is in your chest before it is in your head. It is hot. It is wide. It says: this is not fair.",
      },
      {
        speakerId: null,
        text: "The actual facts of the last week, as best you can reconstruct them in the next three seconds: Monday, voice note exchange, ninety minutes of it, both warm. Wednesday, drinks at her place, you stayed until 1 a.m. thursday, she texted you at 4:17 p.m. and you didn't reply until 6:35 p.m. two hours and eighteen minutes. You were in a meeting. Friday, funny TikToks back and forth. Saturday, brunch on the calendar for this Saturday, still on, you confirmed yesterday.",
      },
      {
        speakerId: null,
        text: "The thing that is real: Thursday's two-hour reply gap. That is the entire fact-base of the accusation.",
      },
      {
        speakerId: null,
        text: "The thing that is also real: she is not making up the feeling. The feeling is not the same as the claim. She IS feeling that you are pulling away. The feeling lives in her body and is generating the text. The fact that the feeling has poor fact-base support does not make the feeling fake.",
      },
      {
        speakerId: "inner-voice",
        text: "The split is now visible to you. It is one of the most useful splits in the skill. The feeling is real. The claim is not. The skill is to address the first without conceding to the second.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You have five reasonable moves available. Four of them feed the loop. One of them holds.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defend",
        text: "Type back: 'I'm not pulling away. You're imagining it. I had a long week.'",
        tactic: "The defensive volley. Feels like fairness, the accusation IS unfair. The cost is that defensive language reads to a BPD nervous system as confirmation. 'Why are you so defensive?' is the next message you will receive.",
        nextSceneId: "defend-1",
        isOptimal: false,
      },
      {
        id: "apologise",
        text: "Type back: 'You're right, I'm sorry. I have been off this week. I'll do better.'",
        tactic: "The fold. Stops the bleed in the next ninety seconds. The cost is paid over the next five years, you have just installed an accuser-believer dynamic. Next accusation will come faster, with bigger claims, because this one worked.",
        nextSceneId: "apologise-1",
        isOptimal: false,
      },
      {
        id: "ignore",
        text: "Don't reply. You can't deal with this right now. Deal with it tomorrow.",
        tactic: "The silence. Feels protective. Reads as confirmation. By 11 p.m. tonight she will have sent five more messages, each one harder than the last, because the silence WAS the withdrawal she predicted. The prediction just got proved correct.",
        nextSceneId: "ignore-1",
        isOptimal: false,
      },
      {
        id: "call",
        text: "Don't text. Call her. Voice cuts through text-spirals.",
        tactic: "Voice often DOES cut through text-spirals but only if the voice on the call is regulated. You just walked in the door. You are tired and reactive. The call can go either direction depending on what you lead with when she picks up.",
        nextSceneId: "call-1",
        isOptimal: false,
      },
      {
        id: "give",
        text: "Pause. Don't reply for ninety seconds. Draft a few sentences in your notes app first, then send.",
        tactic: "GIVE. Gentle, Interested, Validate, easy Manner. Validate the feeling. Hold the fact. Anchor in real plan. Soft AND firm. The diagonal.",
        nextSceneId: "give-draft",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // DEFEND PATH
  // ===================================================================
  {
    id: "defend-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You type fast, because you are right.",
      },
      {
        speakerId: null,
        text: "YOU: 'I'm not pulling away. You're imagining it. I had a long week.'",
      },
      {
        speakerId: null,
        text: "Three dots. They are immediate. The reply lands at 6:44 p.m.",
      },
      {
        speakerId: "mira",
        text: "see this is what i mean",
        emotion: "angry",
      },
      {
        speakerId: "mira",
        text: "you're being so defensive. I didn't say anything wrong and you're snapping at me. Why are you so defensive if it's not true",
        emotion: "angry",
      },
      {
        speakerId: "mira",
        text: "do you even hear yourself",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "The defensive language has, in less than a minute, become new evidence. She did not have evidence at 6:42. She has evidence at 6:44. The evidence is your tone.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the BPD nervous system's most reliable hostile-environment scan. Tone IS data. Defense reads as confirmation. The mechanism is not malicious, it is a pattern-match reflex that runs on the volume and velocity of your reply, not the content. The reply was technically correct. It was also tonally hot. Hot tone reads as 'something to defend,' which means there is something to hide, which means the original accusation must have been correct.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "defend-double-down",
        text: "Reply hotter. 'I am not snapping. You're putting words in my mouth. This is exhausting.'",
        tactic: "Doubling down. Feels like setting the record straight. Reads as escalation. The fight is now the thing happening; the original accusation is no longer the topic. By 8 p.m. you will both be on a thirty-message thread that is not about anything.",
        nextSceneId: "defend-escalated",
        isOptimal: false,
      },
      {
        id: "defend-recover",
        text: "Stop. Don't reply for two minutes. Recalibrate. Try the GIVE move now.",
        tactic: "Late, but recoverable. Switching tone mid-stream is harder than starting soft, but it is not impossible. The recovery has to acknowledge the heat and the feeling, then anchor the fact, then stop.",
        nextSceneId: "defend-recover-attempt",
        isOptimal: true,
      },
    ],
  },

  {
    id: "defend-escalated",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "By 8:14 p.m. you have exchanged thirty-one messages. Neither of you has eaten dinner. Neither of you can remember what the original accusation was, which is, structurally, why fights with a borderline nervous system tend to keep going long past the point of their content.",
      },
      {
        speakerId: null,
        text: "You go to bed at midnight, jaw tight. You have not eaten. The Saturday brunch is, technically, still on the calendar. Neither of you has confirmed it since the fight.",
      },
      {
        speakerId: "inner-voice",
        text: "The cost of the reactive evening: one piece of relational capital, the size of a Tuesday night. There will be repair tomorrow if you do it. The pattern just got reinforced, when she fires, you fire back. Next time the firing will come faster, because the body now knows that yours is reachable. This is how a friendship with a BPD can cycle through fight-make-up-fight-make-up four times a month for two years until one of you collapses.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-reactive-end",
        text: "End scene.",
        tactic: "The reactive ending.",
        nextSceneId: "ending-reactive",
        isOptimal: false,
      },
    ],
  },

  {
    id: "defend-recover-attempt",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Two minutes of breathing. You set the phone face-down. You drink water. You take your shoes off, which, ridiculously, helps. You pick the phone back up.",
      },
      {
        speakerId: null,
        text: "YOU: 'Okay, let me start over. The first reply came in hot, you're right about the tone. I'm not pulling away. I had a long week and I was slow on Thursday. I can hear that it landed scary on your side. Saturday at 11 still on?'",
      },
      {
        speakerId: null,
        text: "Three dots. They take longer this time. The reply lands at 6:53 p.m.",
      },
      {
        speakerId: "mira",
        text: "okay. Yeah. Saturday's on. Sorry. Bad day",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "Recovery is harder than getting it right the first time, but not impossible. The mid-stream tone shift cost you nothing structural. The friendship survives intact. The pattern that just got installed is also good, she saw that defensive heat is something you can self-correct from, which is a skill she watches for and rarely sees. The ending is one notch below the cleanest possible run, but well above the reactive ending.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-recover-end",
        text: "End scene.",
        tactic: "The recovered-after-misstep ending.",
        nextSceneId: "ending-recovered",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // APOLOGISE PATH (false apology / fold)
  // ===================================================================
  {
    id: "apologise-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You type the apology because the apology will stop the bleed.",
      },
      {
        speakerId: null,
        text: "YOU: 'You're right, I'm sorry. I have been off this week. I'll do better.'",
      },
      {
        speakerId: null,
        text: "Three dots. The reply is fast and tonally lighter.",
      },
      {
        speakerId: "mira",
        text: "thank you. I love you. I was scared",
        emotion: "sad",
      },
      {
        speakerId: "mira",
        text: "i don't want to lose you",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "The bleed has stopped. You feel relief. You feel a small, hard thing in your chest underneath the relief, which you do not name yet.",
      },
      {
        speakerId: "inner-voice",
        text: "The cost did not show up in the next ninety seconds. The cost is structural. You just told her body that the accusation produces apology. Her nervous system just learned, with one trial, that 'you've been weird with me for days' is the magic phrase that summons the fix. The next time her body is empty and she needs the fix, the phrase will arrive faster, with a slightly larger claim, because the small one worked. This is how an accuser-believer dynamic gets installed. It happens in a single Tuesday evening. It takes two years to dismantle.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "There is also a cost inside you. You agreed to a fact that did not happen. The 'small hard thing in your chest underneath the relief' is your own integrity registering that it just got traded. Most people who fold do not feel it on the first fold. They feel it on the twentieth, which is also the fold that breaks the friendship. Usually with a quiet collapse from your side, not a fight from hers.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-folded-end",
        text: "End scene.",
        tactic: "The folded ending.",
        nextSceneId: "ending-folded",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // IGNORE PATH
  // ===================================================================
  {
    id: "ignore-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You set the phone face-down. You change clothes. You make pasta. You eat the pasta watching half a movie.",
      },
      {
        speakerId: null,
        text: "8:11 p.m. the phone buzzes again. Three messages.",
      },
      {
        speakerId: "mira",
        text: "okay you're not even responding now",
        emotion: "angry",
      },
      {
        speakerId: "mira",
        text: "this is exactly what i'm talking about",
        emotion: "angry",
      },
      {
        speakerId: "mira",
        text: "i would never do this to you",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "9:47 p.m. two more.",
      },
      {
        speakerId: "mira",
        text: "you know what fine. Ill stop bothering you",
        emotion: "sad",
      },
      {
        speakerId: "mira",
        text: "have a good life",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "By 11 p.m. you have not replied. The Saturday brunch is in your calendar. You have no idea whether it is still on. Neither does she.",
      },
      {
        speakerId: "inner-voice",
        text: "The silence felt protective on your side and read as withdrawal on hers. From inside her body and you saw this from inside it in L2-1, the absence of response IS the answer. The body does not interpret 'busy evening' from a non-reply; it interprets 'leaving.' The longer the gap, the stronger the interpretation. Her 6:42 prediction was 'you're pulling away.' By 9:47 she had data she did not have at 6:42. The data was your silence. The prediction has been confirmed by the very mechanism the prediction described. This is the textbook self-fulfilling prophecy in BPD relational mechanics.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Tomorrow there will be a repair morning if you initiate one. You can. It will be harder than tonight's would have been. You also need to know: silence as a regulation strategy with a borderline nervous system does not regulate her, it dysregulates her further, and at the same time, it lets your nervous system avoid the work of holding a hard moment in real time. You bought your evening's calm at the price of her night's spiral. The trade was not free, even though it felt free.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-silence-end",
        text: "End scene.",
        tactic: "The silence-confirmed ending.",
        nextSceneId: "ending-silence",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // CALL PATH
  // ===================================================================
  {
    id: "call-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Phone in hand. Her contact is already up from the texts. You hit call.",
      },
      {
        speakerId: null,
        text: "Two rings. She picks up on the third. Her voice is wet. She has been crying for less than five minutes.",
      },
      {
        speakerId: "mira",
        text: "...hi.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "You have approximately one second to choose what you lead with.",
      },
      {
        speakerId: "inner-voice",
        text: "The first thing you say on this call is the entire call. Voice cuts through text-spirals only when the voice is regulated. If you lead with defense, the call goes the same place the defensive text would have gone, only louder. If you lead with the feeling she is having, name it back to her, soft, without conceding to the claim, the call lands.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "call-defense",
        text: "Lead with the facts. 'Mira, I need you to know I haven't been weird. I had a long week. That's all.'",
        tactic: "Voice version of the defensive text. Tonally a touch softer because it's voice but structurally the same move. She will hear 'haven't been weird' and her nervous system will register the contradiction before the warmth. The call goes loud.",
        nextSceneId: "call-defense-1",
        isOptimal: false,
      },
      {
        id: "call-validation",
        text: "Lead with the feeling. 'Hey. You sound scared. I'm here. Let me hear it.'",
        tactic: "Validation first. The fact-correction comes later, when her body has dropped from threat to ordinary. This is GIVE on a phone call. Gentle, Interested, Validate, easy Manner. The order of operations is: feeling, presence, fact, plan.",
        nextSceneId: "call-validation-1",
        isOptimal: true,
      },
    ],
  },

  {
    id: "call-defense-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "mira",
        text: "you HAVE been weird. I'm not making this up. Why does no one believe me when i say what i'm seeing.",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "The call is now the call you would have had at 8 p.m. via text, with the volume turned up. By 7:30 it is over. Neither of you said the worst thing, which is the only thing that survived. The Saturday brunch is in some kind of indeterminate state.",
      },
      {
        speakerId: "inner-voice",
        text: "Voice only cuts through text-spirals when voice is regulated. The phone amplified the dysregulation that the text would have routed. This is why DBT therapists, when they teach phone validation, spend a full session on 'what you say in the first sentence.' The first sentence is the call.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-call-louder-end",
        text: "End scene.",
        tactic: "The call-louder ending.",
        nextSceneId: "ending-call-louder",
        isOptimal: false,
      },
    ],
  },

  {
    id: "call-validation-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "mira",
        text: "...yeah. I am scared. I thought you were leaving.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "Her body has dropped from threat to ordinary in one sentence. Not yours, the order matters. You named her body's experience back to her, accurately, without conceding to the claim. The body got the validation it was reaching for. Once it has the validation, it can hear a fact.",
      },
      {
        speakerId: null,
        text: "You sit on the couch with shoes still on. You don't fill the silence right away. You let her cry for about thirty seconds. You say one thing every ten seconds, 'yeah,' 'I hear you,' 'I'm here.' You do not, yet, address the claim. You will, in about three minutes, when her body is ready.",
      },
      {
        speakerId: null,
        text: "At 7:04 p.m., when her breathing has slowed, you say: 'Nothing has changed on my side. I had a long week and I was slow on Thursday. That's the whole thing. Saturday's still on. I love you.'",
      },
      {
        speakerId: "mira",
        text: "okay. Yeah. I'm sorry i spiralled. I love you. Saturday at 11.",
        emotion: "sad",
      },
      {
        speakerId: "inner-voice",
        text: "This is the GIVE move executed on a phone call. The order of operations did the heavy lifting, feeling first, presence second, fact third, plan fourth. None of the four is skippable. Skipping feeling produces the call-louder ending. Skipping fact produces the folded ending. Skipping plan produces a re-spiral on Friday because the calendar didn't get reaffirmed.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-call-held-end",
        text: "End scene.",
        tactic: "The voice-held ending.",
        nextSceneId: "ending-call-held",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // GIVE PATH (the optimal text-based response)
  // ===================================================================
  {
    id: "give-draft",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You don't open her thread. You open your notes app instead. The temptation is to type into the text thread directly, but anything you type into the thread you will send, and the first draft is rarely the right one.",
      },
      {
        speakerId: null,
        text: "You take ninety seconds. You sit down on the floor with your back against the couch. Bag still on the floor. Shoes still on. You type the draft.",
      },
      {
        speakerId: "inner-voice",
        text: "The draft has four jobs: validate the FEELING (not the claim), hold the FACT, anchor in real PLAN, stay short. Long messages read to a BPD nervous system as defensive paragraph, short messages read as steady. Three to four sentences. No paragraph breaks, no lists, no 'I want to address each thing you said.' The skill is cleaner when it is small.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "You write four sentences. You read them back. You change one word ('really' to 'just'). You copy them into the text thread. You hit send at 6:46 p.m.",
      },
      {
        speakerId: null,
        text: "YOU: 'I hear you. I know how it lands when you feel someone slipping. Nothing has changed on my side. I had a long week and I was slow on Thursday. Saturday at 11 still on?'",
      },
      {
        speakerId: "inner-voice",
        text: "Notice the structure. Sentence one: validation. Sentence two: deeper validation, naming what her body is experiencing without agreeing with what her body is concluding. Sentence three: the fact, anchored in the one piece of real evidence (the Thursday lag), reframed as what it actually was. Sentence four: the plan, which gives her body something concrete to hold across the next four days. Soft AND firm. The diagonal.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "wait-for-reply",
        text: "Set the phone face-up on the coffee table. Wait.",
        tactic: "The waiting beat. This is the moment most people fail. The temptation is to send a follow-up if she takes more than ninety seconds. Don't. The draft was complete. Adding a sentence dilutes it.",
        nextSceneId: "give-wait",
        isOptimal: true,
      },
    ],
  },

  {
    id: "give-wait",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "Three dots come up. They go away. They come back. They go away again.",
      },
      {
        speakerId: null,
        text: "Six minutes pass. The longest six minutes of your evening so far.",
      },
      {
        speakerId: null,
        text: "At 6:52 p.m., the reply lands. It is two messages.",
      },
      {
        speakerId: "mira",
        text: "okay",
        emotion: "sad",
      },
      {
        speakerId: "mira",
        text: "i'm sorry. I had a bad afternoon. I love you. Saturday at 11",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "The bleed has stopped. The accusation did not turn into a fight. The Saturday plan is reconfirmed. Total elapsed time from 6:42 to 6:52, ten minutes.",
      },
      {
        speakerId: "inner-voice",
        text: "This is what GIVE looks like when it lands on the first send. About 60% of the time, it does. The other 40%, the BPD nervous system was too far into the spiral for one well-formed text to land, and a second wave comes back. A second wave is not a failure of the skill. The skill is for the second wave too. There is one more beat available to you in this scenario. Sometimes the second wave does not come, and the scene ends here. Sometimes it does. We will run the second-wave version, because that is the harder skill.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-second-wave",
        text: "Phone buzzes again at 7:04 p.m. three more messages.",
        tactic: "The second wave.",
        nextSceneId: "give-second-wave",
        isOptimal: true,
      },
    ],
  },

  {
    id: "give-second-wave",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "mira",
        text: "actually no. I'm not okay",
        emotion: "concerned",
      },
      {
        speakerId: "mira",
        text: "i can't keep doing this where i'm the only one feeling it. You say things are fine and i'm losing my mind for nothing. That's not nothing",
        emotion: "concerned",
      },
      {
        speakerId: "mira",
        text: "i need you to actually tell me what's going on with you because i can feel it",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "The second wave. Bigger claim than the first. The first was 'you're pulling away.' The second is 'you say things are fine and I'm losing my mind for nothing,' which is closer to 'I think you're gaslighting me.' The fact-base did not change in twelve minutes. The escalation is internal.",
      },
      {
        speakerId: "inner-voice",
        text: "The second wave is the test. The first GIVE landed and produced calm. The calm was real but unstable. Twelve minutes later, her body produced the bigger version. Partly because the calm did not match the size of the activation she walked in with, and the body is reaching for the activation it knows. The skilled move on the second wave is to do the SAME move you did on the first wave, with the same softness, without escalating in either direction.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Three temptations are about to arrive in your body. One: soften further to make the second wave stop. Two: defend now, because she just escalated to a bigger claim. Three: hold the same line you held the first time, with the same tone, without budging. Three is the skill. One installs a precedent that escalation produces extra softness. Two pulls you into the fight. Three is hardest because the body wants to MOVE in response to the increased activation. The skill is to NOT move.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "second-wave-soften",
        text: "Soften further. Reassure harder. 'You're not losing your mind. You're never losing your mind. I love you so much.'",
        tactic: "The over-correction. Lands as warmth in the next minute. Installs the precedent that escalation produces softer-than-baseline. Next time the second wave will arrive earlier, with a bigger claim, because the second wave just got rewarded for being a second wave.",
        nextSceneId: "second-wave-soften-result",
        isOptimal: false,
      },
      {
        id: "second-wave-defend",
        text: "Now defend. 'Mira, I literally just told you nothing is wrong. I can't keep proving it.'",
        tactic: "Late defense. Crashes the call-defense ending into the GIVE path. Twelve minutes of soft work get undone in one sentence. The fight you avoided at 6:42 starts at 7:05.",
        nextSceneId: "second-wave-defend-result",
        isOptimal: false,
      },
      {
        id: "second-wave-hold",
        text: "Hold the same line. 'I hear you. The thing I said is the thing. I'm not going anywhere. Saturday at 11.'",
        tactic: "The hold. Same softness, same fact, same plan. The body learns, slowly, that the second wave does not produce a different reply than the first. Over months, the second wave shrinks. This is one of the fastest-acting interventions in BPD relational learning.",
        nextSceneId: "second-wave-hold-result",
        isOptimal: true,
      },
    ],
  },

  {
    id: "second-wave-soften-result",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "mira",
        text: "okay. Okay. I love you too. I'm sorry. Saturday",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "The bleed stops at 7:08 p.m. the over-soft response landed warmly. You feel relieved. Underneath the relief, the same small hard thing in your chest that the apologise-fold path produced. Smaller, this time, because you did not concede to a fact. But there.",
      },
      {
        speakerId: "inner-voice",
        text: "Over-correction is not as costly as folding, but it is still costly. The body just learned that escalation produces extra warmth. The next devaluation will arrive sooner, with a bigger claim, because tonight's data point is 'second wave gets the deeper reassurance.' The skill is symmetrical replies. Same tone whether you are on the first wave or the third. It is hard. It is also what 18-month recovery actually looks like in practice.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-over-correct-end",
        text: "End scene.",
        tactic: "The over-correction ending.",
        nextSceneId: "ending-overcorrected",
        isOptimal: false,
      },
    ],
  },

  {
    id: "second-wave-defend-result",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: "mira",
        text: "wow. Okay. So you ARE annoyed. I knew it",
        emotion: "angry",
      },
      {
        speakerId: null,
        text: "The defense lands as confirmation. Her nervous system files the reply under 'finally being honest.' By 7:30 you are in the fight you spent twelve minutes avoiding, and the avoidance work is now compounded into evidence, 'so you were faking it the whole time.' The Saturday brunch is in indeterminate state.",
      },
      {
        speakerId: "inner-voice",
        text: "Late defense after early softness reads as 'mask coming off.' From her body's perspective, the soft early reply was a performance and the defensive late reply is the truth. The actual sequence, sincere validation followed by tired honesty, is invisible to a nervous system that scans tone as data. The recovery from this ending is harder than the recovery from the early-defense ending, because you also have to repair the perceived dishonesty of the early softness.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-late-defense-end",
        text: "End scene.",
        tactic: "The late-defense ending.",
        nextSceneId: "ending-late-defense",
        isOptimal: false,
      },
    ],
  },

  {
    id: "second-wave-hold-result",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: [],
    dialog: [
      {
        speakerId: null,
        text: "You type the four sentences. Same softness as the first reply. No additional reassurance. No defense. You hit send at 7:06 p.m.",
      },
      {
        speakerId: null,
        text: "YOU: 'I hear you. The thing I said is the thing. I'm not going anywhere. Saturday at 11.'",
      },
      {
        speakerId: null,
        text: "Three dots. They take longer than the first time. About four minutes.",
      },
      {
        speakerId: "mira",
        text: "okay",
        emotion: "neutral",
      },
      {
        speakerId: "mira",
        text: "i'm gonna take a bath. I'm sorry i did the thing. Love you. Saturday",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Total elapsed time from 6:42 to 7:11, twenty-nine minutes. You stand up off the floor. Your bag is still by the couch. Your shoes are still on. You take the shoes off. You eat dinner.",
      },
      {
        speakerId: "inner-voice",
        text: "This is the cleanest run available in this scenario. Two waves, two identical replies, no escalation in either direction. The body she has, the one that scans for tonal asymmetry, got symmetrical data twice in a row. The pattern that gets installed tonight is not 'you reassure when I escalate.' It is 'the line is the line.' Over months, this is the move that shrinks the second wave. Most BPD recovery research describes this exact mechanism, predictable, calibrated, non-reactive responses across repeated activation cycles, applied by an attached witness, over enough time for the nervous system to update.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You also did not cure her tonight. Tomorrow she may text in the morning to apologise more thoroughly. Or to test the line again with a new shape. Or to simply send a TikTok. Whichever it is, your job is to respond to what is actually in front of you, on its own terms, the same way you responded to the texts at 6:42, soft, accurate, undefended.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-give-held-end",
        text: "End scene.",
        tactic: "The GIVE-held ending.",
        nextSceneId: "ending-give-held",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-reactive",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Reactive",
    endingLearnPrompt:
      "You matched the intensity. The accusation was unfair, your defense was technically correct, and the cost was structural. Defensive language reads to a borderline nervous system as confirmation, your tone became the new evidence she did not have at 6:42. Thirty-one messages later, the original topic is gone and the fight is the fight. The pattern installed tonight is bidirectional reactivity. Repair is possible tomorrow with one short, soft, non-defensive message but the body she scans with just learned that yours is reachable, and the next devaluation will arrive faster on the strength of that data.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The skill on the first wave is not winning the argument. It is not being correct about what happened on Thursday. The skill is producing a reply that is soft AND firm at the same time. Loud-soft is collapse. Loud-loud is reactive. Soft-firm is the diagonal. Tomorrow you can repair this with a four-sentence GIVE message. The repair will work. The pattern will take three to five repetitions to dismantle.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-recovered",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Recovered Mid-Stream",
    endingLearnPrompt:
      "You came in hot, recognised it, and switched tone within four minutes. This is recovery, not first-pass mastery but recovery is the skill most relationships actually need most often, because most people miss the first sentence. The mid-stream correction taught her body that defensive heat is a thing you can self-correct from, which is a piece of information her nervous system has rarely received from previous people. The friendship survives intact. The pattern installed is good, slightly below the cleanest possible run, well above reactive.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Most of the work in living with someone with BPD is not first-pass mastery. It is recovery. You will get the first sentence wrong sometimes, because you are tired, because you walked in the door four minutes ago, because the accusation is unfair and your body responds to unfairness with heat. The skill is being able to recover within minutes, not seconds and to recover with a single short, undefended message, not a paragraph of explanation. You did that.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-folded",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Folded",
    endingLearnPrompt:
      "You stopped the bleed in ninety seconds. The cost was paid in installments over the next five years. You agreed to a fact that did not happen, that you have been pulling away, which gave her body the experience that the accusation produces apology. The accuser-believer dynamic just got installed in a single Tuesday evening. The next devaluation will come faster, with a bigger claim, because the small one worked. The hard thing in your chest underneath the relief is your own integrity registering the trade. Most folds do not feel costly on the first one. They feel costly on the twentieth, which is the one that ends the friendship. Usually with a quiet collapse from your side, not a fight from hers.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Validation of feeling is not agreement with claim. The hinge of this scenario is that distinction. 'I hear that you're feeling I'm pulling away' is not the same sentence as 'You're right, I have been pulling away.' The first one is GIVE. The second one is folding. Tomorrow you can begin to dismantle the precedent, 'I want to take back the second part of last night's text. The first part was true; I do hear how it landed. The second part was me trying to stop the fight, which wasn't fair to either of us. Saturday at 11 still on?' This is doable. It also takes four to six repetitions to reset the body's pattern-match.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-silence",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Silence Confirmed",
    endingLearnPrompt:
      "Silence felt protective on your side and read as withdrawal on hers. The 6:42 prediction was 'you're pulling away.' By 9:47 the prediction had been confirmed by the very mechanism the prediction described. You bought your evening's calm at the price of her night's spiral. Tomorrow's repair will be harder than tonight's would have been, because the repair now has to undo a confirmed prediction, not redirect a fresh one. The Saturday brunch is still on the calendar in some indeterminate state. Initiate the repair. It works. It takes longer.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Silence as a regulation strategy with a borderline nervous system does not regulate her, it dysregulates her further, and it lets your nervous system avoid the work of holding the hard moment in real time. There is a version of 'no contact' that is a legitimate boundary in some relationships. This is not that. This is unannounced silence in the middle of a live thread, which is a different beat. If you need a buffer, name it: 'I'm in the door, I need fifteen minutes, I'll text you back at 7:15.' That sentence routes everything the silence was supposed to route, without producing the prophecy.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-call-louder",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Call Louder",
    endingLearnPrompt:
      "Voice cuts through text-spirals only when the voice is regulated. You called from a body that walked in the door four minutes earlier, into a call that opened with a defense rather than a validation. The phone amplified the dysregulation that the text would have routed. The first sentence on the call IS the call. DBT therapists teach a full session on this and it is why. The Saturday brunch is in some kind of indeterminate state. Repair is possible tomorrow with a short, soft, non-defensive message; the call did not break the friendship, but it spent more capital than the text version of the same misstep would have.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The order of operations on a phone validation call is: feeling first, presence second, fact third, plan fourth. Skipping any of the first three corrupts the rest. The call-validation ending you saw on the other branch is not magic, it is the sequence applied with attention to body, not to argument. You can call her tomorrow, lead with feeling, and the call will land. Tonight is recoverable.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-call-held",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Voice Held",
    endingLearnPrompt:
      "You called and led with feeling. Her body dropped from threat to ordinary in one sentence, because the sentence named her experience back to her, accurately, without conceding to the claim. You did not fill the silence. You said one short thing every ten seconds. You waited for her breathing to slow before you addressed the fact. By the time you said 'Saturday at 11 still on?' her nervous system was in a state that could receive plan. This is GIVE on a phone call, executed in the order it has to be executed in. About ten minutes total elapsed. Total relational capital spent: small. Total deposited: meaningful, she will remember this call as one of the times someone met her in spiral without escalating or folding. Those calls are rare. They are also what the witness-relationship is for.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "There is a version of this scenario where the call is the exact right move. There is a version where the text GIVE is. The two are equivalent at the level of skill, they are different routes to the same diagonal. Phone calls work when the voice is regulated. Texts work when the draft is short. Both fail when the order of operations gets corrupted. You executed the order. Most people do not.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-overcorrected",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Over-Corrected",
    endingLearnPrompt:
      "You held the line on the first wave. On the second, you softened further. The over-soft response landed warmly in the next minute and installed the precedent that escalation produces extra warmth. Tonight's data point, from her body's perspective, was 'second wave gets the deeper reassurance,' which means the next devaluation will arrive sooner, with a bigger claim, because the body has now learned that the second wave is rewarded. The cost is smaller than folding. The mechanism is similar. The skill is symmetrical replies. Same tone whether you are on the first wave or the third.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Soft is not safe. Symmetric is safe. The line on wave two is the same line as wave one. Same softness, same fact, same plan. Doing this is hard because the body wants to MOVE in response to the increased activation. The skill is to NOT move. Over months, the symmetric reply shrinks the second wave. The asymmetric reply grows it.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-late-defense",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "Late Defense",
    endingLearnPrompt:
      "Twelve minutes of soft work, undone in one sentence. Late defense after early softness reads to a borderline nervous system as the mask coming off, the soft reply gets recategorised as performance, and the defensive reply gets categorised as truth. The actual sequence, sincere validation followed by tired honesty, is invisible to a nervous system that scans tone as data. Recovery from this ending is harder than recovery from a clean early-defense ending, because you also have to repair the perceived dishonesty of the early softness.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The skill on the second wave is the same skill as on the first wave. The body that produced the second wave is the same body that produced the first, only more activated. Same softness, same fact, same plan. If you cannot produce that on the second wave because you are out of capacity, the skilled move is to name the capacity, not to flip the tone: 'I'm with you. I need ten minutes to eat. Texting you back at 7:20 with the same thing I just said, because that's still the thing.' That message does not break the line. It announces the buffer.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-give-held",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "GIVE Held",
    endingLearnPrompt:
      "Two waves. Two identical replies. No escalation in either direction. The body she scans with, the one that reads tonal asymmetry as data, got symmetrical data twice in a row. The pattern installed tonight is 'the line is the line.' Across months, this is the move that shrinks the second wave. Most BPD recovery research describes this exact mechanism: predictable, calibrated, non-reactive responses across repeated activation cycles, applied by an attached witness, over enough time for the nervous system to update. You did not cure her tonight. You did not fold. You did not match. You did the thing the body needed witnessed, twice. At the same volume. This is the cleanest run available in this scenario, and it is also the run most people do not believe is possible until they have produced it once.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "GIVE is not about being nice. It is about being calibrated. Gentle, Interested, Validate, easy Manner, the four parts are mechanical, not soft. You can be gentle and not folding. You can be interested and not chasing. You can validate and not concede. You can have an easy manner and still be holding ground. The diagonal is real. You just walked it. Tomorrow's empty room and there will be one, has slightly less reach, because tonight's body learned that the line did not move when she pushed it. The body remembers.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira32: Scenario = {
  id: "lm-3-2",
  title: "The Devaluation",
  tagline: "Tuesday, 6:42 p.m. the first time she fires. Soft AND firm is a diagonal most people do not know exists.",
  description:
    "POV returns to the friend. Six weeks in, the first sustained devaluation beat. Mira sends an accusatory text at 6:42 p.m. on a Tuesday with poor fact-base support. The scenario teaches GIVE (Linehan's DBT acronym. Gentle, Interested, Validate, easy Manner) as a structured response to splitting-driven accusation: validate the FEELING (real) without conceding to the CLAIM (not). Five branches play out, defense, fold, silence, phone call (with sub-branch), and the four-sentence text GIVE, including a second-wave test that gates whether the player can hold a symmetric line under increased activation. Nine endings.",
  tier: "premium",
  track: "loving-mira",
  level: 3,
  order: 2,
  estimatedMinutes: 14,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 400,
  badgeId: "give-held",
  startSceneId: "the-frame",
  tacticsLearned: [
    "GIVE. Gentle, Interested, Validate, easy Manner, as a structured response to first-wave devaluation",
    "Validation of feeling is not agreement with claim, the hinge most non-clinicians get wrong",
    "The four-sentence GIVE structure: feeling, deeper feeling, fact, plan",
    "Symmetric replies under second-wave escalation, the move that shrinks the second wave over months",
    "Phone-call validation order of operations: feeling first, presence second, fact third, plan fourth",
    "Mid-stream tone correction, recovery as the more frequently-used skill than first-pass mastery",
  ],
  redFlagsTaught: [
    "Defensive language reads as confirmation, tone becomes evidence that did not exist before the reply",
    "False apology installs an accuser-believer dynamic in a single evening; takes years to dismantle",
    "Unannounced silence reads as the predicted withdrawal, self-fulfilling prophecy mechanics",
    "Voice calls amplify rather than route dysregulation when the voice itself is unregulated",
    "Late defense after early softness reads as 'mask coming off' and corrupts the perceived sincerity of the early reply",
    "Asymmetric softness across waves rewards escalation, symmetric replies shrink second waves; asymmetric replies grow them",
  ],
  characters: [INNER_VOICE, MIRA],
  scenes,
};

export default lovingMira32;
