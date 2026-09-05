import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata: Metadata = {
  title: 'Type Lab — Text styles by Faisal Husain',
  description: 'A small, copy-ready collection of expressive text styles.',
 
  openGraph: {
    title: 'Type Lab — Text styles by Faisal Husain',
    description: 'A small, copy-ready collection of expressive text styles.',
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
    title:"Type Lab — Text styles by Faisal Husain",
    description:"A small, copy-ready collection of expressive text styles.",
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
      <body className="font-sans">
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
