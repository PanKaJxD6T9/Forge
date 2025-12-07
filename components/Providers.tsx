'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import MouseTail from '@/components/MouseTail'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MouseTail />
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}
