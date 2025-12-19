import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  }),
}))

class MockRequest {
  url: string
  method: string
  headers: Map<string, string>
  cookies: Map<string, { value: string }>
  body: string | null

  constructor(url: string, init?: RequestInit) {
    this.url = url
    this.method = init?.method || 'GET'
    this.headers = new Map(Object.entries(init?.headers || {}))
    this.cookies = new Map()
    this.body = init?.body as string || null
  }

  async json() {
    return JSON.parse(this.body || '{}')
  }
}

class MockResponse {
  body: unknown
  status: number
  headers: Map<string, string>
  cookieList: Array<{ name: string; value: string }>

  constructor(body: unknown, init?: ResponseInit) {
    this.body = body
    this.status = init?.status || 200
    this.headers = new Map()
    this.cookieList = []
  }

  async json() {
    return this.body
  }

  get cookies() {
    return {
      set: (name: string, value: string) => {
        this.cookieList.push({ name, value })
      },
      get: (name: string) => {
        return this.cookieList.find(c => c.name === name)
      },
      getAll: () => this.cookieList,
    }
  }
}

if (typeof global.Request === 'undefined') {
  (global as unknown as { Request: typeof MockRequest }).Request = MockRequest
}

if (typeof global.Response === 'undefined') {
  (global as unknown as { Response: typeof MockResponse }).Response = MockResponse
}
