
import type { Metadata } from "next";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Contact Us - JPEGify",
  description: "Get in touch with JPEGify for feedback, support, or inquiries. We're here to help!",
};

export default function ContactPage() {
  const formSubmitUrl = "https://formsubmit.co/jphabswebsites+jpegify@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpegify.pages.dev';
  const redirectUrl = `${siteUrl}/contact`; // Or `${siteUrl}/contact?submitted=true` if you want to show a message

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
            Please use the form below to send us a message. We&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={formSubmitUrl} method="POST" className="space-y-6">
            {/* FormSubmit Hidden Inputs */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={redirectUrl} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_autoresponse" value="Thank you for contacting JPEGify! We've received your message and will get back to you soon." />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium text-foreground/90">Your Name</Label>
                <Input type="text" name="name" id="name" placeholder="John Doe" required className="text-base py-3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium text-foreground/90">Your Email</Label>
                <Input type="email" name="email" id="email" placeholder="you@example.com" required className="text-base py-3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="font-medium text-foreground/90">Subject (Optional)</Label>
              <Input type="text" name="subject" id="subject" placeholder="Feedback about JPEGify" className="text-base py-3" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium text-foreground/90">Your Message</Label>
              <Textarea name="message" id="message" rows={6} placeholder="Tell us what's on your mind..." required className="text-base py-3" />
            </div>

            <div>
              <Button type="submit" size="lg" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
          
          <div className="mt-10 text-center font-body">
            <p className="text-muted-foreground">
              We typically respond within 1-2 business days. We appreciate your patience!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              If you prefer, you can also email us directly at: <a href="mailto:jphabswebsites@gmail.com" className="text-primary hover:underline">jphabswebsites@gmail.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
