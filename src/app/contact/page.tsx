
import type { Metadata } from "next";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us - JPEGify",
  description: "Get in touch with JPEGify for feedback, support, or inquiries. We're here to help!",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <header className="mb-12 text-center">
        <MessageSquare className="mx-auto h-16 w-16 text-primary mb-4 sm:h-20 sm:w-20" />
        <h1 className="text-4xl font-bold font-headline text-primary sm:text-5xl md:text-6xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl font-body">
          We&apos;d love to hear from you! Whether you have questions, feedback, or just want to say hello.
        </p>
      </header>

      <Card className="shadow-xl bg-card rounded-xl">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <Send className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl sm:text-3xl font-semibold font-headline text-card-foreground">Get in Touch</CardTitle>
          </div>
          <CardDescription className="font-body pt-1">
            If you have any questions, feedback, feature requests, or bug reports, please don&apos;t hesitate to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
            <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-card-foreground font-headline">Email Us Directly</h3>
              <p className="text-muted-foreground font-body">
                For general inquiries, support, or feedback, the best way to reach us is by email:
              </p>
              <a
                href="mailto:jphabswebsites@gmail.com"
                className="text-primary hover:underline font-medium text-lg break-all"
              >
                jphabswebsites@gmail.com
              </a>
            </div>
          </div>
          
          <div className="text-center font-body">
            <p className="text-muted-foreground">
              We typically respond within 1-2 business days. We appreciate your patience and look forward to hearing from you!
            </p>
          </div>

          <div className="pt-2 text-center">
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                <a href="mailto:jphabswebsites@gmail.com">
                    Send an Email <Mail className="ml-2 h-5 w-5" />
                </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
