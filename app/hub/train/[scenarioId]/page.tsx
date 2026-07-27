/**
 * The scenario runner, inside the app shell.
 *
 * The runner itself is unchanged. What changes is the layout it renders
 * in: reached at /consilium/simulator/[id] it arrives wrapped in the old
 * member chrome, so tapping a scenario from the app dropped you into the
 * old Consilium and its navigation before the game appeared. At this URL
 * it renders inside the app, which is where the member already was.
 *
 * Re-exported rather than copied. Two 156-line runners that must stay
 * identical is a bug waiting to happen, and the param shape is the same.
 */
export {
  default,
  generateMetadata,
} from "@/app/consilium/(member)/simulator/[scenarioId]/page";
