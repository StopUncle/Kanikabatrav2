"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  url: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function SocialShareButtons({
  title,
  url,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "X",
      href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: XIcon,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-text-gray mr-1">
        <Share2 className="w-3.5 h-3.5" />
      </span>
      {shareLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-text-gray hover:text-accent-gold transition-colors"
          aria-label={`Share on ${name}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </a>
      ))}
      <button
        onClick={copyLink}
        className="p-2 text-text-gray hover:text-accent-gold transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-accent-gold" />
        ) : (
          <Link2 className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
