"use client"
import Row from "../Row"
import style from "./sidebar.module.css"
import Image from "next/image"
import logo from "@/assets/svg/logo.svg"
import Button from "../Button"
import { useEffect, useState } from "react"

export default function Sidebar() {

    const [path,set_path] = useState("")

    useEffect(()=> {
       set_path(window.location.pathname) 
    },[])

    function logout() {
        localStorage.removeItem("shopname");
        window.location.href = "/";
    }

    return(
    <header className={style.sidebar}>
                <a href="/">
                    <Row>
                        <Image src={logo} alt="logo" height={80}/>
                        <h3>Seller</h3>
                    </Row>
                </a>

                <div className={style.line}></div>

                <div className={style.nav}>
                    <a href="/dashboard">
                        <h3 className={path=== "/dashboard" ? style.active : style.link}>Главная</h3>
                    </a>

                    <a href="/workers">
                        <h3 className={path=== "/workers" ? style.active : style.link}>Продавцы</h3>
                    </a>

                    <a href="/sells" >
                        <h3 className={path=== "/sells" ? style.active : style.link}>Продажи</h3>
                    </a>

                    <a href="/managment" >
                        <h3 className={path=== "/managment" ? style.active : style.link}>Управление</h3>
                    </a>

                    <Button expand red onClick={logout}>Выйти</Button>
                </div>      
    </header>
    )
}