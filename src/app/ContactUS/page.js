'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LiquidChrome from '../components/organisms/LiquidChrome';
import ProtectedRoute from '../components/organisms/Access/ProtectedRoute';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/Contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Message sent successfully!');
        setFormSubmitted(true);
      } else {
        toast.error(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending message');
    }
  };

  return (
     <ProtectedRoute>
    <div className="relative bg-gradient-to-b from-black via-[#0f3e3b] to-black mt-20 min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome baseColor={[0.05, 0.1, 0.1]} interactive />
      </div>

      <Toaster position="top-right" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 text-white text-center">
        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center space-y-4 relative">
            {/* Back Button */}
            <button
              onClick={() => {
                setFormSubmitted(false);
                resetForm();
              }}
              className="absolute top-0 left-0 p-2 rounded-full hover:bg-white/10 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <DotLottieReact
              src="https://lottie.host/c9cc13c0-2fa8-4f27-8d43-acc34d8492d6/yWpFZBcvUd.lottie"
              autoplay
              loop
              style={{ width: 400, height: 380 }}
            />
            <h3 className="text-2xl font-bold text-green-400">Thanks for responding!</h3>
            <p className="text-white/70">We appreciate your message. We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-white/80 mb-10">
              We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 text-left">
              {[
                { name: 'name', type: 'text', placeholder: 'John Doe', label: 'Full Name' },
                { name: 'email', type: 'email', placeholder: 'you@example.com', label: 'Email' },
                { name: 'phone', type: 'tel', placeholder: '+91 9876543210', label: 'Phone Number' },
              ].map(({ name, type, placeholder, label }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-white/80">{label}</label>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    required={name !== 'phone'}
                    className="form-input"
                    autoComplete="off"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-white/80">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input text-white"
                >
                  <option value="" disabled>
                    Select Subject
                  </option>
                  <option className="text-black" value="Feedback">
                    Feedback
                  </option>
                  <option className="text-black" value="Help">
                    Help
                  </option>
                  <option className="text-black" value="Business">
                    Business
                  </option>
                  <option className="text-black" value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/80">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Type your message here..."
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>

      {/* Autofill fix + shared input styles */}
      <style jsx>{`
        input:-webkit-autofill,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.05) inset !important;
          -webkit-text-fill-color: white !important;
        }
        .form-input {
          width: 100%;
          margin-top: 0.25rem;
          padding: 0.75rem 1rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
          color: white;
          outline: none;
          transition: border 0.3s, background-color 0.3s;
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        .form-input:focus {
          border-color: #34d399;
          box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.5);
        }
      `}</style>
    </div>
     </ProtectedRoute>
  );
}
