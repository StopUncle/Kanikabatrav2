'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  customerName: string
  customerEmail: string
  orderId: string
}

interface FormData {
  // Basic Information
  preferredName: string
  age: string
  timezone: string
  availability: string[]
  urgency: string

  // Background & Context
  currentSituation: string
  primaryChallenges: string
  previousTherapy: string

  // Mental Health Screening
  mentalHealthHistory: string
  currentMedication: string
  suicidalThoughts: string
  substanceUse: string
  traumaHistory: string

  // Goals & Expectations
  specificGoals: string
  successMeasures: string
  expectations: string
  timeCommitment: string

  // Dark Psychology Interest
  psychologyInterest: string
  manipulationExperience: string
  ethicalUse: string

  // Additional Information
  additionalInfo: string
  consentAgreement: boolean
  understandingConfirmation: boolean
}

const timeSlots = [
  'Morning (8-11 AM)',
  'Midday (11 AM-2 PM)',
  'Afternoon (2-5 PM)',
  'Evening (5-8 PM)',
  'Night (8-11 PM)'
]

export default function BookingModal({
  isOpen,
  onClose,
  packageName,
  customerName,
  customerEmail,
  orderId
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [formData, setFormData] = useState<FormData>({
    preferredName: customerName,
    age: '',
    timezone: '',
    availability: [],
    urgency: '',
    currentSituation: '',
    primaryChallenges: '',
    previousTherapy: '',
    mentalHealthHistory: '',
    currentMedication: '',
    suicidalThoughts: '',
    substanceUse: '',
    traumaHistory: '',
    specificGoals: '',
    successMeasures: '',
    expectations: '',
    timeCommitment: '',
    psychologyInterest: '',
    manipulationExperience: '',
    ethicalUse: '',
    additionalInfo: '',
    consentAgreement: false,
    understandingConfirmation: false
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAvailabilityChange = (timeSlot: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, timeSlot]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.filter(slot => slot !== timeSlot)
      }))
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/booking/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageName,
          customerName,
          customerEmail,
          orderId,
          questionnaire: formData
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (_error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-light gradient-text-gold mb-6">Basic Information</h3>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Preferred Name *
              </label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => handleInputChange('preferredName', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                placeholder="What should I call you?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-light text-text-gray mb-2">
                  Age Range *
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
                >
                  <option value="">Select age range</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46-55">46-55</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-light text-text-gray mb-2">
                  Timezone *
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
                >
                  <option value="">Select timezone</option>
                  <option value="EST">Eastern (EST)</option>
                  <option value="CST">Central (CST)</option>
                  <option value="MST">Mountain (MST)</option>
                  <option value="PST">Pacific (PST)</option>
                  <option value="GMT">GMT (London)</option>
                  <option value="CET">CET (Europe)</option>
                  <option value="JST">JST (Japan)</option>
                  <option value="AEST">AEST (Australia)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Available Time Slots * (Select all that work)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availability.includes(slot)}
                      onChange={(e) => handleAvailabilityChange(slot, e.target.checked)}
                      className="rounded border-accent-gold/20 text-accent-gold focus:ring-accent-gold/50"
                    />
                    <span className="text-text-gray text-sm">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Session Urgency *
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
              >
                <option value="">Select urgency level</option>
                <option value="ASAP">ASAP (Within 1 week)</option>
                <option value="Soon">Soon (1-2 weeks)</option>
                <option value="Flexible">Flexible (2-4 weeks)</option>
                <option value="No Rush">No Rush (1+ month)</option>
              </select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-light gradient-text-gold mb-6">Background & Context</h3>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Current Life Situation *
              </label>
              <textarea
                value={formData.currentSituation}
                onChange={(e) => handleInputChange('currentSituation', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="Describe your current work, relationships, living situation, and main life circumstances..."
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Primary Challenges *
              </label>
              <textarea
                value={formData.primaryChallenges}
                onChange={(e) => handleInputChange('primaryChallenges', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="What are the main problems, obstacles, or patterns you're struggling with?"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Previous Therapy/Coaching Experience *
              </label>
              <textarea
                value={formData.previousTherapy}
                onChange={(e) => handleInputChange('previousTherapy', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="Have you worked with therapists, coaches, or counselors before? What worked or didn't work?"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-deep-burgundy/10 border border-deep-burgundy/30 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-deep-burgundy mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-light text-deep-burgundy mb-2">Mental Health Screening</h3>
                  <p className="text-sm text-text-gray">
                    This information helps me understand your mental health background. All responses are confidential.
                    <strong className="block mt-2 text-accent-gold">
                      Important: This coaching is NOT therapy and is not suitable for individuals with active mental health crises.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Mental Health History *
              </label>
              <textarea
                value={formData.mentalHealthHistory}
                onChange={(e) => handleInputChange('mentalHealthHistory', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="Any history of depression, anxiety, bipolar, or other mental health diagnoses? Current or past?"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Current Medication/Treatment *
              </label>
              <input
                type="text"
                value={formData.currentMedication}
                onChange={(e) => handleInputChange('currentMedication', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                placeholder="Are you currently taking any psychiatric medications or in therapy? (or 'None')"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Suicidal or Self-Harm Thoughts *
              </label>
              <select
                value={formData.suicidalThoughts}
                onChange={(e) => handleInputChange('suicidalThoughts', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
              >
                <option value="">Please select</option>
                <option value="Never">Never</option>
                <option value="Rarely">Rarely</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Currently">Currently experiencing</option>
              </select>
              {formData.suicidalThoughts === 'Currently' && (
                <p className="mt-2 text-sm text-deep-burgundy">
                  If you&apos;re currently having suicidal thoughts, please contact a mental health professional immediately.
                  This coaching program is not appropriate for individuals in crisis.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Substance Use *
              </label>
              <input
                type="text"
                value={formData.substanceUse}
                onChange={(e) => handleInputChange('substanceUse', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors"
                placeholder="Any current or past issues with alcohol, drugs, or other substances? (or 'None')"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Trauma History *
              </label>
              <select
                value={formData.traumaHistory}
                onChange={(e) => handleInputChange('traumaHistory', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
              >
                <option value="">Please select</option>
                <option value="None">No significant trauma</option>
                <option value="Mild">Some difficult experiences</option>
                <option value="Moderate">Significant traumatic events</option>
                <option value="Severe">Severe trauma/PTSD</option>
              </select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-light gradient-text-gold mb-6">Goals & Dark Psychology Interest</h3>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Specific Goals *
              </label>
              <textarea
                value={formData.specificGoals}
                onChange={(e) => handleInputChange('specificGoals', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="What specific outcomes do you want from our sessions? Be as detailed as possible."
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Success Measures *
              </label>
              <textarea
                value={formData.successMeasures}
                onChange={(e) => handleInputChange('successMeasures', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="How will you know our coaching has been successful? What will be different in your life?"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Interest in Dark Psychology *
              </label>
              <textarea
                value={formData.psychologyInterest}
                onChange={(e) => handleInputChange('psychologyInterest', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="What draws you to dark psychology? What do you hope to understand or develop?"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Previous Manipulation Experience *
              </label>
              <textarea
                value={formData.manipulationExperience}
                onChange={(e) => handleInputChange('manipulationExperience', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="Have you been manipulated by others? Have you used manipulation tactics yourself? Be honest."
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Ethical Use Commitment *
              </label>
              <textarea
                value={formData.ethicalUse}
                onChange={(e) => handleInputChange('ethicalUse', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="How will you ensure you use these skills ethically? What are your personal boundaries?"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-light gradient-text-gold mb-6">Final Details & Agreements</h3>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Time Commitment *
              </label>
              <select
                value={formData.timeCommitment}
                onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light focus:outline-none focus:border-accent-gold/50 transition-colors"
              >
                <option value="">Select commitment level</option>
                <option value="High">High - Ready to implement changes immediately</option>
                <option value="Medium">Medium - Will work on it consistently</option>
                <option value="Low">Low - Exploring, not sure about implementation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Expectations from Kanika *
              </label>
              <textarea
                value={formData.expectations}
                onChange={(e) => handleInputChange('expectations', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="What do you expect from me as your coach? What kind of approach do you respond to best?"
              />
            </div>

            <div>
              <label className="block text-sm font-light text-text-gray mb-2">
                Additional Information
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-lg text-text-light placeholder-text-gray/50 focus:outline-none focus:border-accent-gold/50 transition-colors resize-none"
                placeholder="Anything else you think I should know before our session?"
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consentAgreement}
                  onChange={(e) => handleInputChange('consentAgreement', e.target.checked)}
                  className="rounded border-accent-gold/20 text-accent-gold focus:ring-accent-gold/50 mt-1"
                />
                <span className="text-sm text-text-gray">
                  I consent to sharing this information with Kanika Batra for coaching purposes. I understand this information will be kept confidential and used solely to provide effective coaching services. *
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.understandingConfirmation}
                  onChange={(e) => handleInputChange('understandingConfirmation', e.target.checked)}
                  className="rounded border-accent-gold/20 text-accent-gold focus:ring-accent-gold/50 mt-1"
                />
                <span className="text-sm text-text-gray">
                  I understand that this is coaching, not therapy, and that Kanika Batra is not a licensed mental health professional. I am not in a mental health crisis and am capable of making my own decisions. *
                </span>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (submitStatus === 'success') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md bg-deep-black/90 backdrop-blur-sm border border-accent-gold/20 rounded-lg p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-accent-gold mx-auto mb-6" />
              <h2 className="text-2xl font-light gradient-text-gold mb-4">Questionnaire Submitted!</h2>
              <p className="text-text-gray mb-6">
                Your pre-session questionnaire has been sent to Kanika. You&apos;ll receive a scheduling link within 24-48 hours.
              </p>
              <div className="text-sm text-text-gray">
                This window will close automatically...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] bg-deep-black/90 backdrop-blur-sm border border-accent-gold/20 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent-gold/10">
              <div>
                <h2 className="text-xl font-light gradient-text-gold">Pre-Session Questionnaire</h2>
                <p className="text-sm text-text-gray">{packageName} • Step {currentStep} of 5</p>
              </div>
              <button
                onClick={onClose}
                className="text-text-gray hover:text-accent-gold transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-deep-black/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-accent-gold" />
                <span className="text-sm text-text-gray">Questionnaire Progress</span>
              </div>
              <div className="w-full bg-deep-black/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-accent-gold to-accent-gold/80 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {renderStep()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-accent-gold/10 bg-deep-black/30">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 text-text-gray hover:text-accent-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i + 1 <= currentStep ? 'bg-accent-gold' : 'bg-accent-gold/20'
                    }`}
                  />
                ))}
              </div>

              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black rounded-lg hover:shadow-lg transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    !formData.consentAgreement ||
                    !formData.understandingConfirmation
                  }
                  className="px-6 py-2 bg-gradient-to-r from-accent-gold to-accent-gold/80 text-deep-black rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
                </button>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="px-6 py-4 bg-deep-burgundy/20 border-t border-deep-burgundy/30 text-center">
                <p className="text-deep-burgundy">
                  Failed to submit questionnaire. Please try again or contact support.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}