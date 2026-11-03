"use client";

import { useCopy } from "@/components/site-preferences";

export function SkipLink() {
  const words = useCopy();
  return <a className="skip-link" href="#main">{words.skip}</a>;
}
