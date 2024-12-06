import React from 'react';
import img from '../../assets/faq.jpg'
import { Typewriter } from 'react-simple-typewriter';

const Faq = () => {
  return (
    <div className=" rounded-none mx-auto p-6  shadow-lg">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
        <h2 className="text-3xl font-bold text-center text-[#FF851B] mb-6">
        <Typewriter
          words={[" Frequently Asked Questions"]}
          loop={5}
          cursor
          cursorStyle="_!"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>
      <div className="space-y-4">
        {/* FAQ 1 */}
        <div className="collapse collapse-arrow border-2 border-orange-500  shadow-md rounded-lg">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
            What is this platform about?
          </div>
          <div className="collapse-content  p-4 rounded-b-lg">
            <p className="">
              This platform is a dedicated crowdfunding solution aimed at bringing people together to support meaningful causes. Whether you’re passionate about helping underprivileged communities, funding creative projects, or contributing to environmental initiatives, this platform provides the tools you need. Users can create campaigns to raise funds for emergencies, personal needs, or social movements. By enabling a transparent and user-friendly system, donors can directly see the impact of their contributions. Our mission is to empower individuals and organizations to make a tangible difference in the world by leveraging the power of collective generosity.
            </p>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="collapse collapse-arrow border-2 border-orange-500  shadow-md rounded-lg">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
            How can I donate to a campaign?
          </div>
          <div className="collapse-content  p-4 rounded-b-lg">
            <p className="">
              Donating to a campaign on our platform is simple and secure. Begin by browsing the campaigns and selecting the one you wish to support. Once you’ve chosen, click on the campaign to view details and updates. On the campaign page, you’ll find a “Donate” button that guides you through the process. Enter your desired donation amount, choose a payment method (credit card, PayPal, or others), and complete the transaction. Our secure payment gateway ensures your information is protected. After donating, you’ll receive a confirmation email with a receipt and updates on how your contribution is being utilized.
            </p>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="collapse collapse-arrow border-2 border-orange-500  shadow-md rounded-lg">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
            How do I create a campaign?
          </div>
          <div className="collapse-content  p-4 rounded-b-lg">
            <p className="">
              Creating a campaign is an easy process designed for both individuals and organizations. First, sign up or log in to your account. Navigate to the “Create Campaign” section from your dashboard. Fill in the required details, such as the title, description, target amount, and duration. You can also upload relevant images or videos to make your campaign more appealing. Be clear about the purpose of your campaign and explain how the funds will be used. After submitting, our team reviews your campaign to ensure compliance with guidelines. Once approved, your campaign will go live, and you can start sharing it to reach potential donors.
            </p>
          </div>
        </div>
      </div>
        </div>
        <div className=' shadow-2xl'>
            <img className='rounded-xl' src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
