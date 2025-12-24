// app/hackthejam/register/page.js
"use client";

import { useState } from "react";

export default function HackTheJamRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Add checkbox value if not checked
    if (!data.takeSurvey) {
      data.takeSurvey = 'no';
    }

    try {
      // Your Google Apps Script URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFvu6MF_P6Rwc4-J9l6Xz5m3tEkMlOlt3Xhqn3clscgRrBqqGwf9L2J3DEXEGCiZNQvg/exec';
      
      // Submit to Google Apps Script using JSON
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Since we can't read the response in no-cors mode, assume success
      setIsSubmitted(true);
      
    } catch (err) {
      console.error('Error:', err);
      setError('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCorperChange = (e) => {
    const serviceLocationGroup = document.getElementById('serviceLocationGroup');
    const serviceLocationInput = document.getElementById('serviceLocation');
    
    if (e.target.value === 'yes') {
      serviceLocationGroup.style.display = 'block';
      serviceLocationInput.required = true;
    } else {
      serviceLocationGroup.style.display = 'none';
      serviceLocationInput.required = false;
      serviceLocationInput.value = '';
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5" style={{
        backgroundImage: 'url(/hackthejam-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="rounded-[20px] shadow-xl overflow-hidden max-w-md w-full min-h-[600px] border-2 text-center" style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          borderColor: 'rgba(0, 0, 0, 0.6)'
        }}>
          <div className="p-12">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
              <p className="text-gray-300 mb-4">
                Your registration for Hack the Jam has been received successfully. We&apos;ll be in touch soon with more details about the event.
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                window.location.reload();
              }}
              className="border-2 border-white bg-transparent text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Submit Another Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-8" style={{
      backgroundImage: 'url(/hackthejam-background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="rounded-[20px] shadow-xl overflow-hidden max-w-md w-full min-h-[600px] border-2" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor: 'rgba(0, 0, 0, 0.6)'
      }}>
        {/* Form Section */}
        <div className="w-full p-12 flex flex-col justify-center" style={{
          backgroundColor: 'transparent'
        }}>
          <h1 className="text-white text-3xl font-bold mb-2">Hack the Jam</h1>
          <p className="text-gray-400 text-base mb-12">Register your interest and join the innovation!</p>
          
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-5 text-center">
              {error}
            </div>
          )}
          
                      <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <label htmlFor="name" className="block text-white font-medium mb-3 text-sm">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-4 border-none rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="mb-10">
              <label htmlFor="email" className="block text-white font-medium mb-3 text-sm">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-4 border-none rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <fieldset className="mb-10">
              <legend className="block text-white font-medium mb-4 text-sm">
                Do you already have an idea for the hackathon? *
              </legend>
              <div className="flex gap-5 mt-3">
                <div className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    id="hasIdea"
                    name="hasIdea"
                    value="yes"
                    required
                    className="w-auto m-0"
                  />
                  <label htmlFor="hasIdea" className="text-sm">Yes, I have an idea</label>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    id="noIdea"
                    name="hasIdea"
                    value="no"
                    required
                    className="w-auto m-0"
                  />
                  <label htmlFor="noIdea" className="text-sm">No, I&apos;m looking for ideas</label>
                </div>
              </div>
            </fieldset>

            <fieldset className="mb-10">
              <legend className="block text-white font-medium mb-4 text-sm">
                Are you an NYSC Corper? *
              </legend>
              <div className="flex gap-5 mt-3">
                <div className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    id="isCorper"
                    name="isCorper"
                    value="yes"
                    required
                    onChange={handleCorperChange}
                    className="w-auto m-0"
                  />
                  <label htmlFor="isCorper" className="text-sm">Yes</label>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    id="notCorper"
                    name="isCorper"
                    value="no"
                    required
                    onChange={handleCorperChange}
                    className="w-auto m-0"
                  />
                  <label htmlFor="notCorper" className="text-sm">No</label>
                </div>
              </div>
            </fieldset>

            <div id="serviceLocationGroup" style={{ display: 'none' }} className="mb-10">
              <label htmlFor="serviceLocation" className="block text-white font-medium mb-2 text-sm">
                Where are you serving/did you serve?
              </label>
              <input
                type="text"
                id="serviceLocation"
                name="serviceLocation"
                className="w-full p-4 border-none rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g., Lagos State, Abuja, Kano State"
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  id="takeSurvey"
                  name="takeSurvey"
                  value="yes"
                  className="w-auto m-0"
                />
                <label htmlFor="takeSurvey" className="text-white text-sm">
                  I&apos;d like to take the NYSC survey
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-lg text-base font-bold cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              style={{
                border: '2px solid white',
                backgroundColor: 'transparent',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Register Interest'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}