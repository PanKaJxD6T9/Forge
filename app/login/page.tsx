'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogIn, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'
import Navbar from '@/components/Navbar'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || 'Login failed')
    }

    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50">
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

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-32 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass-with-border rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 mb-4"
              >
                <LogIn className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-heading font-bold text-theme-primary mb-2">
                Welcome Back
              </h1>
              <p className="text-theme-secondary">
                Sign in to continue to Forge
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50"
              >
                <p className="text-red-500 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-theme accent-cyan-600"
                  />
                  <span className="text-theme-secondary">Remember me</span>
                </label>
                <Link
                  href="#"
                  className="text-cyan-600 hover:text-cyan-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" isLoading={isLoading} className="w-full">
                {!isLoading && <span>Sign In</span>}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-theme opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-2 rounded-lg bg-theme-primary bg-gradient-to-r from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/20 text-theme-primary shadow-lg">
                  New to Forge?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link href="/signup">
                <Button variant="secondary" className="w-full">
                  Create an Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-theme-tertiary text-sm mt-6">
            By signing in, you agree to our{' '}
            <Link href="#" className="text-cyan-600 hover:text-cyan-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-cyan-600 hover:text-cyan-500">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
