
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - JPEGify",
  description: "Privacy Policy for JPEGify - Smart Image Compression.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Last Updated: 6/11/2025
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-6">
        <p>
          JPEGify ("we", "us", or "our") respects your privacy. This Privacy
          Policy explains how we handle your data when you use our website:{" "}
          <a
            href="https://jpegify.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://jpegify.pages.dev
          </a>
          .
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            1. No Image Uploads
          </h2>
          <p>
            Your images <strong>never leave your device</strong>. All
            compression happens <strong>locally</strong> in your browser. We{" "}
            <strong>don’t upload, store, or view</strong> any images you
            compress using our tool.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            2. No Account, No Personal Info
          </h2>
          <p>
            You don’t need to create an account to use JPEGify. We do{" "}
            <strong>not ask for, collect, or store</strong> your name, email, or
            any personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            3. Ads (A-ADS)
          </h2>
          <p>
            We use <strong>A-ADS</strong>, a privacy-friendly ad network that{" "}
            <strong>doesn’t track you with cookies or collect personal data</strong>
            . Ads are shown to keep the service free.
          </p>
          <p>
            Learn more about A-ADS privacy here:{" "}
            <a
              href="https://a-ads.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://a-ads.com/privacy
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">4. Cookies</h2>
          <p>
            JPEGify <strong>does not use cookies</strong>. However, third-party
            ad networks (like A-ADS) may use{" "}
            <strong>non-tracking methods</strong> to display relevant ads. We
            don’t control or access that data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            5. Analytics
          </h2>
          <p>
            We <strong>don’t use Google Analytics or any third-party tracking
            services</strong>. We don’t track your activity on this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            6. External Links
          </h2>
          <p>
            Our site may link to other websites (e.g., via ads or the
            “Advertise here” link). We are{" "}
            <strong>not responsible for their content or privacy practices</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            7. Data Security
          </h2>
          <p>
            Since we don’t collect personal data, there’s{" "}
            <strong>nothing to secure on our end</strong>. Your images and
            actions stay in your browser.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy occasionally. If we do, we’ll post
            the new version here with the “Last Updated” date changed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">9. Contact</h2>
          <p>
            Got privacy questions? Visit our{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline"
            >
              Contact Page
            </Link>{" "}
            or email us if listed.
          </p>
        </section>
      </div>
    </div>
  );
}
