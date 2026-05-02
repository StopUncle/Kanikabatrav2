"use client";

import React from "react";

/**
 * Error boundary for the simulator. Catches client-side React errors,
 * reports them to /api/simulator/client-error so we have server-side
 * visibility into "the simulator crashes midway" reports, and shows a
 * graceful recovery screen instead of a white page.
 *
 * Why bespoke instead of a generic boundary: we need the scenario/scene
 * context in the report so debugging doesn't reduce to "something
 * crashed somewhere." The runner passes those down via props.
 *
 * Recovery: the boundary offers a "Reload" button (full page refresh)
 * and an "Exit to scenario list" link. We don't try to recover in-place
 * because the scene state is likely corrupted at the point of crash.
 */

interface Props {
  scenarioId: string;
  /** Best-effort: passed by the runner whenever it has a current scene
   *  in state. The boundary won't always know this if the crash
   *  happened during the very first render. */
  currentSceneIdRef?: { current: string | null };
  exitHref: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class SimulatorErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || "Unknown error",
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Best-effort report. Failures are intentionally swallowed; if the
    // network is the thing that crashed the runner, the user shouldn't
    // see a second error from the report itself. The console.error
    // below remains for browser-side debugging.
    try {
      console.error(
        "[SimulatorErrorBoundary] caught",
        error,
        info.componentStack,
      );
      const payload = {
        scenarioId: this.props.scenarioId,
        currentSceneId: this.props.currentSceneIdRef?.current ?? undefined,
        errorName: error.name,
        errorMessage: error.message?.slice(0, 2000) ?? "",
        errorStack: error.stack?.slice(0, 2000),
        componentStack: info.componentStack?.slice(0, 2000),
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        viewportWidth:
          typeof window !== "undefined" ? window.innerWidth : undefined,
        viewportHeight:
          typeof window !== "undefined" ? window.innerHeight : undefined,
        url: typeof window !== "undefined" ? window.location.pathname : undefined,
      };
      // Use sendBeacon when available so the report fires even if the
      // user is mid-navigation away from the crash. Falls back to
      // fetch with keepalive=true on browsers without sendBeacon.
      const url = "/api/simulator/client-error";
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      let sent = false;
      if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
        sent = navigator.sendBeacon(url, blob);
      }
      if (!sent && typeof fetch !== "undefined") {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {
          /* swallow — already in error state */
        });
      }
    } catch {
      /* boundary must not throw */
    }
  }

  handleReload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-deep-black text-text-light flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-warm-gold/70 text-[10px] uppercase tracking-[0.4em] mb-4">
            Something broke mid-scenario
          </p>
          <h1 className="text-2xl sm:text-3xl font-extralight tracking-wider uppercase mb-5 text-text-light">
            Sorry about that.
          </h1>
          <p className="text-text-gray font-light text-sm sm:text-base leading-relaxed mb-2">
            The simulator hit an unexpected error. We&rsquo;ve logged it
            server-side so we can fix it.
          </p>
          <p className="text-text-gray/60 font-light text-xs leading-relaxed mb-8">
            Your progress to this point was saved. Reloading or exiting and
            re-entering the scenario should pick you back up.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full bg-warm-gold text-deep-black font-medium text-sm tracking-wider uppercase hover:bg-warm-gold/90 transition-all"
            >
              Reload
            </button>
            <a
              href={this.props.exitHref}
              className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full border border-warm-gold/40 text-warm-gold font-medium text-sm tracking-wider uppercase hover:bg-warm-gold/10 transition-all"
            >
              Exit
            </a>
          </div>

          {process.env.NODE_ENV !== "production" && (
            <p className="text-text-gray/40 text-[11px] mt-8 font-mono break-words">
              {this.state.errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
}
