'use client'

import Link from 'next/link'
import { Code2, Github, Twitter, Linkedin } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`border-t mt-20 ${
      theme === 'dark' ? 'border-white/10' : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-brand font-bold gradient-text">Forge</span>
            </Link>
            <p className="max-w-md text-theme-secondary">
              Build powerful backend applications with our comprehensive component library.
              Production-ready components for modern development.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-theme-primary">Product</h3>
            <ul className="space-y-2 text-theme-secondary">
              <li>
                <Link
                  href="/components"
                  className="transition-colors hover:text-theme-primary"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-theme-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/get-started"
                  className="transition-colors hover:text-theme-primary"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-theme-primary">Connect</h3>
            <ul className="space-y-2 text-theme-secondary">
              <li>
                <a
                  href="#"
                  className="transition-colors flex items-center gap-2 hover:text-theme-primary"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors flex items-center gap-2 hover:text-theme-primary"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors flex items-center gap-2 hover:text-theme-primary"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-theme mt-8 pt-8 text-center text-theme-secondary">
          <p>&copy; {new Date().getFullYear()} Forge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
