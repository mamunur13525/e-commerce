import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    UserCircleIcon,
    ViewIcon,
    PackageIcon,
    Alert01Icon,
    DocumentValidationIcon,
    TruckDeliveryIcon,
    TaskDone01Icon,
    Location01Icon,
    CursorCircleSelection01Icon,
} from "hugeicons-react";

export default function ReturnRefundPage() {
    const steps = [
        {
            title: "Sign in to your Daraz Account, then go to the \"Account\" option on the bottom of your homepage.",
            icon: <UserCircleIcon className="size-6 text-white" />,
            align: "left"
        },
        {
            title: "Tap on \"View All Orders\" at the top of the page.",
            icon: <ViewIcon className="size-6 text-white" />,
            align: "right"
        },
        {
            title: "Tap on the \"Return/Refund\" option for the relevant order.",
            icon: <PackageIcon className="size-6 text-white" />,
            align: "left"
        },
        {
            title: "If you have ordered more than one item in the same order, then scroll through the items list and click on \"Return/Refund\" of the item you want to return.",
            icon: <CursorCircleSelection01Icon className="size-6 text-white" />,
            align: "right"
        },
        {
            title: "Select the type of return problem you're facing.",
            icon: <Alert01Icon className="size-6 text-white" />,
            align: "left"
        },
        {
            title: "Fill out the Online Return Form with all the relevant information and proof.",
            icon: <DocumentValidationIcon className="size-6 text-white" />,
            align: "right"
        },
        {
            title: "Select Pick Up or Drop Off as per your preference.",
            icon: <TruckDeliveryIcon className="size-6 text-white" />,
            align: "left"
        },
        {
            title: "Submit the request, after reading the Return/Refund policy.",
            icon: <TaskDone01Icon className="size-6 text-white" />,
            align: "right"
        },
        {
            title: "Head to your nearest drop-off point or wait for collection by our pick-up service. Ensure that your contact information is correct and available to avail our pickup services.",
            icon: <Location01Icon className="size-6 text-white" />,
            align: "center"
        }
    ];

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
                {/* How to return section */}
                <section>
                    <div className="bg-[#ff6a00] text-white py-4 px-6 rounded-t-xl text-center">
                        <h2 className="text-2xl font-bold uppercase tracking-wide">How to return a product?</h2>
                    </div>
                    <div className="bg-[#fff3eb] p-8 md:p-12 rounded-b-xl relative overflow-hidden">

                        <div className="relative max-w-2xl mx-auto">
                            {/* The dashed line */}
                            <div className="absolute left-1/2 top-4 bottom-12 w-1.5 border-l-4 border-dashed border-[#ff6a00] -translate-x-1/2 z-0 hidden md:block"></div>

                            {/* Mobile line */}
                            <div className="absolute left-8 top-4 bottom-12 w-1.5 border-l-4 border-dashed border-[#ff6a00] z-0 md:hidden"></div>

                            <div className="space-y-8 md:space-y-12 relative z-10">
                                {steps.map((step, index) => (
                                    <div key={index} className={`flex items-center gap-6 md:gap-0 ${step.align === 'center' ? 'flex-col justify-center text-center mt-12' : 'flex-row'}`}>

                                        {/* Left text block for desktop */}
                                        <div className={`hidden md:block md:w-1/2 ${step.align === 'left' ? 'text-right pr-12' : 'pl-12 opacity-0'}`}>
                                            {step.align === 'left' && <p className="text-gray-800 font-medium text-sm lg:text-base leading-relaxed">{step.title}</p>}
                                        </div>

                                        {/* Icon */}
                                        <div className={`relative flex-shrink-0 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-indigo-800 border-4 border-[#fff3eb] shadow-md ${step.align === 'center' ? 'md:mx-auto' : 'md:absolute md:left-1/2 md:-translate-x-1/2'}`}>
                                            {step.icon}
                                        </div>

                                        {/* Right text block for desktop */}
                                        <div className={`hidden md:block md:w-1/2 ${step.align === 'right' ? 'text-left pl-12' : 'pr-12 opacity-0'}`}>
                                            {step.align === 'right' && <p className="text-gray-800 font-medium text-sm lg:text-base leading-relaxed">{step.title}</p>}
                                        </div>

                                        {/* Mobile text block */}
                                        <div className={`md:hidden ${step.align === 'center' ? 'text-center' : 'text-left'}`}>
                                            <p className="text-gray-800 font-medium text-sm leading-relaxed">{step.title}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <p className="mt-6 text-sm text-center text-muted-foreground">
                        You can view your return tracking number as soon as you have filled the Online Return Form and logged your return request.
                    </p>
                </section>

                {/* Conditions section */}
                <section>
                    <Card className="border-t-4 border-t-[#003d29]">
                        <CardHeader>
                            <CardTitle className="text-2xl">CONDITIONS FOR RETURNS</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <p className="font-semibold text-gray-900 mb-4">
                                    To ensure a smooth and hassle-free return process, please review the requirements below:
                                </p>
                                <ol className="list-decimal space-y-3 pl-5 text-gray-700">
                                    <li>
                                        The product must be in its original condition—unused, unworn, unwashed, and free of any flaws. For fashion items, feel free to try them on to check the size, as this counts as unworn.
                                    </li>
                                    <li>
                                        Make sure you include the original tags, user manuals, warranty cards, freebies, invoice, and any accessories that came with the product.
                                    </li>
                                    <li>
                                        Please return the product in its original, undamaged manufacturer's packaging or box. If the product was delivered in Daraz packaging/box, kindly use the same packaging/box for the return. To avoid damage, do not tape or place stickers directly on the manufacturer's packaging/box.
                                    </li>
                                </ol>
                            </div>

                            <div className="font-semibold text-gray-900 bg-red-50 p-4 rounded-md border-l-4 border-red-500">
                                If your returned item does not meet these requirements, we may not be able to process your refund request.
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Important Reminder:</h3>
                                <ul className="list-disc space-y-2 pl-5 text-gray-700">
                                    <li>If your return request is rejected, the item will be sent back to you within 4-6 days, after the Quality Check Process.</li>
                                    <li>After three failed delivery attempts, the item will be marked as scrap, and no refund will be provided.</li>
                                </ul>
                            </div>

                            <p className="text-gray-700 pt-4 border-t">
                                We appreciate your understanding and cooperation in following these guidelines to ensure a smooth process. If you have any questions, feel free to contact our support team – we're always here to help!
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    );
}
