'use client'

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter signup
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-6 py-3 bg-deep-black/50 border border-accent-gold/20 rounded-full text-text-light placeholder-text-gray focus:outline-none focus:border-accent-gold/50 transition-colors"
        required
      />
      <button
        type="submit"
        className="btn-primary rounded-full text-white px-8 py-3"
      >
        Subscribe
      </button>
    </form>
  )
}
