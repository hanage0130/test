import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (request, response) => {
  response.send(`Hello World! <a href="./lang/ja">日本語</a><a href="./index.html">a</a>`);
});
app.get("/lang/ja", (request, response) => {
  response.send("こんにちは、世界!");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("a");
});
