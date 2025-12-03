'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
}

export default function MouseTail() {
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<MousePosition[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  const trailRef = useRef<MousePosition[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Add to trail
      trailRef.current = [{ x: e.clientX, y: e.clientY }, ...trailRef.current].slice(0, 20)
      setTrail([...trailRef.current])
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
        style={{
          x,
          y,
          left: '-6px',
          top: '-6px',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30 blur-md"
        style={{
          x,
          y,
          left: '-16px',
          top: '-16px',
        }}
      />

      {/* Trail dots */}
      {trail.map((pos, index) => {
        const size = Math.max(2, 6 - index * 0.25)
        const opacity = Math.max(0, 0.8 - index * 0.04)

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            style={{
              width: size,
              height: size,
              left: pos.x - size / 2,
              top: pos.y - size / 2,
              opacity: opacity,
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 0.3 }}
            transition={{
              duration: 0.3,
              delay: index * 0.02,
            }}
          />
        )
      })}
    </div>
  )
}
