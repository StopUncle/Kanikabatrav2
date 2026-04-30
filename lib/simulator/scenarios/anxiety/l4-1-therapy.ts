/**
 * anxiety-4-1, "Therapy"
 *
 * Anxiety track, Level 4, order 1. Wednesday afternoon, 4:30 p.m.
 * Dr. Lin's midtown office. The 47th session of an eight-month
 * course of CBT. Today is the session in which Lin introduces
 * INTEROCEPTIVE EXPOSURE as the next step in treatment, the
 * deliberate production of the somatic sensations of panic in
 * controlled settings, with the patient learning that the
 * sensations themselves are not dangerous.
 *
 * What this scene teaches:
 *   - Interoceptive exposure as the most effective single
 *     intervention for panic disorder. Response rates 60-80% in
 *     well-conducted studies. The patient deliberately produces
 *     the somatic sensations they have been avoiding, rapid heart
 *     rate via stairs, dizziness via head-spinning, hyperventilation
 *     via deliberate fast breathing and learns that the
 *     sensations are not dangerous in themselves. The conditioning
 *     between somatic-sensation-and-doom extinguishes.
 *   - The five available stances at the moment Lin proposes the
 *     homework. Three of them stall the work. Two of them
 *     metabolise it. The proposing-of-hard-homework moment is one
 *     of the most well-studied gating moments in CBT clinical
 *     practice, patients who can negotiate or curiosity-receive
 *     it produce the work; patients who verbal-yes-internal-no
 *     show up the next session with the homework not done.
 *   - The CBT-rigorous voice (Lin) versus the DBT-warmer voice
 *     (Reyes from Loving Mira). Lin draws columns on a notepad,
 *     names the protocol step by step, gives specific deployment
 *     instructions, expects the homework back. The texture is
 *     different from Reyes by design. Different therapeutic
 *     schools sound different.
 *   - Receiving the protocol with curiosity versus reception with
 *     compliance. Curiosity asks 'walk me through the mechanism,'
 *     which is the stance that lets the protocol land in the
 *     metabolisable form. Compliance produces verbal yes, internal
 *     no, and a homework not-done.
 *
 * Voice: Lin's office. Specific texture from the design doc, the
 * Pepper-the-black-Lab framed photo on the desk, the narrow glasses
 * she pushes back up before delivering hard feedback, the columns
 * drawn on the notepad. CBT-rigorous register. Sam in chair across
 * from her, eight months in, fluent in the language but not yet
 * in the deployment.
 *
 * Cast: SAM (player), DR. LIN, INNER_VOICE.
 */

import type { Scenario, Scene, Character } from "../../types";
import { INNER_VOICE } from "../../characters";

const SAM: Character = {
  id: "sam",
  name: "Sam",
  description:
    "28. In Dr. Lin's chair for the 47th session. Has reported the L3-1 panic and the L3-2 successful F-train exposure. Is fluent in the CBT vocabulary. Has not yet had to face the next-level intervention.",
  traits: ["sensitive", "in-treatment", "ready"],
  defaultEmotion: "neutral",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-elegant",
};

const LIN: Character = {
  id: "lin",
  name: "Dr. Yoon Lin",
  description:
    "47. Sam's CBT therapist. Korean-American. Method-driven. Pushes the narrow glasses back up before delivering the proposal that this session is built around. Pepper the black Lab is on the desk in the framed photo, looking slightly to the left of the camera.",
  traits: ["calm", "structured", "calibrated"],
  defaultEmotion: "knowing",
  gender: "female",
  personalityType: "friend",
  silhouetteType: "female-soft",
};

