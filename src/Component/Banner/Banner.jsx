import React from "react";

const Banner = () => {
  return (
    <div className="carousel w-full">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/XFHKY0r/businessman-woman-workplace-paperwork-dollar.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 1"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-125"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Welcome to Our Platform</h2>
          <p className="text-lg max-w-xl">
            Explore unique opportunities to support creative minds and inspiring campaigns. Whether you are looking to
            contribute, collaborate, or simply connect, we provide the perfect space to make meaningful differences.
          </p>
          <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg">
            Explore Now
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/4WHWYbb/premium-photo-1706061121923-e2aef3d28939.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 2"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Support Brilliant Ideas</h2>
          <p className="text-lg max-w-xl">
            Join hands with visionaries and innovators to bring groundbreaking ideas to life. Together, we can inspire
            change, one step at a time, by investing in projects that transform lives and communities.
          </p>
          <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg">
            Get Started
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/XFHKY0r/businessman-woman-workplace-paperwork-dollar.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 3"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-175"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Make a Difference</h2>
          <p className="text-lg max-w-xl">
            Empower communities by contributing to campaigns that uplift and inspire. Together, we can create
            opportunities that not only solve challenges but also leave a lasting legacy of change and hope.
          </p>
          <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg">
            Donate Now
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide4" className="btn btn-circle">❯</a>
        </div>
      </div>

      {/* Slide 4 */}
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co.com/t2Jdjbg/high-angle-women-with-items.jpg"
          className="w-full object-cover h-[500px]"
          alt="Slide 4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
          <h2 className="text-4xl font-bold">Inspire Change</h2>
          <p className="text-lg max-w-xl">
            Unleash the power of collaboration and creativity to address global challenges. Inspire meaningful
            transformations by supporting projects that leave a positive and sustainable impact on our world.
          </p>
          <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black rounded-lg">
            Learn More
          </button>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between md:flex hidden">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
