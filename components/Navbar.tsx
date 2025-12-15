'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Code2, Sun, Moon, User, LogOut, UserCircle } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/components', label: 'Components' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/get-started', label: 'Get Started' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-2xl dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl border-0'
            : 'bg-transparent'
        }`}
      >
        {/* Gradient overlay on scroll */}
        {scrolled && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-teal-500/5 pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => setSidebarOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl transition-all duration-300 text-theme-secondary hover:text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100/80 backdrop-blur-sm"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow"
                >
                  <Code2 className="w-7 h-7 text-white" />
                </motion.div>
                <span className="text-2xl font-brand font-bold gradient-text tracking-tight">Forge</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative px-4 py-2.5 rounded-lg transition-all duration-300 text-theme-secondary hover:text-theme-primary group"
                  >
                    <span className="relative z-10 font-medium">{link.label}</span>
                    {/* Hover background */}
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId={`nav-${link.href}`}
                    />
                    {/* Bottom indicator */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-full group-hover:w-3/4 transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2.5 rounded-xl transition-all duration-300 text-theme-secondary hover:text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100/80 backdrop-blur-sm relative overflow-hidden group"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-600" />
                  )}
                </motion.div>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </motion.button>

              {/* Auth Buttons / User Menu */}
              {!isLoading && (
                <>
                  {user ? (
                    <div className="relative">
                      <motion.button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100/80 backdrop-blur-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-semibold">
                          {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                        </div>
                        <span className="hidden md:block font-medium font-heading">
                          {user.name || user.email.split('@')[0]}
                        </span>
                      </motion.button>

                      {/* User Dropdown Menu */}
                      <AnimatePresence>
                        {userMenuOpen && (
                          <>
                            {/* Backdrop */}
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setUserMenuOpen(false)}
                            />

                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 mt-2 w-56 glass-with-border rounded-xl shadow-2xl overflow-hidden z-50"
                            >
                              <div className="p-4 border-b border-theme">
                                <p className="text-sm font-medium font-heading text-theme-primary">
                                  {user.name || 'User'}
                                </p>
                                <p className="text-xs font-heading text-theme-tertiary truncate">
                                  {user.email}
                                </p>
                              </div>
                              <div className="p-2">
                                <Link
                                  href="/profile"
                                  onClick={() => setUserMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-theme-secondary hover:text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100 transition-all"
                                >
                                  <UserCircle className="w-4 h-4" />
                                  <span className="text-sm">Profile</span>
                                </Link>
                                <button
                                  onClick={() => {
                                    logout()
                                    setUserMenuOpen(false)
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-all"
                                >
                                  <LogOut className="w-4 h-4" />
                                  <span className="text-sm">Logout</span>
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link href="/login">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg text-theme-secondary hover:text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100/80 transition-all duration-300 font-medium"
                        >
                          Login
                        </motion.button>
                      </Link>
                      <Link href="/signup">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 font-medium"
                        >
                          Sign Up
                        </motion.button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
