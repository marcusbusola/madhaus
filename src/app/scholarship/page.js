// pages/scholarship.js
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "HOMM Scholarship",
  description:
    "The Herbert Olufunso Marcus Memorial Scholarship supports Nigerian secondary and university students by providing financial aid and honoring a legacy of generosity, education, and belief in young potential",
};

const ScholarshipPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto p-4 max-w-[900px] ">
        <header className="text-center mb-12">
          <Image
            src="/memorial.jpeg"
            alt=""
            width={450}
            height={450}
            className="mx-auto my-[32px] "
          />
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
            Thank you to all who applied. This scholarship is now closed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ScholarshipPage;
