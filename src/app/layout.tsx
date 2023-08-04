import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout2 from './layout2'
import { CrispProvider } from '@/components/crisp-provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'AI platform',
}

export default function RootLayout( {children}: {children: React.ReactNode} ) {
  return (
    <ClerkProvider>
        <html lang="en">
          <CrispProvider />
          <body className={inter.className}>
           {/* eslint-disable-next-line react/prop-types */}
            <Layout2 content = {children} />
          </body>
        </html>
    </ClerkProvider>
  )
}
