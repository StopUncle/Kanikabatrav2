interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: string
  context?: Record<string, unknown>
  error?: Error
  userId?: string
  sessionId?: string
  userAgent?: string
  ip?: string
  url?: string
  stack?: string
}

interface ClientError {
  message: string
  stack?: string
  url?: string
  line?: number
  column?: number
  userAgent?: string
  timestamp?: string
}

class Logger {
  private isDevelopment: boolean
  private sessionId: string

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry
    let logString = `[${timestamp}] [${level.toUpperCase()}] ${message}`

    if (context && Object.keys(context).length > 0) {
      logString += ` | Context: ${JSON.stringify(context, null, 2)}`
    }

    if (error) {
      logString += ` | Error: ${error.message}`
      if (error.stack) {
        logString += ` | Stack: ${error.stack}`
      }
    }

    return logString
  }

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      context,
      error,
      stack: error?.stack
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry('info', message, context)

    if (this.isDevelopment) {
      console.log(this.formatLog(entry))
    }

    this.persistLog(entry)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry('warn', message, context)

    if (this.isDevelopment) {
      console.warn(this.formatLog(entry))
    }

    this.persistLog(entry)
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry('error', message, context, error)

    if (this.isDevelopment) {
      console.error(this.formatLog(entry))
    }

    this.persistLog(entry)
    this.notifyError(entry)
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.isDevelopment) return

    const entry = this.createLogEntry('debug', message, context)
    console.debug(this.formatLog(entry))
  }

  // API request logging
  apiRequest(method: string, url: string, context?: Record<string, unknown>): void {
    this.info(`API ${method} ${url}`, {
      type: 'api_request',
      method,
      url,
      ...context
    })
  }

  apiResponse(method: string, url: string, status: number, duration?: number, context?: Record<string, unknown>): void {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info'
    const message = `API ${method} ${url} - ${status}`
    const logContext = {
      type: 'api_response',
      method,
      url,
      status,
      duration,
      ...context
    }

    if (level === 'error') {
      this.error(message, undefined, logContext)
    } else if (level === 'warn') {
      this.warn(message, logContext)
    } else {
      this.info(message, logContext)
    }
  }

  // Payment logging
  paymentAttempt(type: string, amount: number, context?: Record<string, unknown>): void {
    this.info(`Payment attempt: ${type} - $${amount}`, {
      type: 'payment_attempt',
      paymentType: type,
      amount,
      ...context
    })
  }

  paymentSuccess(paymentId: string, amount: number, context?: Record<string, unknown>): void {
    this.info(`Payment successful: ${paymentId} - $${amount}`, {
      type: 'payment_success',
      paymentId,
      amount,
      ...context
    })
  }

  paymentFailure(reason: string, amount: number, context?: Record<string, unknown>): void {
    this.error(`Payment failed: ${reason} - $${amount}`, undefined, {
      type: 'payment_failure',
      reason,
      amount,
      ...context
    })
  }

  // User authentication logging
  authAttempt(email: string, success: boolean, context?: Record<string, unknown>): void {
    const message = `Auth attempt for ${email}: ${success ? 'SUCCESS' : 'FAILED'}`
    const level = success ? 'info' : 'warn'

    this[level](message, {
      type: 'auth_attempt',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partially mask email
      success,
      ...context
    })
  }

  // Client-side error logging
  clientError(error: ClientError): void {
    this.error('Client-side error', new Error(error.message), {
      type: 'client_error',
      url: error.url,
      line: error.line,
      column: error.column,
      userAgent: error.userAgent,
      timestamp: error.timestamp
    })
  }

  // Performance logging
  performanceMetric(name: string, value: number, unit: string = 'ms'): void {
    this.info(`Performance: ${name} - ${value}${unit}`, {
      type: 'performance',
      metric: name,
      value,
      unit
    })
  }

  private persistLog(entry: LogEntry): void {
    // In production, you might want to:
    // 1. Send logs to external service (e.g., LogRocket, Sentry, DataDog)
    // 2. Store in database
    // 3. Send to log aggregation service

    if (typeof window === 'undefined') {
      // Server-side: could write to file or send to logging service
      // For now, we'll just console log in development
      return
    }

    // Client-side: could send to logging endpoint
    // For now, store in localStorage for development debugging
    if (this.isDevelopment) {
      try {
        const logs = JSON.parse(localStorage.getItem('app_logs') || '[]')
        logs.push(entry)

        // Keep only last 100 logs to prevent localStorage bloat
        if (logs.length > 100) {
          logs.splice(0, logs.length - 100)
        }

        localStorage.setItem('app_logs', JSON.stringify(logs))
      } catch (error) {
        console.error('Failed to store log in localStorage:', error)
      }
    }
  }

  private async notifyError(entry: LogEntry): Promise<void> {
    // In production, send critical errors to monitoring service
    if (this.isDevelopment) return

    try {
      // Example: Send to error monitoring service
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      })
    } catch (error) {
      // Fail silently to avoid infinite error loops
      console.error('Failed to notify error service:', error)
    }
  }

  // Utility method to clear logs (for development)
  clearLogs(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('app_logs')
    }
  }

  // Get logs for debugging
  getLogs(): LogEntry[] {
    if (typeof window === 'undefined') return []

    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]')
    } catch {
      return []
    }
  }
}

// Singleton instance
export const logger = new Logger()

// Error boundary hook for React
export function useErrorLogger() {
  return {
    logError: (error: Error, errorInfo?: { componentStack: string }) => {
      logger.error('React Error Boundary', error, {
        type: 'react_error',
        componentStack: errorInfo?.componentStack
      })
    }
  }
}

// Global error handlers for client-side
if (typeof window !== 'undefined') {
  // Unhandled errors
  window.addEventListener('error', (event) => {
    logger.clientError({
      message: event.message,
      stack: event.error?.stack,
      url: event.filename,
      line: event.lineno,
      column: event.colno,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })
  })

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', new Error(event.reason), {
      type: 'unhandled_rejection',
      reason: event.reason
    })
  })
}

// Export types for use in other modules
export type { LogEntry, ClientError }