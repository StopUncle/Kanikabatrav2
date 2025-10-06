import { PAYPAL_CONFIG } from './constants'

export interface PayPalOrderItem {
  name: string
  description?: string
  quantity: string
  unit_amount: {
    currency_code: string
    value: string
  }
  category?: 'DIGITAL_GOODS' | 'PHYSICAL_GOODS'
}

export interface PayPalOrder {
  intent: 'CAPTURE'
  purchase_units: Array<{
    reference_id?: string
    description?: string
    amount: {
      currency_code: string
      value: string
      breakdown?: {
        item_total: {
          currency_code: string
          value: string
        }
      }
    }
    items?: PayPalOrderItem[]
  }>
  application_context?: {
    brand_name?: string
    locale?: string
    landing_page?: 'LOGIN' | 'BILLING' | 'NO_PREFERENCE'
    shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS'
    user_action?: 'CONTINUE' | 'PAY_NOW'
    return_url?: string
    cancel_url?: string
  }
}

export interface PayPalAccessToken {
  scope: string
  access_token: string
  token_type: string
  app_id: string
  expires_in: number
  nonce: string
}

export interface PayPalOrderResponse {
  id: string
  status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED'
  links: Array<{
    href: string
    rel: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH'
  }>
  purchase_units?: Array<{
    reference_id?: string
    amount: {
      currency_code: string
      value: string
    }
  }>
  payer?: {
    email_address?: string
    name?: {
      given_name?: string
      surname?: string
    }
  }
}

export interface PayPalCaptureResponse {
  id: string
  status: 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED'
  purchase_units: Array<{
    reference_id: string
    payments: {
      captures: Array<{
        id: string
        status: string
        amount: {
          currency_code: string
          value: string
        }
        final_capture: boolean
        create_time: string
        update_time: string
      }>
    }
  }>
}

class PayPalService {
  private baseURL?: string
  private clientId?: string
  private clientSecret?: string
  private initialized = false

  private initialize() {
    if (this.initialized) return

    const environment = process.env.PAYPAL_ENVIRONMENT || 'sandbox'
    this.baseURL = environment === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com'

    this.clientId = process.env.PAYPAL_CLIENT_ID || PAYPAL_CONFIG.clientId
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || ''

    if (!this.clientId) {
      throw new Error('PayPal Client ID is required')
    }

    if (!this.clientSecret) {
      throw new Error('PayPal Client Secret is required')
    }

    this.initialized = true
    console.log(`PayPal Service initialized: ${environment} environment (${this.baseURL})`)
  }

  /**
   * Get PayPal access token
   */
  async getAccessToken(): Promise<string> {
    this.initialize()

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')

    console.log(`Attempting PayPal auth to: ${this.baseURL}/v1/oauth2/token`)
    console.log(`Client ID (first 20 chars): ${this.clientId!.substring(0, 20)}...`)

    const response = await fetch(`${this.baseURL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('PayPal auth error response:', error)
      throw new Error(`PayPal auth failed: ${error.error_description || response.statusText}`)
    }

    const data: PayPalAccessToken = await response.json()
    console.log('PayPal auth successful')
    return data.access_token
  }

  /**
   * Create PayPal order
   */
  async createOrder(orderData: PayPalOrder): Promise<PayPalOrderResponse> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`PayPal order creation failed: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  /**
   * Capture PayPal order
   */
  async captureOrder(orderId: string): Promise<PayPalCaptureResponse> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`PayPal order capture failed: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  /**
   * Get order details
   */
  async getOrderDetails(orderId: string): Promise<PayPalOrderResponse> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`PayPal get order failed: ${JSON.stringify(error)}`)
    }

    return response.json()
  }
}

// Helper functions for creating common order structures

/**
 * Create order for book purchase
 */
export function createBookOrder(bookPrice: number, bookTitle: string): PayPalOrder {
  return {
    intent: 'CAPTURE',
    purchase_units: [{
      reference_id: 'book-purchase',
      description: `Purchase of "${bookTitle}"`,
      amount: {
        currency_code: PAYPAL_CONFIG.currency,
        value: bookPrice.toFixed(2),
        breakdown: {
          item_total: {
            currency_code: PAYPAL_CONFIG.currency,
            value: bookPrice.toFixed(2)
          }
        }
      },
      items: [{
        name: bookTitle,
        description: 'Digital book download',
        quantity: '1',
        unit_amount: {
          currency_code: PAYPAL_CONFIG.currency,
          value: bookPrice.toFixed(2)
        },
        category: 'DIGITAL_GOODS'
      }]
    }],
    application_context: {
      brand_name: 'Kanika Batra',
      locale: 'en-US',
      landing_page: 'NO_PREFERENCE',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    }
  }
}

/**
 * Create order for coaching session
 */
export function createCoachingOrder(
  sessionPrice: number,
  sessionName: string,
  sessionDescription?: string
): PayPalOrder {
  return {
    intent: 'CAPTURE',
    purchase_units: [{
      reference_id: 'coaching-session',
      description: `Coaching session: ${sessionName}`,
      amount: {
        currency_code: PAYPAL_CONFIG.currency,
        value: sessionPrice.toFixed(2),
        breakdown: {
          item_total: {
            currency_code: PAYPAL_CONFIG.currency,
            value: sessionPrice.toFixed(2)
          }
        }
      },
      items: [{
        name: sessionName,
        description: sessionDescription || 'One-on-one coaching session',
        quantity: '1',
        unit_amount: {
          currency_code: PAYPAL_CONFIG.currency,
          value: sessionPrice.toFixed(2)
        },
        category: 'DIGITAL_GOODS'
      }]
    }],
    application_context: {
      brand_name: 'Kanika Batra Coaching',
      locale: 'en-US',
      landing_page: 'NO_PREFERENCE',
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    }
  }
}

// Export singleton instance (lazy initialization on first use)
export const paypalService = new PayPalService()

// Types are already exported inline above