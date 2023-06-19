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

export default function Dashboard() {

    const [period, set_period] = useState("day");
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

    return(
        <div className={style.page}>
            <h1 className={style.title_name}>{data.name}</h1>
            Статистика за <select className={style.select} value={period} onChange={handle_change}>
                <option value="day">день</option>
                <option value="month">месяц</option>
                <option value="year">год</option>
                <option value="all">все время</option>
            </select>
            <a href="/managment"><h3 className={style.managment}>Управление</h3></a>
            <a href="/workers" className={style.link}>
                <h1 className={style.managment}>{data.Seller.length + " " + translate(data.Seller.length, "work")}</h1>
            </a>
            <a href="/sells" className={style.link}>
                <h1 className={style.managment}>{sells.length + " " + translate(sells.length, "prod")}</h1>
            </a>
            <Spacer top="5"/>
        </div>
    )
}