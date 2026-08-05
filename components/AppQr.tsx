/*
 * The QR encodes https://kanikarose.com/start, the cohort router the PWA
 * manifest already uses: members land on the feed, everyone else in the
 * app. If the URL ever changes, regenerate the path below with
 * `npx qrcode -t svg -e M "<url>"` and paste the stroke path in.
 */
const QR_PATH =
  "M4 4.5h7m2 0h1m3 0h3m1 0h3m2 0h7M4 5.5h1m5 0h1m4 0h7m2 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m4 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h5m1 0h2m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h3m4 0h2m2 0h2m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h2m1 0h1m5 0h2m1 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h1m3 0h1m1 0h1m2 0h2M4 12.5h1m1 0h5m3 0h2m4 0h2m1 0h1m2 0h5M4 13.5h3m4 0h1m4 0h4m3 0h6m3 0h1M6 14.5h2m2 0h2m1 0h1m1 0h6m3 0h5M4 15.5h2m2 0h2m1 0h1m1 0h1m1 0h3m1 0h1m2 0h2m2 0h1m2 0h1m1 0h1M4 16.5h4m2 0h1m1 0h1m2 0h2m1 0h2m1 0h1m7 0h2M4 17.5h3m2 0h1m1 0h3m2 0h1m2 0h2m1 0h7m3 0h1M7 18.5h1m1 0h3m2 0h2m6 0h1m2 0h1m3 0h2M5 19.5h1m1 0h2m3 0h1m2 0h2m1 0h1m1 0h1m2 0h2m2 0h1m3 0h1M5 20.5h1m2 0h6m1 0h1m4 0h2m1 0h1m5 0h2M4 21.5h3m2 0h1m3 0h1m1 0h1m1 0h3m3 0h1m2 0h3m1 0h1m1 0h1M4 22.5h1m1 0h5m2 0h1m1 0h8m1 0h2m1 0h2m1 0h1M4 23.5h1m2 0h2m3 0h1m2 0h3m1 0h1m2 0h1m1 0h3m1 0h1m2 0h1M4 24.5h1m2 0h2m1 0h1m5 0h1m1 0h2m1 0h1m2 0h5m1 0h3M12 25.5h1m3 0h1m2 0h2m3 0h1m3 0h5M4 26.5h7m4 0h1m7 0h2m1 0h1m1 0h3M4 27.5h1m5 0h1m1 0h3m3 0h1m1 0h1m1 0h3m3 0h1m2 0h1M4 28.5h1m1 0h3m1 0h1m1 0h2m1 0h1m4 0h1m1 0h1m1 0h5m1 0h1m1 0h1M4 29.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h3m1 0h4m4 0h2M4 30.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h1m1 0h3m3 0h7M4 31.5h1m5 0h1m3 0h6m1 0h4m1 0h2m1 0h1m1 0h1M4 32.5h7m1 0h1m2 0h1m2 0h2m3 0h1m2 0h1m3 0h1";

/** The install QR on its ivory tile. Size the svg via className. */
export default function AppQr({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 37 37"
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code for the Consilium app at kanikarose.com/start"
      className={className}
    >
      <path stroke="#0f0d0a" d={QR_PATH} />
    </svg>
  );
}
