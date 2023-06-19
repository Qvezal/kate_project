import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{background: "var(--accent3)"}}>
        {children}
      </body>
    </html>
  )
}
