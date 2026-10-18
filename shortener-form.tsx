"use client";

import { useState } from "react";

type Result = { shortUrl: string; slug: string };

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alias: alias || undefined })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
      } else {
        setResult({ shortUrl: data.shortUrl, slug: data.slug });
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="url">Long URL</label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com/a/very/long/path"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="alias">Custom alias (optional)</label>
          <input
            id="alias"
            type="text"
            placeholder="my-link"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            pattern="[a-zA-Z0-9_-]{3,32}"
            title="3-32 characters: letters, numbers, - or _"
          />
        </div>
        <button className="primary" type="submit" disabled={loading}>
          {loading ? "Shortening…" : "Shorten link"}
        </button>
      </form>

      {error ? <p className="error-text">{error}</p> : null}

      {result ? (
        <div className="result">
          <div className="result-link">
            <span>{result.shortUrl}</span>
            <button className="copy" onClick={handleCopy} type="button">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="stat">Share this link — it'll track clicks automatically.</p>
        </div>
      ) : null}
    </div>
  );
}
