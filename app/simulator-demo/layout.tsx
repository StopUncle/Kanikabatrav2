/**
 * Simulator demo layout — locks the body so the page can use `fixed inset-0`
 * without the site Footer (z-20) bleeding through. Without this, the Footer
 * renders in flow below an empty <main>, scrollbar appears, and the user can
 * see site chrome underneath the "cinematic" overlay. Not what we want.
 *
 * Once the simulator moves into /consilium/* this layout gets replaced by the
 * member layout, which already hides site chrome.
 */

export default function SimulatorDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body { overflow: hidden !important; }
      `}</style>
      {children}
    </>
  );
}
