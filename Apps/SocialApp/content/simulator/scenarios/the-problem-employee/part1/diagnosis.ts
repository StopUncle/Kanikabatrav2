// Part 1: Diagnosis - Understanding the Problem

import type { Scene } from '../../../types';

export const diagnosisScenes: Scene[] = [
  // Scene 1: The Situation
  {
    id: 'emp-1',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'Let\'s talk about Casey.',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'You knew this was coming.',
      },
      {
        text: 'This has been going on for a while. The last manager kicked it down the road. Now it\'s on your desk.',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'You inherited this mess. But it\'s your problem now.',
        
      },
    ],
    nextSceneId: 'emp-1-deadline',
  },
  {
    id: 'emp-1-deadline',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I need a plan within two weeks. And I need this resolved within 60 days.',
        speakerId: 'alex',
        emotion: 'cold',
      },
      {
        text: 'Sixty days to fix or exit an employee. No pressure.',
        
      },
    ],
    nextSceneId: 'emp-2-team',
  },

  // Scene 2: The Team's Perspective
  {
    id: 'emp-2-team',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Casual conversation in the kitchen with Morgan.',
      },
      {
        text: 'So you\'re going to do something about Casey, right?',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: 'You don\'t respond directly.',
      },
    ],
    nextSceneId: 'emp-2-stakes',
  },
  {
    id: 'emp-2-stakes',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Because honestly, we\'ve been covering for them for months. And the good people on this team are starting to look around.',
        speakerId: 'morgan',
        emotion: 'concerned',
      },
      {
        text: 'Morgan just told you the real stakes. Your A-players will leave before your problem employee does.',
        
      },
      {
        text: 'We all want you to succeed. But we also want to work with people who pull their weight.',
        speakerId: 'morgan',
        emotion: 'neutral',
      },
      {
        text: 'Morgan walks away. Point made.',
      },
    ],
    nextSceneId: 'emp-3-choose',
  },

  // Scene 3: Choose the Problem Type
  {
    id: 'emp-3-choose',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Time to assess what you\'re actually dealing with.',
      },
      {
        text: 'Based on observations, feedback, and data, what\'s the problem?',
        
      },
    ],
    choices: [
      {
        id: 'emp-3-a',
        text: 'Casey misses deadlines, quality is low, seems to struggle with the role',
        nextSceneId: 'emp-4-underperformer',
        feedback: 'The Underperformer. Possibly coachable.',
        xpBonus: 5,
      },
      {
        id: 'emp-3-b',
        text: 'Casey hits numbers but destroys everyone around them, condescending, takes credit',
        nextSceneId: 'emp-4-toxic',
        feedback: 'The Toxic Star. Delivers but damages.',
        xpBonus: 5,
      },
    ],
  },

  // === UNDERPERFORMER PATH ===

  // Scene 4U: First Observation
  {
    id: 'emp-4-underperformer',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You review Casey\'s work from the past month.',
      },
      {
        text: 'Three missed deadlines. Two projects requiring major rework. One client complaint.',
        
      },
      {
        text: 'You check their calendar—they seem busy. You check their emails—they work late sometimes.',
      },
      {
        text: 'They\'re trying. That\'s not the issue. They\'re just... not succeeding.',
        
      },
    ],
    nextSceneId: 'emp-5-under-oneonone',
  },

  // Scene 5U: Casey's Self-Perception
  {
    id: 'emp-5-under-oneonone',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'How do you think things are going?',
      },
      {
        text: 'Honestly? I feel like I\'m always behind. Like no matter how hard I work, I can\'t catch up.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'I want to do better. I really do. I just... I don\'t know what I\'m doing wrong.',
        speakerId: 'casey',
        emotion: 'sad',
      },
      {
        text: 'They\'re aware. That\'s actually a good sign. Unaware underperformers are harder to fix.',
        
      },
      {
        text: 'Is there something specific you think I should focus on?',
        speakerId: 'casey',
        emotion: 'concerned',
      },
      {
        text: 'They\'re asking for help. Can coaching fix this? Or is this a fundamental mismatch?',
        
      },
    ],
    choices: [
      {
        id: 'emp-5u-a',
        text: '"Let\'s identify the key issues and build a plan together."',
        nextSceneId: 'emp-6-hr',
        feedback: 'OPTIMAL: Coaching first. Many underperformers can be saved.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'emp-5u-b',
        text: '"Here\'s what success looks like. I need to see improvement in 30 days."',
        nextSceneId: 'emp-6-hr',
        feedback: 'Clear expectations. Good for documentation.',
        xpBonus: 12,
      },
      {
        id: 'emp-5u-c',
        text: '"I\'ll be direct—your performance isn\'t meeting requirements. Let\'s discuss options."',
        nextSceneId: 'emp-6-hr',
        feedback: 'Harsh but clear. May hurt their motivation.',
        xpBonus: 8,
      },
      {
        id: 'emp-5u-d',
        text: '"I\'m wondering if this role is the right fit. What do you think?"',
        nextSceneId: 'emp-6-hr',
        feedback: 'Opens the exit conversation early. Risky but honest.',
        xpBonus: 10,
      },
    ],
  },

  // === TOXIC STAR PATH ===

  // Scene 4T: The Evidence
  {
    id: 'emp-4-toxic',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You review the situation.',
      },
      {
        text: 'Casey\'s numbers are strong. Top 10% on the team. That\'s not the problem.',
        
      },
      {
        text: 'Slack message from six months ago. Casey to a junior colleague: "Did you even look at this before sending? This is embarrassing. Fix it."',
      },
      {
        text: 'Performance review comment from Morgan: "Casey dismissed my ideas in front of the client as \'not strategic enough.\'"',
      },
      {
        text: 'HR file: two informal complaints, no action taken.',
      },
      {
        text: 'They deliver. But at what cost? The team dreads working with them. The good people are updating their resumes.',
        
      },
    ],
    nextSceneId: 'emp-5-toxic-oneonone',
  },

  // Scene 5T: Casey's Self-Perception
  {
    id: 'emp-5-toxic-oneonone',
    backgroundId: 'meeting-room',
    dialog: [
      {
        text: 'I want to talk about how things are going on the team.',
      },
      {
        text: 'The team? I think we\'re doing well. I\'m hitting all my numbers.',
        speakerId: 'casey',
        emotion: 'happy',
      },
      {
        text: 'I\'ve gotten some feedback about communication style.',
      },
      {
        text: 'Let me guess. Someone\'s feelings got hurt? Look, I\'m direct. Some people can\'t handle that. But my results speak for themselves.',
        speakerId: 'casey',
        emotion: 'smirking',
      },
      {
        text: 'There it is. The star\'s shield. "I deliver, therefore I\'m untouchable."',
        
      },
      {
        text: 'If people can\'t handle honest feedback, that\'s a them problem, not a me problem.',
        speakerId: 'casey',
        emotion: 'cold',
      },
      {
        text: 'This won\'t be a coaching conversation. This is about boundaries and consequences.',
        
      },
    ],
    choices: [
      {
        id: 'emp-5t-a',
        text: '"Delivering results doesn\'t excuse how you treat people. That changes now."',
        nextSceneId: 'emp-6-hr',
        feedback: 'OPTIMAL: Set boundaries immediately. Toxic stars don\'t self-correct.',
        xpBonus: 15,
        isOptimal: true,
      },
      {
        id: 'emp-5t-b',
        text: '"Your results are valued. But the team damage is costing more than your wins provide."',
        nextSceneId: 'emp-6-hr',
        feedback: 'Business case approach. Makes it about ROI, not feelings.',
        xpBonus: 12,
      },
      {
        id: 'emp-5t-c',
        text: '"Let me share specific feedback I\'ve received."',
        nextSceneId: 'emp-6-hr',
        feedback: 'Evidence-based. But risk they deflect each example.',
        xpBonus: 10,
      },
      {
        id: 'emp-5t-d',
        text: '"I\'m putting you on notice. Another complaint and we start a formal process."',
        nextSceneId: 'emp-6-hr',
        feedback: 'Clear line. Good for documentation.',
        xpBonus: 12,
      },
    ],
  },
];
