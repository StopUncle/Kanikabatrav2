'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { PAYPAL_CONFIG } from '@/lib/constants'

interface PayPalButtonProps {
  type: 'book' | 'coaching'
  itemId?: string
  amount: number
  itemName: string
  onSuccess?: (details: PayPalCaptureDetails) => void
  onError?: (error: string) => void
  onCancel?: () => void
  disabled?: boolean
  className?: string
}

interface PayPalCaptureDetails {
  id: string
  status: string
  paymentId?: string
  amount?: string
  currency?: string
}

interface PayPalWindow extends Window {
  paypal?: {
    Buttons: (options: PayPalButtonsConfig) => {
      render: (selector: string) => Promise<void>
    }
  }
}

interface PayPalButtonsConfig {
  createOrder: () => Promise<string>
  onApprove: (data: { orderID: string }) => Promise<void>
  onError?: (err: unknown) => void
  onCancel?: () => void
  style?: {
    layout?: 'vertical' | 'horizontal'
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black'
    shape?: 'rect' | 'pill'
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay'
    height?: number
  }
}

declare const window: PayPalWindow

export default function PayPalButton({
  type,
  itemId,
  amount,
  itemName,
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  className = ''
}: PayPalButtonProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if PayPal script is already loaded
    if (window.paypal) {
      setIsScriptLoaded(true)
      return
    }

    // Load PayPal SDK
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=${PAYPAL_CONFIG.currency}&intent=${PAYPAL_CONFIG.intent}`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsScriptLoaded(true)
    }

    script.onerror = () => {
      const isLocalhost = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      const isNgrok = typeof window !== 'undefined' &&
        window.location.hostname.includes('ngrok')

      let errorMessage
      if (isLocalhost) {
        errorMessage = 'PayPal SDK unavailable on localhost - try using ngrok or deploy to production'
      } else if (isNgrok) {
        errorMessage = 'PayPal SDK failed to load - this may be a network issue'
      } else {
        errorMessage = 'Failed to load PayPal SDK'
      }

      setError(errorMessage)
      onError?.(errorMessage)
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [onError])

  useEffect(() => {
    if (!isScriptLoaded || !window.paypal || disabled) return

    const paypalContainerId = `paypal-button-container-${type}-${itemId || 'default'}`
    let timeoutId: NodeJS.Timeout | null = null
    let isMounted = true

    // Wait for container to exist in DOM
    const initializePayPal = () => {
      const container = document.getElementById(paypalContainerId)
      if (!container) {
        // Container doesn't exist yet, retry
        timeoutId = setTimeout(() => {
          if (isMounted) initializePayPal()
        }, 100)
        return
      }

      // Clear any existing buttons
      container.innerHTML = ''

    // Configure PayPal buttons
    const paypalButtons = window.paypal!.Buttons({
      createOrder: async () => {
        try {
          setIsProcessing(true)
          setError(null)
          console.log('Creating PayPal order...', { type, itemId })

          const response = await fetch('/api/paypal/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type,
              itemId
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            console.error('Order creation failed:', errorData)
            setIsProcessing(false)
            throw new Error(errorData.error || 'Failed to create order')
          }

          const orderData = await response.json()
          console.log('Order created successfully:', orderData.orderId)
          console.log('PayPal popup should open now...')

          // Add timeout to reset processing state if popup never opens/completes
          setTimeout(() => {
            console.log('Checking if payment is still processing after 60s...')
            // This will be cancelled by onApprove/onCancel/onError if they fire
          }, 60000)

          return orderData.orderId
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          console.error('createOrder error:', error)
          setIsProcessing(false)
          setError(errorMessage)
          onError?.(errorMessage)
          throw error
        }
      },

      onApprove: async (data) => {
        const attemptCapture = async (retryCount = 0): Promise<void> => {
          try {
            setIsProcessing(true)
            console.log(`[CREDIT CARD CAPTURE] Attempt ${retryCount + 1} | Order: ${data.orderID}`)

            // Extended timeout for credit card payments (90 seconds to allow for 3D Secure + polling)
            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Payment processing timeout. Please check your email or contact support.')), 90000)
            )

            const fetchPromise = fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: data.orderID
              }),
            })

            const response = await Promise.race([fetchPromise, timeoutPromise]) as Response

            console.log(`[CREDIT CARD CAPTURE] Response status: ${response.status}`)

            if (!response.ok) {
              const errorData = await response.json()
              console.error('[CREDIT CARD CAPTURE] Failed:', errorData)

              // Handle retryable errors (status 202) - increased retry count for credit cards
              if (response.status === 202 && errorData.retryable && retryCount < 5) {
                // Exponential backoff for retries
                const retryDelay = Math.min(3000 * Math.pow(1.5, retryCount), 8000)
                console.log(`[CREDIT CARD CAPTURE] Payment still processing, retrying in ${retryDelay/1000}s... (attempt ${retryCount + 2}/6)`)
                await new Promise(resolve => setTimeout(resolve, retryDelay))
                return attemptCapture(retryCount + 1)
              }

              throw new Error(errorData.error || 'Payment capture failed')
            }

            const captureData = await response.json()
            console.log('Capture successful:', captureData)

            if (captureData.success) {
              // Track the order in our system
              const trackingResponse = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                  type: type,
                  packageId: itemId,
                }),
              })

              if (trackingResponse.ok) {
                const trackingResult = await trackingResponse.json()
                console.log('Order tracked:', trackingResult)

                // Pass enhanced details to parent
                onSuccess?.({
                  ...captureData,
                  purchaseId: trackingResult.purchaseId,
                  downloadUrl: trackingResult.downloadUrl,
                  schedulingUrl: trackingResult.schedulingUrl,
                })
              } else {
                console.warn('Order tracking failed, but payment succeeded')
                // Still call success even if tracking fails
                onSuccess?.(captureData)
              }
            } else {
              throw new Error(captureData.message || 'Payment was not completed')
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Payment failed'
            console.error('Payment approval error:', error)
            setError(errorMessage)
            onError?.(errorMessage)
          } finally {
            setIsProcessing(false)
          }
        }

        // Start the capture attempt
        try {
          await attemptCapture(0)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Payment failed'
          console.error('Final payment error:', error)
          setError(errorMessage)
          onError?.(errorMessage)
          setIsProcessing(false)
        }
      },

      onError: (err) => {
        const errorMessage = 'PayPal payment error occurred'
        setError(errorMessage)
        onError?.(errorMessage)
        setIsProcessing(false)
        console.error('PayPal error:', err)
      },

      onCancel: () => {
        console.log('Payment cancelled by user')
        setIsProcessing(false)
        onCancel?.()
      },

      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 45
      }
    })

      // Render PayPal buttons
      paypalButtons.render(`#${paypalContainerId}`).catch((error) => {
        if (isMounted) {
          console.error('PayPal render error:', error)
          setError('Failed to load payment buttons')
          onError?.('Failed to load payment buttons')
        }
      })
    }

    // Start initialization
    initializePayPal()

    // Cleanup
    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isScriptLoaded, type, itemId, disabled, onSuccess, onError, onCancel])

  if (!PAYPAL_CONFIG.clientId) {
    return (
      <div className="p-4 bg-amber-900/30 border border-amber-700 rounded-lg text-amber-300">
        <p className="font-medium mb-2">Payment System Configuration</p>
        <p className="text-sm">PayPal integration will be available in production.</p>
        <p className="text-xs mt-2 opacity-75">Development mode - payments disabled</p>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <div className={`p-4 rounded-lg ${error.includes('localhost') || error.includes('network issue')
          ? 'bg-amber-900/30 border border-amber-700 text-amber-300'
          : 'bg-red-900/30 border border-red-700 text-red-300'}`}>
          <p className="font-medium">
            {error.includes('localhost') ? 'Development Mode' :
             error.includes('network issue') ? 'Connection Issue' : 'Payment Error'}
          </p>
          <p className="text-sm mt-1">{error}</p>
          {error.includes('localhost') && (
            <p className="text-xs mt-2 opacity-75">
              PayPal works better with ngrok tunneling or in production deployment.
            </p>
          )}
          {error.includes('network issue') && (
            <div className="text-xs mt-2 opacity-75">
              <p>Try refreshing the page or check your internet connection.</p>
              <p className="mt-1">For direct payment, please <a href="/contact" className="text-amber-200 hover:text-amber-100 underline">contact us</a>.</p>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            setError(null)
            setIsProcessing(false)
          }}
        >
          Try Again
        </Button>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Loading State */}
      {(!isScriptLoaded || isProcessing) && (
        <div className="flex items-center justify-center p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
            <p className="text-text-muted text-sm">
              {!isScriptLoaded ? 'Loading payment options...' : 'Processing payment...'}
            </p>
            {isProcessing && (
              <p className="text-text-muted text-xs opacity-75 text-center max-w-xs">
                Credit card payments may take 30-60 seconds to process. Please don&apos;t close this window.
              </p>
            )}
          </div>
        </div>
      )}

      {/* PayPal Button Container */}
      <div
        id={`paypal-button-container-${type}-${itemId || 'default'}`}
        className={isScriptLoaded && !isProcessing ? 'block' : 'hidden'}
      />

      {/* Purchase Summary */}
      {isScriptLoaded && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-text-muted border-t border-gray-800 pt-4"
        >
          <p>
            You will be charged <span className="text-gold font-medium">${amount.toFixed(2)}</span> for
          </p>
          <p className="font-medium text-text-light">{itemName}</p>
          <p className="mt-2 text-xs">
            Secure payment processed by PayPal • SSL Encrypted
          </p>
        </motion.div>
      )}

      {/* Fallback Manual Button */}
      {!isScriptLoaded && !isProcessing && (
        <Button
          variant="primary"
          fullWidth
          disabled
          className="opacity-50"
        >
          Loading PayPal...
        </Button>
      )}
    </div>
  )
}