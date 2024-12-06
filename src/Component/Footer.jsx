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
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
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