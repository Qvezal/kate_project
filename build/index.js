"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT;
app.post('/add-worker', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, shop } = req.body;
    const find_forker = yield prisma.seller.findFirst({
        where: {
            phone: phone,
        }
    });
    if (find_forker) {
        return res.status(400).send("exist");
    }
    const new_worker = yield prisma.seller.create({
        data: {
            name,
            phone,
            shopId: shop
        }
    });
    res.status(200).send("Seller added successfully: " +
        "name - " + name + "   |   " +
        "phone - " + phone + " |   " +
        "shop - " + shop);
}));
app.post('/add-sell', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, seller, shop } = req.body;
    const new_sell = yield prisma.sell.create({
        data: {
            amount: Number(amount),
            time: new Date(),
            sellerId: Number(seller),
            shopId: shop
        }
    });
    res.status(200).send("Sell added successfully: " +
        "time - " + new_sell.time + "   |   " +
        "seller - " + new_sell.sellerId + " |   " +
        "amount - " + new_sell.amount);
}));
app.post('/get-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { project } = req.body;
    const shop = yield prisma.shop.findFirst({
        where: {
            name: project
        },
        include: {
            Sell: true,
            Seller: true,
        }
    });
    if (!shop) {
        return res.status(400).send("not found");
    }
    res.status(200).send(shop);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
