import { Metadata } from "next";
import { BookPageClient } from "./book-page-client";

export const metadata: Metadata = {
  title: "Randevu Al",
  description: "Hızlıca randevu alın",
};

export default function BookPage() {
  return <BookPageClient />;
}
