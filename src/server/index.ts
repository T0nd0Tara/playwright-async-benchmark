import express from 'express'
import cors from 'cors'
import { setTimeout } from "timers/promises";
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/computation', async (req, res) => {
  await setTimeout(1_000);
  res.status(200).json({ 'msg': 'OK' })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
