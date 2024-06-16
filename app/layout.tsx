import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
const inter = Inter({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata: Metadata = {
  title: 'Text | Faisal Husain',
  description: 'Collection of Modern Text',
 
  openGraph: {
    title: 'BG | Faisal Husain',
    description: 'Collection of Modern Texts',
    url: 'https://text-faisal.vercel.app/',
    images:[
      {
        url:"https://text-faisal.vercel.app/bg.png",
        width:1200,
        height:639,
        alt:"Faisal Husain"
      }
    ]
  },
  twitter:{
    card:"summary_large_image",
    title:"TEXT | Faisal Husain",
    description:"Collection of Modern TEXT",
    images:[
      {
        url:"https://text-faisal.vercel.app/bg.png",
        width:1200,
        height:639,
        alt:"Faisal Husain"
      }
    ]

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {' '}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
