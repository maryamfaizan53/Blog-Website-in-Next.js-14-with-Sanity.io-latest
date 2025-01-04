import React from "react";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
  backgroundImageUrl: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  backgroundImageUrl,
}) => {
  return (
    <div
      className="relative flex items-center justify-center h-[80vh] w-full bg-cover bg-center object-cover object-top"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-bold text-white mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <Link href="/categories"
          className="inline-block bg-white hover:bg-pink-600 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
            {buttonLabel}
          
        </Link>
      </div>
    </div>
  );
};

export default Hero;
