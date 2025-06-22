import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Comptarial',
  description: 'Comptarial – Fiduciaire moderne en Suisse. Services de comptabilité, paie, fiscalité, documents & conseil. Solutions sur mesure pour entrepreneurs et PME.'
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="https://comptarial.ch/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Comptarial",
              "url": "https://comptarial.ch",
              "logo": "https://comptarial.ch/logo.png",
              "description": "Fiduciaire moderne en Suisse. Services de comptabilité, paie, fiscalité, documents & conseil.",
              "sameAs": [
                "https://ch.linkedin.com/in/rosa-damasio-comptarial-19a148b6",
                "https://www.facebook.com/comptarial",
                "https://www.instagram.com/rosa.damasi.o"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+41-22-794-04-32",
                  "contactType": "customer service",
                  "areaServed": "CH",
                  "availableLanguage": ["fr"]
                }
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
