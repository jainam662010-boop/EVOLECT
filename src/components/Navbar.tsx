"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/70 backdrop-blur-xl border-b border-slate-200 py-4 shadow-lg shadow-slate-900/5"
                    : "bg-transparent py-6"
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <a href="#" className="flex items-center gap-3 group">
                    <img
                        src="/EVOLECT/logo.svg"
                        alt="Evolect"
                        className="w-9 h-9 rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-black text-xl tracking-wider group-hover:text-blue-600 transition-colors" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                            EVOLECT
                        </span>
                        <span className="text-[10px] tracking-widest text-blue-500 font-mono uppercase">
                            Volunteer Platform
                        </span>
                    </div>
                </a>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
                    <a href="#problem" className="hover:text-blue-600 transition-colors">
                        Challenge
                    </a>
                    <a href="#solution" className="hover:text-blue-600 transition-colors">
                        Solution
                    </a>
                    <a href="#why" className="hover:text-blue-600 transition-colors">
                        Why Evolect
                    </a>
                    <a href="#early-access" className="hover:text-blue-600 transition-colors">
                        Early Access
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="#early-access"
                        className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        Join Early Access
                    </a>
                </div>
            </div>
        </motion.header>
    )
}
