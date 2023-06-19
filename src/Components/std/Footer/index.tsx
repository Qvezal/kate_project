import style from "./footer.module.css";
import Container from "../Container";
export default function Footer() {
    return(
    <footer className={style.footer}>
        <Container>
            <h3>Некомерческий проект Краснокуцкой Е.</h3>
        </Container>
    </footer>
    )
}