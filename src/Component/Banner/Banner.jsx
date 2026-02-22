import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden group">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {/* Slide 1 */}
        <div className="w-full flex-shrink-0 relative">
          <img
            src="https://i.ibb.co/XFHKY0r/businessman-woman-workplace-paperwork-dollar.jpg"
            className="w-full h-[500px] object-cover transform transition-all duration-1000 scale-110 group-hover:scale-105"
            alt="Slide 1"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">
              Empower Ideas with Your Support
            </h2>
            <p className="text-lg max-w-xl text-white/90 animate-fadeInUp delay-100">
              Discover campaigns that ignite change and uplift communities
            </p>
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none animate-fadeInUp delay-200">
              Explore Campaigns
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="w-full flex-shrink-0 relative">
          <img
            src="https://i.ibb.co/4WHWYbb/premium-photo-1706061121923-e2aef3d28939.jpg"
            className="w-full h-[500px] object-cover transform transition-all duration-1000 scale-110 group-hover:scale-105"
            alt="Slide 2"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">
              Join Hands for a Brighter Future
            </h2>
            <p className="text-lg max-w-xl text-white/90 animate-fadeInUp delay-100">
              Empower creators and innovators. Together we create change
            </p>
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none animate-fadeInUp delay-200">
              Get Started
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="w-full flex-shrink-0 relative">
          <img
            src="https://i.ibb.co/XFHKY0r/businessman-woman-workplace-paperwork-dollar.jpg"
            className="w-full h-[500px] object-cover transform transition-all duration-1000 scale-110 group-hover:scale-105"
            alt="Slide 3"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">
              Make Your Contribution Count
            </h2>
            <p className="text-lg max-w-xl text-white/90 animate-fadeInUp delay-100">
              Every small step creates a big impact
            </p>
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none animate-fadeInUp delay-200">
              Donate Now
            </button>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="w-full flex-shrink-0 relative">
          <img
            src="https://i.ibb.co/t2Jdjbg/high-angle-women-with-items.jpg"
            className="w-full h-[500px] object-cover transform transition-all duration-1000 scale-110 group-hover:scale-105"
            alt="Slide 4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">
              Inspire Transformations
            </h2>
            <p className="text-lg max-w-xl text-white/90 animate-fadeInUp delay-100">
              Unite with change-makers for sustainable solutions
            </p>
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none animate-fadeInUp delay-200">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-orange-500 scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle glass text-white hover:bg-orange-500 transition-all opacity-0 group-hover:opacity-100"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle glass text-white hover:bg-orange-500 transition-all opacity-0 group-hover:opacity-100"
      >
        <FaArrowRight />
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 150ms;
        }

        .delay-200 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default Banner;