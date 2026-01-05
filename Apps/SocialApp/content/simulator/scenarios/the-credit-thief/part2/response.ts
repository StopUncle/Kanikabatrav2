// Part 2: The Response
// Confrontation, escalation, and manager routes

import type { Scene } from '../../../types';

export const responseScenes: Scene[] = [
  // Scene 1: Confront Alex
  {
    id: 'confront-alex-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You catch Alex in a quiet corner.',
      },
      {
        text: '"Alex. We need to talk about the presentation."',
      },
      {
        text: '"Oh, that? It went great, right? Marcus loved it."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: '"You presented my work as yours."',
      },
      {
        text: 'Beat. Alex\'s face flickers. Then recovers.',
      },
      {
        text: '"I said \'we.\' It was a team effort. I didn\'t realize you wanted individual recognition."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Pause.',
      },
      {
        text: '"That\'s kind of... territorial, don\'t you think?"',
        speakerId: 'alex',
        emotion: 'smirking',
      },
      {
        text: 'The flip. Now YOU\'RE the problem for noticing.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'confront-alex-1-a',
        text: '"There was no \'we.\' I need you to correct the record with Marcus."',
        nextSceneId: 'alex-response-firm',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Clear, direct, non-negotiable.',
      },
      {
        id: 'confront-alex-1-b',
        text: '"I have emails showing it was my work. Want to handle this, or should I?"',
        nextSceneId: 'alex-response-evidence',
        xpBonus: 12,
        feedback: 'Evidence as leverage. Smart play.',
      },
      {
        id: 'confront-alex-1-c',
        text: '"Maybe I\'m overreacting. Let\'s just move on."',
        nextSceneId: 'alex-response-back-down',
        xpBonus: 0,
        feedback: 'TRAP: You just validated their theft. They\'ll do it again.',
      },
    ],
  },

  // Scene 2a: Alex Firm Response
  {
    id: 'alex-response-firm',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex\'s mask slips slightly.',
      },
      {
        text: '"Look. I\'m not going to walk into Marcus\'s office and say \'Actually, that was someone else\'s idea.\'"',
        speakerId: 'alex',
        emotion: 'cold',
      },
      {
        text: '"It would look ridiculous. And it wouldn\'t change anything anyway."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Translation: I\'m not giving this back.',
      },
      {
        text: '"Tell you what. Next project, I\'ll make sure you get the spotlight. We\'ll call it even."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: '"Even." They\'re offering you your own work back, next time.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'alex-firm-a',
        text: '"That\'s not how this works. Fix it now."',
        nextSceneId: 'alex-refuses',
        xpBonus: 10,
        feedback: 'Holding the line. They won\'t comply, but they know you won\'t fold.',
      },
      {
        id: 'alex-firm-b',
        text: '"If you don\'t correct this, I\'ll take it to Priya."',
        nextSceneId: 'escalation-warning',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Clear escalation path. Ball in their court.',
      },
      {
        id: 'alex-firm-c',
        text: '"Fine. But I want that in writing."',
        nextSceneId: 'alex-deal',
        xpBonus: 5,
        feedback: 'Accepting a bad deal, but at least there\'s a record.',
      },
    ],
  },

  // Scene 2b: Alex Evidence Response
  {
    id: 'alex-response-evidence',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex\'s eyes narrow briefly.',
      },
      {
        text: '"Emails? What, you\'ve been building a case?"',
        speakerId: 'alex',
        emotion: 'cold',
      },
      {
        text: '"That\'s... honestly a little paranoid."',
        speakerId: 'alex',
        emotion: 'smirking',
      },
      {
        text: 'They\'re trying to make you feel crazy for documenting.',
      },
      {
        text: '"Look, if you want to make this a thing, that\'s your choice. I thought we had a good working relationship."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'The threat under the diplomacy: nice relationship you have here. Shame if something happened to it.',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'alex-evidence-a',
        text: '"We did. Until you took credit for my work."',
        nextSceneId: 'alex-refuses',
        xpBonus: 12,
        isOptimal: true,
        feedback: 'OPTIMAL: Clean, direct, doesn\'t take the bait.',
      },
      {
        id: 'alex-evidence-b',
        text: '"I\'m not making it a thing. I\'m asking you to fix it."',
        nextSceneId: 'escalation-warning',
        xpBonus: 10,
        feedback: 'Reframing their accusation. Good move.',
      },
    ],
  },

  // Scene 2c: Back Down
  {
    id: 'alex-response-back-down',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex visibly relaxes.',
      },
      {
        text: '"Exactly. We\'re all on the same team here. Water under the bridge."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'They walk away. You just gave permission.',
      },
      {
        text: 'Silence is acceptance. You accepted being stolen from.',
      },
    ],
    nextSceneId: 'ending-silent-treatment',
  },

  // Scene 3: Alex Refuses
  {
    id: 'alex-refuses',
    backgroundId: 'office',
    dialog: [
      {
        text: '"Do what you need to do."',
        speakerId: 'alex',
        emotion: 'cold',
      },
      {
        text: 'They walk away.',
      },
      {
        text: 'No apology. No correction. You\'ll have to escalate.',
      },
    ],
    nextSceneId: 'manager-route-1',
  },

  // Scene 4: Escalation Warning
  {
    id: 'escalation-warning',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex pauses.',
      },
      {
        text: '"You really want to make this a whole thing? With Priya?"',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: '"That\'s going to create problems for both of us."',
        speakerId: 'alex',
        emotion: 'concerned',
      },
      {
        text: 'A flash of concern. Good. They don\'t want this escalated.',
      },
      {
        text: '"What do you want?"',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Finally. A real question.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'escalation-a',
        text: '"Tell Marcus the truth. I led the project."',
        nextSceneId: 'alex-concession',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Clear demand. They have to decide.',
      },
      {
        id: 'escalation-b',
        text: '"Send an email clarifying my contribution. CC Priya."',
        nextSceneId: 'alex-email-deal',
        xpBonus: 12,
        feedback: 'Paper trail solution. Smart.',
      },
      {
        id: 'escalation-c',
        text: '"Just don\'t do it again."',
        nextSceneId: 'alex-deal',
        xpBonus: 5,
        feedback: 'Weak. No correction, just a promise.',
      },
    ],
  },

  // Scene 5: Alex Concession
  {
    id: 'alex-concession',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex sighs.',
      },
      {
        text: '"Fine. I\'ll... mention to Marcus that you led the technical work."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Not enthusiastic. But compliant.',
      },
      {
        text: '"But I\'m not sending some formal correction email. That makes me look incompetent."',
        speakerId: 'alex',
        emotion: 'cold',
      },
      {
        text: 'They\'re saving face. But you\'re getting something.',
      },
    ],
    nextSceneId: 'resolution-partial',
  },

  // Scene 5b: Email Deal
  {
    id: 'alex-email-deal',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Alex nods slowly.',
      },
      {
        text: '"An email. Fine. I can do that."',
        speakerId: 'alex',
        emotion: 'neutral',
      },
      {
        text: 'Later that day, you receive it:',
      },
      {
        text: '"Just wanted to clarify that the legacy system solution was primarily developed by [you], with my support on the presentation."',
      },
      {
        text: 'CC: Priya, Marcus.',
      },
      {
        text: 'Paper trail established. Your name is now in the right place.',
      },
    ],
    nextSceneId: 'ending-warning-shot',
  },

  // Scene 5c: Weak Deal
  {
    id: 'alex-deal',
    backgroundId: 'office',
    dialog: [
      {
        text: '"I appreciate you being reasonable about this."',
        speakerId: 'alex',
        emotion: 'happy',
      },
      {
        text: 'They\'re relieved. You let them off easy.',
      },
      {
        text: 'No correction. No email. Just a promise that they\'ll do better "next time."',
      },
      {
        text: 'Thieves who get away with it once always try again.',
      },
    ],
    nextSceneId: 'ending-lesson-learned',
  },

  // Scene 6: Manager Route
  {
    id: 'manager-route-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Priya\'s office.',
      },
      {
        text: '"So you\'re saying Alex presented your work as theirs?"',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: '"Yes. I have emails and documentation showing I led the solution."',
      },
      {
        text: 'Priya pulls up her records.',
      },
      {
        text: '"I do remember you leading this. I even sent you that \'great work\' email."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Pause.',
      },
      {
        text: '"The question is how to handle it."',
        speakerId: 'priya',
        emotion: 'concerned',
      },
      {
        text: 'Does she help? Or does she make it "go away"?',
        
        emotion: 'concerned',
      },
    ],
    choices: [
      {
        id: 'manager-1-a',
        text: '"Can you clarify with Marcus who actually did the work?"',
        nextSceneId: 'priya-intervenes',
        xpBonus: 15,
        isOptimal: true,
        feedback: 'OPTIMAL: Letting her handle it is cleaner.',
      },
      {
        id: 'manager-1-b',
        text: '"What would you recommend I do?"',
        nextSceneId: 'priya-advice',
        xpBonus: 10,
        feedback: 'Getting her perspective. Smart to ask.',
      },
      {
        id: 'manager-1-c',
        text: '"I just want you to know what happened. For my records."',
        nextSceneId: 'priya-noted',
        xpBonus: 8,
        feedback: 'Informing without asking for action. Minimal but documented.',
      },
    ],
  },

  // Scene 7: Priya Intervenes
  {
    id: 'priya-intervenes',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Priya nods.',
      },
      {
        text: '"I\'ll have a conversation with Marcus. Casually mention that there was some confusion about attribution."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: '"I\'ll also have a word with Alex. This isn\'t the first time I\'ve heard concerns."',
        speakerId: 'priya',
        emotion: 'concerned',
      },
      {
        text: 'Not the first time. Interesting.',
      },
      {
        text: '"Leave it with me."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
    ],
    nextSceneId: 'ending-manager-save',
  },

  // Scene 7b: Priya Advice
  {
    id: 'priya-advice',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Priya considers.',
      },
      {
        text: '"Honestly? The direct email to Marcus could come across as... territorial. Even if you\'re right."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: '"Let me handle it. I\'ll find a natural moment to clarify attribution."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: '"And going forward—make sure your name is on everything before it leaves your hands."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'Practical advice. She\'s on your side.',
      },
    ],
    nextSceneId: 'ending-manager-save',
  },

  // Scene 7c: Priya Noted
  {
    id: 'priya-noted',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Priya nods.',
      },
      {
        text: '"I appreciate you telling me. I\'ll keep it in mind."',
        speakerId: 'priya',
        emotion: 'neutral',
      },
      {
        text: 'She doesn\'t offer to intervene. But she knows.',
      },
      {
        text: 'Your manager is now aware. If it happens again, there\'s a pattern.',
      },
    ],
    nextSceneId: 'ending-lesson-learned',
  },

  // Scene 8: VP Direct
  {
    id: 'vp-direct-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'You draft an email to Marcus:',
      },
      {
        text: '"Hi Marcus—Wanted to share some context on the legacy system solution. I led the analysis and designed the architecture. Happy to walk through the technical details if helpful."',
      },
      {
        text: 'You attach your documentation.',
      },
      {
        text: 'Send.',
      },
      {
        text: 'Direct approach. High visibility. High risk if it looks like you\'re just grabbing credit.',
        
        emotion: 'concerned',
      },
    ],
    nextSceneId: 'vp-response-1',
  },

  // Scene 9: VP Response
  {
    id: 'vp-response-1',
    backgroundId: 'office',
    dialog: [
      {
        text: 'An hour later. Marcus replies.',
      },
      {
        text: '"Thanks for the context. I had assumed it was a joint effort. Good to know you led the technical side."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: '"Let\'s chat about the Q3 project. I\'d like your input."',
        speakerId: 'marcus',
        emotion: 'neutral',
      },
      {
        text: 'The record is corrected. And you just got invited to the next opportunity.',
      },
    ],
    nextSceneId: 'ending-full-recovery',
  },

  // Resolution Scenes
  {
    id: 'resolution-partial',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Days pass. You hear through Jordan that Alex mentioned something to Marcus.',
      },
      {
        text: '"Oh, the technical design? Yeah, that was more [your name]\'s area. I focused on the presentation."',
        speakerId: 'jordan',
        emotion: 'neutral',
      },
      {
        text: 'Weak correction. But it\'s something.',
      },
      {
        text: 'Partial recovery. Better than nothing.',
      },
    ],
    nextSceneId: 'future-protection',
  },

  {
    id: 'future-protection',
    backgroundId: 'office',
    dialog: [
      {
        text: 'Whether you recovered the credit or not, you\'ve learned something.',
      },
      {
        text: 'Never again.',
      },
      {
        text: 'You start implementing new practices:',
      },
      {
        text: '• Send progress updates with YOUR name in the subject',
      },
      {
        text: '• CC key stakeholders on deliverables',
      },
      {
        text: '• Build direct relationships with leadership',
      },
      {
        text: 'Some lessons cost. This one did. But you won\'t pay this price again.',
        
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'future-a',
        text: 'Implement full protection system.',
        nextSceneId: 'ending-lesson-learned',
        xpBonus: 10,
        isOptimal: true,
        feedback: 'OPTIMAL: Never again. Paper trail everything.',
      },
    ],
  },
];
