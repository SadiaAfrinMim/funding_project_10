import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Ourmission = () => {
  useEffect(() => {
    AOS.init(3000); // Initialize AOS animations
  }, []);
 
  const missions = [
    {
      id: 1,
      title: "Free Education",
      description:
        "We aim to provide free education to underprivileged children and ensure access to learning materials.",
      icon: "📚", // Replace with an SVG or icon from a library
    },
    {
      id: 2,
      title: "Feed Poor Child",
      description:
        "Our mission is to end child hunger by providing nutritious meals to children in need.",
      icon: "🍲",
    },
    {
      id: 3,
      title: "Free Medicines",
      description:
        "Providing essential medicines free of cost to those who cannot afford them.",
      icon: "💊",
    },
    {
      id: 4,
      title: "Give Shelter",
      description:
        "Helping the homeless find shelter and a place to call home.",
      icon: "🏠",
    },
  ];

  return (
    <section data-aos="zoom-out-left" className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <h2 className="text-4xl font-bold text-center text-[#FF851B] mb-4">
        <Typewriter
            words={['OUR MISSION']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
           
          />
        </h2>
        <p className="text-center  max-w-3xl mx-auto mb-12">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore.
          Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className=" shadow-lg rounded-lg p-6 text-center border-t-4 border-[#FF851B]"
            >
              <div className="text-5xl text-[#FF851B] mb-4">{mission.icon}</div>
              <h3 className="text-xl font-bold text-[#FF851B] mb-2">{mission.title}</h3>
              <p className=" text-sm">{mission.description}</p>
              <a
                href="#"
                className="text-[#FF851B] font-bold mt-4 block hover:underline "
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default Ourmission;