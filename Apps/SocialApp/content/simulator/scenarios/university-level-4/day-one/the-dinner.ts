import type { ForkScene } from '../../../types';

/**
 * Mission 18: The Dinner
 * First group dinner - power dynamics revealed
 */
export const dinnerScenes: ForkScene[] = [
  {
    id: 'day-one-dinner-intro',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    chapter: { name: 'Day One', index: 1, total: 4 },
    mood: 'professional',
    dialog: [
      {
        text: 'The dining room. A long table under a crystal chandelier. Twelve seats.',
      },
      {
        text: 'You count faces. Dominic. Isabelle. Victoria. Tyler. Others you don\'t recognize.',
      },
      {
        text: 'And at the head of the table: an empty chair. Harrison\'s throne.',
      },
      {
        text: 'Blake whispers. "Where do we sit?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Seating is politics. Every choice sends a signal.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'seating-trap',
        text: 'Take the seats closest to the door. Easy exit.',
        nextSceneId: 'dinner-edge-seats',
        isOptimal: false,
        tactic: 'escape-route',
        reaction: {
          text: 'Isabelle notices. Smirks. "Sitting near the exit. Practical."',
          emotion: 'smirking',
          bodyLanguage: 'You signaled uncertainty. They all noticed.',
          scoreImpact: -10,
        },
      },
      {
        id: 'seating-subtle',
        text: 'Take the middle seats. Blend in.',
        nextSceneId: 'dinner-middle-seats',
        isOptimal: false,
        tactic: 'neutral',
        reaction: {
          text: 'Safe. Unremarkable. No one pays special attention.',
          emotion: 'neutral',
          bodyLanguage: 'You didn\'t stand out. Sometimes that\'s the goal.',
          scoreImpact: 5,
        },
      },
      {
        id: 'seating-close',
        text: 'Take seats across from Isabelle. She\'s an ally—maybe.',
        nextSceneId: 'dinner-isabelle-seats',
        isOptimal: false,
        tactic: 'alliance-signaling',
        reaction: {
          text: 'Isabelle nods slightly. "Bold choice. I like it."',
          emotion: 'knowing',
          bodyLanguage: 'You aligned with a faction. Publicly.',
          scoreImpact: 15,
        },
      },
      {
        id: 'seating-optimal',
        text: 'Wait. Let others sit first. Take whatever\'s left with confidence.',
        nextSceneId: 'dinner-strategic-wait',
        isOptimal: true,
        tactic: 'observation',
        reaction: {
          text: 'You watch the dance. Learn the hierarchies. Then sit where it matters.',
          emotion: 'knowing',
          bodyLanguage: 'You gathered information before committing. Smart.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'dinner-edge-seats',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'You take the seats near the door. Blake relaxes slightly.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Good call. Just in case."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'Dominic glances at you. Dismisses you immediately. Prey instinct.',
      },
      {
        text: 'We showed our hand. Flight response visible.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-harrison-arrives',
  },
  {
    id: 'dinner-middle-seats',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'Middle seats. Anonymous. You blend into the crowd of power.',
      },
      {
        text: 'Blake settles beside you. "This feels... manageable."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: 'The others fill in around you. No special attention.',
      },
      {
        text: 'Invisible has its advantages. Also its limitations.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-harrison-arrives',
  },
  {
    id: 'dinner-isabelle-seats',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'You take the seats across from Isabelle. Her eyes glitter.',
      },
      {
        text: '"Interesting alignment." She murmurs.',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'Victoria notices. Her expression hardens.',
      },
      {
        text: 'Blake shifts uncomfortably. "Did we just pick a side?"',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'We signaled a preference. Now we own it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-harrison-arrives',
  },
  {
    id: 'dinner-strategic-wait',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'You wait. Watch. The seating reveals itself.',
      },
      {
        text: 'Victoria claims the right side of Harrison\'s chair. Power adjacent.',
      },
      {
        text: 'Dominic takes the opposite end. Counterweight.',
      },
      {
        text: 'Two seats remain. One near Isabelle. One near Tyler.',
      },
      {
        text: 'You take the Isabelle seat. Blake takes Tyler. Split positioning.',
      },
      {
        text: 'Maximum information. Minimum commitment.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-harrison-arrives',
  },
  {
    id: 'dinner-harrison-arrives',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'tense',
    dialog: [
      {
        text: 'Silence falls. Harrison Cole enters.',
      },
      {
        text: 'Tall. Silver hair. Eyes that miss nothing. The Architect in person.',
      },
      {
        text: 'He moves like he owns everything. Because he does.',
      },
      {
        text: '"Good evening." His voice fills the room without effort.',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"I see we have some new faces. Welcome to the network."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'His eyes find you. Hold. Move on.',
      },
      {
        text: 'Catalogued. Measured. Filed.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-harrison-speech',
  },
  {
    id: 'dinner-harrison-speech',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'professional',
    dialog: [
      {
        text: '"The Whitmore Foundation exists for one purpose." Harrison stands at the head.',
        speakerId: 'harrison',
        emotion: 'serious',
      },
      {
        text: '"Connection. Not the shallow kind. The kind that builds empires."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: '"Everyone at this table is here because they have something. Value. Potential."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"The question this weekend answers: what kind?"',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'Blake shifts beside you. Tyler has gone pale.',
      },
      {
        text: 'Evaluation begins now. Everything counts.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'dinner-first-course',
  },
  {
    id: 'dinner-first-course',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'professional',
    dialog: [
      {
        text: 'First course arrives. Staff moving like ghosts. Precise.',
      },
      {
        text: 'Conversation fragments around the table. Calculated exchanges.',
      },
      {
        text: 'Victoria to Harrison: "The Ashworth Foundation is considering the merger."',
        speakerId: 'victoria',
        emotion: 'neutral',
      },
      {
        text: 'Dominic to no one in particular: "Q3 projections exceeded. As predicted."',
        speakerId: 'dominic',
        emotion: 'cold',
      },
      {
        text: 'Power displays. They\'re performing for Harrison.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-elena-appears',
  },
  {
    id: 'dinner-elena-appears',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'mysterious',
    dialog: [
      {
        text: 'A late arrival. The doors open again.',
      },
      {
        text: 'Elena Vance. Information broker. Tyler\'s sister.',
      },
      {
        text: '"Apologies, Harrison. Affairs in Singapore ran late."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: '"Singapore." Harrison nods. "Of course. Join us."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: 'Elena takes the seat beside Tyler. Whispers something. He tenses.',
      },
      {
        text: 'She knows something. About us? About this weekend?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-elena-attention',
  },
  {
    id: 'dinner-elena-attention',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'Elena\'s eyes find you across the table. Recognition. Calculation.',
      },
      {
        text: '"The one who impressed Maris." She says it loud enough for Harrison to hear.',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"I\'ve heard interesting things. Very interesting."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'Harrison watches the exchange. Measuring both of you.',
      },
      {
        text: 'She just put a spotlight on us. Intentionally.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'elena-trap',
        text: '"I hope the interesting things were good."',
        nextSceneId: 'dinner-elena-dismissive',
        isOptimal: false,
        tactic: 'deflection',
        reaction: {
          text: '"Good. Bad. Those are such... limiting categories."',
          emotion: 'smirking',
          bodyLanguage: 'Weak response. She expected more.',
          scoreImpact: -5,
        },
      },
      {
        id: 'elena-subtle',
        text: '"Information travels fast in your circles."',
        nextSceneId: 'dinner-elena-neutral',
        isOptimal: false,
        tactic: 'observation',
        reaction: {
          text: '"Information IS my circle." She raises her glass.',
          emotion: 'knowing',
          bodyLanguage: 'Acknowledgment. Neither gained nor lost ground.',
          scoreImpact: 5,
        },
      },
      {
        id: 'elena-close',
        text: '"Maris has excellent taste. In information and in people."',
        nextSceneId: 'dinner-elena-interested',
        isOptimal: false,
        tactic: 'flattery-redirect',
        reaction: {
          text: 'Her eyes narrow. "Careful. That could be taken many ways."',
          emotion: 'curious',
          bodyLanguage: 'You created ambiguity. She respects that.',
          scoreImpact: 15,
        },
      },
      {
        id: 'elena-optimal',
        text: '"I\'m sure you\'ve already verified whatever you heard. You don\'t trade in rumors."',
        nextSceneId: 'dinner-elena-impressed',
        isOptimal: true,
        tactic: 'recognition',
        reaction: {
          text: 'A genuine smile. "You understand how I work. Promising."',
          emotion: 'happy',
          bodyLanguage: 'You showed you know her reputation. She valued that.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'dinner-elena-dismissive',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Limiting categories." Elena turns back to Tyler.',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'The conversation moves on. You missed an opportunity.',
      },
      {
        text: 'Blake sighs quietly. "That could have gone better."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'She expected a sharper response. We disappointed.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-maris-entrance',
  },
  {
    id: 'dinner-elena-neutral',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"My circle." Elena sips her wine. "You\'ll learn more about it this weekend."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'A promise. Or a threat. Hard to tell with her.',
      },
      {
        text: 'The conversation flows around the table. You\'ve been noted.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'dinner-maris-entrance',
  },
  {
    id: 'dinner-elena-interested',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Many ways." Elena leans back. Considering.',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"I like ambiguity. Most people are too obvious."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: '"Find me after dinner. I have... information you might want."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'An invitation. To what game, though?',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-maris-entrance',
  },
  {
    id: 'dinner-elena-impressed',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Promising." Elena sets down her glass.',
        speakerId: 'elena',
        emotion: 'happy',
      },
      {
        text: '"I verified everything. And I have updates. Fresh from Singapore."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Find me tonight. Third terrace. Midnight."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'Harrison watches. Says nothing. Approves.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-maris-entrance',
  },
  {
    id: 'dinner-maris-entrance',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'tense',
    dialog: [
      {
        text: 'Another arrival. The last empty chair.',
      },
      {
        text: 'Maris Caldwell. She\'s different here. Darker dress. Sharper edges.',
      },
      {
        text: '"Traffic from the mainland." She doesn\'t apologize.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"Maris." Harrison gestures to the seat beside him. "We were just discussing potential."',
        speakerId: 'harrison',
        emotion: 'smirking',
      },
      {
        text: 'She sits. Her eyes find you. Something flickers. Recognition. Warning.',
      },
      {
        text: 'She\'s different here. This is her true environment.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'dinner-maris-acknowledgment',
  },
  {
    id: 'dinner-maris-acknowledgment',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"I see my recommendation arrived safely." Maris addresses Harrison but watches you.',
        speakerId: 'maris',
        emotion: 'neutral',
      },
      {
        text: '"They did." Harrison\'s tone is neutral. "We\'re still evaluating."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: '"Evaluation is why we\'re all here." Maris takes her wine. "Isn\'t it, Victoria?"',
        speakerId: 'maris',
        emotion: 'smirking',
      },
      {
        text: 'Victoria\'s jaw tightens. Old rivalry, exposed.',
      },
      {
        text: 'Maris just drew a line. We\'re on her side now—or we\'re nowhere.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-dessert-politics',
  },
  {
    id: 'dinner-dessert-politics',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'professional',
    dialog: [
      {
        text: 'Dessert arrives. The conversation fragments into smaller wars.',
      },
      {
        text: 'Dominic lectures about algorithms. Victoria counters with tradition.',
      },
      {
        text: 'Isabelle watches everyone. Taking notes.',
      },
      {
        text: 'Blake leans close. "I think I understand this place now."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Everyone\'s performing. For Harrison. For each other."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: 'And we need to decide who we perform for.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'dinner-harrison-test',
  },
  {
    id: 'dinner-harrison-test',
    backgroundId: 'restaurant',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'tense',
    dialog: [
      {
        text: 'Harrison stands. The table falls silent.',
      },
      {
        text: '"Tomorrow begins the real work. Tonight, rest. Explore."',
        speakerId: 'harrison',
        emotion: 'neutral',
      },
      {
        text: '"The island reveals things. About the land. About yourselves."',
        speakerId: 'harrison',
        emotion: 'knowing',
      },
      {
        text: 'His eyes sweep the table. Land on you.',
      },
      {
        text: '"I\'ll be watching."',
        speakerId: 'harrison',
        emotion: 'cold',
      },
      {
        text: 'He exits. The spell breaks. Conversations resume.',
      },
      {
        text: 'The real evaluation starts now. Every conversation, every choice.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'after-party-intro',
  },
];
