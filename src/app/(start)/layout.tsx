import Header from '@/Components/std/Header'
import Footer from '@/Components/std/Footer'
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
  )
}
