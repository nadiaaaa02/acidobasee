import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: 'Larutan Asam dan Basa - Kimia Kelas XI',
  description: 'Website pembelajaran interaktif tentang Larutan Asam dan Basa untuk siswa SMA Kelas XI. Memahami Teori, Kesetimbangan, pH, dan Indikator.',
  generator: 'v0.app',
  keywords: ['kimia', 'asam basa', 'pH', 'kelas XI', 'SMA', 'pembelajaran'],
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
