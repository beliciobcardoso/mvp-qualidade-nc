import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Relatórios NC',
  description: 'Gerador de Relatórios',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
