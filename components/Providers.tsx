'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import MouseTail from '@/components/MouseTail'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MouseTail />
      {children}
    </ThemeProvider>
  )
}
