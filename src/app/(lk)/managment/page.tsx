"use client"
import Row from "@/Components/std/Row";
import style from "./page.module.css"
import User from "../user"
import { useState } from "react";
import Spacer from "@/Components/std/Spacer";
import Input from "@/Components/std/Inputs/Input";
import axios from "axios";

export default function Dashboard() {
    const [visible_worker, set_visible_worker] = useState(false);
    const [visible_sell, set_visible_sell] = useState(false);
    const [worker_data, set_worker_data] = useState({
        name: "",
        phone: "",
    });
    const [sell_data, set_sell_data] = useState({
        seller: 0,
        amount: 0,
    });

    const {data} = User();
    const options = data.Seller.map(person => {
        //@ts-ignore
        return <option value={person.id} key={person.id}>{person.name} - {person.phone}</option>
    })

    function handle_sell(event: any) {
        const {name, value} = event.target;
        set_sell_data(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handle_worker(event: any) {
        const {name, value} = event.target;
        set_worker_data(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function send_data(type: "worker" | "sell") {
        const shop = data.id;

        if (type === "worker") {
            if (worker_data.name === "" || worker_data.phone === "") {
                alert("Enter values");
                return
            }
            axios.post("http://localhost:8081/add-worker", {
                ...worker_data,
                shop,
            }).then(res => alert(res.data))
            .catch(err=> alert(err.response.data))
        } else {
            if (sell_data.seller === 0) {
                alert("Select worker");
                return
            }
            if (sell_data.amount === 0) {
                alert("Enter sum");
                return
            }
            console.log(sell_data)
            axios.post("http://localhost:8081/add-sell", {
                ...sell_data,
                shop,
            })
            .then(res => alert(res.data))
            .catch(err=> alert(err.response.data))
        }
    }
    return(
        <div className={style.page}>
            <h1 className={style.title_name}>Управление</h1>
            {visible_sell &&
                <div id="sell">
                    <select
                        name="seller"
                        placeholder="Имя сотрудника"
                        onChange={handle_sell}
                    >
                        <option value={0}>Выберите сотрудника</option>
                        {options}
                    </select>
                    <Input
                        name="amount"
                        placeholder="Сумма"
                        onChange={handle_sell}
                        type="tel"
                    />
                    <button onClick={() => {send_data("sell")}}>Добавить</button>
                </div>
            }
            <h3 onClick={() =>{set_visible_worker(false);set_visible_sell(!visible_sell)}}>{visible_sell? "Скрыть" : "Добавить продажу"}</h3>
            {visible_worker &&
                <div id="seller">
                    <Input
                        name="name"
                        placeholder="Имя сотрудника"
                        onChange={handle_worker}
                    />
                    <Input
                        name="phone"
                        placeholder="79000000000"
                        onChange={handle_worker}
                        type="tel"
                    />
                    <button onClick={() => {send_data("worker")}}>Добавить</button>
                </div>
            }
            <h3 onClick={() =>{set_visible_sell(false);set_visible_worker(!visible_worker)}}>{visible_worker? "Скрыть" : "Добавить работника"}</h3>
            <Spacer top="5"/>
        </div>
    )
}