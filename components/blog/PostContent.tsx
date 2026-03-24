import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import InlineBookCTA from "@/components/blog/InlineBookCTA";
import InlineCoachingCTA from "@/components/blog/InlineCoachingCTA";

function slugify(text: string): string {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextContent((children as React.ReactElement).props.children);
  }
  return "";
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-16 mb-8 first:mt-0 leading-tight tracking-tight"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h2
        id={id}
        className="text-2xl md:text-3xl font-light text-white mt-14 mb-6 leading-snug border-b border-white/10 pb-4 scroll-mt-24"
        {...props}
      />
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(getTextContent(props.children));
    return (
      <h3
        id={id}
        className="text-xl md:text-2xl font-light text-white mt-12 mb-5 leading-snug scroll-mt-24"
        {...props}
      />
    );
  },
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg md:text-xl font-medium text-accent-gold mt-10 mb-4 leading-snug"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-base md:text-lg text-text-light leading-relaxed md:leading-loose mb-7 tracking-wide"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-base md:text-lg text-text-light mb-8 space-y-3 pl-6 list-none"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="text-base md:text-lg text-text-light mb-8 space-y-3 pl-6 list-decimal list-outside"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-text-light leading-relaxed pl-2 relative before:content-[''] before:absolute before:-left-4 before:top-3 before:w-1.5 before:h-1.5 before:bg-accent-gold before:rounded-full"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="relative border-l-4 border-accent-gold pl-8 pr-4 py-6 my-10 bg-gradient-to-r from-accent-gold/5 to-transparent rounded-r-lg"
      {...props}
    >
      <div className="text-lg md:text-xl italic text-text-light/90 leading-relaxed">
        {props.children}
      </div>
    </blockquote>
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-4 decoration-accent-gold/50 hover:decoration-accent-gold transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-gold hover:text-accent-gold/80 underline underline-offset-4 decoration-accent-gold/50 hover:decoration-accent-gold transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-accent-gold/90" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-white/10 px-2 py-1 rounded text-sm font-mono text-accent-gold border border-white/10"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-deep-navy/50 border border-white/10 rounded-xl p-6 overflow-x-auto mb-8 text-sm"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-10">
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img className="w-full rounded-xl border border-white/10" {...props} />
      {props.alt && (
        <figcaption className="text-center text-sm text-text-gray mt-4 italic">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  BookCTA: () => <InlineBookCTA />,
  CoachingCTA: () => <InlineCoachingCTA />,
};

interface PostContentProps {
  source: string;
}

export default function PostContent({ source }: PostContentProps) {
  return (
    <article className="prose prose-invert max-w-none article-content">
      <MDXRemote source={source} components={components} />
    </article>
  );
}
