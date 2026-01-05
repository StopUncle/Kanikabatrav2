import type { ForkScene } from '../../../types';

/**
 * Mission 18: The After-Party
 * Private conversations begin - alliances form
 */
export const afterPartyScenes: ForkScene[] = [
  {
    id: 'after-party-intro',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    chapter: { name: 'Day One', index: 2, total: 4 },
    mood: 'mysterious',
    dialog: [
      {
        text: 'After dinner. The guests scatter to different corners of the house.',
      },
      {
        text: 'A terrace. A library. A bar that looks like a private club.',
      },
      {
        text: 'Blake looks around. "What now?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: '"Now we navigate."',
      },
      {
        text: 'Multiple opportunities. Limited time. Choose wisely.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'party-trap',
        text: 'Head back to the Grove. Rest and regroup.',
        nextSceneId: 'party-retreat',
        isOptimal: false,
        tactic: 'avoidance',
        reaction: {
          text: 'Safe. But you\'re missing the real game.',
          emotion: 'neutral',
          bodyLanguage: 'Everyone important is out there. You\'re hiding.',
          scoreImpact: -15,
        },
      },
      {
        id: 'party-subtle',
        text: 'Go to the bar. Observe from a distance.',
        nextSceneId: 'party-bar-observe',
        isOptimal: false,
        tactic: 'observation',
        reaction: {
          text: 'You watch. Learn. But don\'t engage.',
          emotion: 'neutral',
          bodyLanguage: 'Information gathered, but no connections made.',
          scoreImpact: 5,
        },
      },
      {
        id: 'party-close',
        text: 'Find Elena. She offered information.',
        nextSceneId: 'party-elena-meeting',
        isOptimal: false,
        tactic: 'opportunity',
        reaction: {
          text: 'Elena awaits on the third terrace. Information in hand.',
          emotion: 'knowing',
          bodyLanguage: 'You prioritized intelligence. Smart but narrow.',
          scoreImpact: 20,
        },
      },
      {
        id: 'party-optimal',
        text: 'Split up. Blake observes; you engage. Cover more ground.',
        nextSceneId: 'party-strategic-split',
        isOptimal: true,
        tactic: 'strategic',
        reaction: {
          text: 'Maximum coverage. Blake watches your back from a distance.',
          emotion: 'knowing',
          bodyLanguage: 'You\'re thinking like a team. Multiply your reach.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'party-retreat',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The Grove. Quiet. Safe.',
      },
      {
        text: 'Blake collapses on the couch. "I needed a break from those people."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Did you see how they looked at each other? Like weapons."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Your phone buzzes. Text from an unknown number.',
      },
      {
        text: '"Interesting choice. The Grove. We\'ll talk tomorrow. -M.C."',
      },
      {
        text: 'Maris. Watching even from a distance.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'day-one-end-retreat',
  },
  {
    id: 'party-bar-observe',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'mysterious',
    dialog: [
      {
        text: 'The bar. Dark wood. Soft jazz. Power in every corner.',
      },
      {
        text: 'Dominic holds court with two men you don\'t recognize. Investors, probably.',
      },
      {
        text: 'Victoria whispers with an older man. Her father. Victor Ashworth.',
      },
      {
        text: 'Isabelle sits alone. Watching everyone. Like you.',
      },
      {
        text: 'She catches your eye. Raises her glass. Acknowledges a kindred spirit.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-isabelle-approach',
  },
  {
    id: 'party-elena-meeting',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'mysterious',
    dialog: [
      {
        text: 'Third terrace. Moonlight on water. Elena waits.',
      },
      {
        text: 'She doesn\'t turn when you approach. "You came."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"I have something for you. A gift. From Singapore."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She hands you a folder. Inside: photographs. Documents.',
      },
      {
        text: '"Harrison\'s network. The real structure. Not what he shows at dinner."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'This is dangerous. Why is she giving this to us?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'party-elena-price',
  },
  {
    id: 'party-strategic-split',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'professional',
    dialog: [
      {
        text: '"Blake. Watch from the bar. Note who talks to whom. I\'ll circulate."',
      },
      {
        text: 'He nods. Understanding. "I\'m your backup. Got it."',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: '"If someone approaches you—"',
      },
      {
        text: '"Play dumb. Gather intel. I know the drill."',
        speakerId: 'blake',
        emotion: 'smirking',
      },
      {
        text: 'He\'s learning. Good.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-circulation',
  },
  {
    id: 'party-isabelle-approach',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'Isabelle gestures to the seat beside her. An invitation.',
      },
      {
        text: 'You join her. Blake hovers nearby.',
      },
      {
        text: '"You watch people. Like I do." She doesn\'t look at you.',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"Most new guests try too hard. You\'re patient. Calculating."',
        speakerId: 'isabelle',
        emotion: 'neutral',
      },
      {
        text: '"I appreciate calculation."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'She\'s testing. Or recruiting. Maybe both.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'isabelle-trap',
        text: '"I\'m just trying to learn how things work here."',
        nextSceneId: 'party-isabelle-dismissive',
        isOptimal: false,
        tactic: 'humility',
        reaction: {
          text: '"Learning." She finishes her drink. "Everyone says that."',
          emotion: 'cold',
          bodyLanguage: 'Too humble. She expected sharper.',
          scoreImpact: -5,
        },
      },
      {
        id: 'isabelle-subtle',
        text: '"Observation is the first step of any strategy."',
        nextSceneId: 'party-isabelle-neutral',
        isOptimal: false,
        tactic: 'agreement',
        reaction: {
          text: '"True." She nods. "But it\'s only the first step."',
          emotion: 'neutral',
          bodyLanguage: 'Acknowledged but not impressed.',
          scoreImpact: 10,
        },
      },
      {
        id: 'isabelle-close',
        text: '"You\'ve destroyed three corporations from the inside. I imagine you appreciate subtlety."',
        nextSceneId: 'party-isabelle-surprised',
        isOptimal: false,
        tactic: 'research-reveal',
        reaction: {
          text: 'Her eyes widen briefly. "You did your homework."',
          emotion: 'curious',
          bodyLanguage: 'You showed you know her reputation. She respects that.',
          scoreImpact: 20,
        },
      },
      {
        id: 'isabelle-optimal',
        text: '"I\'m watching who watches Harrison. That tells me more than watching Harrison himself."',
        nextSceneId: 'party-isabelle-impressed',
        isOptimal: true,
        tactic: 'meta-observation',
        reaction: {
          text: 'She laughs. Real. "Oh, you\'re dangerous."',
          emotion: 'happy',
          bodyLanguage: 'You showed second-order thinking. She\'s genuinely impressed.',
          scoreImpact: 30,
        },
      },
    ],
  },
  {
    id: 'party-elena-price',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Why?" You hold the folder. Heavy with secrets.',
      },
      {
        text: '"Because information is currency. And I\'m investing in you."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"I don\'t invest without expecting returns."',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: '"When I call in this favor—and I will—you answer."',
        speakerId: 'elena',
        emotion: 'serious',
      },
      {
        text: 'A debt. Already. On day one.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    dialogueChoices: [
      {
        id: 'elena-price-trap',
        text: '"I can\'t agree to an open-ended favor."',
        nextSceneId: 'party-elena-disappointed',
        isOptimal: false,
        tactic: 'refusal',
        reaction: {
          text: '"Then give it back." She extends her hand.',
          emotion: 'cold',
          bodyLanguage: 'You played it too safe. Opportunity closing.',
          scoreImpact: -10,
        },
      },
      {
        id: 'elena-price-subtle',
        text: '"What kind of favor?"',
        nextSceneId: 'party-elena-vague',
        isOptimal: false,
        tactic: 'clarification',
        reaction: {
          text: '"The kind I can\'t predict yet. That\'s the point."',
          emotion: 'smirking',
          bodyLanguage: 'She won\'t define it. That\'s the risk.',
          scoreImpact: 5,
        },
      },
      {
        id: 'elena-price-close',
        text: '"Within limits. I won\'t destroy myself for you."',
        nextSceneId: 'party-elena-satisfied',
        isOptimal: false,
        tactic: 'conditional-acceptance',
        reaction: {
          text: '"Limits." She considers. "Fair enough. For now."',
          emotion: 'neutral',
          bodyLanguage: 'Conditional deal. Better than nothing.',
          scoreImpact: 15,
        },
      },
      {
        id: 'elena-price-optimal',
        text: '"Deal. But I expect you to answer when I call, too."',
        nextSceneId: 'party-elena-delighted',
        isOptimal: true,
        tactic: 'reciprocity',
        reaction: {
          text: 'She smiles. Genuine. "A two-way investment. I like you."',
          emotion: 'happy',
          bodyLanguage: 'You turned a debt into a partnership. Brilliant.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'party-circulation',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'You circulate. Touch conversations. Gather fragments.',
      },
      {
        text: 'Dominic\'s investors discuss "Project Lighthouse." Something big.',
      },
      {
        text: 'Victoria\'s father mentions "the succession question." Family politics.',
      },
      {
        text: 'Someone mentions your name. You don\'t catch who.',
      },
      {
        text: 'We\'re being discussed. Good or bad, we\'re on their radar.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-isabelle-dismissive',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Learning." Isabelle finishes her drink. Signals for another.',
        speakerId: 'isabelle',
        emotion: 'neutral',
      },
      {
        text: '"Good luck with that."',
        speakerId: 'isabelle',
        emotion: 'cold',
      },
      {
        text: 'She turns away. Conversation over.',
      },
      {
        text: 'Missed connection. She expected more from us.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-isabelle-neutral',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Only the first step." Isabelle agrees. "What\'s your second?"',
        speakerId: 'isabelle',
        emotion: 'neutral',
      },
      {
        text: '"That depends on what I observe."',
      },
      {
        text: '"Careful answer." She smiles slightly.',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: '"We\'ll see if you have the courage for step three."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: 'Neutral ground. She\'s watching to see what we do next.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-isabelle-surprised',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Homework." She turns fully toward you now.',
        speakerId: 'isabelle',
        emotion: 'curious',
      },
      {
        text: '"Most new guests don\'t bother. They assume wealth is the only credential."',
        speakerId: 'isabelle',
        emotion: 'neutral',
      },
      {
        text: '"You understand that information is the real currency here."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"We should talk more. Tomorrow. Breakfast."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'An invitation. From the woman who destroys corporations. Interesting.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-isabelle-impressed',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Dangerous." She repeats. "That\'s a compliment, coming from me."',
        speakerId: 'isabelle',
        emotion: 'happy',
      },
      {
        text: '"You\'re thinking about the system, not just the players."',
        speakerId: 'isabelle',
        emotion: 'knowing',
      },
      {
        text: '"That\'s rare. Harrison notices rare things."',
        speakerId: 'isabelle',
        emotion: 'serious',
      },
      {
        text: '"Stay sharp this weekend. I have a feeling about you."',
        speakerId: 'isabelle',
        emotion: 'smirking',
      },
      {
        text: 'A feeling. From the woman who predicts corporate collapses. File that away.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-elena-disappointed',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: 'You hand back the folder. Elena takes it. Face unreadable.',
      },
      {
        text: '"Disappointing." She tucks it away.',
        speakerId: 'elena',
        emotion: 'cold',
      },
      {
        text: '"I thought you understood opportunity. Perhaps I was wrong."',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: 'She walks away. You return to the party, empty-handed.',
      },
      {
        text: 'Safe play. But we lost something valuable tonight.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-elena-vague',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"The point is unpredictability." Elena watches the water.',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"But I\'ll tell you this: it won\'t be small. And it won\'t be easy."',
        speakerId: 'elena',
        emotion: 'serious',
      },
      {
        text: '"Still interested?"',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: 'You take the folder. "I\'m interested."',
      },
      {
        text: 'Undefined debt. Dangerous. But information is power.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-elena-satisfied',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Limits." Elena nods slowly.',
        speakerId: 'elena',
        emotion: 'neutral',
      },
      {
        text: '"I can work with limits. They show you\'re not stupid."',
        speakerId: 'elena',
        emotion: 'smirking',
      },
      {
        text: '"Keep the folder. Use it wisely."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: 'She disappears into the night. You\'re left with secrets and obligations.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-elena-delighted',
    backgroundId: 'office',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Two-way investment." Elena extends her hand. You shake it.',
        speakerId: 'elena',
        emotion: 'happy',
      },
      {
        text: '"Partnership. Rare around here. Most people only take."',
        speakerId: 'elena',
        emotion: 'knowing',
      },
      {
        text: '"Keep the folder. And my number. We\'ll need each other before this weekend ends."',
        speakerId: 'elena',
        emotion: 'serious',
      },
      {
        text: 'Equal footing with Elena Vance. That\'s power.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'party-millicent-appears',
  },
  {
    id: 'party-millicent-appears',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'mysterious',
    dialog: [
      {
        text: 'A voice behind you. Soft. Familiar.',
      },
      {
        text: '"You\'re surviving. That\'s more than most first-timers manage."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'Millicent Caldwell. Maris\'s twin. The "good" one.',
      },
      {
        text: 'She looks different here too. More guarded. Less light.',
      },
      {
        text: '"I wanted to warn you. Before tomorrow starts."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'Warn us? About what?',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'party-millicent-warning',
  },
  {
    id: 'party-millicent-warning',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'tense',
    dialog: [
      {
        text: '"Harrison\'s tests aren\'t what you expect." Millicent speaks quickly.',
        speakerId: 'millicent',
        emotion: 'serious',
      },
      {
        text: '"He doesn\'t test your skills. He tests your... values. Your breaking points."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: '"He\'ll offer you things. Success. Power. Revenge on people who hurt you."',
        speakerId: 'millicent',
        emotion: 'knowing',
      },
      {
        text: '"The real test is what you\'re willing to sacrifice for them."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: 'She\'s been through this. She knows what it costs.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'party-millicent-choice',
  },
  {
    id: 'party-millicent-choice',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Why are you telling me this?"',
      },
      {
        text: 'Millicent hesitates. "Because Maris asked me to watch you. And I... disagree with her methods."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: '"She wants you in the network. I want you to survive it."',
        speakerId: 'millicent',
        emotion: 'serious',
      },
      {
        text: '"Those aren\'t always the same thing."',
        speakerId: 'millicent',
        emotion: 'concerned',
      },
      {
        text: 'Twin sisters. Opposite goals. We\'re caught between them.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    dialogueChoices: [
      {
        id: 'millicent-trap',
        text: '"I can take care of myself."',
        nextSceneId: 'party-end-dismissive',
        isOptimal: false,
        tactic: 'pride',
        reaction: {
          text: 'She nods. Sad. "Everyone says that. At first."',
          emotion: 'sad',
          bodyLanguage: 'You rejected her help. She tried.',
          scoreImpact: -5,
        },
      },
      {
        id: 'millicent-subtle',
        text: '"Thank you for the warning. I\'ll be careful."',
        nextSceneId: 'party-end-neutral',
        isOptimal: false,
        tactic: 'gratitude',
        reaction: {
          text: '"Careful isn\'t enough. But it\'s a start."',
          emotion: 'neutral',
          bodyLanguage: 'Polite acknowledgment. Nothing more.',
          scoreImpact: 10,
        },
      },
      {
        id: 'millicent-close',
        text: '"What did Harrison offer you? What did you sacrifice?"',
        nextSceneId: 'party-end-personal',
        isOptimal: false,
        tactic: 'probing',
        reaction: {
          text: 'Pain flashes across her face. "My twin. Before she became... this."',
          emotion: 'sad',
          bodyLanguage: 'You touched a wound. Deep one.',
          scoreImpact: 15,
        },
      },
      {
        id: 'millicent-optimal',
        text: '"If you\'re willing to go against your sister—tell me what you really want from me."',
        nextSceneId: 'party-end-honest',
        isOptimal: true,
        tactic: 'direct',
        reaction: {
          text: 'She meets your eyes. "I want someone to beat the system. Not join it."',
          emotion: 'serious',
          bodyLanguage: 'You demanded honesty. She gave it.',
          scoreImpact: 25,
        },
      },
    ],
  },
  {
    id: 'party-end-dismissive',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"At first." Millicent steps back.',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"Good luck. You\'ll need it."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'She fades into the crowd. Blake reappears.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Was that Millicent? Maris\'s twin?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'We pushed away potential help. Pride costs.',
        speakerId: 'inner-voice',
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'day-one-end',
  },
  {
    id: 'party-end-neutral',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"A start." Millicent nods.',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: '"If you need me—I\'m usually in the library. Early mornings."',
        speakerId: 'millicent',
        emotion: 'knowing',
      },
      {
        text: 'She drifts away. Blake appears at your side.',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"You look like you learned something."',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'We have an ally. Maybe. Time will tell.',
        speakerId: 'inner-voice',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'day-one-end',
  },
  {
    id: 'party-end-personal',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"My twin." Millicent\'s voice breaks slightly.',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"Maris wasn\'t always... this. Harrison made her. Shaped her."',
        speakerId: 'millicent',
        emotion: 'sad',
      },
      {
        text: '"I tried to stop it. I failed. Now I try to... mitigate."',
        speakerId: 'millicent',
        emotion: 'neutral',
      },
      {
        text: 'Blake arrives. Millicent slips away.',
      },
      {
        text: 'Maris was made, not born. Harrison\'s prototype.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'day-one-end',
  },
  {
    id: 'party-end-honest',
    backgroundId: 'bar',
    sceneType: 'dialogue',
    pathId: 'day-one',
    dialog: [
      {
        text: '"Beat the system." You repeat.',
      },
      {
        text: '"Not destroy it. That\'s impossible. But change it. From inside."',
        speakerId: 'millicent',
        emotion: 'serious',
      },
      {
        text: '"Maris believes in the system. I believe it can be... redeemed."',
        speakerId: 'millicent',
        emotion: 'hopeful',
      },
      {
        text: '"If you get deep enough, you might be the one to do it."',
        speakerId: 'millicent',
        emotion: 'knowing',
      },
      {
        text: 'Blake approaches. Millicent squeezes your arm once and disappears.',
      },
      {
        text: 'Reformer versus true believer. Different Caldwell agenda entirely.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'day-one-end',
  },
  {
    id: 'day-one-end-retreat',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'peaceful',
    dialog: [
      {
        text: 'The Grove. Midnight.',
      },
      {
        text: 'Blake stares at the ceiling. "This is really happening. We\'re really here."',
        speakerId: 'blake',
        emotion: 'neutral',
      },
      {
        text: '"Tomorrow it gets real. Whatever that means."',
        speakerId: 'blake',
        emotion: 'concerned',
      },
      {
        text: 'Sleep comes slowly. Dreams of watchers in shadows.',
      },
      {
        text: 'Day one complete. The tests begin tomorrow.',
        speakerId: 'inner-voice',
        emotion: 'serious',
      },
    ],
    nextSceneId: 'network-morning-intro',
  },
  {
    id: 'day-one-end',
    backgroundId: 'apartment',
    sceneType: 'dialogue',
    pathId: 'day-one',
    mood: 'peaceful',
    dialog: [
      {
        text: 'Back at the Grove. Late night. The party continues without you.',
      },
      {
        text: 'Blake sprawls on the couch. "What did you learn?"',
        speakerId: 'blake',
        emotion: 'curious',
      },
      {
        text: 'You tell him. Elena\'s offer. Isabelle\'s interest. Millicent\'s warning.',
      },
      {
        text: '"So everyone wants something from us."',
        speakerId: 'blake',
        emotion: 'knowing',
      },
      {
        text: '"The question is—what do we want from them?"',
        speakerId: 'blake',
        emotion: 'serious',
      },
      {
        text: 'Good question. Tomorrow, we start answering it.',
        speakerId: 'inner-voice',
        emotion: 'knowing',
      },
    ],
    nextSceneId: 'network-morning-intro',
  },
];
