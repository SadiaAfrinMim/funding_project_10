import Aos from 'aos';
import React, { useEffect } from 'react';

const Footer = () => {
  
    useEffect(()=>{
        Aos.init({duration : 2000});
      },[])
    return (
      <div>
          <footer className="footer bg-base-200 text-base-content p-10">
  <nav>
  <h6 className="footer-title">Donation Services</h6>
<a className="link link-hover">Fundraising Assistance</a>
<a className="link link-hover">Campaign</a>
<a className="link link-hover">Donation Tracking</a>
<a className="link link-hover">Awareness Campaigns</a>

  </nav>
  <nav>
  <h6 className="footer-title">Donation</h6>
<a className="link link-hover">About Us</a>
<a className="link link-hover">Our Mission</a>
<a className="link link-hover">Donate with Us</a>
<a className="link link-hover">Partners & Sponsors</a>

  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered rounded-none join-item" />
        <button className="btn rounded-none text-white  bg-gradient-to-r from-[#FF851B] to-[#FFDC00] join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
  
</footer>
<div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} SadiaFund. All Rights Reserved.</p>
          </div>
      </div>
    );
};

export default Footer;