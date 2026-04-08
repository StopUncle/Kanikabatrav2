import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Inner Circle | Kanika Batra",
  description: "Private community for dark psychology education and personal transformation",
};

export default function InnerCircleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
