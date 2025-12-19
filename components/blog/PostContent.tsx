'use client'

import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-light text-white mt-12 mb-6 first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-light text-white mt-10 mb-5" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-light text-white mt-8 mb-4" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-text-light leading-relaxed mb-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-text-light mb-6 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-text-light mb-6 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-text-light" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-accent-gold pl-6 my-8 italic text-text-gray" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return <Link href={href} className="text-accent-gold hover:underline" {...props}>{children}</Link>
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-gold hover:underline"
        {...props}
      >
        {children}
      </a>
    )
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-accent-gold/90" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-accent-gold" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-deep-navy/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6" {...props} />
  ),
  hr: () => (
    <hr className="border-white/10 my-12" />
  ),
}

interface PostContentProps {
  mdxSource: MDXRemoteSerializeResult
}

export default function PostContent({ mdxSource }: PostContentProps) {
  return (
    <article className="prose prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </article>
  )
}
