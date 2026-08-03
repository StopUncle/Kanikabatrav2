import { notFound } from "next/navigation";
import MotionLab from "./MotionLab";

/**
 * Every motion technique the app can currently reach, on one URL, ordered
 * by what it costs rather than by how it looks.
 *
 * This exists so a motion decision can be made by comparing rather than by
 * arguing: a spring counter next to a linear one settles the question in a
 * second. Never reachable in production.
 */

export const metadata = {
  title: "Motion lab (dev)",
};

export default function MotionLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <MotionLab />;
}
