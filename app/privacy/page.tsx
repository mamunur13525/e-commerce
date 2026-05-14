import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight">
                    Privacy Policy
                </h1>

                <p className="text-muted-foreground text-lg">
                    Your privacy is important to us. This Privacy Policy explains how we
                    collect, use, and protect your information when you use our platform.
                </p>

                <p className="text-sm text-muted-foreground">
                    Last updated: May 14, 2026
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Information We Collect</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            We may collect personal information such as your name, email
                            address, billing details, and account preferences when you use
                            our services.
                        </p>

                        <p>
                            We also collect technical information including device type,
                            browser information, IP address, and usage analytics to improve
                            platform performance and security.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How We Use Your Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Provide and maintain our services</li>
                            <li>Process transactions and payments</li>
                            <li>Improve user experience and platform features</li>
                            <li>Send important updates and notifications</li>
                            <li>Prevent fraud, abuse, and security threats</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cookies & Tracking</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            We use cookies and similar technologies to enhance your browsing
                            experience, remember preferences, and analyze traffic patterns.
                        </p>

                        <p>
                            You can control or disable cookies through your browser settings,
                            though some features may not function properly.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Data Protection</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            We implement industry-standard security measures to protect your
                            personal information from unauthorized access, disclosure, or
                            misuse.
                        </p>

                        <p>
                            However, no online platform can guarantee absolute security, and
                            users should also take steps to protect their accounts.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Third-Party Services</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Our platform may integrate with third-party services such as
                            payment gateways, analytics providers, or authentication systems.
                        </p>

                        <p>
                            These services may collect information according to their own
                            privacy policies, and we encourage users to review them.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Rights</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Depending on your location, you may have rights to access,
                            correct, delete, or export your personal information.
                        </p>

                        <p>
                            You may also request account deletion or withdraw consent for
                            certain data processing activities.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            If you have any questions about this Privacy Policy or your data,
                            please contact us.
                        </p>

                        <div className="rounded-lg border bg-muted/40 p-4">
                            <p>Email: support@example.com</p>
                            <p>Website: www.example.com</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}