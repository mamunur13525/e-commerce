import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ReturnRefundPage() {
    return (
        <main className="container mx-auto max-w-4xl px-4 py-12">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-[#003d29]">
                    Return & Refund Policy
                </h1>
                <p className="text-lg text-muted-foreground">
                    Everything you need to know about returning a product and getting your refund.
                </p>
            </div>

            <div className="space-y-12">
                {/* Return Policy Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Return Policy (রিটার্ন নীতি)</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-6 text-gray-800">
                            <p className="font-semibold text-lg">Pocket Shop–এ আমরা সবসময় গ্রাহকের সন্তুষ্টিকে গুরুত্ব দিই। তাই নির্দিষ্ট শর্তসাপেক্ষে রিটার্ন ও এক্সচেঞ্জ সুবিধা প্রদান করা হয়।</p>
                            
                            <div className="space-y-4">
                                <h3 className="font-bold text-xl text-[#003d29]">🔁 Return Policy (রিটার্ন নীতি)</h3>
                                <p className="font-medium">নিম্নলিখিত ক্ষেত্রে পণ্য রিটার্ন করা যাবে:</p>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>ডেলিভারি বয়ের সামনে সাথে সাথে পণ্য চেক করে</li>
                                    <li>ভুল পণ্য পেলে</li>
                                    <li>ত্রুটিপূর্ণ বা ক্ষতিগ্রস্ত পণ্য পেলে</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-xl text-[#003d29]">✅ পণ্য পছন্দ না হলে</h3>
                                <p>ডেলিভারি বয়ের সামনে পণ্য রেখে ডেলিভারি চার্জ দিয়ে রিটার্ন করতে হবে।</p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-xl text-[#003d29]">❌ ডেলিভারি বয় চলে যাওয়ার পর সরাসরি রিটার্ন গ্রহণযোগ্য নয়।</h3>
                                <p>তবে অভিযোগ করলে আমরা এক্সচেঞ্জের ব্যবস্থা করবো।</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Replacement Policy Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Replacement Policy (রিপ্লেসমেন্ট নীতি)</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-4 text-gray-800">
                            <p className="font-medium">পণ্য রিসিভের ৩ / ৫ / ৭ দিনের মধ্যে (পণ্যভেদে প্রযোজ্য) রিপ্লেসমেন্ট আবেদন করা যাবে।</p>
                            
                            <div className="space-y-3">
                                <h3 className="font-bold text-xl text-[#003d29]">শর্তসমূহ:</h3>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>শুধুমাত্র ইলেকট্রনিক পণ্যের ক্ষেত্রে প্রযোজ্য</li>
                                    <li>নন-ইলেকট্রনিক পণ্যের রিপ্লেসমেন্ট নেই</li>
                                    <li>Change of mind হলে প্রযোজ্য নয়</li>
                                    <li>পণ্য অব্যবহৃত থাকতে হবে</li>
                                    <li>ব্যবহারজনিত ক্ষতি হলে প্রযোজ্য নয়</li>
                                    <li>অরিজিনাল প্যাকেজিং থাকতে হবে</li>
                                    <li>ভুল / ত্রুটিপূর্ণ / ক্ষতিগ্রস্ত হলে প্রযোজ্য</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Refund Policy Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Refund Policy (রিফান্ড নীতি)</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-4 text-gray-800">
                            <p className="font-medium">আমাদের কোনো ক্যাশ রিফান্ড সিস্টেম নেই</p>
                            <p className="font-medium">বিশেষ ক্ষেত্রে পণ্য এক্সচেঞ্জ করা হবে</p>
                            <p className="font-medium">এক্সচেঞ্জ পণ্যেও সমস্যা থাকলে উন্নতমানের পণ্য দেওয়া হতে পারে</p>
                            <p className="font-medium">সেই ক্ষেত্রে অল্প পরিমাণ অতিরিক্ত মূল্য যোগ হতে পারে</p>
                        </div>
                    </div>
                </section>

                {/* Return Shipping Charge Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">Return Shipping Charge</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-4 text-gray-800">
                            <ul className="list-disc space-y-2 pl-5">
                                <li>৫০% কাস্টমার বহন করবেন</li>
                                <li>৫০% Pocket Shop বহন করবে</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Damaged Product Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">📦 ক্ষতিগ্রস্ত পণ্য পেলে করণীয়</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-4 text-gray-800">
                            <ul className="list-disc space-y-2 pl-5">
                                <li>ডেলিভারি ম্যানের সামনে প্যাকেট খুলে চেক করুন</li>
                                <li>সমস্যা থাকলে সাথে সাথে রিটার্ন করুন</li>
                                <li>অথবা</li>
                                <li>স্পষ্ট আনবক্সিং ভিডিও রেকর্ড করুন</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Product Security Section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">🔒 পণ্য নিরাপত্তা নিশ্চয়তা</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl">
                        <div className="space-y-4 text-gray-800">
                            <p className="font-medium">আমাদের প্যাকেজিং ও নিরাপত্তা ব্যবস্থা:</p>
                            <ul className="list-disc space-y-2 pl-5">
                                <li>বাবল র্যাপ প্রোটেকশন</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}