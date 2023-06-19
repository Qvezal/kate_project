//@ts-nocheck
"use client"
import Row from "@/Components/std/Row";
import style from "./page.module.css"
import User from "../user"
import { useState } from "react";
import Spacer from "@/Components/std/Spacer";

//@ts-nocheck
export default function incomings() {

    const [visible, set_visible] = useState(false);
    const {data} = User();

    const sellers = data.Seller.map(el => {

        let count = 0;
        data.Sell.forEach(elem => {
            elem.sellerId === el.id && count++;
        })

        return (
            <>
                <Row className={style.table_row}>
                    <h3 className={style.table_header + " " + style.left}>{el.name}</h3>
                    <a href={"tel:+"+el.phone} className={style.table_header  + " " + style.center}><h3 className={style.phoneh3}>{el.phone}</h3></a>
                    <h3 className={style.table_header  + " " + style.right}>{count}</h3>
                </Row>
                <div className={style.hr}></div>
            </>
        )
    }).reverse();

    return (
        <div className={style.page}>
            <h1 className={style.title_name}>Работники</h1>
            {visible &&
            <div className={style.table}>
                <Row className={style.table_row}>
                    <h3 className={style.table_header + " " + style.left}>Имя</h3>
                    <h3 className={style.table_header + " " + style.center}>Телефон</h3>
                    <h3 className={style.table_header + " " + style.right}>Количество Продаж</h3>
                </Row>
                <div className={style.hr}></div>
                {sellers}
            </div>
            }
            <h3 className={style.title_page} onClick={() =>{set_visible(!visible)}}>{visible? "Скрыть" : "Показать все"}</h3>
            <Spacer top="5"/>
        </div>
    )
}