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
                    Terms of Service
                </h1>

                <p className="text-lg text-muted-foreground">
                    Terms of Service অনুযায়ী Pocket Shop–এর ওয়েবসাইট, ফেসবুক পেজ বা যেকোনো সার্ভিস ব্যবহার করলে আপনি নিচের শর্তাবলীতে সম্মত হচ্ছেন।
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>✅ 1. সাধারণ শর্ত</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>অর্ডার করার মাধ্যমে আপনি সঠিক তথ্য প্রদান করতে সম্মত হন</p>
                        <p>ভুল তথ্য দিলে অর্ডার বাতিল হতে পারে</p>
                        <p>আমরা যেকোনো অর্ডার গ্রহণ বা বাতিল করার অধিকার রাখি</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🛒 2. অর্ডার ও কনফার্মেশন</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>ওয়েবসাইট বা ফেসবুক পেজের মাধ্যমে অর্ডার করা যাবে</p>
                        <p>ফোন কলের মাধ্যমে অর্ডার কনফার্ম করা হবে</p>
                        <p>নির্দিষ্ট সময়ের মধ্যে ফোনে যোগাযোগ না হলে অর্ডার বাতিল হতে পারে</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>💰 3. মূল্য ও পেমেন্ট</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>সব মূল্য বাংলাদেশি টাকায় (BDT) উল্লেখ করা</p>
                        <p>Cash on Delivery (COD) প্রযোজ্য</p>
                        <p>নির্দিষ্ট ক্ষেত্রে অগ্রিম পেমেন্ট লাগতে পারে</p>
                        <p>মূল্য যেকোনো সময় পরিবর্তন করার অধিকার আমরা রাখি</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🚚 4. ডেলিভারি</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>ডেলিভারি সময় লোকেশন অনুযায়ী পরিবর্তিত হতে পারে</p>
                        <p>প্রাকৃতিক দুর্যোগ বা অনিবার্য কারণে দেরি হতে পারে</p>
                        <p>ডেলিভারি চার্জ প্রযোজ্য</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🔁 5. রিটার্ন ও রিপ্লেসমেন্ট</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>রিটার্ন ও রিপ্লেসমেন্ট আমাদের নির্ধারিত নীতিমালা অনুযায়ী হবে</p>
                        <p>ডেলিভারির সময় পণ্য চেক করা গ্রাহকের দায়িত্ব</p>
                        <p>ব্যবহৃত বা ক্ষতিগ্রস্ত পণ্য রিটার্নযোগ্য নয়</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>⚠️ 6. পণ্য সংক্রান্ত দায়</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>পণ্যের ব্যবহার গ্রাহকের নিজ দায়িত্বে</p>
                        <p>ভুল ব্যবহারজনিত ক্ষতির দায় আমরা নেব না</p>
                        <p>পণ্যের রঙ বা সামান্য ডিজাইন পার্থক্য থাকতে পারে (ডিভাইস স্ক্রিন ভেদে)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>🔒 7. প্রাইভেসি</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>গ্রাহকের তথ্য আমাদের Privacy Policy অনুযায়ী ব্যবহৃত হবে</p>
                        <p>আমরা গ্রাহকের তথ্য নিরাপদ রাখার চেষ্টা করি</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📝 8. পরিবর্তনের অধিকার</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>আমরা যেকোনো সময় এই Terms আপডেট বা পরিবর্তন করতে পারি</p>
                        <p>আপডেটেড Terms ওয়েবসাইট বা পেজে প্রকাশ করা হবে</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>📞 9. যোগাযোগ</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-muted-foreground">
                        <p>যেকোনো প্রশ্ন বা অভিযোগের জন্য আমাদের অফিসিয়াল ফেসবুক পেজ বা কাস্টমার সাপোর্টে যোগাযোগ করুন।</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}