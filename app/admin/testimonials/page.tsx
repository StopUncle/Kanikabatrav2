import { prisma } from "@/lib/prisma";
import TestimonialAdminClient from "./TestimonialAdminClient";

export const metadata = {
  title: "Testimonials | Admin",
};

export const dynamic = "force-dynamic";

export default async function TestimonialAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
  return <TestimonialAdminClient initial={testimonials} />;
}
