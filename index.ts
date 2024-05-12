import express from "express";
import type { Express } from "express";
import router from "./routes/index.ts";

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
