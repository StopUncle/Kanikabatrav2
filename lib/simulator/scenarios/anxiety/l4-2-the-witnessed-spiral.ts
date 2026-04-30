/**
 * anxiety-4-2, "The Witnessed Spiral"
 *
 * Anxiety track, Level 4, order 2. The relational core of the arc.
 * Friday, 9:18 p.m. Sam at home with Mia. Dinner at Aisha's at 10.
 * Sam has been quiet since coming home from work. Body building a
 * spiral about whether Sam will have a panic at the restaurant.
 * Mia notices. Mia is also having a longer day than usual, her
 * own deadline missed, a frustrating call with her mother, tired.
 * The interaction has stakes for both bodies.
 *
 * What this scene teaches:
 *   - The shape of the ASK matters more than the relationship.
 *     Even Mia can only respond well if asked well. The optimal
 *     ask is witness-without-certainty-granting; the suboptimal
 *     asks are reassurance-seeking, isolation, or cancellation.
 *   - The 90-second POV flip to Mia. Camera pulls outward; player
 *     sees Mia's face and decision in the moment of choosing
 *     whether to provide the reassurance Sam reaches for, or to
 *     hold the line. This is structurally parallel to the L4-2
 *     Vee call in Loving Mira, a brief switch to a different
 *     consciousness, designed to teach the player what is happening
 *     on the other side of the relational dynamic.
 *   - The cost of fold versus the cost of hold. Mia folding (i.e.
 *     providing the reassurance) costs across years; Mia holding
 *     (i.e. refusing to provide reassurance, witnessing instead)
 *     costs ten minutes of mutual discomfort and produces the
 *     body's experience that uncertainty is survivable.
 *   - The 'name the state, ask for nothing specific' move as the
 *     cleanest single ask available. 'I'm spiralling about dinner.
 *     I don't need anything from you. I just want you to know it's
 *     loud right now.' Names without demanding. Leaves Mia free to
 *     respond from her own ground.
 *
 * Voice: Friday-evening kitchen register. Two bodies in a small
 * apartment with mid-grade activation in both. The POV flip to
 * Mia is rendered as Kanika narration during her decision-moment —
 * the camera pulls outward, the player sees what right-relating
 * costs from the inside.
 *
 * Cast: SAM (player), MIA (active in scene, plus the POV flip),
 * INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. Home Friday evening, in the leftover-shape from a week of CBT homework. Body building a spiral about the dinner at Aisha's at 10 p.m.",
  traits: ["sensitive", "in-treatment", "spiralling-quietly"],
  defaultEmotion: "concerned",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const MIA: Character = {
  id: "mia",
  name: "Mia",
  description:
    "30. Sam's partner. Has been intuitively right-relating for two years. Today she has missed her own deadline and had a frustrating call with her mother. Tired in a way she has not had time to process. The dinner at Aisha's at 10 is on her calendar too.",
  traits: ["calm", "grounded", "tired-tonight"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, relational core, the shape of the ask
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Friday, 9:18 p.m. the relational core of the arc. You are home with Mia. The dinner at Aisha's is in 42 minutes. Your body has been building a low-grade spiral since 7 p.m. about whether you will have a panic at the restaurant.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Mia has been intuitively right-relating to your anxiety for two years without anyone naming what she is doing. Tonight she is also having a longer day than usual, she missed her own deadline this afternoon, she had a frustrating call with her mother an hour ago, she is tired in a way she has not had the room to process. Tonight is the night the dynamic gets stress-tested.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What you ask for in the next four minutes will set the shape of the next two years of how anxiety lives in this relationship. The shape of the ASK matters more than the relationship. Even Mia can only respond well if asked well. There are five available asks. Two of them are loop-feeders, reassurance-seeking, isolation. One is the cancellation move. Two are the work, explicit witness-asking, and naming-the-state-while-asking-for-nothing-specific.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Inside one of the branches you will see Mia's face. The camera will pull outward for ninety seconds. You will see what right-relating costs from her side. This is the only POV flip in the arc. Pay attention.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The kitchen.",
        tactic: "The scene opens.",
        nextSceneId: "the-kitchen",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE KITCHEN, context, the spiral, Mia notices
  // ===================================================================
  {
    id: "the-kitchen",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: null,
        text: "You are at the kitchen counter. You have been at the kitchen counter for nine minutes, doing the thing you do when you are spiralling and pretending not to be, moving objects from the counter to the sink, then from the sink to the drying rack, then back to the counter. The objects are clean. The motion is the medicine.",
      },
      {
        speakerId: null,
        text: "Mia is on the couch. She is reading a book that you bought her in October. She has been on the same page for about three minutes, you can tell because she has not turned the page and she is not actually reading.",
      },
      {
        speakerId: null,
        text: "She closes the book. She sets it down. She does the thing she does where she stretches one leg in a way that announces she is about to say something.",
      },
      {
        speakerId: "mia",
        text: "Hey. You okay.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Her voice is the calm version. Not the worried version. She has noticed without sirening. The sentence is one of the cleanest open-ended check-ins available, yes/no, no demand to articulate state, no positioning of her as the rescuer.",
      },
      {
        speakerId: "inner-voice",
        text: "What you ask for in the next sentence is the entire scene. Five available asks.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "ask-reassurance",
        text: "Ask for reassurance. 'Tell me dinner is going to be fine.'",
        tactic: "The reassurance-seeking ask. Tonight Mia has two options, fold (provide it) or hold (refuse to provide it). The branch shows both. Fold costs across years. Hold costs ten minutes of mutual discomfort and is the longer-term skill.",
        nextSceneId: "ask-reassurance-1",
        isOptimal: false,
      },
      {
        id: "ask-witness",
        text: "Ask for witness explicitly. 'I'm spiralling. Can you sit with me for ten minutes without saying anything?'",
        tactic: "The explicit-witness ask. Specific, structured, low-burden on Mia. She exhales, sits next to you, puts one hand on your leg, doesn't speak. Eight minutes pass. Body de-escalates. Dinner is fine.",
        nextSceneId: "ask-witness-1",
        isOptimal: true,
      },
      {
        id: "isolate",
        text: "'I'm fine. Let me just shower.' Disappear into bathroom.",
        tactic: "The avoidance-of-asking move. Body remains spiralled in the shower. Mia's body knows you are not fine and that you have refused to let her in. Dinner is uncomfortable. The avoidance-of-asking is its own anxiety move and across months it is one of the most damaging.",
        nextSceneId: "isolate-1",
        isOptimal: false,
      },
      {
        id: "name-state",
        text: "Name the state, ask for nothing specific. 'I'm spiralling about dinner. I don't need anything from you. I just want you to know it's loud right now.'",
        tactic: "The cleanest single ask available. Names without demanding. Leaves Mia free to respond from her own ground, sit, do laundry next to you, make tea, stay on the couch. All valid. Body de-escalates because the secret is no longer secret.",
        nextSceneId: "name-state-1",
        isOptimal: true,
      },
      {
        id: "cancel",
        text: "Cancel the dinner. 'Hey. I'm not feeling great, can we tell Aisha we'll do it next week.'",
        tactic: "The avoidance ending. Body's tension drops 60% in 90 seconds. Same dynamic as L3-1's leave-the-store move. The cost is the same: tomorrow the body will associate restaurants with panic. The L3 lessons have not generalised yet.",
        nextSceneId: "cancel-1",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ASK-REASSURANCE PATH (with POV flip to Mia)
  // ===================================================================
  {
    id: "ask-reassurance-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "Tell me dinner is going to be fine.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "It comes out as a question with the shape of a request. The vulnerability is there. The reach is also there.",
      },
      {
        speakerId: null,
        text: "Mia does not answer immediately. She is looking at you. Her face does the small thing it does when she is choosing.",
      },
      {
        speakerId: "inner-voice",
        text: "The camera pulls outward. The next ninety seconds are inside Mia's body, not yours. You are watching her face. The narration is what is happening on her side.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "On Mia's side, this is what is happening:",
      },
      {
        speakerId: null,
        text: "She has been carrying her own day. The deadline she missed at 4 p.m. Is still vibrating in her chest. The call with her mother, fifty-four minutes of her mother circling the same complaint about her aunt, is still in her shoulders. She has not eaten since lunch. Her own anxiety, the version she does not name as anxiety, is at a 4 tonight.",
      },
      {
        speakerId: null,
        text: "She loves you. She knows the ask. The ask is the same shape as it has been a hundred times in two years and she has answered it a hundred times. The answer, the easy version, takes about four words: 'dinner will be fine.' The four words will resolve your body in ninety seconds and resolve her body in seven. They will let both of you get to dinner.",
      },
      {
        speakerId: null,
        text: "She also knows, or has been beginning to know in a wordless way for the last three months, that the four-word answer has been quietly costing her. Each time she provides it, her body becomes the thing your body reaches for at the moment your body should be reaching for its own skill. She has noticed she is tired in a particular flavour on the days she has provided multiple reassurances. She has not told you this.",
      },
      {
        speakerId: null,
        text: "She has two options. Fold, say the four words. Hold, say something different.",
      },
      {
        speakerId: "inner-voice",
        text: "The fold is easier in the next ninety seconds. The hold is easier across the next year. Mia's body has just done the math and chosen.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She chooses the hold.",
      },
      {
        speakerId: "mia",
        text: "I love you. I'm not going to tell you it's going to be fine. I don't know if it will be. I know we're going to go to dinner and you're going to be there and I'm going to be there. That's what I know.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The camera returns. You are in your body again. You have just been told no, in a kind voice, by the person whose yes you were reaching for.",
      },
      {
        speakerId: null,
        text: "The body's first response is the small wounded thing, she did not give it to you. The body's second response, slower, arriving over the next forty seconds, is something quieter. Something that recognises the move as care. The hold is more accurate to the situation than the fold would have been. She does not know if dinner will be fine. Lying to your body to soothe it is a small lie that compounds across years. She refused to lie.",
      },
      {
        speakerId: null,
        text: "You exhale. You walk over to the couch. You sit next to her.",
      },
      {
        speakerId: "sam",
        text: "Yeah. Okay. I hear that. Thank you for not lying to me.",
        emotion: "neutral",
      },
      {
        speakerId: "mia",
        text: "Yeah. I love you. We're going to dinner. Box breathing in the elevator on the way over if you need it. I'll be there.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What just happened on both sides is the relational version of the GIVE move from the BPD track, applied to anxiety. Mia validated the feeling (your fear is real) without conceding to the claim (that the dinner outcome is knowable in advance). She refused the easy fold and offered the harder hold and named her own presence as the actual deliverable instead of certainty about an outcome. This is the relational shape of right-relating to anxiety in 2026, and almost no untrained partner produces it on the first try. Mia produced it tonight on a tired evening because she has been intuitively practicing the shape for two years.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Across years, the hold-versus-fold ratio is what determines whether the relationship sustains the disorder or bends under it. Couples in which the partner folds reliably end up with one body becoming the other's regulator, which is the structural shape that is unsustainable past about year three. Couples in which the partner holds, gently, lovingly, without certainty-granting, produce two bodies that both stay grounded across decades.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-reassurance-end",
        text: "End scene.",
        tactic: "The ask-reassurance-Mia-holds ending.",
        nextSceneId: "ending-mia-holds",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ASK-WITNESS PATH (skill, explicit ask)
  // ===================================================================
  {
    id: "ask-witness-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "I'm spiralling. Can you sit with me for ten minutes without saying anything.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Mia exhales, a small audible release. She has been waiting, in some part of her body, for a version of this sentence. The structured ask makes the response easy: she does not have to choose between fold and hold; she has been told what is wanted.",
      },
      {
        speakerId: "mia",
        text: "Yeah. Come here.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She moves over on the couch. You walk over. You sit next to her. She puts one hand on your leg, not a squeeze, not a stroke, just a hand. She does not speak. She does not pick up the book. She does not check her phone.",
      },
      {
        speakerId: null,
        text: "Eight minutes pass.",
      },
      {
        speakerId: null,
        text: "The body de-escalates in the way that bodies de-escalate when they are held by a presence that is not asking anything of them. The chest tightness drops from a 6 to a 3. The breath lengthens. The cognitive content, the dinner, the restaurant, the panic-at-Aisha's narrative, loses energy.",
      },
      {
        speakerId: null,
        text: "At minute eight you put your hand over hers.",
      },
      {
        speakerId: "sam",
        text: "Okay. I'm down. Thank you.",
        emotion: "neutral",
      },
      {
        speakerId: "mia",
        text: "Yeah. Of course. Should we go to dinner.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "Yeah.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "You go to dinner. The dinner is fine. There is one small wave of activation around 10:42 when Aisha's partner asks an unintentionally pointed question about your work and your body fires. You take a breath. You answer. The wave descends. The rest of the dinner is dinner.",
      },
      {
        speakerId: "inner-voice",
        text: "The explicit-witness ask is one of the cleanest moves available in partnered anxiety, and it is significantly under-used because most anxious bodies have never been taught that 'sit with me without saying anything' is a real available request. The structure of the ask is what makes it land, it is specific (sit with me), it is bounded (ten minutes), it removes the burden of fixing (without saying anything), and it does not reach for certainty. Mia could deploy this on a tired Friday because the ask did not require her to choose between fold and hold; the ask told her what to do.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The hand-on-leg-without-squeeze is the calibrated touch. Squeezes signal 'I am holding you up.' Strokes signal 'I am soothing you.' The flat hand signals 'I am here.' The flat hand is the right deliverable for the witness ask, it is presence without intervention, which is what the body needs.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-witness-end",
        text: "End scene.",
        tactic: "The explicit-witness ending.",
        nextSceneId: "ending-witness",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ISOLATE PATH (avoidance of asking)
  // ===================================================================
  {
    id: "isolate-1",
    backgroundId: "apartment",
    mood: "tense",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "I'm fine. Let me just shower.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Mia's face changes microscopically. She has read the sentence as not-fine, and the not-fine-with-no-ask is a particular shape she has experienced from you before that she has come to find harder than the ask-and-fold dynamic would be.",
      },
      {
        speakerId: "mia",
        text: "Okay. Let me know if you need anything.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She picks up the book again. She is not actually reading. You walk to the bathroom. You shower. The shower is the place you can spiral without anyone watching, which is exactly the appeal and exactly the cost.",
      },
      {
        speakerId: null,
        text: "By the time you are out of the shower, the body is at a 7, higher than when you went in. The shower amplified it because there was no external regulating presence. You dress for dinner. You walk back into the kitchen. Mia is doing dishes. The dinner-tension is now in BOTH of you, because she has spent eleven minutes alone with the awareness that you are not fine and she has been refused entry.",
      },
      {
        speakerId: null,
        text: "The dinner is uncomfortable. Aisha and her partner are warm. You smile in the right places. By 11 p.m. your body has dropped from a 7 to a 5, mostly because the dinner is mundane enough that the spiral content runs out of fuel. Mia is quieter than usual. She does not bring up your refusal until the next morning.",
      },
      {
        speakerId: "inner-voice",
        text: "The avoidance-of-asking is its own anxiety move and across months it is one of the most damaging shapes in partnered anxiety. The body that hides the spiral from the partner has decided that the partner cannot handle it OR that asking is itself a failure-of-self. Both readings are the disorder talking. The substitution is one of the two skill paths, the explicit-witness ask or the name-the-state ask. Both are easier to say than they sound. Both produce dramatically better outcomes than isolation.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The other cost of isolation is on Mia's side. The partner of an anxious person who has been refused entry tonight does not just experience the dinner-uncomfortable; they experience the LOSS-OF-AGENCY of being kept out of a moment they were equipped to be present for. Across months, this is the form of partnered anxiety that erodes the partner's intuitive right-relating. Mia's intuitive skill could survive 200 ask-and-fold transactions. It cannot survive 50 isolation transactions, because each one teaches her that her presence is not wanted, which is the conditioning that closes the door.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-isolate-end",
        text: "End scene.",
        tactic: "The isolation ending.",
        nextSceneId: "ending-isolate",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // NAME-STATE PATH (skill, cleanest single ask)
  // ===================================================================
  {
    id: "name-state-1",
    backgroundId: "apartment",
    mood: "mysterious",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "I'm spiralling about dinner. I don't need anything from you. I just want you to know it's loud right now.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Mia's face produces the small approval-shape that you have learned, over two years, to recognise. You have asked the right thing, or, more accurately, you have NOT asked, which is the right thing.",
      },
      {
        speakerId: "mia",
        text: "Okay. Thanks for telling me. I'm just going to make tea. Want one.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "Yeah. Mint.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She gets up. She walks to the kitchen. She fills the kettle. She does not look at you in the meaningful-eye-contact way that signals 'I am performing care.' She does not check on your state. She just makes tea. Same way she would have made tea if you had not said anything. The tea-making is the deliverable.",
      },
      {
        speakerId: null,
        text: "You stay at the counter. You finish moving the clean objects from the sink to the drying rack. The motion is now a different motion than it was four minutes ago, the secret is no longer secret; you are just doing dishes.",
      },
      {
        speakerId: null,
        text: "Mia hands you the mint tea at 9:31 p.m. she does not say anything. The mug is warm. The smell of mint is bright and green, the way it was that day in L1-2 when Maya was making it at the kitchenette. You both drink the tea. By 9:42 your body is at a 3. By 9:48 you are putting on your shoes.",
      },
      {
        speakerId: null,
        text: "On the walk to Aisha's, Mia takes your hand. The hand-hold is not a special hand-hold for the moment. It is the regular hand-hold. The walk takes ten minutes. By the time you arrive at Aisha's building, the body is at a 2. Dinner is fine.",
      },
      {
        speakerId: "inner-voice",
        text: "The name-the-state-ask-for-nothing-specific move is, in clinical estimation, the cleanest single ask available in partnered anxiety, and it is significantly under-taught. The mechanism: the request is not for content from the partner; it is for AWARENESS in the partner of your current state. Naming the state to the witness compounds metabolisation across two bodies. Same mechanism as the L1-2 'three sentences to Mia' move, deployed in real-time at the moment of activation rather than the morning after.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The 'do you want tea' offer is what right-relating looks like at calibrated low-burden. Mia did not ask 'what do you need.' She did not ask 'are you okay.' She offered something specific that you could yes/no, in the shape of an ordinary couple-routine. The tea is the tea. The tea is also the deliverable. Across years of right-relating, the ordinary ritual deliverables, the tea, the hand on the leg, the regular hand-hold on the walk, are what carries the work. The dramatic interventions are not what sustains the relationship. The ordinary ones are.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-name-state-end",
        text: "End scene.",
        tactic: "The name-state ending.",
        nextSceneId: "ending-name-state",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // CANCEL PATH (avoidance)
  // ===================================================================
  {
    id: "cancel-1",
    backgroundId: "apartment",
    mood: "danger",
    presentCharacterIds: ["mia"],
    dialog: [
      {
        speakerId: "sam",
        text: "Hey. I'm not feeling great, can we tell Aisha we'll do it next week.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Mia's face does a thing that is small and she does not let consolidate. She is choosing not to let you read the disappointment. She is also a person who has been looking forward to the dinner. Aisha is her closest non-romantic friend, the four of you have not all been in the same room since September, and she has had her own bad week and was looking forward to a meal with people she likes.",
      },
      {
        speakerId: "mia",
        text: "Yeah, of course. I'll text her. We'll do it next week.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "She picks up her phone. She types. She sets the phone down. The body's tension drops 60% within ninety seconds. Same dynamic as L3-1's leave-the-store move. The relief is real and the relief is psychoactive.",
      },
      {
        speakerId: null,
        text: "The cost lands tomorrow morning. Your body now associates restaurants with pre-panic tension. Next Friday, when the rescheduled dinner is on the calendar, the anticipatory anxiety will fire at a higher baseline than tonight's. By the third reschedule the conditioning has compounded enough that the body's default response to dinner-out is dread.",
      },
      {
        speakerId: null,
        text: "Mia's cost is harder to see and lands across months. Her experience tonight is that her dinner with friends got cancelled because of your anxiety. She is not blaming you. She is, separately, registering this as the third dinner-out cancelled in three months. Across eight more cancellations across the year, the ratio of 'social plans we make' to 'social plans we keep' will tip below 0.5, which is the structural shape that ends most partnered social lives.",
      },
      {
        speakerId: "inner-voice",
        text: "Cancellation as anxiety-management is the most invisible form of avoidance in partnered relationships. Each individual cancellation feels reasonable. The cumulative shape. Across months, is the social-life version of the L3-2 morning-after-panic Instacart trap. Same mechanism. Different content slot.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair is the L3-2 protocol, exposure to the avoided category (restaurants), with structured graded plans. Lin will likely propose, in next Wednesday's session, going to dinner with Mia AT a restaurant before the rescheduled Aisha dinner, first time, off-peak hour, low-stakes location, with the explicit goal of NOT cancelling. The exposure work is hard. It is also the only way the conditioning extinguishes.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-cancel-end",
        text: "End scene.",
        tactic: "The cancel ending.",
        nextSceneId: "ending-cancel",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-mia-holds",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "She Held the Line",
    endingLearnPrompt:
      "You asked for the four-word reassurance. Mia, on a tired Friday with her own load on her shoulders, chose the hold over the fold. She loved you. She did not lie to you. She offered her presence at dinner instead of certainty about the outcome of dinner. The body's first response was the small wounded thing, she did not give it to you. The body's second response was something quieter that recognised the move as care. Across years, the hold-versus-fold ratio is what determines whether the relationship sustains the disorder or bends under it. Couples in which the partner folds reliably end up with one body becoming the other's regulator. Couples in which the partner holds produce two bodies that both stay grounded across decades.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "What you saw in the 90-second POV flip is what right-relating costs from the partner side. The hold is more expensive in the next ninety seconds than the fold. The fold is more expensive across the next year. Mia's intuitive skill, built over two years of accidental practice, is to choose the long-term cost over the short-term one even on tired evenings. This is the relational shape that lets a partnered anxiety arc reach the L5-1 wedding ending in a healthy state, instead of in the brittle late-stage shape of one body managing both nervous systems.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-witness",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "Eight Minutes of Hand on Leg",
    endingLearnPrompt:
      "You asked for the explicit witness, sit with me for ten minutes without saying anything. Mia exhaled, sat next to you, put one hand on your leg, did not speak. Eight minutes. The body de-escalated in the way that bodies de-escalate when held by a presence that is not asking anything. Dinner was fine. The flat-hand-without-squeeze is the calibrated touch, squeezes signal 'I am holding you up,' strokes signal 'I am soothing you,' the flat hand signals 'I am here.' The structured ask removes the burden of fixing from your partner, which is what makes the ask deployable on tired evenings.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The explicit-witness ask is significantly under-used because most anxious bodies have never been taught that 'sit with me without saying anything' is a real available request. Most bodies reach for either reassurance (fold-or-hold dynamic) or isolation (door closes), neither of which produces what the witness ask produces. The structure of the ask is what makes it land, specific, bounded, low-burden, no certainty-reach. Worth teaching to every partnered anxious patient in CBT.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-isolate",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "The Closed Door",
    endingLearnPrompt:
      "You went to the shower. The shower was the place you could spiral without anyone watching, which was exactly the appeal and exactly the cost. By the time you got out the body was at a 7, higher than when you went in, because there was no external regulating presence. Mia spent eleven minutes alone with the awareness that you were not fine and that she had been refused entry. The dinner was uncomfortable for both of you. Mia did not bring up the refusal until the next morning. The avoidance-of-asking is one of the most damaging shapes in partnered anxiety because it teaches the partner that their presence is not wanted, which is the conditioning that, across 50 isolation transactions, closes the door her intuitive right-relating has been holding open for two years.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Isolation is the disorder's most sophisticated maintenance shape in partnered relationships, because it looks like consideration ('I don't want to burden her with this'). It is structurally a refusal of the witness. The body that has been refused the witness becomes a body that loses the muscle of being witnessed, which is the muscle that lets partnered recovery exist at all. The substitution is one of the two skill paths. Both are easier to say than they sound. Both produce dramatically better outcomes than the closed bathroom door.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-name-state",
    backgroundId: "apartment",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Mint Tea",
    endingLearnPrompt:
      "You named the state and asked for nothing specific. 'I'm spiralling about dinner. I don't need anything from you. I just want you to know it's loud right now.' Mia made mint tea. The tea was the tea. The tea was also the deliverable. By 9:42 the body was at a 3. The walk to Aisha's was a regular walk. The dinner was fine. The cleanest single ask available in partnered anxiety is the one that does not ask for content from the partner, just for AWARENESS in the partner of your current state. The ordinary ritual deliverables, tea, hand-on-leg, regular hand-hold, are what carries the work across years. The dramatic interventions are not what sustains the relationship; the ordinary ones are.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Naming-the-state-asking-for-nothing is structurally similar to the L1-2 three-sentences-to-Mia move, deployed at the moment of activation rather than the morning after. The mechanism is the same, metabolisation across two bodies via witness but the in-the-moment version produces a real-time de-escalation that the next-morning version does not. Most clinically anxious people in long relationships under-deploy the in-the-moment version, partly because they have been taught (by culture, not by clinicians) that asking for witness during activation is itself a burden. The opposite is the case. The naming is what protects the partner FROM the burden of guessing.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-cancel",
    backgroundId: "apartment",
    mood: "danger",
    isEnding: true,
    outcomeType: "bad",
    endingTitle: "We'll Do It Next Week",
    endingLearnPrompt:
      "You cancelled. The body's tension dropped 60% in 90 seconds. The relief was real and the relief was psychoactive. The cost lands tomorrow, your body now associates restaurants with pre-panic tension. Next Friday's anticipatory anxiety will fire at a higher baseline than tonight's. By the third reschedule the conditioning has compounded into restaurant-equals-dread. Mia's cost is harder to see and lands across months, the third dinner-out cancelled in three months. Across the year the social-plans-kept ratio drops below 0.5, which is the structural shape that ends most partnered social lives. Same mechanism as L3-1 leave-the-store and L3-2 stay-home-Monday. Different content slot.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Cancellation as anxiety-management is the most invisible form of avoidance in partnered relationships. Each individual cancellation feels reasonable; the cumulative shape across months is the social-life version of the L3-2 Instacart trap. The repair is the L3-2 protocol, graded exposure with structured plans. Lin will likely propose dinner-at-a-restaurant before the rescheduled Aisha dinner. The exposure work is hard. It is also the only way the conditioning extinguishes.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety42: Scenario = {
  id: "anx-4-2",
  title: "The Witnessed Spiral",
  tagline: "Friday, 9:18 p.m. dinner at Aisha's at 10. The shape of the ask matters more than the relationship.",
  description:
    "The relational core of the arc. Sam at home Friday evening with Mia, body building a low-grade spiral about the dinner at Aisha's at 10 p.m. Mia notices. Mia is also tired tonight, missed deadline, frustrating call with her mother, has not eaten. Five available asks: ask for reassurance (with the only POV flip in the arc, 90 seconds inside Mia's body as she chooses between fold and hold); ask for explicit witness (sit-with-me-without-saying-anything, structured low-burden); isolate via shower (avoidance of asking, closes the door her intuitive right-relating has been holding); name the state and ask for nothing (the cleanest single ask, mint-tea outcome); cancel the dinner (avoidance, conditions restaurants with dread, third reschedule of three). Five endings.",
  tier: "premium",
  track: "anxiety",
  level: 4,
  order: 2,
  estimatedMinutes: 15,
  difficulty: "advanced",
  category: "narcissist",
  xpReward: 460,
  badgeId: "the-hold",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Witness-without-certainty-granting as the relational version of the GIVE move applied to anxiety, validate the feeling, refuse to lie about the outcome, offer presence as the deliverable",
    "The hold versus the fold. Across years, the ratio determines whether the relationship sustains the disorder or bends under it",
    "Explicit witness ask, 'sit with me for ten minutes without saying anything' as a structured low-burden request that survives tired evenings",
    "Name-the-state-ask-for-nothing-specific as the cleanest single ask, does not ask for content, asks for awareness; produces real-time de-escalation via metabolisation across two bodies",
    "The flat-hand-without-squeeze as the calibrated touch during witness, presence without intervention",
    "The 'do you want tea' calibrated offer, yes/no questions in the shape of ordinary couple-routine, which is what carries the work across years",
  ],
  redFlagsTaught: [
    "Reassurance-seeking that pushes the partner into the fold, short-term ninety-second relief, long-term cost as the partner's body becomes the regulator the partnered body reaches for at the moment it should reach for its own skill",
    "Isolation via shower / closed bathroom door, the most damaging long-term shape, teaches partner that her presence is not wanted, closes the door across 50 transactions",
    "Cancellation as anxiety-management, invisible avoidance, individual cancellations feel reasonable, cumulative shape across months ends partnered social lives",
  ],
  characters: [INNER_VOICE, SAM, MIA],
  scenes,
};

export default anxiety42;
