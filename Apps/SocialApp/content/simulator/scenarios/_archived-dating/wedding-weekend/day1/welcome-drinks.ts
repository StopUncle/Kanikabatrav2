// Day 1: Welcome Drinks
// Scenes 2-3 - First contact with the full group

import type { Scene } from '../../../types';

export const welcomeDrinksScenes: Scene[] = [
  {
    id: 'scene-2-welcome-drinks',
    backgroundId: 'bar',
    dialog: [
      {
        text: "The hotel bar. Low lighting, expensive cocktails, and the wedding party already three drinks deep. You see them before they see you - {bride} holding court in a cream silk dress, {groom} with his arm around her, {ex} laughing at something someone said. Everyone's already been drinking. You're not in the shot yet.",
      },
      {
        text: "{bride} spots you first. Her smile is immediate and doesn't reach her eyes. \"Oh. You made it.\" {groom} gives you a firm handshake, holds eye contact a beat too long. Then {ex} - a warm hug for {boyfriend} that lingers. To you: \"So nice to finally meet {boyfriend}'s... girlfriend.\"",
        speakerId: 'danielle',
        emotion: 'happy',
      },
      {
        
        text: "That pause before 'girlfriend'. Deliberate.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-2a',
        text: 'Stay close to {boyfriend}. Let him navigate.',
        nextSceneId: 'scene-3a-sophia-separates',
        feedback: 'Safe but weak. You look dependent.',
        tactic: 'passive_approach',
      },
      {
        id: 'choice-2b',
        text: '"{bride}, congratulations. The venue is stunning."',
        nextSceneId: 'scene-3b-womens-circle',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Gracious. Unthreatening. She can\'t fault you for politeness. Camouflage.',
        tactic: 'strategic_warmth',
      },
      {
        id: 'choice-2c',
        text: 'Drift toward {sister} at the edge of the group.',
        nextSceneId: 'scene-3c-lily-side',
        xpBonus: 10,
        feedback: 'Strategic. Building allies. But you avoided the power center.',
        tactic: 'ally_building',
      },
      {
        id: 'choice-2d',
        text: '"{groom}. The man himself. {boyfriend} says you\'re the one I need to impress."',
        nextSceneId: 'scene-3d-marcus-test',
        feedback: 'Too direct, too early. He respects boldness but now you\'re on his radar. You wanted to stay invisible.',
        tactic: 'alpha_challenge',
      },
    ],
  },
  // BRANCH A: Sophia separates you
  {
    id: 'scene-3a-sophia-separates',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{bride} approaches with a sweet smile that doesn't match her eyes. \"{boyfriend}, {groom} needs you for groomsman stuff. You don't mind if I steal him, do you?\"",
        speakerId: 'sophia',
        emotion: 'seductive',
      },
      {
        text: "{boyfriend} looks at you, uncertain. He's hesitating. Waiting for permission to leave you alone with her.",
      },
      {
        
        text: "She's separating you. On purpose.",
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'choice-3a-1',
        text: '"Go ahead. I\'ll be fine."',
        nextSceneId: 'scene-4-sophia-interrogation',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Graceful. Unbothered. She can\'t read you. Perfect camouflage.',
        tactic: 'strategic_grace',
      },
      {
        id: 'choice-3a-2',
        text: 'Touch his arm. "I\'ll come find you in a bit."',
        nextSceneId: 'scene-4-sophia-interrogation',
        xpBonus: 5,
        feedback: 'Territorial. She clocks it. Now she knows where to poke.',
        tactic: 'territorial_mark',
      },
      {
        id: 'choice-3a-3',
        text: '"Actually, I\'d love to see the venue. Mind if I tag along?"',
        nextSceneId: 'scene-3d-marcus-test',
        feedback: 'You refused her power play. Bold, but now you\'re on her list.',
        tactic: 'power_play_counter',
      },
    ],
  },
  // BRANCH B: Women's circle
  {
    id: 'scene-3b-womens-circle',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You insert yourself into their conversation. {bride}'s smile tightens. \"Oh, you're joining us? {boyfriend} usually keeps his girlfriends closer.\"",
        speakerId: 'sophia',
        emotion: 'cold',
      },
      {
        text: "{ex} laughs softly. \"{bride}, be nice.\" But she's smiling.",
        speakerId: 'danielle',
        emotion: 'smirking',
      },
      {
        
        text: "Now what.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3b-1',
        text: '"You must be {ex}. {boyfriend} mentioned you were in the wedding party."',
        nextSceneId: 'scene-5-danielle-probe',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Warm, direct, unbothered. You addressed the elephant without aggression. Disarming.',
        tactic: 'strategic_warmth',
      },
      {
        id: 'choice-3b-2',
        text: '"I don\'t need a leash. He knows where to find me."',
        nextSceneId: 'scene-5-danielle-probe',
        xpBonus: 5,
        feedback: 'Confident, but you showed your hand too early. She files you as defensive.',
        tactic: 'early_aggression',
      },
      {
        id: 'choice-3b-3',
        text: '"And {bride} usually keeps her claws sheathed at her own wedding. Guess we\'re both making exceptions."',
        nextSceneId: 'scene-6-confrontation-active',
        feedback: 'Nuclear. Too early. You just made an enemy on night one.',
        tactic: 'nuclear_response',
      },
      {
        id: 'choice-3b-4',
        text: '"I was actually just looking for the bathroom."',
        nextSceneId: 'scene-3a-sophia-separates',
        feedback: 'Retreat. Everyone notices. Blood in the water.',
        tactic: 'retreat',
      },
    ],
  },
  // BRANCH C: Lily side conversation
  {
    id: 'scene-3c-lily-side',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You find {sister} at the edge of the group, nursing a drink and watching the room like she's taking notes. \"Escaping already?\" She doesn't seem surprised.",
        speakerId: 'lily',
        emotion: 'smirking',
      },
      {
        text: "\"Smart move. {bride}'s running the room tonight. Better to observe before you engage.\" She tips her glass toward the group. \"{ex}'s being extra sweet. That means something.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        
        text: "Intel. Interesting.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3c-1',
        text: '"Why are you telling me this?"',
        nextSceneId: 'scene-3c-lily-explains',
        xpBonus: 10,
        feedback: 'Direct. She respects that.',
        tactic: 'direct_question',
      },
      {
        id: 'choice-3c-2',
        text: '"What should I know about {ex}?"',
        nextSceneId: 'scene-3c-lily-intel',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Intelligence gathering. Smart.',
        tactic: 'intel_gathering',
      },
      {
        id: 'choice-3c-3',
        text: '"I can handle myself."',
        nextSceneId: 'scene-5-danielle-probe',
        feedback: 'Defensive. She shrugs. "Okay."',
        tactic: 'defensive_response',
      },
    ],
  },
  {
    id: 'scene-3c-lily-explains',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{sister} shrugs. \"Because my brother's an idiot who picks women way out of his league and then lets his friends tear them apart.\" She takes a sip. \"And because you seem different.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"Or maybe I'm just bored and this is entertaining.\" A half-smile. \"Either way, {bride}'s about to make her move. Heads up.\"",
        speakerId: 'lily',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-4-sophia-interrogation',
  },
  {
    id: 'scene-3c-lily-intel',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{sister} glances at {ex}, then back at you. \"Three years with my brother. She's the one who ended it. Said he wasn't ready for commitment.\" A pause. \"She wasn't wrong.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
      {
        text: "\"She's still in the group because {bride} loves her. Also because she never really left. Holidays. Birthdays. She's always there.\" {sister} meets your eyes. \"{boyfriend} never quite let go either. Just so you know.\"",
        speakerId: 'lily',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
  // BRANCH D: Marcus test
  {
    id: 'scene-3d-marcus-test',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom} turns to face you fully. The groomsmen are watching. You've walked into their space. \"{boyfriend}'s girl drinks, right?\" He's already flagging down the bartender.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: "Shots appear on the bar. The other guys are grinning. This is a test.",
      },
      {
        
        text: "Trap. But which kind?",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'choice-3d-1',
        text: 'Take it. Slam the glass down. Don\'t wince.',
        nextSceneId: 'scene-3d-shot-taken',
        xpBonus: 10,
        feedback: 'You\'re in. For now.',
        tactic: 'acceptance_test',
      },
      {
        id: 'choice-3d-2',
        text: '"I pace myself. Someone has to remember tonight."',
        nextSceneId: 'scene-3d-shot-declined',
        xpBonus: 5,
        feedback: 'Could read as confident or buzzkill. Depends on your smirk.',
        tactic: 'confident_decline',
      },
      {
        id: 'choice-3d-3',
        text: '"Only if you can keep up."',
        nextSceneId: 'scene-3d-drinking-game',
        feedback: 'He grins. You\'ve got balls. But now you\'re in a drinking contest.',
        tactic: 'challenge_accepted',
      },
      {
        id: 'choice-3d-4',
        text: '"What\'s the story with you and {boyfriend}? How\'d you two meet?"',
        nextSceneId: 'scene-3d-deflect-intel',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'Deflection. But you\'re gathering intel now.',
        tactic: 'intel_deflection',
      },
    ],
  },
  {
    id: 'scene-3d-shot-taken',
    backgroundId: 'bar',
    dialog: [
      {
        text: "You take the shot without breaking eye contact. The burn hits, but you don't flinch. {groom} raises an eyebrow, impressed despite himself.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
      {
        text: "\"Not bad.\" He claps {boyfriend} on the shoulder. \"This one might survive the weekend.\" It's a compliment wrapped in a threat.",
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-3d-shot-declined',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom} studies you for a moment. The room holds its breath. Then he shrugs. \"Fair enough. More for us.\" He takes both shots himself.",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "You're not in their circle. But you're not dismissed either.",
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-3d-drinking-game',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom}'s eyes light up. \"Oh, I like this one.\" Three shots later, the room is spinning slightly. The groomsmen are chanting. You're in - but at what cost?",
        speakerId: 'marcus',
        emotion: 'happy',
      },
      {
        text: "{boyfriend} appears at your elbow, concerned. \"Babe, maybe slow down?\" But {groom} is already ordering another round. The gambit backfired.",
      },
    ],
    nextSceneId: 'scene-7-welcome-dinner',
  },
  {
    id: 'scene-3d-deflect-intel',
    backgroundId: 'bar',
    dialog: [
      {
        text: "{groom} pauses, shot still in hand. \"Curious type, huh?\" He sets the shot down. \"College roommates. Freshman year. Pulled him out of more bad decisions than I can count.\"",
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: "\"Including {ex}.\" He says it casually, watching your face. \"She was one of the good decisions, actually. Shame how that ended.\" A test within a test.",
        speakerId: 'marcus',
        emotion: 'smirking',
      },
    ],
    nextSceneId: 'scene-5-danielle-probe',
  },
];
