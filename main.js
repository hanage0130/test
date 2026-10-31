import express from "express";

import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

const todos = await prisma.todo.findMany();

const app = express();

// await prisma.todo.create({ data: { name: "test2" } });
// await prisma.todo.create({ data: { name: `${(new Date()).toString()}` } });

app.get("/", async (req, res) => {
  res.send(`${todos[0].name}`);
  await prisma.todo.create({ data: { name: `${(new Date()).toString()}` } });
  
});

app.listen(process.env.PORT || 3000, console.log("test"));