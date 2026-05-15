import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail01Icon, CallIcon, Location01Icon } from "hugeicons-react";

export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[#003d29]">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Reach out to us through any of the channels below or send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Mail01Icon className="size-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">support@gromuse.com</p>
                  <p className="text-muted-foreground">info@gromuse.com</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <CallIcon className="size-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 000-0000</p>
                  <p className="text-muted-foreground">Mon-Fri, 9am-6pm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Location01Icon className="size-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">123 Market Street</p>
                  <p className="text-muted-foreground">San Francisco, CA 94103</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FloatingInput id="first-name" label="First Name" />
                  </div>
                  <div className="space-y-2">
                    <FloatingInput id="last-name" label="Last Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <FloatingInput id="email" type="email" label="Email Address" />
                </div>
                <div className="space-y-2">
                  <FloatingInput id="subject" label="Subject" />
                </div>
                <div className="space-y-2">
                  <FloatingTextarea
                    id="message"
                    label="Message"
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-[#003d29] hover:bg-[#002a1c] text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
