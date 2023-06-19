//@ts-nocheck
"use client"
import Row from "@/Components/std/Row";
import style from "./page.module.css"
import User from "../user"
import { useState } from "react";
import Spacer from "@/Components/std/Spacer";


function translate(number: number, type: "prod" | "work") {
    if (type === "prod") {
        if (number === 0) {
            return "продаж"
        }
        if (number === 1) {
            return "продажа"
        }
        if (number < 5) {
            return "продажи"
        }
        return "продаж"
    } else {
        if (number === 0) {
            return "работников"
        }
        if (number === 1) {
            return "работник"
        }
        if (number < 5) {
            return "работника"
        }
        return "работников"
    }
}

export default function conversions() {

    const [period, set_period] = useState("day");
    const [visible, set_visible] = useState(false);
    const {data} = User();

    function handle_change(event: React.ChangeEvent<HTMLSelectElement>) {
        period != event.target.value && set_period(event.target.value);
    }

    let period_time
    if(period === "day") {
        period_time = 24 * 3600 * 1000
    } else if (period === "month") {
        period_time = 24 * 3600 * 1000 * 30
    } else if (period === "year") {
        period_time = 24 * 3600 * 1000 * 30 * 12
    } else {
        period_time = 0
    }
    const start_date = new Date(+new Date() - period_time);

    //@ts-ignore
    let sells = []
    if (data) {
        
        sells = data.Sell.filter(el => {
            if (period != "all") {
                //@ts-ignore
                return new Date(el.time) > start_date
            } else {
                return true
            }
        })
    }

    return (
        <div className={style.page}>
            <h1 className={style.title_name}>Продажи</h1>
            <h3 className={style.title}>
                Статистика за
                <select className={style.select} value={period} onChange={handle_change}>
                    <option value="day">день</option>
                    <option value="month">месяц</option>
                    <option value="year">год</option>
                    <option value="all">все время</option>
                </select>
                - <span className={style.span}>{sells.length}</span> {translate(Number(sells.length), "prod")}
            </h3>
            {visible &&
            <div className={style.table}>
                <Row className={style.table_row}>
                    <h3 className={style.table_header + " " + style.left}>Продавец</h3>
                    <h3 className={style.table_header + " " + style.center}>Сумма</h3>
                    <h3 className={style.table_header + " " + style.right}>Дата</h3>
                </Row>
                <div className={style.hr}></div>
                {
                    //@ts-ignore
                    sells.map(el => {
                        return(
                            <>
                                <Row className={style.table_row}>
                                    <h3 className={style.table_header + " " + style.left}>
                                        {
                                            //@ts-ignore
                                            data.Seller.find(per => per.id === el.sellerId).name
                                        }
                                    </h3>
                                    <h3 className={style.table_header + " " + style.center}>{el.amount} рублей</h3>
                                    <h3 className={style.table_header + " " + style.right}>{new Date(el.time).toLocaleString()}</h3>
                                </Row>
                                <div className={style.hr}></div>
                            </>
                        )
                    }).reverse()
                }
            </div>
            }
            <h3 className={style.title_page} onClick={() =>{set_visible(!visible)}}>{visible? "Скрыть" : "Показать все"}</h3>

            <Spacer top="5"/>
        </div>
    )
}