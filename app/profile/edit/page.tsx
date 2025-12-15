'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateProfile, isLoading } = useAuth()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [user, isLoading, router])

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Display name is required'
    }

    // Validate email
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setNotification(null)

    const result = await updateProfile(formData.name, formData.email)

    setIsSaving(false)

    if (result.success) {
      setNotification({
        type: 'success',
        message: 'Profile updated successfully!',
      })

      // Redirect to profile page after 1.5 seconds
      setTimeout(() => {
        router.push('/profile')
      }, 1500)
    } else {
      setNotification({
        type: 'error',
        message: result.error || 'Failed to update profile',
      })
    }
  }

  const handleCancel = () => {
    router.push('/profile')
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
          <p className="text-theme-secondary">Loading...</p>
        </motion.div>
      </div>
    )
  }

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

      {/* Edit Profile Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <motion.button
            onClick={handleCancel}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6 flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </motion.button>

          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span className="text-sm text-theme-secondary">Edit Profile</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-theme-primary">
              Update Your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-xl text-theme-secondary">
              Keep your information up to date
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                notification.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">{notification.message}</span>
            </motion.div>
          )}

          {/* Edit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-with-border rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Display Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-theme-primary mb-2"
                >
                  Display Name
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full pl-12 pr-4 py-3 glass rounded-lg text-theme-primary placeholder-theme-tertiary focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'focus:ring-red-500 border border-red-500/50'
                        : 'focus:ring-cyan-500'
                    }`}
                    placeholder="Enter your display name"
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-theme-primary mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full pl-12 pr-4 py-3 glass rounded-lg text-theme-primary placeholder-theme-tertiary focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'focus:ring-red-500 border border-red-500/50'
                        : 'focus:ring-cyan-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  type="submit"
                  disabled={isSaving}
                  whileHover={{ scale: isSaving ? 1 : 1.05 }}
                  whileTap={{ scale: isSaving ? 1 : 0.95 }}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  whileHover={{ scale: isSaving ? 1 : 1.05 }}
                  whileTap={{ scale: isSaving ? 1 : 0.95 }}
                  className={`flex-1 px-6 py-3 glass rounded-lg font-semibold text-theme-secondary hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 glass-with-border rounded-2xl p-6 text-center"
          >
            <p className="text-theme-secondary text-sm">
              <strong className="text-theme-primary">Note:</strong> Your email address must be unique and will be used for login.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
