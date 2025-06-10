
import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us - JPEGify",
  description: "Get in touch with JPEGify.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <header className="mb-10 text-center">
        <MessageSquare className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We'd love to hear from you!
        </p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
          <CardDescription>
            If you have any questions, feedback, or inquiries, please feel free
            to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">Email Us</h3>
              <p className="text-muted-foreground">
                For general inquiries, support, or feedback, please email us at:
              </p>
              <a
                href="mailto:jphabswebsites@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                jphabswebsites@gmail.com
              </a>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              We typically respond within 1-2 business days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
