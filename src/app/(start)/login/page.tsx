"use client"
import Container from "@/Components/std/Container";
import style from "./login.module.css"
import { useState } from "react";

export default function Login() {

    const [name, set_name] = useState("");
    const [errors, set_errors] = useState("");

    function handle_change(event: React.ChangeEvent<HTMLInputElement>) {
        const {value} = event.target;
        set_name(value);
    }

    function login() {
        if (name != "Shop1" && name != "Shop2") {
            set_errors("name");
            return;
        }
        set_errors("");
        localStorage.setItem("shopname", name);
        window.location.href = "/dashboard"
    }

    const input_styles = errors === "name" ? style.error + " " + style.input : style.input

    return(
        <Container className={style.page}>
            <div className={style.card}>
                <div className={style.form}>
                    <label htmlFor="first"><h3>Название</h3></label>
                    <input type="text" id="first" name="first" className={input_styles} onChange={handle_change}/>
                    <button className={style.button} onClick={login}>Войти</button>
                </div>
                
            </div>
        </Container>
    )
}