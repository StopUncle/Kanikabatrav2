"use client";

import { useCallback, useState } from "react";
import SessionsSection from "./SessionsSection";
import SessionFeedbackModal from "./SessionFeedbackModal";

interface Session {
  id: string;
  packageName: string;
  sessionCount: number;
  scheduledAt: string | null;
  duration: number;
  status: string;
  meetingUrl: string | null;
  notes: string | null;
  userNotes: string | null;
  feedback?: {
    rating: number;
    feedback?: string;
  };
}

interface Props {
  initialSessions: Session[];
}

export default function DashboardSessionsCard({ initialSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [feedbackSessionId, setFeedbackSessionId] = useState<string | null>(
    null,
  );
  const [feedbackSessionTitle, setFeedbackSessionTitle] = useState<string>("");

  const handleNotesUpdate = useCallback(
    async (sessionId: string, notes: string) => {
      const res = await fetch(`/api/user/sessions/${sessionId}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userNotes: notes }),
      });
      if (!res.ok) throw new Error("Failed to update notes");
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, userNotes: notes } : s)),
      );
    },
    [],
  );

  const handleLeaveFeedback = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        setFeedbackSessionId(sessionId);
        setFeedbackSessionTitle(session.packageName);
      }
    },
    [sessions],
  );

  const handleFeedbackSuccess = useCallback(
    (rating: number) => {
      if (feedbackSessionId) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === feedbackSessionId
              ? { ...s, feedback: { rating, feedback: "" } }
              : s,
          ),
        );
      }
    },
    [feedbackSessionId],
  );

  return (
    <>
      <SessionsSection
        sessions={sessions}
        onNotesUpdate={handleNotesUpdate}
        onLeaveFeedback={handleLeaveFeedback}
      />
      {feedbackSessionId && (
        <SessionFeedbackModal
          isOpen={!!feedbackSessionId}
          onClose={() => setFeedbackSessionId(null)}
          sessionId={feedbackSessionId}
          sessionTitle={feedbackSessionTitle}
          onSuccess={handleFeedbackSuccess}
        />
      )}
    </>
  );
}
