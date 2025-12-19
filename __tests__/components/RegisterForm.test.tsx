import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterForm from '@/components/RegisterForm'

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

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<RegisterForm />)

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/create a password/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument()
  })

  it('renders create account button', () => {
    render(<RegisterForm />)

    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, user: { id: '1', email: 'test@example.com' } }),
    })

    render(<RegisterForm />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/create a password/i)
    const confirmInput = screen.getByPlaceholderText(/confirm your password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      }))
    })
  })

  it('displays error message on 409 conflict', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'User with this email already exists' }),
    })

    render(<RegisterForm />)

    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/create a password/i)
    const confirmInput = screen.getByPlaceholderText(/confirm your password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/already exists/i)).toBeInTheDocument()
    })
  })

  it('has link to login page', () => {
    render(<RegisterForm />)

    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })
})
