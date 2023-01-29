import express, {Application} from "express";
import { createList, showAllLists, showOneList, deleteListItem , deleteList, updateListItem} from "./logic";
import { infosRequests } from "./middlewares";

const app: Application = express()
app.use(express.json())

app.post("/purchaseList", createList)

app.get("/purchaseList", showAllLists)

app.get("/purchaseList/:id", infosRequests, showOneList)

app.delete("/purchaseList/:id/:name", infosRequests, deleteListItem)

app.delete("/purchaseList/:id", infosRequests, deleteList)

app.patch("/purchaseList/:id/:name", infosRequests, updateListItem)

app.listen(3000, () => {
    console.log("Server is running!")
}) 