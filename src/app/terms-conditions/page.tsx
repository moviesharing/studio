
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
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground space-y-6">
        <p>
          Please read these Terms and Conditions ("Terms", "Terms and
          Conditions") carefully before using the JPEGify website (the
          "Service") operated by JPEGify ("us", "we", or "our").
        </p>
        <p className="font-bold text-destructive">
          Disclaimer: This is boilerplate content for Terms and Conditions. You
          MUST replace this content with terms that accurately reflect your
          service and comply with all applicable laws. Consult with a legal
          professional.
        </p>
        <p>
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users, and others who access or use the Service.
        </p>
        <p>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Service Description
          </h2>
          <p>
            JPEGify provides an online tool for compressing JPEG images. The
            compression process is performed locally in the user's browser. No
            images are uploaded to our servers for the core compression
            functionality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Use of Service
          </h2>
          <p>
            You agree to use the Service only for lawful purposes and in a way
            that does not infringe the rights of, restrict or inhibit anyone
            else's use and enjoyment of the Service.
          </p>
          <p>
            Prohibited behavior includes uploading or processing any images that
            are illegal, harmful, threatening, abusive, harassing, defamatory,
            vulgar, obscene, or otherwise objectionable, or that infringe any
            party's intellectual property or other proprietary rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Intellectual Property
          </h2>
          <p>
            The Service and its original content (excluding content provided by
            users), features, and functionality are and will remain the
            exclusive property of JPEGify and its licensors. The Service is
            protected by copyright, trademark, and other laws of both foreign
            countries. Our trademarks and trade dress may not be used in
            connection with any product or service without the prior written
            consent of JPEGify.
          </p>
          <p>
            You retain all rights to any images you process through the Service.
            We claim no ownership over your images.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Advertisements
          </h2>
          <p>
            The Service may display advertisements, such as those provided by
            Google AdSense. These advertisements are necessary for us to provide
            the Service free of charge. Your interactions with any advertisers
            found on or through the Service, including payment and delivery of
            goods or services, and any other terms, conditions, warranties or
          representations associated with such dealings, are solely between
            you and such advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Limitation Of Liability
          </h2>
          <p>
            In no event shall JPEGify, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from (i) your access to or use of or
            inability to access or use the Service; (ii) any conduct or content
            of any third party on the Service; (iii) any content obtained from
            the Service; and (iv) unauthorized access, use or alteration of
            your transmissions or content, whether based on warranty, contract,
            tort (including negligence) or any other legal theory, whether or
            not we have been informed of the possibility of such damage, and
            even if a remedy set forth herein is found to have failed of its
            essential purpose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is
            provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
            provided without warranties of any kind, whether express or
            implied, including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement
            or course of performance.
          </p>
          <p>
            JPEGify its subsidiaries, affiliates, and its licensors do not
            warrant that a) the Service will function uninterrupted, secure or
            available at any particular time or location; b) any errors or
            defects will be corrected; c) the Service is free of viruses or
            other harmful components; or d) the results of using the Service
            will meet your requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">
            Governing Law
          </h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of [Your Jurisdiction - e.g., California, USA], without regard
            to its conflict of law provisions. You MUST replace "[Your
            Jurisdiction]" with the actual governing jurisdiction.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at
            our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If
            you do not agree to the new terms, please stop using the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-primary/90">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please visit our{" "}
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
