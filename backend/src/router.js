import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../handlers/items.js";

const route = Router();

route.get("/items", getItems);
route.post("/items", createItem);
route.put("/items/:id", updateItem);
route.delete("/items/:id", deleteItem);

export default route;
