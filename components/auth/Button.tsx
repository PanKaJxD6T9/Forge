'use client'

import { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

export default function Button({
  children,
  isLoading = false,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full'

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/50',
    secondary: 'glass text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100'
  }

  return (
    <motion.div
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
    >
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </button>
    </motion.div>
  )
}
