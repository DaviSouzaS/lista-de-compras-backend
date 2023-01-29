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

interface iEditedListItem {
  name?: string
  quantity?: string
}

export { iPurchaseList, iPurchaseListRequest, iDataPurchaseList, iEditedListItem }