
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions - JPEGify",
  description: "Terms and Conditions for JPEGify - Smart Image Compression.",
};

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Last Updated: 6/11/2025
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-6">
        <p>
          Please read these Terms and Conditions ("Terms") carefully before
          using the JPEGify website (the "Service") operated by JPEGify ("we",
          "us", or "our").
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these
          Terms. If you don’t agree, don’t use the site.
        </p>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            1. Service Description
          </h2>
          <p>
            JPEGify is a free tool that compresses JPEG images directly in your
            browser. No images are uploaded to our servers. Everything happens
            on your device.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            2. Use of Service
          </h2>
          <p>
            You agree to use JPEGify legally and respectfully. Don’t use it to
            process or share any images that are:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Illegal</li>
            <li>Harmful or abusive</li>
            <li>Violent, hateful, or discriminatory</li>
            <li>Sexually explicit or obscene</li>
            <li>Infringing on anyone’s copyright or trademarks</li>
          </ul>
          <p>
            Basically, don’t use JPEGify for shady stuff.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            3. Ownership & Copyright
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              JPEGify and its original code, design, and branding belong to us.
            </li>
            <li>
              You <strong>own all rights</strong> to your images. We{" "}
              <strong>don’t collect</strong>, store, or claim ownership over
              anything you compress here.
            </li>
          </ul>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            4. Ads and Third-Party Content
          </h2>
          <p>
            This site displays ads (e.g. A-ADS) to keep it free. Any
            interactions you have with advertisers are between you and them. We
            don’t control or guarantee their content or offers.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            5. Limitation of Liability
          </h2>
          <p>
            JPEGify is provided <strong>as-is</strong>. We’re not responsible
            for:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Loss of data or files</li>
            <li>Bugs, glitches, or errors</li>
            <li>Downtime or unavailability</li>
            <li>Ads you see on the site</li>
            <li>Anything you do with your compressed images</li>
          </ul>
          <p>
            You use this site at your own risk.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            6. No Warranties
          </h2>
          <p>
            We don’t promise the Service will always work perfectly. There are{" "}
            <strong>no guarantees</strong>, including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>That it’ll always be online or error-free</li>
            <li>That it’s 100% bug-free or secure</li>
            <li>That it meets your expectations</li>
          </ul>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            7. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the{" "}
            <strong>Republic of the Philippines</strong>, without regard to any
            conflict of law rules.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            8. Changes to These Terms
          </h2>
          <p>
            We can update these Terms at any time. If the changes are big,
            we’ll try to post a notice on the site. By using JPEGify after an
            update, you agree to the new version.
          </p>
        </section>

        <hr className="my-6 border-border" />

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">9. Contact</h2>
          <p>
            Got questions? Hit us up through the contact form on our site or
            email if we provide one. You can reach us via our{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline"
            >
              Contact Page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
