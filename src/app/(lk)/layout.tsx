import Footer from '@/Components/std/Footer'
import '@/styles/global.css';
import Row from '@/Components/std/Row';
import Sidebar from '@/Components/std/Sidebar';
import Container from '@/Components/std/Container';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Row align='start'>
        <Sidebar/>
        <div style={{width: "100%"}}>
          <Container>
            {children}
          </Container>
          <Footer/>
        </div>
    </Row>
  )
}