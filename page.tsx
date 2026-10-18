export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <a href="/" className="wordmark">
        url<b>.io</b>
      </a>
      <h1>Privacy Policy</h1>
      <p className="lede">
        URL.IO stores the destination URL, the short code, a creation
        timestamp, and a click count for each link you create. We don't
        require an account and don't collect personal information directly.
        Pages on this site may show ads served by Google AdSense, which can
        set its own cookies — see Google's policies for details on that data.
      </p>
    </div>
  );
}
