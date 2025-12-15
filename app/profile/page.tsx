'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Calendar,
  Clock,
  Edit,
  LogOut,
  Shield,
  Sparkles
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading || isRedirecting || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-theme-secondary">Loading profile...</p>
        </motion.div>
      </div>
    )
  }

  const userInitial = user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent)]"></div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />

      {/* Profile Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span className="text-sm text-theme-secondary">Your Profile</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-theme-primary">
              Welcome Back, <span className="gradient-text">{user.name || 'User'}</span>
            </h1>
            <p className="text-xl text-theme-secondary">
              Manage your account information and settings
            </p>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-with-border rounded-2xl p-8 md:p-12 shadow-2xl mb-8"
          >
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-cyan-500/30">
                  {userInitial}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </motion.div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-heading font-bold text-theme-primary mb-2">
                  {user.name || 'User'}
                </h2>
                <p className="text-theme-secondary mb-6">{user.email}</p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={() => router.push('/profile/edit')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 glass rounded-lg font-semibold text-red-500 hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-theme mb-8"></div>

            {/* Account Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass rounded-xl p-6 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-cyan-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-theme-tertiary mb-1">Email Address</h3>
                    <p className="text-lg font-medium text-theme-primary break-all">{user.email}</p>
                  </div>
                </div>
              </motion.div>

              {/* Display Name */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass rounded-xl p-6 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-teal-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-theme-tertiary mb-1">Display Name</h3>
                    <p className="text-lg font-medium text-theme-primary break-all">
                      {user.name || 'Not set'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Account Created */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-xl p-6 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-pink-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-theme-tertiary mb-1">Member Since</h3>
                    <p className="text-lg font-medium text-theme-primary">
                      {formatDate(user.createdAt || new Date())}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Last Updated */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="glass rounded-xl p-6 hover:bg-gradient-to-r hover:from-orange-500/5 hover:to-red-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-theme-tertiary mb-1">Last Updated</h3>
                    <p className="text-lg font-medium text-theme-primary">
                      {formatDate(user.updatedAt || new Date())}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass-with-border rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-heading font-bold text-theme-primary mb-3">
              Account Status
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-semibold">Active</span>
            </div>
            <p className="text-theme-secondary mt-4">
              Your account is in good standing. Enjoy building with Forge!
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
