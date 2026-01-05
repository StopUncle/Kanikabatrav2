// Scenario: The Beige Escape (v2)
// Weaponized boredom as an exit strategy

import type { Scenario } from '../types';

export const beigeEscapeScenario: Scenario = {
  id: 'beige-escape',
  title: 'The Beige Escape',
  tagline: 'Make them want to leave.',
  description:
    'Tyler was exciting until he wasn\'t. Now he\'s controlling, and you need out—but dramatic exits feed his need for chaos. The solution? Become so boring, so bland, so beige that he loses interest and leaves on his own.',
  tier: 'premium',
  estimatedMinutes: 12,
  difficulty: 'intermediate',
  category: 'gaslighter',
  xpReward: 125,
  badgeId: 'beige-master',

  tacticsLearned: [
    'The Beige Protocol (weaponized boredom)',
    'Gray Rock technique for drama starvation',
    'Emotional supply disruption',
    'Controlled disengagement without confrontation',
    'Exit positioning (making them leave)',
  ],
  redFlagsTaught: [
    'Chaos addiction (thrives on intensity)',
    'Narcissistic supply dependency',
    'Hoovering attempts (pulling you back)',
    'Punishment for emotional withdrawal',
  ],

  characters: [
    {
      id: 'tyler',
      name: 'Tyler',
      description: 'Your soon-to-be-ex. Thrives on intensity—fights, makeups, drama.',
      traits: ['chaotic', 'controlling', 'intense'],
      defaultEmotion: 'angry',
    },
    {
      id: 'friend',
      name: 'Jess',
      description: 'Your friend who escaped a similar situation.',
      traits: ['experienced', 'supportive', 'tactical'],
      defaultEmotion: 'neutral',
    },
    {
      id: 'inner-voice',
      name: 'Inner Voice',
      description: 'Your tactical awareness.',
      traits: ['analytical', 'strategic', 'calm'],
      defaultEmotion: 'neutral',
    },
  ],

  startSceneId: 'scene-1',

  scenes: [
    {
      id: 'scene-1',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You've been planning this for weeks. Tyler needs to go, but you've tried breaking up before. Every time: tears, promises, threats, dramatic gestures. He always pulls you back. This is hoovering—the narcissistic pull-back technique. He feeds on the intensity of your exit attempts.",
        },
        {
          text: "Jess gave you different advice. 'Don't fight him. Don't give him drama to feed on. Just become... boring. Make every interaction so bland he loses interest. Let him be the one who wants out.' The Beige Protocol: weaponized boredom. Time to test it.",
          speakerId: 'friend',
          emotion: 'smirking',
        },
        {
          speakerId: 'inner-voice',
          text: "Gray Rock is your shield. Starve the emotional supply.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Start implementing immediately. Beige mode activated.',
          nextSceneId: 'scene-2',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'beige_protocol',
          feedback: 'OPTIMAL: The Beige Protocol begins. No drama, no emotional supply.',
        },
        {
          id: 'choice-1b',
          text: 'Try one more honest conversation first.',
          nextSceneId: 'scene-2-honest',
          feedback: "TRAP: Direct confrontation provides drama supply. He'll hoover you back.",
        },
      ],
    },
    {
      id: 'scene-2-honest',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You try the direct approach. Again. 'Tyler, I think we need to take a break. I'm not happy.' His face cycles through emotions—shock, anger, desperation. 'Not happy? After everything I've done? You're just going to throw this away?'",
          speakerId: 'tyler',
          emotion: 'sad',
        },
        {
          text: "The accusations start. You're selfish. You're cold. He can't live without you. Three hours later, somehow you're comforting him and agreeing to try again. Direct confrontation feeds his need for drama. Jess was right.",
        },
      ],
      nextSceneId: 'scene-2',
    },
    {
      id: 'scene-2',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Phase 1: Text neutrality. Tyler sends his usual message: 'Hey babe. Miss you. Wanna do something tonight?' Before, you'd match his energy. Hearts, exclamation points, eagerness. Now: Beige.",
          speakerId: 'tyler',
          emotion: 'seductive',
        },
        {
          speakerId: 'inner-voice',
          text: "Beige requires response without energy. Not avoidance—just utterly forgettable.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'Reply: "Sure. Whatever works."',
          nextSceneId: 'scene-3',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'neutral_response',
          feedback: 'OPTIMAL: No enthusiasm, no rejection. Zero emotional supply.',
        },
        {
          id: 'choice-2b',
          text: 'Reply: "Can\'t tonight, super tired."',
          nextSceneId: 'scene-3',
          xpBonus: 10,
          feedback: 'Partial beige. The excuse gives him something to work with.',
        },
        {
          id: 'choice-2c',
          text: "Don't reply. Let him wonder.",
          nextSceneId: 'scene-3-drama',
          feedback: "TRAP: Silence creates mystery and feeds the chase. Beige isn't absence—it's presence without flavor.",
        },
      ],
    },
    {
      id: 'scene-3-drama',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "You don't reply. Two hours pass. Then the storm: 'Hello?? Why are you ignoring me?' 'Are you with someone? Answer me.' He's energized now—jealousy, anxiety, the thrill of potential conflict.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          text: "Silence isn't beige—it's fuel. He's energized by the mystery, the potential conflict. Jess warned you about this. Beige isn't absence. It's presence without flavor.",
        },
      ],
      nextSceneId: 'scene-3',
    },
    {
      id: 'scene-3',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Date night. Usually, you'd dress up. Put in effort. Show enthusiasm. Tonight: jeans and a plain top. Minimal effort. Tyler tries to generate spark. 'You look... nice. Everything okay?'",
          speakerId: 'tyler',
          emotion: 'confused',
        },
        {
          
          text: "He's probing for conflict. The 'Everything okay?' is bait. Any emotional response becomes supply.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: '"Yeah, just tired. Work\'s been busy."',
          nextSceneId: 'scene-4',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'beige_explanation',
          feedback: 'OPTIMAL: Boring excuse, zero emotional content. No hook for him to latch onto.',
        },
        {
          id: 'choice-3b',
          text: '"Something wrong with how I look?"',
          nextSceneId: 'scene-4-drama',
          feedback: 'TRAP: Defensiveness is emotional supply.',
        },
      ],
    },
    {
      id: 'scene-4-drama',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Tyler pounces on the reaction. 'See, this is what I mean. You're always on the defensive.' The conversation spirals into familiar territory—who said what, who's really the problem. You've given him drama. He's fed for another week.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          text: "One emotional reaction recharged his supply. The Beige Protocol requires total commitment—every slip extends the timeline. Beige requires starving the reaction. Start over.",
        },
      ],
      nextSceneId: 'scene-4',
    },
    {
      id: 'scene-4',
      backgroundId: 'restaurant',
      dialog: [
        {
          text: "Dinner is... fine. You answer questions with short responses. No elaboration. 'How was your day?' 'It was okay.' His fork pauses mid-air. 'What did you do?' 'Work stuff. Same as usual.' Tyler sets down his fork. His eyes narrow slightly, studying you.",
          speakerId: 'tyler',
          emotion: 'confused',
        },
        {
          text: "'You're being weird tonight. What's going on?' His fingers tap the table twice—impatience surfacing. He feels the supply shortage.",
          speakerId: 'tyler',
          emotion: 'cold',
        },
        {
          
          text: "He's escalating probes. Finger-tapping = frustration. Your beige is starving him.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: '"Nothing. Just tired. Work has been a lot."',
          nextSceneId: 'scene-5',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'repetitive_boring',
          feedback: "OPTIMAL: Same excuse, same flat delivery. He can't find traction.",
        },
        {
          id: 'choice-4b',
          text: '"You always think something\'s wrong. Maybe that\'s the problem."',
          nextSceneId: 'scene-4-drama',
          feedback: "TRAP: Accusation is drama fuel. You've broken Gray Rock.",
        },
      ],
    },
    {
      id: 'scene-5',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Week two of the Beige Protocol. Tyler is pacing. He does that when he's agitated—excess energy with nowhere to go. 'Are you depressed or something? You're like a zombie.' His voice is louder than necessary. Volume escalation—trying to provoke.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          text: "'I'm fine. Just in a quiet phase.' His shoulders tighten. Nostrils flare slightly. 'Quiet phase? You used to be fun. Now you're just... nothing.' He's frustrated. Good. Frustration without drama leads to boredom.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          
          text: "Insults are escalation probes. He's trying to hurt you into reacting. Stay gray.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '"I understand. People change, I guess."',
          nextSceneId: 'scene-6',
          isOptimal: true,
          xpBonus: 20,
          tactic: 'acceptance_without_engagement',
          feedback: 'OPTIMAL: Bland acceptance of his accusation. No defense, no emotion. Devastatingly beige.',
        },
        {
          id: 'choice-5b',
          text: '"Maybe I\'m just done pretending to be excited all the time."',
          nextSceneId: 'scene-5-drama',
          feedback: "TRAP: Resentment is emotion. He'll latch onto 'pretending' and extract hours of drama.",
        },
      ],
    },
    {
      id: 'scene-5-drama',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "Tyler's eyes light up. Conflict! 'Pretending? So you've been faking this whole time?' Here comes the three-hour conversation. The accusations. The tears. You showed emotion. He's recharged.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          text: "One slip recharged his entire supply. Drama starvation requires consistency—weeks of progress undone by one emotional moment. Beige requires total commitment. Reset and try again.",
        },
      ],
      nextSceneId: 'scene-6',
    },
    {
      id: 'scene-6',
      backgroundId: 'text-screen',
      dialog: [
        {
          text: "Week three. Tyler's texts are changing. 'Hey. What are you doing.' No enthusiasm. No hearts. He's matching your energy now. The dynamic has shifted. He's not getting what he needs.",
          speakerId: 'tyler',
          emotion: 'neutral',
        },
        {
          text: "Then, the message you've been waiting for: 'We need to talk.' The Beige Protocol is working. Without emotional supply, he's lost interest.",
          speakerId: 'tyler',
          emotion: 'cold',
        },
        {
          
          text: "He's depleted. Now comes the natural conclusion.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: '"Okay. What about?"',
          nextSceneId: 'scene-7',
          isOptimal: true,
          xpBonus: 15,
          tactic: 'neutral_curiosity',
          feedback: "OPTIMAL: Neutral curiosity. Let him lead to the conclusion you've engineered.",
        },
        {
          id: 'choice-6b',
          text: "Don't respond immediately. Make him wait.",
          nextSceneId: 'scene-7',
          xpBonus: 10,
          feedback: "Delay games aren't necessary at this stage. He's already decided.",
        },
      ],
    },
    {
      id: 'scene-7',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "You meet at a coffee shop. Neutral territory. Tyler is fidgeting. Stirring his coffee too many times. Not making eye contact. He takes a breath. Finally looks at you. 'I don't know what happened to us. You're not the same person.'",
          speakerId: 'tyler',
          emotion: 'sad',
        },
        {
          text: "His voice is flat. No intensity. He's not even angry anymore—just... done. 'I think... maybe we want different things now.' He shrugs slightly. A surrender gesture. HE is initiating the end. The Beige Protocol worked.",
          speakerId: 'tyler',
          emotion: 'neutral',
        },
        {
          
          text: "He's breaking up with you. He thinks this is his decision. No hoovering possible.",
          emotion: 'neutral',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: '"I understand. I\'ve been feeling that too. No hard feelings."',
          nextSceneId: 'scene-good-ending',
          isOptimal: true,
          xpBonus: 25,
          tactic: 'graceful_acceptance',
          feedback: 'OPTIMAL: Clean exit. He feels ownership of the decision. No drama, no hooks.',
        },
        {
          id: 'choice-7b',
          text: '"Finally. I\'ve been waiting for you to figure that out."',
          nextSceneId: 'scene-neutral-ending',
          xpBonus: 10,
          feedback: 'WARNING: Smugness at the finish line might trigger his pride.',
        },
      ],
    },
    {
      id: 'scene-good-ending',
      backgroundId: 'park',
      dialog: [
        {
          text: "You walk out of the coffee shop. Single. Free. No tears. No three-hour argument. No promises to change. Tyler thinks he broke up with you. Perfect. Jess texts: 'How did it go?' 'He broke up with me. I'm devastated.' 'LOL. Beige Protocol for the win. Told you.'",
          speakerId: 'friend',
          emotion: 'smirking',
        },
        {
          text: "The cleanest exit possible. No drama. No hooks. Just... nothing. He'll move on quickly—you gave him nothing to fixate on. No martyrdom narrative. No villain to hate. Sometimes the best way out is making them want to leave.",
        },
      ],
      isEnding: true,
      outcomeType: 'good',
      endingTitle: 'The Beige Master',
      endingSummary: 'The Beige Protocol complete. Drama starvation led to natural disengagement. He owns the decision—no hoovering possible. Clean exit through weaponized boredom.',
    },
    {
      id: 'scene-neutral-ending',
      backgroundId: 'coffee-shop',
      dialog: [
        {
          text: "Tyler's eyes flash. 'Waiting? So this was all a game to you?' Your smugness gave him a hook. Now he has a villain narrative. A forty-five minute argument follows. Not as bad as usual, but still draining.",
          speakerId: 'tyler',
          emotion: 'angry',
        },
        {
          text: "You're still out. The relationship is still over. But it wasn't quite as clean as it could have been. You slipped at the finish line. He now has ammunition for future hoovering attempts. Still, the Beige Protocol got you 90% there.",
        },
      ],
      isEnding: true,
      outcomeType: 'neutral',
      endingTitle: 'The Almost-Beige',
      endingSummary: 'Protocol executed 90%. Last-minute emotional slip gave him drama supply. Exit achieved but hoovering attempts may follow.',
    },
    {
      id: 'scene-bad-ending',
      backgroundId: 'apartment',
      dialog: [
        {
          text: "You couldn't sustain the beige. He kept provoking, and you kept reacting. Every slip-up recharged his interest. The drama kept feeding the cycle.",
        },
        {
          text: "Three months later, you're still together. Still fighting. Still stuck. The Beige Protocol requires commitment. Half-measures create half-results. The exit is still possible. But you'll have to start over.",
        },
      ],
      isEnding: true,
      outcomeType: 'bad',
      endingTitle: 'The Drama Trap',
      endingSummary: 'Beige Protocol failed due to inconsistent execution. Each emotional reaction recharged his supply. Drama starvation requires total commitment. Restart possible.',
    },
  ],
};
