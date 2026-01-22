import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Updated fonts
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageWrapper from "@/components/PageWrapper";

// Configure Space Grotesk for headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Configure Inter for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CleanCanvas - Modern E-commerce",
  description: "Next.js 16 E-commerce Engine v2.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background p-4 rounded-md border border-border shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Changed default to dark for Nebula Tech aesthetic
          enableSystem
          disableTransitionOnChange
        >
          <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
