import Image from "next/image";
import Link from "next/link";

interface HeroSlideProps {
  imageSrc: string;
  link?: string;
}

function HeroSlide({ imageSrc, link }: HeroSlideProps) {
  const href = link || "/shop";

  return (
    <Link
      href={href}
      className="block w-full h-full rounded-xl overflow-hidden shadow-lg shadow-gray-900/10 border border-white/40 group hover:shadow-gray-900/20 transition-shadow duration-300"
    >
      <div className="relative w-full h-full min-h-75 md:min-h-100 lg:min-h-137.5">
        <Image
          src={imageSrc}
          alt="Hero slide"
          fill
          className="object-cover"
          priority
        />
      </div>
    </Link>
  );
}

export default HeroSlide;
