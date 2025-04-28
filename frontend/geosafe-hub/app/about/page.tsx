import Link from "next/link"
import Image from "next/image"
import { Shield, MapPin, Bell, Globe, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Farhikhta Farzan",
      role: "Backend Developer & Founder",
      bio: "As the founder and lead backend developer, Farhikhta architected GeoSafe Hub's core systems and data processing pipeline. She brings extensive experience in building secure, scalable applications that handle sensitive location and safety data.",
      image: "/images/farhikhta-farzan.png",
      socialLinks: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Sabeha Khan",
      role: "Backend Developer",
      bio: "Sabeha specializes in database architecture and API development, ensuring GeoSafe Hub's backend systems are robust and efficient. Her expertise in handling large datasets is crucial for processing the complex safety information across NYC's neighborhoods.",
      image: "/images/sabeha-khan.png",
      socialLinks: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Johnny Wang",
      role: "Model Developer & Data Specialist",
      bio: "Johnny leads our data collection and cleaning efforts, ensuring the accuracy and reliability of our safety metrics. He develops sophisticated models that transform raw data into actionable safety insights for NYC neighborhoods.",
      image: "/images/johnny-wang.png",
      socialLinks: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Mohammed Bensassi",
      role: "UI/UX Designer & Frontend Developer",
      bio: "Mohammed combines his eye for design with technical expertise to create intuitive, accessible interfaces. He ensures GeoSafe Hub delivers a seamless user experience across all devices while maintaining the visual appeal that engages our users.",
      image: "/images/mohammed-bensassi.png",
      socialLinks: {
        linkedin: "#",
        dribbble: "#",
      },
    },
    {
      name: "Aaleia Fernando",
      role: "UI/UX Designer & Frontend Developer",
      bio: "Aaleia specializes in creating user-centered designs that make complex safety data easy to understand. Her work on the GeoSafe Hub interface ensures that critical safety information is accessible to users of all technical backgrounds.",
      image: "/images/aaleia-fernando.png",
      socialLinks: {
        linkedin: "#",
        dribbble: "#",
      },
    },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* About Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">About GeoSafe Hub</h1>
              <p className="text-xl text-blue-100 mb-8">Empowering New Yorkers with location safety intelligence</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
              <p className="text-blue-100 text-lg mb-6">
                GeoSafe Hub was founded with a simple mission: to help people make informed decisions about where to
                live, work, and visit in New York City based on comprehensive safety information. We believe that
                everyone deserves access to reliable safety data presented in a way that's easy to understand and act
                upon.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                      <Shield className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Our Mission</h3>
                  </div>
                  <p className="text-blue-100">
                    To democratize access to safety information and empower New Yorkers to make confident decisions
                    about the places that matter most to them across the five boroughs.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Our Vision</h3>
                  </div>
                  <p className="text-blue-100">
                    A New York City where everyone can access, understand, and utilize safety information to improve
                    their quality of life and peace of mind in their neighborhoods.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">What We Do</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-4">
                  <MapPin className="h-10 w-10 text-blue-300 mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">Location Analysis</h4>
                  <p className="text-blue-100">
                    We analyze safety data for neighborhoods across all five boroughs of NYC.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <Shield className="h-10 w-10 text-blue-300 mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">Safety Scoring</h4>
                  <p className="text-blue-100">
                    Our proprietary algorithm generates comprehensive safety scores for any NYC location.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <Bell className="h-10 w-10 text-blue-300 mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">Real-time Alerts</h4>
                  <p className="text-blue-100">
                    We provide timely notifications about safety concerns in your saved NYC locations.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Our Approach</h3>
              <p className="text-blue-100 text-lg mb-6">
                At GeoSafe Hub, we combine official NYPD crime statistics, NYC emergency response data, user reports,
                and information from local safety organizations to create a comprehensive picture of safety for any
                location in New York City. Our data is regularly updated and verified to ensure accuracy.
              </p>
              <p className="text-blue-100 text-lg">
                We believe in transparency and accessibility. That's why we offer basic safety information to all
                visitors, while providing registered users with more detailed insights, personalized alerts, and the
                ability to save and monitor locations that matter to them throughout NYC.
              </p>
            </div>
          </section>

          {/* Team Section */}
          <section>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Meet Our Team</h2>
              <p className="text-xl text-blue-100">The passionate people behind GeoSafe Hub</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden"
                >
                  <div className="aspect-square relative">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300 mb-3">{member.role}</p>
                    <p className="text-blue-100 mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      {Object.keys(member.socialLinks).map((platform) => (
                        <a
                          key={platform}
                          href={member.socialLinks[platform]}
                          className="text-blue-300 hover:text-white transition-colors"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          <div className="w-8 h-8 bg-blue-500/30 rounded-full flex items-center justify-center">
                            {platform === "linkedin" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            )}
                        
                            {platform === "github" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            )}
                         
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Join Us Section */}
          <section className="mt-20 max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Join Our Mission</h2>
              <p className="text-xl text-blue-100 mb-6">
                Help us make New York City safer by creating a GeoSafe Hub account today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
              <p className="text-xl text-blue-100">Common questions about GeoSafe Hub</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">How are safety scores calculated?</h3>
                <p className="text-blue-100">
                  Our safety scores are calculated using a proprietary algorithm that analyzes multiple data points,
                  including NYPD crime statistics, NYC public records, user reports, and information from local safety
                  organizations. We consider factors such as crime rates, emergency response times, and community
                  feedback to generate comprehensive safety profiles for each neighborhood in NYC.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Which areas of NYC does GeoSafe Hub cover?</h3>
                <p className="text-blue-100">
                  GeoSafe Hub currently provides comprehensive coverage for all five boroughs of New York City:
                  Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. We offer detailed safety information for
                  neighborhoods, districts, and specific locations throughout the city.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">How often is the safety data updated?</h3>
                <p className="text-blue-100">
                  We update our safety data regularly to ensure accuracy. High-traffic areas in NYC receive updates
                  weekly, while other neighborhoods are updated monthly. Critical safety alerts and significant changes
                  are updated in real-time whenever possible. The last update date is always displayed on each
                  location's safety profile.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Can I use GeoSafe Hub without creating an account?
                </h3>
                <p className="text-blue-100">
                  Yes! You can search for NYC locations and view basic safety scores without creating an account.
                  However, creating a free account gives you access to additional features like saving favorite
                  locations, receiving safety alerts, accessing detailed reports, creating custom safety profiles, and
                  sharing information with others.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">How can I report inaccurate information?</h3>
                <p className="text-blue-100">
                  We strive for accuracy in all our safety data. If you notice any information that seems incorrect, you
                  can report it by clicking the 'Report Inaccuracy' button on any location's safety profile. Our team
                  will review your report and update the information if necessary. Registered users can provide
                  additional context and documentation to help us verify the correct information.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#0f1729] text-white relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                  alt="GeoSafe Hub Logo"
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
                <span className="text-xl font-bold">GeoSafe Hub</span>
              </div>
              <p className="text-gray-400">
                Providing reliable safety information for neighborhoods worldwide. Make informed decisions about where
                to live, work, or visit.
              </p>
              <div className="flex space-x-4">
                <Link href="/social/facebook" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="/social/twitter" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="/social/instagram" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="/social/linkedin" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-gray-400 hover:text-white transition-colors">
                    Safety Map
                  </Link>
                </li>
                <li>
                  <Link href="/safety-profile" className="text-gray-400 hover:text-white transition-colors">
                    Safety Profiles
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin size={20} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">123 Safety Street, Secure City, SC 10001, United States</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                  <Link href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                    +1 (555) 123-4567
                  </Link>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="text-gray-400 mr-2 flex-shrink-0" />
                  <Link href="mailto:info@geosafehub.com" className="text-gray-400 hover:text-white transition-colors">
                    info@geosafehub.com
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for safety tips and updates.</p>
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} GeoSafe Hub. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
