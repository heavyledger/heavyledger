import './globals.css'

export const metadata = {
  title: 'Heavy Ledger — The Professional Network for Fitness',
  description: 'Where fitness professionals publish work, build credibility, and connect with clients based on demonstrated expertise.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
