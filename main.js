import express from "express";

import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

const todos = await prisma.todo.findMany();

const app = express();

app.get("/", (req, res) => {
  res.send(`${todos[0].name}`);
});

app.listen(process.env.PORT || 3000, console.log("test"));