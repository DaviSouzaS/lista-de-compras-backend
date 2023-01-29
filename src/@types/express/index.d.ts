import * as express from "express"
import { iPurchaseList } from "../../interfaces"

declare global {
    namespace Express {
        interface Request {
            listId: {
                id: number
            },
            listItemName: {
                name: string
            },
            searchList: {
                searchList: iPurchaseList | undefined
            }
        }
    }
}