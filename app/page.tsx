'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Code, Database, Lock, Rocket, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span className="text-sm text-theme-secondary">Backend Components for Modern Apps</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 display-heading">
              <span className="text-theme-primary">Don't Write Logic</span>
              <br />
              <span className="gradient-text">Forge it</span>
            </h1>

            <p className="text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto mb-12">
              Build powerful, scalable backend applications with our comprehensive
              component library. Production-ready components for authentication, APIs, databases, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/get-started">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/components">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 glass rounded-lg font-semibold text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100 transition-all duration-300"
                >
                  View Components
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
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
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-theme-primary">
              Everything You Need to <span className="gradient-text">Build Fast</span>
            </h2>
            <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
              Comprehensive backend components designed for modern applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Optimized for performance with minimal overhead and maximum speed',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Shield,
                title: 'Secure by Default',
                description: 'Built-in security best practices and encryption out of the box',
                color: 'from-green-500 to-emerald-500',
              },
              {
                icon: Code,
                title: 'Developer Friendly',
                description: 'Clean APIs, TypeScript support, and comprehensive documentation',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Database,
                title: 'Database Ready',
                description: 'Pre-built connectors for popular databases and ORMs',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Lock,
                title: 'Authentication',
                description: 'Complete auth solutions with JWT, OAuth, and session management',
                color: 'from-red-500 to-rose-500',
              },
              {
                icon: Rocket,
                title: 'Production Ready',
                description: 'Battle-tested components used in production applications',
                color: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-xl p-8 glow-effect cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-theme-primary">{feature.title}</h3>
                <p className="text-theme-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-theme-primary">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-theme-secondary text-lg mb-8">
              Join thousands of developers building with Forge
            </p>
            <Link href="/get-started">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 inline-flex items-center gap-2"
              >
                Start Building
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
