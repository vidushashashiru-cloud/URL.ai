export default function NotFound() {
  return (
    <div className="wrap">
      <a href="/" className="wordmark">
        url<b>.io</b>
      </a>
      <div className="interstitial">
        <h1>This link doesn't exist</h1>
        <p>It may have been mistyped, or it was never created.</p>
        <a href="/">Shorten a new link</a>
      </div>
    </div>
  );
}
