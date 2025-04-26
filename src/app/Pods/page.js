// pages/scholarship.js
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Impact Pods Hackathon",
  description:
  "Hey NYSC members. Ready to make a real impact during your service year? The NYSC Pods Hackathon is your chance to step up, challenge yourself, and work on innovative solutions to tackle some of Nigeria’s most pressing challenges.",
};

const PodsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto p-4 max-w-[900px] ">
        <header className="text-center mb-12">
          <Image
            src="/pods.jpeg"
            alt=""
            width={450}
            height={450}
            className="mx-auto my-[32px] "
          />
          <h1 className="text-4xl font-bold ">
          Impact Pods Hackathon
          </h1>
          <p className="text-xl mt-2">Innovate for a Better Future</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hackathon Overview</h2>
          <p className="text-lg">
          The NYSC Pods Hackathon is an exciting opportunity for National Youth Service Corps (NYSC) 
          members to come together, innovate, and create solutions that address real-world challenges in Nigeria. 
          Over the course of two days, you’ll work in teams to develop impactful ideas that can make a significant difference in society.
          </p>
          <p className="text-lg mt-4">
          Whether you’re passionate about technology, social issues, or creating change, this hackathon is the perfect place to kickstart your journey.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who We’re Looking For</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>
            Work in Teams: Collaborate with other NYSC members to solve real-world problems.
            </li>
            <li>Mentorship: Receive guidance from experts in social innovation, technology, and business.</li>
            <li>
            Present Your Ideas: Showcase your team’s solution to a panel of judges at the end of the event.
            </li>
            <li>
            Networking: Build connections with like-minded individuals and industry professionals.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Selection Process</h2>
          <p className="text-lg">
          Participants will be selected based on their application responses. 
          This is your chance to showcase your creativity, passion for innovation, and commitment to making a difference. 
          Only selected applicants will be invited to participate in the hackathon.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What’s at Stake?</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>
            Develop real-world solutions: Tackle problems affecting Nigeria.
            </li>
            <li>Win Prizes: Compete for recognition and prizes for your innovative solutions.</li>
            <li>
            Join a Larger Movement: Get involved in a year-long social innovation program with the NYSC Pods initiative.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            📆 Application Details
          </h2>
          <ul className="list-disc pl-5 text-lg">
            <li>Opens: April 21, 2025</li>
            <li>Closes: May 20, 2025</li>
            <li>Selected Participants: Will be notified and invited to the hackathon event.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
          How to Apply
          </h2>
          <p className="text-lg">
            Submit your application:{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEr_dlhX478XGU9zZDJbd_l9B-1e0x02YrO4JTvLtlPDMehA/viewform" className="text-blue-500">
              Link to form
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PodsPage;
