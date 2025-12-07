'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, ArrowRight, Check, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'
import Navbar from '@/components/Navbar'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Password strength indicators
  const passwordChecks = {
    length: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500']
  const strengthLabels = ['Weak', 'Medium', 'Strong']

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!passwordChecks.length) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service')
      return
    }

    setIsLoading(true)

    const result = await signup(email, password, name)

    if (result.success) {
      router.push('/')
    } else {
      setError(result.error || 'Signup failed')
    }

    setIsLoading(false)
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

      {/* Signup Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20 pb-12">
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
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-3xl font-heading font-bold text-theme-primary mb-2">
                Create Account
              </h1>
              <p className="text-theme-secondary">
                Join Forge and start building
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Password Strength Indicator */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    <div className="flex gap-2">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            index < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : 'bg-gray-300 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-theme-secondary">
                      Password strength: {strengthLabels[passwordStrength - 1] || 'Too weak'}
                    </p>
                    <div className="space-y-1 text-xs">
                      <div className={`flex items-center gap-2 ${passwordChecks.length ? 'text-green-500' : 'text-theme-tertiary'}`}>
                        {passwordChecks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>At least 6 characters</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordChecks.hasNumber ? 'text-green-500' : 'text-theme-tertiary'}`}>
                        {passwordChecks.hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>Contains a number</span>
                      </div>
                      <div className={`flex items-center gap-2 ${passwordChecks.hasSpecial ? 'text-green-500' : 'text-theme-tertiary'}`}>
                        {passwordChecks.hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        <span>Contains a special character</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
                required
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-theme accent-cyan-600"
                />
                <span className="text-sm text-theme-secondary">
                  I agree to the{' '}
                  <Link href="#" className="text-cyan-600 hover:text-cyan-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-cyan-600 hover:text-cyan-500">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button type="submit" isLoading={isLoading} className="w-full">
                {!isLoading && <span>Create Account</span>}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-theme"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-2 rounded-lg bg-theme-secondary text-theme-primary">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <Link href="/login">
                <Button variant="secondary" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
