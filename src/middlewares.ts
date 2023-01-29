import { Request, Response, NextFunction } from "express";
import { dataBase } from "./database";

const infosRequests = (request: Request, response: Response, next: NextFunction): Response | void => {

    const id: number = parseInt(request.params.id)  

    const name: string = request.params.name

    const searchList = dataBase.find( item => item.id === id )

    request.listId = {
        id: id
    }

    request.listItemName = {
        name: name
    }  

    request.searchList = {
        searchList: searchList
    }

    return next()
}

export { infosRequests }