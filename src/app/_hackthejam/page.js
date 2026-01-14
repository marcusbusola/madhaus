// app/hackthejam/page.js
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Hack the Jam",
  description:
    "PODS presents Hack the Jam - A hackathon bringing together innovators, developers, and creators to build solutions that matter. Join us for an intensive weekend of coding, collaboration, and creativity.",
  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Hack the Jam | Madhaus Africa",
    description: "A hackathon bringing together innovators, developers, and creators to build solutions that matter.",
    type: 'website',
    url: 'https://madhaus.africa/_hackthejam',
    images: [{
      url: '/hackthejam-poster.jpeg',
      width: 450,
      height: 450,
      alt: 'Hack the Jam hackathon poster',
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: "Hack the Jam | Madhaus Africa",
    description: "A hackathon bringing together innovators, developers, and creators to build solutions that matter.",
    images: ['/hackthejam-poster.jpeg'],
  },
};

export default function HackTheJamPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="container mx-auto p-4 max-w-[900px]">
        <header className="text-center mb-12">
          <Image
            src="/hackthejam-poster.jpeg" // You'll need to add this image to your public folder
            alt="Hack the Jam"
            width={450}
            height={450}
            className="mx-auto my-[32px]"
          />
          <h1 className="text-4xl font-bold">
            Hack the Jam
          </h1>
          <p className="text-xl mt-2">PODS Presents: Code. Create. Collaborate.</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Event Overview</h2>
          <p className="text-lg">
            Hack the Jam is an intensive hackathon where innovators, developers, designers, and creators 
            come together to build solutions that matter. Over the course of an action-packed weekend, 
            participants will form teams, brainstorm ideas, and develop working prototypes that address 
            real-world challenges.
          </p>
          <p className="text-lg mt-4">
            Whether you&apos;re a seasoned developer or someone with a great idea and the passion to learn, 
            Hack the Jam welcomes all skill levels. This is your opportunity to turn concepts into 
            reality while connecting with like-minded innovators.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>
              <strong>Team Formation:</strong> Connect with other participants and form diverse, collaborative teams
            </li>
            <li>
              <strong>Mentorship:</strong> Access to experienced mentors in technology, design, and business
            </li>
            <li>
              <strong>Workshops:</strong> Technical sessions and skill-building workshops throughout the event
            </li>
            <li>
              <strong>Resources:</strong> Development tools, APIs, and platforms to bring your ideas to life
            </li>
            <li>
              <strong>Networking:</strong> Connect with industry professionals, investors, and fellow innovators
            </li>
            <li>
              <strong>Prizes:</strong> Recognition and awards for outstanding projects and innovative solutions
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who Should Participate?</h2>
          <ul className="list-disc pl-5 text-lg">
            <li>Software developers and programmers</li>
            <li>UI/UX designers and creative professionals</li>
            <li>Product managers and business strategists</li>
            <li>Students and recent graduates in tech fields</li>
            <li>Entrepreneurs with innovative ideas</li>
            <li>Anyone passionate about using technology for positive impact</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
          <ul className="list-disc pl-5 text-lg">
            <li><strong>Duration:</strong> 48-hour intensive hackathon</li>
            <li><strong>Format:</strong> In-person collaborative event</li>
            <li><strong>Team Size:</strong> 2-5 members per team</li>
            <li><strong>Themes:</strong> Open innovation with focus on social impact</li>
            <li><strong>Registration:</strong> Limited spots available</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Do I need to have a team before registering?</h3>
              <p className="text-lg">
                No! While you can register with a pre-formed team, we&apos;ll also have team formation 
                sessions at the beginning of the event to help solo participants find teammates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What if I don&apos;t have coding experience?</h3>
              <p className="text-lg">
                Hack the Jam welcomes participants of all skill levels. Teams need diverse skills 
                including design, business strategy, and user research. We&apos;ll also have beginner-friendly 
                workshops and mentors to help you contribute meaningfully.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What should I bring?</h3>
              <p className="text-lg">
                Bring your laptop, chargers, and any development tools you prefer. We&apos;ll provide 
                meals, snacks, and a collaborative workspace. Enthusiasm and creativity are the 
                most important things to pack!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Are there any costs involved?</h3>
              <p className="text-lg">
                Hack the Jam is free to participate! We cover meals, workspace, and all event 
                materials. Just bring yourself and your ideas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">How will projects be judged?</h3>
              <p className="text-lg">
                Projects will be evaluated on innovation, technical execution, potential impact, 
                and presentation quality. Our panel includes industry experts, investors, and 
                technical leaders.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What happens after the hackathon?</h3>
              <p className="text-lg">
                Outstanding projects may receive continued mentorship, potential funding opportunities, 
                or invitations to showcase at industry events. We&apos;re committed to helping great 
                ideas continue beyond the weekend.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ready to Join?</h2>
          <p className="text-lg mb-4">
            Spaces are limited and filling up fast. Register your interest now to secure your spot 
            at Hack the Jam and be part of an incredible weekend of innovation and collaboration.
          </p>
          
          <div className="text-center">
            <Link 
              href="/hackthejam/register" 
              className="inline-block bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Register Your Interest →
            </Link>
          </div>
          
          <p className="text-center mt-4 text-gray-600">
            Have questions? Email us at{" "}
            <a href="mailto:hackthejam@madhaus.africa" className="text-blue-500">
              hackthejam@madhaus.africa
            </a>
          </p>
        </section>

        <section className="mb-8 bg-gray-200 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About PODS</h2>
          <p className="text-lg">
            PODS is an initiative by Madhaus focused on fostering innovation and collaboration 
            in the African tech ecosystem. Through events like Hack the Jam, we bring together 
            diverse talents to create solutions that drive positive change across the continent.
          </p>
        </section>
      </div>
    </div>
  );
};