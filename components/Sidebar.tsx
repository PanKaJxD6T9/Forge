'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Home, Package, DollarSign, Rocket, Github, Twitter, Linkedin, BookOpen, Code2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/components', label: 'Components', icon: Package },
    { href: '/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/get-started', label: 'Get Started', icon: Rocket },
  ]

  const socialLinks = [
    { href: '#', label: 'GitHub', icon: Github },
    { href: '#', label: 'Twitter', icon: Twitter },
    { href: '#', label: 'LinkedIn', icon: Linkedin },
    { href: '#', label: 'Documentation', icon: BookOpen },
  ]

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-md z-40"
          />

          {/* Enhanced Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 z-50 bg-theme-primary border-r border-theme shadow-2xl dark:shadow-[4px_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5 pointer-events-none" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col h-full relative z-10">
              {/* Enhanced Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-6 border-b border-theme bg-theme-secondary/30 backdrop-blur-sm"
              >
                <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow"
                  >
                    <Code2 className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-2xl font-brand font-bold gradient-text tracking-tight block">Forge</span>
                    <span className="text-xs text-theme-tertiary">Backend Components</span>
                  </div>
                </Link>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl transition-all duration-300 text-theme-secondary hover:text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100/80 backdrop-blur-sm relative overflow-hidden group"
                >
                  <X className="w-5 h-5 relative z-10" />
                  <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                </motion.button>
              </motion.div>

              {/* Enhanced Navigation Links */}
              <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-theme-tertiary uppercase tracking-wider px-4 mb-3">
                    Navigation
                  </h3>
                </div>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 200 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group text-theme-secondary hover:text-theme-primary overflow-hidden"
                    >
                      {/* Hover background gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      />

                      {/* Icon with background */}
                      <div className="relative z-10 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                        <link.icon className="w-5 h-5 relative z-10" />
                      </div>

                      <span className="font-semibold relative z-10 flex-1">{link.label}</span>

                      {/* Animated arrow indicator */}
                      <motion.div
                        className="relative z-10 w-0 h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 rounded-full group-hover:w-12 transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: 48 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Enhanced Social Links */}
              <div className="p-6 border-t border-theme bg-theme-secondary/30 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xs font-semibold text-theme-tertiary uppercase tracking-wider mb-4">
                    Connect With Us
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.55 + index * 0.05, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 group text-theme-secondary hover:text-theme-primary overflow-hidden"
                      >
                        {/* Gradient background on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        />

                        {/* Icon */}
                        <div className="relative z-10 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                          <link.icon className="w-4 h-4 relative z-10" />
                        </div>

                        <span className="text-xs font-medium relative z-10 text-center">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
