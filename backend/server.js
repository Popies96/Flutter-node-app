import express, { urlencoded } from "express";
import route from "./src/router.js";

//app config
const app = express();
const port = 3000;
app.use(express.json());
app.use(urlencoded({ extended: true }));
//CRUD operations
app.use("/api", route);

//app init

app.listen(port, () => {
  console.log("app in running");
});
