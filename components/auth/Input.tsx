'use client'

import { InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, type, className = '', ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-theme-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-lg
            glass-with-border
            text-theme-primary placeholder-theme-tertiary
            focus:outline-none focus:ring-2 focus:ring-cyan-500/50
            transition-all duration-300
            ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-secondary hover:text-theme-primary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
