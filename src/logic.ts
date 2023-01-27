import { Request, Response } from "express"
import { iPurchaseListRequest, iPurchaseList } from "./interfaces"
import { dataBase } from "./database"

let idList = 0 

const createList = (request: Request, response: Response) => {
    idList = idList + 1

    const listData: iPurchaseListRequest = request.body 
    const newListData: iPurchaseList = {
        id: idList,
        ...listData
    }

    dataBase.push(newListData)

    return response.status(201).json(newListData)
}

const showAllLists = (request: Request, response: Response) => {
    return response.status(200).json(dataBase)
}

const showOneList = (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id)  

    const searchList = dataBase.find( item => item.id === id )

    if (searchList === undefined) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    }

    return response.status(200).json(searchList)
}

const deleteListItem = (request: Request, response: Response): Response => {
    const id: number = parseInt(request.params.id)  

    const name: string = request.params.name

    const searchList = dataBase.find( item => item.id === id )

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
    const id: number = parseInt(request.params.id)  

    const searchList = dataBase.findIndex(item => item.id === id )

    if (searchList === -1) {
        return response.status(404).json({
            message: `List with id ${id} does not exist`
        })
    } 

    dataBase.splice(searchList, 1)

    return response.status(204).send()
}

export { createList, showAllLists, showOneList, deleteListItem, deleteList }