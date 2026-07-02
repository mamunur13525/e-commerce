import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#003d29]">
                    Privacy Policy
                </h1>
            </div>

            <div className="h-[calc(100vh-700px)] mt-10">
                <Card>
                    <CardContent className="space-y-4 text-muted-foreground pt-6">
                        <p>
                            This Privacy Policy describes how we collect, use, and disclose your personal information when you visit or make a purchase from our store. We collect information like your name, billing address, shipping address, payment information, email address, and phone number to process your orders, fulfill requests, and communicate with you. You can also opt out of marketing communications at any time.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}