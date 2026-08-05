"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { LinkedinIcon, XIcon } from "@/components/BrandIcons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const btn = "flex h-9 w-9 items-center justify-center rounded-full text-tx2 shadow-neu-sm hover:text-ac";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-[12px] font-semibold text-tx3">Share</span>
      <a className={btn} target="_blank" rel="noreferrer" aria-label="Share on X" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}>
        <XIcon size={13} />
      </a>
      <a className={btn} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}>
        <LinkedinIcon size={15} />
      </a>
      <button className={btn} onClick={copy} aria-label="Copy link">
        <Link2 size={15} className={copied ? "text-ac" : ""} />
      </button>
    </div>
  );
}
