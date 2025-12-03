'use client'

import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Package, Code, Book, Rocket } from 'lucide-react'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const codeBlocks = [
  {
    title: 'Installation',
    icon: Package,
    code: `npm install @forge/components
# or
yarn add @forge/components
# or
pnpm add @forge/components`,
  },
  {
    title: 'Quick Start',
    icon: Rocket,
    code: `import { AuthProvider, Database } from '@forge/components';

// Initialize authentication
const auth = new AuthProvider({
  secret: process.env.JWT_SECRET,
});

// Setup database connection
const db = new Database({
  type: 'postgres',
  url: process.env.DATABASE_URL,
});`,
  },
  {
    title: 'Example Usage',
    icon: Code,
    code: `import { API, Middleware } from '@forge/components';

const app = new API();

// Add middleware
app.use(new Middleware.CORS());
app.use(new Middleware.RateLimit());

// Create endpoint
app.get('/api/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});`,
  },
]

export default function GetStartedPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const steps = [
    {
      number: '01',
      title: 'Install Forge',
      description: 'Add Forge to your project using your preferred package manager',
      icon: Package,
    },
    {
      number: '02',
      title: 'Configure',
      description: 'Set up your environment variables and configuration',
      icon: Terminal,
    },
    {
      number: '03',
      title: 'Import Components',
      description: 'Start using components in your application',
      icon: Code,
    },
    {
      number: '04',
      title: 'Read Documentation',
      description: 'Explore our comprehensive documentation and examples',
      icon: Book,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 from-slate-50 via-white to-slate-50">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-theme-primary display-heading">
              Get <span className="gradient-text">Started</span>
            </h1>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Get up and running with Forge in minutes. Follow these simple steps to start building.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-6"
              >
                <div className="text-4xl font-bold gradient-text mb-4">{step.number}</div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-theme-primary">{step.title}</h3>
                <p className="text-theme-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Code Blocks */}
          <div className="space-y-8">
            {codeBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-theme">
                  <div className="flex items-center gap-3">
                    <block.icon className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                    <h3 className="text-lg font-semibold text-theme-primary">{block.title}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(block.code, index)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg dark:hover:bg-white/10 hover:bg-gray-100 transition-colors text-sm text-theme-secondary hover:text-theme-primary"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
                        <span className="text-green-500 dark:text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto bg-theme-secondary/30">
                  <code className="text-sm text-theme-primary font-mono">{block.code}</code>
                </pre>
              </motion.div>
            ))}
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 glass rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-heading font-bold mb-4 text-theme-primary">
              Ready to <span className="gradient-text">Build?</span>
            </h2>
            <p className="text-theme-secondary mb-6 max-w-2xl mx-auto">
              Explore our component library and start building your next backend application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/components"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 inline-block"
              >
                Browse Components
              </a>
              <a
                href="#"
                className="px-6 py-3 glass rounded-lg font-semibold text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100 transition-all duration-300 inline-block"
              >
                View Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
