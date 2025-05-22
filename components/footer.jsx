import Link from "next/link"
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white border-t border-maroon/30">
      <div className="container mx-auto pk-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-6 w-6 text-orange-mid mr-2" />
              <span className="font-bold text-xl">EduPath</span>
            </Link>
            <p className="mt-4 text-white/70">
              Providing academic guidance, learning material, and career roadmaps to students.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-white/70 hover:text-orange-mid transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-orange-mid transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-orange-mid transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-orange-mid transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-mid">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-orange-mid transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/70 hover:text-orange-mid transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-white/70 hover:text-orange-mid transition-colors">
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/question-bank" className="text-white/70 hover:text-orange-mid transition-colors">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="text-white/70 hover:text-orange-mid transition-colors">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-mid">Education Levels</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/class-11" className="text-white/70 hover:text-orange-mid transition-colors">
                  Class 11th
                </Link>
              </li>
              <li>
                <Link href="/categories/class-12" className="text-white/70 hover:text-orange-mid transition-colors">
                  Class 12th
                </Link>
              </li>
              <li>
                <Link href="/categories/graduation" className="text-white/70 hover:text-orange-mid transition-colors">
                  Graduation
                </Link>
              </li>
              <li>
                <Link href="/categories/masters" className="text-white/70 hover:text-orange-mid transition-colors">
                  Master's
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-orange-mid">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-orange-mid" />
                <a href="mailto:info@edupath.com" className="text-white/70 hover:text-orange-mid transition-colors">
                  info@BrightPath.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-white">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-md border border-maroon bg-navy-deep/50 focus:outline-none focus:ring-1 focus:ring-orange-mid text-white"
                />
                <button className="bg-gradient-to-r from-orange-deep to-orange-mid hover:from-red-bright hover:to-orange-deep text-white px-3 py-2 text-sm rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-maroon/30 mt-12 pt-6 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} BrightPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
