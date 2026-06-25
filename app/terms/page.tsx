import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function TermsPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-[#003d29]">
                    Terms & Conditions
                </h1>

                <p className="text-lg text-muted-foreground">
                    These Terms & Conditions govern the use of our e-commerce
                    platform by customers and visitors.
                </p>

                <p className="text-sm text-muted-foreground">
                    Last updated: May 14, 2026
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Overview</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Our platform allows customers to browse and purchase high-quality
                            pocket products directly from our e-commerce store.
                        </p>

                        <p>
                            By using this platform, you agree to comply with these Terms &
                            Conditions and all applicable laws and regulations.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Accounts</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                Users are responsible for maintaining the confidentiality of
                                their account credentials.
                            </li>

                            <li>
                                You must provide accurate and complete account information.
                            </li>

                            <li>
                                We reserve the right to suspend or terminate accounts involved
                                in fraudulent or abusive activities.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders & Payments</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            All orders are subject to product availability and confirmation.
                        </p>

                        <p>
                            We offer Cash on Delivery (COD) as our payment method for secure, 
                            in-person transactions upon receiving your package.
                        </p>

                        <p>
                            Prices, discounts, and promotions may change without prior
                            notice.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Shipping & Delivery</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Delivery times are estimates and may vary depending on the courier 
                            service and delivery location.
                        </p>

                        <p>
                            We aim to ensure timely shipment and provide accurate tracking information 
                            for all orders.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Returns & Refunds</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Please review our standard Return and Refund Policy for details on 
                            how to request returns, exchanges, or refunds for your purchases.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Prohibited Activities</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Fraudulent transactions or abuse of services</li>
                            <li>Posting misleading or false information</li>
                            <li>Attempting to disrupt platform operations</li>
                            <li>Violating intellectual property rights</li>
                            <li>Abusing promotional or discount codes</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Limitation of Liability</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            To the maximum extent permitted by law, we are not liable for any
                            indirect, incidental, or consequential damages resulting from the
                            use of our platform or services.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Changes to Terms</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            We may update these Terms & Conditions from time to time. Updated
                            terms will be posted on this page with a revised update date.
                        </p>

                        <p>
                            Continued use of the platform after changes become effective
                            constitutes acceptance of the updated terms.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
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