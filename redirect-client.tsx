"use client";

import { useEffect, useRef, useState } from "react";

const WAIT_SECONDS = 5;
const adSlotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INTERSTITIAL;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function RedirectClient({
  destination,
  slug
}: {
  destination: string;
  slug: string;
}) {
  const [secondsLeft, setSecondsLeft] = useState(WAIT_SECONDS);
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    if (adsenseClient && adSlotId && !adPushed.current) {
      try {
        // @ts-expect-error adsbygoogle is injected by the external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushed.current = true;
      } catch {
        // AdSense script not loaded yet (e.g. local dev) — safe to ignore.
      }
    }
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.replace(destination);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, destination]);

  return (
    <div className="wrap">
      <a href="/" className="wordmark">
        url<b>.io</b>
      </a>
      <div className="interstitial">
        <p className="countdown">{secondsLeft}</p>
        <p>Taking you to your destination…</p>
        <p className="dest">{destination}</p>

        {adsenseClient && adSlotId ? (
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: "block", width: "336px", height: "280px" }}
            data-ad-client={adsenseClient}
            data-ad-slot={adSlotId}
          />
        ) : (
          <div className="ad-slot">Ad space</div>
        )}

        <a href={destination}>Skip waiting — continue now</a>
      </div>
    </div>
  );
}
