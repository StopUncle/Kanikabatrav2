import type { ForkScene } from '../../../../types';

/**
 * Study Path - Endings
 * Various outcomes based on how the player handled Casey's attachment patterns
 * DEFENSIVE VERSION: Focus on healthy connection and pattern recognition
 */
export const studyEndingScenes: ForkScene[] = [
  {
    id: 'ending-study-healthy',
    backgroundId: 'park',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'good',
    endingTitle: 'Genuine Connection',
    endingSummary: 'You recognized Casey\'s anxious patterns and modeled healthy boundaries. Not everyone is a predator—some people just need to learn that connection doesn\'t require transaction.',
    dialog: [
      {
        text: 'You walk out of the library into the evening air.',
      },
      {
        text: 'Casey is different from Maris. Not dangerous—just scared. Trying to buy connection because she doesn\'t believe she deserves it for free.',
      },
      {
        text: 'You showed her a different way. Slow. Genuine. No strings attached.',
      },
      {
        text: 'Some people need protection FROM manipulation. Some need protection from their own patterns. Reading both keeps everyone safer.',
      },
    ],
  },
  {
    id: 'ending-study-neutral',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Passing Ships',
    endingSummary: 'You kept your distance. Casey will find someone else to give herself to—hopefully someone who helps her see her worth. You weren\'t the right person for that lesson.',
    dialog: [
      {
        text: 'You head home. Casey stays in your thoughts briefly, then fades.',
      },
      {
        text: 'Not every encounter needs to be deep. Not every connection needs to be formed.',
      },
      {
        text: 'She\'ll be okay. Probably. And either way—it wasn\'t your job to fix her.',
      },
      {
        text: 'Recognizing patterns doesn\'t mean acting on them. Sometimes observation is enough.',
      },
    ],
  },
  {
    id: 'ending-study-transactional',
    backgroundId: 'coffee-shop',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'mysterious',
    isEnding: true,
    outcomeType: 'bad',
    endingTitle: 'The User',
    endingSummary: 'You recognized Casey\'s patterns—and exploited them. She\'ll give you everything. Campus tours. Notes. Time. And wonder why she still feels empty.',
    dialog: [
      {
        text: 'Casey texts you that night with the campus tour schedule. Detailed. Color-coded. She must have spent hours.',
      },
      {
        text: 'You knew what she was doing. You let her do it anyway.',
      },
      {
        text: 'There\'s a word for that.',
      },
      {
        text: 'The difference between recognizing patterns and exploiting them is character. Remember which side you\'re on.',
      },
    ],
  },
  {
    id: 'ending-study-solo',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'study',
    mood: 'peaceful',
    isEnding: true,
    outcomeType: 'neutral',
    endingTitle: 'Solo Study',
    endingSummary: 'You chose solitude over connection. Nothing wrong with that—sometimes we need space more than company. But opportunities for genuine connection are rare.',
    dialog: [
      {
        text: 'You got your work done. The library was peaceful.',
      },
      {
        text: 'Casey slipped away without a goodbye. Another invisible person staying invisible.',
      },
      {
        text: 'Not every encounter needs to become something. But sometimes the quiet ones are worth the effort.',
      },
      {
        text: 'You\'ll never know what you missed. Maybe that\'s fine. Maybe not.',
      },
    ],
  },
];
