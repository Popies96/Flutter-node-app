
import fs from 'node:fs/promises'

const url = "C:\\Users\\AZIZ\\Desktop\\htmlpage training\\flutter_crud\\backend\\db.json"

export const getDB = async () => {
const db = await fs.readFile(url,"utf-8")
return JSON.parse(db)
} 

export const saveDB = async (db) => {
    await fs.writeFile(url,JSON.stringify(db,null,2))
    return db
}

export const insertDB = async (item) => {
    const db = await getDB()
    db.items.push(item)
    await saveDB(db)
    return item
}