import type { ForkScene } from '../../../types';

/**
 * App Path - The Matches
 * Digital dating dynamics - reading between the lines
 */
export const matchScenes: ForkScene[] = [
  {
    id: 'app-matches-intro',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'app',
    chapter: { name: 'Mission 2: Dating Apps', index: 2, total: 5 },
    dialog: [
      {
        text: 'Morning. Coffee. Phone in hand.',
      },
      {
        text: 'Three notifications. Three matches who want to talk.',
      },
      {
        text: 'The algorithm thinks it knows what you want. Let\'s see if it\'s right.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'app-jordan-preview',
  },
  {
    id: 'app-jordan-preview',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Jordan. Model-level photos. Perfect lighting. Curated life.',
      },
      {
        text: '"Hey gorgeous. Finally matched with someone interesting. Coffee sometime?"',
        speakerId: 'match-1',
        emotion: 'seductive',
      },
      {
        text: 'Too smooth. Too fast. The profile screams "professional."',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'app-sam-preview',
  },
  {
    id: 'app-sam-preview',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Sam. Normal photos. Genuine smile. Bio mentions cats.',
      },
      {
        text: '"Hi!! Omg I loved your profile! The book thing especially. Do you read a lot? Sorry if this is too eager lol"',
        speakerId: 'match-2',
        emotion: 'happy',
      },
      {
        text: 'Nervous energy. Probably overthinking every word.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'app-riley-preview',
  },
  {
    id: 'app-riley-preview',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Riley. Candid photos. Action shots. Minimal bio: "Ask me anything."',
      },
      {
        text: '"Your profile is interesting. Want to grab drinks Friday?"',
        speakerId: 'match-3',
        emotion: 'neutral',
      },
      {
        text: 'Direct. No games. Either confident or hiding something.',
        speakerId: 'inner-voice',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'app-first-choice',
  },
  {
    id: 'app-first-choice',
    backgroundId: 'text-screen',
    sceneType: 'dialogue',
    pathId: 'app',
    dialog: [
      {
        text: 'Three options. Limited time. Who gets your attention?',
      },
      {
        text: 'One of them isn\'t who they claim to be. Your gut already knows.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    actionChoices: [
      {
        id: 'choose-jordan',
        text: 'Reply to Jordan first',
        subtext: 'The beautiful mystery. High risk, high reward.',
        nextSceneId: 'app-jordan-chat',
        difficulty: 'hard',
        pathId: 'app-jordan',
      },
      {
        id: 'choose-sam',
        text: 'Reply to Sam first',
        subtext: 'The eager one. Probably genuine. Maybe too genuine.',
        nextSceneId: 'app-sam-chat',
        difficulty: 'easy',
        pathId: 'app-sam',
      },
      {
        id: 'choose-riley',
        text: 'Reply to Riley first',
        subtext: 'The direct one. No games could mean no pretense.',
        nextSceneId: 'app-riley-chat',
        difficulty: 'medium',
        pathId: 'app-riley',
      },
    ],
  },
];
