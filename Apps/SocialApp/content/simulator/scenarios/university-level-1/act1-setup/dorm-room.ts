import type { ForkScene } from '../../../types';

/**
 * Opening scene - The Dorm Room
 * Establishes the goal: get a ticket to the Caldwell Gala
 */
export const dormRoomScenes: ForkScene[] = [
  {
    id: 'dorm-room-intro',
    backgroundId: 'dorm-room',
    sceneType: 'dialogue',
    pathId: 'setup',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Your first week at Whitmore University. The dorm room is small but yours. Unpacked boxes still line the walls.',
      },
      {
        text: 'Your roommate Alex bursts through the door, waving his phone like a trophy.',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: '"Dude. DUDE. The Caldwell Gala is next Friday. Do you know what that IS?"',
        speakerId: 'alex',
        emotion: 'happy',
      },
    ],
    dialogueChoices: [
      {
        id: 'choice-curious',
        text: '"No idea. Enlighten me."',
        reaction: {
          text: 'Alex grins, thrilled to have an audience.',
          emotion: 'happy',
          bodyLanguage: 'He leans forward eagerly, practically bouncing.',
          scoreImpact: 5,
        },
        nextSceneId: 'dorm-room-explanation',
      },
      {
        id: 'choice-dismissive',
        text: '"Some rich kid party?"',
        reaction: {
          text: 'Alex\'s face falls slightly. "It\'s not JUST a party..."',
          emotion: 'sad',
          bodyLanguage: 'His shoulders drop, but he rallies quickly.',
          scoreImpact: 0,
        },
        nextSceneId: 'dorm-room-explanation',
      },
      {
        id: 'choice-already-know',
        text: '"The one with all the VCs and tech people? I read about it."',
        reaction: {
          text: 'Alex raises an eyebrow. "You actually do your homework. Nice."',
          emotion: 'curious',
          bodyLanguage: 'He looks at you differently now.',
          scoreImpact: 10,
        },
        nextSceneId: 'dorm-room-the-problem',
      },
    ],
  },
  {
    id: 'dorm-room-explanation',
    backgroundId: 'dorm-room',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"The Caldwell family owns half the hotels in the country. Every year they throw this gala at the start of term. CEOs, VCs, politicians—everyone who MATTERS."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: '"People have gotten internships, jobs, FUNDING from conversations at that party. One guy started a billion-dollar company from a handshake there."',
        speakerId: 'alex',
        emotion: 'serious',
      },
      {
        text: 'Your interest sharpens. This isn\'t just a party. It\'s access.',
      },
    ],
    nextSceneId: 'dorm-room-the-problem',
  },
  {
    id: 'dorm-room-the-problem',
    backgroundId: 'dorm-room',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"So how do we get in?"',
      },
      {
        text: 'Alex\'s excitement dims. He slumps onto his bed.',
        speakerId: 'alex',
        emotion: 'sad',
      },
      {
        text: '"That\'s the thing. Tickets are invitation-only. The Caldwell heir—Maris—she controls who gets in. Her inner circle. Everyone else? Begging."',
        speakerId: 'alex',
        emotion: 'sad',
      },
      {
        text: '"I\'ve been trying to get her attention all week. Nothing. She doesn\'t even see people like us."',
        speakerId: 'alex',
        emotion: 'sad',
      },
    ],
    dialogueChoices: [
      {
        id: 'choice-observe',
        text: '"What have you tried so far?"',
        reaction: {
          text: '"Everything! Tried to talk to her at the quad. Commented on her posts. Even brought her coffee. She just... looked through me."',
          emotion: 'sad',
          bodyLanguage: 'Alex stares at his hands, defeated.',
          scoreImpact: 5,
        },
        nextSceneId: 'dorm-room-options',
        isOptimal: true,
      },
      {
        id: 'choice-mock',
        text: '"You brought her coffee? Seriously?"',
        reaction: {
          text: 'Alex flushes red. "I was TRYING, okay? What\'s YOUR brilliant plan?"',
          emotion: 'angry',
          bodyLanguage: 'He crosses his arms, defensive.',
          scoreImpact: -5,
        },
        nextSceneId: 'dorm-room-options',
      },
      {
        id: 'choice-strategic',
        text: '"Maybe the direct approach isn\'t working. What else is there?"',
        reaction: {
          text: 'Alex pauses. "Actually... there might be another way."',
          emotion: 'curious',
          bodyLanguage: 'He sits up straighter, thinking.',
          scoreImpact: 10,
        },
        nextSceneId: 'dorm-room-options',
        isOptimal: true,
      },
    ],
  },
  {
    id: 'dorm-room-options',
    backgroundId: 'dorm-room',
    sceneType: 'dialogue',
    pathId: 'setup',
    dialog: [
      {
        text: '"Maris is throwing a party tonight at her place. Supposedly it\'s where she picks her gala guests. If you can get her attention..."',
        speakerId: 'alex',
        emotion: 'hopeful',
      },
      {
        text: '"But there\'s also this girl Casey who works the gala registration desk. I heard she has access to spare tickets. She\'s in the common room most nights, studying."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'On your way out, you notice someone pinning a small card to the hallway notice board. They slip away before you can see their face.',
      },
      {
        text: 'Two paths. One loud, one quiet. Both lead to the same door.',
      },
      {
        text: '"So what do you want to do? Maris\'s party is starting in an hour. Or we could hit the common room."',
        speakerId: 'alex',
        emotion: 'curious',
      },
    ],
    nextSceneId: 'the-fork',
  },
];
