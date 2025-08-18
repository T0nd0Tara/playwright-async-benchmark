import express from 'express'
import cors from 'cors'
import { setTimeout } from "timers/promises";

const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/computation', async (req, res) => {
  await setTimeout(1_000);
  res.status(200).json({ 'msg': 'OK' })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
