interface iDataPurchaseList {
    name: string
    quantity: string
}

interface iPurchaseListRequest {
    listName: string
    data: Array<iDataPurchaseList>
}

interface iPurchaseList extends iPurchaseListRequest {
  id: number  
}

export { iPurchaseList, iPurchaseListRequest }