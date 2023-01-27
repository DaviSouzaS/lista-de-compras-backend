import express, {Application} from "express";
import { createList, showAllLists, showOneList, deleteListItem , deleteList} from "./logic";

const app: Application = express()
app.use(express.json())

app.post("/purchaseList", createList)

app.get("/purchaseList", showAllLists)

app.get("/purchaseList/:id", showOneList)

app.delete("/purchaseList/:id/:name", deleteListItem)

app.delete("/purchaseList/:id", deleteList)

app.listen(3000, () => {
    console.log("Server is running!")
}) 