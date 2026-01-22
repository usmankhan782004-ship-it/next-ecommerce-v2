'use client'

import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section className="relative py-32 md:py-48 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black tracking-tight text-foreground mb-8 leading-[1.05]"
                    >
                        Redefining <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-900 dark:from-neutral-100 dark:to-neutral-500">
                            Modern Commerce
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl leading-relaxed font-light"
                    >
                        Experience a new standard of digital shopping. Minimalist design met with powerful intelligence.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            Explore Collection
                        </button>
                        <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            View Lookbook
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
        </section>
    )
}
