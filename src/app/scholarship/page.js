// pages/scholarship.js
import React from "react";

const ScholarshipPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto p-4 max-w-[900px] ">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold ">
            Herbert Olufunso Marcus Memorial Scholarship
          </h1>
          <p className="text-xl mt-2">Honoring Legacy. Uplifting Potential.</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Scholarship Overview</h2>
          <p className="text-lg">
            The Herbert Olufunso Marcus Memorial Scholarship is a need-based
            award created by his children to honor a man whose life was defined
            by love—for learning, for family, for peace, and for the quiet
            pursuit of becoming one’s best self.
          </p>
          <p className="text-lg mt-4">
            This scholarship is open to undergraduate students in Nigeria—both
            current and incoming—who may not have perfect grades but carry
            within them the quiet strength of compassion, the courage to grow,
            and the curiosity to learn.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who We’re Looking For</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>
              Are enrolled in (or awaiting admission to) a Nigerian university
              or tertiary institution.
            </li>
            <li>Can provide evidence of financial need.</li>
            <li>
              Are in good academic standing—or, if not, can demonstrate a strong
              sense of responsibility, personal growth, or character in other
              ways.
            </li>
            <li>
              Reflect values of empathy, integrity, and a quiet commitment to
              bettering the world around them.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What You’ll Submit</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>A personal essay responding to the prompt below.</li>
            <li>
              One letter of recommendation from someone who has witnessed your
              growth, compassion, or quiet leadership.
            </li>
            <li>
              Proof of enrollment, or a cover letter stating that admission is
              pending (for incoming students).
            </li>
            <li>Last semester’s grades, if available.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Essay Prompt</h2>
          <p className="text-lg">
            “Connecting the Dots” – Looking back on your life so far, tell us
            about a few key moments or choices that didn’t make sense at the
            time—but now, in some way, have shaped the person you’re becoming.
          </p>
          <p className="text-lg mt-4">
            You don’t need to tie everything up neatly. We want to hear your
            honest story, in your own voice, and what you’ve come to
            understand—or are still trying to understand—about your path.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why This Matters</h2>
          <p className="text-lg">
            Herbert Olufunso Marcus believed in the value of family, the wonder
            of curiosity, and the importance of inner peace. He quietly
            supported people becoming the best version of themselves—not through
            competition or performance, but through understanding and care.
          </p>
          <p className="text-lg mt-4">
            Through this scholarship, we honor his spirit by supporting young
            Nigerians who are living examples of those values—often quietly and
            without recognition.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            📆 Application Details
          </h2>
          <ul className="list-disc pl-5 text-lg">
            <li>Opens: April 20, 2025</li>
            <li>Closes: May 15, 2025</li>
            <li>Awardees Announced: August 2025</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How to Submit Your Application
          </h2>
          <p className="text-lg">
            Submit your application to:{" "}
            <a href="mailto:Forge@madhaus.africa" className="text-blue-500">
              Forge@madhaus.africa
            </a>
          </p>
          <p className="text-lg mt-4">
            For questions or assistance, please contact:{" "}
            <a href="mailto:Forge@madhaus.africa" className="text-blue-500">
              Forge@madhaus.africa
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ScholarshipPage;