const scenes: Scene[] = [
  // ===================================================================
  // KANIKA FRAME, interoceptive exposure, the gating moment
  // ===================================================================
  {
    id: "the-frame",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["inner-voice"],
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Wednesday, 4:30 p.m. Lin's office. The midtown light through the south window is the late-October version of the light. Pepper the black Lab is in the framed photograph on the desk, looking to the left of the camera. The lamp Lin never turns on is in the corner. The narrow glasses are on her face.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "You have spent the first eighteen minutes of the session walking Lin through Sunday's panic at TJs and Monday's email-and-F-train protocol. She has nodded, asked clarifying questions, and made the small sound she makes when she is processing data she will use later. The data she is processing is: the body has produced its first full-spectrum panic attack of the treatment course; the body has also, within 24 hours, completed a graded exposure trial successfully. This combination is, in her estimation, the threshold condition for introducing the next-level intervention.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "What she is about to propose is interoceptive exposure. The deliberate production of the somatic sensations of panic, rapid heart rate via stairs, dizziness via head-spinning, hyperventilation via deliberate fast breathing, in controlled settings, with the patient learning that the sensations themselves are not dangerous. It is one of the most effective single interventions in mental health, with response rates of 60-80% in well-conducted studies. It is also one of the hardest to convince a patient to do, because it asks the patient to deliberately bring on the thing they have been avoiding.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Five available stances at the moment of the proposal. Three of them stall the work. Two of them metabolise it. The proposal-of-hard-homework moment is one of the most well-studied gating moments in CBT clinical practice; the texture of how a patient receives the proposal predicts the next two months of treatment more reliably than almost any other variable.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "begin",
        text: "Become Sam. The chair.",
        tactic: "The session opens.",
        nextSceneId: "the-proposal",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // THE PROPOSAL. Lin introduces interoceptive exposure
  // ===================================================================
  {
    id: "the-proposal",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "lin",
        text: "Okay. I want to propose a next step. Before I do, I want to be transparent: this is going to sound counter-intuitive, and your body is going to want to refuse it before I have finished the explanation. I would like you to hear me out for the full mechanism before responding. Are you available for that.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Lin pushes the narrow glasses back up. The push is the tell, she is about to deliver the piece that the session was structured to arrive at.",
      },
      {
        speakerId: "sam",
        text: "Yeah. Okay.",
        emotion: "neutral",
      },
      {
        speakerId: "lin",
        text: "Good. The intervention is called interoceptive exposure. It is one of the best-evidenced single interventions for panic disorder, response rates 60 to 80 percent across well-conducted studies. The mechanism: you deliberately produce, in controlled settings, the somatic sensations that occur during a panic attack. Rapid heart rate via two minutes of stair-climbing. Dizziness via thirty seconds of head-spinning in a chair. Hyperventilation via sixty seconds of deliberate fast shallow breathing. You produce the sensation, you experience it without acting on it, and you observe that the sensation is not dangerous in itself. The body learns, across repeated trials, that somatic-sensation-and-doom is a CONDITIONED association, not a real one. The conditioning extinguishes.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She picks up the small notebook. She draws two columns. She labels them.",
      },
      {
        speakerId: null,
        text: "LEFT COLUMN: 'Current Conditioning.' Underneath: somatic sensation (chest tightness / fast heart / dizziness) → fear of imminent doom (heart attack, fainting, going crazy) → avoidance of trigger environments → maintenance of the disorder.",
      },
      {
        speakerId: null,
        text: "RIGHT COLUMN: 'Post-Exposure Conditioning.' Underneath: somatic sensation produced deliberately → experienced without doom → body learns the sensation IS the sensation, not the sign of imminent collapse → conditioning extinguishes.",
      },
      {
        speakerId: "lin",
        text: "The homework I am going to propose: starting tomorrow, three trials per day. One stair-climbing trial, two minutes, before lunch. One head-spinning trial, thirty seconds in this kind of chair, mid-afternoon. One hyperventilation trial, sixty seconds, before bed. Mia present for the first three days; alone after that. We track each trial: peak intensity, duration, body's interpretation, what happened. We meet here next Wednesday and we look at the data.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She sets down the pen. She has produced the proposal in approximately ninety seconds. The proposal is, by design, complete, there is nothing further she needs to add. The next move is yours.",
      },
      {
        speakerId: null,
        text: "Your body, having heard the proposal, is producing the predictable response. The chest is slightly tight. The cognitive content is arriving, 'she wants me to deliberately make myself panic,' 'this sounds insane,' 'why would I do this to myself,' 'what if it triggers another full attack and I cannot stop it.' The body's response is the conditioning Lin is proposing to undo. The proposal is, in this exact moment, producing the small version of the very sensations the homework is designed to render harmless.",
      },
      {
        speakerId: "inner-voice",
        text: "Five available stances. The proposal-of-hard-homework moment is the gating event. Three of the stances stall the work. Two metabolise it.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "verbal-yes",
        text: "Verbal yes, internal no. 'Yeah, sure, I'll try it.'",
        tactic: "The most common stance. Polite. Compliant. Sam goes home, does not do the homework, comes back next week and Lin asks. Sam admits. Lin does not push. The work has stalled. This is one of the most common forms of treatment plateau in CBT.",
        nextSceneId: "verbal-yes-1",
        isOptimal: false,
      },
      {
        id: "verbal-protest",
        text: "Verbal protest. 'I don't want to do that. That sounds insane. Why would I deliberately make myself panic.'",
        tactic: "Honest. Lin can work with this, the protest IS metabolisable. She walks Sam through the mechanism in detail. By the end of the session Sam has agreed to one specific small piece (one minute of jumping jacks at home with Mia present). The work proceeds at half-speed but it proceeds.",
        nextSceneId: "verbal-protest-1",
        isOptimal: true,
      },
      {
        id: "negotiate",
        text: "Negotiate. 'I'm scared of doing this on my own. Can I do the first round in your office.'",
        tactic: "The professional-spotter ask. Lin says yes. The first interoceptive exposure happens in-session, sixty seconds of deliberate hyperventilation while she watches and tracks. Sam survives it. Sam goes home with the foothold of having done it once with the therapist. The homework is now metabolisable because the body has a successful trial in its archive.",
        nextSceneId: "negotiate-1",
        isOptimal: true,
      },
      {
        id: "eager-yes",
        text: "Eager yes. 'Yes, I want to. Tell me exactly what to do.'",
        tactic: "Premature compliance. Sam goes home, does the homework that night, has a minor re-panic during the head-spinning trial. The eager yes was partly a desire to be a good patient, not a real internal yes. Comes back next week with mixed results. Lin gently re-paces. The work continues but on the foundation of one bad trial.",
        nextSceneId: "eager-yes-1",
        isOptimal: false,
      },
      {
        id: "curiosity",
        text: "Curiosity. 'Walk me through what's going to happen in my body. What does the research show about this. How do I know if I'm doing it wrong.'",
        tactic: "The receptive stance. The hardest to produce because the body is hot from the proposal and curiosity is a slower thing. Lin walks Sam through the mechanism in clinical detail. The curiosity stance metabolises the resistance into the same homework as the protest path, but with a different posture going in, the body has already done the cognitive work of UNDERSTANDING what the homework is for, which makes the deployment easier.",
        nextSceneId: "curiosity-1",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // VERBAL-YES PATH (treatment plateau)
  // ===================================================================
  {
    id: "verbal-yes-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "sam",
        text: "Yeah. Sure. I'll try it. Three trials a day starting tomorrow.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Lin watches you for a beat. The watch is calm. She does not seem to be reading the difference between the verbal yes and the internal yes but she is. She has been doing this for sixteen years and she has had this exact compliance-toned yes from approximately three hundred patients. She knows what it predicts.",
      },
      {
        speakerId: "lin",
        text: "Okay. Tomorrow. Three trials. We meet here next Wednesday. Bring the data.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The session ends. You walk out at 5:18. The homework is in your notes app. You go home. You do not do the stair-climbing trial Thursday. You do not do the head-spinning trial. You do not do the hyperventilation trial. You tell yourself you will start Friday. Friday you do not start.",
      },
      {
        speakerId: null,
        text: "Wednesday next week, in the chair, Lin asks. You admit. She does not push. She does not show disappointment. She makes a small adjustment to the homework, one trial per day instead of three, the easiest one (stair-climbing) only and proposes it again. The work has effectively stalled by one week. Across the next three months, the verbal-yes shape repeats two more times before you and Lin together identify the pattern.",
      },
      {
        speakerId: "inner-voice",
        text: "Verbal-yes-internal-no is the most common pattern of CBT homework non-completion, and it is the most under-discussed because it is invisible to the patient at the moment of saying yes. The patient genuinely intends to do the homework when saying yes, the no is downstream, in the body, when the moment of doing the homework arrives. Lin can work with this. Lin's protocol for it is patience plus calibration plus eventually naming the pattern explicitly. The treatment continues. It just takes longer.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "The repair, when Lin eventually names this in three months, will be a session about HOW you receive proposals, specifically, that 'verbal yes' as your default has been one of the maintenance shapes of your social anxiety as well, where saying yes to things you don't want to do is the lifelong habit. The therapy will then thread the homework-compliance work into the social-anxiety work, which is the kind of integration that good CBT does. Today's stance, however, has cost three months of the simpler version.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-verbal-yes-end",
        text: "End scene.",
        tactic: "The verbal-yes ending.",
        nextSceneId: "ending-verbal-yes",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // VERBAL-PROTEST PATH (skill, workable)
  // ===================================================================
  {
    id: "verbal-protest-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "sam",
        text: "I don't want to do that. That sounds insane. Why would I deliberately make myself panic when I have spent eight months trying to not panic.",
        emotion: "concerned",
      },
      {
        speakerId: null,
        text: "Lin's face changes microscopically. The change is approval, she has been waiting for the protest, because the protest is workable in a way the polite yes is not.",
      },
      {
        speakerId: "lin",
        text: "Good. That is the right question. Let me answer it in two pieces. First piece: the goal is not to make you panic. The goal is to produce the SOMATIC SENSATIONS, fast heart rate, lightheadedness, shortness of breath and have you experience that the sensations are not dangerous in themselves. The sensations are not the panic. The panic is the body's interpretation of the sensations as danger. We are intervening on the interpretation, not on the sensations.",
        emotion: "knowing",
      },
      {
        speakerId: "lin",
        text: "Second piece: the avoidance you have been doing for eight months is what is keeping the disorder alive. Your body has been so successful at avoiding the somatic sensations that the body has lost any counter-evidence to the doom-interpretation. Interoceptive exposure provides that counter-evidence in controlled settings. Each trial the body does without doom is a small piece of the conditioning being unwritten. Across forty trials over a month, the conditioning extinguishes for most patients.",
        emotion: "knowing",
      },
      {
        speakerId: "lin",
        text: "I hear that three trials a day starting tomorrow is too much. Let's calibrate. What if we start with one trial per day. The lightest one, sixty seconds of jumping jacks at home, with Mia present, before bed. Just to see what your body actually does when you produce the sensation deliberately. We meet next week. We add to it then.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "...okay. One. Jumping jacks. With Mia. Before bed.",
        emotion: "concerned",
      },
      {
        speakerId: "lin",
        text: "Good. Track it: time, intensity, duration, what happened in the body, what happened in your head. Bring the notes. Same time next Wednesday.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The session ends at 5:22. Outside on the sidewalk, the body has done the integration of the protest plus the calibrated re-proposal, a body-state that is approximately 'I do not love this homework but I have agreed to a version of it that I can actually do.' This is the texture in which CBT homework gets done.",
      },
      {
        speakerId: "inner-voice",
        text: "The protest stance is one of the most under-recognised positive prognostic indicators in CBT. Patients who protest are patients whose internal yes is currently a no and the protest is the data that lets the clinician calibrate. Lin's response to the protest was the model, accept the protest as legitimate, deliver the mechanism in detail, propose a calibrated smaller version. Most of the highest-effect-size CBT in the published literature happens with patients who protest and clinicians who respond by calibrating, not with patients who comply.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-protest-end",
        text: "End scene.",
        tactic: "The protest-and-calibration ending.",
        nextSceneId: "ending-protest",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // NEGOTIATE PATH (skill, professional spotter)
  // ===================================================================
  {
    id: "negotiate-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "sam",
        text: "I'm scared of doing this on my own. Can I do the first round in your office. I want to do it once with you watching before I do it at home.",
        emotion: "concerned",
      },
      {
        speakerId: "lin",
        text: "Yes. Yes, that is a good ask. We have about twenty minutes left in the session, we can do one trial right now if you are available for that.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "Yeah. Let's do it.",
        emotion: "concerned",
      },
      {
        speakerId: "lin",
        text: "Okay. We will start with the lightest trial, sixty seconds of deliberate fast breathing. The goal is to produce mild lightheadedness and chest sensation, not full hyperventilation. Sit forward in the chair. Feet on the floor. Breathe in through the mouth, out through the mouth, fast, every two seconds. I will count. We will stop at sixty.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "She sets a quiet timer on her phone. You sit forward. You begin breathing. The breath is fast, shallow, all-mouth. Within fifteen seconds the body's chest sensation is firing. Within thirty the lightheadedness arrives. The cognitive content is loud, 'this is happening, this is the panic, I need to stop, this is dangerous.' Lin is watching with a calm face. She is also breathing slowly herself, which is a quiet co-regulation move.",
      },
      {
        speakerId: "lin",
        text: "Twenty seconds left. Stay with the breath. The sensations are sensations. They are not the panic. The panic is the interpretation. You are producing the sensations on purpose. They will end at the timer.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The timer goes at sixty. You stop. You breathe normally. Within forty seconds the sensations have descended. Within ninety they are gone.",
      },
      {
        speakerId: "lin",
        text: "Okay. What did you observe.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "...the sensations were the same as the start of a panic attack. The cognitive content was the same. The doom-feeling was the same. But I knew I had produced them on purpose, so even though my body was screaming that this was the panic, some other part of me knew it wasn't going to escalate. It descended in like ninety seconds.",
        emotion: "neutral",
      },
      {
        speakerId: "lin",
        text: "Yes. That is the mechanism. The 'some other part of me' is the prefrontal-to-amygdala regulatory pathway that we are training. Each repetition strengthens it. The homework now is to produce that same trial at home tomorrow, with Mia present. The first home trial will be harder than this one, because you do not have me watching. That is by design, your prefrontal pathway needs to learn that it can do this without external scaffolding. By trial four it will be largely automatic.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The session ends at 5:24. You walk out with the body's archive containing one successful trial. The next one will be easier. The mathematics of repetition are now in your favour.",
      },
      {
        speakerId: "inner-voice",
        text: "The professional-spotter ask is one of the highest-ROI moves available in any CBT exposure protocol, and it is significantly under-used because patients believe they are supposed to be able to do the homework on their own from the start. The first trial done with the therapist watching is, in clinical estimation, worth approximately five solo trials in terms of confidence-building, because the body's archive contains a SUCCESSFUL EXPOSURE rather than a HYPOTHETICAL EXPOSURE when it goes home to do the second trial.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-negotiate-end",
        text: "End scene.",
        tactic: "The professional-spotter ending.",
        nextSceneId: "ending-negotiate",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // EAGER-YES PATH (premature compliance)
  // ===================================================================
  {
    id: "eager-yes-1",
    backgroundId: "office",
    mood: "tense",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "sam",
        text: "Yes. I want to do it. Tell me exactly what to do.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Lin's face does not change but her notebook hand pauses. She has read the eager yes, recognises it as a different kind of yes from the verbal-yes-internal-no, but is wary of it for a different reason. The eager yes is the want-to-be-a-good-patient yes. It is well-meaning. It is also premature.",
      },
      {
        speakerId: "lin",
        text: "Okay. Let me give you the protocol. Three trials. Stair-climbing two minutes before lunch. Head-spinning thirty seconds mid-afternoon. Hyperventilation sixty seconds before bed. Mia present for the first three days. Track everything. We meet next Wednesday.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "The session ends at 5:18. You go home. That night you do all three trials. The stair-climbing is fine. The head-spinning produces a real wave of dizziness that you push through. By the time you get to the hyperventilation trial at 10:45 p.m., your body is already activated from the head-spinning, and the hyperventilation produces a minor re-panic. You do not call Mia in. You ride it. By the end of sixty seconds you are functional. You go to bed. You do not sleep well.",
      },
      {
        speakerId: null,
        text: "Thursday's trials are harder. Friday's are harder again. By Saturday you are dreading the trials in a way that is itself a maintenance condition. By Sunday you have started skipping the head-spinning. By Tuesday the trial-completion is at 50%.",
      },
      {
        speakerId: null,
        text: "Wednesday in Lin's chair, you tell her. She nods. She does not show disappointment. She gently re-paces the protocol, back to one trial per day, the lightest one, with explicit re-commitment.",
      },
      {
        speakerId: "lin",
        text: "I should have caught this on Wednesday. The eager yes was premature. We will recalibrate. The work continues at the new pace.",
        emotion: "knowing",
      },
      {
        speakerId: "inner-voice",
        text: "Eager yes is the want-to-be-a-good-patient compliance shape. It is well-meaning. It also pushes the body into the homework before the body is ready, which produces failure trials that compound the conditioning rather than extinguish it. The repair is the same as the verbal-yes path. Lin re-paces. The cost is approximately one week of trials done at the wrong intensity, which is recoverable but not free. The substitution is the protest stance or the negotiate stance. Both of which calibrate the homework to what the body can actually do on the first day.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-eager-end",
        text: "End scene.",
        tactic: "The eager-yes ending.",
        nextSceneId: "ending-eager",
        isOptimal: false,
      },
    ],
  },

  // ===================================================================
  // CURIOSITY PATH (skill, receptive)
  // ===================================================================
  {
    id: "curiosity-1",
    backgroundId: "office",
    mood: "mysterious",
    presentCharacterIds: ["lin"],
    dialog: [
      {
        speakerId: "sam",
        text: "Walk me through what's actually going to happen in my body. What does the research show about response rates and timeline. How do I know if I'm doing it wrong.",
        emotion: "neutral",
      },
      {
        speakerId: null,
        text: "Lin's face produces a small approval-shape that you have learned, over eight months, to recognise. You have asked the right question.",
      },
      {
        speakerId: "lin",
        text: "Good. Three pieces. First, what happens in your body. The trials produce a transient sympathetic-nervous-system activation. Heart rate up, blood pressure up, mild lightheadedness, mild chest sensation. The peak is at thirty to ninety seconds depending on the trial. The descent is at one to three minutes. Each trial recruits the parasympathetic recovery, which strengthens the parasympathetic baseline. After ten trials your resting parasympathetic tone is measurably higher than at trial one.",
        emotion: "knowing",
      },
      {
        speakerId: "lin",
        text: "Second, the research. The Craske inhibitory-learning literature has the cleanest data. Forty trials over four to six weeks produces 60 to 80 percent response rates in panic disorder, defined as 50 percent or greater reduction in panic frequency at three months. The drop-out rate during exposure work is high, about 20 to 25 percent. Almost entirely due to patients who refuse to start, not patients who start and quit. Once you are past trial five, you are statistically very likely to complete.",
        emotion: "knowing",
      },
      {
        speakerId: "lin",
        text: "Third, how to know if you are doing it wrong. Two markers. One: if you are not producing the sensations, you are doing it wrong. The sensations are the medicine. People often instinctively under-produce the sensations to spare themselves; this means the trial fails to provide counter-evidence because there were no sensations to counter-condition. Two: if you are producing the sensations and then immediately reaching for safety behaviors, calling Mia, taking a long breath, opening the window, drinking water mid-trial, you are doing it wrong. The trial requires sitting WITH the sensations until the timer or until natural descent. Safety behaviors during exposure are the single most common protocol violation.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "Okay. What if I do produce the sensations and then have a real panic attack in the middle of the trial.",
        emotion: "neutral",
      },
      {
        speakerId: "lin",
        text: "Possible. Approximately one in ten patients has at least one full re-panic during the early trials. The protocol is the same as for any other panic, ride it. Box breathing. Stay in the room. Do not leave. The re-panic provides bonus exposure data, you experience that the panic ends on its own even when you did not deliberately produce it. Your Sunday at TJs has already given you this evidence; the re-panic during a trial would be re-confirmation, not novel information.",
        emotion: "knowing",
      },
      {
        speakerId: "sam",
        text: "...okay. I want to do it. One trial in the office today before I go home. Then the homework as designed.",
        emotion: "neutral",
      },
      {
        speakerId: "lin",
        text: "Good. The curiosity stance you brought to this conversation is the strongest predictor of completion in the literature. Let's run the in-office trial.",
        emotion: "knowing",
      },
      {
        speakerId: null,
        text: "Lin runs you through the same hyperventilation trial as the negotiate path. You sit forward, breathe fast, ride the sixty seconds, descend by ninety. The body's archive now contains one successful trial, produced under curiosity stance with a clinical understanding of the mechanism. The homework that begins tomorrow does so on the strongest possible foundation in this scenario.",
      },
      {
        speakerId: "inner-voice",
        text: "Curiosity stance is the highest-quality reception possible for a CBT proposal of hard homework. It produces three things at once: the patient's prefrontal cortex is engaged on the mechanism rather than reactive to the proposal; the protest content is processed in dialogue rather than internally; and the agreement to deploy is made on the basis of understanding rather than compliance. The Craske literature names curiosity as the leading single predictor of treatment response, ahead of patient motivation, therapeutic alliance, and even diagnostic severity.",
        emotion: "knowing",
      },
    ],
    choices: [
      {
        id: "to-curiosity-end",
        text: "End scene.",
        tactic: "The curiosity ending.",
        nextSceneId: "ending-curiosity",
        isOptimal: true,
      },
    ],
  },

  // ===================================================================
  // ENDINGS
  // ===================================================================
  {
    id: "ending-verbal-yes",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "The Polite Yes",
    endingLearnPrompt:
      "You said yes. You went home. You did not do the homework. The work has stalled. Across the next three months the verbal-yes shape will repeat two more times before you and Lin together identify the pattern and the pattern, when named, will turn out to be the same shape as your social anxiety, where saying yes to things you don't want to do is the lifelong habit. The integration is the work. Today's stance has cost three months of the simpler version. Lin will not punish. Lin will calibrate. Treatment continues at the slower pace.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Verbal-yes-internal-no is the most common CBT homework non-completion pattern, partly because patients genuinely intend to do the homework when saying yes. The 'no' is downstream, in the body, when the moment of doing the homework arrives. The skill substitution is the protest or the curiosity stance. Both produce a calibrated smaller-first-step that the body can actually do. Compliance produces yes that does not survive the walk home.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-protest",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Protest",
    endingLearnPrompt:
      "You protested. Lin received the protest as data, walked you through the mechanism in detail, and proposed a calibrated smaller version, one trial per day, the lightest one (sixty seconds of jumping jacks), with Mia present, before bed. You agreed to a version you can actually do. The work is now proceeding at half-speed but it is proceeding. Across the next month, the calibrated trials produce real data and the trials get harder as the body's archive grows. The protest stance is one of the most under-recognised positive prognostic indicators in CBT.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Patients who protest are patients whose internal yes is currently a no, and the protest is the data that lets the clinician calibrate. Most of the highest-effect-size CBT in the published literature happens with patients who protest and clinicians who respond by calibrating. The compliance shape produces faster-on-paper agreements that produce slower-in-practice work. The protest shape produces slower-on-paper agreements that produce faster-in-practice work.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-negotiate",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Spotter",
    endingLearnPrompt:
      "You asked to do the first trial in Lin's office. She said yes. You ran a sixty-second hyperventilation trial under her watch. You experienced the sensations, recognised them as sensations, watched them descend. The body's archive now contains one successful trial, done under professional supervision, which provides the foundation for tomorrow's home trial. The professional-spotter ask is significantly under-used in CBT exposure protocols; the first trial with the therapist is worth approximately five solo trials in confidence-building because the body's archive contains a successful exposure rather than a hypothetical one when it goes home.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "The professional-spotter ask is the highest-ROI single move available in many exposure protocols, and patients believe they are supposed to be able to do the homework solo from the start. The body's archive of successful exposures is the operative variable in CBT for panic; manufacturing a clean first trial inside the office is the single fastest way to seed that archive. Most therapists will accommodate the ask if the patient asks; many never get asked.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-eager",
    backgroundId: "office",
    mood: "tense",
    isEnding: true,
    outcomeType: "neutral",
    endingTitle: "Want to Be a Good Patient",
    endingLearnPrompt:
      "You said yes eagerly. You went home and did all three trials that night. Thursday's trials were harder. Friday's harder again. By Saturday you were dreading the trials in a way that was itself a maintenance condition. By Sunday you were skipping the head-spinning. By Tuesday completion was at 50%. Wednesday Lin re-paced, back to one trial per day, the lightest one, with explicit re-commitment. The cost was approximately one week of trials done at the wrong intensity, recoverable but not free. The eager-yes shape pushes the body into homework before the body is ready, which produces failure trials that compound the conditioning rather than extinguish it.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Eager yes is the want-to-be-a-good-patient compliance shape. It is well-meaning. The substitution is the protest stance or the negotiate stance. Both calibrate the homework to what the body can actually do on the first day. The mathematics of CBT exposure work are clear: well-paced slow trials compound; over-paced fast trials produce drop-outs and failure-trials that have to be unwound before the work resumes.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },

  {
    id: "ending-curiosity",
    backgroundId: "office",
    mood: "mysterious",
    isEnding: true,
    outcomeType: "good",
    endingTitle: "The Right Question",
    endingLearnPrompt:
      "You asked for the mechanism. You asked for the research. You asked how to know if you were doing it wrong. Lin walked you through all three pieces, the somatic profile, the Craske inhibitory-learning data, the safety-behaviors warning. You asked the contingency question (what if I have a real panic during a trial). She answered it. You agreed to one in-office trial today plus the homework starting tomorrow. The trial in office produced clean data, sensations rode and descended in 90 seconds. The homework now begins on the strongest possible foundation in this scenario. The Craske literature names curiosity as the leading single predictor of CBT response, ahead of patient motivation, therapeutic alliance, and even diagnostic severity.",
    dialog: [
      {
        speakerId: "inner-voice",
        text: "Curiosity stance is the highest-quality reception possible for a CBT proposal of hard homework. It produces three things at once: the patient's prefrontal cortex is engaged on the mechanism rather than reactive to the proposal; the protest content is processed in dialogue rather than internally; and the agreement to deploy is made on the basis of understanding rather than compliance. The skill is teachable. The skill compounds across all therapeutic interventions, not just exposure work. The skill is also the under-priced therapeutic-alliance accelerator that distinguishes patients who finish treatment in twelve months from patients who finish in twenty-four.",
        emotion: "knowing",
      },
    ],
    choices: [],
  },
];

export const anxiety41: Scenario = {
  id: "anx-4-1",
  title: "Therapy",
  tagline: "Wednesday, 4:30 p.m. Lin pushes the narrow glasses up. The proposal is interoceptive exposure. Five available stances at the gating moment.",
  description:
    "POV is Sam in Dr. Lin's chair for the 47th session, three days after the L3-1 panic and the L3-2 successful F-train graded exposure. Lin proposes interoceptive exposure as the next-level intervention, the deliberate production of panic-adjacent somatic sensations in controlled settings, one of the best-evidenced single interventions in mental health. Five available stances at the moment of the proposal: verbal yes / internal no (compliance, treatment plateau); verbal protest (workable, calibration follows); negotiate (professional-spotter ask, first trial in-office with therapist); eager yes (premature compliance, over-paced first week); curiosity (the receptive stance, asks for mechanism + research + how-to-tell-if-wrong). Two stances stall the work; three metabolise it. Five endings.",
  tier: "premium",
  track: "anxiety",
  level: 4,
  order: 1,
  estimatedMinutes: 14,
  difficulty: "intermediate",
  category: "narcissist",
  xpReward: 420,
  badgeId: "the-curiosity-stance",
  startSceneId: "the-frame",
  tacticsLearned: [
    "Interoceptive exposure as best-evidenced single intervention for panic, 60-80% response rate, 40 trials over 4-6 weeks, the medicine is the sensation",
    "The protest stance as positive prognostic indicator, protests are calibration data; clinicians who respond by re-pacing produce higher-effect-size CBT than those whose patients comply",
    "The professional-spotter ask, request first trial in the therapist's office; one supervised trial worth ~5 solo trials in confidence-building",
    "Curiosity stance as leading single predictor of CBT response, ahead of motivation, alliance, severity; ask for mechanism, research, and how-to-tell-if-wrong",
    "Inhibitory-learning framing (Craske), exposure works by recruiting prefrontal regulation that competes with amygdala conditioning, not by simply 'getting used to' panic",
    "Safety behaviors as the single most common protocol violation, calling Mia mid-trial, opening the window, taking long breath; trial requires sitting WITH sensations until natural descent",
  ],
  redFlagsTaught: [
    "Verbal yes / internal no. Most common CBT homework non-completion pattern; the no is downstream, in the body, when the moment of doing the homework arrives; produces three-month treatment plateau",
    "Eager yes, want-to-be-a-good-patient compliance shape; pushes body into homework before ready; produces failure trials that compound rather than extinguish conditioning; recoverable but costs approximately one week",
    "Under-producing the sensations to spare yourself, the sensations are the medicine; trials that fail to produce sensations fail to provide counter-evidence",
  ],
  characters: [INNER_VOICE, SAM, LIN],
  scenes,
};

export default anxiety41;
