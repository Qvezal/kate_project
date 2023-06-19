import Row from "../Row"
import style from "./header.module.css"
import Image from "next/image"
import logo from "@/assets/svg/logo.svg"
import Container from "../Container"
import Button from "../Button"
import Link from "next/link"
export default function Header() {
    return(
    <header className={style.header}>
        <Container>
            <Row>
                <Link href="/">
                    <Row>
                        <Image src={logo} alt="logo" height={80}/>
                        <h3>Sellers</h3>
                    </Row>
                </Link>
                <Link href="/login">
                    <Button>Войти</Button>
                </Link>
            </Row>
        </Container>
        
    </header>
    )
}