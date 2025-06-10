
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
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-6">
        <p>
          Welcome to JPEGify ("us", "we", or "our"). We operate the JPEGify
          website (the "Service"). This page informs you of our policies
          regarding the collection, use, and disclosure of personal data when you
          use our Service and the choices you have associated with that data.
        </p>
        <p className="font-bold text-destructive">
          Disclaimer: This is a boilerplate privacy policy. You MUST replace
          this content with a policy that accurately reflects your data
          handling practices and complies with all applicable laws. Consult
          with a legal professional.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Information Collection and Use
          </h2>
          <p>
            We aim to minimize data collection. Our core service, JPEG image
            compression, is performed entirely within your browser. Images you
            upload for compression are NOT sent to our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Log Data</h2>
          <p>
            Like many site operators, we may collect information that your
            browser sends whenever you visit our Service ("Log Data"). This Log
            Data may include information such as your computer's Internet
            Protocol ("IP") address (anonymized where possible), browser type,
            browser version, the pages of our Service that you visit, the time
            and date of your visit, the time spent on those pages, and other
            statistics. This data is used for website analytics and to improve
            our service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Cookies</h2>
          <p>
            Cookies are files with a small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            website and stored on your computer's hard drive.
          </p>
          <p>
            We use cookies for several purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Essential Cookies:</strong> To operate our Service, for
              example, to remember your cookie consent preferences.
            </li>
            <li>
              <strong>Advertising Cookies:</strong> We use Google AdSense to
              display advertisements on our Service. Google AdSense uses
              cookies to serve ads based on a user's prior visits to our
              website or other websites. Google's use of advertising cookies
              enables it and its partners to serve ads to our users based on
              their visit to our sites and/or other sites on the Internet. Users
              may opt out of personalized advertising by visiting{" "}
              <Link
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ads Settings
              </Link>
              .
            </li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our Service. Please see
            our Cookie Consent tool for more granular control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Service Providers (Google AdSense)
          </h2>
          <p>
            We use third-party Service Providers to facilitate our Service, to
            provide the Service on our behalf, or to assist us in analyzing how
            our Service is used. Specifically, we use Google AdSense for
            advertising.
          </p>
          <p>
            Google AdSense, as a third-party vendor, uses cookies to serve ads
            on our Service. Google's use of the DART cookie (or similar
            technologies) enables it to serve ads to our users based on their
            visit to our Service and other sites on the Internet. Users may opt
            out of the use of the DART cookie by visiting the Google ad and
            content network privacy policy. For more information on the privacy
            practices of Google, please visit the Google Privacy &amp; Terms web
            page:{" "}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://policies.google.com/privacy
            </Link>
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Data Security</h2>
          <p>
            The security of your data is important to us. Since our core image compression functionality is client-side, your images are not transmitted to our servers. For any data we do collect (like analytics or cookie preferences), we strive to use commercially acceptable means to protect it. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Children's Privacy
          </h2>
          <p>
            Our Service does not address anyone under the age of 13
            ("Children"). We do not knowingly collect personally identifiable
            information from children under 13. If you are a parent or guardian
            and you are aware that your Children has provided us with Personal
            Data, please contact us. If we become aware that we have collected
            Personal Data from children without verification of parental
            consent, we take steps to remove that information from our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please visit our{" "}
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
