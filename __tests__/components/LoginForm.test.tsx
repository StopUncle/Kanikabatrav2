import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/components/LoginForm'

global.fetch = jest.fn()

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { whileHover, whileTap, initial, animate, transition, ...validProps } = props
      void whileHover; void whileTap; void initial; void animate; void transition;
      return <div {...validProps}>{children}</div>
    },
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { whileHover, whileTap, initial, animate, transition, ...validProps } = props
      void whileHover; void whileTap; void initial; void animate; void transition;
      return <button {...validProps}>{children}</button>
    },
  },
}))

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders email and password fields', () => {
    render(<LoginForm />)

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument()
  })

  it('renders sign in button', () => {
    render(<LoginForm />)

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, user: { id: '1', email: 'test@example.com' } }),
    })

    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', expect.any(Object))
    })
  })

  it('displays error message on failed login', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    })

    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/enter your password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('has link to register page', () => {
    render(<LoginForm />)

    expect(screen.getByText(/create one/i)).toBeInTheDocument()
  })
})
