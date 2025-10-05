'use client';

import Navigation from '@/components/Navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers: { firstName: string; lastName: string; job: string; profileImage: string; linkedin: string }[] = [
    { firstName: "Judith", lastName: "Rodo", job: "Mechanical Engineer Student", profileImage: "/members/judith.jpg", linkedin: "https://www.linkedin.com/in/judith-rodo-2a57862b0/" },
    { firstName: "Tra Mi", lastName: "Nguyen", job: "Systems Engineer Student", profileImage: "/members/trami.jpg", linkedin: "https://www.linkedin.com/in/tra-mi-nguyen-08979a2b4/" },
    { firstName: "Blandine", lastName: "Cohen", job: "Mechanical Engineer Student", profileImage: "/members/blandine.jpeg", linkedin: "https://www.linkedin.com/in/blandine-cohen-8525a223b/" },
    { firstName: "Simon", lastName: "Wirth", job: "UX/UI Designer", profileImage: "/members/simon.jpeg", linkedin: "https://www.linkedin.com/in/simon-wirth-7b687b207/" },
    { firstName: "Riccardo", lastName: "Maffei", job: "Computer Science Student", profileImage: "/members/riccardo.jpeg", linkedin: "https://www.linkedin.com/in/riki-m-49aa28235/" },
    { firstName: "Alan", lastName: "Geirnaert", job: "Computer Science Student", profileImage: "/members/alan.jpeg", linkedin: "https://www.linkedin.com/in/alan-geirnaert/" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-950/20 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent">
            About StarFleet & myStarlab
          </h1>
          <p className="text-xl text-gray-300">
            Collaboration, sustainability, and accessibility for the future of space exploration
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              At StarFleet, we believe the future of space exploration depends on collaboration, sustainability, and accessibility. 
              Our hackathon project, <span className="font-semibold text-blue-300">myStarlab</span>, is a crowdfunding platform dedicated to space research and aerospace innovation, 
              connecting visionary scientists and engineers with a global community of backers who share their passion for discovery.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Alongside the platform, our flagship concept, <span className="font-semibold text-indigo-300">StarFleet Micro-Robots</span>, brings this vision to life. 
              These modular, refuelable, and dockable micro-drones are designed to perform external repairs, maintenance, and recovery missions 
              around the upcoming Starlab Space Station.
            </p>
            <p className="text-lg text-gray-300">
              Together, myStarlab and StarFleet Micro-Robots form an interconnected ecosystem: one finances the future of space innovation, 
              and the other powers it in orbit.
            </p>
          </div>
        </div>
      </section>

      {/* StarFleet Capabilities Section */}
      <section className="py-16 bg-gradient-to-b from-black to-indigo-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent">
            StarFleet Micro-Robots Capabilities
          </h2>
          <p className="text-lg text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            By combining precision robotics, modular tool systems, and orbit synchronization principles, our robots could:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start">
                <div className="text-3xl mr-4">🛠️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-blue-300">External Repairs & Maintenance</h3>
                  <p className="text-gray-400">
                    Repair or service damaged satellites without human EVA risk, ensuring safer and more efficient operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start">
                <div className="text-3xl mr-4">🔬</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-300">Debris Recovery</h3>
                  <p className="text-gray-400">
                    Retrieve debris and transport it for study inside the station, supporting experiments like BioTesc research.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start">
                <div className="text-3xl mr-4">⚡</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-purple-300">Autonomous Docking</h3>
                  <p className="text-gray-400">
                    Dock autonomously for refueling and reconfiguration, enabling extended mission durations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start">
                <div className="text-3xl mr-4">♻️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-green-300">Sustainable Operations</h3>
                  <p className="text-gray-400">
                    Support sustainable in-orbit operations, reducing future debris generation and promoting a cleaner space environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-400">
                We bring together visionary scientists, engineers, and backers from around the globe to advance space research together.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-400">
                From debris reduction to refuelable systems, we&apos;re committed to responsible and sustainable space operations.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-5xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-400">
                Making space research funding and innovation accessible to everyone who dares to dream beyond our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent mb-2">
                $12.4M
              </div>
              <div className="text-gray-400">Total Funded</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent mb-2">
                47
              </div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-300 to-slate-300 bg-clip-text text-transparent mb-2">
                15,247
              </div>
              <div className="text-gray-400">Backers</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl border border-white/10 p-8 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent mb-2">
                23
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Team</h2>
          <p className="text-lg text-gray-300 text-center mb-12">
            myStarlab was founded by a team of aerospace engineers, researchers, and technologists who believe 
            that the future of space exploration should be open to everyone. We combine decades of experience 
            in space systems, software development, and crowdfunding to create the premier platform for space research funding.
          </p>
          
          {/* Team Photo Placeholder */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-950/30 to-purple-950/30 backdrop-blur-sm">
              <div className="aspect-[21/9] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-gray-400 text-lg">Team Photo Coming Soon</p>
                  <p className="text-gray-500 text-sm mt-2">Our amazing team working together to make space accessible</p>
                </div>
              </div>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <article 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-102"
              >
                {/* Profile Image Placeholder */}
                <div className="mb-4 relative">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                    {member.profileImage ? (
                      <Image 
                        src={member.profileImage} 
                        alt={`${member.firstName} ${member.lastName}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-gray-400">
                        {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-300"></div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-slate-300 to-indigo-300 bg-clip-text text-transparent">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-blue-400 mb-3">{member.job}</p>
                  
                  {/* LinkedIn Button */}
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 hover:border-blue-500/60 rounded-lg text-sm text-blue-300 transition-all duration-200 hover:scale-105"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>

                {/* Decorative bottom accent */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
                    <div className="w-1 h-1 rounded-full bg-purple-400/50"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-400/50"></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shape the Future of Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you&apos;re a researcher with a groundbreaking idea or a backer ready to support innovation, 
            myStarlab is your launchpad to the stars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects"
              className="px-8 py-4 bg-gradient-to-r from-slate-500 to-indigo-500 text-white text-lg font-semibold rounded-lg hover:from-slate-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105"
            >
              Explore Projects
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
              Submit Your Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
