import { PAYPAL_CONFIG } from './constants'

export interface PayPalProduct {
  id: string
  name: string
  description?: string
  type: 'SERVICE' | 'PHYSICAL' | 'DIGITAL'
  category: 'EDUCATIONAL_AND_TEXTBOOKS' | 'SOFTWARE'
}

export interface PayPalPlan {
  id: string
  product_id: string
  name: string
  description?: string
  status: 'CREATED' | 'ACTIVE' | 'INACTIVE'
  billing_cycles: BillingCycle[]
  payment_preferences: PaymentPreferences
}

interface BillingCycle {
  frequency: {
    interval_unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
    interval_count: number
  }
  tenure_type: 'REGULAR' | 'TRIAL'
  sequence: number
  total_cycles: number
  pricing_scheme: {
    fixed_price: {
      value: string
      currency_code: string
    }
  }
}

interface PaymentPreferences {
  auto_bill_outstanding: boolean
  setup_fee?: {
    value: string
    currency_code: string
  }
  setup_fee_failure_action: 'CONTINUE' | 'CANCEL'
  payment_failure_threshold: number
}

export interface PayPalSubscription {
  id: string
  status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED'
  status_update_time: string
  plan_id: string
  start_time: string
  subscriber?: {
    email_address: string
    name?: {
      given_name: string
      surname: string
    }
  }
  billing_info?: {
    next_billing_time?: string
    last_payment?: {
      amount: {
        currency_code: string
        value: string
      }
      time: string
    }
  }
  links?: Array<{
    href: string
    rel: string
    method: string
  }>
}

class PayPalSubscriptionService {
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

    if (!this.clientId || !this.clientSecret) {
      throw new Error('PayPal credentials are required')
    }

    this.initialized = true
  }

  async getAccessToken(): Promise<string> {
    this.initialize()

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')

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
      throw new Error(`PayPal auth failed: ${error.error_description || response.statusText}`)
    }

    const data = await response.json()
    return data.access_token
  }

  async createProduct(product: Omit<PayPalProduct, 'id'>): Promise<PayPalProduct> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/catalogs/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create product: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async createPlan(
    productId: string,
    name: string,
    description: string,
    price: number,
    intervalUnit: 'MONTH' | 'YEAR' = 'MONTH'
  ): Promise<PayPalPlan> {
    const accessToken = await this.getAccessToken()

    const planData = {
      product_id: productId,
      name,
      description,
      billing_cycles: [
        {
          frequency: {
            interval_unit: intervalUnit,
            interval_count: 1
          },
          tenure_type: 'REGULAR',
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: {
              value: price.toFixed(2),
              currency_code: PAYPAL_CONFIG.currency
            }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: 'CONTINUE',
        payment_failure_threshold: 3
      }
    }

    const response = await fetch(`${this.baseURL}/v1/billing/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(planData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create plan: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async activatePlan(planId: string): Promise<void> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/billing/plans/${planId}/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok && response.status !== 204) {
      const error = await response.json()
      throw new Error(`Failed to activate plan: ${JSON.stringify(error)}`)
    }
  }

  async createSubscription(
    planId: string,
    returnUrl: string,
    cancelUrl: string,
    customId?: string
  ): Promise<PayPalSubscription> {
    const accessToken = await this.getAccessToken()

    const subscriptionData = {
      plan_id: planId,
      application_context: {
        brand_name: 'Kanika Batra Courses',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        },
        return_url: returnUrl,
        cancel_url: cancelUrl
      },
      custom_id: customId
    }

    const response = await fetch(`${this.baseURL}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(subscriptionData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to create subscription: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async getSubscription(subscriptionId: string): Promise<PayPalSubscription> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/billing/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to get subscription: ${JSON.stringify(error)}`)
    }

    return response.json()
  }

  async cancelSubscription(subscriptionId: string, reason: string): Promise<void> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok && response.status !== 204) {
      const error = await response.json()
      throw new Error(`Failed to cancel subscription: ${JSON.stringify(error)}`)
    }
  }

  async suspendSubscription(subscriptionId: string, reason: string): Promise<void> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/billing/subscriptions/${subscriptionId}/suspend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok && response.status !== 204) {
      const error = await response.json()
      throw new Error(`Failed to suspend subscription: ${JSON.stringify(error)}`)
    }
  }

  async activateSubscription(subscriptionId: string, reason: string): Promise<void> {
    const accessToken = await this.getAccessToken()

    const response = await fetch(`${this.baseURL}/v1/billing/subscriptions/${subscriptionId}/activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ reason }),
    })

    if (!response.ok && response.status !== 204) {
      const error = await response.json()
      throw new Error(`Failed to activate subscription: ${JSON.stringify(error)}`)
    }
  }
}

export const paypalSubscriptionService = new PayPalSubscriptionService()
