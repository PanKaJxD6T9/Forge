'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Database, Lock, Mail, FileText, Settings, Zap, Shield, Code, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const categories = [
  { id: 'all', label: 'All Components', icon: Code },
  { id: 'auth', label: 'Authentication', icon: Lock },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'api', label: 'API', icon: Globe },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'storage', label: 'Storage', icon: FileText },
  { id: 'config', label: 'Configuration', icon: Settings },
]

const components = [
  {
    id: 'auth-provider',
    name: 'AuthProvider',
    category: 'auth',
    description: 'Complete authentication solution with JWT, OAuth, and session management',
    icon: Lock,
    status: 'stable',
    tags: ['authentication', 'security', 'jwt'],
  },
  {
    id: 'database-connector',
    name: 'Database',
    category: 'database',
    description: 'Universal database connector supporting PostgreSQL, MySQL, MongoDB, and more',
    icon: Database,
    status: 'stable',
    tags: ['database', 'orm', 'sql'],
  },
  {
    id: 'api-router',
    name: 'APIRouter',
    category: 'api',
    description: 'Fast and flexible API router with middleware support and type safety',
    icon: Globe,
    status: 'stable',
    tags: ['api', 'routing', 'rest'],
  },
  {
    id: 'email-service',
    name: 'EmailService',
    category: 'email',
    description: 'Send emails with templates, attachments, and multiple provider support',
    icon: Mail,
    status: 'beta',
    tags: ['email', 'notifications'],
  },
  {
    id: 'file-storage',
    name: 'FileStorage',
    category: 'storage',
    description: 'Cloud storage abstraction for AWS S3, Google Cloud, and Azure',
    icon: FileText,
    status: 'stable',
    tags: ['storage', 'files', 'cloud'],
  },
  {
    id: 'rate-limiter',
    name: 'RateLimiter',
    category: 'api',
    description: 'Protect your APIs with configurable rate limiting and throttling',
    icon: Shield,
    status: 'stable',
    tags: ['security', 'api', 'rate-limit'],
  },
  {
    id: 'cache-manager',
    name: 'CacheManager',
    category: 'database',
    description: 'High-performance caching with Redis, Memcached, and in-memory support',
    icon: Zap,
    status: 'stable',
    tags: ['cache', 'performance'],
  },
  {
    id: 'config-manager',
    name: 'ConfigManager',
    category: 'config',
    description: 'Environment-based configuration management with validation',
    icon: Settings,
    status: 'stable',
    tags: ['configuration', 'env'],
  },
  {
    id: 'logger',
    name: 'Logger',
    category: 'config',
    description: 'Structured logging with multiple transports and log levels',
    icon: FileText,
    status: 'stable',
    tags: ['logging', 'debugging'],
  },
]

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredComponents = components.filter((component) => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-theme-primary display-heading">
              Component <span className="gradient-text">Library</span>
            </h1>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Browse our collection of production-ready backend components
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-tertiary" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-xl text-theme-primary placeholder-theme-tertiary focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'glass text-gray-300 hover:bg-white/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-xl p-6 glow-effect cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                    <component.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      component.status === 'stable'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {component.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-theme-primary">{component.name}</h3>
                <p className="text-theme-secondary text-sm mb-4">{component.description}</p>

                <div className="flex flex-wrap gap-2">
                  {component.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs glass text-theme-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-theme-secondary text-lg">No components found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
