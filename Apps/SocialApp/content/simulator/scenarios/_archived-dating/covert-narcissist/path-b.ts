import type { Scene } from '../../types';

// PATH B: THE HUMBLE BRAGGER
// "I'm so blessed" constant self-promotion disguised as gratitude
// Teaching: Modesty is their mask. Superiority is the point.

export const humbleScenes: Scene[] = [
  {
    id: 'humble-1',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "Maya nearly spits out her coffee. 'Oh god. The humble bragger. Let me guess—they're always SO grateful for their amazing life while making sure you know yours is less?'",
        speakerId: 'maya',
        emotion: 'knowing',
      },
      {
        text: "You think of Jordan. 'I'm SO blessed to have supportive parents. I know not everyone has that.' Said right after you mentioned your difficult family. Every compliment to themselves is a dig at you.",
      },
      {
        speakerId: 'inner-voice',
        text: "They're not grateful. They're bragging with a humble mask.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'humble-1a',
        text: '"But they really do have a good life. Maybe they\'re just... positive?"',
        nextSceneId: 'humble-2-doubt',
        xpBonus: 5,
        feedback: 'There\'s a difference between gratitude and weaponized modesty.',
      },
      {
        id: 'humble-1b',
        text: '"How do I call it out without sounding jealous?"',
        nextSceneId: 'humble-2-strategy',
        isOptimal: true,
        xpBonus: 15,
        feedback: 'They\'ve designed it so any pushback sounds like jealousy. Smart question.',
      },
      {
        id: 'humble-1c',
        text: '"Maybe I\'m just insecure about my own life."',
        nextSceneId: 'humble-2-trap',
        feedback: 'They\'ve successfully made you the problem.',
      },
    ],
  },
  {
    id: 'humble-2-doubt',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Test it,' Maya says. 'Share something you're proud of. See if they can celebrate you without making it about them. Watch what happens to their face when you win.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "That night, you tell Jordan you got a promotion at work. You've been nervous to share—somehow good news always feels dangerous with them.",
      },
    ],
    nextSceneId: 'humble-3-test',
  },
  {
    id: 'humble-2-strategy',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'You don't call it out directly. You mirror it,' Maya says. 'Next time they humble brag, do it back. Match their energy. See how they handle someone else's spotlight.'",
        speakerId: 'maya',
        emotion: 'neutral',
      },
      {
        text: "You meet Jordan for dinner. They're glowing. 'I'm SO lucky—my boss said I'm the best hire they've made in years. It's actually kind of embarrassing?' Time to test.",
      },
    ],
    nextSceneId: 'humble-3-mirror',
  },
  {
    id: 'humble-2-trap',
    backgroundId: 'coffee-shop',
    dialog: [
      {
        text: "'Babe.' Maya puts her hand on yours. 'You just blamed yourself for being uncomfortable around someone who constantly one-ups you. That's not insecurity. That's a healthy reaction to being diminished.'",
        speakerId: 'maya',
        emotion: 'concerned',
      },
      {
        text: "You flash back to last week. You mentioned a small win at work. Jordan: 'That's cute! It reminds me of when I got MY first promotion.' Your win became their story.",
      },
    ],
    nextSceneId: 'humble-3-mirror',
  },
  {
    id: 'humble-3-test',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "'A promotion? Oh wow.' Jordan's smile doesn't reach their eyes. 'That's great for you. I remember when I got promoted—twice in one year, actually. It's SO much more pressure though. You'll see.'",
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        speakerId: 'inner-voice',
        text: "You shared a win. They made it smaller AND about them. Both at once.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'humble-3a',
        text: '"Thanks. I\'m actually really proud of myself."',
        nextSceneId: 'humble-4-stand',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Hold your ground. Don\'t let them shrink your moment.',
      },
      {
        id: 'humble-3b',
        text: '"Yeah, you\'re probably right. It is pretty stressful."',
        nextSceneId: 'humble-4-shrink',
        xpBonus: 5,
        feedback: 'You let them reframe your win as a burden.',
      },
      {
        id: 'humble-3c',
        text: '"Twice in one year? Wow, that\'s amazing."',
        nextSceneId: 'humble-trap-ending',
        feedback: 'Your promotion is now forgotten. Theirs is the story.',
      },
    ],
  },
  {
    id: 'humble-3-mirror',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "You smile. 'That's so cool. You know what's funny? My boss said the same thing about ME last week. Best hire in years. We're both so lucky!'",
      },
      {
        text: "Jordan's face flickers. Just for a second—something cold. Then the mask returns. 'Oh that's... nice. But I mean, my company is pretty competitive. It's different.'",
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        speakerId: 'inner-voice',
        text: "There it is. They can't share the spotlight. Not even for a second.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'humble-mirror-a',
        text: '"Different how? We\'re both doing well. That\'s a good thing."',
        nextSceneId: 'humble-4-push',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'Force them to explain the hierarchy they created.',
      },
      {
        id: 'humble-mirror-b',
        text: 'Let it go. You saw what you needed to see.',
        nextSceneId: 'humble-good-ending',
        xpBonus: 15,
        feedback: 'Silent conclusion. You have your answer.',
      },
      {
        id: 'humble-mirror-c',
        text: '"Yeah, you\'re right. Your job is way harder."',
        nextSceneId: 'humble-trap-ending',
        feedback: 'You blinked first. They win.',
      },
    ],
  },
  {
    id: 'humble-4-stand',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Jordan looks surprised. Like they expected you to deflect. 'Oh. Yeah, no, of course. Proud of you.' The words are right. The energy is wrong. They're already looking at their phone.",
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        text: "The rest of dinner, they're distant. You held your ground. They don't know what to do with someone who doesn't shrink.",
      },
    ],
    nextSceneId: 'humble-good-ending',
  },
  {
    id: 'humble-4-shrink',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "'Right?' Jordan perks up. 'Promotions sound good but they're honestly exhausting. I barely have time for myself. Let me tell you about what I've been dealing with...'",
        speakerId: 'jordan',
        emotion: 'happy',
      },
      {
        text: "Your promotion. Your dinner. Your moment. Gone in thirty seconds. Now you're listening to their problems again.",
      },
    ],
    nextSceneId: 'humble-neutral-ending',
  },
  {
    id: 'humble-4-push',
    backgroundId: 'restaurant',
    dialog: [
      {
        text: "Jordan's mask slips further. 'Look, I'm not saying yours isn't great. I'm just saying... context matters. Some achievements are harder to get than others. That's just reality.'",
        speakerId: 'jordan',
        emotion: 'cold',
      },
      {
        speakerId: 'inner-voice',
        text: "They can't celebrate you. Your success threatens their superiority.",
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'humble-push-a',
        text: '"I think we measure success differently. And that\'s okay."',
        nextSceneId: 'humble-good-ending',
        isOptimal: true,
        xpBonus: 20,
        feedback: 'You didn\'t fight. You disengaged. That\'s power.',
      },
      {
        id: 'humble-push-b',
        text: '"You know what? You\'re being kind of condescending."',
        nextSceneId: 'humble-confront-ending',
        xpBonus: 15,
        feedback: 'Direct confrontation. Watch them spin it.',
      },
    ],
  },
];
