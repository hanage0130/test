import express from "express";

import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter });

const todos = await prisma.todo.findMany();

const app = express();
// app.use(express.static("/"));
app.use(express.json());

// await prisma.todo.create({ data: { name: "test2" } });
// await prisma.todo.create({ data: { name: `${(new Date()).toString()}` } });

app.get("/", (req, res) => {
  // res.send(`${todos[0].name}`);
  // await prisma.todo.create({ data: { name: `${(new Date()).toString()}` } });
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>aaa</h1>
      <input type="text" class="msg">
      <button class="btn">submit</button>
      <ul class=display></ul>
      <script>
        const btn = document.querySelector(".btn");
        const msg = document.querySelector(".msg");
        btn.addEventListener("click", async () => {
          console.log("test");
          console.log(msg.value);
          const res = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: (new Date()).toString() + "-" + document.querySelector(".msg").value + "aaa" }),
          });
          console.log(await res.json());
        });
        const display = document.querySelector(".display");
        setInterval(async () => {
          const res = await fetch("/messages");
          const messages = await res.json();
          display.textContent = "";
          for (let i = 0; i < messages.length; i++) {
            const li = document.createElement("li");
            li.textContent = messages[i].name;
            display.appendChild(li);
          }
        }, 10000);
      </script>
      <style>
        *{
          background-color:black;
          color:white;
        }
      </style>
    </body>
    </html>
  `);
});

app.get("/messages", async (req, res) => {
  res.json(await prisma.todo.findMany());
});



app.post("/submit", async (req, res) => {
  console.log(req.body);
  await prisma.todo.create({ data: req.body });
  res.json(await prisma.todo.findMany());
  console.log(await prisma.todo.findMany())
});

app.listen(process.env.PORT || 3000, console.log("test"));