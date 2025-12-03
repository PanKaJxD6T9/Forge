'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, ArrowRight, Zap, Rocket, Crown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      '10 Components',
      'Community Support',
      'Basic Documentation',
      'MIT License',
      'Personal Projects',
    ],
    cta: 'Get Started',
    popular: false,
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    name: 'Pro',
    icon: Rocket,
    price: '$29',
    period: '/month',
    description: 'For professional developers',
    features: [
      '50+ Components',
      'Priority Support',
      'Advanced Documentation',
      'Commercial License',
      'Regular Updates',
      'Source Code Access',
      'Custom Components',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Unlimited Components',
      '24/7 Support',
      'Dedicated Account Manager',
      'Custom Licensing',
      'On-premise Deployment',
      'Training & Workshops',
      'SLA Guarantee',
      'Custom Development',
    ],
    cta: 'Contact Sales',
    popular: false,
    gradient: 'from-purple-600 to-pink-600',
  },
]

export default function PricingPage() {
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
              Simple <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our component library.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative glass rounded-2xl p-8 ${
                  plan.popular ? 'ring-2 ring-cyan-500/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-theme-secondary ml-2">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cyan-500 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-theme-primary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/get-started">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/50'
                        : 'glass text-theme-primary dark:hover:bg-white/10 hover:bg-gray-100'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-theme-secondary mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <Link href="/get-started" className="inline-flex items-center gap-2 text-cyan-500 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
              Compare all features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
