export function ConnectWithUs() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-opaci bg-gradient-to-br from-[#1877F2] to-[#0C5DC7]/40 px-6 py-16 md:px-16 md:py-20">
        {/* Decorative elements */}
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full border border-white/10" />
        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full border border-white/5" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="50" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Floating Facebook icons decoration */}
        <div className="absolute right-12 top-12 opacity-10">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
        <div className="absolute bottom-16 left-16 opacity-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="white"
              className="drop-shadow-lg"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Connect With Us
          </h2>

          {/* Description */}
          <p className="mb-10 max-w-md text-lg text-white/80">
            Follow us on Facebook for the latest updates, exclusive offers, and
            product inspiration!
          </p>

          {/* Facebook Button */}
          <a
            href="https://www.facebook.com/Pocketshop"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#1877F2] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#1877F2"
              className="transition-transform duration-300 group-hover:rotate-6"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Follow us on Facebook</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          {/* Subtext */}
          <p className="mt-6 text-sm text-white/60">
            @Pocketshop &bull; Join our growing community
          </p>
        </div>
      </div>
    </section>
  );
}