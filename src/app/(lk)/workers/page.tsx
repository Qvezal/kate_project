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
                <tr>
                    <td>{el.name}</td>
                    <td><a href={"tel:+"+el.phone}><h3>{el.phone}</h3></a></td>
                    <td>{count}</td>
                </tr>
            </>
        )
    }).reverse();

    return (
        <div className={style.page}>
            <h1 className={style.title_name}>Работники</h1>
            {visible &&
                <table>
                    <tr>
                        <td>Имя</td>
                        <td>Телефон</td>
                        <td>Количество Продаж</td>
                    </tr>
                    {sellers}
                </table>
            }
            <h3 onClick={() =>{set_visible(!visible)}}>{visible? "Скрыть" : "Показать все"}</h3>
            <Spacer top="5"/>
        </div>
    )
}