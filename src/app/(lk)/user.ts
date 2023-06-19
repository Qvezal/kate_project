"use client"
import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
    const [data, set_data] = useState({
        id: 0,
        name: "",
        Sell: [],
        Seller: []
    })
    useEffect(() => {
        if (!localStorage.getItem("shopname")) {
            window.location.href = "/login";
        }
        const name = localStorage.getItem("shopname");
        axios.post("http://localhost:8081/get-data", {
            project: name
        }).then(res => {
            set_data(res.data);
        })
    }, []);

    return { data };
}
