"use client";

import { useRouter } from "next/navigation";
import UpgradeSheet, { type UpgradeTrigger } from "./UpgradeSheet";

/**
 * The wall as a whole route, for when someone lands on something they do
 * not have rather than bumping into it mid-flow.
 *
 * A free account that opens a locked chapter used to be redirected to the
 * Train room with no explanation, which reads as the app being broken
 * rather than as an invitation. Here the chapter they reached for is named
 * and the sheet opens on top of the room's own backdrop; dismissing it puts
 * them back in the room, which is where the redirect was sending them
 * anyway.
 */
export default function UpgradeWall({
  trigger,
  nextChapterTitle,
  returnHref = "/app/train",
}: {
  trigger: UpgradeTrigger;
  nextChapterTitle?: string | null;
  returnHref?: string;
}) {
  const router = useRouter();
  return (
    <UpgradeSheet
      open
      trigger={trigger}
      nextChapterTitle={nextChapterTitle}
      onClose={() => router.replace(returnHref)}
    />
  );
}
