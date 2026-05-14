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
                <h1 className="text-4xl font-bold tracking-tight">
                    Terms & Conditions
                </h1>

                <p className="text-lg text-muted-foreground">
                    These Terms & Conditions govern the use of our multi-vendor
                    e-commerce platform by customers, vendors, and visitors.
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
                            Our platform allows independent vendors to list, sell, and manage
                            products while customers can browse and purchase products from
                            multiple sellers in one marketplace.
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
                        <CardTitle>Vendor Responsibilities</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                Vendors are responsible for the accuracy of product listings,
                                pricing, descriptions, and inventory.
                            </li>

                            <li>
                                Vendors must ensure that products comply with applicable laws
                                and regulations.
                            </li>

                            <li>
                                Vendors are responsible for shipping, fulfillment, customer
                                support, and handling returns when applicable.
                            </li>

                            <li>
                                Prohibited, illegal, counterfeit, or harmful products are not
                                allowed on the platform.
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
                            All orders are subject to product availability and payment
                            confirmation.
                        </p>

                        <p>
                            Payments are processed securely through third-party payment
                            providers. We do not store sensitive payment information directly
                            on our servers.
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
                            Delivery times are estimates and may vary depending on the vendor,
                            courier service, and location.
                        </p>

                        <p>
                            Vendors are responsible for ensuring timely shipment and providing
                            accurate tracking information where available.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Returns & Refunds</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Return and refund policies may vary between vendors. Customers
                            should review individual vendor policies before purchasing.
                        </p>

                        <p>
                            We reserve the right to mediate disputes between customers and
                            vendors when necessary.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Prohibited Activities</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Fraudulent transactions or chargebacks</li>
                            <li>Posting misleading or false information</li>
                            <li>Attempting to disrupt platform operations</li>
                            <li>Violating intellectual property rights</li>
                            <li>Selling restricted or illegal products</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Limitation of Liability</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>
                            Our platform acts as a marketplace connecting buyers and vendors.
                            We are not directly responsible for vendor products, delivery
                            delays, or disputes arising between buyers and sellers.
                        </p>

                        <p>
                            To the maximum extent permitted by law, we are not liable for any
                            indirect, incidental, or consequential damages resulting from the
                            use of our services.
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