
import type { Metadata } from "next";
import { CompressPageContent } from "@/components/compress-page-content";

export const metadata: Metadata = {
  title: "Compress JPEGs Online - JPEGify | Batch Image Optimizer",
  description: "Optimize and compress multiple JPEG images at once with JPEGify. Adjust quality and resolution. Secure in-browser processing.",
};

export default function CompressPage() {
  return <CompressPageContent />;
}
