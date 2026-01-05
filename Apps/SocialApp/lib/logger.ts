/**
 * Dev-aware logger utility
 * Only outputs logs in development mode
 */

const isDev = __DEV__ || process.env.EXPO_PUBLIC_DEV_MODE === 'true';

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

interface Logger {
  log: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

function createLogger(): Logger {
  const noop = () => {};

  if (!isDev) {
    return {
      log: noop,
      info: noop,
      warn: noop,
      error: noop,
      debug: noop,
    };
  }

  return {
    log: (...args: unknown[]) => console.log('[App]', ...args),
    info: (...args: unknown[]) => console.info('[App]', ...args),
    warn: (...args: unknown[]) => console.warn('[App]', ...args),
    error: (...args: unknown[]) => console.error('[App]', ...args),
    debug: (...args: unknown[]) => console.debug('[App]', ...args),
  };
}

export const logger = createLogger();
