import { Request, Response } from "express"
import { iPurchaseListRequest, iPurchaseList, iDataPurchaseList, iEditedListItem } from "./interfaces"
import { dataBase } from "./database"

let idList = 0 

const createList = (request: Request, response: Response): Response => {

    const keys: Array<string> = Object.keys(request.body)
    const keysRequired: Array<string> = ["listName", "data"]

    const keysData: Array<Object> = request.body.data
    const keysRequiredData: Array<string> = ["name", "quantity"]

    const compareKeys = (key1: Array<string>, key2: Array<string>) => {

        return key1.length === key2.length && key1.every((value, index) => value === key2[index]);
    }

    const validateData = keysData.every((item) => compareKeys(Object.keys(item),keysRequiredData))

    if (!compareKeys(keys, keysRequired)) {
        return response.status(400).json({
            message:`Invalid keys, a list must have only ${keysRequired[0]} and ${keysRequired[1]}`
        })
    }

    if (!validateData) {
        return response.status(400).json({
            message:`Invalid keys, a data of list must have only ${keysRequiredData[0]} and ${keysRequiredData[1]}`
        })
    }

    const validateBody: boolean = keysRequired.every((item: string) => keys.includes(item))

    if (!validateBody) {
        return response.status(400).json({
            message:`Invalid keys, a list must have only ${keysRequired[0]} and ${keysRequired[1]}`
        })
    }

    const nameList: string = request.body.listName

    const listItems: Array<iDataPurchaseList> = request.body.data

    const findListItemType = listItems.every(item => typeof item.name === "string" && typeof item.quantity === "string")

    if (!findListItemType) {
        return response.status(400).json({
        message:`List information must be a string`
        })
    }
    
    if (typeof nameList !== "string") {
        return response.status(400).json({
            message:`The list name ${nameList} is not of type string, list information must be a string`
        })
    } 
    
    idList = idList + 1

    const listData: iPurchaseListRequest = request.body 
    const newListData: iPurchaseList = {
        id: idList,
        ...listData
    }

    dataBase.push(newListData)

    return response.status(201).json(newListData)
}

const showAllLists = (request: Request, response: Response): Response => {
    return response.status(200).json(dataBase)
}

const showOneList = (request: Request, response: Response) => {

    const id: number = request.listId.id  

    const searchList = request.searchList.searchList

    if (searchList === undefined) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    }

    return response.status(200).json(searchList)
}

const deleteListItem = (request: Request, response: Response): Response => {
    const id: number = request.listId.id  

    const name = request.listItemName.name

    const searchList = request.searchList.searchList

    if (searchList === undefined) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    } 
    
    const listData = searchList.data

    const searchName = listData.findIndex(item => item.name === name) 

    if (searchName === -1) {
        return response.status(404).json({
            message: `Item with name ${name} does not exist`
        })
    }

    listData.splice(searchName, 1)

    return response.status(204).send()
}

const deleteList = (request: Request, response: Response): Response => {
    const id: number = request.listId.id  

    const searchListIndex = dataBase.findIndex(item => item.id === id )

    if (searchListIndex === -1) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    } 

    dataBase.splice(searchListIndex, 1)

    return response.status(204).send()
}

const updateListItem = (request: Request, response: Response): Response => {
    const id: number = request.listId.id 

    const name = request.listItemName.name

    const editedInfos: iDataPurchaseList = request.body

    const compareKeys = (key1: Array<string>, key2: Array<string>) => {
        return key1.every((value) => value === key2[0] || value === key2[1] );
    }
    
    const keysRequired: Array<string> = ["name", "quantity"] 

    const validateData = compareKeys(Object.keys(editedInfos), keysRequired)
    
    const searchList = request.searchList.searchList

    if (searchList === undefined) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    } 

    const listData = searchList.data

    const searchName = listData.findIndex(item => item.name === name)

    if (searchName === -1) {
        return response.status(404).json({
            message: `Item with name ${name} does not exist`
        })
    }

    const findListItemTypeName = [editedInfos].every((item: iEditedListItem) => { 
        if (typeof item.name === "string" || item.name === undefined) {
            return true
        } else {
            return false
        }
    })

    const findListItemTypeQuantity = [editedInfos].every((item: iEditedListItem) => { 
        if (typeof item.quantity === "string" || item.quantity === undefined) {
            return true
        } else {
            return false
        }
    }) 

    if (!findListItemTypeName) {
        return response.status(400).json({
        message:`List information must be a string`
        }) 
    } 

    if (!findListItemTypeQuantity) {
        return response.status(400).json({
            message:`List information must be a string`
        }) 
    }

    if (!validateData) {
        return response.status(400).json({
            message:`Invalid keys, a data of list must have only ${keysRequired[0]} and ${keysRequired[1]}`
        })
    }

    if (editedInfos.name === undefined) {
        editedInfos.name = listData[searchName].name
    } 
    else if (editedInfos.quantity === undefined) {
        editedInfos.quantity = listData[searchName].quantity 
    } 

    listData[searchName] = editedInfos
    return response.status(200).json(listData[searchName])
}

export { createList, showAllLists, showOneList, deleteListItem, deleteList, updateListItem }