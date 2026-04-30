import { Metadata } from "next";
import ConsiliumQuizLanding from "./ConsiliumQuizLanding";

export const metadata: Metadata = {
  title: "The Dark Mirror. The Consilium | Kanika Batra",
  description:
    "Your complimentary Dark Mirror Assessment. Included with Consilium membership.",
};

export default function ConsiliumQuizPage() {
  return <ConsiliumQuizLanding />;
}
