"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRegion } from "@/lib/client-side-region";
import type { Region } from "@/lib/geo";

interface Props {
  /** Regions allowed to stay on this page. */
  allow: Region[];
  /** Where everyone else is sent. */
  redirectTo: string;
}

/**
 * Re-checks the visitor's market in the browser and moves them to the page for
 * it. Server-side detection only sees request headers, which resolve to
 * "global" for a Bangladeshi visitor on an English browser locale when the host
 * sends no CDN geo header. The browser can see the timezone, so this catches
 * what the header check misses.
 *
 * getRegion() answers from localStorage or the timezone without a network call
 * in the common case, so the redirect fires on hydration. It also writes the
 * region cookie, which means subsequent server renders agree with this result
 * and cannot bounce the visitor back.
 */
export default function RegionGuard({ allow, redirectTo }: Props) {
  const router = useRouter();
  // Depend on the contents, not the array identity — a literal prop would be a
  // new reference on every render and re-run the effect forever.
  const allowKey = allow.join(",");

  useEffect(() => {
    let cancelled = false;

    getRegion()
      .then((region) => {
        if (cancelled) return;
        if (!allowKey.split(",").includes(region)) router.replace(redirectTo);
      })
      .catch(() => {
        // detection failed — leave the visitor where they are
      });

    return () => {
      cancelled = true;
    };
  }, [allowKey, redirectTo, router]);

  return null;
}
