// Part 1: Week One
// Scenes 1-6: First impressions, mapping, initial reads

import type { Scene } from '../../../types';

export const weekOneScenes: Scene[] = [
  // Scene 1: Day One - Arrival
  {
    id: 'day-one-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: '8:47 AM. First day. New badge clipped to your shirt.',
      },
      {
        text: 'The elevator opens to a floor of faces you don\'t know. Some glance up. Some don\'t.',
      },
      {
        text: 'Every single one of them is already forming an opinion.',
        
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'day-one-2',
  },

  // Scene 2: Harper Greets You
  {
    id: 'day-one-2',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Harper approaches with a warm smile.',
      },
      {
        text: '"Welcome! Ready to meet the team?"',
        speakerId: 'harper',
        emotion: 'happy',
      },
      {
        text: 'Game starts now.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'day-one-2-a',
        text: '"Absolutely. Lead the way."',
        nextSceneId: 'team-meeting-1',
        xpBonus: 10,
        isOptimal: true,
        feedback: 'Confident and ready. Good first impression.',
      },
      {
        id: 'day-one-2-b',
        text: '"Can\'t wait to get started."',
        nextSceneId: 'team-meeting-1',
        xpBonus: 8,
        feedback: 'Enthusiastic. Slightly eager, but solid.',
      },
      {
        id: 'day-one-2-c',
        text: '"Sure, if you think I\'m ready."',
        nextSceneId: 'team-meeting-1',
        xpBonus: 3,
        feedback: 'Self-doubt in your first sentence. Not ideal.',
      },
    ],
  },

  // Scene 3: The Team Meeting
  {
    id: 'team-meeting-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'A conference room. Eight faces around the table. All eyes on you.',
      },
      {
        text: '"Everyone, this is our new hire. Why don\'t you tell us a bit about yourself?"',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'The introduction. Thirty seconds to set the first impression.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'team-meeting-1-a',
        text: 'Brief background, then: "I\'m excited to learn from all of you."',
        nextSceneId: 'team-meeting-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Balanced confidence with curiosity. Perfect calibration.',
      },
      {
        id: 'team-meeting-1-b',
        text: 'Solid overview of your credentials and what you bring.',
        nextSceneId: 'team-meeting-2',
        xpBonus: 10,
        feedback: 'Confident. Some peers look impressed. Others look threatened.',
      },
      {
        id: 'team-meeting-1-c',
        text: '"I\'m just here to learn and help where I can."',
        nextSceneId: 'team-meeting-2',
        xpBonus: 3,
        feedback: 'Too invisible. You\'ll be forgotten by lunch.',
      },
      {
        id: 'team-meeting-1-d',
        text: 'Full career history, passions, weekend hobbies...',
        nextSceneId: 'team-meeting-2',
        xpBonus: 0,
        feedback: 'TRAP: Eyes glazed at minute two. You lost the room.',
      },
    ],
  },

  // Scene 4: After the Meeting
  {
    id: 'team-meeting-2',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'The meeting ends. People filter out.',
      },
      {
        text: 'Devon catches your eye and walks over.',
      },
      {
        text: '"Hey. I\'ll give you the real tour. Not the HR version."',
        speakerId: 'devon',
        emotion: 'smirking',
      },
      {
        text: 'An offer to learn the actual landscape. This could be valuable.',
      },
    ],
    nextSceneId: 'tour-1',
  },

  // Scene 5: The Tour - Real Intel
  {
    id: 'tour-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Devon walks you through the floor, voice lowered.',
      },
      {
        text: '"That corner? Victor\'s team. They run the department. If Victor likes you, you\'re golden. If he doesn\'t... well."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'Devon pauses by the kitchen.',
      },
      {
        text: '"Grab coffee at 10:15. That\'s when the VPs take their break. Good for visibility."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'This is the real org chart. Pay attention.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'tour-1-a',
        text: 'Ask follow-up questions, take mental notes.',
        nextSceneId: 'tour-2',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: You\'re mapping the real power structure. Smart.',
      },
      {
        id: 'tour-1-b',
        text: '"Thanks, I\'ll figure it out as I go."',
        nextSceneId: 'tour-2',
        xpBonus: 3,
        feedback: 'You just ignored a goldmine of intel. Risky.',
      },
      {
        id: 'tour-1-c',
        text: '"Who should I avoid?"',
        nextSceneId: 'tour-2',
        xpBonus: 10,
        feedback: 'Direct question. Devon pauses, then smiles. "I like you."',
      },
    ],
  },

  // Scene 6: The Tour Continues
  {
    id: 'tour-2',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Devon points toward a corner office.',
      },
      {
        text: '"See that desk by the window? That was Riley\'s."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'Riley. Your predecessor.',
      },
      {
        text: '"They had your job before you. People still talk about them."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'Devon gives you a knowing look.',
      },
      {
        text: '"Just... be careful what you say about Riley. Everyone has opinions."',
        speakerId: 'devon',
        emotion: 'concerned',
      },
      {
        text: 'Whatever you say about your predecessor will define you. Remember that.',
      },
    ],
    nextSceneId: 'lunch-politics-1',
  },

  // Scene 7: Lunch Politics
  {
    id: 'lunch-politics-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Noon. The cafeteria. Where you sit matters more than what you eat.',
      },
      {
        text: 'You scan the room.',
      },
      {
        text: 'Table 1: Your immediate team. Safe. Expected.',
      },
      {
        text: 'Table 2: Devon and a few others. Friendly faces.',
      },
      {
        text: 'Table 3: Cameron—the one who wanted your job—waving you over with a smile.',
      },
      {
        text: 'Table 4: Empty. You could catch up on emails.',
      },
      {
        text: 'Eating alone on day one says "I don\'t need people." Eating with the wrong group says you\'ve picked a side.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'lunch-1-a',
        text: 'Sit with your team. Safe and expected.',
        nextSceneId: 'lunch-result-team',
        xpBonus: 8,
        feedback: 'Professional choice. No risks, no gains.',
      },
      {
        id: 'lunch-1-b',
        text: 'Join Devon\'s table. Build the ally relationship.',
        nextSceneId: 'lunch-result-devon',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Strengthening your intelligence network.',
      },
      {
        id: 'lunch-1-c',
        text: 'Accept Cameron\'s invitation. Keep potential threats close.',
        nextSceneId: 'lunch-result-cameron',
        xpBonus: 10,
        feedback: 'Strategic. Learn what Cameron\'s really about.',
      },
      {
        id: 'lunch-1-d',
        text: 'Eat alone. You have emails to catch up on.',
        nextSceneId: 'lunch-result-alone',
        xpBonus: 0,
        feedback: 'TRAP: Day one and you\'re already the loner. Bad signal.',
      },
    ],
  },

  // Scene 8a: Lunch - Team Result
  {
    id: 'lunch-result-team',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Pleasant lunch. Small talk. You learn everyone\'s kids\' names.',
      },
      {
        text: 'Safe. But you didn\'t learn anything useful about the politics.',
      },
    ],
    nextSceneId: 'one-on-one-1',
  },

  // Scene 8b: Lunch - Devon Result
  {
    id: 'lunch-result-devon',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Devon introduces you to the group. They\'re welcoming.',
      },
      {
        text: '"You\'re smart to listen to Devon,"',
        speakerId: 'devon',
        emotion: 'smirking',
      },
      {
        text: 'one of them says.',
      },
      {
        text: '"Half the new hires ignore the unwritten rules and wonder why they plateau."',
        speakerId: 'devon',
        emotion: 'neutral',
      },
      {
        text: 'You\'re building your network. These people will help you later.',
      },
    ],
    nextSceneId: 'one-on-one-1',
  },

  // Scene 8c: Lunch - Cameron Result
  {
    id: 'lunch-result-cameron',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Cameron is charming. Welcoming. Tells you everything about the team.',
      },
      {
        text: '"I know I was up for your role, but honestly? I\'m glad they brought in fresh perspective."',
        speakerId: 'cameron',
        emotion: 'happy',
      },
      {
        text: 'The words are right. The smile is right.',
      },
      {
        text: 'But you notice Cameron\'s eyes tracking who you talk to. What you say.',
      },
      {
        text: '"Water under the bridge" is rarely what it sounds like.',
      },
    ],
    nextSceneId: 'one-on-one-1',
  },

  // Scene 8d: Lunch - Alone Result
  {
    id: 'lunch-result-alone',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'You eat at your desk. Clear your inbox.',
      },
      {
        text: 'Productive. But you notice people glancing at you.',
      },
      {
        text: '"They\'re already eating alone" is what those looks say.',
      },
      {
        text: 'Day one reputation: too good for the team. That\'ll be hard to shake.',
      },
    ],
    nextSceneId: 'one-on-one-1',
  },

  // Scene 9: First One-on-One with Harper
  {
    id: 'one-on-one-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'End of day one. Harper pulls you into a quick check-in.',
      },
      {
        text: '"So. First impressions?"',
        speakerId: 'harper',
        emotion: 'neutral',
      },
      {
        text: 'Trap question. They\'re not asking for criticism. They\'re asking if you\'re smart enough to be diplomatic.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'one-on-one-1-a',
        text: '"Everyone\'s been welcoming. I\'m getting up to speed."',
        nextSceneId: 'cameron-read-1',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Diplomatic and positive. Exactly what Harper wanted to hear.',
      },
      {
        id: 'one-on-one-1-b',
        text: '"Good so far. Can you tell me more about the team dynamics?"',
        nextSceneId: 'cameron-read-1',
        xpBonus: 10,
        feedback: 'Shows awareness without criticism. Harper nods approvingly.',
      },
      {
        id: 'one-on-one-1-c',
        text: 'Share an honest observation about something that could be improved.',
        nextSceneId: 'cameron-read-1',
        xpBonus: 3,
        feedback: 'Too soon for critique. Harper\'s smile tightens.',
      },
      {
        id: 'one-on-one-1-d',
        text: 'Point out a specific inefficiency you noticed.',
        nextSceneId: 'cameron-read-1',
        xpBonus: 0,
        feedback: 'TRAP: You haven\'t earned the right to critique yet. Harper frowns.',
      },
    ],
  },

  // Scene 10: The Cameron Read
  {
    id: 'cameron-read-1',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Day three. Cameron stops by your desk.',
      },
      {
        text: '"Hey! Settling in okay? Let me know if you need anything."',
        speakerId: 'cameron',
        emotion: 'happy',
      },
      {
        text: 'Cameron pauses, then:',
      },
      {
        text: '"I was actually up for this role, but—" a wave of the hand "—water under the bridge. I\'m just glad we got someone good."',
        speakerId: 'cameron',
        emotion: 'happy',
      },
      {
        text: 'Cameron leaves.',
      },
      {
        text: '"Water under the bridge." That\'s not what their eyes said.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'cameron-read-1-a',
        text: 'Take them at face value. They seem genuine.',
        nextSceneId: 'week-one-end',
        xpBonus: 3,
        feedback: 'Maybe. Or maybe you just dropped your guard around a threat.',
      },
      {
        id: 'cameron-read-1-b',
        text: 'Stay cautious. Friendly but guarded going forward.',
        nextSceneId: 'week-one-end',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Trust is earned, not given. Smart read.',
      },
      {
        id: 'cameron-read-1-c',
        text: '"That must have been disappointing." Probe their real feelings.',
        nextSceneId: 'week-one-end',
        xpBonus: 10,
        feedback: 'Risky. Cameron\'s smile flickers, then recovers. Noted.',
      },
      {
        id: 'cameron-read-1-d',
        text: 'Avoid them going forward. Minimize interaction.',
        nextSceneId: 'week-one-end',
        xpBonus: 5,
        feedback: 'Distance might escalate tension. They\'ll notice.',
      },
    ],
  },

  // Scene 11: Week One Complete
  {
    id: 'week-one-end',
    backgroundId: 'office',
    chapter: { name: 'Week One', index: 1, total: 3 },
    dialog: [
      {
        text: 'Friday. Week one complete.',
      },
      {
        text: 'You\'ve met the players. Mapped some of the terrain. Made first impressions.',
      },
      {
        text: 'Now comes the real work.',
      },
      {
        text: 'Week one was about surviving. Month one is about positioning.',
      },
    ],
    nextSceneId: 'predecessor-1',
  },
];
