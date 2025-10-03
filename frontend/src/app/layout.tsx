import './globals.css'

export const metadata = {
  title: 'NASA Bio-Synapse Engine',
  description: 'Predictive Health & Habitat Advisor for Deep Space Missions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-nasa-dark text-white">{children}</body>
    </html>
  )
}