import {
    GiftIcon,
    CreditCardIcon,
    InvoiceIcon,
    ShoppingBag01Icon
} from "hugeicons-react";

const SERVICES = [
    {
        title: "Gromuse",
        subtitle: "Gift vouchers.",
        icon: GiftIcon,
    },
    {
        title: "Present a",
        subtitle: "Gift card",
        icon: CreditCardIcon,
    },
    {
        title: "Pay your",
        subtitle: "tabby invoice",
        icon: InvoiceIcon,
    },
    {
        title: "Order and",
        subtitle: "Collect",
        icon: ShoppingBag01Icon,
    },
];

export function ServicesSection() {
    return (
        <section className="relative overflow-hidden bg-[#aee670] py-20 text-[#003d29]">
            {/* Curved top (simulated with standard shape for now or we could use SVG) */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[60px] w-full fill-[#fafaf9]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 pt-10 text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-5xl">
                    We always provide
                    <br />
                    you the best in town
                </h2>
                <p className="mx-auto mb-16 max-w-2xl text-sm md:text-base opacity-90">
                    Since 2007 we have been delivering excellence in product development,
                    support & updates for frictionless shopping experiences.
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                    {SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-start justify-between overflow-hidden rounded-[2rem] bg-[#002a1c] p-8 text-left text-white transition-transform hover:-translate-y-2 h-[320px]"
                        >
                            {/* Text */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold leading-tight text-[#aee670]">
                                    {service.title}
                                    <br />
                                    <span className="text-white">{service.subtitle}</span>
                                </h3>
                            </div>

                            {/* Icon/Illustration Bottom */}
                            <div className="w-full flex justify-center mt-auto">
                                <service.icon className="h-32 w-32 text-[#aee670] opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curved bottom */}
            {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
           <svg ... />
       </div> 
       Skipping bottom curve for now as it flows into footer or next section usually.
       */}
        </section>
    );
}
