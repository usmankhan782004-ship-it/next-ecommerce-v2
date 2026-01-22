"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PageWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 w-full"
            >
                {children}
            </motion.main>
        </AnimatePresence>
    );
}
