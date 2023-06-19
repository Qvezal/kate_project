import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from "@prisma/client"
import cors from "cors"
import axios from "axios"

dotenv.config()

const prisma = new PrismaClient();

const app: Express = express();
app.use(express.json())
app.use(cors());
const port = process.env.PORT;

app.post('/add-worker', async (req, res) => {
    const {name, phone, shop} = req.body;
    const find_forker = await prisma.seller.findFirst({
        where: {
            phone: phone,
        }
    })
    if (find_forker) {
        return res.status(400).send("exist");
    }
    const new_worker = await prisma.seller.create({
        data: {
            name,
            phone,
            shopId: shop
        }
    })
    res.status(200).send(
        "Seller added successfully: " +
        "name - " + name + "   |   " +
        "phone - " + phone + " |   " +
        "shop - " + shop
    );
})

app.post('/add-sell', async (req, res) => {
    const {amount, seller, shop} = req.body;
    const new_sell = await prisma.sell.create({
        data: {
            amount: Number(amount),
            time: new Date(),
            sellerId: Number(seller),
            shopId: shop
        }
    })
    res.status(200).send(
        "Sell added successfully: " +
        "time - " + new_sell.time + "   |   " +
        "seller - " + new_sell.sellerId + " |   " +
        "amount - " + new_sell.amount
    );
})

app.post('/get-data', async (req, res) => {
    const {project} = req.body;
    const shop = await prisma.shop.findFirst({
        where: {
            name: project
        },
        include: {
            Sell: true,
            Seller: true,
        }
    })
    if (!shop) {
        return res.status(400).send("not found")
    }
    res.status(200).send(shop)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});