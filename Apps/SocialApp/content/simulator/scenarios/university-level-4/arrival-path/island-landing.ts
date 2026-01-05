import type { ForkScene } from '../../../types';

/**
 * Mission 17: Island Landing
 * First impressions of the private island
 */
export const landingScenes: ForkScene[] = [
  {
    id: 'landing-approach',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    chapter: { name: 'The Island', index: 5, total: 6 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'The island appears through the clouds. Smaller than expected. More fortress than paradise.',
      },
      {
        text: 'A main house dominates the center. White stone. Floor-to-ceiling glass. Modern brutalism.',
      },
      {
        text: 'Scattered around it: guest houses, paths disappearing into manicured wilderness.',
      },
      {
        text: '"Beautiful, isn\'t it?" Isabelle watches you watching.',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: '"It\'s designed to be. Every sight line. Every path. Calculated."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: 'Even the landscape is a power play.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'landing-touchdown',
  },
  {
    id: 'landing-touchdown',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'The jet touches down on a private runway. Smooth as glass.',
      },
      {
        text: 'Staff in white uniforms wait at the bottom of the stairs. Silent. Efficient.',
      },
      {
        text: 'A woman in a tailored suit steps forward. Late forties. Sharp eyes.',
      },
      {
        text: '"Welcome to Whitmore Island. I\'m Diana. I\'ll be coordinating your stay."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: '"Mr. Cole sends his apologies. He\'ll greet you personally at dinner."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Personally. After making us wait.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'landing-path-split',
  },
  {
    id: 'landing-path-split',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'Golf carts wait on a white gravel path. Dominic and Isabelle claim the first one.',
      },
      {
        text: '"Tyler, you\'re in the East Wing with us." Diana\'s voice is precise.',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Tyler nods. His nervousness has hardened into resignation.',
      },
      {
        text: '"And you two—" Diana consults her tablet. "Guest House Three. The Grove."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Blake leans close. "Is that good or bad?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'It\'s placement. Every detail here means something.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'placement-trap',
        text: '"Why the Grove? Is that where new guests stay?"',
        nextSceneId: 'landing-diana-curt',
        isOptimal: false,
        tactic: 'direct-question',
        reaction: {
          text: '"Guest assignments are Mr. Cole\'s decision." She turns away.',
          emotion: 'cold',
          bodyLanguage: 'Too direct. She shut you down.',
          scoreImpact: -5,
        },
      },
      {
        id: 'placement-subtle',
        text: '"The Grove sounds peaceful."',
        nextSceneId: 'landing-diana-neutral',
        isOptimal: false,
        tactic: 'acceptance',
        reaction: {
          text: '"It is." No additional information offered.',
          emotion: 'neutral',
          bodyLanguage: 'Neutral response. Safe but unrevealing.',
          scoreImpact: 5,
        },
      },
      {
        id: 'placement-close',
        text: '"I noticed Isabelle is in the East Wing. Are we meant to be separate?"',
        nextSceneId: 'landing-diana-interested',
        isOptimal: false,
        tactic: 'observation',
        reaction: {
          text: 'Diana pauses. "You notice details. Mr. Cole mentioned that."',
          emotion: 'curious',
          bodyLanguage: 'She confirmed Harrison is watching.',
          scoreImpact: 15,
        },
      },
      {
        id: 'placement-optimal',
        text: '"Thank you, Diana. I\'m sure our placement reflects exactly what Mr. Cole intended."',
        nextSceneId: 'landing-diana-approving',
        isOptimal: true,
        tactic: 'acknowledgment',
        reaction: {
          text: 'A flicker of approval. "Exactly what he intended. Yes."',
          emotion: 'knowing',
          bodyLanguage: 'You showed you understand the game. She noted it.',
          scoreImpact: 20,
        },
      },
    ],
  },
  {
    id: 'landing-diana-curt',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: 'Diana gestures toward the cart. Conversation over.',
      },
      {
        text: '"Your driver will take you to the Grove. Dinner is at seven."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Blake glances at you. "Off to a great start."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'First impression: too eager. Noted.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'grove-arrival',
  },
  {
    id: 'landing-diana-neutral',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: 'Diana nods. "Your driver will take you. Dinner is at seven."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: 'Blake follows you to the cart. "Well, that was informative."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Neutral is safe. But safe doesn\'t reveal anything.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'grove-arrival',
  },
  {
    id: 'landing-diana-interested',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Mr. Cole mentioned it." Diana repeats. Testing you.',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: '"He finds pattern-recognition... valuable."',
        speakerId: 'diana',
        emotion: 'knowing',
      },
      {
        text: 'Blake\'s eyebrows rise. "You have a fan."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Or a collector. Hard to tell with these people.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'grove-arrival',
  },
  {
    id: 'landing-diana-approving',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Exactly what he intended." Diana almost smiles. Almost.',
        speakerId: 'diana',
        emotion: 'knowing',
      },
      {
        text: '"Dinner is at seven. The Grove has its own path to the main house."',
        speakerId: 'diana',
        emotion: 'neutral',
      },
      {
        text: '"I\'ll send someone to escort you. Or not. Your choice."',
        speakerId: 'diana',
        emotion: 'smirking',
      },
      {
        text: 'Another test. They never stop.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'grove-arrival',
  },
  {
    id: 'grove-arrival',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The Grove. A guest house wrapped in old-growth trees. Privacy made physical.',
      },
      {
        text: 'Two bedrooms. A shared living space. Floor-to-ceiling windows facing the forest.',
      },
      {
        text: 'Blake drops onto the couch. "This is nicer than my apartment. By a lot."',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"Look at this view. You can\'t see any other buildings."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'Isolated. Beautiful, yes. But isolated.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'grove-exploration',
  },
  {
    id: 'grove-exploration',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: 'You explore the space. Every detail considered. Every comfort anticipated.',
      },
      {
        text: 'A welcome basket: champagne, fruits, a handwritten note.',
      },
      {
        text: '"Welcome to the network. Enjoy the Grove. Tonight, we begin. - H.C."',
      },
      {
        text: 'Blake reads over your shoulder. "We begin? That\'s not ominous at all."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'They want us comfortable. Relaxed. Off guard.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'grove-blake-talk',
  },
  {
    id: 'grove-blake-talk',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'tense',
    dialog: [
      {
        text: 'Blake sits on the edge of his bed. The excitement draining.',
      },
      {
        text: '"What are we actually doing here? Those people on the plane..."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"Dominic looked at us like we were... specimens. Isabelle kept testing us."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: '"And that Tyler kid—Elena\'s brother?—he looked terrified."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s finally seeing it clearly.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    dialogueChoices: [
      {
        id: 'blake-talk-trap',
        text: '"It\'s just rich people games. We\'ll be fine."',
        nextSceneId: 'grove-blake-dismissive',
        isOptimal: false,
        tactic: 'minimizing',
        reaction: {
          text: '"Fine." He looks at you. "You don\'t believe that."',
          emotion: 'knowing',
          bodyLanguage: 'He saw through the reassurance. Lost a little trust.',
          scoreImpact: -10,
        },
      },
      {
        id: 'blake-talk-subtle',
        text: '"It\'s a networking event. With higher stakes than usual."',
        nextSceneId: 'grove-blake-uncertain',
        isOptimal: false,
        tactic: 'neutral',
        reaction: {
          text: '"Higher stakes." He sighs. "That\'s one way to put it."',
          emotion: 'neutral',
          bodyLanguage: 'Accurate but not helpful.',
          scoreImpact: 5,
        },
      },
      {
        id: 'blake-talk-close',
        text: '"We stick together. Watch each other\'s backs. That\'s how we survive."',
        nextSceneId: 'grove-blake-hopeful',
        isOptimal: false,
        tactic: 'alliance',
        reaction: {
          text: 'He nods. "Together. Yeah. I can do that."',
          emotion: 'hopeful',
          bodyLanguage: 'Loyalty affirmed. He needed that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'blake-talk-optimal',
        text: '"They\'re evaluating us. But we can evaluate them too. That\'s our advantage."',
        nextSceneId: 'grove-blake-empowered',
        isOptimal: true,
        tactic: 'reframing',
        reaction: {
          text: 'His eyes sharpen. "We watch them while they watch us."',
          emotion: 'knowing',
          bodyLanguage: 'You transformed anxiety into strategy. He\'s focused now.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'grove-blake-dismissive',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: 'Blake shakes his head. "You\'re doing that thing. The confidence mask."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I know you too well for that."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'He gets up. Starts unpacking. Quiet now.',
      },
      {
        text: 'Distance. Small but real.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'grove-preparing',
  },
  {
    id: 'grove-blake-uncertain',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Higher stakes.\" Blake starts unpacking. Methodical.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"I guess that\'s what I signed up for. When I agreed to come."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'He\'s processing. Give him time.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'grove-preparing',
  },
  {
    id: 'grove-blake-hopeful',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Together." Blake offers a small smile.',
        speakerId: 'blake',
        emotion: 'happy',
      },
      {
        text: '"I\'m glad you brought me. Even if this is terrifying."',
        speakerId: 'blake',
        emotion: 'hopeful',
      },
      {
        text: '"Let\'s get ready for dinner. Face them as a team."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'Loyalty affirmed. For now.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'grove-preparing',
  },
  {
    id: 'grove-blake-empowered',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    dialog: [
      {
        text: '"Watch them while they watch us." Blake grins.',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: '"I like that. Makes me feel less like prey."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"Okay. Let\'s prep for dinner. What do we know so far?"',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'He\'s engaged. Focused. This is the Blake who can survive.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'grove-preparing',
  },
  {
    id: 'grove-preparing',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'arrival',
    mood: 'professional',
    dialog: [
      {
        text: 'Evening approaches. You dress for dinner. Formal but not overdone.',
      },
      {
        text: 'Blake adjusts his collar in the mirror. "How do I look?"',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Like someone who belongs here."',
      },
      {
        text: 'He laughs. "Fake it till you make it, right?"',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: 'A knock at the door. Time to begin.',
      },
      {
        text: 'This is it. The real game starts now.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'room-escort',
  },
];
