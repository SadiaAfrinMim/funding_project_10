import React from 'react';

const AboutUs = () => {
  return (
    <div className="px-6 py-4">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-orange-500">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Welcome to <span className="font-bold text-orange-500">SadiaFund</span>, your trusted platform for 
            <span className="font-bold text-orange-500"> impactful donations</span>. 
            We connect <span className="font-bold text-orange-500">donors</span> and <span className="font-bold text-orange-500">changemakers</span> 
            to bring hope to those who need it most.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-lg leading-relaxed">
            <p>
              At <span className="font-bold text-orange-500">SadiaFund</span>, we believe in creating a 
              <span className="font-bold text-orange-500"> brighter future</span> for everyone. Whether it's 
              <span className="font-bold text-orange-500"> supporting education</span>, providing 
              <span className="font-bold text-orange-500"> medical care</span>, or helping during 
              <span className="font-bold text-orange-500"> disasters</span>, every contribution counts and makes a difference.
            </p>
            <p className="mt-4">
              Join us in our mission to <span className="font-bold text-orange-500">empower communities</span> 
              and <span className="font-bold text-orange-500">change lives</span>. Together, we can make the world a 
              <span className="font-bold text-orange-500"> better place</span>, one step at a time.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co.com/gdm0LcS/youth-empowerment-in-Africa-1030x686.jpg"
              alt="About Us Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="border rounded-lg shadow-lg p-6 w-64">
              <h3 className="text-xl font-bold mb-2 text-orange-500">Transparency</h3>
              <p>Every penny you donate goes directly to the <span className="font-bold text-orange-500">cause you support</span>.</p>
            </div>
            <div className="border rounded-lg shadow-lg p-6 w-64">
              <h3 className="text-xl font-bold mb-2 text-orange-500">Impact</h3>
              <p>We focus on creating <span className="font-bold text-orange-500">real, measurable changes</span> in the lives of people.</p>
            </div>
            <div className="border rounded-lg shadow-lg p-6 w-64">
              <h3 className="text-xl font-bold mb-2 text-orange-500">Community</h3>
              <p>We connect <span className="font-bold text-orange-500">donors</span> and 
              <span className="font-bold text-orange-500"> communities</span> for a shared mission of hope.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
