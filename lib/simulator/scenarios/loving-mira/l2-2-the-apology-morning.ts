/**
 * loving-mira-2-2, "The Apology Morning"
 *
 * Loving Mira, Level 2, order 2. Back to FP POV, the player is the
 * friend again, the morning after Mira sent the panic-text. Note
 * that the scenario does not require the player to have taken the
 * panic-text path in L2-1; it works as a self-contained story (Mira
 * had a moment last night, she's at your door this morning).
 *
 * What this scene teaches:
 *   - The validation-level test (Linehan, 1-6). The player picks a
 *     response and the scenario plays out which level of validation
 *     it actually delivered. Most "kind" responses are accidentally
 *     level 0 (dismiss / minimize), "it's fine!" tells the
 *     apologiser they cannot trust you with the truth. Skilled
 *     responses hit level 4-5 (validate based on history + present
 *     circumstance) without endorsing the behavior.
 *   - Validating the FEELING without endorsing the BEHAVIOR. The
 *     core distinction. "I can see you were scared" validates;
 *     "you were right to send the text" endorses. The player gets
 *     to feel the difference in Mira's real-time response.
 *   - The honest boundary that doesn't withdraw warmth. The "I'm
 *     not okay actually" path is allowed to exist as a skilled
 *     option, staying in the relationship does not require
 *     pretending you weren't affected.
 *
 * Voice direction: Kanika narration leans on the validation-level
 * vocabulary explicitly (this is one of the scenes where the
 * teaching is meant to be visible, not just felt). After the player
 * makes their choice, the inner-voice names which level it was and
 * what that level produced in Mira.
 *
 * Cast: MIRA (now visible, vulnerable, mortified), INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const MIRA: Character = {
  id: "mira",
  name: "Mira",
  description:
    "29. Music producer. The morning after a panic-text. Three hours of sleep. Two coffees in a tray. A rehearsed apology in her mouth.",
  traits: ["vulnerable", "self-aware", "mortified", "honest"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "borderline",
  silhouetteType: "female-elegant",
};

const scenes: Scene[] = [
  // ===================================================================
  // OPENING, 9:14 A.M. THE DOORBELL.
  // ===================================================================
  {
    id: "the-doorbell",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "9:14 a.m. you wake up to the sound of your buzzer. You did not order anything. You check your phone, there is a text from Mira from 8:52 a.m. that says 'I'm downstairs. I have coffee. You don't have to come down. Just wanted to say I'm here.'",
      },
      {
        speakerId: null,
        text: "Last night she sent you 'are we okay?' at 11:14 p.m. you replied 'yes baby of course we are. You good? did something happen?' She wrote back 'no, sorry, just got in my head. Love you. Sleep good.' You went to sleep slightly worried about her. You woke up forgetting it had happened.",
      },
      {
        speakerId: null,
        text: "She is downstairs. With coffee. She does not want you to feel obligated to come down. You can read what that means. It means she has slept three hours and rehearsed eighteen versions of an apology and the one she has settled on is 'I'm here, you don't have to come down.'",
      },
      {
        speakerId: "inner-voice",
        text: "She is in the morning-shame phase. The panic-text last night was scary; the morning after a panic-text is harder, because the panic is gone and what is left is the body of someone who knows what she did. The tray of coffee is the artefact. She has come to your building at 9 a.m. with the artefact. The next thing that happens is up to you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "go-down",
        text: "Throw on a sweater. Go down.",
        tactic: "The right move regardless of what you say next. She came to you; meeting her physically is its own first level of validation.",
        nextSceneId: "the-stoop",
        isOptimal: true,
      },
      {
        id: "tell-her-come-up",
        text: "Text: 'come up. Door's unlocked.'",
        tactic: "Also fine. Slightly less effort on your part, slightly more vulnerability on hers (she has to climb the stairs with the apology on her face). Either path works.",
        nextSceneId: "the-stoop",
        isOptimal: true,
      },
      {
        id: "stay-in-bed",
        text: "Text: 'too early, give me an hour, will text you when i'm up.'",
        tactic: "Honest. Not unreasonable. It also makes her wait an hour with the apology and the cooling coffee, which compounds the shame she is currently in. Worth knowing what you're choosing.",
        nextSceneId: "the-delayed",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE STOOP / THE LOFT, face to face
  // ===================================================================
  {
    id: "the-stoop",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She is on the stoop in yesterday's t-shirt and a hoodie that is too thin for the weather. Her hair is in a bun. She has not put on makeup. She looks like someone who has been up since 5:30. She holds out the coffee like it is a shield.",
      },
      {
        speakerId: "mira",
        text: "Hi. Okay. So. I'm not gonna make you stand here for a long thing. I just wanted to physically be in front of you and say, last night was me, not you. The text was a panic. There was nothing wrong. There IS nothing wrong. I love you. I came to give you the coffee and to tell you to your face that I know I did the thing.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "She doesn't look at you when she says it. She looks at the coffee. Her hands are shaking, slightly, you can see the lid of the coffee tremble.",
      },
      {
        speakerId: "inner-voice",
        text: "Read what just happened. She rehearsed this. She came in person specifically because she did not want you to feel asked-to-perform-comfort over text. She said 'I know I did the thing', she named the behavior without making you do the work of naming it. This is high-functioning, post-skill-work apology. It is also still a real apology that needs a real reception. The next sentence you say is going to teach her something about you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "its-fine",
        text: "\"It's fine. Don't worry about it. I love you, you're here, it's fine.\" (Wave it off. Hug her.)",
        tactic: "Feels kind. Reads as kind. Is, technically, level 0 validation, it dismisses what she did and tells her you cannot be trusted with the truth. The hug is real warmth; the words are a wall.",
        nextSceneId: "the-its-fine",
        isOptimal: false,
      },
      {
        id: "walk-me-through",
        text: "\"Come up. I want to hear about it. Walk me through what happened.\" (Receive the apology by asking for the actual story.)",
        tactic: "Level 4-5 validation, based on history (you know her) and present circumstance (she is here, mortified, with coffee). You are not dismissing. You are not endorsing. You are making space for the real version of last night to land in front of a real listener.",
        nextSceneId: "the-walk-through",
        isOptimal: true,
      },
      {
        id: "honest-boundary",
        text: "\"I love you. AND I'm not actually okay. AND I want to talk about it before we coffee.\" (Truth without withdrawal.)",
        tactic: "Level 5-6, validates the love AND validates that you have a real response to last night that she needs to know about. Hard. Honest. The 'and' does the work, it joins instead of choosing.",
        nextSceneId: "the-honest-boundary",
        isOptimal: true,
      },
      {
        id: "preemptive-space",
        text: "\"I think we need a few days. I'm not mad. I just need to recalibrate.\" (Withdraw to repair.)",
        tactic: "Honest in a way, but it lands as the thing she fears most, the FP withdrawing. The 'I'm not mad' is true; her nervous system will not be able to receive it. The withdrawal trains her body to expect that one panic-text is the relationship-ending event. Most likely outcome: the next panic-text is bigger, because the cost of one has been confirmed.",
        nextSceneId: "the-space",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE DELAYED, player chose to make her wait
  // ===================================================================
  {
    id: "the-delayed",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Mira's reply is fast: 'no totally, I'll go work in the cafe on the corner. Take your time. Don't rush.'",
      },
      {
        speakerId: null,
        text: "You shower. You make a slow coffee. You re-read last night's thread. You realise it took you forty-six minutes to text her you were ready, not the hour you said. That hour, she sat in a cafe with the now-cold coffees. You can imagine her face during that hour. You'd rather not.",
      },
      {
        speakerId: null,
        text: "She comes back. She is on the stoop. The coffees in the tray are room temperature now.",
      },
      {
        speakerId: "inner-voice",
        text: "You did not punish her on purpose. You did, in effect, give her an extra hour to feel the shame before she got to apologise. The hour was a wait that felt to her, even though she said it was fine, like the warm-up for the real punishment. Note this for the future: when she comes to you in shame, the waiting time is part of the punishment. You do not have to be available immediately; you do have to be aware of what 'wait an hour' costs.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-stoop-from-delayed",
        text: "Step out. Take the cold coffee. Continue.",
        tactic: "The scene resumes. The hour is logged.",
        nextSceneId: "the-stoop",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE 'IT'S FINE' PATH, well-meaning level 0
  // ===================================================================
  {
    id: "the-its-fine",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You hug her. She holds on a beat longer than you expect. Almost a held breath. When she steps back her face is doing the thing where it looks like relief but underneath it is something else. You can see it for a half-second before she covers it.",
      },
      {
        speakerId: "mira",
        text: "Okay. Okay. Thank you. God. I love you.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "She drinks her coffee. You both walk up to your apartment. The conversation moves on. By 11 a.m. you are talking about your weekend plans like nothing happened. The morning ends pleasantly.",
      },
      {
        speakerId: "inner-voice",
        text: "Look at what 'it's fine' just produced. She came with a real apology. You met it with a wall, a kind, well-meaning wall. The relief on her face was followed by something else, because some part of her registered that her real apology landed on a person who would not go where the apology needed to go. The morning ended pleasantly. The PATTERN got reinforced. Next time she panics, the 'are we okay' will be louder, because last night's was responded to with a wall that could not absorb it. 'It's fine' is the most common loving wall in BPD relationships. It is also one of the things that makes them unsustainable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-its-fine",
        text: "Continue.",
        tactic: "The scene closes.",
        nextSceneId: "ending-its-fine",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE WALK THROUGH, level 4-5 validation
  // ===================================================================
  {
    id: "the-walk-through",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She follows you up. You sit at the kitchen table with the coffees. You don't fill the silence. You wait. She breathes in. She breathes out. She tells you the actual story.",
      },
      {
        speakerId: "mira",
        text: "Okay. So. The drive home was fine. I was happy. Like, in-the-body happy. And then I was replaying the dinner. I do that, I replay good ones and I caught the moment where you laughed at the joke about the producer and didn't quite, your eyes didn't meet mine for the second beat. Like, half a second. I didn't notice it at the table. I caught it in the car.",
        emotion: "concerned",
      },
      {
        speakerId: "mira",
        text: "And the thought arrived, 'she's going to leave' and it did not feel like a thought, it felt like an envelope someone handed me. Like a thing I had just been informed of. By the time I got home it had built a case. I tried to use my skills. I, half-tried. I sent the text. I knew, sending it, that I was rewarding the spiral. I did it anyway. I'm sorry.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "She is looking at you fully now. The coffee is warm in your hands.",
      },
      {
        speakerId: "inner-voice",
        text: "What you just did was level 4-5 validation. By saying 'walk me through it' you told her: your story is welcome here, your real story, the one that includes the half-second of eye contact you noticed in the car. She handed you the cascade architecture. You made it possible for her to do that by being a person whose apology she could trust would not be dismissed. The cost of this skill is that you have to actually hear the story. The benefit is that the story stops happening UNDER the surface and starts happening between you.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "name-the-pattern",
        text: "\"Okay. So that's the pattern, right? The half-second thing, your therapist has a name for it?\" (Treat it as a system to understand, not a moral failing.)",
        tactic: "Skilled. Names the pattern as a SHAPE, not a sin. She wants to talk about it. You are letting her.",
        nextSceneId: "the-pattern-named",
        isOptimal: true,
      },
      {
        id: "share-your-side",
        text: "\"I want to tell you what last night was for me, too. Not as ammunition, just so we both know.\" (Bring your own side into the room.)",
        tactic: "Level 6, radical genuineness. Hard. Honest. Tells her you are a real person who was also affected by last night, and she is in a relationship with that person, not with a saint.",
        nextSceneId: "the-your-side",
        isOptimal: true,
      },
      {
        id: "validate-and-move-on",
        text: "\"Okay. Thank you for telling me. Want to get bagels? I'm starving.\" (Honor the disclosure, don't dwell.)",
        tactic: "Skilled in its own way. You let the apology land and then refused to make it the day's project. For some couples this is exactly right. For Mira, who is in DBT and processing this WITH a framework, the slightly-deeper conversation may serve her better. Both can work.",
        nextSceneId: "ending-walk-through-bagels",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE HONEST BOUNDARY, level 5-6
  // ===================================================================
  {
    id: "the-honest-boundary",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "She blinks. The hand holding the coffee tray comes down a half inch. You can see her register that you are not doing the 'it's fine' move. Her face goes very serious, not angry, not collapsing, just attentive. She is listening.",
      },
      {
        speakerId: "mira",
        text: "Okay. Yeah. Yeah, you're allowed to not be okay. Tell me.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "You don't rush. You tell her the truth. That last night scared you, not because of the text, the text was a thing but because of what it told you about the load you might be carrying. That you love her AND you do not want to be the thing that holds her panic. That you need her to keep doing her work, with her therapist, not with you. That you are not leaving. That you also need the next 'are we okay' to be smaller, not because she is not allowed to feel it, but because the size of last night's was a request you cannot keep saying yes to without resentment building.",
      },
      {
        speakerId: null,
        text: "She listens. She does not interrupt. When you stop talking she nods and says, slowly:",
      },
      {
        speakerId: "mira",
        text: "Okay. I hear you. I am. I'm not gonna pretend that didn't sting, but it didn't sting in the way I was afraid of. It stung in the way that a person who loves me told me the truth. I'd rather have that than the wall. I'm gonna talk to Alana about it tomorrow. Thank you for not just saying it's fine.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "This is level 5-6, radical genuineness. You honored the love AND the truth at the same time. You did not perform comfort; you did not withdraw. You stayed. The 'and' did the work, it told her: I am not choosing between loving you and being affected by you. Both are real. She received it cleanly because she has done the work to be able to hear this version of the truth. Many partners cannot deliver this version. Many people with BPD cannot hear it. Tonight, you both did. That is the move that makes the relationship sustainable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-honest-boundary",
        text: "Continue.",
        tactic: "The scene closes on the cleanest available outcome.",
        nextSceneId: "ending-honest-boundary",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE SPACE, preemptive distance
  // ===================================================================
  {
    id: "the-space",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "Her face goes very still. The tray with the coffees does not lower; she just freezes. You can see her process the words 'a few days.' You can see her brain run the calculation that she has built her therapeutic work to be able to run: she is being abandoned, but the form is one she should be able to handle, but the form is also the form she is most scared of, and the gap between 'should' and 'is' is the gap she is currently inside.",
      },
      {
        speakerId: "mira",
        text: "Okay. Okay. Yeah. Take, yeah. Take the days. I get it. I'll be. I'll text Vee. I won't text you. Take the time. Sorry again.",
        emotion: "sad",
      },
      {
        speakerId: null,
        text: "She turns. She walks away with the tray of coffees. She does not let you see her face when she turns.",
      },
      {
        speakerId: "inner-voice",
        text: "Read carefully. You did the thing that, in a relationship without BPD, is sometimes the right move, 'I need a few days.' For Mira, you just did the thing her nervous system has built its whole defensive architecture around. You said 'I'm not mad' and her brain heard 'the consequence for one panic-text is three days of withdrawal.' She is going to manage this. She has skills. She has Vee. The relationship is not over. AND, the next time she panics, the threshold to send the text will be HIGHER, because the cost has been confirmed. She will hold the panic longer. The longer she holds it, the worse it will be when it breaks. The 'preemptive space' move can be skilled in some relationships. With Mira, this early, it teaches her body that you are conditional. Most BPD relationships die not from panic-texts but from this, small, justifiable, well-meaning withdrawals that compound into the FP-becomes-conditional pattern.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-space",
        text: "Continue.",
        tactic: "The scene closes. The damage is logged.",
        nextSceneId: "ending-space",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // THE PATTERN NAMED, sub-resolution after walk-through
  // ===================================================================
  {
    id: "the-pattern-named",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: "mira",
        text: "Yeah. The half-second thing is what Alana calls 'micro-evidence acquisition', basically, the cascade is hyper-attuned to micro-cues that a regulated nervous system would never notice. The same circuit that lets me read a song is the one that catches the eye-flicker. It's not paranoia, it's signal-detection turned all the way up. The skill is to notice that I'm noticing and put the data in a 'review tomorrow' folder instead of in a 'verdict tonight' folder.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She is talking with the cadence of someone who is processing this WITH a framework, not against one. You can see her thinking instead of hiding.",
      },
      {
        speakerId: "inner-voice",
        text: "By treating the pattern as a SHAPE, not a moral failing, you made it possible for her to externalise it instead of being it. She stopped being the cascade and started being a person observing the cascade. This is the most useful posture you can give her, and it is the one most people accidentally close down when they react to the panic-text as a moral event instead of a clinical one.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-pattern-named",
        text: "Continue.",
        tactic: "The scene closes on the cleanest extension of the walk-through path.",
        nextSceneId: "ending-pattern-named",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE YOUR SIDE, radical genuineness
  // ===================================================================
  {
    id: "the-your-side",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mira", "inner-voice"],
    dialog: [
      {
        speakerId: null,
        text: "You tell her what last night was for you. You tell her about the moment you read 'are we okay?' and your stomach went down, not because the question was bad, but because you knew, instantly, what it was, and you knew what answering would do, and you also knew what NOT answering would do. You tell her that you replied because of love and because of triage and that you went to bed worried and woke up half-having-forgotten and that the half-having-forgotten is its own data, about you, not her.",
      },
      {
        speakerId: "mira",
        text: "Yeah. Yeah, I, thank you for telling me that. I think I assumed the answer registered for you the way it registered for me. It didn't. It cost you something it didn't cost me. That's worth knowing.",
        emotion: "concerned",
      },
      {
        speakerId: "inner-voice",
        text: "The specific gift of this exchange: you both got to see that the same event, last night's text, was ASYMMETRICAL. For her it was a panic that resolved when you answered. For you it was a managed moment that left a small residue you only noticed in the morning. Most BPD relationships die because the partners assume the experience was symmetrical. It almost never is. The skill is to talk about the asymmetry without weaponising it. You both did. That is rare.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-end-your-side",
        text: "Continue.",
        tactic: "The scene closes on the deepest available outcome.",
        nextSceneId: "ending-your-side",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-its-fine",
    backgroundId: "apartment",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "It's Fine",
    endingLearnPrompt:
      "The morning ended pleasantly. You moved on. The thing you accidentally did is teach Mira that you cannot be trusted with the real version of last night. 'It's fine' is the most common loving wall in BPD relationships. It is kind in tone and unsafe in function, kind because no one wants the apologiser to feel worse, unsafe because it tells the apologiser that their actual behavior is something you would rather not name. The next time the panic-text fires, it will fire bigger, because last night's wasn't met. The wall is not the problem; the wall pretending to be a door is.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Validation level 0 is dismissal even when it's said warmly. The skill is to say what's true without performing it as kindness. 'You came here, I see you, walk me through it' is harder to say and produces a stronger relationship. 'It's fine' produces a quieter morning and a louder next-night.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-walk-through-bagels",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Bagels",
    endingLearnPrompt:
      "You let the apology land, you didn't make it the day's project, you went to get bagels. Honest, level-4 validation followed by un-ceremonious ordinariness. Some couples do their best repair in the gap between the hard sentence and the breakfast that follows. Mira got to deliver the apology, you got to receive it, neither of you turned it into a performance. The ordinariness IS the love. By 11 a.m. you were sitting on a curb eating bagels and arguing about cream cheese flavors. The pattern was named. The day kept going.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Not every repair has to be a deep talk. Sometimes the skill is to receive the truth and then refuse to let it be the only thing you do today. Mira's recovery is helped by relationships where her panic-texts are small events instead of identity-defining ones. You modeled that.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-pattern-named",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Externalised",
    endingLearnPrompt:
      "You named the pattern as a shape. Mira talked about it like a clinician would, not because she's pretending to be a clinician, but because she has done the work to be able to externalise her own pattern. By meeting the pattern with curiosity instead of judgement, you made room for her to be the observer instead of the patient. This is what skilled BPD relationships look like at the high end. Both parties able to talk about the cascade as a system the cascade is happening to, not as a character flaw.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The most underrated thing in BPD relationships: the partner who treats the cascade like weather instead of like a moral choice. Weather is a thing you prepare for, talk about, plan around. Moral choices are things you punish or absolve. Mira does not need absolution. She needs forecasts. You just gave her one.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-your-side",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Asymmetry",
    endingLearnPrompt:
      "You told her what last night was for you, not as a complaint, just as data. She received it. You both saw that the same event was different on each side, for her a panic, for you a managed moment that left a small residue. Most BPD relationships die because the partners assume the experience was symmetrical. It almost never is. The skill is to talk about the asymmetry without weaponising it. You did. The relationship just gained a piece of architecture it didn't have yesterday, the ability to say 'that cost me something' without it landing as 'so you're leaving.'",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Asymmetry-honest relationships are rarer than they should be. Most partners suppress their side because saying it feels like punishment. Most BPD partners cannot hear it because their nervous system reads it as the prelude to abandonment. You both can. That is not magic. It is practice. Tonight you got better at it. So did she.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-honest-boundary",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The 'And'",
    endingLearnPrompt:
      "You honored the love AND the truth in the same gesture. You did not perform comfort; you did not withdraw. The 'and' did the work, it told her: I am not choosing between loving you and being affected by you. Both are real. She received it because she has done the work to be able to hear this version of the truth. Many partners can't deliver this. Many BPDs can't hear it. Tonight you both did. This is the move that makes the relationship sustainable across decades, not weeks.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Validation level 5-6 in five sentences. 'I love you. AND I'm not actually okay. AND I want to talk before we coffee.' The 'and' is the only word that matters. 'But' chooses sides. 'And' refuses to. With Mira specifically and with anyone who is built to hear withdrawal in the smallest pause, 'and' is the difference between safety and threat.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-space",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "A Few Days",
    endingLearnPrompt:
      "You said 'I'm not mad' and 'I need space' in the same breath. In a non-BPD relationship, this is sometimes the right move. With Mira, this early, it taught her body that one panic-text costs three days. The relationship is not over. AND, the threshold to send the next text just went up. She will hold panic longer. The longer she holds it, the bigger the break. Most BPD relationships die not from panic-texts but from this, well-meaning withdrawals that compound into the FP-becomes-conditional pattern. The way to repair this is to not let three days become five, and to come back with the truth that 'I'm not mad' was true and the space was a mistake. You can still say that.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Withdrawal is sometimes correct. Withdrawal in response to a panic-text, six weeks in, is almost never. The same skill executed in month 18 of a relationship lands differently. Geometry matters. Tonight, this geometry was wrong. Tomorrow's geometry can still be right.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const lovingMira22: Scenario = {
  id: "lm-2-2",
  title: "The Apology Morning",
  tagline: "9:14 a.m. two coffees. Three hours of sleep. The validation-level test.",
  description:
    "Back to FP POV. The morning after Mira's panic-text, she is on your stoop with coffee at 9 a.m., mortified and rehearsed. The scenario teaches the validation-level test (Linehan, 1-6): the difference between dismissive 'it's fine,' present-circumstances validation, radical genuineness, and the well-meaning withdrawal that lands as withdrawal regardless of intent. The skill is validating the FEELING without endorsing the BEHAVIOR and refusing to choose between love and truth.",
  tier: "premium",
  track: "loving-mira",
  level: 2,
  order: 2,
  estimatedMinutes: 11,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 360,
  badgeId: "validation-tested",
  startSceneId: "the-doorbell",
  tacticsLearned: [
    "Linehan validation levels 1-6, what each level produces in the apologiser",
    "The 'and' instead of 'but', joining instead of choosing between love and truth",
    "Treating the cascade as weather, not as a moral choice, the externalisation move",
    "Talking about asymmetry without weaponising it, the architecture move that lets a relationship survive decades",
  ],
  redFlagsTaught: [
    "'It's fine' as level-0 dismissal even when said warmly, the most common loving wall in BPD relationships",
    "Preemptive space after a panic-text training the FP-becomes-conditional pattern, the slow killer of BPD relationships",
    "Big over-apology as the cousin of the panic-text. Both ask the partner to confirm the relationship",
    "The hour of waiting as part of the punishment, even when consciously framed as 'no rush'",
  ],
  characters: [INNER_VOICE, MIRA],
  scenes,
};

export default lovingMira22;
