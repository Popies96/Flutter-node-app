import { getDB, insertDB, saveDB } from "../src/db.js";

//get all items

export const getItems = async(req,res) => {
    res.status(200);
    const db = await getDB();
    res.json(db.items);

}

// create item

export const createItem = async (req , res) => {
    let newItem = {
      id: req.body.id,
      name: req.body.name,
    };
    await insertDB(newItem);
    res.json(newItem);
}

// update items 

export const updateItem = async(req , res )=> {
      let id = parseInt(req.params.id);
      let updateditem = {
        id: req.body.id,
        name: req.body.name,
      };
      const db = await getDB();
      let index = db.items.findIndex((item) => item.id === id);

      if (index != -1) {
        db.items[index] = updateditem;
        await saveDB(db);
        res.json(updateditem);
      } else {
        res.send("item not found");
      }
}

// delete item

export const deleteItem = async (req, res) => {
  let id = parseInt(req.params.id);
  const db = await getDB();
  let match = db.items.findIndex((item) => item.id === id);

  if (match != -1) {
    const newItems = db.items.filter((item) => item.id != id);
    saveDB({ items: newItems });
    res.json({ message: "deleted" });
  } else {
    res.json({ message: "not found" });
  }
};