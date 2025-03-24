"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, Coffee } from "lucide-react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  // Client-side state
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [teacupHover, setTeacupHover] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const whatIsRef = useRef(null)
  const pathwaysRef = useRef(null)
  const howItWorksRef = useRef(null)
  const ctaRef = useRef(null)

  // InView states for animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const whatIsInView = useInView(whatIsRef, { once: true, amount: 0.3 })
  const pathwaysInView = useInView(pathwaysRef, { once: true, amount: 0.3 })
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 })

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100])
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50])

  // Mark as client-side rendered after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Pre-calculate particle positions to avoid hydration mismatches
  const particles = Array.from({ length: 10 }, (_, i) => ({
    width: 5 + i * 2,
    height: 5 + i * 2,
    left: `${10 + i * 8}%`,
    top: `${15 + i * 7}%`,
    yMove: -50 - i * 5,
    duration: 5 + i * 0.5,
    delay: i * 0.5,
  }))

  // Get current year for copyright - ensure it's the same on server and client
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className="relative"
              onMouseEnter={() => isClient && setTeacupHover(true)}
              onMouseLeave={() => isClient && setTeacupHover(false)}
            >
              {isClient && (
                <motion.div
                  animate={teacupHover ? { y: [-2, 2, -2], opacity: 1 } : { opacity: 0 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 5C3 1 7 1 10 5C13 9 17 9 19 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              )}
              <motion.div
                animate={isClient && teacupHover ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Coffee className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
            <span className="text-xl font-bold text-primary">equiTeee</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#what-is" className="text-sm font-medium hover:text-primary transition-colors">
              What is equiTeee?
            </Link>
            <Link href="#pathways" className="text-sm font-medium hover:text-primary transition-colors">
              Pathways
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <Link href="#sign-up">Join equiTeee</Link>
              </Button>
            </motion.div>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
            >
              <div className="container py-4 flex flex-col gap-4">
                <Link
                  href="#what-is"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  What is equiTeee?
                </Link>
                <Link
                  href="#pathways"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pathways
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Button asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Link href="#sign-up">Join equiTeee</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-[#e8f5e9] via-white to-[#fff8e1] py-20 md:py-32"
        >
          <motion.div
            style={isClient ? { y: heroTextY } : {}}
            className="container relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Work, Learn, Own—
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={heroInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-primary"
                >
                  Your Future, Your Teee.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 1 }}
                className="max-w-[600px] text-lg text-muted-foreground md:text-xl"
              >
                Connecting talent with early-stage startups through internships, jobs, and equity opportunities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" asChild>
                    <Link href="#sign-up">Join equiTeee</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#what-is" className="flex items-center gap-2">
                      Learn More <ChevronDown className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              style={isClient ? { y: heroImageY } : {}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative h-[300px] md:h-[400px] lg:h-[500px]"
            >
              <Image
                src="hero.png"
                alt="People working together"
                fill
                className="object-fit rounded-full hover:border-w-6"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Animated decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 left-1/4 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"
          />

          {/* Animated particles - only render on client side */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: particle.width,
                    height: particle.height,
                    left: particle.left,
                    top: particle.top,
                  }}
                  animate={{
                    y: [0, particle.yMove],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* What is equiTeee? */}
        <section id="what-is" ref={whatIsRef} className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={whatIsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">What is equiTeee?</h2>
              <p className="max-w-[800px] text-lg text-muted-foreground">
                equiTeee is a platform where you can intern, work, or invest in early-stage startups—and even earn
                equity for your skills. Whether you're looking to gain experience, build a career, or own a piece of the
                future, equiTeee has a pathway for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-[300px] md:h-[400px]"
              >
                <Image
                  src="page1.png"
                  alt="equiTeee platform visualization"
                  fill
                  className="object-contain rounded-lg"
                />
              </motion.div>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={isClient ? { scale: 1.1, rotate: 5 } : {}}
                    className="rounded-full bg-primary/10 p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M18 8V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v1"></path>
                      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                      <path d="M13 15V9"></path>
                      <path d="M17 15V9"></path>
                      <path d="M9 15V9"></path>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">For Students & Professionals</h3>
                    <p className="text-muted-foreground">
                      Gain valuable experience and equity while working with innovative startups.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={isClient ? { scale: 1.1, rotate: 5 } : {}}
                    className="rounded-full bg-primary/10 p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">For Startups</h3>
                    <p className="text-muted-foreground">
                      Connect with top talent and offer equity as part of your compensation package.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={isClient ? { scale: 1.1, rotate: 5 } : {}}
                    className="rounded-full bg-primary/10 p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-6 w-6"
                    >
                      <path d="M12 2v20"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold">For Investors</h3>
                    <p className="text-muted-foreground">
                      Discover promising startups and invest in their future growth.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways Section */}
        <section id="pathways" ref={pathwaysRef} className="py-20 bg-gradient-to-br from-[#f9fbe7] to-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={pathwaysInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Your Path, Your Future</h2>
              <p className="max-w-[600px] text-lg text-muted-foreground">
                Choose the pathway that aligns with your goals and start your journey with equiTeee.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Intern Pathway */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={pathwaysInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={isClient ? { y: -10 } : {}}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <motion.div
                    whileHover={isClient ? { rotate: 10 } : {}}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-8 w-8"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold">Intern</h3>
                  <p className="mb-4 text-muted-foreground">
                    Gain hands-on experience through internships. Earn cash, equity, or both.
                  </p>
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Real-world experience
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Flexible schedules
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Equity opportunities
                    </li>
                  </ul>
                  <motion.div whileHover={isClient ? { scale: 1.05 } : {}} whileTap={isClient ? { scale: 0.95 } : {}}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="#sign-up">Start Interning</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Work Pathway */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={pathwaysInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={isClient ? { y: -10 } : {}}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <motion.div
                    whileHover={isClient ? { rotate: 10 } : {}}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-8 w-8"
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold">Work</h3>
                  <p className="mb-4 text-muted-foreground">
                    Find full-time or part-time roles at startups. Negotiate equity as part of your compensation.
                  </p>
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Full & part-time roles
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Equity compensation
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Career growth
                    </li>
                  </ul>
                  <motion.div whileHover={isClient ? { scale: 1.05 } : {}} whileTap={isClient ? { scale: 0.95 } : {}}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="#sign-up">Find Work</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Buy Equity Pathway */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={pathwaysInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={isClient ? { y: -10 } : {}}
                className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <motion.div
                    whileHover={isClient ? { rotate: 10 } : {}}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary h-8 w-8"
                    >
                      <path d="M12 2v20"></path>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold">Buy Equity</h3>
                  <p className="mb-4 text-muted-foreground">
                    Invest in startups you believe in. Own a piece of the future.
                  </p>
                  <ul className="mb-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Curated startups
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Transparent terms
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Portfolio management
                    </li>
                  </ul>
                  <motion.div whileHover={isClient ? { scale: 1.05 } : {}} whileTap={isClient ? { scale: 0.95 } : {}}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href="#sign-up">Start Investing</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" ref={howItWorksRef} className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How It Works</h2>
              <p className="max-w-[600px] text-lg text-muted-foreground">
                Getting started with equiTeee is simple. Follow these steps to begin your journey.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <motion.div
                initial={{ height: 0 }}
                animate={howItWorksInView ? { height: "100%" } : {}}
                transition={{ duration: 1.5 }}
                className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-0.5"
              ></motion.div>

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative md:flex md:justify-between md:items-center">
                  <div className="hidden md:block md:w-5/12"></div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={howItWorksInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 md:-ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                  >
                    <span className="text-xs font-bold text-primary-foreground">1</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={howItWorksInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="ml-12 md:ml-0 md:w-5/12"
                  >
                    <h3 className="text-xl font-bold mb-2">Sign up and create your profile</h3>
                    <p className="text-muted-foreground">
                      Create an account and build your profile showcasing your skills, experience, and interests.
                    </p>
                  </motion.div>
                </div>

                {/* Step 2 */}
                <div className="relative md:flex md:justify-between md:items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={howItWorksInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="ml-12 md:ml-0 md:w-5/12 md:text-right"
                  >
                    <h3 className="text-xl font-bold mb-2">Choose your path: intern, work, or invest</h3>
                    <p className="text-muted-foreground">
                      Select the pathway that aligns with your goals and interests.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={howItWorksInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute left-4 md:left-1/2 md:-ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                  >
                    <span className="text-xs font-bold text-primary-foreground">2</span>
                  </motion.div>
                  <div className="hidden md:block md:w-5/12"></div>
                </div>

                {/* Step 3 */}
                <div className="relative md:flex md:justify-between md:items-center">
                  <div className="hidden md:block md:w-5/12"></div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={howItWorksInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute left-4 md:left-1/2 md:-ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                  >
                    <span className="text-xs font-bold text-primary-foreground">3</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={howItWorksInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="ml-12 md:ml-0 md:w-5/12"
                  >
                    <h3 className="text-xl font-bold mb-2">Connect with startups and start your journey</h3>
                    <p className="text-muted-foreground">
                      Browse opportunities, connect with startups, and begin your equiTeee journey.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section id="sign-up" ref={ctaRef} className="py-20 bg-gradient-to-br from-primary/10 to-orange-300/20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                Ready to Own Your Future?
              </h2>
              <p className="max-w-[600px] text-lg text-muted-foreground mb-8">
                Join equiTeee today and start your journey with internships, jobs, or equity opportunities.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-full max-w-md mx-auto"
              >
                <form className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={ctaInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Input type="text" placeholder="Full Name" required />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={ctaInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Input type="email" placeholder="Email Address" required />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={ctaInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex gap-2"
                  >
                    <select
                      defaultValue=""
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>
                        I'm interested in...
                      </option>
                      <option value="intern">Internships</option>
                      <option value="work">Jobs</option>
                      <option value="invest">Investing</option>
                    </select>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={ctaInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={isClient ? { scale: 1.03 } : {}}
                    whileTap={isClient ? { scale: 0.97 } : {}}
                  >
                    <Button type="submit" className="w-full" size="lg">
                      Sign Up Now
                    </Button>
                  </motion.div>
                </form>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={ctaInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="mt-4 text-xs text-muted-foreground"
                >
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="border-t bg-muted/40"
      >
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">equiTeee</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connecting talent with early-stage startups through internships, jobs, and equity opportunities.
              </p>
              <div className="flex gap-4">
                <motion.div whileHover={isClient ? { y: -3, scale: 1.1 } : {}}>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={isClient ? { y: -3, scale: 1.1 } : {}}>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={isClient ? { y: -3, scale: 1.1 } : {}}>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={isClient ? { y: -3, scale: 1.1 } : {}}>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Link>
                </motion.div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Press
                  </Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Startup Guide
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Equity 101
                  </Link>
                </motion.li>
                <motion.li whileHover={isClient ? { x: 3 } : {}}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </motion.li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest opportunities and updates.
              </p>
              <form className="flex gap-2">
                <Input type="email" placeholder="Your email" className="flex-1" />
                <motion.div
                  whileHover={isClient ? { scale: 1.1, rotate: 5 } : {}}
                  whileTap={isClient ? { scale: 0.9 } : {}}
                >
                  <Button type="submit" variant="outline">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">&copy; {currentYear} equiTeee. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

